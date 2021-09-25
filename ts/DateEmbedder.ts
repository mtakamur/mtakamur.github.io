import articles from "./json/articles.json";

class DateEmbedder {
  static JSON_PATH = "/js/json/articles.json";
  static EMBEDDING_TARGET = "date";

  constructor(private path: string[]) {}

  embed(): void {}

  showJsonOnConsole(): void {
    console.log();
  }
}

const dateEmbedder = new DateEmbedder(["null"]);
dateEmbedder.showJsonOnConsole();
