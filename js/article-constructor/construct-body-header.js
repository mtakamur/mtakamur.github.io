function constructBodyHeader() {
  let CONTAINER_ID = "container";
  let LOGO_IMAGE_PATH = "/images/logo.png";
  let BODY_HEADER_TEMPLATE = `
      <header id="body_header">
        <div id="logo" style="text-align: center">
          <a href="/index.html">
            <img src="${LOGO_IMAGE_PATH}" style="width: 150px; height: 46px"
          /></a>
        </div>
      </header>
  `;
  document
    .getElementById(CONTAINER_ID)
    .insertAdjacentHTML("afterbegin", BODY_HEADER_TEMPLATE);
}

export { constructBodyHeader };
