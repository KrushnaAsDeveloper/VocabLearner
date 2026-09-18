import React from 'react'
import explaining from "../../assets/mascot/explaining_owl.png"
import right_answer_owl from "../../assets/mascot/right_answer_owl.png"
import got_it_owl from "../../assets/mascot/got_it_owl.png"
import thinking_owl from "../../assets/mascot/thinking_owl.png"
import well_done_owl from "../../assets/mascot/well_done_owl.png"
function Overlay() {
  let owls = [{exp : explaining}, {right : right_answer_owl}, {got : got_it_owl}, {think : thinking_owl}, {well : well_done_owl} ]
  return (
    <div className=' w-50 relative flex justify-center items-center'>
    { owls.map((img, idx)=>(
       < img className='w-30  absolute top-5 ' src={img.think}  />
    ))}
      </div>
  )
}

export default Overlay