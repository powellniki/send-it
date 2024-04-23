

export const getCommentsbyRouteId = (routeId) => {
    return fetch(`http://localhost:8088/comments?routeId=${routeId}&_expand=route&_expand=user`).then((res) => res.json())
}