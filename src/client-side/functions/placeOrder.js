import { addDoc, collection, doc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { v4 as uuidv4 } from 'uuid'; // Import uuid for generating unique IDs

export const AddOrderToFirestore = async () => {
    const productsToAdd = [
        { id: 'product1', name: 'T-Shirt', price: 20, quantity: 2 },
        { id: 'product2', name: 'Jeans', price: 50, quantity: 1 },
        { id: 'product3', name: 'Shoes', price: 80, quantity: 1 },
    ];

    const userId = 'user123'; // Replace with the actual user ID. In a real app, get this from your auth system.

    try {
        const orderData = {
            orderId : '',
            products: productsToAdd,
            orderDate: new Date(),
            totalAmount: productsToAdd.reduce((total, product) => total + (product.price * product.quantity), 0),
            orderStatus: 'pending', // Initial order status
        };

        // 1. Create a reference to the user's document.  We use doc() here.
        const userDocRef = doc(db, 'users', userId);

        // 2. Create a reference to the 'orders' subcollection within the user's document.
        const ordersCollectionRef = collection(userDocRef, 'orders'); // Corrected line

        // 3. Add the order data to the 'orders' subcollection.
        const docRef = await addDoc(ordersCollectionRef, orderData);
        console.log('Order added with ID:', docRef.id, 'to user:', userId);
        alert(`Order added successfully! Order ID: ${docRef.id} for User ID: ${userId}`); // Improved feedback


    } catch (error) {
        console.error('Error adding order:', error);
        alert(`Error adding order: ${error.message || 'Unknown error'}`);
    }

}
