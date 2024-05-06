const HomeNoticias = () => {
  return (
    <section className="container-page my-10">
      <h2 className="uppercase text-4xl text-center py-6">Noticias</h2>

      <article className="flex flex-wrap gap-y-6 justify-center gap-6 p-6">
        <div
          className="max-w-[19rem] hover:scale-105 ease-out transition-transform duration-300 border shadow-lg"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div>
            <img
              className="w-full md:h-60 h-auto object-cover"
              src={`https://images.unsplash.com/photo-1626252346582-c7721d805e0d?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`}
            />
          </div>
          <div className="px-3 py-3">
            <h4 className="text-gray-800 font-medium pb-2">
              ¡ESTILOS DE RIDES!
            </h4>
            <p className="text-gray-500 text-sm ">
              Explora nuestras especialidades, desde nuestro emocionante
              "Intense Ride" hasta el divertido "Let's...
            </p>
            <button className="w-full border border-primary-color text-primary-color mt-3 hover:bg-primary-color hover:text-white animation-fade uppercase text-xs font-bold px-2 py-2">
              Leer Más
            </button>
          </div>
        </div>

        <div
          className="max-w-[19rem] hover:scale-105 ease-out transition-transform duration-300 border shadow-lg"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div>
            <img
              className="w-full md:h-60 h-auto object-cover"
              src={`https://images.unsplash.com/photo-1571388072750-31a921b3d900?q=80&w=1450&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`}
            />
          </div>
          <div className="px-3 py-3">
            <h4 className="text-gray-800 uppercase font-medium pb-2">
              ¡Stronger: Become a Coach!
            </h4>
            <p className="text-gray-500 text-sm ">
              Explora nuestras especialidades, desde nuestro emocionante
              "Intense Ride" hasta el divertido "Let's...
            </p>
            <button className="w-full border border-primary-color text-primary-color mt-3 hover:bg-primary-color hover:text-white animation-fade uppercase text-xs font-bold px-2 py-2">
              Leer Más
            </button>
          </div>
        </div>

        <div
          className="max-w-[19rem] hover:scale-105 ease-out transition-transform duration-300 border shadow-lg"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div>
            <img
              className="w-full md:h-60 h-auto object-cover"
              src={`https://images.unsplash.com/photo-1616279967983-ec413476e824?q=80&w=1452&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`}
            />
          </div>
          <div className="px-3 py-3">
            <h4 className="text-gray-800 uppercase font-medium pb-2">
              ¡X-Press Intense en 30 Minutos!
            </h4>
            <p className="text-gray-500 text-sm ">
              Explora nuestras especialidades, desde nuestro emocionante
              "Intense Ride" hasta el divertido "Let's...
            </p>
            <button className="w-full border border-primary-color text-primary-color mt-3 hover:bg-primary-color hover:text-white animation-fade uppercase text-xs font-bold px-2 py-2">
              Leer Más
            </button>
          </div>
        </div>
      </article>
    </section>
  );
};

export default HomeNoticias;
