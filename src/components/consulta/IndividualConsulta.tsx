import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../../commons/BackButton";
import Button1 from "../../commons/Button1";
import Button2 from "../../commons/Button2";
import Button3 from "../../commons/Button3";
import Header from "../Header";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import {
  deletePoliza,
  editPoliza,
  getPolizaByPolizaNumber,
} from "../../services/poliza.service";
import InputText from "../../commons/InputText";
import { Confirm } from "notiflix/build/notiflix-confirm-aio";

interface PolizaProps {
  asegurado: string;
  compañia: string;
  numeroPoliza: string;
  vigenciaInicio: string;
  vigenciaFin: string;
  moneda: string;
  estado: string;
  productor: string;
  riesgo: string;
  detalle: string;
  premio: string;
  formaDePago: string;
  numero: string;
}

Confirm.init({
  className: "notiflix-confirm",
  width: "350px",
  titleColor: "#000000",
  titleFontSize: "20px",
  messageColor: "#2c3e50",
  messageFontSize: "18px",
  buttonsFontSize: "16px",
  okButtonBackground: "#3bcb77",
  okButtonColor: "#ffffff",
  cancelButtonBackground: "#ea6b5c",
  cancelButtonColor: "#ffffff",
});

function IndividualConsulta() {
  const navigate = useNavigate();
  const { polizaNumber } = useParams();
  const [polizaData, setPolizaData] = useState<PolizaProps>({
    asegurado: "",
    compañia: "",
    numeroPoliza: "",
    vigenciaInicio: "",
    vigenciaFin: "",
    moneda: "",
    estado: "",
    productor: "",
    riesgo: "",
    detalle: "",
    premio: "",
    formaDePago: "",
    numero: "",
  });

  const [originalPolizaData, setOriginalPolizaData] = useState<PolizaProps>({
    asegurado: "",
    compañia: "",
    numeroPoliza: "",
    vigenciaInicio: "",
    vigenciaFin: "",
    moneda: "",
    estado: "",
    productor: "",
    riesgo: "",
    detalle: "",
    premio: "",
    formaDePago: "",
    numero: "",
  });
  const [error, setError] = useState("");
  const [editar, setEditar] = useState(false);

  useEffect(() => {
    AOS.init();
    if (polizaNumber) {
      getPolizaByPolizaNumber(polizaNumber)
        .then((res) => {
          setPolizaData(res);
          setOriginalPolizaData(res);
        })
        .catch((error) => {
          console.error(error);
          setError(
            "Poliza no encontrada. Verifica el número de póliza e intenta nuevamente."
          );
        });
    }
  }, [polizaNumber]);

  const handleConfirmDeletePoliza = async () => {
    try {
      const res = await deletePoliza(polizaData.numeroPoliza);
      if (res) {
        navigate("/consultar");
      }
    } catch (error) {
      console.error("Error al eliminar la poliza:", error);
      throw error;
    }
  };

  if (!polizaNumber) {
    return <div>No existe la póliza solicitada.</div>;
  }

  const handleConfirmEditPoliza = async (state: string, change: boolean) => {
    try {
      const res = await editPoliza(
        polizaData.numeroPoliza,
        polizaData,
        state,
        change
      );
      setEditar(false);
      setPolizaData(res);
      setOriginalPolizaData(res);
      return res;
    } catch (error) {
      setEditar(false);
      throw error;
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setPolizaData((prevPolizaData) => ({
      ...prevPolizaData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleDeletePoliza = async () => {
    Confirm.show(
      "Está a punto de eliminar la póliza",
      "Desea confirmar?",
      "Si",
      "No",
      () => {
        handleConfirmDeletePoliza();
      }
    );
  };

  const handleEditPoliza = async (state: string) => {
    Confirm.show(
      "Esta a punto de editar la póliza",
      "Desea confirmar?",
      "Si",
      "No",
      () => {
        handleConfirmEditPoliza(state, false);
      }
    );
  };

  const handleAnularPoliza = async () => {
    Confirm.show(
      "Esta a punto de anular la póliza",
      "Desea confirmar?",
      "Si",
      "No",
      () => {
        handleConfirmEditPoliza(polizaData.estado, true);
      }
    );
  };

  const handleHabilitarPoliza = async () => {
    Confirm.show(
      "Esta a punto de habilitar la póliza",
      "Desea confirmar?",
      "Si",
      "No",
      () => {
        handleConfirmEditPoliza(polizaData.estado, true);
      }
    );
  };

  const handleConfirmCancelEdit = () => {
    setPolizaData(originalPolizaData);
    setEditar(false);
  };

  const handleCancelEdit = () => {
    Confirm.show("Cancelar edición", "Desea confirmar?", "Si", "No", () => {
      handleConfirmCancelEdit();
    });
  };

  // const handleDateChange = (name: string) => (date: string) => {
  //   setPolizaData((prevPolizaData) => ({
  //     ...prevPolizaData,
  //     [name]: date,
  //   }));
  // };

  return (
    <div className="relative flex w-full h-screen items-center z-20 ">
      <Header />
      <div className="flex w-full items-start flex-col gap-8 xl:pt-0 pt-[30%] xl:pb-0 pb-[10%]">
        <div
          className="flex flex-col relative bg-[#EAA788] bg-opacity-25 backdrop-blur-sm z-20 xl:w-[60%] md:w-[75%] w-[95%] px-6 py-8 m-auto rounded-lg gap-10"
          data-aos="fade"
          data-aos-duration="2600"
          data-aos-delay="400"
        >
          <BackButton />
          {error ? (
            <div className="text-red-500">{error}</div>
          ) : (
            <div className="flex w-[50%] items-start justify-center xl:gap-10 md:gap-6 gap-4 mx-auto">
              <div className="flex w-full  justify-center flex-col gap-8">
                <div className="flex w-full flex-col gap-6">
                  <div className="flex flex-col">
                    <label className="text-sm text-start text-[#7c8087] font-semibold ml-1 mt-[-13px]">
                      Asegurado
                    </label>
                    <InputText
                      name="asegurado"
                      value={polizaData.asegurado}
                      onChange={handleChange}
                      readonly={!editar}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm text-start text-[#7c8087] font-semibold ml-1 mt-[-13px]">
                      Compañía
                    </label>
                    <InputText
                      name="compañia"
                      value={polizaData.compañia}
                      onChange={handleChange}
                      readonly={!editar}
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="text-sm text-start text-[#7c8087] font-semibold ml-1 mt-[-13px]">
                      N de Póliza
                    </label>
                    <InputText
                      name="numeroPoliza"
                      value={polizaData.numeroPoliza}
                      onChange={handleChange}
                      readonly={!editar}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm text-start text-[#7c8087] font-semibold ml-1 mt-[-13px]">
                      Vigencia Inicio
                    </label>
                    <InputText
                      name="vigenciaInicio"
                      value={polizaData.vigenciaInicio.substring(0, 10)}
                      onChange={handleChange}
                      readonly={!editar}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm text-start text-[#7c8087] font-semibold ml-1 mt-[-13px]">
                      Moneda
                    </label>
                    <InputText
                      name="moneda"
                      value={polizaData.moneda}
                      onChange={handleChange}
                      readonly={!editar}
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="text-sm text-start text-[#7c8087] font-semibold ml-1 mt-[-13px]">
                      Estado
                    </label>
                    <input
                      className={`${
                        {
                          VENCIDA: "bg-[rgba(255,166,166,0.8)]",
                          VIGENTE: "bg-[rgba(166,227,149,1)]",
                          ANULADA: "bg-[rgba(176,176,176,0.8)]",
                        }[polizaData.estado] || ""
                      } text-black rounded-xl h-[2.8rem] pl-3 border border-orange1 outline-none`}
                      name="estado"
                      value={polizaData.estado.toUpperCase()}
                      onChange={handleChange}
                      readOnly={true}
                    />
                  </div>
                  {polizaData.formaDePago == "CBU" ? (
                    <div className="flex flex-col">
                      <label className="text-sm text-start text-[#7c8087] font-semibold ml-1 mt-[-13px]">
                        CBU
                      </label>
                      <InputText
                        value={polizaData.numero}
                        onChange={handleChange}
                        readonly={!editar}
                      />
                    </div>
                  ) : polizaData.formaDePago == "Tarjeta" ? (
                    <div className="flex flex-col">
                      <label className="text-sm text-start text-[#7c8087] font-semibold ml-1 mt-[-13px]">
                        N de Tarjeta
                      </label>
                      <InputText
                        name="numero"
                        value={polizaData.numero}
                        onChange={handleChange}
                        readonly={!editar}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="flex w-full flex-col justify-center gap-6">
                <div className="flex flex-col">
                  <label className="text-sm text-start text-[#7c8087] font-semibold ml-1 mt-[-13px]">
                    Productor
                  </label>
                  <InputText
                    name="productor"
                    value={polizaData.productor}
                    onChange={handleChange}
                    readonly={!editar}
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-sm text-start text-[#7c8087] font-semibold ml-1 mt-[-13px]">
                    Riesgo
                  </label>
                  <InputText
                    name="riesgo"
                    value={polizaData.riesgo}
                    onChange={handleChange}
                    readonly={!editar}
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-sm text-start text-[#7c8087] font-semibold ml-1 mt-[-13px]">
                    Detalle/Patente
                  </label>
                  <InputText
                    name="detalle"
                    value={polizaData.detalle}
                    onChange={handleChange}
                    readonly={!editar}
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-sm text-start text-[#7c8087] font-semibold ml-1 mt-[-13px]">
                    Vigencia Fin
                  </label>
                  <InputText
                    name="vigenciaFin"
                    value={polizaData.vigenciaFin.substring(0, 10)}
                    onChange={handleChange}
                    readonly={!editar}
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-sm text-start text-[#7c8087] font-semibold ml-1 mt-[-13px]">
                    Premio
                  </label>
                  <InputText
                    name="premio"
                    value={polizaData.premio}
                    onChange={handleChange}
                    readonly={!editar}
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-sm text-start text-[#7c8087] font-semibold ml-1 mt-[-13px]">
                    Forma de pago
                  </label>
                  <InputText
                    name="formaDePago"
                    value={polizaData.formaDePago}
                    onChange={handleChange}
                    readonly={!editar}
                  />
                </div>
              </div>
            </div>
          )}

          {editar ? (
            <div className="flex items-center justify-center gap-6">
              <Button3
                bg="#3bcb77"
                text="Guardar"
                onClick={() => handleEditPoliza(polizaData.estado)}
              />
              <Button2 text="Cancelar" onClick={() => handleCancelEdit()} />
            </div>
          ) : (
            <div className="flex items-center justify-center gap-6">
              <Button1 text="Editar" onClick={() => setEditar(true)} />
              <Button2 text="Eliminar" onClick={handleDeletePoliza} />
              <Button3
                bg={`${
                  polizaData.estado === "ANULADA"
                    ? "#3bcb77"
                    : "rgba(176,176,176,0.8)"
                }`}
                text={`${
                  polizaData.estado === "ANULADA" ? "Habilitar" : "Anular"
                }`}
                onClick={() => {
                  if (polizaData.estado === "ANULADA") {
                    handleHabilitarPoliza();
                  } else {
                    handleAnularPoliza();
                  }
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default IndividualConsulta;
