const AboutInformacion = () => {
  return (
    <section className="container-page my-3">
      <article className="flex flex-col md:flex-row gap-5">
        <div className="flex-1">
          <img
            className="w-full rounded"
            src={
              "https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
          />
        </div>

        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <p className="text-xl font-bold text-gray-700 mb-2">
            INSPIRACIÓN es lo que nos impulsa a crear SENSE CYCLE, mezclando
            todo lo que nos hace vibrar cada día.
          </p>
          <p className="text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
            excepturi omnis, non eum iste et molestiae maiores doloremque
            commodi quam alias doloribus vitae deserunt ipsam. Modi adipisci
            quia impedit architecto.
          </p>
        </div>
      </article>
    </section>
  );
};

export default AboutInformacion;
