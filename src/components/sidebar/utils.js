import {
  RiMailLine,
  RiGithubLine,
  RiLinkedinLine,
  RiRssLine,
  RiTelegramLine,
  RiTwitterLine,
  RiShareLine
} from 'react-icons/ri'

import React from 'react'

export const getIcon = siteName => {
  switch (siteName) {
    case 'mail':
      return <RiMailLine />
    case 'github':
      return <RiGithubLine />
    case 'linkedin':
      return <RiLinkedinLine />
    case 'rss':
      return <RiRssLine />
    case 'telegram':
      return <RiTelegramLine />
    case 'twitter':
      return <RiTwitterLine />
    default:
      return <RiShareLine />
  }
}

export const getLink = (siteName, username) => {
  switch (siteName) {
    case 'mail':
      return `mailto:${username}`
    case 'github':
      return `https://github.com/${username}`
    case 'linkedin':
      return `https://www.linkedin.com/in/${username}`
    case 'rss':
      return username
    case 'telegram':
      return `https://t.me/${username}`
    case 'twitter':
      return `https://twitter.com/${username}`
    default:
      return username
  }
}
