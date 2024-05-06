const ContactForm = () => {
  return (
    <section className="py-8">
      <div className="container-page">
        <h3 className="text-4xl text-center uppercase text-primary-color font-medium">
          Contacto
        </h3>
        <p className="text-center text-sm max-w-md mx-auto text-gray-700">
          Hola! Te podemos ayudar en algo? Si tienes dudas, comentarios,
          sugerencias o simplemente quieres saludarnos, llena el formulario.
        </p>
      </div>

      <article className="bg-[#F5F5F5] text-gray-700 sm:py-8 py-0 my-4">
        <div className="container-page">
          <div className="flex flex-col-reverse md:flex-row">
            <form className="flex-1 shadow-lg rounded space-y-5 px-6 py-6">
              <div>
                <h4 className="text-sm pt-1">
                  Te contactaremos a la brevedad.
                </h4>
              </div>

              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="text-black block">
                    <span className="text-red-500">*</span> Nombre
                  </label>
                  <input
                    className="bg-white border w-full focus:blue-focus px-2 py-1"
                    type="text"
                    id="name"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1">
                    <label htmlFor="email" className="text-black block">
                      <span className="text-red-500">*</span> Email
                    </label>
                    <input
                      className="bg-white border w-full focus:blue-focus px-2 py-1"
                      type="email"
                      id="email"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="text-black block">
                      <span className="text-red-500">*</span> Telefono
                    </label>
                    <input
                      className="bg-white border w-full focus:blue-focus px-2 py-1"
                      type="phone"
                      id="phone"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="comment" className="text-black block">
                    <span className="text-red-500">*</span> Comentario
                  </label>
                  <textarea
                    className="bg-white border w-full focus:blue-focus px-2 py-1"
                    id="comment"
                  ></textarea>
                </div>
              </div>

              <div className="flex flex-col">
                <div>
                  <button
                    className="text-sm text-white font-medium w-full rounded py-2 px-2 bg-primary-color hover:opacity-60 animation-fade"
                    type="submit"
                  >
                    Contactar
                  </button>
                </div>
              </div>
            </form>

            <div className="flex-1">
              <img
                className="w-full h-full"
                src={`https://images.unsplash.com/photo-1423666639041-f56000c27a9a?q=80&w=1474&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`}
              />
            </div>
          </div>
        </div>
      </article>
    </section>
  );
};

export default ContactForm;
