import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getRoutesByRouteId } from "../../services/routeService.js"
import { getLikesByRouteId, postLikes } from "../../services/likeServices.js"
import { deleteTick, postTicks } from "../../services/tickServices.js"
import { getTicksByRouteId } from "../../services/tickServices.js"
import { getCommentsbyRouteId } from "../../services/commentService.js"
import { getToDosByRouteId, postToDo } from "../../services/toDoServices.js"


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
    const [todosExpandRoute, setTodosExpandRoute] = useState([])
    const [commentsExpandRoute, setCommentsExpandRoute] = useState([])
    const [update, setUpdate] = useState(false)

    const {routeId} = useParams()
    const navigate = useNavigate()


    // GET ALL INFORMATION FOR ROUTES
    const getAndSetRoute = () => {
        getRoutesByRouteId(routeId).then(routeData => {
            const routeObject = routeData[0]
            setRoute(routeObject)
        }) 
    }
    const getToDosForRoute = () => {
        getToDosByRouteId(routeId).then(todoArray => {
            setTodosExpandRoute(todoArray)
        })
    }
    const getTicksForRoute = () => {
        getTicksByRouteId(routeId).then(tickArray => {
            setTicksExpandRoute(tickArray)
        })
    }
    const getLikesForRoute = () => {
        getLikesByRouteId(routeId).then(likesArray => {
            setLikesExpandRoute(likesArray)
        }) 
    }
    const getCommentsForRoute = () => {
        getCommentsbyRouteId(routeId).then(commentsArray => {
            setCommentsExpandRoute(commentsArray)
        })
    }
    useEffect(() => {
        getAndSetRoute()
        getLikesForRoute()
        getTicksForRoute()
        getCommentsForRoute()
        getToDosForRoute()
    },[currentUser, update])


    // CHECKS IF USER HAS MARKED A ROUTE AS TO DO AND IF NOT THEY CAN MARK IT
    const checkIfToDo = () => {
        const toDoByMember = todosExpandRoute.some(todo => todo.userId === currentUser.id)
        if (!toDoByMember) {
            handleToDo()
        } else {
            window.alert('you have already marked this route as to-do')
        }
    }
    const handleToDo = () => {
        const newToDo = {
            userId: currentUser.id,
            routeId: route.id           
        }
        postToDo(newToDo).then(getAndSetRoute()).then(getTicksForRoute())
    }


    // CHECKS IF USER HAS LIKED A ROUTE AND IF NOT THEY CAN LIKE IT
    const checkIfLiked = () => {
        const likedByMember = likesExpandRoute.some(like => like.userId === currentUser.id)
            if (!likedByMember) {
                handleLike()

            } else {
                window.alert('you have already liked this route')
            }
    }
    const handleLike = () => {
        const newLike = {
            userId: currentUser.id,
            routeId: route.id
        }
        postLikes(newLike).then(getAndSetRoute()).then(getLikesForRoute())
    }

    // CHECKS IF ROUTES ARE TICKED AND WILL ALLOW USER TO TICK THEM IF NOT
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
                <button onClick={checkIfToDo}>To-Do</button>
                <button onClick={checkIfTicked}>Tick</button>
                <button onClick={checkIfLiked}>Like</button>
                {/* <button onClick={navigateToComment}>comment</button> */}
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
                <div>
                    {commentsExpandRoute.map(comment => {
                        return (
                            <div key={comment.id} className="comment-item">
                                <div>{comment.user?.fullName}</div>
                                <div>{comment.comment}</div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}