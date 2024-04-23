import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getRoutesByRouteId } from "../../services/routeService.js"
import { getLikesByRouteId, postLikes } from "../../services/likeServices.js"
import { deleteTick, postTicks } from "../../services/tickServices.js"
import { getTicksByRouteId } from "../../services/tickServices.js"


const setDate = () => {
    const today = new Date()
    const day = today.getDate()
    const month = today.getMonth()
    const year = today.getFullYear()
    return `${month}/${day}/${year}`
}



export const RouteDetails = ({currentUser}) => {
    const [route, setRoute] = useState({})
    const [likesExpandRoute, setLikesExpandRoute] = useState([])
    const [ticksExpandRoute, setTicksExpandRoute] = useState([])
    const [update, setUpdate] = useState(false)

    const {routeId} = useParams()
    const navigate = useNavigate()

    const getAndSetRoute = () => {
        getRoutesByRouteId(routeId).then(routeData => {
            const routeObject = routeData[0]
            setRoute(routeObject)
        }) 
    }

    const getLikesForRoute = () => {
        getLikesByRouteId(routeId).then(likesArray => {
            setLikesExpandRoute(likesArray)
        }) 
    }

    const getTicksforRoute = () => {
        getTicksByRouteId(routeId).then(tickArray => {
            setTicksExpandRoute(tickArray)
        })
    }

        useEffect(() => {
            getAndSetRoute()
            getLikesForRoute()
            getTicksforRoute()
        },[currentUser, update])



    const checkIfLiked = () => {
        const likedByMember = likesExpandRoute.some(like => like.userId === currentUser.id)
            if (!likedByMember) {
                handleLike()

            } else {
                window.alert('you already like this route')
            }
    }

    const handleLike = () => {
        const newLike = {
            userId: currentUser.id,
            routeId: route.id
        }
        postLikes(newLike).then(getAndSetRoute()).then(getLikesForRoute())
    }


    const checkIfTicked = () => {
        const tickedByMember = ticksExpandRoute.some(tick => tick.userId === currentUser.id)
            if (!tickedByMember) {
                handleTick()
            } else {
                window.alert('you have already ticked this route')
            }
    }

    const handleTick = () => {
        const newTick = {
            date: setDate(),
            userId: currentUser.id,
            routeId: route.id
        }
        postTicks(newTick).then(setUpdate(!update))
    }

    const handleDelete = (tickId) => {
        deleteTick(tickId).then(setUpdate(!update))

    }


    return (
        <section className="route-information">
            <h2>{route.name}</h2>
            <div className="route-image">
                <div>route image</div>
            </div>
            <div className="route">
                <div>Type: {route.type?.name}</div>
                <div>Grade: {route.grade?.name}</div>
                <div>Style: {route.style?.name}</div>
                <div>Setter: {route.user?.fullName}</div>
                <div>Date Set: {route.dateSet}</div>
                <div>Description: {route.description}</div>
            </div>
            <div className="route-buttons">
                <button onClick={checkIfTicked}>tick</button>
                <button onClick={checkIfLiked}>like</button>
                <button>comment</button>
            </div>
            <div className="route-activity">
                <h4>Activity: </h4>
                <div>
                    {ticksExpandRoute.map(tick => {
                        return (
                            <div key={tick.id} className="activity-item">
                                <div>{tick.user?.fullName} climbed this route on {tick.date}</div>
                                <div>
                                    {tick.userId === currentUser.id ? <button onClick={() => {handleDelete(tick.id)}}>Delete</button> : ""}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="route-comments">
                <h4>Comments:</h4>
            </div>
        </section>
    )
}