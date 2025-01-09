import React from "react";
import NavBar from "./components/NavBar/NavBar.tsx";
import ProductDashboard from "./pages/ProductDashboard/ProductDashboard.tsx";
import store from "./store.ts";
import { Provider } from "react-redux";

const App = () => {
  return (
    <Provider store={store} children={undefined}>
      <div className="App">
        <NavBar />
        <ProductDashboard />
      </div>
    </Provider>
  );
};

export default App;
