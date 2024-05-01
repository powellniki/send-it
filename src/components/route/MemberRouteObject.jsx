import { Link, useParams } from "react-router-dom"
import './memberRouteObject.css'
import { useEffect, useState } from "react"
import { getTicksByRouteId } from "../../services/tickServices.js"
import { AverageStarRating } from "./AverageStarRating.jsx"
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
    },[])


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

            <section className="route-item">

                <div className="route-primary">

                    <div className="route-details-primary">

                        <div className="star-rating-container">
                            <div className="rating-item">
                                <AverageStarRating averageRating={averageRating}/>
                            </div>
                            <div className="rating-value"> &nbsp; {averageRating}</div>
                        </div>

                        <div className="route-info route-name">
                            <header>{route.name}</header>
                        </div>
                        <div className="route-info">Grade: {route.grade?.name} </div>
                        <div className="route-info">Setter: {route.user?.fullName}</div>
                    </div>

                    <div className="route-details-secondary">
                        <div className="route-date">{route.dateSet}</div>
                    </div>

                </div>

                <div className="route-secondary">
                    {/* <StarRating /> */} 
                </div>

            </section>

        </Link>
    )
}

