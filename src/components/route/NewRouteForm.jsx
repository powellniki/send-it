import { useEffect, useState } from "react"
import { getRouteGrades, getRouteStyles, getRouteTypes } from "../../services/routeService.js"


export const NewRouteForm = () => {
    const [types, setTypes] = useState([])
    const [grades, setGrades] = useState([])
    const [styles, setStyles] = useState([])
    const [routeImage, setRouteImage] = useState("")
    const [routeName, setRouteName] = useState("")
    const [routeType, setRouteType] = useState(0)
    const [routeGrade, setRouteGrade] = useState(0)
    const [routeStyle, setRouteStyle] = useState(0)
    const [routeDescription, setRouteDescription] = useState("")


        // get all route types
        useEffect(() => {
            getRouteTypes().then(types => {
               setTypes(types)
            })
       },[])
   
       // get all route grades
       useEffect(() => {
           getRouteGrades().then(grades => {
               setGrades(grades)
           }) 
       },[])
   
       // get all route styles
       useEffect(() => {
           getRouteStyles().then(styles => {
               setStyles(styles)
           }) 
       }, [])


    return (
        <form className="new-route-form">
            <h2>Lets Set a New Route!</h2>

            <fieldset>
                <div className="route-image">
                    <input type="text" name="image" placeholder="Route Image URL" onChange={(event) => {setRouteImage(event.target.value)}} required></input>
                </div>
            </fieldset>

            <fieldset>
                <div className="route-info">
                    <input type="text" name="name" placeholder="Route Name" onChange={(event) => {setRouteName(event.target.value)}} required></input>
                </div>
            </fieldset>

            <fieldset>
                <div className="route-info">
                    <select id="type-select" onChange={(event) => {setRouteType(event.target.value)}} required>
                        <option value='0' id="type">Select a Route Type... </option>
                            {types.map(type => {
                                return <option value={type.id} key={type.id}>{type.name}</option>
                            })}
                    </select>
                </div>
            </fieldset>

            <fieldset>
                <div className="route-info">
                     <select id="grade-select" onChange={(event) => {setRouteGrade(event.target.value)}} required>
                        <option value='0' id="grade">Select a Grade...</option>
                            {grades.map(grade => {
                                return <option value={grade.id} key={grade.id}>{grade.name}</option>
                            })}
                    </select>
                </div>
            </fieldset>

            <fieldset>
                <div className="route-info">
                    <select id="style-select" onChange={(event) => {setRouteStyle(event.target.value)}} required>
                        <option value='0' id="style">Select a Style</option>
                            {styles.map(style => {
                                return <option value={style.id} key={style.id}>{style.name}</option>
                            })}
                    </select>
                </div>
            </fieldset>
            
            <fieldset>
                <div className="route-info">
                    <button>Set Route!</button>
                </div>
            </fieldset>
        </form>
    )
} 