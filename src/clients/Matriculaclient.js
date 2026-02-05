import axios from "./axios-config";
const URL = "http://localhost:8081/matricula/api/v1.0/estudiantes";

const consultarTodos = async (token) => {
  return axios
    .get(URL, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      return response.data;
    });
};
const consultarPorId = (id, token) => {
  return axios
    .get(`${URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      return response.data;
    });
};
const guardar = async (body, token) => {
  return axios
    .post(`${URL}`, body, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      return response.data;
    });
};
const actualizar = async (id, body, token) => {
  return axios
    .put(`${URL}/${id}`, body, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      return response.data;
    });
};

const actualizarParcial = async (id, body, token) => {
  return axios
    .patch(`${URL}/${id}`, body, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      return response.data;
    });
};
const eliminar = async (id, token) => {
  return axios
    .delete(`${URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      return response.data;
    });
};

export const consultarTodosFacade = async (token) => {
  return await consultarTodos(token);
};
export const consultarPorIdFacade = async (id, token) => {
  return await consultarPorId(id, token);
};
export const guardarFacade = async (body, token) => {
  return await guardar(body, token);
};
export const actualizarFacade = async (id, body, token) => {
  return await actualizar(id, body, token);
};
export const actualizarParcialFacade = async (id, body, token) => {
  return await actualizarParcial(id, body, token);
};
export const eliminarFacade = async (id, token) => {
  return await eliminar(id, token);
};
