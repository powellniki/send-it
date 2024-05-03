import { useNavigate } from 'react-router-dom'
import profilePicture from '/Users/nikipowell/workspace/send-it/src/components/pictures/carabiner.jpeg'
import { useEffect, useState } from 'react'
import { getUserById } from '../../services/userService.js'
import './employeeProfile.css'



export const EmployeeProfile = ({currentUser}) => {
    const [employee, setEmployee] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        getUserById(currentUser.id).then(userData => {
            const userObject = userData[0]
            setEmployee(userObject)
        })
    },[])

    
    const navigateToEditProfile = () => {
        navigate('/profile/edit')
    }


    return (
        <div className="employee-profile-container">

            <div className='circular-gradient'>

                <div className="employee-profile-details">

                    <div className="employee-profile-information">
                        <div className="user-name">{employee.fullName}</div>
                        <div className="user-email"><span className='user-info'>Email: </span>{employee.email}</div>
                    </div>
                    <div className="employee-profile-edit">
                        <button className="employee-btn-edit" onClick={navigateToEditProfile}>edit</button>
                    </div>

                </div>

            </div>

        </div>
    )
}