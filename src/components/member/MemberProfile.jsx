import { useEffect, useState } from "react"
import { getMembersById } from "../../services/memberService.js"
import './memberProfile.css'


export const MemberProfile = ({currentUser}) => {
    const [member, setMember] = useState({})

    useEffect(() => {
        getMembersById(currentUser.id).then(memberData => {
            const memberObject = memberData[0]
            setMember(memberObject)
        }) 
    },[])

    return (
        <div className="member-profile">
            <div className="member-profile-container">
                <div className="member-profile-picture-containter">
                    <div className="member-profile-picture">
                        <img src='https://img.freepik.com/premium-vector/rock-climbing-logo_617585-1697.jpg'/>
                    </div>
                </div>
                <div className="member-profile-information">
                    <div className="member-name">{member?.fullName}</div>
                    <div className="member-sends">Total sends: {member.ticks?.length}</div>
                </div>
            </div>
        </div>
    )
}