import Hero from '../components/Hero.jsx'
import {useSelector} from "react-redux";

const Home = () => {
  const {userInfo} = useSelector((state)=>state.auth)

    return (
        <div>
            {userInfo ? (
                <div>
                    <div className="user-info">
                        <h2>Welcome, {userInfo.user.name}!</h2>
                        <p>Email: {userInfo.user.email}</p>
                        <p>Role: {userInfo.user.role}</p>
                    </div>
                </div>
            ) : (
                <Hero />
            )}
        </div>
    );
}

export default Home