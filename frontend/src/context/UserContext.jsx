import { createContext,useState } from "react"

export const UserContext = createContext(null);

export const UserProvider = (props) => {

    const [user,setUser] = useState(undefined);

    return (
        <UserContext.Provider value={{user,setUser}} >
            {props.children}
        </UserContext.Provider>
    )
}