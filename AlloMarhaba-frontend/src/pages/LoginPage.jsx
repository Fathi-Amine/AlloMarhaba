import {useState,useEffect} from "react";
import {Link, useNavigate} from "react-router-dom"
import {useDispatch, useSelector} from 'react-redux'
import {Row, Col, Button, Form} from "react-bootstrap";
import FormContainer from "../components/FormContainer.jsx";
import {useLoginMutation} from "../slices/usersApiSlice.js";
import {setCredentials} from "../slices/authSlice.js";
import {toast} from "react-toastify";
import Loader from "../components/Loader.jsx";

const LoginPage = ()=>{
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [login,{isLoading}] = useLoginMutation()
    const {userInfo} = useSelector((state)=>state.auth)

    useEffect(()=>{
        if(userInfo){
            navigate('/')
        }
    }, [navigate, userInfo])
    const submitHandler = async (e)=>{
        e.preventDefault()
        try{
            const res = await login({email, password}).unwrap()
            dispatch(setCredentials({...res}))
            navigate('/')
        }catch (error) {
            toast.error(error?.data?.msg || error.error)
        }
    }
    return(
        <FormContainer>
            <h1>Login</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group className="my-2" controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group className="my-2" controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                {isLoading && <Loader />}
                <Button type="submit" variant="primary" className="mt-3">Login</Button>

                <Row className="py-3">
                    <Col>
                        New Customer ? <Link to="/register">Register</Link>
                    </Col>
                </Row>
                <Row className="py-3">
                    <Col>
                       Dont remember your password <Link to="/forgot"> Forgot</Link>
                    </Col>
                </Row>
            </Form>
        </FormContainer>
    )
}

export default LoginPage