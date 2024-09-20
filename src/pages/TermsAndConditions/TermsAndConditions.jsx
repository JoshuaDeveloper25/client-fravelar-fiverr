const TermsAndConditions = () => {
  return (
    <section className="container-page text-black/60 py-10 px-2">
      <div>
        <h4 className="font-semibold text-lg text-black mb-1">TIEMPO</h4>
        <p>
          ¡Llega a tiempo!, contamos con una tolerancia de 5 min, se sugiere
          estar 10 min antes de tu clase, si no llegas a tiempo se perderá y no
          podremos reembolsarla.
        </p>
      </div>

      <div className="mt-6">
        <h4 className="font-semibold text-lg text-black mb-2">
          INICIO DE CLASES
        </h4>

        <ul className="space-y-3">
          <li>
            1) Al llegar al estudio acércate a Front desk para hacer check in
          </li>
          <li>2) Solicita tus tenis</li>
          <li>
            3) Tu número de locker en donde podrás guardar tus pertenencias será
            el número de bici que reservaste.
          </li>
          <li>
            4) Espera las indicaciones de Staff para poder ingresar a tu clase.
          </li>
          <li>5) Limpia tu espacio.</li>
        </ul>
      </div>

      <div className="mt-6">
        <h4 className="font-semibold text-lg text-black mb-2">
          PASOS PARA COMPRAR Y RESERVAR CLASES
        </h4>

        <ul className="space-y-3">
          <li>1) Entra al link de la página</li>
          <li>2) Crea una cuenta</li>
          <li>3) Llena tus datos</li>
          <li>4) Elige el paquete que más te guste</li>
          <li>5) Selecciona tu bici.</li>
          <li>
            6) Reserva semanalmente, los horarios se habilitarán cada domingo.
          </li>
        </ul>
      </div>

      <div className="mt-6">
        <h4 className="font-semibold text-lg text-black mb-1">
          CLASES Y POLÍTICAS DE CANCELACIÓN
        </h4>
        <p>
          Cada paquete cuenta con una fecha de expiración, si no utilizas tus
          clases durante ese periodo, las clases se perderán y no habrá
          reembolsos.
        </p>

        <p className="mt-3">
          Contamos con una política de cancelación de 5 hrs previas, pasando
          este tiempo, se perderá la clase y no se será reembolsable.
        </p>
      </div>
    </section>
  );
};

export default TermsAndConditions;
