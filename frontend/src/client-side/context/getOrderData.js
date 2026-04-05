import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
  getDocs,
} from "firebase/firestore";
import { createContext, useEffect, useState, useRef, useContext } from "react";
import { db } from "../../firebase/firebaseConfig";
import { UserCredentialContext } from "./userCredentialProvider";

export const OrderDataContext = createContext();

export const OrderDataProvider = ({ children }) => {
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { userId } = useContext(UserCredentialContext);

  const unsubscribeRef = useRef(null);

  /* ================= MANUAL FETCH (CALLABLE) ================= */
  const fetchOrders = async () => {
    if (!userId) return;
    try {
      setLoading(true);

      const q = query(
        collection(db, "Orders"),
        where("userData.uid", "==", userId),
        orderBy("orderAt", "desc")
      );

      const querySnapshot = await getDocs(q);

      const orders = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setOrderData(orders);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError(err);
      setLoading(false);
    }
  };

  /* ================= REALTIME LISTENER ================= */
  useEffect(() => {
    if (!userId) {
      setOrderData([]);
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, "Orders"),
      where("userData.uid", "==", userId),
      orderBy("orderAt", "desc")
    );

    unsubscribeRef.current = onSnapshot(
      q,
      (snapshot) => {
        const orders = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setOrderData(orders);
        setLoading(false);
      },
      (err) => {
        console.error(err);
        setError(err);
        setLoading(false);
      }
    );

    return () => {
      if (unsubscribeRef.current) unsubscribeRef.current();
    };
  }, [userId]);

  return (
    <OrderDataContext.Provider
      value={{
        orderData,
        loading,
        error,
        fetchOrders, // 👈 manual refresh
      }}
    >
      {children}
    </OrderDataContext.Provider>
  );
};
