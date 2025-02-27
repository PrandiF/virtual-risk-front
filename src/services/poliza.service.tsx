import axios from "axios";

const USER_URL = `${import.meta.env.VITE_API_URL_PROD}/poliza`;


type PolizaProps = {
  asegurado: string;
  productor: string;
  compañia: string;
  riesgo: string;
  numeroPoliza: string;
  detalle: string;
  estado: string;
  vigenciaInicio: Date | string;
  vigenciaFin: Date | string;
  moneda: string;
  premio: number;
  formaDePago: string;
  numero?: string;
};

type FilterProps = {
  asegurado: string;
  compañia: string;
  detalle: string;
  estado: string;
  riesgo: string;
  vigenciaInicio: Date | null;
  vigenciaFin: Date | null;
};

export const getPolizas = async (page: number = 1) => {
  try {
    const res = await axios.get(`${USER_URL}?page=${page}`, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.error("Error al obtener las polizas:", error);
    throw error;
  }
};

export const getPoliza = async () => {
  try {
    const res = await axios.get(`${USER_URL}`, { withCredentials: true });
    return res.data;
  } catch (error) {
    console.error("Error al obtener la poliza:", error);
    throw error;
  }
};

export const getFilterPoliza = async (
  filter: FilterProps,
  page: number = 1
) => {
  let filterClean: FilterProps = {
    asegurado: filter.asegurado,
    compañia: filter.compañia,
    detalle: filter.detalle,
    estado: filter.estado,
    riesgo: filter.riesgo,
    vigenciaInicio: filter.vigenciaInicio,
    vigenciaFin: filter.vigenciaFin,
  };

  if (
    filter.vigenciaInicio &&
    new Date(filter.vigenciaInicio).toLocaleDateString() === "31/12/1899"
  ) {
    filterClean.vigenciaInicio = null;
  }
  if (
    filter.vigenciaFin &&
    new Date(filter.vigenciaFin).toLocaleDateString() === "31/12/1899"
  ) {
    filterClean.vigenciaFin = null;
  }
  const params = new URLSearchParams();
  Object.keys(filterClean).forEach((key) => {
    const value = filterClean[key as keyof FilterProps];
    if (value !== "" && value !== null && value !== undefined) {
      params.append(key, String(value)); // Convierte los valores a string
    }
  });
  params.append('page', String(page));
  try {
    const res = await axios.get(`${USER_URL}/filter?${params.toString()}`, {
      withCredentials: true,
    });
    return res.data;

  } catch (error) {
    console.error("Error al filtrar la/las poliza/s:", error);
    throw error;
  }
};

export const createPoliza = async (polizaData: PolizaProps) => {
  try {
    const res = await axios.post(
      `${USER_URL}`,
      { ...polizaData },
      { withCredentials: true }
    );
    return res.data;
  } catch (error) {
    console.error("Error al crear la poliza:", error);
    throw error;
  }
};

export const getPolizaByPolizaNumber = async (polizaNumber: string) => {
  try {
    const res = await axios.get(`${USER_URL}/${polizaNumber}`, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.error("Error al obtener la poliza:", error);
    throw error;
  }
};

export const deletePoliza = async (polizaNumber: string) => {
  try {
    const res = await axios.delete(`${USER_URL}/${polizaNumber}`, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.log("Error al eliminar la poliza:", error);
    throw error;
  }
};

export const editPoliza = async (
  polizaNumber: string,
  data: PolizaProps,
  state: string,
  change: boolean
) => {
  const dataClean =
    state == "ANULADA" && change
      ? { ...data, estado: "" }
      : change
      ? { ...data, estado: "ANULADA" }
      : { ...data };
  try {
    const res = await axios.put(
      `${USER_URL}/${polizaNumber}`,
      { ...dataClean },
      { withCredentials: true }
    );
    return res.data;
  } catch (error) {
    console.log("Error al editar la poliza:", error);
    throw error;
  }
};
