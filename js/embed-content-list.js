/**
 * A script to generate contents list based on /js/json/content_list.json
 */
const JSON_PATH = "/js/json/content_list.json"
document.write(makeContent());

function makeContent() {
    return '<li><a href="/index.html">generation test</a></li>'
}

function embedContentList() {
    console.log("test")
}

function parseJson() {
    let contentsList = 0
}