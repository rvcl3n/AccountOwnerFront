import React, {Component} from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import Home from '../components/Home/Home';
import NotFound from '../components/ErrorPages/NotFound/NotFound';
import asyncComponent from '../hoc/AsyncComponent/AsyncComponent';
import InternalServer from '../components/ErrorPages/InternalServer/InternalServer';
import OwnerDetails from  './Owner/OwnerDetails/OwnerDetails';
import CreateOwner from './Owner/CreateOwner/CreateOwner';
import UpdateOwner from './Owner/UpdateOwner/UpdateOwner';
import DeleteOwner from './Owner/DeleteOwner/DeleteOwner';
import LoginOwner from './Owner/LoginOwner/LoginOwner';
import RegisterOwner from './Owner/RegisterOwner/RegisterOwner';
import PrivateRoute from '../components/PrivateRouteComp';
import { history } from '../helpers/historyHepler';


const AsyncOwnerList = asyncComponent(() => {
  return import('./Owner/OwnerList/OwnerList');
});


    class App extends Component {
      constructor(props) {
        super(props);

        history.listen((location, action) => {
            // clear alert on location change
            this.props.clearAlerts();
        });
    }

      render () {
        return (
          <BrowserRouter history={history}>
            <Layout>
              <Switch>
                <PrivateRoute path="/" exact component={Home} />
                <Route path="/login"component={LoginOwner} />
                <Route path="/register" component={RegisterOwner} />
                <PrivateRoute path="/owner-list" component={AsyncOwnerList} />
                <PrivateRoute path="/ownerDetails/:id" component={OwnerDetails} />
                <PrivateRoute path="/createOwner" component={CreateOwner} />
                <PrivateRoute path="/updateOwner/:id" component={UpdateOwner} />
                <PrivateRoute path="/deleteOwner/:id" component={DeleteOwner} />
                <Route path="/500" component={InternalServer} />
                <Route path="*" component={NotFound} /> 
              </Switch>
            </Layout>
          </BrowserRouter>
        );
      }
    }

    export default App;