import React, { useEffect, useRef } from 'react';

const PayPalButton = () => {
  const paypalRef = useRef();

  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions) => {
          // Set up the transaction
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: '10.00',
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          // Capture the funds from the transaction
          const order = await actions.order.capture();
          console.log(order);
          // Make API call to server-side component to complete transaction
        },
      })
      .render(paypalRef.current);
  }, []);

  return (
    <div>
      <div ref={paypalRef}></div>
    </div>
  );
};

export default PayPalButton;
