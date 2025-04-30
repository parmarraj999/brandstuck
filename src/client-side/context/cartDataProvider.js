import { addDoc, collection, deleteDoc, doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";
import React, { createContext, useCallback, useEffect, useState } from "react"
import { db } from "../../firebase/firebaseConfig";
import { AddOrderToFirestore } from "../functions/placeOrder";

export const cartDataContext = createContext({
    cartItems: [],
    addToCart: () => { },
    removeFromCart: () => { },
});

export const CartDataProvider = ({ children }) => {

    const [cartItems, setCartItems] = useState([]);
    const userId = window.localStorage.getItem("userId")
    const [totalAmount,setTotalAmount] = useState(0)

    // console.log(cartItems)

    const fetchCartData = () => {
        if (userId) {
            const cartRef = collection(db, 'users', userId, 'cart-products');

            const unsubscribeCart = onSnapshot(cartRef, (snapshot) => {
                const fetchedCartItems = snapshot.docs.map((doc) => ({
                    docId: doc.id,
                    ...doc.data(),
                }));
                setCartItems(fetchedCartItems);
            });

            return () => unsubscribeCart();
        } else {
            setCartItems([]);
        }
    }

    const addToCart = useCallback(async (product) => {
        const userDocRef = doc(db, 'users', userId);
        const ordersCollectionRef = collection(userDocRef, 'cart-products');
        const docRef = await addDoc(ordersCollectionRef, product);
    }, []);

    const removeFromCart = useCallback(async (productId) => {
        const cartItemRef = doc(db, 'users', userId, 'cart-products', productId);
        await deleteDoc(cartItemRef);
    }, []);

    const AddOrderTo = () =>{
        AddOrderToFirestore(cartItems, totalAmount);
    }

    useEffect(() => {
        fetchCartData();
    }, [])

    useEffect(() => {
        // Calculate the total amount whenever the products array changes
        const calculateTotal = () => {
            let sum = 0;
            cartItems.forEach(product => {
                if (product.hasOwnProperty('price')) {
                    sum += parseFloat(product.discountPrice); // Assuming 'price' is the key for the product amount
                }
            });
            setTotalAmount(sum);
        };
        calculateTotal();
    }, [cartItems]); // Re-run effect if the 'products' array changes

    const contextValue = {
        cartItems: cartItems,
        totalAmount: totalAmount,
        addToCart: addToCart,
        removeFromCart: removeFromCart,
        fetchCartData: fetchCartData,
        AddOrderTo: AddOrderTo
    };

    return (
        <cartDataContext.Provider value={contextValue}>
            {children}
        </cartDataContext.Provider>
    )
}