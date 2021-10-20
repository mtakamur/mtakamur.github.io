/**
 * Date class used in Article class.
 */
class Date {
  constructor(year, month, date) {
    this.year = year;
    this.month = month;
    this.date = date;
  }
}

/**
 * Article class constructed based on article json object.
 */
class Article {
  constructor(articleJsonObj) {
    this.id = articleJsonObj["id"];
    this.date = new Date(
      articleJsonObj["date"]["year"],
      articleJsonObj["date"]["month"],
      articleJsonObj["date"]["date"]
    );
    this.title = articleJsonObj["title"];
    this.description = articleJsonObj["description"];
    this.url = articleJsonObj["url"];
    this.keywords = articleJsonObj["keywords"];
  }
}

export { Article };
