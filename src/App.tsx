import "./index.css";
import imageBackground from "./assets/Fondo.png";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./components/login/Login";
import Home from "./components/inicio/Home";
import Carga from "./components/carga/Carga";
import Consulta from "./components/consulta/Consulta";
import IndividualConsulta from "./components/consulta/IndividualConsulta";
import { useUserStoreLocalStorage } from "./store/userStore";

function App() {
  const { isAuthenticated } = useUserStoreLocalStorage();
  return (
    <Router>
      <div className="h-screen w-full font-roboto scroll-smooth flex flex-col">
        <img
          src={imageBackground}
          alt="fondo"
          className="absolute top-0 left-0 inset-0 w-screen h-screen object-cover"
        />

        <Routes>
          {isAuthenticated ? (
            <>
              <Route path="/" element={<Navigate to="/inicio" replace />} />
              <Route path="/inicio" element={<Home />} />
              <Route path="/cargar" element={<Carga />} />
              <Route path="/consultar" element={<Consulta />} />
              <Route
                path="/consultar/consulta-individual/:polizaNumber"
                element={<IndividualConsulta />}
              />
            </>
          ) : (
            <Route path="/" element={<Login />} />
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
