import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes";
import "@progress/kendo-theme-default/dist/all.css";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Header from "./components/header/Header";

function App() {
  return (
    <Router>
      <Header />
      <main>
        <AppRoutes />
      </main>
      <ToastContainer position="top-center" theme="colored" />
    </Router>
  );
}

export default App;
