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
import { UserCredentialContext } from "./userCredentialProvider";

export const TransactionsContext = createContext();

export const TransactionsProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userId } = useContext(UserCredentialContext);

  useEffect(() => {
    if (!userId) {
      setTransactions([]);
      setLoading(false);
      return;
    }

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
        setLoading(false);
      },
      (error) => {
        console.error("Transactions fetch error:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [userId]);

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
