import React from 'react'

const Toc = ({ toc }) => {
  return (
    <div class="animated fadeInLeft" style={{ animationDelay: `0.4s` }}>
      <p class="my-4 text-gray-600 font-light hidden lg:block">文章目录</p>
      <div
        class="toc-container hidden lg:block"
        dangerouslySetInnerHTML={{ __html: toc }}
      ></div>
    </div>
  )
}

export default Toc
