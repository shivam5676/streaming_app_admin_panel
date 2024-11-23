import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"; // Ensure Tailwind is configured
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider, useSelector } from "react-redux";
import store from "./store/store";
import AddGenreModal from "./components/AddGenreModal";
import { registerLicense } from "@syncfusion/ej2-base";

// Import Syncfusion CSS
import "@syncfusion/ej2-base/styles/material.css";
import "@syncfusion/ej2-react-grids/styles/material.css";
import "@syncfusion/ej2-buttons/styles/material.css";
import "@syncfusion/ej2-calendars/styles/material.css";
import ThemeSelector from "./components/ThemeSelector";
registerLicense(
  "Ngo9BigBOggjHTQxAR8/V1NCaF5cXmZCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdnWXhdcHRVQmVeV0F3Wks="
);
const RootComponent = () => {
  const themeMode = useSelector((state) => state.theme.themeMode); // Access themeMode from Redux state

  return (
    
      <BrowserRouter>
        {themeMode && <ThemeSelector />}
        <div
          className={`relative ${
            themeMode
              ? "pointer-events-none opacity-50"
              : "pointer-events-auto opacity-100"
          }`}
        >
          <App />
        </div>
        <ToastContainer />
      </BrowserRouter>
  
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <RootComponent />
  </Provider>
);
