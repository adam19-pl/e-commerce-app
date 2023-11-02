import React, { useState } from "react";
import axiosInstance from "../../axios";
import { useNavigate } from 'react-router-dom';
import { Wrapper } from "./Register.styles";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import MyInput from "../../components/fields/input";
import MySelect from "../../components/fields/select";

const Register = () => {
    const navigate = useNavigate();
    const handleLogin = () => {
        navigate('/login')
    }
    const roleOptions = [{
        id: 'Seller',
        value: 'Sprzedawca'
    },
        {
        id: 'Client',
        value:'Klient'
    }]
    const [backendError, setBackendError] = useState('');
    return (
        <Wrapper>
            <h2>Zarejestruj się</h2>
            <Formik initialValues={{ email: '', password: '', firstname: '', role: '', }}
                validationSchema={Yup.object({
                    email: Yup.string().email('Nieprawidłowy adres email.').required('Proszę, uzupełnij to pole.'),
                    password: Yup.string().min(6, 'Hasło powinno zawierać minimum 6 znaków.').max(64, 'Maksymalna długość hasła to 64 znaki.').required('Proszę, uzupełnij to pole.'),
                    firstname: Yup.string().min(2, 'Twoje imię powinno zawierać minimum 2 znaki.').matches(/^[A-Za-z ]*$/, 'Wprowadź poprawne imię.').required('Proszę, uzupełnij to pole.'),
                    role: Yup.string().required("This field is required"),
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

            <MySelect
                label="Rola"
                name="role"
                type="select"
            >
                {roleOptions && (roleOptions.map(role => {
                    console.log(role);
                    return <option key={role.id} value={role.id}>{role.value}</option>
                }))}
            </MySelect>

                    <button type="submit">Zarejestruj</button>
                </Form>

            </Formik>
            <button onClick={handleLogin} className="login-button">Zaloguj</button>
        </Wrapper >
    );
};


export default Register;