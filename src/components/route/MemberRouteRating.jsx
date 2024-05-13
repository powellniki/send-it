import { FaStar } from "react-icons/fa"


export const MemberStarRating = ({memberRating}) => {

    const renderStars = () => {
        const stars = []
        const roundedRating = Math.round(memberRating)

        for (let i = 1; i<= 5; i++) {
            stars.push(
                <FaStar key={i} color={i <= roundedRating ? '#ffc107' : '#e4e5e9'} className="star"/>
            )
        }
        return stars;
    }
    return <div className="star-rating">{renderStars()}</div>
}