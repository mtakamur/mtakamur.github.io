import constructDate from "/js/article-constructor/construct-date.js";
import constructHeader from "/js/article-constructor/construct-header.js";
import constructMenuBar from "/js/article-constructor/construct-menu-bar.js";
import constructBodyHeader from "/js/article-constructor/construct-body-header.js";

/**
 * Script to construct article page (common contents).
 */
function constructArticle(...path) {
  constructDate(path);

  /**
   * Obtain json from given path.
   */
  function getArticleJson(...path) {}
}
