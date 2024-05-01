import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getRoutesByRouteId } from "../../services/routeService.js"
import { deleteLike, getLikesByRouteId, postLikes } from "../../services/likeServices.js"
import { deleteTick, postTicks } from "../../services/tickServices.js"
import { getTicksByRouteId } from "../../services/tickServices.js"
import { getCommentsbyRouteId, postComment } from "../../services/commentService.js"
import { deleteToDo, getToDosByRouteId, postToDo } from "../../services/toDoServices.js"
import './starRating.css'
import './routeDetails.css'
import { AverageStarRating } from "./AverageStarRating.jsx"


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
    const [averageRating, setAverageRating] = useState(0)
    const [comment, setComment] = useState("")
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
    const findAverageRating = () => {
        let totalRating = 0
        let numberOfTicks = ticksExpandRoute.length

        for (tick of ticksExpandRoute) {
            totalRating += tick.rating
        }
        return totalRating / numberOfTicks
    }

    

    useEffect(() => {
        let totalRating = 0
        let numberOfTicks = ticksExpandRoute.length
        
        if (numberOfTicks > 0 ) {
            for (const tick of ticksExpandRoute) {
                totalRating += tick.rating
            } 
            setAverageRating(totalRating / numberOfTicks)
        } else {
            setAverageRating(0)
        }
        
    },[ticksExpandRoute])
    



    useEffect(() => {
        getAndSetRoute()
        getLikesForRoute()
        getTicksForRoute()
        getCommentsForRoute()
        getToDosForRoute()
    },[currentUser, update])



    // functions for adding likes, ticks, to-dos
    const handleToDo = () => {
        const newToDo = {
            userId: currentUser.id,
            routeId: route.id           
        }
        postToDo(newToDo).then(setUpdate(!update))
    }
    const handleLike = () => {
        const newLike = {
            userId: currentUser.id,
            routeId: route.id
        }
        postLikes(newLike).then(setUpdate(!update))
    }

    const handleCommentSubmit = () => {
        const newComment = {
            userId: currentUser.id,
            routeId: route.id,
            comment: comment,
            date: setDate()
        }
        postComment(newComment)
            .then(() => {
                setComment(""),
                setUpdate(!update)
        })
    }
    
    
    //  functions for deleting likes, ticks, to-dos
    const deleteMemberToDo = () => {
        const foundToDo = todosExpandRoute.find(todo => todo.userId === currentUser.id)
        deleteToDo(foundToDo.id).then(setUpdate(!update))
    }
    const deleteMemberLike = () => {
        const foundLike = likesExpandRoute.find(like => like.userId === currentUser.id)
        deleteLike(foundLike.id).then(setUpdate(!update))
    }




    return (
        <section className="container-route-details">

            <h2 className="heading">{route.name}</h2>

            <div className="route-details">

                <div className="details-container">

                    <div className="route-image">
                        <div className="image">route image</div>
                    </div>

                    <div className="route-information">
                        <AverageStarRating averageRating={averageRating}/>
                        <div>average rating: {averageRating}</div>
                        <div className="route-info">Type: {route.type?.name}</div>
                        <div className="route-info">Grade: {route.grade?.name}</div>
                        <div className="route-info">Style: {route.style?.name}</div>
                        <div className="route-info">Setter: {route.user?.fullName}</div>
                        <div className="route-info">Date Set: {route.dateSet}</div>
                        <div className="route-info">Description: {route.description}</div>

                    </div>
                </div>

                <div className="route-buttons">
                    {likesExpandRoute.some(like => like.userId === currentUser.id) ? <button onClick={deleteMemberLike}>unlike</button> : <button onClick={handleLike}>Like</button>}
                    {todosExpandRoute.some(todo => todo.userId === currentUser.id) ? <button onClick={deleteMemberToDo}>✓ To-Do</button> : <button onClick={handleToDo}>+ To-Do</button>}
                    <button onClick={() => navigate(`/route/${route.id}/tick`)}>Tick</button>
                </div>

            </div>
            
            <div className="route-activity">

                <div className="activity-container">
                    <h4>Activity: </h4>
                    <div className="activities">
                        {ticksExpandRoute.map(tick => {
                            return (
                                <div key={tick.id} className="activity-item">
                                    <div>{tick.user?.fullName} climbed this route on {tick.date}</div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div className="comments-container">
                    <h4>Comments:</h4>
                    <div className="comments">
                        {commentsExpandRoute.map(comment => {
                            return (
                                <div key={comment.id} className="comment-item">
                                    <div className="comment-user-name">{comment.user?.fullName}</div>
                                    <div className="comment-user-comment">{comment.comment}<span> - {comment.date}</span></div>
                                </div>
                            )
                        })}
                    </div>
                    <div className="comment-input">
                        <textarea
                            className="comment-text-area"
                            type="text"
                            name= "comment"
                            placeholder="leave a comment..."
                            value = {comment}
                            onChange={(event) => {setComment(event.target.value)}}
                            required
                        ></textarea>
                        <div className="btn-comment-container">
                            <button className="btn-comment" onClick={handleCommentSubmit}>➲</button>
                        </div>
                    </div>
                </div>

            </div>

            
        </section>
    )
}