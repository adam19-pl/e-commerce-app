import React, { useState, useEffect } from "react";
import { Wrapper } from "./home.styles";
import { Link } from "react-router-dom";
import axiosInstance from "../../axios";
import { Formik, Form } from 'formik';
import { Table } from 'reactstrap';
import MySelect from '../fields/select';
import Moment from 'moment';
import * as Yup from 'yup';
import MyInput from "../../components/fields/input";
import DatePicker from "../../components/fields/datePicker";

const Home = () => {
    const [mounted, setMounted] = useState(false);
    const [productsList, setProductsList] = useState('');
    const [userRole, setUserRole] = useState('');
    const [orderList, setOrderList] = useState([]);
    const [dataPagination, setDataPagination] = useState('');
    const [categoriesList, setCategoriesList] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [selected, setSelected] = useState('');
    const handleNext = () => {
        axiosInstance.get(`${dataPagination.next}`).then((res) => {
            setIsAuthenticated(true);
            setUserRole(res.data.role ? res.data.role : '' );
            setProductsList(res.data.results);
            setDataPagination(res.data.links);
        }).catch((error) => {
            if (error.response?.status === 401) {
                console.log(error.response);
            }
            console.log(error.response);
        });
    }

    const handleFilter = (values) => {
        let parameters_selected =''
        let parameter_value = ''
        if (values['name']){
            parameters_selected = 'name';
        }
        if(values['category']){
            parameters_selected='category';
        }
        if(values['description']){
            parameters_selected='description';
        }
        if(values['add_date']){
            parameters_selected='add_date';
        }
        parameter_value = values[parameters_selected]
            axiosInstance.get(`products/?filter=${parameters_selected}&value=${parameter_value}`).then((res) => {
                setIsAuthenticated(true);
                setProductsList(res.data.results);
                setUserRole(res.data.role ? res.data.role : '' );
                setDataPagination(res.data.links);
            }).catch((error) => {
                if (error.response?.status === 401) {
                    console.log(error.response);
                }
                console.log(error.response);
            });
    }

    const handleOrder = (product) => {
        if (!orderList.includes(product)){
            setOrderList([
                ...orderList,
                product
            ])
        }
    }

    const renderSelectedComponent = (selectedOption) => {
        return <Wrapper>
            <Formik initialValues={{ name: '', add_date: '', category:'', description:'' }}
                validationSchema={Yup.object({
                    name: Yup.string(),
                    add_date: Yup.string(),
                    category: Yup.string(),
                    description: Yup.string(),
                })}
                onSubmit={(values) => {
                    handleFilter(values);
                }} >
                <Form>
                    {selected === 'name' && (
                    <MyInput
                        label="nazwa"
                        name="name"
                        type="text"
                        placeholder="Wprowadź nazwę"
                    />)}

                    {selected ==='add_date' &&(<DatePicker
                        label="Data"
                        name="add_date"
                        type="date"
                    />)}
                    {selected ==='category' && (
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
                    )}
                    {selected ==='description' && (
                        <MyInput
                            label="Opis"
                            name="description"
                            type="text"
                            placeholder="opis"
                        /> 
                    )}
                    <button type="submit">filtruj</button>
                </Form>
            </Formik>
        </Wrapper>
    }

    const options = [
        { value: "add_date", text: "Po dacie" },
        { value: "name", text: "Po nazwie" },
        { value: "category", text: "Po kategorii" },
        { value: "description", text: "Po opisie" },
    ]

    const handleBack = () => {
        axiosInstance.get(`${dataPagination.previous}`).then((res) => {
            setIsAuthenticated(true);
            setUserRole(res.data.role ? res.data.role : '' );
            setProductsList(res.data.results);
            setDataPagination(res.data.links);

        }).catch((error) => {
            if (error.response?.status === 401) {
                console.log(error.response);
            }
            console.log(error.response);
        });
    }

    if (!mounted) {
            axiosInstance.get('products/').then((res) => {
                setIsAuthenticated(true);
                setUserRole(res.data.role ? res.data.role : '' );
                setProductsList(res.data.results);
                setDataPagination(res.data.links);

            }).catch((error) => {
                if (error.response?.status === 401) {
                    console.log(error.response);
                }
                console.log(error.response);
            });
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
    return (
        <Wrapper>
            <div>
                <h2>Produkty</h2>
            </div>
            {orderList.length !== 0 && (
                <div>
                    <Link to="/order" state={{ from: orderList }}>Złóż zamówienie</Link>
                </div>
            )}
            {userRole === 'Seller' && (
                <Link to="/add" productsList={productsList}>Dodaj</Link>
            )}
            {productsList && (
                <Table responsive>
                    <thead>
                        <tr>
                            <th>
                                Zdjęcie
                            </th>
                            <th>
                                Nazwa
                            </th>
                            <th>
                                Kategoria
                            </th>
                            <th>
                                Cena
                            </th>
                            <th>Akcje</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productsList.map(product =>

                            <tr key={product.id}>
                                <td><img src={product.image_thumbnail} /></td>
                                <td>{product.name}</td>
                                {/* <td>{product.description}</td> */}
                                {/* <td>{Moment(product.add_date).format('DD-MM-YYYY')}</td> */}
                                <td>{product.category_details.name}</td>
                                {/* <td>{product.quantity}</td> */}
                                <td>{product.price}</td>
                                <td>
                                    <Link to="/details" state={{ from: product }}>Szczegóły</Link>
                                    {product.is_owner ? <><Link to="/edit" state={{ from: product }}>Edytuj</Link>
                                        <Link to="/delete" state={{ from: product }}>Usuń</Link>
                                    </> : userRole ? <button to="/add" onClick={ ()=>handleOrder(product)}>dodaj do zamowienia</button> : <></>}
                                </td>
                            </tr>)}
                    </tbody>
                    <div>
                            <select value={selected} onChange={e => {
                                setSelected(e.target.value);
                            }}>
                                {options.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.text}
                                    </option>
                                ))}
                            </select>
                            { selected ? 
                                renderSelectedComponent(selected) : <></>}     
                    </div>
                    <div>
                        {dataPagination.previous && (
                            <button onClick={handleBack} className="login-button">Następna strona</button>
                        )}
                        {dataPagination.next && (
                            <button onClick={handleNext} className="login-button">Poprzednia</button>)}
                    </div>
                </Table>)
            }
        </Wrapper>
    )
}

export default Home;