import { useEffect, useState } from "react"
import { getRouteGrades, getRouteSetters, getRouteTypes } from "../../services/routeService.js"



export const FilterBar = ({allRoutes, setSelectedSetter, setSelectedGrade, setSelectedType, setDisplayedRoutes}) => {
    const [types, setTypes] = useState([])
    const [grades, setGrades] = useState([])
    const [setters, setSetters] = useState([])


    // get all route types
    useEffect(() => {
         getRouteTypes().then(types => {
            setTypes(types)
         })
    },[allRoutes])

    // get all route grades
    useEffect(() => {
        getRouteGrades().then(grades => {
            setGrades(grades)
        }) 
    },[allRoutes])

    // get all route setters
    useEffect(() => {
        getRouteSetters().then(setters => {
            setSetters(setters)
        }) 
    }, [allRoutes])



    return (
        <div className="filter-bar">
            <select onChange={(event) => {setSelectedType(event.target.value)}} id="type-select" className="filter-item">
                <option value="0" id="type">select route type...</option>
                    {types.map(type => {
                        return <option value={type.id} key={type.id}>{type.name}</option>
                    })}
            </select>
            <select onChange={(event) => {setSelectedGrade(event.target.value)}} id="grade-select" className="filter-item">
                <option value="0" id="grade">select grade...</option>
                    {grades.map(grade => {
                        return <option value={grade.id} key={grade.id}>{grade.name}</option>
                    })}
            </select>
            <select onChange={(event) => {setSelectedSetter(event.target.value)}} id="setter-select" className="filter-item">
                <option value="0" id="setter">select setter...</option>
                    {setters.map(setter => {
                        return <option value={setter.id} key={setter.id}>{setter.name}</option>
                    })}
            </select>
        </div>
    )
}