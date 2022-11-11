export type PostInfoType = {
  title: string
  date: string
  year: string
  slug: string
}

export type PostType = {
  permalink: string
  title: string
  date: string
  content: string
  raw: string
  updated: string
  tags: string[]
  toc: string
  prev?: { title: string; url: string }
  next?: { title: string; url: string }
}

export type PostFrontmatter = {
  title: string
  date: number    //创建日期
  tags?: string[]
  toc?: boolean // 导航是否可见
  draft?: boolean
  slug: string
}
