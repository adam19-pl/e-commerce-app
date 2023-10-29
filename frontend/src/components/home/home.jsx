import React, { useState, useEffect } from "react";
import { Wrapper } from "./home.styles";
import { Link } from "react-router-dom";
import axiosInstance from "../../axios";
import { Table } from 'reactstrap';
import Moment from 'moment';

const Home = () => {
    const [mounted, setMounted] = useState(false);
    const [productsList, setProductsList] = useState('');
    const [dataPagination, setDataPagination] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [selected, setSelected] = useState('');
    const handleNext = () => {
        axiosInstance.get('products/?p=2').then((res) => {
            setIsAuthenticated(true);
            setProductsList(res.data.results);
            setDataPagination(res.data.links);

        }).catch((error) => {
            if (error.response?.status === 401) {
                console.log(error.response);
            }
            console.log(error.response);
        });
    }

    const handleFilter = () => {
        if(selected){
            axiosInstance.get('products/?sort='+selected).then((res) => {
                setIsAuthenticated(true);
                setProductsList(res.data.results);
                setDataPagination(res.data.links);

            }).catch((error) => {
                if (error.response?.status === 401) {
                    console.log(error.response);
                }
                console.log(error.response);
            });
        }
    }
    const options = [
        { value: "add_date", text: "Po dacie" },
        { value: "name", text: "Po nazwie" },
        { value: "category", text: "Po kategorii" },
        { value: "price", text: "Po cenie" },
    ]
    const handleBack = () => {
        axiosInstance.get('products/?p=1').then((res) => {
            setIsAuthenticated(true);
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
            setProductsList(res.data.results);
            setDataPagination(res.data.links);

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
            {productsList.length === 0 ? <h3>Aktualnie nie posiadamy żadnej ksiązki w naszej bibliotece</h3> :
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
                                Opis
                            </th>
                            <th>
                                Data dodania
                            </th>
                            <th>
                                Kategoria
                            </th>
                            <th>
                                Ilość
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
                                <td><img src={`http://localhost:8000${product.image_thumbnail}`}/></td>
                                <td>{product.name}</td>
                                <td>{product.description}</td>
                                <td>{Moment(product.add_date).format('DD-MM-YYYY')}</td>
                                <td>{product.category_details.name}</td>
                                <td>{product.quantity}</td>
                                <td>{product.price}</td>
                                {product.is_owner ? <td>Modyfikuj</td> : productsList.role ? <td>Kup</td> : <td></td>}
                                <td>
                                    <Link to="/detail" state={{ from: product }}>Szczegóły</Link>
                                    
                                {product.is_owner ? <><Link to="/edit" state={{ from: product }}>Edytuj</Link>
                                    <Link to="/add" state={{ from: product }}>Dodaj</Link>
                                    <Link to="/delete" state={{ from: product }}>Usuń</Link>
                                    </> : <></>}
                                </td>
                            </tr>)}
                    </tbody>
                    <div>
                    <form>
                        <button onClick={handleFilter} className="login-button">Filtruj</button>
                        <select value={selected} onChange={e => {
                            setSelected(e.target.value);
                        }}>
                            {options.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.text}
                                </option>
                            ))}
                        </select>
                    </form>
                    </div>
                    <div>
                        {dataPagination.previous && (
                            <button onClick={handleBack} className="login-button">Wstecz</button>
                            )}
                        {dataPagination.next && (
                        <button onClick={handleNext} className="login-button">Dalej</button>)}
                    </div>
                </Table>
            }
        </Wrapper>
    )
}

export default Home;