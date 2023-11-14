// import {useEffect} from "react";
import {useNavigate, useLocation} from "react-router-dom"
import {useDispatch} from 'react-redux'
import {Button, Form, Container, Card} from "react-bootstrap";
import {useVerifyEmailMutation} from "../slices/usersApiSlice.js";

import {toast} from "react-toastify";
import Loader from "../components/Loader.jsx";

const VerificationPage = ()=>{
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');
    console.log(token)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [verify,{isLoading}] = useVerifyEmailMutation()

    // useEffect(()=>{
    //     if(userInfo){
    //         navigate('/')
    //     }
    // }, [navigate, userInfo])
    const submitHandler = async (e)=>{
        e.preventDefault()
        try{
            const res = await verify({verificationToken:token}).unwrap()
            toast.success(res.msg)
            navigate('/login')
        }catch (error) {
            toast.error(error?.data?.msg || error.error)
        }
    }
    return(
        <div className="py-5">
            <Container className="d-flex justify-content-center">
                <Card className="p-5 d-flex flex-column align-items-center hero-card bg-light w-75">
                    <h1 className="text-center mb-4">Allo Media Auth</h1>
                    <p>Allo Media Auth Stores a JWT in an HTTP-Only cookie. It uses Redux Toolkit and the react bootstrap </p>
                    <Form onSubmit={submitHandler} className="d-flex flex-column align-items-center bg-light">
                        {isLoading && <Loader />}
                        <Button type="submit" variant="primary" className="mt-3">Verify</Button>
                    </Form>
                </Card>
            </Container>
        </div>
    )
}

export default VerificationPage