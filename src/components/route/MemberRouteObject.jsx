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
        <Link to={`/route/${route.id}`} className="member-route-link">

            <section className="member-route-container">

                <div className="member-route-details">

                    <div className="member-route-details-primary">
                        <div className="member-image-container" style={{ backgroundImage: `url(${route.img})` }}></div>
                        <div className="member-star-rating-container">
                            <div className="member-rating-item">
                                <AverageStarRating averageRating={averageRating}/>
                            </div>
                        </div>
                        <div className="member-route-name">
                            <header>{route.name}, {route.grade?.name}</header>
                        </div>
                    </div>

                </div>

            </section>

        </Link>
    )
}


