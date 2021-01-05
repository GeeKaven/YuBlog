import React from 'react'

const Toc = ({ toc }) => {

  if (!toc) {
    return <></>
  }

  return (
    <div className="animated fadeInLeft" style={{ animationDelay: `0.4s` }}>
      <p className="my-4 text-gray-600 font-light hidden lg:block">文章目录</p>
      <div
        className="toc-container hidden lg:block"
        dangerouslySetInnerHTML={{ __html: toc }}
      ></div>
    </div>
  )
}

export default Toc
