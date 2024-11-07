import { createContext,useState } from "react"

export const UserContext = createContext(null);

export const UserProvider = (props) => {

    const [user,setUser] = useState(undefined);
    const [isLoggedIn,setIsLoggedIn] = useState(false);
    const [userInfo,setUserInfo] = useState({});

    return (
        <UserContext.Provider value={{user,setUser,isLoggedIn,setIsLoggedIn,userInfo,setUserInfo}} >
            {props.children}
        </UserContext.Provider>
    )
}