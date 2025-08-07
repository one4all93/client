import React from 'react'
import { API_BASE_URL } from '../utils/localhost';

const Products = ({name,imagePath,updateItemCount}) => {

  const handleChange = (e) => {
    const currentValue = e.target.value;
    updateItemCount(name, currentValue);
    //console.log(`Updated ${name} count to ${newItemCount}`);
  }

  return (
    <div style={{textAlign:'center'}}>
        <img 
            style={{ width: '75%'}}
            src={API_BASE_URL + `/${imagePath}`}
            alt={`${name} product`}
        />
        <form style={{ marginTop: '10px'}}>
            <label style={{ textAlign: 'right'}}>{name}</label>
            <input 
                type='number'
                name='quantity'
                style={{ marginLeft: '7px'}}
                min={0}
                defaultValue={0}
                onChange={handleChange}
            >
            </input>
        </form>
    </div>
  )
}

export default Products