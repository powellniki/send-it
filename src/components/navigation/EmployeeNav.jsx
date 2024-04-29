import { Link, useNavigate } from "react-router-dom"
import './employeeNav.css'


export const EmployeeNav = () => {
    const navigate = useNavigate()

    return (
        <ul className="employee-navbar">

            <div className="navbar-logo">
                <li className="navbar-item">
                    <div className="navbar-title">
                        <span className="logo1">send</span><span className="logo2">it</span>
                    </div>
                </li>
            </div>

            <div className="navbar-elements">
                <li className="navbar-item">
                    <Link className="nav-text" to="/">allroutes/</Link>
                </li>

                <li className="navbar-item">
                    <Link className="nav-text" to="/myroutes">myroutes/</Link>
                </li>

                <li className="navbar-item">
                    <Link className="nav-text" to="/profile">profile/</Link>
                </li>

                <li className="navbar-item">
                    <Link className="nav-text nav-new-route" to="/newroute">newroute</Link>
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
                        Logout
                        </Link>
                    </li>
                ) : (
                    ""
                )}
            </div>

        </ul>
    )
}