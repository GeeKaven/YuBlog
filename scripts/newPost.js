const fs = require('fs/promises')
const path = require('path')
const dayjs = require('dayjs')

function buildFrontmatter(filename, tags) {
  return `
  ---
  title: '${filename}',
  date: ${dayjs().format('YYYY-MM-DD HH:mm:ss')},
  tags: [${tags.map(tag => `'${tag}'`)}]
  ---
  `
}

// pnpm new blog/remark "filename" tag1 tag2 tag3
async function createPost() {

  const [, , type, filename, ...tags] = process.argv

  if (!type || !filename) {
    console.log('请按照以下输入: pnpm new blog/remark filename tag1 tag2')
    return
  }

  const filePath = `./posts/${type}/${dayjs().format('YYYYMMDD')}-${filename}.md`;

  await fs.writeFile(
    path.resolve(process.cwd(), filePath),
    buildFrontmatter(filename, tags)
  )

  console.log(`文章创建成功: ${filePath}`)
}

createPost()