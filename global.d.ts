type PostFrontmatter = {
  title: string
  date: number    //创建日期
  summary: string
  lastModified: string //最后更新时间
  tags?: string[]
  toc?: boolean // 导航是否可见
  draft?: boolean
  slug: string
  url?: string
  heroImage?: string //顶部图片
  heroImageSize: string //顶部图片长宽比
}

type PaginationType = {
  currentPage: number,
  totalPages: number,
  path: string
}
