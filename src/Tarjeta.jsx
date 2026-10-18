export default function Tarjeta({ titulo, descripcion }) {
  return (
    <article className="tarjeta">
      <h3 className="tarjeta-titulo">{titulo}</h3>
      <p className="tarjeta-descripcion">{descripcion}</p>
    </article>
  );
}
