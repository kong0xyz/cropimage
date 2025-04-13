import { Schema } from "@sanity/schema";
import {
  htmlToBlocks,
  getBlockContentFeatures,
} from "@portabletext/block-tools";
import { JSDOM } from "jsdom";

// Start with compiling a schema we can work against
const defaultSchema = Schema.compile({
  name: "myBlog",
  types: [
    {
      type: "object",
      name: "blogPost",
      fields: [
        {
          title: "Title",
          type: "string",
          name: "title",
        },
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

// The compiled schema type for the content type that holds the block array
const blockContentType = defaultSchema
  .get("blogPost")
  .fields.find((field) => field.name === "body").type;

// Convert HTML to block array
const blocks = htmlToBlocks(
  "<h1>Hello world!</h1><p>1111</p><h1>Hello world!</h1><h2>Hello world!</h2>",
  blockContentType,
  {
    parseHtml: (html) => new JSDOM(html).window.document,
  }
);

// Get the feature-set of a blockContentType
const features = getBlockContentFeatures(blockContentType);

// console.log(features);
console.log(JSON.stringify(blocks, null, 2));

// 运行
// ts-node test/toblock.js
