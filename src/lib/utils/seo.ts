import siteMeta from '@/data/siteMeta'
import type { Metadata } from 'next'

export const CommonSEO = (
  title: string,
  description: string,
  ogType,
  ogImage: string,
  twImgae: string
): Metadata => {
  return {
    title,
    description: description,
    openGraph: {
      description: description,
      title: title,
      type: ogType,
      images: ogImage,
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: twImgae,
    },
    robots: {
      index: true,
      follow: true,
    },
    icons: {
      icon: [
        { url: '/favicons/favicon.ico', type: 'image/x-icon' },
        {
          url: '/favicons/favicon-32x32.png',
          type: 'image/png',
          sizes: '32x32',
        },
        {
          url: '/favicons/favicon-16x16.png',
          type: 'image/png',
          sizes: '16x16',
        },
      ],
      apple: '/favicons/apple-touch-icon.png',
      other: [
        {
          rel: 'mask-icon',
          url: '/favicons/safari-pinned-tab.svg',
        },
      ],
    },
    alternates: {
      types: {
        'application/rss+xml': '/feed.xml',
      },
    },
    themeColor: [
      { media: '(prefers-color-scheme: light)', color: 'cyan' },
      { media: '(prefers-color-scheme: dark)', color: 'black' },
    ],
  }
}

export const PageSEO = (title: string, description: string) => {
  const ogImageUrl = siteMeta.siteUrl + siteMeta.socialBanner
  const twImageUrl = siteMeta.siteUrl + siteMeta.socialBanner
  return CommonSEO(title, description, 'website', ogImageUrl, twImageUrl)
}

export const TagSEO = (title: string, description: string, tag: string) => {
  const ogImageUrl = siteMeta.siteUrl + siteMeta.socialBanner
  const twImageUrl = siteMeta.siteUrl + siteMeta.socialBanner
  const tagSEO = CommonSEO(
    title,
    description,
    'website',
    ogImageUrl,
    twImageUrl
  )
  tagSEO.alternates = {
    types: {
      'application/rss+xml': `${siteMeta.siteUrl}${tag}/feed.xml`,
    },
  }
  return tagSEO
}

export const BlogSEO = (
  title: string,
  description: string,
  slug: string,
  heroImage: string
) => {
  const ogImageUrl = heroImage
    ? heroImage
    : siteMeta.siteUrl + siteMeta.socialBanner

  const twImageUrl = heroImage
    ? heroImage
    : siteMeta.siteUrl + siteMeta.socialBanner

  const blogSEO = CommonSEO(
    title,
    description,
    'article',
    ogImageUrl,
    twImageUrl
  )

  blogSEO.alternates = {
    canonical: `${siteMeta.siteUrl}/${slug}`,
  }

  return blogSEO
}
