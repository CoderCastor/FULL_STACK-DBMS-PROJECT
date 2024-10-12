import { createContext,useState } from "react"

export const UserContext = createContext(null);

export const UserProvider = (props) => {

    const [user,setUser] = useState(undefined);
    const [isLoggedIn,setIsLoggedIn] = useState(false);

    return (
        <UserContext.Provider value={{user,setUser,isLoggedIn,setIsLoggedIn}} >
            {props.children}
        </UserContext.Provider>
    )
}