import { Article } from "/js/article-constructor/Article.js";

/**
 * Find article from "articles.json" by given path and article id.
 * @param {*} path Node reach to articles array.
 * @param {*} articleId ID of the article you're looking for.
 * @returns [Article] instance contained Promise.
 */
function findArticleJson(path, articleId) {
  let JSON_PATH = "/js/json/articles.json";
  return fetchJson(JSON_PATH)
    .then((jsonData) => findArticleNode(jsonData, path, articleId))
    .then((articleNode) => new Article(articleNode));
}

/** Obtain json from given path. */
function fetchJson(jsonPath) {
  return fetch(jsonPath).then((response) => response.json());
}

/** Find an article node by given nodePath and articleId. */
function findArticleNode(articles, nodePath, articleId) {
  let articleNode = articles;
  for (let iNode = 0; iNode < nodePath.length; iNode++) {
    articleNode = articleNode[nodePath[iNode]];
  }

  for (let iArticle = 0; iArticle < articleNode.length; iArticle++) {
    if (articleNode[iArticle].id == articleId) {
      return articleNode[iArticle];
    }
  }
}

export { findArticleJson };
