import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { OrderContext } from '../../context/OrderContext'
import axios from 'axios';
import { API_BASE_URL } from '../../utils/localhost';

const CompletePage = ({ setStep }) => {

  const [orderHistroy, setOrderHistory] = useState([]);
  const [orderData] = useContext(OrderContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    orderCompleted(orderData);
  }, [orderData]);

  const orderCompleted = async (orderData) =>{
    try {
      const res = await axios.post(API_BASE_URL + '/order', orderData);
      console.log('Order completed successfully:', res.data);
      setOrderHistory(res.data);
      setLoading(false);
    } catch (error) {
      console.error('Error completing order:', error);
    }
    //const res = await axios.post('http://localhost:5000/orders', orderData);
  }

  const orderTable = orderHistroy.map((item, key) => (
    <tr key={item.orderNumber}>
      <td>{item.orderNumber}</td>
      <td>{item.price}</td>
    </tr>
  ));

  if(loading) {
    return <div>Loading...</div>;
  }else{
    return (
      <div style={{ textAlign: 'center'}}>
        <h2>주문 완료!</h2>
        <h3>주문 내역</h3>

        <br/>

        <button onClick={() => setStep(0)}>
          첫페이지로
        </button>

        <br/>

        <table 
          style={{ 
            margin: '0 auto', 
            width: '80%', 
            borderCollapse: 'collapse'
          }}>
          <tbody>
            <tr>
              <th>상품명</th>
              <th>수량</th>
            </tr>
            {orderTable}
          </tbody>
        </table>
      </div>
    )
  }

}

export default CompletePage