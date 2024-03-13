import axios from "axios";
import getToken from "./Login.api";

const token = getToken();

const ContactoApi = axios.create({
    baseURL: `http://127.0.0.1:8000/contacto/`,
    headers: {
        'Authorization': `Token ${token}`
    }
})

export const getContacto = (contactoId) => {
    return ContactoApi.get(`${contactoId}`);
}


export const getAllContactos = async () => {
    const response = await ContactoApi.get('/');
    return response.data;
}

export const createContacto = (contacto) => {
    return ContactoApi.post('/create/', contacto);
}

export const updateContacto = (id, contacto) => {
    return ContactoApi.put(`/${id}/update/`, contacto);
}

export const deleteContacto = (id) => {
    return ContactoApi.delete(`/${id}/delete/`);
}

export const getCountContactos = async () => {
    const res = await ContactoApi.get('/');
    const contactos = res.data;
    const cantidad = contactos.length;
    return cantidad;
}