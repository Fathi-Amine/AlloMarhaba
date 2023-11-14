import {useEffect} from "react";
import {Link, useNavigate} from "react-router-dom"
import {Row, Col, Button, Form} from "react-bootstrap";
import FormContainer from "../components/FormContainer.jsx";
import {useDispatch, useSelector} from 'react-redux'
import {useRegisterMutation} from "../slices/usersApiSlice.js";
import {toast} from "react-toastify";
import Loader from "../components/Loader.jsx";
import {useFormik} from "formik";
import registerSchema from "../Schemas/RegisterSchema.js";

const RegisterPage = () => {
    const {userInfo} = useSelector((state)=>state.auth)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [register,{isLoading}] = useRegisterMutation()
    const { values, errors, touched, handleChange, handleSubmit } =
        useFormik({
            initialValues: {
                username:"",
                email: "",
                password: "",
                passwordConfirmation:"",
                status:""
            },
            validationSchema: registerSchema,
            onSubmit: async ({username, email, password,status}) => {
                let statusC = Number(status)
                // console.log({username, email, password,statusC})
                try {
                    console.log({username,email, password,status:statusC})
                    const res = await register({username,email, password,status:statusC}).unwrap()
                    const {msg} = res
                    navigate('/login')
                    toast.success(msg)
                }catch (error) {
                    toast.error(error?.data?.msg || error.error)
                }
            },
        });

    useEffect(()=>{
        if(userInfo){
            navigate('/')
        }
    }, [navigate, userInfo])

    return(
        <FormContainer>
            <h1>Register</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="my-2" controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="username"
                        placeholder="Enter your name"
                        value={values.username}
                        onChange={handleChange}
                        isInvalid={!!(touched.username && errors.username)}
                        aria-errormessage={
                            errors.username && touched.username ? errors.username : null
                        }
                    >
                    </Form.Control>
                    <span className={`${ errors.username && touched.username ? "text-danger" : "visually-hidden"}`}>{errors.username}</span>
                </Form.Group>
                <Form.Group className="my-2" controlId='email'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Enter your email address"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    isInvalid={!!(touched.email && errors.email)}
                    errormessage={errors.email && touched.email ? errors.email : null}
                ></Form.Control>
                    <span className={`${ errors.email && touched.email ? "text-danger" : "visually-hidden"}`}>{errors.email}</span>
                </Form.Group>
                <Form.Group className="my-2" controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={values.password}
                        name="password"
                        placeholder="Enter your password"
                        onChange={handleChange}
                        isInvalid={!!(touched.password && errors.password)}
                        errormessage={
                            errors.password && touched.password ? errors.password : null
                        }
                    >
                    </Form.Control>
                    <span className={`${ errors.password && touched.password ? "text-danger" : "visually-hidden"}`}>{errors.password}</span>
                </Form.Group>
                <Form.Group className="my-2" controlId='passwordConfirmation'>
                    <Form.Label>Password Confirmation</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter your password confirmation"
                        name="passwordConfirmation"
                        value={values.passwordConfirmation}
                        onChange={handleChange}
                        isInvalid={
                            !!(touched.passwordConfirmation && errors.passwordConfirmation)
                        }
                        errormessage={
                            errors.passwordConfirmation && touched.passwordConfirmation
                                ? errors.passwordConfirmation
                                : null
                        }
                    ></Form.Control>
                    <span className={`${ errors.passwordConfirmation && touched.passwordConfirmation ? "text-danger" : "visually-hidden"}`}>{errors.passwordConfirmation}</span>
                </Form.Group>
                <Form.Group>
                    <Form.Select
                        name="status"
                        as="select"
                        onChange={handleChange}
                        isInvalid={!!(touched.password && errors.password)}
                        errormessage={
                            errors.status && touched.status ? errors.status : null
                        }
                    >
                        <option value="">Are you ?</option>
                        <option value="1">Manager</option>
                        <option value="2">Delivery guy</option>
                        <option value="3">Client</option>
                    </Form.Select>
                    <span className={`${ errors.status && touched.status ? "text-danger" : "visually-hidden"}`}>{errors.status}</span>

                </Form.Group>
                {isLoading && <Loader />}
                <Button type="submit" variant="primary" className="mt-3">Register</Button>

                <Row className="py-3">
                    <Col>
                        Already have an account <Link to="/login">Login</Link>
                    </Col>
                </Row>
            </Form>
        </FormContainer>
    )
}

export default RegisterPage