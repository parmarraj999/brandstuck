export const handleAddToCart = async () => {
    try {
        const cartDocRef = doc(db, 'users', userId, 'cartProducts', 'cart'); 

        await setDoc(cartDocRef, {
            products: arrayUnion(productToAdd) 
        }, { merge: true });

        console.log('Product added to cart!');
        alert('Product added to cart!');

    } catch (error) {
        console.error('Error adding product to cart:', error);
        alert(`Error adding product to cart: ${error.message || 'Unknown error'}`);
    }
};

export const handleRemoveFromCart = async () => {
    try {
        // 1. Create a reference to the user's cartProducts document.
        const cartDocRef = doc(db, 'users', userId, 'cartProducts', 'cart');

        // 2. Remove the product from the cart
        await updateDoc(cartDocRef, {
            products: arrayRemove(productToAdd)
        });

        console.log('Product removed from cart!');
        alert('Product removed from cart!');

    } catch (error) {
        console.error('Error removing product from cart:', error);
        alert(`Error removing product from cart: ${error.message || 'Unknown error'}`);
    }
};