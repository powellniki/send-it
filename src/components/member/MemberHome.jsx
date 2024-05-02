import { useEffect, useState } from "react"
import { MemberFilterBar } from "./FilterBar.jsx"
import { getAllRoutes } from "../../services/routeService.js"
import { MemberRouteObject } from "../route/MemberRouteObject.jsx"
import './memberHome.css'


export const MemberHome = ({currentUser}) => {

    const [allRoutes, setAllRoutes] = useState([])


    const getAndSetAllRoutes = () => {
        getAllRoutes().then(routesArray => {
            setAllRoutes(routesArray)
        }) 
    }

    useEffect(() => {
        getAndSetAllRoutes()
    }, [])





    return (
        <div className="employee-home">
            <h2 className="heading">Gym Routes</h2>
            <div className="employee-route-filter">

            </div>
            <div className="routes">
                    {allRoutes.map(route => {
                        return <MemberRouteObject route={route} getAndSetAllRoutes={getAndSetAllRoutes} currentUser={currentUser} key={route.id} allRoutes={allRoutes}/>   
                    })}
            </div>
        </div>
    )
}