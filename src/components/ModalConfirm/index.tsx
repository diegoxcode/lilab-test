import { Icon } from '@iconify/react/dist/iconify.js';
import { Dispatch } from 'react';
import ReactModal from 'react-modal';
import Button from '../Button';

interface IProps {
    isOpenModal: boolean;
    title: string
    setIsOpenModal: Dispatch<boolean>
    information: string
    confirmSubmit: any
}

const ModalConfirm = ({ isOpenModal, title,setIsOpenModal,information,confirmSubmit }: IProps) => {

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            width: "600px",
            height: "auto",
            border: "1px solid #d6d6d6",
            borderRadius: '10px',
            marginRight: '-50%',
            padding: '0px',
            transform: 'translate(-50%, -50%)'
        }
    };

    return (
        <ReactModal ariaHideApp={false} isOpen={isOpenModal} style={customStyles}>
            <div>
                <Icon onClick={() =>setIsOpenModal(false) } className='cursor-pointer absolute right-5 top-5' icon="material-symbols:close" width="24" height="24" />
                <h2 className='text-xl font-bold text-left border-b border-solid border-[#d6d6d6] p-5'>{title}</h2>
            </div>
            <div className='p-5'>
                {information}
            </div>
            <div className='flex justify-end pr-5 mb-5'>
                <div className='mr-5'>
                    <Button onClick={() => setIsOpenModal(false)}>Cancelar</Button>
                </div>
                <Button color='success' onClick={confirmSubmit}>Confirmar</Button>
            </div>
        </ReactModal>
    );
};

export default ModalConfirm;