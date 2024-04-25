import { useEffect, useState } from "react"
import { MemberFilterBar } from "./FilterBar.jsx"
import { getAllRoutes } from "../../services/routeService.js"
import { MemberRouteObject } from "../route/MemberRouteObject.jsx"
import './memberHome.css'


export const MemberHome = ({currentUser}) => {
    const [allRoutes, setAllRoutes] = useState([])
    const [displayedRoutes, setDisplayedRoutes] = useState([])



    const getAndSetAllRoutes = () => {
        getAllRoutes().then(routesArray => {
            setAllRoutes(routesArray)
        })
    }

    useEffect(() => {
        getAndSetAllRoutes() 
    },[])


    // sets up the page so that the users ticked routes show on initial render
    useEffect(() => {
        const sentRoutes = allRoutes.filter(route => {
            return route.ticks.some(tick => tick.userId === currentUser.id)
        })
        setDisplayedRoutes(sentRoutes)
    },[allRoutes])



    return(
        <div className="container-member-home">

                <h2 className="heading">My Routes</h2>
                <div className="member-route-filter">
                    <MemberFilterBar 
                     allRoutes={allRoutes} 
                        currentUser={currentUser} 
                        setDisplayedRoutes={setDisplayedRoutes}
                    />
                </div>
                <div className="routes">
                    {displayedRoutes.map(route => {
                        return <MemberRouteObject route={route} key={route.id} />
                    })}
                </div>

        </div>
    )
}