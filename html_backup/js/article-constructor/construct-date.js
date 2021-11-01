/**
 * A script to embed article date based on /js/json/content_list.json
 */
function constructDate(article) {
  let CONTAINER_ID = "container";
  let POSITION_IN_CONTAINER = "afterbegin";
  let STYLE = `style="text-align: right"`;

  writeDateToDocument(makeDateString(article));

  // Functions called in the main sequence.
  function makeDateString(article) {
    let dateNode = article.date;

    return makeEmbedString(
      formatDate(dateNode.year, dateNode.month, dateNode.date)
    );

    function formatDate(year, month, date) {
      let splitter = "/";
      return year + splitter + month + splitter + date;
    }

    function makeEmbedString(dateString) {
      return `<p ${STYLE}>更新日: ${dateString}</p>`;
    }
  }

  function writeDateToDocument(dateString) {
    document
      .getElementById(CONTAINER_ID)
      .insertAdjacentHTML(POSITION_IN_CONTAINER, dateString);
  }
}

export { constructDate };
