

export const getLikesByRouteId = (routeId) => {
    return fetch(`http://localhost:8088/likes?routeId=${routeId}&_expand=route&_expand=user`).then((res) => res.json())
}


// export const getRatingsByRouteId = (routeId) => {
//     return fetch(`http://localhost:8088/ticks?routeId=${routeId}`).then((res) => res.json())
// }




export const postLikes = (like) => {
    return fetch('http://localhost:8088/likes', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(like)
    })
}

export const deleteLike = (likeId) => {
    return fetch(`http://localhost:8088/likes/${likeId}`, {
        method: "DELETE"
    })
}




//star rating services
export const postRating = (newRating) => {
    return fetch(`http://localhost:8088/starRating`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newRating)
    })
}