function constructMenuBar() {
  let CONTAINER_ID = "body";
  let POSITION = "afterbegin";

  /**
   * Menu bar template to embed in article.
   * WIP.
   */
  let MENU_BAR_TEMPLATE = `
    <div id="menubar">
      <ul>
        <li><a href="/index.html">Home</a></li>
        <li>
          <a>Contents <span class="caret"></span></a>
          <div>
            <ul id="contents"></ul>
          </div>
        </li>
      </ul>
    </div>
  `;
  document
    .getElementById(CONTAINER_ID)
    .insertAdjacentHTML(POSITION, MENU_BAR_TEMPLATE);
}

export { constructMenuBar };
