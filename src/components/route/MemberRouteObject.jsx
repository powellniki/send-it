import { Link, useNavigate, useParams } from "react-router-dom"
import './route.css'


export const MemberRouteObject = ({route}) => {


    const navigate = useNavigate()
    const {routeId} = useParams()

    

    return (
        <Link to={`/route/${route.id}`} className="route-link">
            <section className="route-item">
                <div className="route-item-main">
                    <header className="route-info">{route.name}</header>
                    <div className="route-info">Grade: {route.grade?.name} </div>
                    <div className="route-info">Setter: {route.user?.fullName}</div>
                </div>
                <div className="route-item-secondary">
                    <div className="route-date">{route.dateSet}</div>
                </div>
                <div className="like-tick-comment">
                    <span>{route.likes?.length} likes / </span><span>{route.ticks?.length} ticks</span>
                </div>
            </section>
        </Link>
    )


}