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
        <div className="routes">
        <h2 className="heading">My Routes</h2>
            {routesBySetterId.map(route => {
                return <RouteObject route={route} key={route.id} />
            })}
        </div>
    )
}