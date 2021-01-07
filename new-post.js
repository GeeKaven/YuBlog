const fs = require('fs')
const dayjs = require('dayjs')

const template = `---\ntitle: {title}\ndate: {date}\ntags: []\ndescription: '没有就删掉'\nimage: '没有就删掉'\n---`

const title = process.argv[2]
const date = dayjs().format('YYYY-MM-DD HH:mm:ss')

if (process.argv.length <= 2) {
  console.error('please enter the title')
  process.exit(1)
}

let replaceContent = template.replace(`{title}`, title).replace(`{date}`, date)
let path = `./content/posts/${title}.md`

fs.writeFile(path, replaceContent, (err) => {
  if (err) {
    return console.error(err)
  }
  console.log(`new post generated at ${path}`)
})
