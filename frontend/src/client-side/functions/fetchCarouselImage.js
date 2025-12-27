import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

/**
 * Fetch header images for mobile & desktop
 * @returns { mobile, desktop }
 */
export const fetchHeaderImages = async () => {
  try {
    const docRef = doc(db, "home-layout", "header");
    const snap = await getDoc(docRef);

    if (!snap.exists()) {
      return {
        mobile: {},
        desktop: {},
      };
    }

    const data = snap.data();

    return {
      mobile: data.mobile || {},
      desktop: data.desktop || {},
    };
  } catch (error) {
    console.error("Fetch header images error:", error);
    return {
      mobile: {},
      desktop: {},
    };
  }
};
