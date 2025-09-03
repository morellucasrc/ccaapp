import { useState, useMemo } from "react";
import Registro from "./components/Registro";
import Lista from "./components/Lista";
import BusquedaAvanzada from "./components/BusquedaAvanzada";
import Sidebar from "./components/Sidebar";
import LegajoModal from "./components/LegajoModal";
import LoginBox from "./components/LoginBox";
import { PersonasProvider, usePersonas } from "./context/PersonasContext";
import { AuthProvider, useAuth } from "./components/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AppContent() {
  const { personas } = usePersonas();
  const { user } = useAuth();
  const [filtro, setFiltro] = useState({ genero: "", grupo: "", fecha: "" });
  const [seleccionada, setSeleccionada] = useState(null);
  const [modo, setModo] = useState("registro");

  const filtradas = useMemo(() => {
    return personas.filter((p) => {
      return (
        (!filtro.genero || p.genero.toLowerCase() === filtro.genero.toLowerCase()) &&
        (!filtro.grupo || p.grupo.toLowerCase() === filtro.grupo.toLowerCase()) &&
        (!filtro.fecha || p.fecha === filtro.fecha)
      );
    });
  }, [personas, filtro]);

  return (
    <>
      <Sidebar current={modo} setCurrent={setModo} />
      <main className="main glass">
        <div className="topbar">
          <h1 className="title">Registro de Personas</h1>
          <LoginBox /> {/* 🔑 login arriba a la derecha */}
        </div>

        <div className="app fade-in">
          {modo === "registro" && <Registro />}

          {user && modo === "lista" && (
            <>
              <Lista personas={filtradas} onSelect={setSeleccionada} />
              {filtradas.length === 0 && <p className="vacio">No hay personas</p>}
            </>
          )}

          {user && modo === "busqueda" && (
            <BusquedaAvanzada filtro={filtro} setFiltro={setFiltro} />
          )}
        </div>
      </main>

      {seleccionada && (
        <LegajoModal
          persona={seleccionada}
          actualizar={() => setSeleccionada(null)}
          eliminar={() => setSeleccionada(null)}
          cerrar={() => setSeleccionada(null)}
          personaSeleccionada={seleccionada}
          setSeleccionada={setSeleccionada}
        />
      )}

      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <PersonasProvider>
        <AppContent />
      </PersonasProvider>
    </AuthProvider>
  );
}
