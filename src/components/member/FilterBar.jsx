import { useState } from "react"
import { Link } from "react-router-dom"



export const MemberFilterBar = ({allRoutes, currentUser, setDisplayedRoutes}) => {
    const [state, setState] = useState([])

    const handleAllRoutes = () => {
        setDisplayedRoutes(allRoutes)
    }

    const handleLikesFilter = () => {
        const likedRoutes = allRoutes.filter(route => {
            return route.likes.some(like => like.userId === currentUser.id)
        })
        setDisplayedRoutes(likedRoutes)
    }

    const handleSentFilter = () => {
        const sentRoutes = allRoutes.filter(route => {
            return route.ticks.some(tick => tick.userId === currentUser.id)
        })
        setDisplayedRoutes(sentRoutes)
    }



return (<div>
            <button onClick={handleAllRoutes}>All</button>
            <button onClick={handleLikesFilter}>Liked</button>
            <button onClick={handleSentFilter}>Sent</button>
            {/* STRETCH GOAL */}
            {/* <button>Saved</button> */}
        </div>
)

}




