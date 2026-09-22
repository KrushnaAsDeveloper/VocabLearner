import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { VideoProvider } from "./Context/VideoContext.jsx";
import { AuthContextProvider } from "./Context/authContext.jsx";
import { OverlayProvider } from "./Context/overlayContext.jsx";
createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <VideoProvider>
      <OverlayProvider>
        <App />
      </OverlayProvider>
    </VideoProvider>
  </AuthContextProvider>,
);
