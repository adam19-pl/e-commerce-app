import React, { useState, useEffect } from "react";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import axiosInstance from "../../../axios";
import { useNavigate } from "react-router-dom";
import MyInput from '../../fields/input';
import MySelect from '../../fields/select';
import TextArea from '../../fields/textarea';

const CreateForm = () => {
    const [mounted, setMounted] = useState(false);
    const [categoriesList, setCategoriesList] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [imageFile, setImageFile] = useState('')
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
    const SUPPORTED_FORMATS = ['image/jpg', 'image/png', 'image/jpeg', 'image/gif'];
    const handleImageChange = (e) => {
        setImageFile(e.target.files[0])
      };
    return (<Formik initialValues={{ name: '', description: '', price: '', category: '', image: File }}
        validationSchema={Yup.object({
            name: Yup.string().min(6, 'The title must be longer than 6 characters').required('This field is required'),
            description: Yup.string().min(6, 'The description field must be longer than 6 characters').required('This field is requred'),
            price: Yup.number().min(1, 'Min value is 1').required('This field is required'),
            category: Yup.string().required("This field is required"),
            quantity: Yup.number().min(1, 'Min value is 1').required('This field is required'),
            image: Yup.mixed().nullable()
        })}
        onSubmit={(values) => {
            let form_data = new FormData();
            form_data.append('image', imageFile);
            form_data.append('name', values.name);
            form_data.append('description', values.description);
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

        }}
    >
        <Form>
            <MyInput
                label="Nazwa"
                name="name"
                type="text"
                placeholder="Nazwa"
            />

            <TextArea
                label="Opis"
                name="description"
                type="textarea"
                placeholder="opis"
            />
            <MyInput
                label="Cena"
                name="price"
                type="number"
                placeholder="cena"
            />
            <MyInput
                label="Ilość"
                name="quantity"
                type="number"
                placeholder="ilość"
            />
            <>
            <label htmlFor='file'>Zdjęcie</label>
            <input type="file"
                   id="image"
                   accept="image/png, image/jpeg"  onChange={handleImageChange}/>
            </>
            <MySelect
                label="Kategoria"
                name="category"
                type="select"
                default={categoriesList ? categoriesList[0].id : false}>
                {categoriesList && (categoriesList.map(category => {
                    console.log(category);
                    return <option key={category._id} value={category._id}>{category.name}</option>
                }))}
            </MySelect>

            <button className="create-project-button" type="submit">Dodaj</button>
        </Form>

    </Formik>
    )
}

export default CreateForm;