import { Content } from "~/json/content_list.json";

declare module "~/json/content_list.json" {
  interface Content {
    title: string;
    url: string;
  }
}

const data: Content;
