import React from 'react'
import "./DeleteConfirmation.scss"

const DeleteConfirmation = (props) => {
  return (
    <>
    <div className='delete-wrapper'>
        <div className="box2">
            <h2>{props.title}</h2>
            <p>{props.desc}</p>
            <div className="btns">
                <button className="btn" onClick={props.yesfunc}>Yes</button>
                <button className="btn2" onClick={props.nofunc}>No</button>
            </div>

        </div>

    </div>
    
    
    
    </>
  )
}

export default DeleteConfirmation