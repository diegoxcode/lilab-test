import { ChangeEvent, useEffect, useState } from "react";
import Input from "../../components/Input";
import lab from '../../../src/assets/svg/logolilab.svg';
import { IAuthState, useAuthStore } from "../../zustand/auth";
import { useNavigate } from "react-router-dom";

interface IUserForm {
    email: string;
    password: string;
}

const Login = () => {

    const initialForm: IUserForm = {
        email: "",
        password: "",
    };

    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const [formValues, setFormValues] = useState(initialForm);
    const { login, auth } : IAuthState = useAuthStore();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    };

    
      useEffect(() => {
        if (auth !== null && token !== null) {
            navigate("/dashboard");
        }
      }, [auth, token]);

    const accessPanel = () => {
        console.log(formValues);
          login({
            ...formValues,
            Role: "Admin"
          });
    };


    return (
        <div>
            <div className={`banner absolute w-full z-0`}>
                <div className="w-full h-full absolute"></div>
                <div className="flex justify-center items-center md:h-screen h-full relative z-50">
                    <div className="rounded-xl  relative md:shadow-xl bg-[#f4fffb]">
                        <div className="bg-[#fff] grid md:grid-cols-2 grid-cols-1 rounded-xl  relative">
                            <div className="w-full h-full hidden md:block rounded-l-xl rounded-t-xl">
                                <img src={lab} className="object-cover rounded-l-xl" width={600} height={600} alt="" />
                            </div>
                            <div className="md:p-16 px-8 pt-0">
                                <h3 className="font-bold text-2xl mt-0 md:mt-0 md:text-left text-center">Bienvenido de nuevo !</h3>
                                <p className="text-[#767676] mt-2 mb-10 font-semibold md:text-left text-center">Ingresa tu correo y contraseña</p>

                                <div className="mt-5">
                                    <Input isIcon icon="mdi:email-outline" type="email" name="email" onChange={handleChange} label="Correo" value="" />
                                </div>
                                <div className="mt-5">
                                    <Input isIcon icon="iconamoon:lock" type="password" name="password" onChange={handleChange} label="Contraseña" value="" />
                                </div>
                                <button onClick={accessPanel} className={`mt-5 bg-[#265B4D] shadow-[#265B4D] w-full py-4 rounded-xl text-[#fff] font-bold`}>Ingresar</button>
                                <p className="md:w-[400px] w-full mx-auto mt-10 text-center text-[14px]">Plataforma club lilab tennis - control de entradas y salidad de miembros del tennis.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;