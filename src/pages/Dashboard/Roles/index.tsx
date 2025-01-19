import { Icon } from "@iconify/react/dist/iconify.js";
import DataTable from "../../../components/Datatable";
import { IAction } from "../../../components/Datatable/types";
import { ChangeEvent, useEffect, useState } from "react";
import Modal from "../../../components/Modal";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import ModalConfirm from "../../../components/ModalConfirm";
import { IAuthState, useAuthStore } from "../../../zustand/auth";
import { IUser } from "../../../interfaces/auth";
import Select from "../../../components/Select";

const Roles = () => {

    const initialForm: IUser = {
        id: 0,
        name: "",
        email: "",
        role: "",
        password: ""
    };

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        role: "",
        password: ""
    });

    const validateForm = () => {
        const newErrors = {
            name: formValues?.name ? "" : "El nombre es obligatorio",
            email: /\S+@\S+\.\S+/.test(formValues?.email) ? "" : "El correo electrónico es inválido",
        };

        // setErrors(newErrors);
        return Object.values(newErrors).every((error) => !error); // Retorna `true` si no hay errores
    };

    const { getAllUsers, users ,getUsersById, user,editUser,addUser,deleteUser}: IAuthState = useAuthStore();

    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isOpenModalConfirm, setIsOpenModalConfirm] = useState(false);

    const [formValues, setFormValues] = useState(initialForm);

    const handleGetUser = async (data: IUser) => {
        await getUsersById(data);
        setIsOpenModal(true);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    };

    const handleDeleteUser = async (data: IUser) => {
        await getUsersById(data);
        setIsOpenModalConfirm(true);
    };

    const actions: IAction[] = [
        {
            onClick: handleGetUser,
            className: "edit",
            icon: <Icon color="#66AD78" icon="material-symbols:edit" />,
            tooltip: "Editar"
        },
        {
            onClick: handleDeleteUser,
            className: "delete",
            icon: <Icon icon="fluent:delete-28-regular" color="#FF0022" />,
            tooltip: "Eliminar"
        }
    ];

    const submitUser = () => {
        console.log(formValues);
        if (!validateForm()) return;
        if (formValues.id !== 0) {
            console.log(formValues);
            editUser(formValues);
        } else {
            addUser(formValues);
        }
        setIsOpenModal(false);
    };

    useEffect(() => {
        if (user !== null) {
            setFormValues(user);
        }
    }, [user]);

    const handleConfirm = () => {
        if(user !== null) {
            deleteUser(user);
        }
        setIsOpenModalConfirm(false);
    };

    useEffect(() => {
        getAllUsers();
    }, []);

    const handleSelectChange = (_id: any, value: string, name: string) => {
        const updatedValues = { ...formValues, [name]: value };
        setFormValues(updatedValues);
    };

    console.log(formValues);

    return (
        <div className="md:p-10 p-5">
            <div className="flex justify-between items-center mb-10">
                <h2 className="md:text-2xl font-bold text-[18px]">Listado de usuarios con roles</h2>
                <Button className="" color="success" onClick={() => {
                    setFormValues({
                        id: 0,
                        name: "",
                        email: "",
                        password: "",
                        role: ""
                    });
                    setErrors({
                        name: "",
                        email: "",
                        password: "",
                        role: ""
                    });
                    setIsOpenModal(true);

                }}>Nuevo usuario</Button>
            </div>
            <div className='w-full'>
            <div className="overflow-hidden overflow-x-scroll md:overflow-x-visible">
                <DataTable actions={actions} bodyData={users}
                    headerColumns={[
                        '#',
                        'Nombres completos',
                        'Correo Electrónico',
                        'Rol'
                    ]} />
                    </div>
            </div>
            <Modal isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} title={formValues?.id !== 0 ? "Editar Usuario" : "Agregar Usuario"}>
                <div className="grid grid-cols-2 mb-6">
                    <div className="px-5 mt-10">
                        <Input
                            type="text"
                            name="name"
                            onChange={handleChange}
                            value={formValues?.name}
                            label="Nombres completos"
                            icon="solar:user-outline"
                            error={errors.name}
                            isIcon />
                    </div>
                    <div className="px-5 mt-10">
                        <Input
                            type="email"
                            name="email"
                            onChange={handleChange}
                            value={formValues?.email}
                            label="Correo Electrónico"
                            icon="formkit:email"
                            error={errors.email}
                            isIcon />
                    </div>
                    <div className="px-5 mt-10">
                        <Select
                            name="role"
                            onChange={handleSelectChange}
                            value={formValues?.role}
                            label="Rol"
                            options={[{id: "Admin", value: "Admin"}, {id: "Staff", value: "Staff"}]}
                            icon="carbon:user-role"
                            error={errors.role}
                            isIcon />
                    </div>
                    <div className="px-5 mt-10">
                        <Input
                            type="password"
                            name="password"
                            onChange={handleChange}
                            value={formValues?.password}
                            label="Cambiar Contraseña"
                            icon="mdi:password-outline"
                            error={errors.password}
                            isIcon />
                    </div>

                </div>
                <div className="flex justify-end px-5 mb-5">
                    <Button color="success" onClick={submitUser}>{formValues?.id !== 0 ? "Editar" : "Guardar"}</Button>
                </div>
            </Modal>

            {isOpenModalConfirm && <ModalConfirm confirmSubmit={handleConfirm} isOpenModal={isOpenModalConfirm} setIsOpenModal={setIsOpenModalConfirm} title="Confirmación" information="Estas seguro que deseas eliminar este usuario ? , si lo haces no podrás revertir este cambio." />}
        </div>
    );
};

export default Roles;