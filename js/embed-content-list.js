/**
 * A script to embed update history on the top page.
 */

const JSON_PATH = "/js/json/content_list.json";
fetchJson().then((data) => makeContents(data.contents));

// Functions called in the main sequence.
function makeContents(contentsJsonObject) {
  for (let i = 0; i < contentsJsonObject.length; i++) {
      let data = contentsJsonObject[i]
      let embedString = makeEmbedString(data.title, data.url)
      writeToDocument(embedString)
  }
}

function fetchJson() {
  return fetch(JSON_PATH).then((response) => response.json());
}

function makeEmbedString(title, url) {
  return '<li><a href="' + url + '">' + title + "</a></li>";
}

function writeToDocument(content) {
    let contentElements = document.getElementById("contents");
    contentElements.insertAdjacentHTML("beforeend", content)
}