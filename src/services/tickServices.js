

export const getTicksByRouteId = (routeId) => {
    return fetch(`http://localhost:8088/ticks?routeId=${routeId}&_expand=route&_expand=user&_expand=leadStatus`).then((res) => res.json())
}

export const getLeadStatus = () => {
    return fetch('http://localhost:8088/leadStatuses').then((res) => res.json())
}


export const postTicks = (tick) => {
    return fetch('http://localhost:8088/ticks', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(tick)
    })
}

export const deleteTick = (tickId) => {
    return fetch(`http://localhost:8088/ticks/${tickId}`, {
        method: "DELETE"
    })
}