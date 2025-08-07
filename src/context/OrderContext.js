import { createContext, useEffect, useMemo, useState } from "react";
import Products from "../components/Products";

export const OrderContext = createContext();

export function OrderContextProvider(props){

    console.log('OrderContext.js!!!');
    
    const [orderCounts, setOrderCounts] = useState({
        products : new Map(),
        options : new Map()
    });

    const [totals,setTotals] = useState({
        products : 0,
        options : 0,
        total : 0,
    })

    const pricePerItem = {
        products : 1000,
        options : 500,
    }

    const calculateSubtotal = (orderType, orderCounts) => {
        let optionCount = 0;
            for(const count of orderCounts[orderType].values()){
                optionCount += count;
            }
        return optionCount * pricePerItem[orderType];
    }

    useEffect(()=>{
        const productsTotal = calculateSubtotal("products", orderCounts);
        const optionsTotal = calculateSubtotal("options", orderCounts);
        const total = productsTotal + optionsTotal;
        setTotals({
            products : productsTotal,
            options : optionsTotal,
            total,
        })
    }, [orderCounts]);

    console.log('orderCounts',orderCounts);

    /**
     *  리랜더링 막기위해서 값 비교 후,
     *  값바뀌었으면 ? 리턴 실행 : 캐시값;
     *  useMemo(() =>{
     *      return [{ ...A }]
     *  }, [A])
     *  => [A]값을 비교해서 값이 바뀌었으면 return 실행  
     */
    const value = useMemo(() => {
        function updateItemCount(itemName, newItemCount, optionType) {
            // get option Map and make a copy
            const oldOrderMap = orderCounts[optionType];
            const newOrderMap = new Map(oldOrderMap);
            // update the copied Map
            newOrderMap.set(itemName, parseInt(newItemCount));

            // create new object with the old orderCounts plus new map
            const newOrderCounts = { ...orderCounts };
            newOrderCounts[optionType] = newOrderMap;

            // update state
            setOrderCounts(newOrderCounts);
        }
        console.log(totals)
        return [{ ...orderCounts, totals }, updateItemCount]
    }, [orderCounts, totals])

    return <OrderContext.Provider value={value} {...props}/>
}