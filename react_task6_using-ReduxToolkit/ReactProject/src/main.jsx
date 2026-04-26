import { createRoot } from "react-dom/client";
import MainLayout from "./Layout/MainLayout";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import { Provider } from "react-redux";
import { store } from "./store/index.js";
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <MainLayout />
  </Provider>,
);
