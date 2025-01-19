const BASE_URL = 'http://localhost:5283/api';
let isRefreshing = false; // Controla si el refresh está en proceso
let pendingRequests: (() => void)[] = []; // Almacena solicitudes pendientes durante el refresh


export async function refreshTokens<T>(token: string | null, refreshToken: string | null) {
    const url = `${BASE_URL}/token/refresh-token`;
    if(refreshToken != null && refreshToken !== undefined) {
        const options: RequestInit = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // Agregar el token al encabezado de la solicitud
            },
            body: JSON.stringify({
                refreshToken: refreshToken
            })
        };
        return await fetchData<T>(url, options);
    }
    
}


async function fetchData<T>(url: string, options?: any): Promise<T> {
    try {
        const response = await fetch(url, options);
        console.log(response);
        if (response.status === 401) {
            console.warn('Token expirado, intentando refrescar...');

            const refreshToken : string | null = localStorage.getItem('refreshToken');
            const token : string | null = localStorage.getItem('token');

            if (!refreshToken || !token) {
                redirectToLogin();
            }

            // Si ya hay un refresh en progreso, espera a que termine
            if (isRefreshing) {
                return new Promise<T>((resolve) => {
                    pendingRequests.push(() => resolve(fetchData<T>(url, options)));
                });
            }

            isRefreshing = true;

            try {
                const newAuth: any = await refreshTokens(token, refreshToken);
                
                localStorage.setItem('token', newAuth.data.token);
                localStorage.setItem('refreshToken', newAuth.data.refreshToken);

                // Actualiza el token en los headers
                options.headers['Authorization'] = `Bearer ${newAuth.token}`;

                // Ejecuta las solicitudes pendientes
                pendingRequests.forEach((cb) => cb());
                pendingRequests = [];

                return await fetchData<T>(url, options); // Reintenta la solicitud original
            } catch (error) {
                console.error('Error al refrescar el token:', error);
                redirectToLogin();
            } finally {
                isRefreshing = false;
                redirectToLogin();
            }
        }

        return await response.json();
    } catch (error: any) {
        console.error('Error en la solicitud:', error);

        if (error instanceof TypeError) {
            throw new Error('Error de red o servidor no disponible');
        }

        throw error;
    }
}

function redirectToLogin() {
    console.warn('Redirigiendo al inicio...');
    localStorage.clear();
    window.location.href = '/';
}

export async function get<T>(endpoint: string): Promise<T> {
    const token = localStorage.getItem('token');
    const url = `${BASE_URL}/${endpoint}`;
    if(token) {
        const options: RequestInit = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // Agregar el token al encabezado de la solicitud
            }
        };
        return await fetchData<T>(url, options);
    }
    return await fetchData<T>(url);
}

export async function getWithBody<T>(endpoint: string, data: any): Promise<T> {
    const url = `${BASE_URL}/${endpoint}`;
    const options: RequestInit = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data), // Pasar los datos en el cuerpo de la solicitud
    };
    return await fetchData<T>(url, options);
}

export async function post<T>(endpoint: string, data: any): Promise<T> {
    const token = localStorage.getItem('token'); // Obtener el token antes de cada solicitud
    const url = `${BASE_URL}/${endpoint}`;
    const options: RequestInit = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    };
    return await fetchData<T>(url, options);
}

export async function put<T>(endpoint: string, data: any): Promise<T> {
    const token = localStorage.getItem('token'); // Obtener el token antes de cada solicitud
    const url = `${BASE_URL}/${endpoint}`;
    const options: RequestInit = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Agregar el token al encabezado de la solicitud
        },
        body: JSON.stringify(data),
    };
    return await fetchData<T>(url, options);
}

export async function del<T>(endpoint: string): Promise<T> {
    const token = localStorage.getItem('token'); // Obtener el token antes de cada solicitud
    const url = `${BASE_URL}/${endpoint}`;
    const options: RequestInit = {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`, // Agregar el token al encabezado de la solicitud
        },
    };
    return await fetchData<T>(url, options);
}