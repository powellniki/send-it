import './filterBar.css'


export const MemberFilterBar = ({allRoutes, currentUser, setDisplayedRoutes}) => {

    const handleToDo = () => {
        const toDoRoutes = allRoutes.filter(route => {
            return route.todos.some(todo => todo.userId === currentUser.id)
        })
        setDisplayedRoutes(toDoRoutes)
    }

    const handleLikes = () => {
        const likedRoutes = allRoutes.filter(route => {
            return route.likes.some(like => like.userId === currentUser.id)
        })
        setDisplayedRoutes(likedRoutes)
    }

    const handleSent = () => {
        const sentRoutes = allRoutes.filter(route => {
            return route.ticks.some(tick => tick.userId === currentUser.id)
        })
        setDisplayedRoutes(sentRoutes)
    }



return (
    <div className="filter-bar">

        <button className="filter-item" onClick={handleSent}>Ticks</button>
        <button className="filter-item" onClick={handleToDo}>To-Do's</button>
        {/* <button className="filter-item" onClick={handleLikes}>Liked</button> */}

        {/* STRETCH GOAL */}
        {/* <button>Saved</button> */}

    </div>
    )
}




