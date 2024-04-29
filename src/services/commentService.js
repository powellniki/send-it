

export const getCommentsbyRouteId = (routeId) => {
    return fetch(`http://localhost:8088/comments?routeId=${routeId}&_expand=route&_expand=user`).then((res) => res.json())
}

export const postComment = (newComment) => {
    return fetch('http://localhost:8088/comments', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newComment)
    })
}