

export const getAllRoutes = () => {
    return fetch('http://localhost:8088/routes?_expand=type&_expand=grade&_expand=style&_expand=user').then((res) => res.json())
}

export const getRouteTypes = () => {
    return fetch('http://localhost:8088/types').then((res) => res.json())
}

export const getRouteGrades = () => {
    return fetch('http://localhost:8088/grades').then((res) => res.json())
}

export const getRouteStyles = () => {
    return fetch('http://localhost:8088/styles').then((res) => res.json())
}

export const getRouteSetters = () => {
    return fetch('http://localhost:8088/users?isStaff=true').then((res) => res.json())
}

export const getRoutesBySetterId = (userId) => {
    return fetch(`http://localhost:8088/routes?userId=${userId}`).then((res) => res.json())
}