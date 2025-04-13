import { NextRequest, NextResponse } from "next/server";
import { writeClient } from "@/sanity/lib/client";
import { z } from "zod";
import { Schema } from "@sanity/schema";
import { htmlToBlocks } from "@portabletext/block-tools";
import { JSDOM } from "jsdom";
const defaultSchema = Schema.compile({
  name: "detailContent",
  types: [
    {
      type: "object",
      name: "detailContent",
      fields: [
        {
          title: "Body",
          name: "body",
          type: "array",
          of: [{ type: "block" }],
        },
      ],
    },
  ],
});

const blockContentType = defaultSchema
  .get("detailContent")
  .fields.find((field: any) => field.name === "body").type;

// 定义图片类型
const imageType = z.object({
  _type: z.literal("image"),
  asset: z.object({
    _type: z.literal("reference"),
    _ref: z.string(),
  }),
  alt: z.string().optional(),
});

// 定义产品提交验证schema
const productSchema = z.object({
  title: z.string().min(3, "标题至少需要3个字符"),
  slug: z.object({
    current: z.string().min(3, "别名至少需要3个字符"),
  }),
  targetLink: z.string().url("请输入有效的URL"),
  excerpt: z.string().min(10, "摘要至少需要10个字符"),
  categories: z
    .array(
      z.object({
        _type: z.literal("reference"),
        _ref: z.string(),
      })
    )
    .min(1, "至少选择一个分类"),
  tags: z
    .array(
      z.object({
        _type: z.literal("reference"),
        _ref: z.string(),
      })
    )
    .optional(),
  collections: z
    .array(
      z.object({
        _type: z.literal("reference"),
        _ref: z.string(),
      })
    )
    .optional(),
  keywords: z.array(z.string()).optional(),
  licenses: z.array(z.string()).optional(),
  coverImage: imageType.omit({ alt: true }),
  coverImageAlt: z.string().min(3, "Please provide image alt text").optional(),
  avatarImage: imageType.omit({ alt: true }),
  avatarImageAlt: z.string().min(3, "Please provide image alt text").optional(),
  content: z.string().min(10, "Content must be at least 10 characters"),
});

// 定义Actions API请求结构
const actionsApiSchema = z.object({
  actions: z.array(
    z.object({
      actionType: z.string(),
      document: productSchema.extend({
        _type: z.literal("product"),
      }),
    })
  ),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // 检查是否是Actions API格式
    if (body.actions && Array.isArray(body.actions)) {
      // 验证Actions API请求结构
      const validationResult = actionsApiSchema.safeParse(body);
      if (!validationResult.success) {
        return NextResponse.json(
          {
            error: "Validation failed",
            details: validationResult.error.format(),
          },
          { status: 400 }
        );
      }

      const { actions } = validationResult.data;

      // 处理actions API请求
      if (actions[0].actionType === "sanity.action.document.create") {
        const document = actions[0].document;
        // 确保内容字段是PortableText格式
        let contentFormatted = [];
        try {
          if (
            typeof document.content === "string" &&
            document.content.trim() !== ""
          ) {
            // 使用更完整的配置转换HTML到PortableText blocks
            const blocks = htmlToBlocks(document.content, blockContentType, {
              parseHtml: (html) => new JSDOM(html).window.document,
            });

            // 确保blocks是数组且不含undefined元素
            if (Array.isArray(blocks)) {
              // 处理每个block，确保有正确的结构和_key属性
              contentFormatted = blocks
                .filter(Boolean)
                .map((block: any) => {
                  if (!block) return null;

                  // 确保每个block有_key
                  const blockWithKey = {
                    ...block,
                    _key:
                      block._key ||
                      `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
                  };

                  // 确保children是数组且每个child有正确结构
                  if (Array.isArray(blockWithKey.children)) {
                    blockWithKey.children = blockWithKey.children
                      .filter(Boolean)
                      .map((child: any) => {
                        if (!child) return null;

                        // 确保每个child有_key和marks数组
                        return {
                          ...child,
                          _key:
                            child._key ||
                            `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
                          marks: Array.isArray(child.marks) ? child.marks : [],
                        };
                      })
                      .filter(Boolean);
                  } else {
                    blockWithKey.children = [];
                  }

                  return blockWithKey;
                })
                .filter(Boolean);
            }
          }
        } catch (error) {
          console.error("HTML转换为PortableText失败:", error);
          // 失败时使用空数组
          contentFormatted = [];
        }

        // 准备Sanity文档，添加一些辅助字段
        const productDoc = {
          ...document,
          score: 0, // 初始分数
          content: contentFormatted,
        };

        // 添加图片替代文本
        if (document.coverImageAlt) {
          productDoc.coverImage = {
            ...document.coverImage,
            alt: document.coverImageAlt,
          } as any; // 使用类型断言避免TypeScript错误
        }

        if (document.avatarImageAlt) {
          productDoc.avatarImage = {
            ...document.avatarImage,
            alt: document.avatarImageAlt,
          } as any; // 使用类型断言避免TypeScript错误
        }

        // 删除额外字段
        const { coverImageAlt, avatarImageAlt, ...finalProduct } = productDoc;

        // 创建新的产品文档
        try {
          // 生成一个唯一ID
          const documentId = `product-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

          // 添加_id字段并使用drafts前缀创建草稿文档
          const finalDocWithId = {
            ...finalProduct,
            _id: `drafts.${documentId}`,
          };

          console.log(
            "最终提交到Sanity的文档(草稿模式):",
            JSON.stringify(finalDocWithId, null, 2)
          );

          // 创建草稿文档
          const result = await writeClient.create(finalDocWithId, {
            autoGenerateArrayKeys: true,
          });
          console.log("Sanity创建结果:", JSON.stringify(result, null, 2));

          return NextResponse.json({
            success: true,
            message: "产品已保存为草稿，等待审核",
            data: result,
          });
        } catch (error) {
          console.error("Sanity创建失败:", error);
          return NextResponse.json(
            {
              success: false,
              error: "Sanity创建失败",
              details: error instanceof Error ? error.message : String(error),
            },
            { status: 500 }
          );
        }
      }

      // 处理其他Actions API操作类型
      return NextResponse.json(
        { error: "Unsupported operation type" },
        { status: 400 }
      );
    } else {
      // 处理原始提交格式（保留原来的兼容性）
      // 我们修改这部分来直接适配新的格式
      try {
        // 转换为新格式
        const actions = [
          {
            actionType: "sanity.action.document.create",
            document: {
              _type: "product",
              ...body,
            },
          },
        ];

        // 重新提交到当前路由
        return await POST(
          new NextRequest(request.url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ actions }),
          })
        );
      } catch (error: any) {
        console.error("Error converting submission format:", error);
        return NextResponse.json(
          { error: "Invalid submission format", message: error.message },
          { status: 400 }
        );
      }
    }
  } catch (error: any) {
    console.error("Error submitting product:", error);
    return NextResponse.json(
      { error: "Submit failed", message: error.message },
      { status: 500 }
    );
  }
}
