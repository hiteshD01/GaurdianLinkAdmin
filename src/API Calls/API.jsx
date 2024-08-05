import axios from "axios";

const token = localStorage.getItem("accessToken");
// const userid = localStorage.getItem("userID");

export const userlogin = async (data) => {
    return await axios.post(`${import.meta.env.VITE_BASEURL}/users/login`, data);
}

export const register = async (data) => {
    return await axios.post(`${import.meta.env.VITE_BASEURL}/users/register`, data);
}

export const updateUser = async ({ id, data }) => {
    return await axios.put(`${import.meta.env.VITE_BASEURL}/users/${id}`, data,
        {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
    );
}

export const getUser = async ({ queryKey }) => {
    const userid = queryKey[1]
    return await axios.get(`${import.meta.env.VITE_BASEURL}/users/${userid}`,
        {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
    );
}

export const deleteUser = async (id) => {
    console.log(id)
    return await axios.delete(`${import.meta.env.VITE_BASEURL}/users/${id}`,
        {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
    );
}

export const userList = async ({ queryKey }) => {
    const role = queryKey[1];
    const page = queryKey[2] || 0;
    const limit = queryKey[3] || 100;

    return await axios.get(`${import.meta.env.VITE_BASEURL}/users`,
        {
            params: { role, page, limit },
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
    );
}

export const getAllOrders = async ({ queryKey }) => {
    const page = queryKey[1] || 0;
    const limit = queryKey[2] || 100;

    return await axios.get(`${import.meta.env.VITE_BASEURL}/payment/getAllOrders`,
        {
            params: { page, limit },
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
    );
}

export const updateStatus = async ({ id, quantity, status }) => {
    return await axios.put(`${import.meta.env.VITE_BASEURL}/payment/updateOrder/${id}`,
        {
            item_quantity: quantity,
            status
        },
        {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
    );
}

export const getRecentSOS = async () => {
    return await axios.get(`${import.meta.env.VITE_BASEURL}/location/recent-sos-locations`,
        {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
    );
}

export const getchartData = async () => {
    return await axios.get(`${import.meta.env.VITE_BASEURL}/location/sos-month?start_date=2023-01-01&end_date=2024-12-31`,
        {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
    );
}

export const getHotspot = async ({ queryKey }) => {
    const type = queryKey[1]

    return await axios.get(`${import.meta.env.VITE_BASEURL}/location/hotspot`,
        {
            params: { type },   
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
    );
}

export const getVehicleInfo = async ({ queryKey }) => {
    const id = queryKey[1]

    return await axios.get(`${import.meta.env.VITE_BASEURL}/vehicle/${id}`,
        {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
    );
}

export const resetPassword = async ({ password, token }) => {
    console.log(password, token)
    return await axios.post(`${import.meta.env.VITE_BASEURL}/users/reset-password/${token}`, { newPassword: password });
}   