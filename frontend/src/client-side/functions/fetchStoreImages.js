import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

/**
 * Fetch store images for home page Slider
 * @returns {Array} images
 */
export const fetchStoreImages = async () => {
    try {
        const ref = doc(db, "home-layout", "shop");
        const snap = await getDoc(ref);

        if (!snap.exists()) {
            return [];
        }

        // Assuming the structure is { images: [{img: 'url'}, ...] }
        console.log(snap.data().imagesArray)
        return snap.data().imagesArray || [];
    } catch (error) {
        console.error("Fetch store images error:", error);
        return [];
    }
};
