import {
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
  getDocs,
} from "firebase/firestore";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { db } from "../../firebase/firebaseConfig";

export const TransactionsContext = createContext();

export const TransactionsProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = window.localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) return;

    const q = query(
      collection(db, "Transactions"),
      where("userId", "==", userId), // ✅ user filter
      orderBy("createdAt", "desc")     // ✅ index based sorting
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setTransactions(data);
        console.log(data)
        setLoading(false);
      },
      (error) => {
        console.error("Transactions fetch error:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [userId]);

  // const fetchUserTransactions = useCallback(
  //   async () => {
  //     try {
  //       if (!userId) return [];

  //       setLoading(true);

  //       const q = query(
  //         collection(db, "Transactions"),
  //         where("userId", "==", userId),
  //         orderBy("createdAt", "desc")
  //       );

  //       const snap = await getDocs(q);

  //       const data = snap.docs.map(doc => ({
  //         id: doc.id,
  //         ...doc.data(),
  //       }));

  //       setTransactions(data);
  //       console.log(data)
  //       return data;
  //     } catch (error) {
  //       console.error("Manual txn fetch error:", error);
  //       return [];
  //     } finally {
  //       setLoading(false);
  //     }
  //   },
  //   [userId]
  // );

  // useEffect(()=>{
  //   fetchUserTransactions();
  // },[])

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        loading,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};

// 🔥 custom hook
