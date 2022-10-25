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
  updated: string
  tags: string[]
  toc: string
  prev?: { title: string; url: string }
  next?: { title: string; url: string }
}
