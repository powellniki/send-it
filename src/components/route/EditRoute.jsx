import { editRoute, getRouteGrades, getRouteStyles, getRouteTypes, getRoutesByRouteId } from "../../services/routeService.js"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import './editRoute.css'


export const EditRoute = ({currentUser}) => {
    const [route, setRoute] = useState({
        id: "",
        name: "",
        description: "",
        img: "",
        dateSet: "",
        typeId: 0,
        gradeId: 0,
        styleId: 0,
        userId: 0,
        isActive: ""
    })
    const [types, setTypes] = useState([])
    const [grades, setGrades] = useState([])
    const [styles, setStyles] = useState([])

    const {routeId} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
         getRoutesByRouteId(routeId).then(routeData => {
             const routeObject = routeData[0]
             setRoute(routeObject)
         })
    },[routeId])
    
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


   const handleInputChange = (event) => {
        const routeCopy = {...route}
        routeCopy[event.target.name] = event.target.value
        setRoute(routeCopy)
   }

   const handleEditRoute = (event) => {
        event.preventDefault()

        const editedRoute = {
            id: route.id,
            name: route.name,
            description: route.description,
            img: route.img,
            dateSet: route.dateSet,
            typeId: parseInt(route.typeId),
            gradeId: parseInt(route.gradeId),
            styleId: parseInt(route.styleId),
            userId: currentUser.id,
            isActive: true
        }
        editRoute(editedRoute).then(() => {
            navigate(`/route/${routeId}`)
        })
   }


    return (
        <form className="edit-route-form">

            <h2 className="heading">Edit Route</h2>

            <div className="form-container">

                <div className="edit-form">

                    <fieldset>
                        <div className="route-info">
                            <div className="form-information">Route URL: </div>
                            <input type="text" name="img" value={route?.img} placeholder="route image URL" onChange={handleInputChange} required></input>
                        </div>
                    </fieldset>

                    <fieldset>
                        <div className="route-info">
                            <div className="form-information">Route Name: </div>
                            <input type="text" name="name" value={route?.name} onChange={handleInputChange} required></input>
                        </div>
                    </fieldset>

                    <fieldset>
                        <div className="route-info">
                            <div className="form-information">Route Type: </div>
                            <select id="type-select" name="typeId" value={route?.typeId} onChange={handleInputChange} required>
                                <option value='0' id="type"></option>
                                    {types.map(type => {
                                        return <option value={type.id} key={type.id}>{type.name}</option>
                                    })}
                            </select>
                        </div>
                    </fieldset>

                    <fieldset>
                        <div className="route-info">
                            <div className="form-information">Route Grade: </div>
                            <select id="grade-select" name="gradeId" value={route?.gradeId} onChange={handleInputChange} required>
                                <option value='0' id="grade"></option>
                                    {grades.map(grade => {
                                        return <option value={grade.id} key={grade.id}>{grade.name}</option>
                                    })}
                            </select>
                        </div>
                    </fieldset>

                    <fieldset>
                        <div className="route-info">
                            <div className="form-information">Route Style: </div>
                            <select id="style-select" name="styleId" value={route?.styleId} onChange={handleInputChange} required>
                                <option value='0' id="style"></option>
                                    {styles.map(style => {
                                        return <option value={style.id} key={style.id}>{style.name}</option>
                                    })}
                            </select>
                        </div>
                    </fieldset>

                    <fieldset>
                        <div className="route-info">
                        <div className="form-information">Route Description: </div>
                            <textarea type="text" name="description" value={route?.description} onChange={handleInputChange} required></textarea>

                        </div>
                    </fieldset>

                    <fieldset>
                        <div className="btn-container">
                            <button className="btn-save" onClick={handleEditRoute}>Save</button>
                        </div>
                    </fieldset>
                </div>

            </div>

        </form>
    )
}