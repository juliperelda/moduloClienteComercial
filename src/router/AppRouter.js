import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AnaliticaView from '../views/AnaliticaView';
import EditarCapacidadView from '../views/EditarCapacidadView';
import NuevaCapacidadView from '../views/NuevaCapacidadView';

const AppRouter = () => {
    return (
        <BrowserRouter basename="/app">
            <Route>
                <Route exact path="/" component={AnaliticaView} />
                <Route exact path="/addCapacidad" component={NuevaCapacidadView} />
                <Route exact path="/editCapacidad" component={EditarCapacidadView} />
            </Route>
        </BrowserRouter>
    )
}

export default AppRouter;