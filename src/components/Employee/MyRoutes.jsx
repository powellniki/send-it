import { useEffect, useState } from "react"
import { getRoutesBySetterId } from "../../services/routeService.js"
import { RouteObject } from "../route/RouteObject.jsx"
import './EmployeeHome.css'


export const MyRoutes = ({currentUser}) => {
    const [routesBySetterId, setRoutesBySetterId] = useState([])

    useEffect(() => {
         getRoutesBySetterId(currentUser.id).then(routes => {
            setRoutesBySetterId(routes)
         })
    }, [currentUser.id])

    return (
        <div className="container-employee-home">

        <h2 className="heading">My Routes</h2>

            <div className="routes">
                {routesBySetterId.map(route => {
                    return <RouteObject route={route} currentUser={currentUser} key={route.id} />
                })}
            </div>
        </div>
    )
}