import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { getTicksByRouteId } from "../../services/tickServices.js"
import { AverageStarRating } from "./AverageStarRating.jsx"
import './memberRouteObject.css'
import './starRating.css'



export const MemberRouteObject = ({route}) => {
    const [ticksExpandRoute, setTicksExpandRoute] = useState([])
    const [averageRating, setAverageRating] = useState(0)


    const getTicksForRoute = () => {
        getTicksByRouteId(route.id).then(tickArray => {
            setTicksExpandRoute(tickArray)
        })
    }

    useEffect(() => {
        getTicksForRoute() 
    },[route])


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
    

    return (
        <Link to={`/route/${route.id}`} className="route-link">

            <section className="route-container">

                <div className="route-details">

                    <div className="route-details-primary">

                        <div className="image-container">
                            <img src={route.img}/>
                        </div>

                        <div className="star-rating-container">
                            <div className="rating-item">
                                <AverageStarRating averageRating={averageRating}/>
                            </div>
                        </div>

                        <div className="route-name">
                            <header>{route.name}</header>
                        </div>
                        <div className="route-info">Grade: {route.grade?.name} </div>
                        <div className="route-info">Setter: {route.user?.fullName}</div>
                        <div className="route-info">{route.dateSet}</div>
                    </div>


                </div>

            </section>

        </Link>
    )
}

