import React, { useEffect } from "react";
import { IAuthState, useAuthStore } from "../../zustand/auth";
import { IClientState, useClientStore } from "../../zustand/client";
import { IAccessState, useAccessStore } from "../../zustand/access";
import { IClient } from "../../interfaces/client";
import { formatDateTime } from "../../utils/formDateTime";
import Chart from "./chart";
import { Icon } from "@iconify/react/dist/iconify.js";

const Dashboard: React.FC = () => {

  const { auth }: IAuthState = useAuthStore();
  const { clients, getAllClients }: IClientState = useClientStore();
  const { accessClients, getAccessClient }: IAccessState = useAccessStore();

  useEffect(() => {
    getAllClients("");
    getAccessClient("");
  }, [])

  const active = clients.filter((client: IClient) => client.clientType === "Miembro");

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">{`Bienvenido ${auth?.name}`}</h1>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white shadow-md rounded-lg p-4">
          <div className="flex items-center">
            <div className="bg-[#f0f9ff] text-center justify-center flex mr-5 rounded-full p-4">
              <Icon icon="clarity:users-line" color="#228EE1" width="36" height="36" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Total de Clientes</h2>
              <p className="text-3xl font-bold">{clients.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4">
        <div className="flex items-center">
            <div className="bg-[#ffefed] text-center justify-center flex mr-5 rounded-full p-4">
              <Icon icon="clarity:users-line" color="#EA4738" width="36" height="36" />
            </div>
            <div>
          <h2 className="text-lg font-semibold">Accesos Hoy</h2>
          <p className="text-3xl font-bold">{accessClients.length}</p>
          </div>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4">
        <div className="flex items-center">
            <div className="bg-[#eff0fe] text-center justify-center flex mr-5 rounded-full p-4">
              <Icon icon="clarity:users-line" color="#515AC4" width="36" height="36" />
            </div>
            <div>
          <h2 className="text-lg font-semibold">Miembros Activos</h2>
          <p className="text-3xl font-bold">{active.length}</p>
          </div>
          </div>
        </div>
      </div>

      {/* Gráficos */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Accesos Semanales</h2>
        {/* Aquí puedes integrar una librería de gráficos, como Chart.js */}
        <div className="h-64">
          <Chart accessClients={accessClients} />
        </div>
      </div>

      {/* Registros Recientes */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Últimos Accesos</h2>
        <ul>
          {
            accessClients && accessClients.length > 0 ? accessClients?.map((client: IClient) => (
              <li className="flex justify-between py-2 border-b">
                <span>{client.name}</span>
                <span>{formatDateTime(client.entryTime)}</span>
              </li>
            )) :
              <div>
                <p>No hay accesos aún</p>
              </div>
          }
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;