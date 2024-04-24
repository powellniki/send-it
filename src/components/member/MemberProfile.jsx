import { useEffect, useState } from "react"
import { getMembersById } from "../../services/memberService.js"


export const MemberProfile = ({currentUser}) => {
    const [member, setMember] = useState({})

    useEffect(() => {
        getMembersById(currentUser.id).then(memberData => {
            const memberObject = memberData[0]
            setMember(memberObject)
        }) 
    },[])

    return (
        <div className="profile-container">
            <div className="profile-picture">
                <>picture</>
            </div>
            <div className="profile-information">
                <div>{member?.fullName}</div>
                <div>Total sends: {member.ticks?.length}</div>
            </div>
        </div>
    )
}