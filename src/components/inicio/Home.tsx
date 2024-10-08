import Title from "../../commons/Title";
import imgCargar from "../../assets/imagenCargar.png";
import imgConsultar from "../../assets/imagenConsultar.png";
import Card from "./Card";
import RespnosiveCards from "./RespnosiveCards";
import Header from "../Header";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
function Home() {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div className="relative flex w-full h-screen items-center z-20">
      <Header />
      <div className="flex items-center justify-center flex-col gap-16 mx-auto xl:mt-[5%]">
        <div
          className="flex text-center"
          data-aos="fade"
          data-aos-duration="2000"
          data-aos-delay="400"
        >
          <Title text="¿Qué operación desea realizar?" />
        </div>
        <div
          className="xl:flex md:flex xl:w-full md:w-[70%] hidden gap-10 justify-center items-center"
          data-aos="fade"
          data-aos-duration="2000"
          data-aos-delay="600"
        >
          <div className="xl:w-[22%]  hover:scale-[1.02] transition-transform duration-500">
            <Card img={imgCargar} buttonText="Cargar" buttonHref="/virtualNet/cargar" />
          </div>
          <div className="xl:w-[22%] hover:scale-[1.02] transition-transform duration-500">
            <Card
              img={imgConsultar}
              buttonText="Consultar"
              buttonHref="/virtualNet/consultar"
            />
          </div>
        </div>
        <div className="xl:hidden md:hidden flex justify-center items-center">
          <RespnosiveCards />
        </div>
      </div>
    </div>
  );
}

export default Home;
