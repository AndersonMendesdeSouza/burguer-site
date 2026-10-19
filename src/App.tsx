import { Navigate, Route, Routes } from "react-router-dom";

import { DashboardLayout } from "./components/layouts/DashboardLayout";
import ScrollToTop from "./components/ScrollToTop";
import Cart from "./pages/cart/Cart";
import Checkout from "./pages/checkout/Checkout";
import FoodDetails from "./pages/food/FoodDetails";
import Main from "./pages/main/Main";
import OrderInform from "./pages/orderinfroma/order-inform";
import Orders from "./pages/orders/Orders";
import Profile from "./pages/profile/Profile";
// import Favorites from "./pages/favorites/Favorites";
import { useEffect } from "react";
import Login from "./pages/login/login";
import MessageDetails from "./pages/messages/MessageDetails";
import Messages from "./pages/messages/Messages";
import Register from "./pages/register/register";

function App() {

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const mesaId = params.get("mesa");

    if (mesaId) {
      sessionStorage.setItem("mesaId", mesaId);

      alert(`Mesa identificada: ${mesaId}`);
    } else {
      sessionStorage.removeItem("mesaId");
    }
  }, []);

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Navigate to="/main" replace />} />
          <Route path="main" element={<Main />} />
          <Route path="foodDetails" element={<FoodDetails />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="order-inform" element={<OrderInform />} />
          <Route path="pedidos" element={<Orders />} />
          {/* <Route path="favoritos" element={<Favorites />} /> */}
          <Route path="mensagens" element={<Messages />} />
          <Route path="mensagens/:threadId" element={<MessageDetails />} />
          <Route path="perfil" element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
