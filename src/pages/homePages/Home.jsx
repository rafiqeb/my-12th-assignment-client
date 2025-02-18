import { Helmet } from "react-helmet-async";
import Banner from "../../components/Banner";
import Feedback from "./Feedback";
import PopularCamps from "./PopularCamps";
import RecentCamps from "./RecentCamps";


const Home = () => {
    return (
        <div>
            <Helmet><title>HealthAid Camp | Home</title></Helmet>
            <Banner></Banner>
            <PopularCamps></PopularCamps>
            <RecentCamps></RecentCamps>
            <Feedback></Feedback>
        </div>
    );
};

export default Home;