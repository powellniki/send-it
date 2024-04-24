export const getToDosByRouteId = (routeId) => {
    return fetch(`http://localhost:8088/todos?routeId=${routeId}&_expand=route&_expand=user`).then((res) => res.json())
}



export const postToDo = (toDo) => {
    return fetch('http://localhost:8088/todos', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(toDo)
    })
}

export const deleteToDo = (todoId) => {
    return fetch(`http://localhost:8088/todos/${todoId}`, {
        method: "DELETE"
    })
}