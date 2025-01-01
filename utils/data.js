const { JSDOM } = require('jsdom');

const extract = (html) => {
    try {
        // fs.writeFileSync('scrape.html',html)
        const dom = new JSDOM(html);
        const document = dom.window.document
        const trends = document.querySelectorAll("div[data-testid='trend']")

        const arr = []
        trends.forEach((item) => {
            arr.push(item.querySelector('div[dir="ltr"]:nth-child(2) > span')?.textContent.trim())
        })
        console.log(arr)
        return { trends: arr }
    } catch (err) {
        console.error(err.message)
        return { trends: [] }
    }
}
module.exports = extract;