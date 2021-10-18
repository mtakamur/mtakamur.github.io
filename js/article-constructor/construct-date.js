/**
 * A script to embed article date based on /js/json/content_list.json
 */
function constructDate(...path) {
  let JSON_PATH = "/js/json/articles.json";
  let EMBEDDING_TARGET = "date";

  // Input path to content in JSON as arguments.
  fetchJson(JSON_PATH)
    .then((data) => getDateNode(data, path))
    .then((dateNode) => makeDateString(dateNode))
    .then((embeddingString) =>
      writeDateToDocument(EMBEDDING_TARGET, embeddingString)
    );

  // Functions called in the main sequence.
  function getDateNode(data, path) {
    let dateNode = data;

    // Reach to list of article node.
    for (let i = 0; i < path.length - 1; i++) {
      let nextNode = path[i];
      dateNode = dateNode[nextNode];
    }

    // Find article node whose id matches to final parameter of path.
    dateNode = findArticleById(dateNode, path[path.length - 1]);
    return dateNode;
  }

  function findArticleById(articles, id) {
    for (let i = 0; i < articles.length; i++) {
      if (articles[i].id == id) return articles[i];
    }
  }

  function makeDateString(articleNode) {
    console.log();
    let dateNode = articleNode["date"];
    return makeEmbedString(
      formatDate(dateNode["year"], dateNode["month"], dateNode["date"])
    );
  }

  function fetchJson(jsonPath) {
    return fetch(jsonPath).then((response) => response.json());
  }

  function makeEmbedString(dateString) {
    return "<p> 更新日: " + dateString + "</p>";
  }

  function formatDate(year, month, date) {
    let splitter = "/";
    return year + splitter + month + splitter + date;
  }

  function writeDateToDocument(embeddingTargetId, content) {
    document
      .getElementById(embeddingTargetId)
      .insertAdjacentHTML("beforeend", content);
  }
}
