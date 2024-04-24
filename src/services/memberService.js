

export const getMembersById = (userId) => {
    return fetch(`http://localhost:8088/users?id=${userId}&_embed=ticks`).then((res) => res.json())
}