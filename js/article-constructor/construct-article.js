import { findArticleJson } from "/js/article-constructor/find-article-json.js";
import { constructDate } from "/js/article-constructor/construct-date.js";
import { constructHeader } from "/js/article-constructor/construct-header.js";
import { constructMenuBar } from "/js/article-constructor/construct-menu-bar.js";
import { constructBodyHeader } from "/js/article-constructor/construct-body-header.js";
import { constructTitle } from "/js/article-constructor/construct-title.js";
import { hljs } from "/js/highlight/highlight.pack.js";

/**
 * Script to construct article page (common contents).
 */
function constructArticle(articleNodePath, articleId) {
  findArticleJson(articleNodePath, articleId).then((article) => {
    //constructHeader(); // The "head" tag should be hardcorded?
    constructTitle(article);
    constructDate(article);
    constructBodyHeader();
    constructMenuBar();
    hljs.highlightAll();
  });
}

export { constructArticle };
