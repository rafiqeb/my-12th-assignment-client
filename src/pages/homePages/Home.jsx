import Banner from "../../components/Banner";
import Feedback from "./Feedback";
import PopularCamps from "./PopularCamps";


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <PopularCamps></PopularCamps>
            <Feedback></Feedback>
        </div>
    );
};

export default Home;