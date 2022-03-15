export const ADD_ITEM = 'ADD_ITEM'

export const addItem = (value) => ({
    type: ADD_ITEM,
    email: value.email,
    password: value.password
})