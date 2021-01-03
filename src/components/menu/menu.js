import { Link } from 'gatsby'
import React from 'react'

const Menu = ({ menu }) => {
  const closeMenu = () => {}

  const openMenu = () => {}

  return (
    <div className="menu-container">
      <i
        className="ri-arrow-left-line text-2xl cursor-pointer animated fadeIn close-menu-btn"
        onClick={closeMenu}
      ></i>
      <div>
        {menu &&
          menu.map((item, index) => (
            <Link
              to={item.url}
              className="menu"
              style={`animation-delay: ${index * 0.2}s`}
              key={item.url}
            >
              {item.label}
            </Link>
          ))}
      </div>
    </div>
  )
}

export default Menu
