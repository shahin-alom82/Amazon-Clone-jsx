// import { useSelector } from "react-redux";

// export const calculateCartTotals = () => {
//       const { cart } = useSelector((state) => state.amazon)
//       const totalAmt = cart.reduce(
//             (sum, product) => {
//                   sum.regular += product?.price * product?.quantity;
//                   sum.discounted +=
//                         product?.price *
//                         (product?.discountPercentage / 100) *
//                         product?.quantity;
//                   return sum;
//             },
//             { regular: 0, discounted: 0 }
//       );

//       return { totalAmt };
// };



const utility = (carts) => {
      const totalAmt = carts.reduce(
        (sum, product) => {
          sum.regular += product?.price * product?.quantity;
          sum.discounted +=
            product?.price *
            (product?.discountPercentage / 100) *
            product?.quantity;
          return sum;
        },
        { regular: 0, discounted: 0 }
      );
    
      return totalAmt;
    };
    
    export default utility;
    