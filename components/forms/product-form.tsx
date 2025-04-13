"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import slugify from "slugify";

// HeroUI组件
import { Form } from "@heroui/form";
import { Input, Textarea } from "@heroui/input";
import { Button } from "@heroui/button";
import { Select, SelectItem } from "@heroui/select";
import { Card, CardBody } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { PlusIcon } from "lucide-react";
import { SharedSelection } from "@heroui/system";
import RichTextEditor from "@/components/editor/RichTextEditor";

// 验证schema
const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  slug: z.string()
    .min(3, "Slug must be at least 3 characters")
    .refine(async (slug) => {
      // 检查 slug 是否已存在
      const response = await fetch(`/api/check-slug?slug=${slug}`);
      const { exists } = await response.json();
      return !exists;
    }, "This slug already exists"),
  targetLink: z.string().url("Please enter a valid URL"),
  excerpt: z.string().min(10, "Excerpt must be at least 10 characters"),
  categories: z.array(z.string()).min(1, "At least one category must be selected"),
  tags: z.array(z.string()).optional(),
  collections: z.array(z.string()).optional(),
  keywords: z.array(z.string()).optional(),
  licenses: z.array(z.string()).optional(),
  coverImage: z.string().min(1, "Please upload cover image"),
  coverImageAlt: z.string().min(3, "Please provide image alt text"),
  avatarImage: z.string().min(1, "Please upload logo image"),
  avatarImageAlt: z.string().min(3, "Please provide image alt text"),
  content: z.string().min(10, "Content must be at least 10 characters"),
});

type FormValues = z.infer<typeof formSchema>;

type Option = {
  _id: string;
  title: string;
  slug: { current: string };
};

export default function ProductForm({ categories, tags, collections }: {
  categories: Option[],
  tags: Option[],
  collections?: Option[]
}) {
  // 表单初始值
  const defaultValues: Partial<FormValues> = {
    title: "Color Format",
    slug: "color-format",
    targetLink: "https://color-format.com",
    excerpt: "Color Format is a tool that helps you format colors in your code.",
    categories: ["9b4e7d19-5e75-4737-a168-ace713cb56d4"],
    tags: ["7fb1f9ff-4165-427d-b21f-b3c313c81dd8"],
    collections: [],
    keywords: [],
    licenses: [],
    coverImage: "https://images.unsplash.com/photo-1688822863426-8c5f9b257090?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2532&q=90",
    coverImageAlt: "Cover Image",
    avatarImage: "https://images.unsplash.com/photo-1688822863426-8c5f9b257090?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2532&q=90",
    avatarImageAlt: "Avatar Image",
    content: "",
  };
  // 表单状态
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  // 状态
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [license, setLicense] = useState("");
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(null);
  const [avatarImagePreview, setAvatarImagePreview] = useState<string | null>(null);

  // 获取选项数据
  useEffect(() => {
  }, []);

  // 处理标题变化，自动生成slug
  const handleTitleChange = (value: string) => {
    if (value) {
      const slugValue = slugify(value, { lower: true, strict: true });
      form.setValue("slug", slugValue, { shouldValidate: true });
    }
  };

  // 处理图片上传
  const handleImageUpload = async (file: File, field: "coverImage" | "avatarImage") => {
    if (!file) return;

    try {
      if (field === "coverImage") {
        setUploadingCover(true);
      } else {
        setUploadingAvatar(true);
      }

      // 创建FormData
      const formData = new FormData();
      formData.append("file", file);

      // 发送请求
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        // 设置图片ID
        form.setValue(field, data.assetId || data.url, { shouldValidate: true });

        // 设置预览
        if (field === "coverImage") {
          setCoverImagePreview(data.url);
        } else {
          setAvatarImagePreview(data.url);
        }

        toast.success("图片上传成功");
      } else {
        toast.error(data.message || "图片上传失败");
      }
    } catch (error) {
      console.error("图片上传错误:", error);
      toast.error("图片上传时出错");
    } finally {
      if (field === "coverImage") {
        setUploadingCover(false);
      } else {
        setUploadingAvatar(false);
      }
    }
  };

  // 添加关键词
  const addKeyword = () => {
    if (!keyword.trim()) return;

    const currentKeywords = form.getValues("keywords") || [];
    if (!currentKeywords.includes(keyword.trim())) {
      form.setValue("keywords", [...currentKeywords, keyword.trim()]);
      setKeyword("");
    } else {
      toast.error("该关键词已存在");
    }
  };

  // 移除关键词
  const removeKeyword = (keywordToRemove: string) => {
    const currentKeywords = form.getValues("keywords") || [];
    form.setValue(
      "keywords",
      currentKeywords.filter((kw) => kw !== keywordToRemove)
    );
  };

  // 添加许可证
  const addLicense = () => {
    if (!license.trim()) return;

    const currentLicenses = form.getValues("licenses") || [];
    if (!currentLicenses.includes(license.trim())) {
      form.setValue("licenses", [...currentLicenses, license.trim()]);
      setLicense("");
    } else {
      toast.error("该许可证已存在");
    }
  };

  // 移除许可证
  const removeLicense = (licenseToRemove: string) => {
    const currentLicenses = form.getValues("licenses") || [];
    form.setValue(
      "licenses",
      currentLicenses.filter((lic) => lic !== licenseToRemove)
    );
  };

  // 提交表单
  const onSubmit = async (values: FormValues) => {
    console.log(JSON.stringify(values));
    try {
      setIsSubmitting(true);

      // 构建符合Sanity引用格式的文档
      const document = {
        _type: "product",
        title: values.title,
        slug: { current: values.slug },
        targetLink: values.targetLink,
        excerpt: values.excerpt,
        categories: values.categories.map(id => ({
          _type: "reference",
          _ref: id
        })),
        tags: (values.tags || []).map(id => ({
          _type: "reference",
          _ref: id
        })),
        keywords: values.keywords,
        licenses: values.licenses,
        coverImage: {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: values.coverImage
          }
        },
        coverImageAlt: values.coverImageAlt,
        avatarImage: {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: values.avatarImage
          }
        },
        avatarImageAlt: values.avatarImageAlt,
        content: values.content
      };

      // 确保控制台能够看到提交的完整数据格式
      console.log("提交的文档:", JSON.stringify(document, null, 2));

      // 使用Actions API格式
      const actionsPayload = {
        actions: [
          {
            actionType: "sanity.action.document.create",
            document
          }
        ]
      };

      // 发送请求
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(actionsPayload),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast.success("Submit successfully");
        // 重置表单
        form.reset(defaultValues);
        setCoverImagePreview(null);
        setAvatarImagePreview(null);
      } else {
        // 尝试显示详细的错误信息
        const errorMessage = data.error || data.message || data.detail ||
          (typeof data === 'string' ? data : null) ||
          `请求失败 (${response.status})`;
        console.error("提交失败:", errorMessage, data);
        toast.error(`Submit failed: ${errorMessage}`);
      }
    } catch (error) {
      console.error("提交表单错误:", error);
      toast.error(`提交表单时出错: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form onSubmit={form.handleSubmit(onSubmit)}>
      {isLoading ? (
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <span className="ml-2">Loading...</span>
        </div>
      ) : (
        <div className="w-full flex flex-col gap-8 lg:flex-row">
          {/* Left */}
          <div className="w-full lg:w-2/3 space-y-6">
            <Card disableAnimation radius="sm">
              <CardBody className="p-6">
                {/* target link */}
                <div className="space-y-2">
                  <label htmlFor="targetLink" className="text-sm font-medium">Link</label>
                  <Input
                    id="targetLink"
                    placeholder="https://example.com"
                    {...form.register("targetLink")}
                  />
                  {form.formState.errors.targetLink && (
                    <p className="text-red-500 text-xs mt-1">{form.formState.errors.targetLink.message}</p>
                  )}
                </div>
              </CardBody>
            </Card>

            <Card disableAnimation radius="sm">
              <CardBody className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* title */}
                  <div className="space-y-2">
                    <label htmlFor="title" className="text-sm font-medium">Title</label>
                    <Input
                      id="title"
                      placeholder="Product title"
                      {...form.register("title")}
                      onChange={(e) => {
                        form.setValue("title", e.target.value);
                        handleTitleChange(e.target.value);
                      }}
                    />
                    {form.formState.errors.title && (
                      <p className="text-red-500 text-xs mt-1">{form.formState.errors.title.message}</p>
                    )}
                  </div>

                  {/* Slug */}
                  <div className="space-y-2">
                    <label htmlFor="slug" className="text-sm font-medium">Slug</label>
                    <Input
                      id="slug"
                      placeholder="my-product-name"
                      {...form.register("slug")}
                    />
                    {form.formState.errors.slug && (
                      <p className="text-red-500 text-xs mt-1">{form.formState.errors.slug.message}</p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-6">
                  {/* excerpt */}
                  <div className="space-y-2">
                    <label htmlFor="excerpt" className="text-sm font-medium">Excerpt</label>
                    <Textarea
                      id="excerpt"
                      placeholder="Short description"
                      {...form.register("excerpt")}
                    />
                    {form.formState.errors.excerpt && (
                      <p className="text-red-500 text-xs mt-1">{form.formState.errors.excerpt.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  {/* detail content */}
                  <div className="space-y-2">
                    <label htmlFor="content" className="text-sm font-medium">Detail Content</label>
                    <RichTextEditor
                      content={form.watch("content")}
                      onChange={(value) => form.setValue("content", value, { shouldValidate: true })}
                      placeholder="请输入产品的详细描述、功能特点等..."
                    />
                    {form.formState.errors.content && (
                      <p className="text-red-500 text-xs mt-1">{form.formState.errors.content.message}</p>
                    )}
                  </div>
                </div>
              </CardBody>
            </Card>

            <Card disableAnimation radius="sm">
              <CardBody className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* cover image */}
                  <div className="space-y-2">
                    <div className="space-y-2">
                      <label htmlFor="coverImage" className="text-sm font-medium">Cover Image</label>
                      <div className="space-y-4">
                        <Input
                          id="coverImage"
                          type="file"
                          accept="image/*"
                          placeholder="Upload cover image"
                          disabled={uploadingCover}
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              handleImageUpload(file, "coverImage");
                            }
                          }}
                        />
                        {uploadingCover && (
                          <div className="flex items-center space-x-2">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                            <span>Uploading...</span>
                          </div>
                        )}
                        {coverImagePreview && (
                          <div className="relative w-full h-48 overflow-hidden rounded-md">
                            <img
                              src={coverImagePreview}
                              alt="Cover image preview"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                      </div>
                      {form.formState.errors.coverImage && (
                        <p className="text-red-500 text-xs mt-1">{form.formState.errors.coverImage.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="coverImageAlt" className="text-sm font-medium">Cover Image Alt</label>
                      <Input
                        id="coverImageAlt"
                        placeholder="Image Alt"
                        {...form.register("coverImageAlt")}
                      />
                      {form.formState.errors.coverImageAlt && (
                        <p className="text-red-500 text-xs mt-1">{form.formState.errors.coverImageAlt.message}</p>
                      )}
                    </div>
                  </div>

                  {/* avatar image */}
                  <div className="space-y-2">
                    <div className="space-y-2">
                      <label htmlFor="avatarImage" className="text-sm font-medium">Logo Image</label>
                      <div className="space-y-4">
                        <Input
                          id="avatarImage"
                          type="file"
                          accept="image/*"
                          disabled={uploadingAvatar}
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              handleImageUpload(file, "avatarImage");
                            }
                          }}
                        />
                        {uploadingAvatar && (
                          <div className="flex items-center space-x-2">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                            <span>Uploading...</span>
                          </div>
                        )}
                        {avatarImagePreview && (
                          <div className="relative w-24 h-24 overflow-hidden rounded-full">
                            <img
                              src={avatarImagePreview}
                              alt="Logo image preview"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                      </div>
                      {form.formState.errors.avatarImage && (
                        <p className="text-red-500 text-xs mt-1">{form.formState.errors.avatarImage.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="avatarImageAlt" className="text-sm font-medium">Logo Image Alt</label>
                      <Input
                        id="avatarImageAlt"
                        placeholder="Image Alt"
                        {...form.register("avatarImageAlt")}
                      />
                      {form.formState.errors.avatarImageAlt && (
                        <p className="text-red-500 text-xs mt-1">{form.formState.errors.avatarImageAlt.message}</p>
                      )}
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>

          </div>
          {/* Right */}
          <div className="w-full lg:w-1/3 space-y-6">
            <Card disableAnimation radius="sm">
              <CardBody className="p-6 w-full">
                <div className="grid grid-cols-1 gap-6 w-full">
                  {/* categories */}
                  <div className="space-y-2">
                    <label htmlFor="categories" className="text-sm font-medium">Categories</label>
                    <Select
                      id="categories"
                      placeholder="Select categories..."
                      selectedKeys={form.watch("categories")}
                      onSelectionChange={(keys: SharedSelection) => {
                        const selectedValues = Array.from(keys as Set<string>);
                        form.setValue("categories", selectedValues, { shouldValidate: true });
                      }}
                      selectionMode="multiple"
                    >
                      {categories.map((category) => (
                        <SelectItem key={category._id} value={category._id}>
                          {category.title}
                        </SelectItem>
                      ))}
                    </Select>
                    {form.formState.errors.categories && (
                      <p className="text-red-500 text-xs mt-1">{form.formState.errors.categories.message}</p>
                    )}
                  </div>

                  {/* tags */}
                  <div className="space-y-2">
                    <label htmlFor="tags" className="text-sm font-medium">Tags</label>
                    <Select
                      id="tags"
                      placeholder="Select tags..."
                      selectedKeys={form.watch("tags") || []}
                      onSelectionChange={(keys: SharedSelection) => {
                        const selectedValues = Array.from(keys as Set<string>);
                        form.setValue("tags", selectedValues, { shouldValidate: true });
                      }}
                      selectionMode="multiple"
                    >
                      {tags.map((tag) => (
                        <SelectItem key={tag._id} value={tag._id}>
                          {tag.title}
                        </SelectItem>
                      ))}
                    </Select>
                    {form.formState.errors.tags && (
                      <p className="text-red-500 text-xs mt-1">{form.formState.errors.tags.message}</p>
                    )}
                  </div>
                </div>
              </CardBody>
            </Card>

            <Card disableAnimation radius="sm">
              <CardBody className="p-6">
                <div className="grid grid-cols-1 gap-6">
                  {/* keywords */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Keywords</label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add keywords..."
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addKeyword();
                          }
                        }}
                      />
                      <Button
                        isIconOnly
                        onClick={(e) => {
                          e.preventDefault();
                          addKeyword();
                        }}
                      >
                        <PlusIcon size={16} />
                      </Button>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-2">
                      {form.watch("keywords")?.map((kw, index) => (
                        <Chip
                          key={index}
                          onClose={() => removeKeyword(kw)}
                          variant="flat"
                        >
                          {kw}
                        </Chip>
                      ))}
                    </div>
                  </div>

                  {/* licenses */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Licenses</label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add licenses..."
                        value={license}
                        onChange={(e) => setLicense(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addLicense();
                          }
                        }}
                      />
                      <Button
                        isIconOnly
                        onClick={(e) => {
                          e.preventDefault();
                          addLicense();
                        }}
                      >
                        <PlusIcon size={16} />
                      </Button>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-2">
                      {form.watch("licenses")?.map((lic, index) => (
                        <Chip
                          key={index}
                          onClose={() => removeLicense(lic)}
                          variant="flat"
                        >
                          {lic}
                        </Chip>
                      ))}
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>

            <div className="flex justify-end">
              <Button
                type="submit"
                color="primary"
                isLoading={isSubmitting}
                isDisabled={isSubmitting || isLoading || uploadingCover || uploadingAvatar}
                onPress={(e) => form.handleSubmit(onSubmit)}
              >
                {isSubmitting ? "Submitting..." : "Submit Product"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </Form>
  );
} 