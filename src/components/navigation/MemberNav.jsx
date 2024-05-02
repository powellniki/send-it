import { Link, useNavigate } from "react-router-dom"
import "./memberNav.css"

export const MemberNav = () => {
    const navigate = useNavigate()

    return (
        <ul className="member-navbar">

            <div className="navbar-logo">
                <li className="navbar-item">
                    <div className="navbar-title">
                        <Link className="nav-text" to="/">
                            <span className="logo1">send</span><span className="logo2">it</span>
                        </Link>
                    </div>
                </li>
            </div>

            <div className="navbar-elements">
                <li className="navbar-item">
                    <Link className="nav-text" to="myroutes">myroutes</Link>
                </li>
                <li className="navbar-item">
                    <Link className="nav-text" to="myprofile">profile</Link>
                </li>
                <li className="navbar-item">
                    <Link className="nav-text" to="search">routefinder</Link>
                </li>
            </div>

            <div className="navbar-logout">
                {localStorage.getItem("sendit_user") ? (
                    <li className="navbar-item navbar-logout">
                        <Link
                        to=""
                        onClick={() => {
                            localStorage.removeItem("sendit_user")
                            navigate("/login", { replace: true })
                        }}
                        >
                        logout
                        </Link>
                    </li>
                ) : (
                    ""
                )}
            </div>

        </ul>
    )
}