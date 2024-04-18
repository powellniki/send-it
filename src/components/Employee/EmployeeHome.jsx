import { useEffect, useState } from "react"
// import { FilterBar } from "./FilterBar.jsx"
import { getAllRoutes } from "../../services/routeService.js"


export const EmployeeHome = () => {

    const [allRoutes, setAllRoutes] = useState([])

    useEffect(() => {
        getAllRoutes().then(routesArray => {
            setAllRoutes(routesArray)
        }) 
    }, [])



    return (
        <div className="employee-home">
            <div className="employee-route-filter">
                {/* <FilterBar /> */}
            </div>
            <div className="routes-section">
                <h2>Gym Routes</h2>

            </div>
        </div>
    )
}