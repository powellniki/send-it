import { useEffect, useState } from "react"
import { getAllRoutes } from "../../services/routeService.js"
import { RouteObject } from "../route/RouteObject.jsx"
import { FilterBar } from "./FilterBar.jsx"
import './EmployeeHome.css'


export const EmployeeHome = ({currentUser}) => {

    const [allRoutes, setAllRoutes] = useState([])
    const [selectedType, setSelectedType] = useState('')
    const [selectedGrade, setSelectedGrade] = useState('')
    const [selectedStyle, setSelectedStyle] = useState('')
    const [selectedSetter, setSelectedSetter] = useState('')
    const [displayedRoutes, setDisplayedRoutes] = useState([])

    const getAndSetAllRoutes = () => {
        getAllRoutes().then(routesArray => {
            setAllRoutes(routesArray)
        }) 
    }

    useEffect(() => {
        getAndSetAllRoutes()
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
        if(parseInt(selectedStyle) > 0) {
            const filteredStyles = allRoutes.filter(route => route.styleId === parseInt(selectedStyle))
            setDisplayedRoutes(filteredStyles)
        } else {
            setDisplayedRoutes(allRoutes)
        }
    }, [allRoutes, selectedStyle])

    useEffect(() => {
        if (parseInt(selectedSetter) > 0) {
            const filteredSetters = allRoutes.filter(route => route.userId === parseInt(selectedSetter))
            setDisplayedRoutes(filteredSetters)
        } else {
            setDisplayedRoutes(allRoutes)
        }
    }, [allRoutes, selectedSetter])

    
    //filters CURRENTLY work independently... need to figure out how to get them to work dynamically together when multiple are selected



    return (
        <div className="employee-home">
            <h2 className="heading">Gym Routes</h2>
            <div className="employee-route-filter">
                <FilterBar 
                    allRoutes={allRoutes} 
                    setSelectedType={setSelectedType}
                    setSelectedGrade={setSelectedGrade}
                    setSelectedStyle={setSelectedStyle}
                    setSelectedSetter={setSelectedSetter} 
                />
            </div>
            <div className="routes">
                {displayedRoutes.map(route => {
                    return <RouteObject route={route} getAndSetAllRoutes={getAndSetAllRoutes} currentUser={currentUser} key={route.id} allRoutes={allRoutes}/>
                })}
            </div>
        </div>
    )
}