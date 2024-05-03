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
        <section className="employee-route-container">

            <div className="employee-route-item">

                <div className="employee-route-details">

                    <div className="employee-route-details-primary">
                        <div className="employee-image-container" style={{ backgroundImage: `url(${route.img})`}}></div>
                        <div className="employee-route-information">
                            <header className="employee-route-name">{route.name}, {route.grade?.name}</header>
                            <div className="employee-route-info">Type: {route.type?.name}</div>
                            {/* <div className="route-info">Setter: {route.user?.fullName}</div> */}
                            <div className="employee-route-info">{route.dateSet}</div>
                        </div>
                    </div>

                    <div className="remployee-oute-details-secondary">
                        {currentUser.id === route.user?.id ? 
                            <div className="employee-route-edit">
                                <Link to={`/myroutes/edit/${route.id}`}>
                                    <button className="employee-btn-edit">Edit</button>
                                </Link>
                                <button className="employee-btn-delete" onClick={() => {handleDelete(route.id)}} >Delete</button>
                            </div>
                        : "" }
                    </div>

                </div>

            </div>

        </section>
    )
}