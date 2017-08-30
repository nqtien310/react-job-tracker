import { Link, withRouter } from 'react-router-dom'
import React from 'react'

function NavLink(props) {
  let pathname = props.history.location.pathname

  return(
    <li className={"nav-item" + (pathname==props.to ? " active" : "")}>
      <Link to={props.to} className="nav-link">
        {props.label}
      </Link>
    </li>
  )
}

export default withRouter(NavLink)
