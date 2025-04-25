import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase/firebaseConfig";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { use } from "react";


export const handleEmailPasswordAuth = (async (setError, setLoading, name, email, password, userId, number,setStatus) => {

    const userDocRef = doc(db, 'users', userId);
    const dataCollectionRef = collection(userDocRef, 'user-credentials');

    try {
        if (email, password) {
            // Sign Up
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log("User signed up:", user);
            if (user) {
                
                await addDoc(dataCollectionRef, {
                    userId: userId,
                    name: name,
                    email: email,
                    number: number,
                    isVerify: false,
                })
                .then(()=>{
                    setStatus('signUp')
                })
            }

        } else {
            console.log('error in signup')
        }
    } catch (error) {
        setError(error.message);
    } finally {
        setLoading(false);
    }
});


export const handleLogInWithEmail = (async (setError, setLoading, email, password) => {

    try {
        if (email, password) {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log("User login in:", user);
            if (user) {
                window.localStorage.setItem("isLogIn", true)
            }
        }
    } catch (error) {
        setError(error.message);
    } finally {
        setLoading(false);
    }
});