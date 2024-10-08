import coach2 from "../../../images/coach-prev2.jpg"

const ContactForm = ({ handleSubmit, isPending }) => {
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
            <form
              onSubmit={handleSubmit}
              className="flex-1 shadow-lg rounded space-y-5 px-6 py-6"
            >
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
                    name="name"
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
                      name="email"
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
                      name="phone"
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
                    name="comment"
                  ></textarea>
                </div>
              </div>

              <div className="flex flex-col">
                <div>
                  <button
                    className="cursor-pointer text-sm text-white font-medium w-full rounded py-2 px-2 bg-primary-color hover:opacity-60 animation-fade"
                    disabled={isPending}
                    type="submit"
                  >
                    Contactar
                  </button>
                </div>
              </div>
            </form>

            <div className="flex-1">
              <img
                className="w-full h-full object-cover"
                src={coach2}
              />
            </div>
          </div>
        </div>
      </article>
    </section>
  );
};

export default ContactForm;
