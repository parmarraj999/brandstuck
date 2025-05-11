import { collection, getDocs } from "firebase/firestore";
import { Children, createContext, useEffect, useState } from "react";
import { db } from "../../firebase/firebaseConfig";

export const OrderDataContext = createContext();

export const OrderDataProvider = ({ children }) => {

    const [orderData, setOrderData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const userId = window.localStorage.getItem("userId")

    const fetchOrders = async () => {
        try {
            const ordersRef = collection(db, 'users', userId, 'orders');

            const querySnapshot = await getDocs(ordersRef);

            const ordersData = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setOrderData(ordersData.reverse())
            console.log(ordersData);

        } catch (err) {
            setError(err);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!userId) {
            setLoading(false);
            return;
        }

        fetchOrders();
    }, [userId]);

    return (
        <OrderDataContext.Provider value={{ orderData, fetchOrders }}>
            {children}
        </OrderDataContext.Provider>
    )
}