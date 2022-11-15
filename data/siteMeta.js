import {FiGithub,FiTwitter, FiMail } from 'react-icons/fi'

const SiteMeta = {
  title: "GeeKaven's blog",
  headerTitle: 'Tawawa',
  author: 'GeeKaven',
  description: 'Code for Life, Code for ACG',
  language: 'zh',
  theme: 'system',
  siteUrl: 'https://tawawa.moe',
  siteLogo: '/images/logo.png',
  avatar: '/images/avatar.jpeg',
  socialBanner: '/images/twitter-card.png',
  socials: [
    { label: 'Github', icon: <FiGithub className="text-lg" aria-hidden />, link: 'https://github.com/imzxj' },
    { label: 'Twitter', icon: <FiTwitter className="text-lg" aria-hidden />, link: 'https://twitter.com/tawawa_moe' },
    { label: 'Email', icon: <FiMail className="text-lg" aria-hidden />, link: 'mailto:i@tawawa.moe' },
  ],
}

export default SiteMeta
