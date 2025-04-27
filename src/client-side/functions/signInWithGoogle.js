import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase/firebaseConfig";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";


export const handleEmailPasswordAuth = (async (setError, setLoading, name, email, password, number, setStatus) => {

    try {
        if (email, password) {
            // Sign Up
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log("User signed up:", user);
            if (user) {

                const userDocRef = doc(db, 'users', user.uid);
                const dataCollectionRef = collection(userDocRef, 'user-credentials');


                await addDoc(dataCollectionRef, {
                    uid: user.uid,
                    name: name,
                    email: email,
                    number: number,
                    isVerify: false,
                })
                    .then(() => {
                        setStatus('signUp')
                        window.localStorage.setItem("userId", user.uid);
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


export const handleLogInWithEmail = (async (setError, setLoading, email, password, setStatus) => {

    

    try {
        if (email, password) {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log("User login in:", user);
            if (user) {
                window.localStorage.setItem("isLogIn", true)
                window.localStorage.setItem("userId", user.uid);
                setStatus('signUp')
            }
        }
    } catch (error) {
        setError(error.message);
    } finally {
        setLoading(false);
    }
});