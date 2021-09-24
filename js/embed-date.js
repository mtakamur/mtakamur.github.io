/**
 * A script to embed article date based on /js/json/content_list.json
 */

function embedDate(...path) {
  let JSON_PATH = "/js/json/articles.json";
  let TARGET_ID = "history";
  let EMBEDDING_TARGET = "date";

  // Input path to content in JSON as arguments.
  fetchJson(JSON_PATH)
  .then((data) => getDateNode(data, path)
  .then((dateNode) => );

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
  console.log(dateNode);
  return dateNode;
}

function findArticleById(articles, id) {
  for (let i = 0; i < articles.length; i++) {
    if (articles[i].id == id) return articles[i];
  }
}

function makeContents(contentsJsonObject) {
  for (let i = 0; i < contentsJsonObject.length; i++) {
    let newRangeInMillis = 2629800000; // 1 month.
    let data = contentsJsonObject[i];
    let isNew = false;
    let dateObject = new Date(data.date.year, data.date.month, data.date.date);
    let currentDate = new Date();
    let dateString = formatDate(
      data.date.year,
      data.date.month,
      data.date.date
    );

    if (currentDate.getTime() - newRangeInMillis <= dateObject.getTime())
      isNew = true;

    writeToDocument(
      TARGET_ID,
      makeEmbedString(dateString, data.title, data.article_url, isNew)
    );
  }
}

function fetchJson(jsonPath) {
  return fetch(jsonPath).then((response) => response.json());
}

function makeEmbedString(date, title, url, isNew) {
  let dt = "<dt>" + date + "</dt>";
  let dd = "";
  let ddBase = "";

  if (url != "") ddBase = '<dd><a href="' + url + '">' + title + "</a>";
  else ddBase = "<dd>" + title;

  if (isNew) dd = ddBase + '<span class="newicon">NEW</span></dd>';
  else dd = ddBase + "</dd>";

  return dt + dd;
}

function formatDate(year, month, date) {
  let splitter = "/";
  return year + splitter + month + splitter + date;
}

function writeToDocument(embeddingTargetId, content) {
  document
    .getElementById(embeddingTargetId)
    .insertAdjacentHTML("beforeend", content);
}
