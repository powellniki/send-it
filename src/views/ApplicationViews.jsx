import { useEffect, useState } from "react"
import { MemberViews } from "./MemberViews.jsx"
import { EmployeeViews } from "./EmployeeViews.jsx"



export const ApplicationViews = () => {
    const [currentUser, setCurrentUser] = useState({})
    

    useEffect(() => {
        const localUser = localStorage.getItem("sendit_user")
        const localUserObject = JSON.parse(localUser)
        setCurrentUser(localUserObject)
    }, [])


    return currentUser.isStaff ? <EmployeeViews currentUser={currentUser} /> : <MemberViews currentUser={currentUser}/>
}