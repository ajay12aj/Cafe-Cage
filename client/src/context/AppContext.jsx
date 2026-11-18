import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY;
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  const requireLogin = (targetPath = window.location.pathname) => {
    if (!user) {
      navigate("/login", { state: { from: targetPath } });
      toast.error("Please login or sign up first.");
      return false;
    }
    return true;
  };

  const fetchSeller = async () => {
    try {
      const { data } = await axios.get("/api/seller/is-auth");
      setIsSeller(Boolean(data.success));
    } catch {
      setIsSeller(false);
    }
  };

  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/user/is-auth");
      if (data.success) {
        setUser(data.user);
        setCartItems(data.user.cartItems || {});
      } else {
        setUser(null);
        setCartItems({});
      }
    } catch {
      setUser(null);
      setCartItems({});
    }
  };

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("/api/product/list");
      if (data.success) setProducts(data.products);
      else toast.error(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const addProductToList = (product) => {
    if (!product?._id) return;
    setProducts((current) => [
      product,
      ...current.filter((item) => item._id !== product._id),
    ]);
  };

  const addToCart = (itemId) => {
    if (!requireLogin(window.location.pathname)) return;
    const cartData = structuredClone(cartItems);
    cartData[itemId] = (cartData[itemId] || 0) + 1;
    setCartItems(cartData);
    toast.success("Added to Cart");
  };

  const updateCartItem = (itemId, quantity) => {
    if (!requireLogin("/cart")) return;
    const cartData = structuredClone(cartItems);
    cartData[itemId] = Math.max(1, Number(quantity));
    setCartItems(cartData);
    toast.success("Cart Updated");
  };

  const removeFromCart = (itemId) => {
    if (!requireLogin("/cart")) return;
    const cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId] -= 1;
      if (cartData[itemId] <= 0) delete cartData[itemId];
    }
    setCartItems(cartData);
    toast.success("Removed from Cart");
  };

  const getCartCount = () =>
    Object.values(cartItems).reduce((sum, value) => sum + Number(value || 0), 0);

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const id in cartItems) {
      const product = products.find((item) => item._id === id);
      if (product && cartItems[id] > 0) totalAmount += product.offerPrice * cartItems[id];
    }
    return Math.floor(totalAmount * 100) / 100;
  };

  useEffect(() => {
    fetchUser();
    fetchSeller();
    fetchProducts();
  }, []);

  useEffect(() => {
    if (!user) return;
    const updateCart = async () => {
      try {
        const { data } = await axios.post("/api/cart/update", { cartItems });
        if (!data.success) toast.error(data.message);
      } catch (error) {
        toast.error(error.response?.data?.message || error.message);
      }
    };
    updateCart();
  }, [cartItems, user]);

  const value = {
    navigate, user, setUser, setIsSeller, isSeller, showUserLogin, setShowUserLogin,
    products, currency, addToCart, updateCartItem, removeFromCart, cartItems,
    searchQuery, setSearchQuery, getCartAmount, getCartCount, axios, fetchProducts,
    addProductToList, setCartItems, requireLogin
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
