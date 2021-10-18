function constructBodyHeader() {
  let containerId = "container";
  let logoImage = "/images/logo.png";
  let bodyHeaderTemplate = `
      <header id="body_header">
        <div id="logo" style="text-align: center">
          <a href="/index.html">
            <img src="${logoImage}" style="width: 150px; height: 46px"
          /></a>
        </div>
      </header>
  `;
  document
    .getElementById(containerId)
    .insertAdjacentHTML("afterbegin", bodyHeaderTemplate);
}
