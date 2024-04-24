import { Link, useNavigate } from "react-router-dom"
import "./navigation.css"

export const MemberNav = () => {
    const navigate = useNavigate()

    return (
        <ul className="navbar">
            <li className="navbar-info">
                <Link to="home">Routes</Link>
            </li>
            <li className="navbar-info">
                <Link to="myprofile">My Profile</Link>
            </li>
            <li className="navbar-info">
                <Link to="search">Find a Route</Link>
            </li>

            {localStorage.getItem("sendit_user") ? (
                <li className="navbar-info navbar-logout">
                    <Link
                    to=""
                    onClick={() => {
                        localStorage.removeItem("sendit_user")
                        navigate("/login", { replace: true })
                    }}
                    >
                    Logout
                    </Link>
                </li>
            ) : (
                ""
            )}
        </ul>
    )
}