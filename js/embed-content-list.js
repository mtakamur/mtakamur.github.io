/**
 * A script to generate contents list based on /js/json/content_list.json
 */
const JSON_PATH = "/js/json/content_list.json";
fetchJson().then((data) => makeContents(data.contents));
  //document.write('<li><a href="/cpp/top.html">C/C++</a></li>');

function makeContents(contentsJsonObject) {
  for (let i = 0; i < contentsJsonObject.length; i++) {
      let data = contentsJsonObject[i]
      let embedString = makeEmbedString(data.title, data.url)
      console.log(embedString)
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
    contentElements.insertAdjacentHTML("afterend", content)
}
