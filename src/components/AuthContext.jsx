import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const USUARIOS_VALIDOS = [
  { usuario: "emapereda", password: "1994" }, // podés poner varios
  { usuario: "mariana", password: "1995" }
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (usuario, password) => {
    const existe = USUARIOS_VALIDOS.find(
      (u) => u.usuario === usuario && u.password === password
    );
    if (existe) {
      setUser({ usuario: existe.usuario });
      return true;
    }
    return false;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
