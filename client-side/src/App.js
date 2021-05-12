import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import NotFound from './components/NotFound/NotFound';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';

const App = () => (
    <Router>
        <Header />
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/signUp" component={SignUp} />
            <Route exact path="/signIn" component={SignIn} />
            <Route path="*" component={NotFound} />
        </Switch>
    </Router>
);

export default App;
