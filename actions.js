

export const addTodo = (payload) => ({
    type: "ADD_TODO",
    payload
})

export const deleteTodo = (payload) => ({
    type: "DELETE_TODO",
    payload
})

export const toggleTodo = (payload) => ({
    type: "TOGGLE_TODO",
    payload
})