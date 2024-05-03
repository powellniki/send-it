import { getLeadStatus } from "../../services/tickServices.js"
import { postTicks } from "../../services/tickServices.js"
import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { StarRating } from './StarRating.jsx'
import './routeTickForm.css'





export const RouteTickForm = ({currentUser}) => {
    const [leadOptions, setLeadOptions] = useState([])
    const [ascent, setAscent] = useState(0)
    const [note, setNote] = useState("")
    const [rating, setRating] = useState(0)
    const [selectedDate, setSelectedDate] = useState("")
    // const [formattedDate, setformattedDate] = useState("")


    const {routeId} = useParams()
    const navigate = useNavigate()





    const leadStatus = () => {
        getLeadStatus().then(leadData => {
            setLeadOptions(leadData)
        })
    }


    useEffect(() => {
        const fetchLeadStatus = async () => {
            try {
                const leadData = await getLeadStatus();
                setLeadOptions(leadData);
            } catch (error) {
                console.error('Error fetching lead status:', error);
            }
        };
        fetchLeadStatus();
    }, []);
    


    const formatDate = (dateString) => {
        const [year, month, day] = dateString.split('-')
        return `${month}-${day}-${year}`
    }



    const handleTick = (event) => {
        event.preventDefault()

        const newTick = {
            date: formatDate(selectedDate),
            userId: currentUser.id,
            routeId: parseInt(routeId),
            leadStatusId: parseInt(ascent),
            notes: note,
            rating: rating
        }
        postTicks(newTick).then(() => {
            navigate(`/route/${routeId}`)
        })
    }


    return (
        <form key="tick-form" className="route-tick-form">

            <h2 className="heading">How Did It Go?</h2>

            <div className="form-container">

                <div className="form">

                    <fieldset>
                        <div className="tick-info">
                            <h3>Date:</h3>
                            <input 
                                type="date" 
                                value={selectedDate} 
                                onChange={(event) => {setSelectedDate(event.target.value)}}
                            />
                        </div>
                    </fieldset>

                    <fieldset>
                        <div className="tick-info">
                            <h3>Ascent Style</h3>
                                {leadOptions.map(leadOption => {
                                    return (
                                        <div key={leadOption.id} className="lead-options">
                                            <label >
                                                <input
                                                    className="option"
                                                    key={leadOption.id}
                                                    type="radio" 
                                                    name="leadStatusId"
                                                    value={leadOption.id}
                                                    onChange={(event) => {setAscent(event.target.value)}}
                                                    required
                                                />
                                                {leadOption.name}
                                            </label>
                                        </div>
                                    )
                                })}
                        </div>
                    </fieldset>

                    <fieldset>
                        <div className="tick-info route-notes">
                            <h3>Notes:</h3>
                            <div className="textarea-container">
                                <textarea type="text" name="notes" onChange={(event) => {setNote(event.target.value)}} ></textarea>
                            </div>
                        </div>
                    </fieldset>

                    <fieldset>
                        <StarRating rating={rating} setRating={setRating}/>
                        <p>star rating: {rating}</p>
                    </fieldset>

                    <fieldset>
                        <div className="btn-tick-container">
                            <button className="btn-tick-save" onClick={handleTick}>Save Tick</button>
                        </div>
                    </fieldset>

                </div>

            </div>

        </form>
    )
}