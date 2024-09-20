import coach3 from "../../../images/coach-prev3.jpg";

const AboutInformacion = () => {
  return (
    <section className="container-page my-3 py-10">
      <article className="flex flex-col md:flex-row gap-5">
        <div className="flex-1">
          <img className="w-full rounded" src={coach3} />
        </div>

        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <p className="text-xl font-bold text-gray-700 mb-2">
            LT Cycle es una comunidad donde buscamos conectar tu cuerpo y mente,
            desafiando tus límites, logrando alcanzar la mejor versión de ti, y
            superando tus expectativas donde puedes ser tu mismo.
          </p>
          <p className="text-sm">
            ¡Únete a nuestra comunidad para disfrutar, aprender y divertirnos
            juntos!
          </p>
        </div>
      </article>
    </section>
  );
};

export default AboutInformacion;
