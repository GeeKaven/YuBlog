import React from 'react'
import { getIcon, getLink } from './utils'

const SocialLink = ({ social, description }) => {
  return (
    <div
      className="hidden lg:block animate__animated animate__fadeInLeft"
      style={{ animationDelay: `0.4s` }}
    >
      <p className="my-4 text-gray-600 font-light hidden lg:block">
        {description}
      </p>
      <div
        className="animate__animated animate__fadeInLeft social-container hidden lg:block flex flex-row"
        style={{ animationDelay: `0.6s` }}
      >
        <ul className="text-xl text-gray-400 font-light flex content-center items-center justify-start flex-wrap		">
          {Object.entries(social).map(entry => {
            const [sitename, username] = entry
            return (
              <li className="mr-4 hover:text-gray-900">
                <a
                  key={sitename}
                  href={getLink(sitename, username)}
                  target="_blank"
                  rel="noreferrer"
                >
                  {getIcon(sitename)}
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default SocialLink
