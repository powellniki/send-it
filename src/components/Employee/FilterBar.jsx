import { useEffect, useState } from "react"
import { getRouteGrades, getRouteSetters, getRouteStyles, getRouteTypes } from "../../services/routeService.js"
import './filterBar.css'



export const FilterBar = ({allRoutes, setSelectedSetter, setSelectedGrade, setSelectedType, setSelectedStyle, setDisplayedRoutes}) => {
    const [types, setTypes] = useState([])
    const [grades, setGrades] = useState([])
    const [styles, setStyles] = useState([])
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

    // get all route styles
    useEffect(() => {
        getRouteStyles().then(styles => {
            setStyles(styles)
            }) 
    }, [])

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
            <select onChange={(event) => {setSelectedStyle(event.target.value)}} id="style-select" className="filter-item">
                <option value="0" id="style">select a route style</option>
                    {styles.map(style => {
                        return <option value={style.id} key={style.id}>{style.name}</option>
                    })}
            </select>
            <select onChange={(event) => {setSelectedSetter(event.target.value)}} id="setter-select" className="filter-item">
                <option value="0" id="setter">select setter...</option>
                    {setters.map(setter => {
                        return <option value={setter.id} key={setter.id}>{setter.fullName}</option>
                    })}
            </select>
        </div>
    )
}