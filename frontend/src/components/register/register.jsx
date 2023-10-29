import React, { useState } from "react";
import axiosInstance from "../../axios";
import { useNavigate } from 'react-router-dom';
import { Wrapper } from "./Register.styles";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import MyInput from "../../components/fields/input";
// import MyImage from "../image/image";

const Register = () => {
    const navigate = useNavigate();
    const handleLogin = () => {
        navigate('/login')
    }

    const [backendError, setBackendError] = useState('');
    return (
        <Wrapper>
            {/* <div>
                <MyImage src={"/book.png"} alt={"Book Image"} width={180} />
            </div> */}
            <h2>Zarejestruj się</h2>
            <Formik initialValues={{ email: '', password: '', firstname: '', nickname: '', }}
                validationSchema={Yup.object({
                    email: Yup.string().email('Nieprawidłowy adres email.').required('Proszę, uzupełnij to pole.'),
                    password: Yup.string().min(6, 'Hasło powinno zawierać minimum 6 znaków.').max(64, 'Maksymalna długość hasła to 64 znaki.').required('Proszę, uzupełnij to pole.'),
                    firstname: Yup.string().min(2, 'Twoje imię powinno zawierać minimum 2 znaki.').matches(/^[A-Za-z ]*$/, 'Wprowadź poprawne imię.').required('Proszę, uzupełnij to pole.'),
                    nickname: Yup.string().min(2, 'Twój nick powinien zawierać minimum 2 znaki.').required('Proszę, uzupełnij to pole.'),
                })}
                onSubmit={(values) => {
                    axiosInstance.post('register/', values).then((res) => {
                        navigate('/login');
                    }).catch((error) => {
                        if (error.response.status === 400) {
                            if (error.response.data.Error) {
                                setBackendError(error.response.data.Error);
                            }
                        }
                    });
                }}
            >

                <Form>
                    {backendError === '' ? null : <div className="backend-error">{backendError}</div>}
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
                    <MyInput
                        label="Imię"
                        name="firstname"
                        type="text"
                        placeholder="Twoje imię"
                    />

                    <MyInput
                        label="Nick"
                        name="nickname"
                        type="text"
                        placeholder="Twój nick"
                    />

                    <button type="submit">Zarejestruj</button>
                </Form>

            </Formik>
            <button onClick={handleLogin} className="login-button">Zaloguj</button>
        </Wrapper >
    );
};


export default Register;