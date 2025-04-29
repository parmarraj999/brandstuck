import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { db } from "../../firebase/firebaseConfig";

export const UserCredentialContext = createContext([]);

export const UserCredentialProvider = ({ children }) => {

    const [userCredential, setUserCredential] = useState([]);
    const [userAddress,setUserAddress] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    console.log(userCredential)

    const userId = window.localStorage.getItem('userId') || null;

    const fetchCredentials = async () => {
        try {
            const userCredentialsCollectionRef = collection(db, 'users', userId, 'user-credentials');

            const q = query(userCredentialsCollectionRef);

            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                // Get the first document
                const userDoc = querySnapshot.docs[0];
                const data = userDoc.data();
                setUserCredential(data);
                console.log('User credentials:', data);
            } else {
                setError('No user data found for this user.');
            }
            setLoading(false);
        } catch (err) {
            setError(err.message || 'Failed to fetch user data');
            setLoading(false);
        }
        try {
            const addressCollectionRef = collection(db, 'users', userId, 'address');
            const querySnapshot = await getDocs(addressCollectionRef);
      
            const fetchedAddresses = [];
            querySnapshot.forEach((doc) => {
              fetchedAddresses.push({
                id: doc.id, // Include the document ID
                ...doc.data(), // Spread the address data
              });
            });
            setUserAddress(fetchedAddresses)
        } catch (error) {

        }
    };

    useEffect(() => {
        fetchCredentials();
    }, []);

    useEffect(() => {
        fetchCredentials();
    }, [userId])

    return (
        <UserCredentialContext.Provider value={{ userCredential, setUserCredential, userAddress, setUserAddress, fetchCredentials }}>
            {children}
        </UserCredentialContext.Provider>
    )
}