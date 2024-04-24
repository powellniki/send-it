import { useEffect, useState } from 'react'
import { getUserById, updateUser } from '../../services/userService.js'
import { useNavigate } from 'react-router-dom'
import './profile.css'



export const EmployeeEditProfile = ({currentUser}) => {
    const [employee, setEmployee] = useState({})

    const navigate = useNavigate()


    useEffect(() => {
        getUserById(currentUser.id).then(userData => {
            const userObject = userData[0]
            setEmployee(userObject)
        }) 
    },[])

    const handleInputChange = (event) => {
        const employeeCopy = {...employee}
        employeeCopy[event.target.name] = event.target.value
        setEmployee(employeeCopy)
    }

    const handleProfileSave = (event) => {
        event.preventDefault()
        console.log('profile saved')

        const editedEmployee = {
            id: employee.id,
            fullName: employee.fullName,
            email: employee.email,
            isStaff: "true"
        }
        updateUser(editedEmployee).then(() => {
            navigate('/profile')
        })
    }


    return (
        <form className="profile">
            <h2>Update Profile</h2>
            <fieldset>
                <div className="form-group">
                    <label>Name: </label>
                    <input 
                        type="text"
                        name="fullName"
                        value={employee.fullName}
                        onChange={handleInputChange}
                        className="form-control"
                        required
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label>Email: </label>
                    <input 
                        type="text"
                        name="email"
                        value={employee.email}
                        onChange={handleInputChange}
                        className="form-control"
                        required
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <button onClick={handleProfileSave}>Save Changes</button>
                </div>
            </fieldset>
        </form>
    )  
}