import {configureStore} from '@reduxjs/toolkit';
import todoReducer from '../Features/Todo/TodoSlice';

export const store = configureStore({
    reducer : todoReducer
})


// {this file is for store and for a store we have to call the configureStore method from core redux and also it only or in most of the times takes objects}
// every application has only one store and also we called it single source of truth 
// for designing the store we need the configureStore through this we easily design the store and it takes single or multiple key, value pair
// we have to give the source of all reducers beacuse of awareness of data flow because it directly doesn't take data flow(means it doesn't take value from everyone so in redux toolkit only reducers have access to give the value and edit or change).
// we take all the reducers through its main source 