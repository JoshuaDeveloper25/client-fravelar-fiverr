import logo from '../../images/cycle-logo4.png';

const EmailSent = () => {
  return (
    <div className="container-page my-10 text-center text-2xl">
      <img src={logo} alt="logo" className="max-h-40 mx-auto mb-5" />
      <div>
        <p className="text-primary-color font-bold mb-5">
          Hemos enviado un correo a su email para verificar su cuenta
        </p>
      </div>
    </div>
  );
};

export default EmailSent;
