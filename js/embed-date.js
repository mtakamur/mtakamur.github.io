/**
 * A script to embed article date based on /js/json/content_list.json
 */

const JSON_PATH = "/js/json/articles.json";
const TARGET_ID = "history";
const EMBEDDING_TARGET_ID = "date";
fetchJson().then((data) => makeContents(data.history));

function onloadEmbed() {
  document
    .getElementById(EMBEDDING_TARGET_ID)
    .insertAdjacentHTML("beforeend", "test");
}

// Functions called in the main sequence.
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

function fetchJson() {
  return fetch(JSON_PATH).then((response) => response.json());
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
