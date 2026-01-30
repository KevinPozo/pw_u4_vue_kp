//No retornan un objeto como tal pero si retorna un grupo de codigos de estados
import axios from "axios";
const consultarTodos = async () => {
  return axios
    .get("http://localhost:8081/matricula/api/v1.0/estudiantes")
    .then((response) => {
      return response.data;
    });
};
const consultarPorId = (id) => {
  return axios
    .get(`http://localhost:8081/matricula/api/v1.0/estudiantes/${id}`)
    .then((response) => {
      return response.data;
    });
};
const guardar = async (body) => {
  return axios
    .post("http://localhost:8081/matricula/api/v1.0/estudiantes", body)
    .then((response) => {
      return response.data;
    });
};
const actualizar = async (id, body) => {
  return axios
    .put(`http://localhost:8081/matricula/api/v1.0/estudiantes/${id}`, body)
    .then((response) => {
      return response.data;
    });
};
const actualizarParcial = async (id, body) => {
  return axios
    .patch(`http://localhost:8081/matricula/api/v1.0/estudiantes/${id}`, body)
    .then((response) => {
      return response.data;
    });
};
const eliminar = async (id) => {
  return axios
    .delete(`http://localhost:8081/matricula/api/v1.0/estudiantes/${id}`)
    .then((response) => {
      return response.data;
    });
};

export const consultarTodosFacade = async () => {
  return await consultarTodos();
};
export const consultarPorIdFacade = async (id) => {
  return await consultarPorId(id);
};
export const guardarFacade = async (body) => {
  return await guardar(body);
};
export const actualizarFacade = async (id, body) => {
  return await actualizar(id, body);
};
export const actualizarParcialFacade = async (id, body) => {
  return await actualizarParcial(id, body);
};
export const eliminarFacade = async (id) => {
  return await eliminar(id);
};
