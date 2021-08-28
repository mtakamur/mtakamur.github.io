/**
 * A script to generate contents list based on /js/json/content_list.json
 */

const JSON_PATH = "/js/json/history.json";
const TARGET_ID = "history";
fetchJson().then((data) => makeContents(data.history));

// Functions called in the main sequence.
function makeContents(contentsJsonObject) {
  for (let i = 0; i < contentsJsonObject.length; i++) {
    let data = contentsJsonObject[i];
    let isNew = false;

    if (i == 0) isNew = true;

    writeToDocument(
      TARGET_ID,
      makeEmbedString(data.date, data.title, data.description, data.article_url, isNew)
    );
  }
}

function fetchJson() {
  return fetch(JSON_PATH).then((response) => response.json());
}

function makeEmbedString(date, title, description, url, isNew) {
  let dt = "<dt>" + date + "</dt>";
  let dd = "";
  let ddBase = '<dd><a href="' + url + '">' + title + "</a>";
  if (isNew) dd = ddBase + '<span class="newicon">NEW</span></dd>';
  else dd = ddBase + "</dd>";
  return dt + dd;
}

function writeToDocument(embeddingTargetId, content) {
  document
    .getElementById(embeddingTargetId)
    .insertAdjacentHTML("beforeend", content);
}
