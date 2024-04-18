

export const getAllRoutes = () => {
    return fetch('http://localhost:8088/routes?_expand=type&_expand=grade&_expand=style&_expand=user').then((res) => res.json())
}