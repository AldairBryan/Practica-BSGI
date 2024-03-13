import axios from "axios";
import getToken from "./Login.api";

const token = getToken();

const HorarioApi = axios.create({
    baseURL: `http://127.0.0.1:8000/horario/`,
    headers: {
        'Authorization': `Token ${token}`
    }
})

export const getHorario = (horarioId) => {
    return HorarioApi.get(`${horarioId}`);
}

export const getAllHorarios = async () => {
    const response = await HorarioApi.get('/');
    return response.data;
}

export const createHorario = (horario) => {
    return HorarioApi.post('/create/', horario);
}

export const updateHorario = (id, horario) => {
    return HorarioApi.put(`/${id}/update/`, horario);
}

export const deleteHorario = (id) => {
    return HorarioApi.delete(`/${id}/delete/`);
}

export const getCountHorarios = async () => {
    const res = await HorarioApi.get('/');
    const hors = res.data;
    const cantidad = hors.length;
    return cantidad;
}