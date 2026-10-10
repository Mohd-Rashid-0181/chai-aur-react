import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';


// react has its own dom known as virtual dom that copies the page and compare it with dom(browser) and detects changes and whenever it has then it also implements that changes in virtual dom 
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <App />
    // this is the property react give us to render the html tags through javascript 

);

