import React, { createContext } from "react";

const UserContext = React.createContext()

export default UserContext;

{/* <UserContext >
    <Login/>
    <Card >
        <Data/>
    </Card>

<UserContext /> */}
    
// for better understanding of prop drilling and context api

// after designing the context with the help of useContext we rap the whole components from it because it acts like a global variable and also provide us the prrovider who give us the actual data in the upper ex->(line no 7-13) the userContext is acts like provider and also the rapp components directly takes accesss of all states from provider s.
    
