import React, { useState } from "react";
import axiosInstance from "../../axios";
import { useNavigate } from 'react-router-dom';
import { Wrapper } from "./Login.styles";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import MyInput from "../../components/fields/input";
// import MyImage from "../image/image";

const Login = () => {
    const navigate = useNavigate();
    const handleRegister = () => {
        navigate('/register')
    }
    const [loginError, setLoginError] = useState('');

    return (
        <Wrapper>
            <div>
                {/* <MyImage src={"/book.png"} alt={"Book Image"} width={180} /> */}
            </div>
            <h2>Zaloguj się</h2>
            <Formik initialValues={{ email: '', password: '' }}
                validationSchema={Yup.object({
                    email: Yup.string().email('Nieprawidłowy adres email.').required('Proszę, uzupełnij to pole.'),
                    password: Yup.string().min(6, 'Hasło powinno zawierać minimum 6 znaków.').max(64, 'The maximum length of password is 64 characters').required('Proszę, uzupełnij to pole.'),
                })}
                onSubmit={(values) => {
                    axiosInstance.post('api/token/', values).then((res) => {
                        localStorage.setItem('access_token', res.data.access);
                        localStorage.setItem('refresh_token', res.data.refresh);
                        localStorage.setItem('authenticated_email', values.email);
                        axiosInstance.defaults.headers['Authorization'] = 'JWT ' + localStorage.getItem('access_token');
                        navigate('/');
                    }).catch((error) => {
                        if (error.response?.status === 401) {
                            setLoginError("Email lub hasło są nieprawidłowe, spróbuj ponownie.");
                        }
                    });

                }} >
                <Form>
                    <MyInput
                        label="Email"
                        name="email"
                        type="email"
                        placeholder="Wprowadź email"
                    />

                    <MyInput
                        label="Hasło"
                        name="password"
                        type="password"
                        placeholder="Wprowadź hasło"
                        autoComplete="of"
                    />
                    {loginError === '' ? null : <div className="login-error">{loginError}</div>}
                    <button type="submit">Zaloguj</button>
                </Form>

            </Formik>
            <button className="register-button" onClick={handleRegister}>Zarejestruj</button >
        </Wrapper>
    )
}

export default Login;