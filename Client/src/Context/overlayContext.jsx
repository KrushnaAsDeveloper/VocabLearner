import { createContext, useState, useContext } from "react";

const OverlayContext = createContext();

export function OverlayProvider({ children }) {
  const [puauseTimeData, setPauseTimeData] = useState();
  const [skipButtonStatus, setSkipButtonStatus] = useState(true);
  const [overlayStatus, setOverlayStatus] = useState(false);
  let [counter, setCounter] = useState(0)
  const [testSubmit, setTestSubmit] = useState("submit")

  const [next, setNext] = useState(true)
  const goToNext = ()=>{
    setNext(false)
  }


  return (
    <OverlayContext.Provider
      value={{
        puauseTimeData,//data
        skipButtonStatus,//mode
        setPauseTimeData,//fn
        setSkipButtonStatus,//fn
        next, // vairable of gotonext function
        setNext,  
        goToNext, //fn 
        overlayStatus, 
        counter, 
        setCounter,
        testSubmit, 
        setOverlayStatus, 
        setTestSubmit
      }}
    >
      {children}
    </OverlayContext.Provider>
  );
}

export const useOverlayProps = () => {
  const ctx = useContext(OverlayContext);
  if (!ctx) throw new Error("useVideo must be used within a VideoProvider");
  return ctx;
};
