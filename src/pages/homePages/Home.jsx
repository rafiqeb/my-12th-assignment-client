import { Helmet } from "react-helmet-async";
import Banner from "../../components/Banner";
import Feedback from "./Feedback";
import PopularCamps from "./PopularCamps";


const Home = () => {
    return (
        <div>
            <Helmet><title>HealthAid Camp | Home</title></Helmet>
            <Banner></Banner>
            <PopularCamps></PopularCamps>
            <Feedback></Feedback>
        </div>
    );
};

export default Home;