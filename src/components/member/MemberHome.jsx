import { useEffect, useState } from "react"
import { MemberFilterBar } from "./FilterBar.jsx"
import { getAllRoutes } from "../../services/routeService.js"
import { MemberRouteObject } from "../route/MemberRouteObject.jsx"
import './memberHome.css'


export const MemberHome = ({currentUser}) => {

    const [allRoutes, setAllRoutes] = useState([])
    // const [selectedType, setSelectedType] = useState('')
    // const [selectedGrade, setSelectedGrade] = useState('')
    // const [selectedStyle, setSelectedStyle] = useState('')
    // const [selectedSetter, setSelectedSetter] = useState('')
    // const [displayedRoutes, setDisplayedRoutes] = useState([])

    const getAndSetAllRoutes = () => {
        getAllRoutes().then(routesArray => {
            setAllRoutes(routesArray)
        }) 
    }

    useEffect(() => {
        getAndSetAllRoutes()
    }, [])


    // useEffect(() => {
    //     let filteredRoutes = allRoutes

    //         if (parseInt(selectedType) > 0) {
    //             filteredRoutes = filteredRoutes.filter(route => route.typeId === parseInt(selectedType))
    //         }
    //         if (parseInt(selectedGrade) > 0) {
    //             filteredRoutes = filteredRoutes.filter(route => route.gradeId === parseInt(selectedGrade))
    //         }
    //         if(parseInt(selectedStyle) > 0) {
    //             filteredRoutes = filteredRoutes.filter(route => route.styleId === parseInt(selectedStyle))
    //         }
    //         if (parseInt(selectedSetter) > 0) {
    //             filteredRoutes = filteredRoutes.filter(route => route.userId === parseInt(selectedSetter))
    //         }

    //     setDisplayedRoutes(filteredRoutes)

    // }, [allRoutes, selectedType, selectedGrade, selectedStyle, selectedSetter])




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