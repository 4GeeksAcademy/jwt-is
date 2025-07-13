import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Private = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    // Llama a la API privada con token para verificar usuario
    fetch("https://reimagined-couscous-pj9gvrqq9vp7h6rp6-3001.app.github.dev/api/private", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          // Token inválido o expirado
          sessionStorage.removeItem("token");
          navigate("/login");
          return;
        }
        const data = await res.json();
        setMessage(data.message);
      })
      .catch(() => {
        sessionStorage.removeItem("token");
        navigate("/login");
      });
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="container mt-4" style={{ maxWidth: 600 }}>
      <h2>Área Privada</h2>
      <p>{message}</p>
      <button className="btn btn-danger" onClick={handleLogout}>
        Cerrar sesión
      </button>
    </div>
  );
};

export default Private;
