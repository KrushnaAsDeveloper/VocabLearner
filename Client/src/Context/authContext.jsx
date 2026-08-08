import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios"
export const AuthContextUser = createContext()

export function AuthContextProvider({children}) {
    const [userStatus, setUserStatus] = useState(false);
    useEffect(()=>{
        const checkUserStatus = async ()=>{
            const res = await axios.get("http://localhost:8080/api/v1/users/isLogged", {withCredentials : true})
            console.log(res.data.success)
            if(res.data.success == true){
                setUserStatus(true)
            }
        }
        checkUserStatus()
    }, [setUserStatus])

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