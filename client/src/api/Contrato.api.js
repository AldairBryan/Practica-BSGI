import axios from "axios";
import getToken from "./Login.api";

const token = getToken();

const ContratoApi = axios.create({
    baseURL: `http://127.0.0.1:8000/contrato/`,
    headers: {
        'Authorization': `Token ${token}`
    }
})

export const getContrato = (contratoId) => {
    return ContratoApi.get(`${contratoId}`);
}


export const getAllContratos = async () => {
    const response = await ContratoApi.get('/');
    return response.data;
}

export const createContrato = (contrato) => {
    return ContratoApi.post('/create/', contrato);
}

export const updateContrato = (id, contrato) => {
    return ContratoApi.put(`/${id}/update/`, contrato);
}

export const deleteContrato = (id) => {
    return ContratoApi.delete(`/${id}/delete/`);
}

export const getCountContratos = async () => {
    const res = await ContratoApi.get('/');
    const cons = res.data;
    const cantidad = cons.length;
    return cantidad;
}