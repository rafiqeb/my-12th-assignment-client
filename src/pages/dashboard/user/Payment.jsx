import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useLoaderData, useLocation } from "react-router-dom";


const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK)

const Payment = () => {
    const data = useLoaderData()
    
    return (
        <div>
            <h2 className="text-3xl font-bold text-center my-10">Payment Gateway</h2>
            <div className="mt-20">
                <Elements stripe={stripePromise}>
                    <CheckoutForm data={data}></CheckoutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;