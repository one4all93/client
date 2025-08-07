import React from 'react'
import { API_BASE_URL } from '../utils/localhost';

const Options = ({name , updateItemCount}) => {

  return (
    <form>
        <input 
            type='checkbox'
            id={`${name} options`}
            onChange={(e) => updateItemCount(name, e.target.checked ? 1 : 0 )}
        />{" "}
        <label htmlFor={`${name} options`}>{name}</label>
    </form>
  )
}

export default Options