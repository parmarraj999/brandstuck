const doPayment = async () => {
    let checkoutOptions = {
      paymentSessionId: "your-payment-session-id",
      redirectTarget: "_self",
    };
    cashfree.checkout(checkoutOptions);
  };