import Header from "./components/Header";
import Products from "./components/Products";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout.jsx";
import { CartContextProvider } from "./store/CartContext.jsx";
import { UserProgressProvider } from "./store/userProgressContext.jsx";

function App() {
  return (
    <UserProgressProvider>
    <CartContextProvider>
        <Header />
        <Products />
        <Cart />
        <Checkout />
    </CartContextProvider>
    </UserProgressProvider>
  );
}

export default App;
