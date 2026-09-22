import React from "react";
import { useOverlayProps } from "../../Context/overlayContext";

function Buttons({ skipOverlay, increase, testSubmit }) {
  const { skipButtonStatus, goToNext } = useOverlayProps();

  const handelClick = () => {
    if (increase) increase();
    else goToNext();
  };

  return (
    <div className="flex w-full justify-end items-center">
      <button
        onClick={handelClick}
        type="submit"
        className="text-xl mx-2 hover:bg-purple-500 cursor-pointer text-white font-bold w-20 h-10 border border-purple-300 p-2 flex justify-center items-center rounded-xl disabled:cursor-not-allowed disabled:text-gray-400 disabled:hover:bg-transparent"
      >
        {testSubmit ? testSubmit : "next"}
      </button>

      {skipButtonStatus ? (
        <button
          type="button"
          onClick={skipOverlay}
          className="text-xl mx-2 hover:bg-purple-500 cursor-pointer text-white font-bold w-20 h-10 border border-purple-300 p-2 flex justify-center items-center rounded-xl"
        >
          skip
        </button>
      ) : null}
    </div>
  );
}

export default Buttons;