import React, { useContext, useEffect , useState } from 'react'
import axios from "axios"
import Products from './Products';
import Options from './Options';
import ErrorBanner from './ErrorBanner';
import { OrderContext } from '../context/OrderContext'

const Type = ({ orderType }) => {
    console.log('orderType',orderType);

    const [items, setItems] = useState([]);
    const [error, setError] = useState(false);
    const [orderData, updateItemCount] = useContext(OrderContext);
    console.log('orderData', orderData.totals);
    useEffect(() => {
        loadItems(orderType);
    }, [orderType])

    const loadItems = async () =>{
        try{
            const res = await axios.get(`/${orderType}`)
            setItems(res.data);
        } catch(error){
            console.log(error);
            setError(true);
        }
    }

    // 컴포넌트를 분기해서 같은 이름으로 여러컴포넌트 사용 가능함**
    const ItemComponent = orderType === "products" ? Products : Options;

    const optionItems = items.map(item =>(
        <ItemComponent 
            key={item.name}
            name ={item.name}
            imagePath={item.imagePath}
            updateItemCount={(itemName, newItemCount) => updateItemCount(itemName, newItemCount, orderType)}
        />
    ))

    if(error){
        return <ErrorBanner msg="에러가 발생했습니다."/>

    }

    return (
        <div>
            <h2>주문 종류</h2>
            <p>하나의 가격</p>
            <p>총 가격 : {orderData.totals[orderType]}</p>
            <div 
                style={{ 
                    display: 'flex' , 
                    flexDirection: orderType === 'options' ? "column" : "row"
                }}
            >
                {optionItems}
            </div>
        </div>
    )
}

export default Type