import { FlutterWaveButton, closePaymentModal } from "flutterwave-react-v3";

const PlanAndUsage = () => {
  const config = {
    public_key: process.env.NEXT_PUBLIC_FLW_PUBLIC_KEY!,
    tx_ref: String(Date.now()),
    amount: 20,
    currency: "USD",
    payment_options: "card",
    customer: {
      email: "user@gmail.com",
      phone_number: "070********",
      name: "john doe",
    },
    customizations: {
      title: "LogDrop Pro",
      description: "Payment for items in cart",
      logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
    },
  };

  const fwConfig = {
    ...config,
    text: "Pay with Flutterwave!",
    callback: (response) => {
      console.log(response);
      closePaymentModal(); // this will close the modal programmatically
    },
    onClose: () => {},
  };

  return (
    <div>
      <FlutterWaveButton
        {...fwConfig}
        text="Upgrade to Pro"
        className="mt-10 bg-white shadow-md rounded-md border border-gray-800 py-2 px-4 text-sm font-medium text-gray-700 hover:bg-
        gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      />
    </div>
  );
};

export default PlanAndUsage;
