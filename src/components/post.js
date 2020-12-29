import React from 'react'

const Post = ({post}) => {
  return (
    <div className="content-wrapper py-32 lg:p-8 lg:w-3/4 post-detail animated fadeIn">
        <h1 className="text-3xl font-bold lg:mt-16">{post.frontmatter.title}</h1>
        <div className="text-sm text-gray-700 lg:my-8">
          { post.frontmatter.date }
        </div>
        {post.frontmatter.image && (
          <img className="post-feature-image rounded-lg mx-auto my-4" src={post.frontmatter.image} alt="" />
        )}
        <div className="post-content yue" dangerouslySetInnerHTML={{ __html: post.html }} />

        {/* <% post.tags.forEach(function(tag) { %>
          <a className="animated fadeInUp p-2 items-center text-sm text-gray-700 border hover:bg-gray-300 leading-none rounded-full flex lg:inline-flex m-4 " href="<%= tag.link %>">
            <span className="flex-auto"><%= tag.name %></span>
          </a>
        <% }); %> */}


        {/* <div className="flex justify-between py-8">
          <% if (post.prevPost) { %>
            <div className="prev-post">
              <a href="<%= post.prevPost.link %>">
                <h3 className="post-title">
                  <i className="ri-arrow-left-line"></i>
                  <%= post.prevPost.title %>
                </h3>
              </a>
            </div>
          <% } %>

          <% if (post.nextPost) { %>
            <div className="next-post">
              <a href="<%= post.nextPost.link %>">
                <h3 className="post-title">
                  <%= post.nextPost.title %>
                  <i className="ri-arrow-right-line"></i>
                </h3>
              </a>
            </div>
          <% } %> */}
        {/* </div> */}

      </div>
  )
}

export default Post