import { createContext, useState, useContext } from "react";

const VideoContext = createContext()



export function VideoProvider({children}) {
    const [currentVideoUrl, setCurrentVideoUrl] = useState("")
    const [object, setObject] = useState({
        url : "", 
        title : ""
    })
    return(
        <VideoContext.Provider value={{currentVideoUrl, setCurrentVideoUrl, object, setObject}}>
            {children}
        </VideoContext.Provider>
    )
}

export const useVideo = () => {
    const ctx = useContext(VideoContext);
    if (!ctx) throw new Error("useVideo must be used within a VideoProvider");
    return ctx;
};