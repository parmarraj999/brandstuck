import { createContext, useEffect, useState } from "react";
import { collection, query, orderBy, limit, getDocs, startAfter, endBefore, where } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";


export const AllProductDataContext = createContext();

export const AllProductDataProvider = ({ children }) => {

    const [AllProductList, setAllProductList] = useState([]);
    const [filterProductList, setFilterProductList] = useState([]);
    const [coupons, setCoupons] = useState([]);
    const [loading, setLoading] = useState(false); // Added missing loading state

    const pageSize = 20;

    const [lastVisible, setLastVisible] = useState(null);
    const [firstVisible, setFirstVisible] = useState(null); // Added missing firstVisible state
    const [prevStack, setPrevStack] = useState([]);

    const [filters, setFilters] = useState({
        subCategory: null,
        brand: null,
        size: null,
        minPrice: 0,
        maxPrice: 20000
    });

    const fetchProducts = async (direction = "next") => {
        // setLoading(true);

        try {
            let q = collection(db, "All-Product");
            let constraints = [];

            // Add Filter Constraints
            if (filters.subCategory && filters.subCategory !== "All") {
                constraints.push(where("subCategory", "==", filters.subCategory));
            }
            if (filters.brand) {
                constraints.push(where("brand", "==", filters.brand));
            }
            if (filters.size) {
                constraints.push(where("sizes", "array-contains", filters.size)); // Assuming sizes is an array
            }
            if (filters.minPrice > 0 || filters.maxPrice < 20000) {
                constraints.push(where("discountPrice", ">=", Number(filters.minPrice)));
                constraints.push(where("discountPrice", "<=", Number(filters.maxPrice)));
            }

            // Order must come after range filters if any
            constraints.push(orderBy("createdAt", "desc"));

            if (direction === "next") {
                if (lastVisible) constraints.push(startAfter(lastVisible));
            } else if (direction === "prev") {
                if (firstVisible) constraints.push(endBefore(firstVisible));
            }

            constraints.push(limit(pageSize));

            q = query(q, ...constraints);

            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const productData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));

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

                setAllProductList(productData);
                setFilterProductList(productData);
            } else {
                if (!lastVisible && !firstVisible) {
                    setAllProductList([]);
                    setFilterProductList([]);
                }
            }
        } catch (error) {
            console.error("Error fetching products:", error);
            // If index is required, Firestore will throw error with a link
        }

        // setLoading(false);
    };

    const resetPagination = () => {
        setLastVisible(null);
        setFirstVisible(null);
        setPrevStack([]);
    };

    const fetchCoupons = async () => {
        const querySnapshot = await getDocs(collection(db, "coupons"));
        const couponsData = querySnapshot.docs.map(doc => doc.data());
        setCoupons(couponsData);
        // console.log("Coupons fetched:", couponsData);
    };

    useEffect(() => {
        fetchProducts("next");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters]);

    useEffect(() => {
        fetchCoupons();
    }, []);

    return (
        <AllProductDataContext.Provider value={{
            AllProductList,
            setAllProductList,
            fetchProducts,
            prevStack,
            filterProductList,
            setFilterProductList,
            coupons,
            filters,
            setFilters,
            resetPagination
        }}>
            {children}
        </AllProductDataContext.Provider>
    )
}