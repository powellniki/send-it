

export const getLikesByRouteId = (routeId) => {
    return fetch(`http://localhost:8088/likes?routeId=${routeId}&_expand=route&_expand=user`).then((res) => res.json())
}



export const postLikes = (like) => {
    return fetch('http://localhost:8088/likes', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(like)
    })
}