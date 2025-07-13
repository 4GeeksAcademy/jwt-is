import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

const Signup = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    try {
      const res = await fetch("https://reimagined-couscous-pj9gvrqq9vp7h6rp6-3001.app.github.dev/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      if (res.status === 201) {
      setSuccess("Usuario creado correctamente. Ahora puedes iniciar sesión.")
      setTimeout(() => navigate("/login"), 1500)
    } else {
      let errorMessage = "Error al crear el usuario"
      const text = await res.text()
      try {
        const data = JSON.parse(text)
        errorMessage = data.message || errorMessage
      } catch (err) {
        errorMessage = errorMessage + " - " + (text || "Sin respuesta del servidor")
      }
      setError(errorMessage)
    }
  } catch (err) {
    console.error("Error capturado:", err)
    setError("Error de conexión: " + err.message)
  }
  }

  return (
    <div className="container mt-4" style={{ maxWidth: 400 }}>
      <h2>Registro de Usuario</h2>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      {success && (
        <div className="alert alert-success" role="alert">
          {success}
        </div>
      )}
      <form onSubmit={handleSubmit} autoComplete="off">
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Correo electrónico
          </label>
          <input
            id="email"
            type="email"
            className="form-control"
            value={email}
            autoComplete="username"
            required
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ejemplo@correo.com"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Contraseña (mínimo 6 caracteres)
          </label>
          <input
            id="password"
            type="password"
            className="form-control"
            value={password}
            autoComplete="new-password"
            minLength={6}
            required
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
          />
        </div>
        <button type="submit" className="btn btn-success w-100">
          Registrarse
        </button>
      </form>
    </div>
  )
}

export default Signup
