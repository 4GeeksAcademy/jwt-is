import React from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

const Demo = () => {
  const { store, dispatch } = useGlobalReducer();

  return (
    <div className="container mt-4">
      <ul className="list-group">
        {store && store.todos?.map((item) => (
          <li
            key={item.id}
            className="list-group-item d-flex justify-content-between align-items-center"
            style={{ background: item.background }}
          >
            <Link to={`/single/${item.id}`} className="text-decoration-none">
              <strong>{item.title}</strong>
            </Link>

            <div>
              <button
                className="btn btn-success btn-sm me-2"
                onClick={() =>
                  dispatch({
                    type: "add_task",
                    payload: { id: item.id, color: "#ffa500" },
                  })
                }
              >
                Cambiar color
              </button>

              <Link to="/" className="btn btn-primary btn-sm">
                Volver al inicio
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Demo;
