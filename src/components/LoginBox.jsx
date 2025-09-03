// src/components/LoginBox.jsx
import { useState } from "react";
import { useAuth } from "./AuthContext";

export default function LoginBox() {
  const { user, login, logout } = useAuth();
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const ok = login(usuario, password);
    if (!ok) {
      setError("Usuario o contraseña incorrectos");
    } else {
      setUsuario("");
      setPassword("");
      setError("");
    }
  };

  return (
    <div className="login-box">
      {!user ? (
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Ingresar</button>
          {error && <p className="error">{error}</p>}
        </form>
      ) : (
        <div className="user-info">
          <span> ingresaste con existo {user.usuario}</span>
          <button onClick={logout}>Salir</button>
        </div>
      )}
    </div>
  );
}
