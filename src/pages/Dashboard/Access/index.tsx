import { ChangeEvent, useEffect, useState } from "react";
import DataTable from "../../../components/Datatable";
import { IAccessState, useAccessStore } from "../../../zustand/access";
import { IClient } from "../../../interfaces/client";
import { formatDateTime } from "../../../utils/formDateTime";
import Input from "../../../components/Input";
import useDebounce from "../../../hooks/useDebounce";


const Access = () => {

    const { getAccessClient , accessClients } : IAccessState = useAccessStore();
    const [searchClient, setSearchClient] = useState<string>("");

    const debounce = useDebounce(searchClient, 1000);
    
    useEffect(() => {
        getAccessClient(debounce);
    },[debounce]);

    const transformedData = accessClients?.map((client : IClient, index) => ({
        "#": index + 1,
        "Nombres completos": client.name,
        "Tipo de miembro": client.clientType,
        "Visitas": client.visitsRemaining,
        "Fecha y hora de entrada": formatDateTime(client.entryTime),
        "Fecha y hora de salida": formatDateTime(client.exitTime),
    }));

    return (
        <div className="md:p-10 p-5">
            <div className="flex justify-between items-center md:mb-10 mb-5">
                <h2 className="md:text-2xl font-bold text-[18px]">Lista de accesos</h2>
                </div>
                <div className='w-full'>
                <div className="w-56 mb-10">
                <Input name="" value="" onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchClient(e.target.value)} label="Buscar Cliente" icon="si:user-line" isIcon/>
                </div>
                <div className="overflow-hidden overflow-x-scroll md:overflow-x-visible">
                <DataTable actions={[]} bodyData={transformedData}
                    headerColumns={[
                        '#',
                        'Nombres completos',
                        'Tipo de miembro',
                        'Visitas',
                        'Fecha y hora entrada',
                        'Fecha y hora salida'
                    ]} />
                    </div>
            </div>
        </div>
    );
};

export default Access;