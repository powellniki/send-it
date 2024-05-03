import { Link, useNavigate } from "react-router-dom"
import { deleteRoute } from "../../services/routeService.js"
import './routeObject.css'




export const RouteObject = ({route, currentUser, getAndSetAllRoutes}) => {

    const navigate = useNavigate()


    const handleDelete = (routeId) => {
        deleteRoute(routeId).then(() => {
            getAndSetAllRoutes()
        })
    }


    return (
        <section className="route-container">

            <div className="route-item">

                <div className="route-details">

                    <div className="route-details-primary">
                        <div className="image-container" style={{ backgroundImage: `url(${route.img})`}}></div>
                        <div className="route-information">
                            <header className="route-name">{route.name}, {route.grade?.name}</header>
                            <div className="route-info">Type: {route.type?.name}</div>
                            <div className="route-info">Setter: {route.user?.fullName}</div>
                            <div className="route-info">{route.dateSet}</div>
                        </div>
                    </div>

                    <div className="route-details-secondary">
                        {currentUser.id === route.user?.id ? 
                            <div className="route-edit">
                                <Link to={`/myroutes/edit/${route.id}`}>
                                    <button className="btn-edit">Edit</button>
                                </Link>
                                <button className="btn-delete" onClick={() => {handleDelete(route.id)}} >Delete</button>
                            </div>
                        : "" }
                    </div>

                </div>

            </div>

        </section>
    )
}