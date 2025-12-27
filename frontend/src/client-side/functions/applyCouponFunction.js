import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

/**
 * @param {string} couponCode
 * @param {number} cartTotal
 * @param {number} totalItems
 */
export const applyCoupon = async (
  couponCode,
  cartTotal,
  totalItems
) => {
  try {
    // 🔍 1. Find coupon
    const q = query(
      collection(db, "coupons"),
      where("couponName", "==", couponCode)
    );

    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return { success: false, message: "Invalid coupon code" };
    }

    const coupon = snapshot.docs[0].data();

    // 🧾 2. Minimum cart value check
    if (
      coupon.minCartValue &&
      cartTotal < coupon.minCartValue
    ) {
      return {
        success: false,
        message: `Minimum cart value ₹${coupon.minCartValue} required`,
      };
    }

    // 📦 3. Minimum items check
    if (
      coupon.minItems &&
      totalItems < coupon.minItems
    ) {
      return {
        success: false,
        message: `Minimum ${coupon.minItems} items required`,
      };
    }

    let discount = 0;

    // 💸 4. Calculate discount
    if (coupon.discountType === "amount") {
      discount = coupon.discountValue;
    } else {
      discount = (cartTotal * coupon.discountValue) / 100;
    }

    // ❌ Discount cannot exceed cart total
    if (discount > cartTotal) {
      discount = cartTotal;
    }

    const finalAmount = cartTotal - discount;

    // ✅ Success
    return {
      success: true,
      message: "Coupon applied successfully",
      discount: Math.round(discount),
      finalAmount: Math.round(finalAmount),
      coupon,
    };
  } catch (error) {
    console.error("Apply coupon error:", error);
    return {
      success: false,
      message: "Something went wrong, try again",
    };
  }
};
