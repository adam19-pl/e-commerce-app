import React, { useState, useEffect } from "react";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import axiosInstance from "../../../axios";
import { useNavigate } from "react-router-dom";
import MyInput from '../../fields/input';
import TextArea from '../../fields/textarea';

const OrderForm = ({orderList}) => {
    const [mounted, setMounted] = useState(false);
    const [categoriesList, setCategoriesList] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [imageFile, setImageFile] = useState('')
    const handlePrice = () =>{
        console.log('elo');
    }
    const navigate = useNavigate();
    if (!mounted) {
        axiosInstance.get('categories/').then((res) => {
            setIsAuthenticated(true);
            setCategoriesList(res.data);

        }).catch((error) => {
            if (error.response?.status === 401) {
                console.log(error.response);
            }
            console.log(error.response);
        });
    }

    useEffect(() => {
        setMounted(true)
    }, [])
    return (<Formik initialValues={{ name: '', delivery_address: '', price: '', category: ''}}
        validationSchema={Yup.object({
            name: Yup.string().min(6, 'The title must be longer than 6 characters').required('This field is required'),
            delivery_address: Yup.string().min(2, 'Adres dostawy powinien być dłuższy niz 2 znaki').required('This field is requred'),
            price: Yup.number().min(1, 'Min value is 1').required('This field is required'),
            category: Yup.string().required("This field is required"),
            quantity: Yup.number(),
        })}

        onSubmit={(values) => {
            let form_data = new FormData();
            form_data.append('name', values.name);
            form_data.append('delivery_address', values.description);
            form_data.append('price', values.price);
            form_data.append('category', values.category);
            form_data.append('quantity', values.quantity);

            axiosInstance.post('products/', form_data).then((res) => {
                // localStorage.setItem('access_token', res.data.access);
                // localStorage.setItem('refresh_token', res.data.refresh);
                // localStorage.setItem('authenticated_email', values.email);
                // axiosInstance.defaults.headers['Authorization'] = 'JWT ' + localStorage.getItem('access_token');
                navigate('/');
            }).catch((error) => {
                console.log(error.response);
            })

        }
    }
    >
        <Form>
            <MyInput
                label="Imie i nazwisko"
                name="name_and_address"
                type="text"
                placeholder="Imię i nazwisko"
            />

            <TextArea
                label="Adres dostawy"
                name="delivery_adress"
                type="textarea"
                placeholder="adres_dostawy"
            />
            <h3>Lista produktów</h3>
            {orderList.map(product => 
                <div key={product.id}>
                    <div>produkt: {product.name}</div>
                    <div>dostępna ilość: {product.quantity}</div>
                    <MyInput
                        label="Ilość sztuk"
                        name="quantity"
                        type="number"
                        placeholder="ilość"
                        max={product.quantity}
                    />
                    <div>Cena: {product.price}</div>
                </div>
            )}

            <button className="create-project-button" type="submit">Dodaj</button>
        </Form>

    </Formik>
    )
}

export default OrderForm;