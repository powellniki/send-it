import { useEffect, useState } from "react"



export const ApplicationViews = () => {
    const [currentUser, setCurrentUser] = useState({})
    

    useEffect(() => {
        const localUser = localStorage.getItem("learning_user")
        const localUserObject = JSON.parse(localUser)
        setCurrentUser(localUserObject)
    }, [])

    return (
        <>This is my site</>
    )
}