const URL = 'https://mirrors.cloud.tencent.com/'
// cannot get content
let softwareList = []
document.querySelectorAll('tbody tr td:first-child').forEach(elem => softwareList.push(elem.innerText))
console.log(softwareList)
