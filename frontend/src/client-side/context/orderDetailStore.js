import { createContext, useState, useEffect } from "react";

export const OrderDetailStore = createContext();

export const OrderDetailStoreProvider = ({ children }) => {
  
    const [currentOrderData,setCurrentOrder] = useState([]);
    console.log(currentOrderData)

  return (
    <OrderDetailStore.Provider value={{ currentOrderData,setCurrentOrder }}>
      {children}
    </OrderDetailStore.Provider>
  );
};
