import Card from 'antd/es/card/Card';
import React, { useEffect, useState, useContext } from 'react';
// import Capacidad from './capacidad/Capacidad';
import Capacidad from '../capacidad/Capacidad'
import Evolucion from '../evolucion/Evolucion';
import './analitica.css';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Select } from 'antd';
import { GlobalContext } from '../../context/GlobalContext';
import { useHistory } from "react-router-dom";
// import { useNavigate } from 'react-router-dom';




const Analitica = () => {
    var objData = []
    // const [isModalOpen, setIsModalOpen] = useState(false);
    // const [isData, setIsData] = useState({});
    // const [isDataEdit, setIsDataEdit] = useState({});
    // const [isDataSet, setIsDataSet] = useState({});
    const [isVista, setIsVista] = useState(false);
    const [isVistaEditar, setIsVistaEditar] = useState(false);
    // const [isPrueba, setIsPrueba] = useState(false);
    // const [isActiveModal, setIsActiveModal] = useState(false);

    const { dataContext, setDataContext, isCosecha, setIsCosecha } = useContext(GlobalContext)

    let history = useHistory();


    const addCosecha = () => {
        setIsVista(true);
        setIsVistaEditar(false);
        setDataContext(null)
        // navigate('/addCapacidad');
        history.push("/addCapacidad");
    };

    return (
        <>
                <div className='divContainer'>
                    <Card className='cardGrafico' style={{ width: "50%" }}>
                        <h1 className='titulos'>EVOLUCIÓN PRODUCTIVA</h1>
                        <Evolucion />
                    </Card>
                    <Card className='cardTable' style={{ width: "50%" }}>
                        <h1 className='titulos'>CAPACIDAD PRODUCTIVA</h1>
                        <Capacidad />
                        <div className='divBtnAddCosecha'>
                            <Button
                                className='btnAddCosecha'
                                icon={<PlusCircleOutlined />}
                                onClick={() => addCosecha()}
                            />
                        </div>
                    </Card>
                </div>
        </>
    );
}
export default Analitica;