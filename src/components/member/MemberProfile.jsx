import { useEffect, useState } from "react"
import { getMembersById } from "../../services/memberService.js"
import './memberProfile.css'


export const MemberProfile = ({currentUser}) => {
    const [memberExpandTicks, setMemberExpandTicks] = useState({})
    const [displayedTicks, setDisplayedTicks] = useState([])

    useEffect(() => {
        getMembersById(currentUser.id).then(memberData => {
            const memberObject = memberData[0]
            setMemberExpandTicks(memberObject)
        }) 
    },[])

    // useEffect(() => {
    //     const favoriteRoutes = memberExpandTicks.filter(member => {
    //         return member.ticks.some(tick => tick.rating > 3)
    //     })
    //     setDisplayedTicks(favoriteRoutes)
    // },[currentUser, memberExpandTicks])

    return (
        <div className="member-profile-container">

            <div className="circular-gradient">

                <div className="member-profile-details">

                    <div className="member-profile-information">
                        <div className="member-name">{memberExpandTicks?.fullName}</div>
                        <div className="member-sends">Total sends: {memberExpandTicks.ticks?.length}</div>
                    </div>
                    <div className="member-profile-tick-container">
                        {/* <h3 className="heading">favorite climbs</h3> */}
                            
                    </div>
                </div>

            </div>

        </div>
    )
}