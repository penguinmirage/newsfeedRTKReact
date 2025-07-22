import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import NewsList from "./components/NewsList";
import "antd/dist/reset.css";
import "./App.css";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div style={{ backgroundColor: "#fff", minHeight: "100vh" }}>
        <NewsList />
      </div>
    </Provider>
  );
};

export default App;
