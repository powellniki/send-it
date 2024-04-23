import { useEffect, useState } from "react"
import { MemberFilterBar } from "./FilterBar.jsx"
import { getAllRoutes } from "../../services/routeService.js"
import { MemberRouteObject } from "../route/MemberRouteObject.jsx"


export const MemberHome = ({currentUser}) => {
    const [allRoutes, setAllRoutes] = useState([])


    const getAndSetAllRoutes = () => {
        getAllRoutes().then(routesArray => {
            setAllRoutes(routesArray)
        })
    }

    useEffect(() => {
        getAndSetAllRoutes() 
    })


    return(
        <div className="member-home">
            <h2>Gym Routes</h2>
            <div className="member-route-filter">
                <MemberFilterBar allRoutes={allRoutes}/>
            </div>
            <div className="routes">
                {allRoutes.map(route => {
                    return <MemberRouteObject route={route} key={route.id} currentUser={currentUser} allRoutes={allRoutes}/>
                })}
            </div>
        </div>
    )
}