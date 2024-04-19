import { useNavigate } from 'react-router-dom'
import profilePicture from '/Users/nikipowell/workspace/send-it/src/components/pictures/carabiner.jpeg'
import './profile.css'
import { useEffect, useState } from 'react'
import { getUserById } from '../../services/userService.js'



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
        <div className="profile-container">
            <div className="profile-picture">
                <img src={profilePicture}/>
            </div>
            <div className="profile-information">
                <div className="user-name"><span className='user-info'>Name: </span>{employee.name}</div>
                <div className="user-email"><span className='user-info'>Email: </span>{employee.email}</div>
            </div>
            <div className="profile-edit">
                <button className="btn-edit" onClick={navigateToEditProfile}>Edit Profile</button>
            </div>
        </div>
    )
}