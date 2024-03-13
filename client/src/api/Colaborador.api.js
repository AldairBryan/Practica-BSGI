import axios from "axios";
import getToken from "./Login.api";

const token = getToken();

const ColaboradorApi = axios.create({
    baseURL: `http://127.0.0.1:8000/colaborador/`,
    headers: {
        'Authorization': `Token ${token}`
    }
})

export const getColaborador = (colaboradorId) => {
    return ColaboradorApi.get(`${colaboradorId}`);
}


export const getAllColaboradores = async () => {
    const response = await ColaboradorApi.get('/');
    return response.data;
}

export const createColaborador = (colaborador) => {
    return ColaboradorApi.post('/create/', colaborador);
}

export const updateColaborador = (id, colaborador) => {
    return ColaboradorApi.put(`/${id}/update/`, colaborador);
}

export const deleteColaborador = (id) => {
    return ColaboradorApi.delete(`/${id}/delete/`);
}

export const getCountColaboradores = async () => {
    const res = await ColaboradorApi.get('/');
    const cols = res.data;
    const cantidad = cols.length;
    return cantidad;
}