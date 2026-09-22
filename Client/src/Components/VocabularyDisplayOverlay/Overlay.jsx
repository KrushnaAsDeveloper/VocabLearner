import Test from "./Test";
import { useState } from "react";
import OwlExplaination from "./OwlExplaination";
import { useOverlayProps } from "../../Context/overlayContext";
function Overlay({ skipOverlay}) {
  const {next}=useOverlayProps()
  return (
    <>

      {next ? <OwlExplaination skipOverlay={skipOverlay} /> : 
      <Test skipOverlay={skipOverlay}/>}
    </>
  );
}

export default Overlay;


