import contactSection from "../../../assets/contactSection.png";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import ContactForm from "./ContactForm";

function Contacto() {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div className="flex flex-col w-full z-10">
      <div className="bg-[#DC580C] flex h-[70px]" />
      <div className="flex w-full">
        <div className="xl:w-[60%] w-full bg-[#626260] flex flex-col xl:items-start items-center justify-center xl:pl-[8%] xl:pt-[2%] py-[5%] gap-1">
          <h2
            className="xl:text-4xl text-3xl font-bold"
            data-aos="fade"
            data-aos-duration="3000"
            data-aos-delay="200"
          >
            Contacto
          </h2>
          <p data-aos="fade" data-aos-duration="3000" data-aos-delay="400">
            Recibí el mejor asesoramiento en seguros.
          </p>
          <ContactForm />
        </div>
        <div className="w-[40%] h-[600px] xl:flex relative hidden">
          <img src={contactSection} className="w-full" />
          <div className="absolute inset-0 bg-orange-500 opacity-20"></div>
        </div>
      </div>
    </div>
  );
}

export default Contacto;
