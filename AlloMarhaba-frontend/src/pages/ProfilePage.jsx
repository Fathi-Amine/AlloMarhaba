import {useState,useEffect} from "react";
import {Link, useNavigate} from "react-router-dom"
import {Button, Form} from "react-bootstrap";
import FormContainer from "../components/FormContainer.jsx";
import {useDispatch, useSelector} from 'react-redux'
import {useRegisterMutation, useUpdateUserMutation} from "../slices/usersApiSlice.js";
import {toast} from "react-toastify";
import Loader from "../components/Loader.jsx";
import {setCredentials} from "../slices/authSlice.js";
const ProfilePage = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const {userInfo} = useSelector((state)=>state.auth)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [updateUser,{isLoading}] = useUpdateUserMutation()
  useEffect(()=>{
    setUsername(userInfo.user.name)
    setEmail(userInfo.user.email)
  }, [userInfo.name, userInfo.email])
  const submitHandler = async (e)=>{
    e.preventDefault()
    try {
      const res = await updateUser({name:username,email}).unwrap()
      dispatch(setCredentials({...res}))
      toast.success("Profile Updated")
    }catch (error){
      toast.error(error?.data?.msg || error.error)
    }
    console.log("Submit Login")
  }
  return(
      <FormContainer>
        <h1>Update User</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className="my-2" controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
                type="text"
                placeholder="Enter your name"
                value={username}
                onChange={(e)=>setUsername(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="my-2" controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
         {/* {isLoading && <Loader />}*/}
          <Button type="submit" variant="primary" className="mt-3">Update</Button>
        </Form>
      </FormContainer>
  )
}

export default ProfilePage