import { useEffect, useState } from "react"
import { getAllRoutes } from "../../services/routeService.js"
import { RouteObject } from "../route/RouteObject.jsx"
import { FilterBar } from "./FilterBar.jsx"


export const EmployeeHome = () => {

    const [allRoutes, setAllRoutes] = useState([])
    const [selectedType, setSelectedType] = useState('')
    const [selectedGrade, setSelectedGrade] = useState('')
    const [selectedSetter, setSelectedSetter] = useState('')
    const [filteredRouteTypes, setFilteredRouteTypes] = useState([])
    const [filteredRouteGrades, setFilteredRouteGrades] = useState([])
    const [filteredRouteSetters, setFilteredRouteSetters] = useState([])
    const [displayedRoutes, setDisplayedRoutes] = useState([])

    useEffect(() => {
        getAllRoutes().then(routesArray => {
            setAllRoutes(routesArray)
        }) 
    }, [])

    useEffect(() => {
        if (parseInt(selectedType) > 0) {
            const filteredTypes = allRoutes.filter(route => route.typeId === parseInt(selectedType))
            setDisplayedRoutes(filteredTypes)
        } else {
            setDisplayedRoutes(allRoutes)
        }
    }, [allRoutes, selectedType])

    useEffect(() => {
        if (parseInt(selectedGrade) > 0) {
            const filteredGrades = allRoutes.filter(route => route.gradeId === parseInt(selectedGrade))
            setDisplayedRoutes(filteredGrades)
        } else {
            setDisplayedRoutes(allRoutes)
        }
    }, [allRoutes, selectedGrade])

    useEffect(() => {
        if (parseInt(selectedSetter) > 0) {
            const filteredSetters = allRoutes.filter(route => route.userId === parseInt(selectedSetter))
            setDisplayedRoutes(filteredSetters)
        } else {
            setDisplayedRoutes(allRoutes)
        }
    }, [allRoutes, selectedSetter])


    return (
        <div className="employee-home">
            <h2>Gym Routes</h2>
            <div className="employee-route-filter">
                <FilterBar 
                    allRoutes={allRoutes} 
                    setSelectedType={setSelectedType}
                    setSelectedGrade={setSelectedGrade} 
                    setSelectedSetter={setSelectedSetter} 
                />
            </div>
            <div className="routes">
                {displayedRoutes.map(route => {
                    return <RouteObject route={route} key={route.id} />
                })}
            </div>
        </div>
    )
}