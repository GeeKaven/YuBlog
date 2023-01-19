export default function Head() {
  return (
    <>
      <title>My Page Title</title>
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <link rel='icon' type='image/x-icon' href='/favicons/favicon.ico' />
      <link
        rel='apple-touch-icon'
        sizes='76x76'
        href='/favicons/apple-touch-icon.png'
      />
      <link
        rel='icon'
        type='image/png'
        sizes='32x32'
        href='/favicons/favicon-32x32.png'
      />
      <link
        rel='icon'
        type='image/png'
        sizes='16x16'
        href='/favicons/favicon-16x16.png'
      />
      <link rel='manifest' href='/favicons/site.webmanifest' />
      <link
        rel='mask-icon'
        href='/favicons/safari-pinned-tab.svg'
        color='#5bbad5'
      />
      <meta name='msapplication-TileColor' content='#000000' />
      <meta
        name='theme-color'
        media='(prefers-color-scheme: light)'
        content='#fff'
      />
      <meta
        name='theme-color'
        media='(prefers-color-scheme: dark)'
        content='#000'
      />
      <link rel='alternate' type='application/rss+xml' href='/feed.xml' />
      {/* <link rel='preconnect' href='https://fonts.googleapis.com' />
      <link
        rel='preconnect'
        href='https://fonts.gstatic.com'
        crossOrigin='anonymous'
      />
      <link
        href='https://fonts.googleapis.com/css2?family=JetBrains+Mono&display=swap'
        rel='stylesheet'
      /> */}
    </>
  )
}
