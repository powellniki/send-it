import { useEffect, useState } from "react"
import { getRouteGrades, getRouteStyles, getRouteTypes, postRoute } from "../../services/routeService.js"
import { useNavigate } from "react-router-dom"
import './newRouteForm.css'



const setDate = () => {
    const today = new Date()
    const day = today.getDate()
    const month = today.getMonth()
    const year = today.getFullYear()
    return `${month}/${day}/${year}`
}



export const NewRouteForm = ({currentUser}) => {
    const [types, setTypes] = useState([])
    const [grades, setGrades] = useState([])
    const [styles, setStyles] = useState([])
    const [routeImage, setRouteImage] = useState("")
    const [routeName, setRouteName] = useState("")
    const [routeType, setRouteType] = useState(0)
    const [routeGrade, setRouteGrade] = useState(0)
    const [routeStyle, setRouteStyle] = useState(0)
    const [routeDescription, setRouteDescription] = useState("")

    const navigate = useNavigate()




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


       const handlePost = (event) => {
            event.preventDefault()

            const newRoute = {
                name: routeName,
                description: routeDescription,
                img: routeImage,
                dateSet: setDate(),
                typeId: parseInt(routeType),
                gradeId: parseInt(routeGrade),
                styleId: parseInt(routeStyle),
                userId: currentUser.id,
                isActive: true
            }

            postRoute(newRoute).then(() => {
                navigate('/')
            })
       }





    return (
        <form className="new-route-form">

            <h2 className="heading">lets set a new route!</h2>

            <div className="form-container">

                <div className="form">

                    <fieldset>
                        <div className="route-info">
                            <div className="form-information">Route URL: </div>
                            <input type="text" name="image" placeholder="Route Image URL" onChange={(event) => {setRouteImage(event.target.value)}} required></input>
                        </div>
                    </fieldset>

                    <fieldset>
                        <div className="route-info">
                            <div className="form-information">Route Name: </div>
                            <input type="text" name="name" placeholder="Route Name" onChange={(event) => {setRouteName(event.target.value)}} required></input>
                        </div>
                    </fieldset>

                    <fieldset>
                        <div className="route-info">
                            <div className="form-information">Route Type: </div>
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
                            <div className="form-information">Route Grade: </div>
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
                            <div className="form-information">Route Style: </div>
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
                            <div className="form-information">Route Description: </div>
                            <textarea type="text" name="description" placeholder="Write a brief route description..." onChange={(event) => {setRouteDescription(event.target.value)}} required ></textarea>

                        </div>
                    </fieldset>
                    
                    <fieldset>
                        <div className="btn-container">
                            <button className="btn-save" onClick={handlePost}>Set Route!</button>
                        </div>
                    </fieldset>

                </div>

            </div>

        </form>
    )
} 