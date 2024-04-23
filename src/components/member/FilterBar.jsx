import { useState } from "react"


export const MemberFilterBar = ({currentUser}) => {
    const [likes, setLikes] = useState([])
    const [sent, setSent] = useState([])
    const [saved, setSaved] = useState([])

return (
    <div>
        <button>Liked</button>
        <button>Sent</button>
        <button>Saved</button>
        <button>Search All Routes</button>
    </div>
)
}