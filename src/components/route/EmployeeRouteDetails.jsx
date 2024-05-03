import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { deleteRoute, getRoutesByRouteId } from "../../services/routeService.js"
import './employeeRouteDetails.css'


export const EmployeeRouteDetails = ({currentUser}) => {
    const [route, setRoute] = useState({})
    const [update, setUpdate] = useState(false)

    const {routeId} = useParams()
    const navigate = useNavigate()


    // GET INFORMATION FOR ROUTE
    const getAndSetRoute = () => {
        getRoutesByRouteId(routeId).then(routeData => {
            const routeObject = routeData[0]
            setRoute(routeObject)
        }) 
    }

    useEffect(() => {
        getAndSetRoute()

    },[currentUser, update])


    const handleDelete = (routeId) => {
        deleteRoute(routeId).then(() => {
            navigate(`/`)
        })
    }
    


    return (
        <section className="employee-container-route-details">
            <h2 className="heading">{route.name}</h2>
            <div className="employee-route-details-container">
                <div className="employee-route-details">

                    <div className="employee-route-first">

                        <div className="employee-route-image">
                            <img src={route.img}  />
                        </div>

                        <div className="employee-route-information">
                            <div className="employee-route-info-container">
                                <div className="employee-route-info">Grade: {route.grade?.name}</div>
                                <div className="employee-route-info">Type: {route.type?.name}</div>
                                <div className="employee-route-info">Style: {route.style?.name}</div>
                                <div className="employee-route-info route-description">Description: {route.description}</div>
                                <div className="employee-route-info route-setter">Setter: {route.user?.fullName}</div>
                            </div>
                        </div>

                    </div>


                    <div className="employee-route-second">
                        <div className="employee-route-buttons-container">
                            <div className="employee-route-buttons">
                            {currentUser.id === route.user?.id ? 
                            <div className="employee-route-edit">
                                <Link to={`/route/${route.id}/edit`} className="employee-btn-edit">
                                    <div>edit</div>
                                </Link>
                                <button className="employee-btn-delete" onClick={() => {handleDelete(route.id)}} >delete</button>
                            </div>
                        : "" }
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}
