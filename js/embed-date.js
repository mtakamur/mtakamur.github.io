/**
 * A script to embed article date based on /js/json/content_list.json
 */

function embedDate(...path) {
  let JSON_PATH = "/js/json/articles.json";
  let EMBEDDING_TARGET = "date";

  // Input path to content in JSON as arguments.
  fetchJson(JSON_PATH)
  .then((data) => getDateNode(data, path))
  .then((dateNode) => makeDateString(dateNode))
  .then((embeddingString) => writeDateToDocument(EMBEDDING_TARGET, embeddingString));

  // document
  //   .getElementById(EMBEDDING_TARGET_ID)
  //   .insertAdjacentHTML("beforeend", "test");
}

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
  console.log(dateNode)
  return dateNode;
}

function findArticleById(articles, id) {
  for (let i = 0; i < articles.length; i++) {
    if (articles[i].id == id) return articles[i][date];
  }
}

function makeDateString(dateNode) {
    return makeEmbedString(
      formatDate(dateNode[date].year, dateNode.date.month, dateNode.date)
      )
}

function fetchJson(jsonPath) {
  return fetch(jsonPath).then((response) => response.json());
}

function makeEmbedString(dateString) {
  return "<p>" + date + "</p>";
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
