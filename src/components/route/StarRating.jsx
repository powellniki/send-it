import { useState } from "react"
import React from "react"
import { FaStar } from "react-icons/fa"
import './starRating.css'


export const StarRating = ({rating, setRating}) => {
    const [hover, setHover] = useState(null)


    return (
        <div className="star-rating">
            
        {[1, 2, 3, 4, 5].map((star, index) => {
                const currentRating = index + 1
                return (
                    <label key={currentRating}>
                        <input 
                            type="radio"
                            name="rating" 
                            value={currentRating}
                            onClick={() => setRating(currentRating)}
                        />
                        <FaStar 
                            className="star"
                            color={currentRating <= (hover || rating) ? '#ffc107' : '#e4e5e9'}
                            onMouseEnter={() => setHover(currentRating)}
                            onMouseLeave={() => setHover(null)}
                        />
                    </label>
                ) 
            })}
            
        </div>
    )
}