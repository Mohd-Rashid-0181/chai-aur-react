import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import React from 'react'


// const reactElement = {
//     type : 'a',
//     props: {
//         href : 'https://google.com',
//         target : '_blank'
//     },
//     Children : 'Click me to visit google'
// }

const anotherElement = (
    <a href='https://google.com' target='_blank'>Visit Google</a>
)

const anotherUser = "chai aur nothing"

const reactElement = React.createElement(
    'a',
    {href : 'https://google.com', target : '_blank'},
    'Click me to visit Google | ',
    anotherUser
)

createRoot(document.getElementById('root')).render(

    reactElement
)
