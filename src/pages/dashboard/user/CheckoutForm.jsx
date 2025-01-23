import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../authentication/AuthProvider";
import toast from "react-hot-toast";
import useCart from "../../../hooks/useCart";
import { useNavigate } from "react-router-dom";


const CheckoutForm = ({data}) => {
    const [clientSecret, setClientSecret] = useState('')
    const [error, setError] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate()
    const [joinCamps] = useCart()

    const totalPrice = data.camp_fees;
    
    useEffect(() => {
        if (totalPrice > 0) {
            axiosSecure.post('/create-payment', { fees: totalPrice })
                .then(res => {
                    setClientSecret(res.data.clientSecret);
                })
        }
    }, [axiosSecure, totalPrice])

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return
        }
        const card = elements.getElement(CardElement)
        if (card === null) {
            return
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })
        if (error) {
            setError(error.message)
        }
        else {
            setError('')
        }
        // confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })
        if (confirmError) {
            console.log('confirm error');
        }
        else {
            if (paymentIntent.status === 'succeeded') {
                setTransection(paymentIntent.id)
                const payment = {
                    email: user?.email,
                    joinId: data._id,
                    fees: data.camp_fees,
                    transection: paymentIntent.id,
                }
                const res = await axiosSecure.post('/payment', payment)
                const status = 'Paid'
                if(res.data.insertedId){
                    // extra kaj
                    const result = await axiosSecure.patch(`/joinCamps-status/${data._id}`, { status })
                    if(result.data.modifiedCount > 0){
                        navigate('/dashboard/paymentHistory')
                        toast.success('Success Your payment')
                    }
                }
            }
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <div className="flex justify-center items-center">
                    <button className="btn btn-primary mt-16 w-1/3" type="submit"
                        disabled={!stripe || !clientSecret}
                    >
                        Pay
                    </button>
                </div>
                <p className="text-red-500 text-center mt-6">{error}</p>
            </form>
        </div>
    );
};

export default CheckoutForm;