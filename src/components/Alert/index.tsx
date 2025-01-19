import useAlertStore from "../../zustand/alert";
import Loading from "../../components/Loading";
import Toast from "../Toast";
import './styles.css';

const Alert = () => {

   const { errors, message, loading, type } = useAlertStore();
   console.log(message);
   return (
      <div>
         {loading && <Loading />}
         {errors && <Toast title="Error" message={errors} type={type} />}
         {message && <Toast title={type === "success" ? "Buen trabajo" : type === "notification" ? "Notificacion" : "Error"} message={message} type={type} />}
      </div>
   );
};

export default Alert;
