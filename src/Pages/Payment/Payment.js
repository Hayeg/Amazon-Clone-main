import React, { useContext, useState } from "react";
import classes from "./Payment.module.css";
import LayOut from "../../Component/LayOut/LayOut";
import { DataContext } from "../../Component/DataProvider/DataProvider";
import ProductCard from "../../Component/Product/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../Component/CurrencyFormat/CurrencyFormat";
import { axiosInstance } from "../../Api/axios";
import { ClipLoader } from "react-spinners";
import { db } from "../../Utility/firebase";
import { useNavigate } from "react-router-dom";

import { Type } from "../../Utility/action.type";

const Payment = () => {
  const [{ user, basket }, dispatch] = useContext(DataContext);
  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [loading, setLoading] = useState(false); // Added loading state

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const totalItem = basket?.reduce((amount, item) => item.amount + amount, 0);
  const total = basket?.reduce((amount, item) => item.price * item.amount + amount, 0);

  const handleChange = (e) => {
    e?.error?.message ? setCardError(e?.error?.message) : setCardError("");
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setProcessing(true);
    setLoading(true); // Set loading to true when payment processing starts

    try {
      const response = await axiosInstance.post(`/payment/create?total=${total * 100}`);
      const clientSecret = response.data?.clientSecret;
        console.log(clientSecret)
      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });
          console.log(paymentIntent);
      await db.collection("users")
        .doc(user.uid)
        .collection("orders")
        .doc(paymentIntent?.id)
        .set({
          basket: basket,
          amount: paymentIntent?.amount,
          created: paymentIntent?.created,
        });

      dispatch({ type: Type.EMPTY_BASKET });
      setProcessing(false);
      setLoading(false); // Set loading to false when payment processing finishes
      navigate("/orders", { state: { msg: "You have placed a new order" } });
    } catch (error) {
      console.error("Payment processing failed: ", error);
      setProcessing(false);
      setLoading(false); // Set loading to false when payment processing finishes
    }
  };

  return (
    <LayOut>
      <div className={classes.payment_header}>
        Checkout ({totalItem}) items
      </div>
      <section className={classes.payment}>
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>1902 E Jackson Way</div>
            <div>Seattle, WA</div>
          </div>
        </div>
        <hr />
        <div className={classes.flex}>
          <h3>Review items and delivery</h3>
          <div>
            {basket?.map((item) => (
              <ProductCard key={item.id} product={item} flex={true} />
            ))}
          </div>
        </div>
        <hr />
        <div className={classes.flex}>
          <h3>Payment methods</h3>
          <div className={classes.payment_card_container}>
            <div className={classes.payment__details}>
              <form onSubmit={handlePayment}>
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}
                <CardElement onChange={handleChange} />
                <div className={classes.payment__price}>
                  <div>
                    <span style={{ display: "flex", gap: "10px" }}>
                      <p>Total Order |</p>
                      <CurrencyFormat amount={total} />
                    </span>
                  </div>
                  <button type="submit" disabled={processing}>
                    {loading ? (
                      <div className={classes.loading}>
                        <ClipLoader color="gray" size={12} />
                        <p>Please Wait ...</p>
                      </div>
                    ) : (
                      "Pay Now"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  );
};

export default Payment;







// import React, { useContext, useState } from "react";
// import classes from "./Payment.module.css";
// import LayOut from "../../Component/LayOut/LayOut";
// import { DataContext } from "../../Component/DataProvider/DataProvider";
// import ProductCard from "../../Component/Product/ProductCard";
// import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
// import CurrencyFormat from "../../Component/CurrencyFormat/CurrencyFormat";
// import { axiosInstance } from "../../Api/axios";
// import { ClipLoader } from "react-spinners";
// import { db } from "../../Utility/firebase";
// import { useNavigate } from "react-router-dom";

// import { Type } from "../../Utility/action.type";
// const Payment = () => {
//   const [{ user, basket }, dispatch] = useContext(DataContext);
//   console.log(user);
//   const totalItem = basket?.reduce((amount, item) => {
//     return item.amount + amount;
//   }, 0);

//   const total = basket.reduce((amount, item) => {
//     return item.price * item.amount + amount;
//   }, 0);

//   const [cardError, setCardError] = useState(null);
//   const [processing, setProcessing] = useState(false);

//   const stripe = useStripe();
//   const elements = useElements();
//   const Navigate = useNavigate();

  
//   const handleChange = (e) => {
//     e?.error?.message ? setCardError(e?.error?.message) : setCardError("");
//   };
//   const handlePayment = async (e) => {
//     e.preventDefault();

//     try {
//       // setProcessing(true);
//       const response = await axiosInstance({
//         method: "POST",
//         url: `/payment/create?total=${total * 100}`,
//       });
//       console.log(response.data);
//       const clientSecret = response.data?.clientSecret;
//       const confirmation = await stripe.confirmCardPayment
//       (clientSecret, {
//         payment_method: { 
//           card: elements.getElement(CardElement),
//         },
//       });
//       console.log(confirmation);
//       await db
//         .collection("users")
//         .doc(user.uid)
//         .collection("orders")
//         .doc(paymentIntent.id)
//         .set({
//           basket: basket,
//           amount: paymentIntent.amount,
//           created: paymentIntent.created,
//         });
//       // dispatch({ type: Type.EMPTY_BASKET });
//       setProcessing(false);
//       Navigate("/orders", { state: { msg: "you have placed new Order" } });
//     } catch (error) {
//       console.log(error);
//       setProcessing(false);
//     }
//   };
//   return (
//     <LayOut>
//       <div className={classes.payment_header}>
//       Checkout ({totalItem}) items
//       </div>
//       {/* payment method */}
//       <section className={classes.payment}>
//         {/* address */}
//         <div className={classes.flex}>
//           <h3>Delivery Address</h3>
//           <div>
//             <div>{user?.email}</div>
//             <div>1902 E Way</div>
//             <div>Seattle, WA</div>
//           </div>
//         </div>
//         <hr />
//         <div className={classes.flex}>
//           <h3>Review items and delivery</h3>
//           <div>
//             {basket?.map((item) => (
//               <ProductCard product={item} flex={true} />
//             ))}
//           </div>
//         </div>
//         <hr />
//         {/* card form */}
//         <div className={classes.flex}>
//           <h3>Payment methods</h3>
//           <div className={classes.payment_card_container}>
//             <div className={classes.payment__details}>
//               <form onSubmit={handlePayment}>
//                 {cardError && (
//                   <small style={{ color: "red" }}>{cardError}</small>
//                 )}
//                 <CardElement onChange={handleChange} />
//                 <div className={classes.payment__price}>
//                   <div>
//                     <span style={{ display: "flex", gap: "10px" }}>
//                       <p>Total Order |</p> <CurrencyFormat amount={total} />
//                     </span>
//                   </div>
//                   <button type="submit">
//                     {loading ? (
//                       <div className={classes.loading}>
//                         <ClipLoader color="gray" size={12} />
//                         <p>Please Wait ...</p>
//                       </div>
//                     ) : (
//                       "Pay Now"
//                     )}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </section>
//     </LayOut>
//   );
// };

// export default Payment;
