export const getLink = (siteName, username) => {
  switch (siteName) {
    case "email":
      return `mailto:${username}`
    case "github":
      return `https://github.com/${username}`
    case "linkedin":
      return `https://www.linkedin.com/in/${username}`
    case "rss":
      return username
    case "telegram":
      return `https://t.me/${username}`
    case "twitter":
      return `https://twitter.com/${username}`
    default:
      return username
  }
}
