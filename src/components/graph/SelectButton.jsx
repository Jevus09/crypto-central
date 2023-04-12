import React from 'react'
import './SelectButton.css'

const SelectButton = ({children, selected, onClick}) => {

  return (
    <span onClick ={onClick} className='selectbutton'
        style={{
            backgroundColor: selected ? '#DAA400' : '' ,
            color: selected ? 'black' : '' ,
            fontWeight: selected ? 700 : 500,
        }}
    
    >
        {children}
    </span>
  )
}

export default SelectButton