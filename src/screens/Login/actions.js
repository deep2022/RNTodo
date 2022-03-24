
export const loginUser = (user) => ({
    type: "LOGIN_REQUEST",
    payload: user,
});

export const fetchDetails = (user) => ({
    type: "FETCH_DATA",
    payload: user
})