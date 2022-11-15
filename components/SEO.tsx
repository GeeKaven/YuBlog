import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import siteMeta from '@/data/siteMeta'

const CommonSEO = ({
  title,
  description,
  ogType,
  ogImage,
  twImage,
}: {
  title: string
  description: string
  ogType: string
  ogImage: string | { url: string }[]
  twImage: string
}) => {
  const router = useRouter()
  return (
    <Head>
      <title>{title}</title>
      <meta name='robots' content='follow, index' />
      <meta name='description' content={description} />
      <meta property='og:url' content={`${siteMeta.siteUrl}${router.asPath}`} />
      <meta property='og:type' content={ogType} />
      <meta property='og:site_name' content={siteMeta.title} />
      <meta property='og:description' content={description} />
      <meta property='og:title' content={title} />
      {typeof ogImage === 'string' ? (
        <meta property='og:image' content={ogImage} key={ogImage} />
      ) : (
        ogImage.map(({ url }) => (
          <meta property='og:image' content={url} key={url} />
        ))
      )}{' '}
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:site' content={siteMeta.twitter} />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:image' content={twImage} />
    </Head>
  )
}

type SEOProps = {
  title: string
  description: string
}

export const PageSEO = ({ title, description }: SEOProps) => {
  const ogImageUrl = siteMeta.siteUrl + siteMeta.socialBanner
  const twImageUrl = siteMeta.siteUrl + siteMeta.socialBanner
  return (
    <CommonSEO
      title={title}
      description={description}
      ogType='website'
      ogImage={ogImageUrl}
      twImage={twImageUrl}
    />
  )
}

export const TagSEO = ({ title, description }: SEOProps) => {
  const ogImageUrl = siteMeta.siteUrl + siteMeta.socialBanner
  const twImageUrl = siteMeta.siteUrl + siteMeta.socialBanner
  const router = useRouter()
  return (
    <>
      <CommonSEO
        title={title}
        description={description}
        ogType='website'
        ogImage={ogImageUrl}
        twImage={twImageUrl}
      />
      <Head>
        <link
          rel='alternate'
          type='application/rss+xml'
          title={`${description} - RSS feed`}
          href={`${siteMeta.siteUrl}${router.asPath}/feed.xml`}
        />
      </Head>
    </>
  )
}

export const BlogSEO = ({ title, summary, date, lastModified, url, heroImage }: PostFrontmatter) => {
  const router = useRouter()
  const publishedAt = new Date(date).toISOString()
  const modifiedAt = new Date(lastModified || date).toISOString()
  const imagesArr = heroImage ? [heroImage] : [siteMeta.socialBanner]

  const featuredImages = imagesArr.map((img) => {
    return {
      '@type': 'ImageObject',
      url: img.includes('http') ? img : siteMeta.siteUrl + img,
    }
  })

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    headline: title,
    image: featuredImages,
    datePublished: publishedAt,
    dateModified: modifiedAt,
    author: siteMeta.author,
    publisher: {
      '@type': 'Organization',
      name: siteMeta.author,
      logo: {
        '@type': 'ImageObject',
        url: `${siteMeta.siteUrl}${siteMeta.siteLogo}`,
      },
    },
    description: summary,
  }

  const twImageUrl = featuredImages[0].url

  return (
    <>
      <CommonSEO
        title={title}
        description={summary}
        ogType='article'
        ogImage={featuredImages}
        twImage={twImageUrl}
      />
      <Head>
        {date && (
          <meta property='article:published_time' content={publishedAt} />
        )}
        {lastModified && (
          <meta property='article:modified_time' content={modifiedAt} />
        )}
        <link rel='canonical' href={`${siteMeta.siteUrl}${router.asPath}`} />
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData, null, 2),
          }}
        />
      </Head>
    </>
  )
}
