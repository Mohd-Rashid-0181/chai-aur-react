import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    todos: [{ id: 1, text: "Hello World" }]
}


export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            const todo = {
                id: nanoid(),
                text: action.payload
            }
            state.todos.push(todo)
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload)
        },

        // updateTodo: (state, action ) => {
        //     const todo = state.todos.map((todo) => {...todo, })
        // },
        // toggleTodo: () => { }
    }

})

export const {addTodo, removeTodo} = todoSlice.actions

export  default todoSlice.reducer


// In the redux documentstion we have the syntax to call the slice to features but we call it whatever we want 
// we have to create a slice/feature, for creating a slice we have a method called createSlice and also for creating the slice we need three things(name, initialState and list of reducers who can update in the project )
// so before creating the slice we create the initialState in this we have added some properties who can like by default state means if we have none then we have this state or task by default 
// and in the process of creating slice we can give multiple key, value pairs to the reducers and we call also only give the methods to reducers but we write its defination in another file or  in the same file
// in these methods  we have access of two things called state and action. In the state we can access the updated value of state (in the store) and in the action we can access the action.payload and many more things and also in this we can push the state directly but in context api we have to spread the values and also other things to do because in context api the state is not preserved but in this case the state is preserved 
// and we have to directly export the all reducers because we don't know what type of reducer use in what type of file so for exporting this we use the actions(TodoSlice.actions) because it comes through action and also we export the main source of the reducers for using it in the state or store
//  And then we add these main source of reducers into the store 
// After that we have to wokrs to do (send the value and call the value) in the Addtodo component we send the value and in th etodos component we call the value