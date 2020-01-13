
export const currentUser = (payload) => ({
    type: "SELECTED",
    payload
})

export const addPoints = (payload) => ({
    type: "INSERT_POINTS",
    payload
})

export const updatePoints = (payload) =>({
    type: "UPDATE_POINTS",
    payload
})

export const getPoint = (payload)=>({
    type: "GET_INITIAL_POINTS",
    payload
})