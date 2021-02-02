import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './index.css';
import App from './AppContainer';
import {Provider} from 'react-redux';
import {AppStore} from './appStore';
import PropertyHome from './components/property/propertyHomeContainer';
import CardHome from './components/card/cardHomeContainer';
import Home from './components/home/HomeContainer';
import Login from './containers/LoginContainer';
import { homedir } from 'os';

ReactDOM.render(
	<Provider store={AppStore}>
		<Router>
			<Route path="/" component={App} />
			<Route exact path="/login" component={Login}/>
			<Switch>
			<Route exact path="/home" component={Home} />	
			<Route exact path="/proplist" component={PropertyHome} />
			<Route exact path="/cardhome" component={CardHome} />
			</Switch>
		</Router>
	</Provider>, document.getElementById('root')
);


