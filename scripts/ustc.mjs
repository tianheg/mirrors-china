import fs from 'fs'
import { Buffer } from 'buffer'

let softwareList = []

export default function getUstc() {
  fetch(
    'https://api.github.com/repos/mirrorz-org/mirrorz-publish/contents/static/json/legacy/ustc.json'
  )
    .then((response) => response.json())
    .then((data) => {
      let sources = JSON.parse(Buffer.from(data.content, 'base64').toString('utf8'))

      sources.mirrors.map((mirror) => {
        softwareList.push(mirror.cname)
      })
    })
    .finally(() => {
      const items = JSON.parse(fs.readFileSync(process.cwd() + '/static/data.json'))
      items.map((item) => {
        if (item.name === '中国科学技术大学') {
          item.item = softwareList
        }
      })
      fs.writeFileSync(process.cwd() + '/static/data.json', JSON.stringify(items, null, 2))
    })
}
