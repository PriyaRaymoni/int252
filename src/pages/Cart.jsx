/**
 * v0 by Vercel.
 * @see https://v0.dev/t/SdkjOYvFqk2
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Navbar from "@/services/Navbar";
import useCart from "@/store/useCart";
import { Minus, Plus, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";

const CartCard = ({ items }) => {
  const [quantity, setQuantity] = useState(items.quantity);

  const removeFromCart = useCart((state) => state.removeFromCart);
  const increaseItem = useCart((state) => state.increaseItem);
  const decreaseItem = useCart((state) => state.decreaseItem);

  const handleRemove = () => {
    removeFromCart(items);
  };

  const handleIncrease = () => {
    increaseItem(items);
    setQuantity((prev) => prev + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      decreaseItem(items);
      setQuantity((res) => res - 1);
    } else if (quantity === 1) {
      handleRemove();
    }
  };

  return (
    <Card className="flex gap-2 border rounded-xl p-2 shadow-lg w-[90vw] sm:w-[450px]">
      {/* image */}
      <div className="flex-shrink-0 w-28 h-28 overflow-hidden rounded-lg">
        <img
          src={items.image}
          alt={items.name}
          className="object-cover w-full h-full"
        />
      </div>

      <div className="flex flex-col gap-2 justify-center w-60">
        <h2 className="text font-semibold">{items.name}</h2>

        <div>
          <span className="font-semibold pe-1">AED. {items.price}</span>
          <span className="line-through text-sm">{items.price + 10}</span>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={handleDecrease}>
            <Minus size={18} />
          </Button>
          <span className="px-3 py-1 border rounded">{quantity}</span>
          <Button variant="outline" size="icon" onClick={handleIncrease}>
            <Plus size={18} />
          </Button>
        </div>
      </div>
    </Card>
  );
};

const Summary = ({ items }) => {
  const navigate = useNavigate();
  const handleOrder = () => {
    navigate("/order");
  };
  return (
    <Card className="w-[90vw] sm:w-[400px] min-w-[350px]">
      <div
        className="p-6 border rounded-xl shadow-xl
      "
      >
        <h2 className="text-lg font-bold border-b pb-2">ORDER SUMMARY</h2>

        {items.map((item, index) => {
          return (
            <div key={index} className="flex justify-between py-2">
              <span className="max-w-[70%]">{item.name}</span>
              <span>x{item.quantity}</span>
              <span>AED. {item.price}</span>
            </div>
          );
        })}

        <div className="flex justify-between py-2 border-t">
          <span>SALES TAX</span>
          <span>included</span>
        </div>

        <div className="flex justify-between py-2 border-t">
          <span className="font-bold">TOTAL</span>
          <span className="font-bold">
            AED. {items.reduce((total, item) => total + item.price * item.quantity, 0)}
          </span>
        </div>

        <Button className="w-full mt-4" onClick={handleOrder}>
          PROCEED TO CHECKOUT
        </Button>
      </div>
    </Card>
  );
};

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const getCart = useCart((state) => state.cart);
  useEffect(() => {
    // Fetch cart items using getCart method
    const items = getCart;
    setCartItems(items);
  }, [getCart]);

  return (
    <>
      <Navbar />

      <main className="flex gap-2 flex-wrap flex-col sm:flex-row justify-between items-start my-2 mx-2 sm:mx-10 md:mx-20">
        <div className="my-4 flex flex-col gap-4">
          {cartItems.map((item, index) => (
            <CartCard key={index} items={item} />
          ))}
        </div>

        <Summary items={cartItems} />
      </main>
    </>
  );
}

export default Cart;
