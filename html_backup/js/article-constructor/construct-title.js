function constructTitle(article) {
  let CONTAINER_ID = "container";
  let POSITION_IN_CONTAINER = "afterbegin";
  let STYLE = `style="text-align: left"`;
  let TITLE_TEMPLATE = `
	<h1 ${STYLE}>${article.title}</h1>
	`;

  writeToDocument(TITLE_TEMPLATE);

  function writeToDocument(menuBarTemplate) {
    document
      .getElementById(CONTAINER_ID)
      .insertAdjacentHTML(POSITION_IN_CONTAINER, menuBarTemplate);
  }
}

export { constructTitle };
