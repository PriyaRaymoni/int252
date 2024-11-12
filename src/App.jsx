import { useEffect } from "react";
import useThemeStore from "./store/useThemeStore";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Homepage from "./pages/Homepage";
import Auth from "./pages/Auth";
import Cart from "./pages/Cart.jsx";
import OrderPage from "./pages/OrderPage";
import Dashboard from "./pages/Admin/Dashboard";
import useUser from "./store/useUser";
import useItems from "./store/useItems";

const ProtectedRoute = ({ element }) => {
  const user = useUser((state) => state.user);
  const mail = user?.email;
  if (mail === "admin@tarc.com") {
    return element;
  }
  return <Navigate to="/auth" />;
};

function App() {
  const { theme } = useThemeStore();
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  useEffect(() => {
    useItems.getState().fetchItems();
  }, []);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<OrderPage />} />
          <Route
            path="/admin"
            element={<ProtectedRoute element={<Dashboard />} />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
