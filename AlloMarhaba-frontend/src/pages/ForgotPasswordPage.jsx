import {useState,useEffect} from "react";
import { useNavigate} from "react-router-dom"
import { Button, Form} from "react-bootstrap";
import FormContainer from "../components/FormContainer.jsx";
import {useDispatch,useSelector} from 'react-redux'
import {useForgotPasswordMutation} from "../slices/usersApiSlice.js";
import {toast} from "react-toastify";
import Loader from "../components/Loader.jsx";
const RegisterPage = () => {
    const [email, setEmail] = useState('')
    const {userInfo} = useSelector((state)=>state.auth)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [forgotPassword,{isLoading}] = useForgotPasswordMutation()

    useEffect(()=>{
        if(userInfo){
            navigate('/')
        }
    }, [navigate, userInfo])
    const submitHandler = async (e)=>{
        e.preventDefault()
        try {
            const res = await forgotPassword({email}).unwrap()
            const {message} = res
            navigate('/login')
            toast.success(message)
        }catch (error) {
            toast.error(error?.data?.msg || error.error)
        }
    }
    return(
        <FormContainer>
            <h1>Register</h1>
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
                {isLoading && <Loader />}
                <Button type="submit" variant="primary" className="mt-3">Send</Button>
            </Form>
        </FormContainer>
    )
}

export default RegisterPage