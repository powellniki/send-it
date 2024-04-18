import { Link, useNavigate } from "react-router-dom"
import "./navigation.css"

export const EmployeeNav = () => {
    const navigate = useNavigate()

    return (
        <ul className="navbar">
            <li className="navbar-info">
                <Link to="/">Home</Link>
            </li>
            <li className="navbar-info">
                <Link to="/profile">My Profile</Link>
            </li>
            <li className="navbar-info">
                <Link to="/myroutes">My Routes</Link>
            </li>
            <li className="nav-new-route">
                <Link to="/newroute">New Route</Link>
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