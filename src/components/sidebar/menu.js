import { Link } from 'gatsby'
import React from 'react'

const Menu = ({ menu }) => {
  console.log(menu)
  return (
    <div className="menu-container">
      {menu &&
        menu.map((item, index) => (
          <Link
            to={item.url}
            className="menu"
            style={{animationDelay: `${index * 0.2}s`}}
            key={item.url}
          >
            {item.label}
          </Link>
        ))}
    </div>
  )
}

export default Menu
