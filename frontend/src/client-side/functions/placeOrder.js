import { addDoc, collection, doc, serverTimestamp, writeBatch } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { v4 as uuidv4 } from 'uuid'; // Import uuid for generating unique IDs
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserCredentialContext } from "../context/userCredentialProvider";

export const AddOrderToFirestore = async (cartItems, totalAmount) => {

    const userId = window.localStorage.getItem('userId');

    function generateUniqueId() {
        const min = 10000; // Minimum 6-digit number
        const max = 99999; // Maximum 6-digit number
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    try {
        const orderData = {
            orderId: generateUniqueId(),
            products: cartItems,
            orderDate: new Date(),
            totalAmount: totalAmount,
            shippingCharges: '150',
            orderStatus: 'pending', // Initial order status
        };

        const batch = writeBatch(db);

        const userDocRef = doc(db, 'users', userId);
        const userOrdersCollectionRef = collection(userDocRef, 'orders');

        if (cartItems && cartItems.length > 0) {
            // Add order to user's orders collection
            await addDoc(userOrdersCollectionRef, orderData);

            // Add order to global payments collection
            await addDoc(collection(db, 'payments'), {
                orderData
            });

            // Mark each product in the order as sold
            cartItems.forEach((product) => {
                // Assuming EACH product in cartItems has either 'id' or 'productId' as the document ID in 'All-Product'
                const productId = product.id || product.productId;
                if (productId) {
                    const productRef = doc(db, "All-Product", productId);
                    batch.update(productRef, { status: "sold" });
                }
            });

            await batch.commit();
            console.log('Order added and products marked as sold');
            return true;
        } else {
            console.log('not added')
            return false;
        }

    } catch (error) {
        console.error('Error adding order:', error);
        alert(`Error adding order: ${error.message || 'Unknown error'}`);
        return false;
    }

}
