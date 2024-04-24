import { useEffect, useState } from "react"
import { MemberFilterBar } from "./FilterBar.jsx"
import { getAllRoutes } from "../../services/routeService.js"
import { MemberRouteObject } from "../route/MemberRouteObject.jsx"


export const MemberHome = ({currentUser}) => {
    const [allRoutes, setAllRoutes] = useState([])
    // const [showLikedOnly, setShowLikedOnly] = useState([])
    // const [showSentOnly, setShowSentOnly] = useState([])
    // const [showSavedOnly, setShowSavedOnly] = useState([])
    const [displayedRoutes, setDisplayedRoutes] = useState([])



    const getAndSetAllRoutes = () => {
        getAllRoutes().then(routesArray => {
            setAllRoutes(routesArray)
        })
    }

    useEffect(() => {
        getAndSetAllRoutes() 
    },[])

    useEffect(() => {
        setDisplayedRoutes(allRoutes) 
    },[allRoutes])



    return(
        <div className="member-home">
            <h2>My Routes</h2>
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