import {useState,useEffect} from "react";
import {Link, useNavigate, useParams} from "react-router-dom"
import {Button, Col, Form, Row} from "react-bootstrap";
import FormContainer from "../components/FormContainer.jsx";
import {useDispatch,useSelector} from 'react-redux'
import {useResetPasswordMutation} from "../slices/usersApiSlice.js";
import {toast} from "react-toastify";
import Loader from "../components/Loader.jsx";

const ResetPasswordPage = () => {
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const {userInfo} = useSelector((state)=>state.auth)
    const navigate = useNavigate()

    const dispatch = useDispatch()
    const {token, email} = useParams()
    console.log()

    const [reset,{isLoading}] = useResetPasswordMutation()

    useEffect(()=>{
        if(userInfo){
            navigate('/')
        }
    }, [navigate, userInfo])
    const submitHandler = async (e)=>{
        e.preventDefault()
        if (password !== passwordConfirmation){
            toast.error('Passwords do not match');
        }else{
            try {
                const resetData = {
                    email:email.replace('_dot_', '.'),
                    token,
                    password
                };
                const res = await reset(resetData).unwrap()
                const {msg} = res
                navigate('/login')
                toast.success(msg)
            }catch (error) {
                toast.error(error?.data?.msg || error.error)
            }
        }
        console.log("Submit Login")
    }
    return (
        <FormContainer>
            <h1>Reset Password</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group className="my-2" controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group className="my-2" controlId='passwordConfirmation'>
                    <Form.Label>Password Confirmation</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter your password confirmation"
                        value={passwordConfirmation}
                        onChange={(e)=>setPasswordConfirmation(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                {isLoading && <Loader />}
                <Button type="submit" variant="primary" className="mt-3">Reset</Button>
            </Form>
        </FormContainer>
    );
};

export default ResetPasswordPage;