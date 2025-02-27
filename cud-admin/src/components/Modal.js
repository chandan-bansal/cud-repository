import React from 'react'

const Modal = (props) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div
        className={`bg-white rounded-lg shadow-lg p-6 w-full max-w-lg`}
        >
        {props.children}
        </div>
    </div>
  )
}

export default Modal