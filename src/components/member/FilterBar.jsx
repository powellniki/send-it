
export const MemberFilterBar = ({allRoutes, currentUser, setDisplayedRoutes}) => {

    const handleToDoRoutes = () => {
        const toDoRoutes = allRoutes.filter(route => {
            return route.todos.some(todo => todo.userId === currentUser.id)
        })
        setDisplayedRoutes(toDoRoutes)
    }

    const handleLikesFilter = () => {
        const likedRoutes = allRoutes.filter(route => {
            return route.likes.some(like => like.userId === currentUser.id)
        })
        setDisplayedRoutes(likedRoutes)
    }

    const handleSentFilter = () => {
        const sentRoutes = allRoutes.filter(route => {
            return route.ticks.some(tick => tick.userId === currentUser.id)
        })
        setDisplayedRoutes(sentRoutes)
    }



return (
    <div>

        <button onClick={handleSentFilter}>Ticks</button>
        <button onClick={handleToDoRoutes}>To-Do's</button>
        <button onClick={handleLikesFilter}>Liked</button>

        {/* STRETCH GOAL */}
        {/* <button>Saved</button> */}

    </div>
)

}




