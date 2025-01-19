import { Icon } from '@iconify/react/dist/iconify.js';
import { Dispatch } from 'react';
import ReactModal from 'react-modal';

interface IProps {
    isOpenModal: boolean;
    title: string
    setIsOpenModal: Dispatch<boolean>
    children: React.ReactNode
}

const Modal = ({ isOpenModal, title,setIsOpenModal,children }: IProps) => {

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
            <div>
                {children}
            </div>
        </ReactModal>
    );
};

export default Modal;