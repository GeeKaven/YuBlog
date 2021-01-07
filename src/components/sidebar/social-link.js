import React from 'react'
import { getLink } from './utils'

const SocialLink = ({ social, description }) => {
  return (
    <div className="animate__animated animate__fadeInLeft" style={{ animationDelay: `0.4s` }}>
      <p className="my-4 text-gray-600 font-light hidden lg:block">
        {description}
      </p>
      <div
        className="animate__animated animate__fadeInLeft social-container hidden lg:block"
        style={{ animationDelay: `0.6s` }}
      >
        {Object.entries(social).map(entry => {
          const [sitename, username] = entry
          return (
            <a
              key={sitename}
              href={getLink(sitename, username)}
              target="_blank"
              rel="noreferrer"
              className="mr-4 text-xl text-gray-400 font-light hover:text-gray-900"
            >
              <i className={`ri-${sitename}-line`}></i>
            </a>
          )
        })}
      </div>
    </div>
  )
}

export default SocialLink
