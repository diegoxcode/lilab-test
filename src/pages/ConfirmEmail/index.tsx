import { useSearchParams } from 'react-router-dom';
import Input from '../../components/Input';
import { ChangeEvent, useState } from 'react';
import { IAuthState, useAuthStore } from '../../zustand/auth';

const ConfirmEmail = () => {
    const [searchParams] = useSearchParams();
    const token : any = searchParams.get('token'); 
    const [email, setEmail] = useState<string>("");
    const { verifiedEmail } : IAuthState = useAuthStore();
    const verifiedEmailConfirm = () => {
        verifiedEmail(token, email);
    }

    return (
        <div>
            <h1 className='text-center mt-10 text-xl'>Confirmación de correo electrónico</h1>
            <div className='w-fit mx-auto mt-10'>
            <Input
                type="email"
                name="email"
                onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                value=""
                label="Correo Electrónico"
                icon="formkit:email"
                isIcon />
                <button onClick={verifiedEmailConfirm} className='mt-5 w-full bg-[#222] text-[#fff]'>Verificar correo</button>
            </div>
        </div>
    );
};

export default ConfirmEmail;