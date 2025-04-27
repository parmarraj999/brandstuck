import { createContext, useEffect, useState } from "react";
import { getFirestore, collection, query, orderBy, limit, getDocs, startAfter, endBefore } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";


export const AllProductDataContext = createContext();

export const AllProductDataProvider = ({ children }) => {

    const [AllProductList, setAllProductList] = useState([]);

    const pageSize = 20;

    const [lastVisible, setLastVisible] = useState(null);
    const [firstVisible, setFirstVisible] = useState(null);
    const [loading, setLoading] = useState(false);
    const [prevStack, setPrevStack] = useState([]);

    const fetchProducts = async (direction = "next") => {
        setLoading(true);

        try {
            let q;
            if (direction === "next") {
                q = lastVisible
                    ? query(
                        collection(db, "All-Product"),
                        orderBy("createdAt", "desc"),
                        startAfter(lastVisible),
                        limit(pageSize)
                    )
                    : query(
                        collection(db, "All-Product"),
                        orderBy("createdAt", "desc"),
                        limit(pageSize)
                    );
            } else if (direction === "prev") {
                // previous page query
                q = query(
                    collection(db, "All-Product"),
                    orderBy("createdAt", "desc"),
                    endBefore(firstVisible),
                    limit(pageSize)
                );
            }

            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const productData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                console.log("productData", productData);

                if (direction === "next") {
                    if (lastVisible) setPrevStack(prev => [...prev, firstVisible]);
                    setFirstVisible(querySnapshot.docs[0]);
                    setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
                } else if (direction === "prev") {
                    const newPrevStack = [...prevStack];
                    const newFirstVisible = newPrevStack.pop();
                    setPrevStack(newPrevStack);
                    setFirstVisible(querySnapshot.docs[0]);
                    setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
                }

                setAllProductList(productData)
            }
        } catch (error) {
            console.error("Error fetching products:", error);
        }

        setLoading(false);
    };

    useEffect(() => {
        fetchProducts("next")
    }, [])

    return (
        <AllProductDataContext.Provider value={{AllProductList,setAllProductList,fetchProducts,prevStack}}>
            {children}
        </AllProductDataContext.Provider>
    )
}