import { Link, useNavigate } from "react-router-dom"
import "./navigation.css"

export const MemberNav = () => {
    const navigate = useNavigate()

    return (
        <ul className="navbar">
            <div className="navbar-title">
                <li className="navbar-info">
                    <Link className="nav-text">send<span className="green-font">it</span></Link>
                </li>
            </div>
            <div className="navbar-routes">
                <li className="navbar-info">
                    <Link className="nav-text" to="home">my routes</Link>
                </li>
                <li className="navbar-info">
                    <Link className="nav-text" to="myprofile">profile</Link>
                </li>
                <li className="navbar-info">
                    <Link className="nav-text" to="search">route finder</Link>
                </li>
            </div>
            <div className="navbar-logout">
                {localStorage.getItem("sendit_user") ? (
                    <li className="navbar-info navbar-logout">
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