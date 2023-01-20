import Card from 'antd/es/card/Card';
import React, { useState, useContext } from 'react';
// import Capacidad from './capacidad/Capacidad';
import Capacidad from '../capacidad/Capacidad'
import Evolucion from '../evolucion/Evolucion';
import './analitica.css';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { GlobalContext } from '../../context/GlobalContext';
import { useHistory } from "react-router-dom";
import { NuevaCapacidad } from '../capacidad/NuevaCapacidad';
import { EditarCapacidad } from '../capacidad/EditarCapacidad';
// import { useNavigate } from 'react-router-dom';




const Analitica = () => {
    var objData = []

    // const [isVista, setIsVista] = useState(false);
    // const [isVistaEditar, setIsVistaEditar] = useState(false);

    const { dataContext, setDataContext, isCosecha, setIsCosecha, appStage, setAppStage, } = useContext(GlobalContext)

    let history = useHistory();


    // const addCosecha = () => {
    //     setIsVista(true);
    //     setIsVistaEditar(false);
    //     setDataContext(null)
    //     history.push("/addCapacidad");
    // };

    // const handleStage = () => {
    //     switch (appStage) {
    //       case 0:
    //       return <Capacidad />;
    //       case 1:
    //       return <EditarCapacidad />;
    //       case 2:
    //       return <NuevaCapacidad />;
    //       default:
    //       return <Capacidad />;
    //     }
    //   };

    return (
        <>
                <div className='divContainer'>
                    <Card className='cardGrafico' style={{ width: "50%" }}>
                        <h1 className='titulos'>EVOLUCIÓN PRODUCTIVA</h1>
                        <Evolucion />
                    </Card>
                    <Card className='cardTable' style={{ width: "50%" }}>
                        <h1 className='titulos' style={{ marginBottom: '11px' }}>CAPACIDAD PRODUCTIVA</h1>
                        {/* <div>{<>{handleStage()}</>}</div>; */}
                        <Capacidad />
                    </Card>
                </div>
        </>
    );
}
export default Analitica;