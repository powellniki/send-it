import { Link } from "react-router-dom"
import './memberRouteObject.css'
// import { StarRating } from "./StarRating.jsx"


export const MemberRouteObject = ({route}) => {


    // const navigate = useNavigate()
    // const {routeId} = useParams()

    

    return (
        <Link to={`/route/${route.id}`} className="route-link">

            <section className="route-item">

                <div className="route-primary">
                    <div className="route-details-primary">
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

