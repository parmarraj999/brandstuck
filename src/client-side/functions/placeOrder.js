import { addDoc, collection, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { v4 as uuidv4 } from 'uuid'; // Import uuid for generating unique IDs

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
            shippingCharges : '150',
            orderStatus: 'pending', // Initial order status
        };

        const userDocRef = doc(db, 'users', userId);

        const ordersCollectionRef = collection(userDocRef, 'orders');

        if (cartItems && cartItems.length > 0) {
            const docRef = await addDoc(ordersCollectionRef, orderData);
            console.log('Order added with ID:', docRef.id, 'to user:', userId);
            alert(`Order added successfully! Order ID: ${docRef.id} for User ID: ${userId}`);
        }
else{
    console.log('not added')
}

    } catch (error) {
        console.error('Error adding order:', error);
        alert(`Error adding order: ${error.message || 'Unknown error'}`);
    }

}
