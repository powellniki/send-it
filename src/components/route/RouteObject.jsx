import "./route.css"

export const RouteObject = ({route}) => {

    return (
        <section className="route-item">
            <div className="route-item-main">
                <header className="route-info">{route.name}</header>
                <div className="route-info">Type: {route.type?.name}</div>
                <div className="route-info">Grade: {route.grade?.name}</div>
                <div className="route-info">Setter: {route.user?.name}</div>
            </div>
            <div className="route-item-secondary">
                <div className="route-info">{route.dateSet}</div>
            </div>
        </section>
    )
}