import { Icon } from "@iconify/react/dist/iconify.js";
import DataTable from "../../../components/Datatable";
import { IAction } from "../../../components/Datatable/types";
import { IClientState, useClientStore } from "../../../zustand/client";
import { ChangeEvent, useEffect, useState } from "react";
import Modal from "../../../components/Modal";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import { IClient } from "../../../interfaces/client";
import ModalConfirm from "../../../components/ModalConfirm";
import Select from "../../../components/Select";
import useDebounce from "../../../hooks/useDebounce";

const Clients = () => {

    const initialForm: IClient = {
        id: 0,
        name: "",
        email: "",
        phoneNumber: "",
        clientType: "",
        isActiveInClub: false,
        visitsRemaining: 0,
        monthlyFee: 0
    };

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        clientType: "",
        visitsRemaining: "",
        monthlyFee: "",
    });

    const [searchClient, setSearchClient] = useState<string>("");

    const debounce = useDebounce(searchClient, 1000);

    const validateForm = () => {
        const newErrors = {
            name: formValues.name ? "" : "El nombre es obligatorio",
            email: /\S+@\S+\.\S+/.test(formValues.email) ? "" : "El correo electrónico es inválido",
            phoneNumber: formValues.phoneNumber.length >= 10 ? "" : "El teléfono debe tener al menos 10 caracteres",
            clientType: formValues.clientType ? "" : "El tipo de miembro es obligatorio",
            visitsRemaining:
                formValues.clientType === "Miembro" && formValues.visitsRemaining <= 0
                    ? "Las visitas deben ser un número positivo"
                    : "",
            monthlyFee:
                formValues.clientType === "Miembro" && formValues.monthlyFee <= 0
                    ? "Debe seleccionar un plan"
                    : "",
        };

        setErrors(newErrors);
        return Object.values(newErrors).every((error) => !error); // Retorna `true` si no hay errores
    };

    const { getAllClients, clients, addClient, getClient, client, editClient, deleteClient, registerExitClient, registerEntryClient }: IClientState = useClientStore();

    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isOpenModalConfirm, setIsOpenModalConfirm] = useState(false);

    const [formValues, setFormValues] = useState(initialForm);

    const handleGetClient = async (data: IClient) => {
        await getClient(data);
        setIsOpenModal(true);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    };

    const handleDeleteClient = async (data: IClient) => {
        await getClient(data);
        setIsOpenModalConfirm(true);
    };

    const handleRegisterClient = (data: IClient) => {
        registerEntryClient(data);
    };

    const handleRegisterExitClient = (data: IClient) => {
        registerExitClient(data);
    };

    const actions: IAction[] = [
        {
            onClick: handleGetClient,
            className: "edit",
            icon: <Icon color="#66AD78" icon="material-symbols:edit" />,
            tooltip: "Editar"
        },
        {
            onClick: handleDeleteClient,
            className: "delete",
            icon: <Icon icon="fluent:delete-28-regular" color="#FF0022" />,
            tooltip: "Eliminar"
        },
        {
            onClick: handleRegisterClient, // Acción para registrar la entrada
            className: "entry",
            icon: <Icon color="#0CA5EA" icon="uil:entry" />,
            tooltip: "Entrada",
        },
        {
            onClick: handleRegisterExitClient, // Acción para registrar la salida
            className: "exit",
            icon: <Icon color="#0CA5EA" icon="solar:exit-broken" />,
            tooltip: "Salida"
        },
    ];

    const submitClient = () => {
        console.log(formValues);
        if (!validateForm()) return;
        if (formValues.id !== 0) {
            editClient(formValues);
        } else {
            addClient(formValues);
        }
        setIsOpenModal(false);
    };

    useEffect(() => {
        if (client !== null) {
            setFormValues(client);
        }
    }, [client]);

    const handleConfirm = () => {
        deleteClient(client);
        setIsOpenModalConfirm(false);
    };

    const handleSelectChange = (_id: any, value: string, name: string) => {
        const updatedValues = { ...formValues, [name]: value };

        if (name === "clientType") {
            if (value === "Visitante") {
                updatedValues.visitsRemaining = 1;
                updatedValues.monthlyFee = 0;
            } else if (value === "Miembro") {
                updatedValues.visitsRemaining = 0; // Por defecto
                updatedValues.monthlyFee = 0; // Por defecto
            }
        }
        setFormValues(updatedValues);
    };

    useEffect(() => {
        getAllClients(debounce);
    }, [debounce]);

    console.log(formValues);

    return (
        <div className="md:p-10 p-5">
            <div className="flex justify-between items-center md:mb-10 mb-5">
            <h2 className="md:text-2xl font-bold text-[18px]">Listado de clientes</h2>
                
                <Button className="" color="success" onClick={() => {
                    setFormValues({
                        id: 0,
                        name: "",
                        email: "",
                        phoneNumber: "",
                        clientType: "",
                        visitsRemaining: 0,
                        isActiveInClub: false,
                        monthlyFee: 0,
                    });
                    setErrors({
                        name: "",
                        email: "",
                        phoneNumber: "",
                        clientType: "",
                        visitsRemaining: "",
                        monthlyFee: "",
                    });
                    setIsOpenModal(true);

                }}>Nuevo cliente</Button>
            </div>
            <div className='w-full'>
            <div className="w-56 mb-10">
                <Input name="" value="" onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchClient(e.target.value)} label="Buscar Cliente" icon="si:user-line" isIcon/>
                </div>
                <div className="overflow-hidden overflow-x-scroll md:overflow-x-visible">
                <DataTable actions={actions} bodyData={clients}
                    headerColumns={[
                        '#',
                        'Nombres completos',
                        'Correo Electrónico',
                        'Celular',
                        'Tipo de miembro',
                        'Visitas',
                        'Plan',
                        'Estado'
                    ]} />
                </div>
            </div>
            <Modal isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} title={formValues.id !== 0 ? "Editar Cliente" : "Agregar Cliente"}>
                <div className="grid grid-cols-2 mb-6">
                    <div className="px-5 mt-10">
                        <Input
                            type="text"
                            name="name"
                            onChange={handleChange}
                            value={formValues.name}
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
                            value={formValues.email}
                            label="Correo Electrónico"
                            icon="formkit:email"
                            error={errors.email}
                            isIcon />
                    </div>
                    <div className="px-5 mt-10">
                        <Input
                            type="text"
                            name="phoneNumber"
                            onChange={handleChange}
                            value={formValues.phoneNumber}
                            label="Celular"
                            error={errors.phoneNumber}
                            icon="solar:phone-outline"
                            isIcon />
                    </div>
                    <div className="px-5 mt-10">
                        <Select
                            name="clientType"
                            onChange={handleSelectChange}
                            value={formValues.clientType}
                            label="Tipo de cliente"
                            options={[{ id: "Visitante", value: "Visitante" }, { id: "Miembro", value: "Miembro" }]}
                            icon="la:user-tie"
                            error={errors.clientType}
                            isIcon />
                    </div>
                    <div className="px-5 mt-10">
                        <Input
                            type="number"
                            name="visitsRemaining"
                            onChange={handleChange}
                            value={formValues.visitsRemaining.toString()}
                            label="Visitas"
                            error={errors.visitsRemaining}
                            disabled={formValues.clientType === "Visitante"}
                            icon="mdi-light:check"
                            isIcon />
                    </div>
                    <div className="px-5 mt-10">
                        <Select
                            name="monthlyFee"
                            onChange={handleSelectChange}
                            error={errors.monthlyFee}
                            value={formValues.monthlyFee.toString()}
                            options={[{ id: "100", value: "100" }, { id: "200", value: "200" }]}
                            label="Plan"
                            disabled={formValues.clientType === "Visitante"}
                            icon="hugeicons:cashback" isIcon />
                    </div>
                </div>
                <div className="flex justify-end px-5 mb-5">
                    <Button color="success" onClick={submitClient}>{formValues.id !== 0 ? "Editar" : "Guardar"}</Button>
                </div>
            </Modal>

            {isOpenModalConfirm && <ModalConfirm confirmSubmit={handleConfirm} isOpenModal={isOpenModalConfirm} setIsOpenModal={setIsOpenModalConfirm} title="Confirmación" information="Estas seguro que deseas eliminar este cliente ? , si lo haces no podrás revertir este cambio." />}
        </div>
    );
};

export default Clients;