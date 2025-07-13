// Estado inicial con autenticación y tareas
export function initialStore() {
  return {
    user: null, // usuario autenticado (null si no hay)
    token: null, // token JWT o similar
    todos: [
      { id: 1, title: "Tarea 1", background: "#eee" },
      { id: 2, title: "Tarea 2", background: "#ddd" },
      { id: 3, title: "Tarea 3", background: "#ccc" }
    ],
  };
}

// Reducer para manejar acciones
export default function storeReducer(state, action) {
  switch (action.type) {
    case "login":
      // Recibe payload con user y token
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };

    case "logout":
      // Limpia el estado de autenticación
      return {
        ...state,
        user: null,
        token: null,
      };

    case "add_task":
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id
            ? { ...todo, background: action.payload.color }
            : todo
        ),
      };

    default:
      return state;
  }
}
