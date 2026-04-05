import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { auth, db } from "../../firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

export const UserCredentialContext = createContext({
    userCredential: [],
    setUserCredential: () => { },
    userAddress: [],
    setUserAddress: () => { },
    fetchCredentials: () => { },
    fetchUserAddresses: () => { },
    userId: null,
    loading: true
});

export const UserCredentialProvider = ({ children }) => {

    const [userCredential, setUserCredential] = useState([]);
    const [userAddress, setUserAddress] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState(window.localStorage.getItem('userId') || null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserId(user.uid);
                window.localStorage.setItem('userId', user.uid);
            } else {
                setUserId(null);
                window.localStorage.removeItem('userId');
                setUserCredential([]);
                setUserAddress([]);
            }
        });
        return () => unsubscribe();
    }, []);

    const fetchUserAddresses = async () => {
        if (!userId) return;
        try {
            const addressCollectionRef = collection(db, 'users', userId, 'address');
            const querySnapshot = await getDocs(addressCollectionRef);

            const fetchedAddresses = [];
            querySnapshot.forEach((doc) => {
                fetchedAddresses.push({
                    id: doc.id,
                    ...doc.data(),
                });
            });
            setUserAddress(fetchedAddresses)
        } catch (error) {
            console.error("Error fetching addresses:", error);
        }
    }

    const fetchCredentials = async () => {
        if (!userId) {
            setLoading(false);
            return;
        }
        try {
            const userCredentialsCollectionRef = collection(db, 'users', userId, 'user-credentials');
            const q = query(userCredentialsCollectionRef);
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const userDoc = querySnapshot.docs[0];
                const data = userDoc.data();
                setUserCredential(data);
            } else {
                setError('No user data found for this user.');
            }
            fetchUserAddresses();
        } catch (err) {
            setError(err.message || 'Failed to fetch user data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCredentials();
    }, [userId]);

    return (
        <UserCredentialContext.Provider value={{
            userCredential,
            setUserCredential,
            userAddress,
            setUserAddress,
            fetchCredentials,
            fetchUserAddresses,
            userId,
            loading
        }}>
            {children}
        </UserCredentialContext.Provider>
    )
}
