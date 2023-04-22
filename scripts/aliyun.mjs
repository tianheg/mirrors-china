import fs from 'fs'
import { JSDOM } from 'jsdom'

let softwareList = []
const URL = 'https://developer.aliyun.com/mirror/'
export default function getAliyun() {
  JSDOM.fromURL(URL)
    .then((dom) => {
      const items = dom.window.document.querySelectorAll('.content-item .title-text')
      items.forEach((item) => {
        softwareList.push(item.textContent)
      })
    })
    .finally(() => {
      const items = JSON.parse(fs.readFileSync(process.cwd() + '/static/data.json'))
      items.map((item) => {
        if (item.name === '阿里云') {
          item.item = softwareList
        }
      })
      fs.writeFileSync(process.cwd() + '/static/data.json', JSON.stringify(items, null, 2))
    })
}
