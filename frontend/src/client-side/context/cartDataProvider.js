import { addDoc, collection, deleteDoc, doc, getDoc, onSnapshot, setDoc, writeBatch } from "firebase/firestore";
import React, { createContext, useCallback, useContext, useEffect, useState } from "react"
import { db } from "../../firebase/firebaseConfig";
import { AddOrderToFirestore } from "../functions/placeOrder";
import { useNavigate } from "react-router-dom";
import { UserCredentialContext } from "./userCredentialProvider";

export const cartDataContext = createContext({
    cartItems: [],
    addToCart: () => { },
    removeFromCart: () => { },
});

export const CartDataProvider = ({ children }) => {

    const [cartItems, setCartItems] = useState([]);
    const { userId } = useContext(UserCredentialContext);
    const [totalAmount, setTotalAmount] = useState(0)
    const [cartLength, setCartLength] = useState();

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
                setCartLength(fetchedCartItems.length)
            });

            return unsubscribeCart;
        } else {
            setCartItems([]);
            setCartLength(0);
            return null;
        }
    }


    const addToCart = useCallback(async (product) => {
        if (!userId) return;
        const userDocRef = doc(db, 'users', userId);
        const ordersCollectionRef = collection(userDocRef, 'cart-products');
        const docRef = await addDoc(ordersCollectionRef, product);
    }, [userId]);

    const removeFromCart = useCallback(async (productId) => {
        if (!userId) return;
        const cartItemRef = doc(db, 'users', userId, 'cart-products', productId);
        await deleteDoc(cartItemRef);
    }, [userId]);

    const clearCart = useCallback(async () => {
        console.log("Attempting to clear cart for user:", userId);
        if (!userId) {
            console.error("No userId found, cannot clear cart");
            return;
        }
        try {
            const cartRef = collection(db, 'users', userId, 'cart-products');
            const batch = writeBatch(db);

            if (cartItems.length === 0) {
                console.log("Cart is already empty");
                return;
            }

            cartItems.forEach((item) => {
                if (item.docId) {
                    const itemRef = doc(cartRef, item.docId);
                    batch.delete(itemRef);
                } else {
                    console.warn("Item missing docId:", item);
                }
            });
            await batch.commit();
            console.log('Cart cleared successfully');
        } catch (error) {
            console.error("Error clearing cart:", error);
        }
    }, [userId, cartItems]);

    const AddOrderTo = async () => {
        console.log("AddOrderTo called");
        const success = await AddOrderToFirestore(cartItems, totalAmount);
        console.log("AddOrderToFirestore result:", success);
        if (success) {
            await clearCart();
        }
    }

    useEffect(() => {
        const unsubscribe = fetchCartData();
        return () => {
            if (unsubscribe) unsubscribe();
        };
    }, [userId])

    const isProductInCart = (productId) => {
        return cartItems?.some(item => item.productId === productId || item.id === productId);
    };


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
        AddOrderTo: AddOrderTo,
        cartLength: cartLength,
        isProductInCart: isProductInCart
    };

    return (
        <cartDataContext.Provider value={contextValue}>
            {children}
        </cartDataContext.Provider>
    )
}
