import Hero from "../components/Hero";
import ServicesSection from "../components/ServicesSection";
import CTASection from '../components/CTASection';
import About from "./About";
import Plans from "./Plans";
import ServicesPage from "./ServicesPage";


const Home = () => {
  return (
    <>
      <Hero />
      <ServicesSection />
      <CTASection />
      <About/>
      <Plans/>
      <ServicesPage/>
    </>
  );
};

export default Home;
