import { Form, message } from "antd";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CreateUser } from "../../apicalls/users";
import { useDispatch } from "react-redux";
import { ShowLoader } from "../../redux/loaderSlice";

function Register() {
    
    const dispatch = useDispatch();

    const onFinsh = async (values) =>{
        try {
            dispatch(ShowLoader(true));
            const response = await CreateUser({
                ...values,
                role: "user",
            });
            dispatch(ShowLoader(false));
            if(response.success){
                message.success(response.message);
                navigate("/login");
            }
            else{
                throw new Error(response.message);
            }
        } catch (error) {
            dispatch(ShowLoader(false));
           message.error(error.message); 
        }
    }

    const navigate = useNavigate();

    useEffect(() =>{
        const user = JSON.parse(localStorage.getItem("user"));
        if(user) navigate("/");
      }, [navigate]);

  return <div className="flex justify-center item-center h-screen">
    <Form layout="vertical" className="w-400 bg-white p-2" 
    onFinish={onFinsh}
    >
        <h1 className="uppercase my-1"><strong>Register</strong></h1>
        <hr/>
        <Form.Item label="Name" name="name">
            <input type="text" />
        </Form.Item>
        <Form.Item label="Email" name="email">
            <input type="email" />
        </Form.Item>
        <Form.Item label="Password" name="password">
            <input type="password" />
        </Form.Item>
        <button className="contained-btn w-full" type="submit">Register</button>

        <Link className="underline" to='/login'>
        Already have an account? <strong>Sign In</strong>
        </Link>

    </Form>
  </div>;
}

export default Register;
