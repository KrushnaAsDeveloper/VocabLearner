import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios"
export const AuthContextUser = createContext()

export function AuthContextProvider({children}) {
    const [userStatus, setUserStatus] = useState(false);

    return (
       <AuthContextUser.Provider value={{userStatus, setUserStatus}}>
        {children}
       </AuthContextUser.Provider>
    )
}


export const useAuthContext = () =>{
    const auth = useContext(AuthContextUser);
    if(!auth) throw new Error ("auth context not working")
    return auth
}