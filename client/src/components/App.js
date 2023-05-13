import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "../GlobalStyle";
import Header from "./Header";
import "@fontsource/jost";
import "@fontsource/just-another-hand";
import BodyStyle from "../BodyStyle";
import Footer from "./Footer";
import Cart from "./Cart";
import HomePage from "./HomePage";
import SingleItem from "./SingleItem";
import UserProvider from "./UserContext";
import { useEffect, useState } from "react";

function App() {
  const [items, setItems] = useState(null);

  useEffect(() => {
    fetch("/api-getitems")
      .then((res) => res.json())
      .then((resData) => setItems(resData.data));
  }, []);
  return (
    <UserProvider>
      <BrowserRouter>
        <GlobalStyle />
        <Header items={items} />

        <BodyStyle id="body">
          <Routes>
            <Route
              className="routes"
              path="/"
              element={<HomePage items={items} />}
            />
            <Route className="routes" path="/cart/:userId" element={<Cart />} />
            <Route
              className="routes"
              path="/item/:itemId"
              element={<SingleItem />}
            />
          </Routes>
        </BodyStyle>
        <Footer />
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
