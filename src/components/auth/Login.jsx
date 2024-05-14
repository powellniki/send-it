import React, { useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { getUserByEmail } from "../../services/userService"
import "./Login.css"




export const Login = () => {
  const [email, setEmail] = useState("")
  const [animate, setAnimate] = useState(false)
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()

    setAnimate(true)

    setTimeout(() => {
      getUserByEmail(email).then((foundUsers) => {
        if (foundUsers.length === 1) {
          const user = foundUsers[0];
          localStorage.setItem(
            "sendit_user",
            JSON.stringify({
              id: user.id,
              name: user.name,
              isStaff: user.isStaff,
              email: user.email
            }) 
          );



          // If the user is staff, redirect them to the employee home view
          if (user.isStaff) {
            navigate("/");
          } else {
            // If the user is not staff, navigate to the welcome page
            navigate("/welcome");
          }
        } else {
          window.alert("Invalid login");
          setAnimate(false);
        }
      });
    }, 1000);
  };

  return (
    <div className={`login-page ${animate ? 'fade-out' : 'fade-in'}`}>
    
    <div className="auth-container">

      <section className="auth-content">

        <form className="auth-form" onSubmit={handleLogin}>


          <fieldset className="auth-fieldset">

            <div>
              <input
                type="email"
                value={email}
                className="auth-form-input"
                onChange={(evt) => setEmail(evt.target.value)}
                placeholder="Email address"
                required
                autoFocus
                />
            </div>

          </fieldset>

          <fieldset className="auth-fieldset">
            <div>
              <button type="submit">Sign in</button>
            </div>
          </fieldset>
          <section className="register-link">
            <Link to="/register">Not a member yet?</Link>
          </section>
        </form>

      </section>

      <div className="landing">
        <h1 className="landing-one">elevate your climbing</h1>
        <h1 className="auth-logo"><span>send</span>it</h1>
      </div>

    </div>

  </div>
  )
}
