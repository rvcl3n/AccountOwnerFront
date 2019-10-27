import React, {Component} from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import Home from '../components/Home/Home';
import NotFound from '../components/ErrorPages/NotFound/NotFound';
import asyncComponent from '../hoc/AsyncComponent/AsyncComponent';
import InternalServer from '../components/ErrorPages/InternalServer/InternalServer';
import OwnerDetails from  './Owner/OwnerDetails/OwnerDetails';
//import OwnerList from './Owner/OwnerList/OwnerList';
import PageShell from '@material-ui/utils/';
import CreateOwner from './Owner/CreateOwner/CreateOwner';
import UpdateOwner from './Owner/UpdateOwner/UpdateOwner';
import DeleteOwner from './Owner/DeleteOwner/DeleteOwner';
import LoginOwner from './Owner/LoginOwner/LoginOwner';
import PrivateRoute from '../components/PrivateRouteComp';

const AsyncOwnerList = asyncComponent(() => {
  return import('./Owner/OwnerList/OwnerList');
});


    class App extends Component {

      /*state = {
        contacts: []
      }

      componentDidMount() {
        fetch('http://localhost:5000/api/owner')
        .then(res => res.json())
        .then((data) => {
          this.setState({ contacts: data })
        })
        .catch(console.log)
      }*/

      render () {
        return (
          <BrowserRouter>
            <Layout>
              <Switch>
                <PrivateRoute path="/" exact component={Home} />
                <Route path="/login"component={LoginOwner} />
                <PrivateRoute path="/owner-list" component={AsyncOwnerList} />
                <Route path="/ownerDetails/:id" component={OwnerDetails} />
                <Route path="/createOwner" component={CreateOwner} />
                <Route path="/updateOwner/:id" component={UpdateOwner} />
                <Route path="/deleteOwner/:id" component={DeleteOwner} />
                <Route path="/500" component={InternalServer} />
                <Route path="*" component={NotFound} /> 
              </Switch>
            </Layout>
          </BrowserRouter>
        );
      }
    }

    export default App;