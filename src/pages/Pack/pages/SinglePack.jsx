/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from 'react';
import AppContext from '../../../context/AppProvider';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import moment from 'moment';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';

const SinglePack = () => {
  const { id } = useParams();
  const { userInfo } = useContext(AppContext);

  const packQuery = useQuery({
    queryKey: ['pack', id],
    queryFn: async () =>
      await axios(`${import.meta.env.VITE_BASE_URL}/class-package/${id}`).then(
        (res) => res.data
      ),
  });

  return (
    <div className="container-page my-10">
      <div
        className="grid gap-10 items-start"
        style={{ gridTemplateColumns: '1fr 20rem' }}
      >
        <div className="bg-white rounded-xl p-5">
          <h2 className="text-2xl mb-1 text-primary-dark font-semibold">
            INFORMACIÓN DEL USUARIO
          </h2>

          <div className="pl-5 mb-5">
            <p className="text-xl font-semibold">{userInfo?.name}</p>
            <p className="text-lg">{userInfo?.email}</p>
          </div>

          <h2 className="text-2xl mb-1 text-primary-dark font-semibold">
            FORMA DE PAGO
          </h2>
          {!packQuery?.isLoading && <CheckOutForm packInfo={packQuery?.data} />}

          {/* <button
            className="disabled:opacity-10"
            disabled={buyMutate.isPending}
            onClick={buyMutate.mutate}
          >
            Pagar Ahora
          </button> */}
        </div>
        <div className="bg-white rounded-xl overflow-hidden">
          <header className="py-2 px-4 text-xl bg-primary-dark text-white">
            <span>Tu compra</span>
          </header>

          <div className="p-5 text-2xl">
            <p className="mb-2 uppercase">
              {packQuery?.data?.packageQuantity} Clase
            </p>
            <p>$ {packQuery?.data?.packagePrice} MXN</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const CheckOutForm = ({ packInfo }) => {
  console.log('Entre aquiiii');
  const [clientSecret, setClientSecret] = useState();
  const stripePromise = loadStripe(import.meta.env.VITE_PUBLIC_STRIPE);

  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        const url = `${import.meta.env.VITE_BASE_URL}/checkout`;
        const { data } = await axios.post(url, {
          amount: +packInfo.packagePrice * 100,
        });
        console.log(data, 'FUNCIONA');
        setClientSecret(data.clientSecret);
      } catch (error) {
        console.log(error);
      }
    };

    fetchClientSecret();
  }, []);

  if (!clientSecret) return;
  console.log(clientSecret);

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <CheckOutFormStripe />
    </Elements>
  );
};

const CheckOutFormStripe = () => {
  const { userInfo } = useContext(AppContext);
  const { id } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const buyMutate = useMutation({
    mutationFn: () =>
      axios.patch(`${import.meta.env.VITE_BASE_URL}/users/buy-class-package`, {
        idPackage: id,
        momentDateFrontEnd: moment().format('YYYY-MM-DDTHH:mm:ssZ'),
      }),
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries(['qunatityClass', userInfo?.token]);
      navigate('/calendario');
    },
    onError: (err) => console.log(err),
  });

  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isProccessing, setIsProccesing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    try {
      //este hook permitira desabilitar el boton mientras cargar el pago o agregar spinner
      setIsProccesing(true);

      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/completion`,
        },
        redirect: 'if_required',
      });

      console.log(result);

      //si hay error renderizamos el error
      if (result?.error) {
        setMessage(result?.error.message);
      } else {
        setMessage('An unexpected error occured');
      }

      //si no hay error podemos mandar un mensaje y tambien algo en el backend como reducir cantidad de producto vendido
      if (!result?.error) {
        // const { data } = await axios.put(url, {
        //   status: result.paymentIntent.status,
        //   update_time: result.paymentIntent.created,
        //   id: result.paymentIntent.id,
        //   email_address: userInfo.email,
        // });
        await buyMutate.mutateAsync();
        setMessage('pago recivido');
      }
    } catch (error) {
      console.log(error);
    }
    setIsProccesing(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      <button
        id="submit"
        className="disabled:opacity-35 btn btn-outline-primary mt-3"
        disabled={isProccessing || !stripe || !elements || buyMutate.isPending}
      >
        {isProccessing ? <div>Loading ...</div> : 'Pay Now'}
      </button>

      {message && <div>{message}</div>}
    </form>
  );
};

export default SinglePack;
