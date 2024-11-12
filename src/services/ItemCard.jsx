import React, { useState } from "react";
import useCart from "@/store/useCart";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ItemCard = ({ items }) => {
  const addToCart = useCart((state) => state.addToCart);
  const removeFromCart = useCart((state) => state.removeFromCart);
  const [cart, setCart] = useState(false);
  const handleAddToCart = () => {
    setCart(!cart);
    addToCart({ ...items, quantity: 1 });
  };
  const handleRemoveFromCart = () => {
    setCart(!cart);
    removeFromCart(items);
  };

  return (
    <Card>
      <div className="flex flex-row gap-4 p-2">
        <div className="h-32 w-32 rounded overflow-hidden">
          <img
            src={items.image}
            alt="image"
            className="object-cover w-full h-full"
            loading="lazy"
          />
          <div className="relative bottom-10 w-full flex items-center justify-center">
            <Button
              className={`${cart ? "border-red-500 text-red-500" : ""}`}
              variant={cart ? "outline" : ""}
              onClick={cart ? handleRemoveFromCart : handleAddToCart}
            >
              {cart ? "Remove" : "Add"}
            </Button>
          </div>
        </div>
        <div className="flex flex-col justify-between w-[50vw] sm:w-[350px] lg:w-[380px]">
          <p className="font-semibold">{items.name}</p>
          <div className="flex flex-row gap-4">
            <p className="font-semibold">AED. {items.price}</p>
            <img
              src="https://www.clipartmax.com/png/full/299-2998556_vegetarian-food-symbol-icon-non-veg-symbol-png.png"
              alt="veg"
              width="24px"
            />
          </div>
          {/* <p className="text-sm">{items.description}</p> */}
        </div>
      </div>
    </Card>
  );
};

export default ItemCard;
