module.exports = {
  siteMetadata: {
    title: `GeeKaven's`,
    image: `/gatsby-icon.png`,
    description: `A starter blog demonstrating what Gatsby can do.`,
    siteUrl: `https://gatsby-starter-blog-demo.netlify.app/`,
    social: {
      twitter: 'geekaven',
      github: 'geekaven',
      email: '',
    },
    sidebarMenu: [
      { url: "/archive/", label: "归档" },
      { url: "/tags/", label: "标签" },
      { url: "/about", label: "About" },
    ],
    footerHTML: `© 2021 <a href="https://github.com/geekaven">GeeKaven</a> All rights reserved.`,
    dateFormat: `YYYY-MM-DD`,
    language: `zh`,
    cdn: [
      `https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.10.0/katex.min.css`,
      `https://cdn.jsdelivr.net/npm/remixicon@2.3.0/fonts/remixicon.css`,
      `https://fonts.googleapis.com/css?family=Droid+Serif:400,700`,
      `https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css`,
    ],
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content`,
        name: `content`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 630,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        //trackingId: `ADD YOUR TRACKING ID HERE`,
      },
    },
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Gatsby Starter Blog`,
        short_name: `GatsbyJS`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `static/gatsby-icon.png`,
      },
    },
    `gatsby-plugin-react-helmet`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    `gatsby-plugin-postcss`,
  ],
}
