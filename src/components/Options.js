import React from 'react'
import { API_BASE_URL } from '../utils/localhost';

const Options = ({name}) => {
  return (
    <form>
        <input 
            type='checkbox'
            id={`${name} options`}
        />{" "}
        <label htmlFor={`${name} options`}>{name}</label>
    </form>
  )
}

export default Options