import React from "react";
import { useParams } from "react-router-dom";

const Single = () => {
  const { id } = useParams();

  return (
    <div>
      <h2>Detalle del ítem {id}</h2>
      <p>Aquí mostrarías más detalles.</p>
    </div>
  );
};

export default Single;
