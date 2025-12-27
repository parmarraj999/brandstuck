import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

/**
 * Fetch New Drop product IDs for homepage
 * @returns {Array} productIds
 */
export const fetchNewDropProducts = async () => {
  try {
    const ref = doc(db, "home-layout", "newDrop");
    const snap = await getDoc(ref);

    if (!snap.exists()) {
      return [];
    }
    console.log(snap.data().productArray)
    return snap.data().productArray || [];
  } catch (error) {
    console.error("Fetch new drop error:", error);
    return [];
  }
};
