import React, { useEffect, useState } from "react";
import ThemeToggleButton from "../ThemeToggltButton";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import useUser from "../store/useUser";
import {
  ArrowLeft,
  LogIn,
  LogOut,
  LucideShoppingBag,
  Search,
  User,
} from "lucide-react";
import { items } from "@/utils/items";
import useCart from "@/store/useCart";
import useThemeStore from "@/store/useThemeStore";
import { AvatarIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";

function Navbar() {
  const navigate = useNavigate();
  // theme
  const theme = useThemeStore((state) => state.theme);
  //screen size
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, []);

  const user = useUser((state) => state.user);
  const logout = useUser((state) => state.logout);
  const [isLogged, setIsLogged] = useState(false);
  useEffect(() => {
    if (user) setIsLogged(true);
    else setIsLogged(false);
  }, [user]);

  const [searchModal, setSearchModal] = useState(false);
  const handleSearch = () => {
    setSearchModal(!searchModal);
  };

  // search
  const [text, setText] = useState("");
  const [res, setRes] = useState([]);

  const searchItems = () => {
    if (text.length > 0) {
      const search = items.filter((item) =>
        item.name.toLowerCase().includes(text.toLowerCase())
      );
      setRes(search);
    } else {
      setRes([]); // Clear results if text is empty
    }
  };

  useEffect(() => {
    searchItems();
  }, [text]); // Trigger searchItems whenever text changes

  // cart
  const cartIsEmpty = useCart((state) => state.isEmpty(state.cart));
  const addToCart = useCart((state) => state.addToCart);
  return (
    <>
      {searchModal ? (
        <div className="h-screen w-full z-50">
          <div className="flex items-center border-b-2 border-gray-200 dark:border-white">
            <button className="p-2" onClick={handleSearch}>
              <ArrowLeft size={24} />
            </button>
            <input
              type="text"
              placeholder="Search Here..."
              className="w-full h-10 p-2 dark:bg-black"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button className="p-2" onClick={searchItems}>
              <Search size={24} />
            </button>
          </div>
          <div className="m-3">
            <button
              className="border border-black px-3 py-1 rounded-md"
              onClick={(e) => {
                setText(e.target.innerText);
                searchItems();
              }}
            >
              Daal
            </button>
          </div>

          {/* res */}

          <div>
            {res.map((item, index) => (
              <div
                key={index}
                className="flex gap-2 p-2 border m-1 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-800"
                onClick={() => {addToCart({ ...item, quantity: 1 })
                  toast("Item added to cart", "success")}}
              >
                <img
                  src={item.image}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div>
                  <p>{item.name}</p>
                  <p>{item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between px-4 sm:px-8 py-2 backdrop-blur-lg border-b-2 border-gray-200 dark:border-white">
          <div
            onClick={() => navigate("/")}
            className="text-3xl cursor-pointer p-0 flex items-center"
          >
            {theme === "dark" ? (
              <img
                src="https://lh3.googleusercontent.com/d/1aaau5YhUArh0Gbe7m5PR9cPAP4U4ipM0"
                className="h-10 w-10"
                alt="logo"
              />
            ) : (
              <img
                src="https://lh3.googleusercontent.com/d/1gtDtfsb5dw3YAaD3IJi04aofLNKW_unE"
                className="h-10 w-10"
                alt="logo"
              />
            )}
            <p>ROLLA</p>
          </div>
          <div className="flex gap-3 items-center">
            <Button variant="outline" size="icon" onClick={handleSearch}>
              <Search size={24} />
            </Button>

            {!isMobile && (
              <Button
                variant="outline"
                size="icon"
                onClick={() => navigate("/cart")}
              >
                <LucideShoppingBag size={24} />
              </Button>
            )}
            {!cartIsEmpty && !isMobile && (
              <div className="fixed top-2 right-32 rounded-full h-3 w-3 bg-red-500"></div>
            )}
            <ThemeToggleButton />
            {isLogged ? (
              <Button
                onClick={() => {
                  logout();
                  setIsLogged(false);
                }}
                size="icon"
                variant="outline"
              >
                <LogOut size={24} />
              </Button>
            ) : (
              <Button
                onClick={() => {
                  navigate("/auth");
                }}
                size="icon"
                variant="outline"
                className="bg-red-600 text-white rounded-full"
              >
                <User size={24} />
              </Button>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
