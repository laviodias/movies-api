import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes";
import '@progress/kendo-theme-default/dist/all.css';
import "./App.css";
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify';


function App() {
  return (
    <Router>
      <AppRoutes />
      <ToastContainer position="top-center" theme="colored"/>
    </Router>
  )
}

export default App;
