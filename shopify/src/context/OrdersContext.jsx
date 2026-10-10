import { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const OrdersContext = createContext();

export function OrdersProvider({ children }) {
  const [orders, setOrders] = useLocalStorage("orders", []);

  const placeOrder = (orderData) => {
    const newOrder = {
      id: "ORD" + Date.now(),
      date: new Date().toISOString(),
      status: "Placed",
      ...orderData,
    };
    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  const getOrderById = (id) => orders.find((order) => order.id === id);

  return (
    <OrdersContext.Provider value={{ orders, placeOrder, getOrderById }}>
      {children}
    </OrdersContext.Provider>
  );
}

export const useOrders = () => {
  const context = useContext(OrdersContext);
  if (!context) throw new Error("useOrders must be used inside OrdersProvider");
  return context;
};