import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { IAuthState, useAuthStore } from "../../zustand/auth";
import { Icon } from "@iconify/react/dist/iconify.js";

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const { auth }: IAuthState = useAuthStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="relative w-full h-[100vh] bg-[#F3F4F6]">
      <div className="fixed w-[250px]  z-50 left-0 top-0 h-full">
        {/* Sidebar */}
        <aside
          className={`fixed z-[9] top-0 ${isSidebarOpen ? "left-0" : "-left-full"
            } md:left-0 md:static w-[250px] h-full bg-white text-[#222] p-4 flex flex-col transition-all`}
        >
          <h2 className="text-lg font-bold mb-4 ml-2 md:mt-0 mt-20">Lilab Club Tennis</h2>
          <nav>
            <ul>
              
                <li className="py-2">
                  <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                      `block px-4 py-2 rounded text-[#222] transition-all ${isActive ? "bg-[#262626] transition-all text-[#fff]" : ""
                      }`
                    }
                  >
                    Inicio
                  </NavLink>
                </li>
        
              <li className="py-2">
                <NavLink
                  to="/clients"
                  className={({ isActive }) =>
                    `block px-4 py-2 rounded text-[#222] transition-all ${isActive ? "bg-[#262626] transition-all text-[#fff]" : ""
                    }`
                  }
                >
                  Gestión de Clientes
                </NavLink>
              </li>
              <li className="py-2">
                <NavLink
                  to="/access"
                  className={({ isActive }) =>
                    `block px-4 py-2 rounded text-[#222] transition-all ${isActive ? "bg-[#262626] transition-all text-[#fff]" : ""
                    }`
                  }
                >
                  Accesos
                </NavLink>
              </li>
              {auth?.role === "Admin" && (
                <li className="py-2">
                  <NavLink
                    to="/roles"
                    className={({ isActive }) =>
                      `block px-4 py-2 rounded text-[#222] transition-all ${isActive ? "bg-[#262626] transition-all text-[#fff]" : ""
                      }`
                    }
                  >
                    Roles
                  </NavLink>
                </li>
              )}
            </ul>
          </nav>
          <button
            className="p-2 text-center absolute bottom-5 w-[87%] mx-auto border-t border-solid border-[#222]"
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/";
            }}
          >
            Cerrar Sesión
          </button>
        </aside>
        <button
          className="md:hidden fixed top-4 left-4 z-50 p-2 bg-gray-200 rounded shadow-md"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <Icon icon="mdi:menu" width="24" />
        </button>
      </div>
      <main className="bg-gray-100 main">{children}</main>
    </div>
  );
};

export default DashboardLayout;