function constructMenuBar() {
  let CONTENTS_JSON = "/js/json/content_list.json";
  let CONTAINER_ID = "body";
  let POSITION_IN_CONTAINER = "afterbegin";

  fetchJson()
    .then((contentsJson) => makeTemplate(contentsJson))
    .then((menuBarTemplate) => writeToDocument(menuBarTemplate));

  return;

  function fetchJson() {
    return fetch(CONTENTS_JSON).then((response) => response.json());
  }

  function makeTemplate(contentsJson) {
    return `
    <div id="menubar">
      <ul>
        <li><a href="/index.html">Home</a></li>
        <li>
          <a>Contents <span class="caret"></span></a>
          <div>
            <ul id="contents">${makeContents(contentsJson)}</ul>
          </div>
        </li>
      </ul>
    </div>
    `;
  }

  // Functions called in the main sequence.
  function makeContents(contentsJsonObject) {
    let contents = contentsJsonObject.contents;
    let embedString = "";
    for (let i = 0; i < contents.length; i++) {
      let data = contents[i];
      embedString += makeEmbedString(data.title, data.url);
    }
    return embedString;
  }

  function makeEmbedString(title, url) {
    return `<li><a href="${url}">${title}</a></li>`;
  }

  function writeToDocument(menuBarTemplate) {
    document
      .getElementById(CONTAINER_ID)
      .insertAdjacentHTML(POSITION_IN_CONTAINER, menuBarTemplate);
  }
}

export { constructMenuBar };
