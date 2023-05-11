import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NavbarComp from './components/pages/NavbarComp';
import Home from './components/home';
import Contact from "./components/Contact";
import About from "./components/About";
import Login from "./components/Login";
import Register from './components/Register';
import EditProd from './components/pages/admin/editProd';
import CreateProd from './components/pages/admin/createProd';
import productLists from './components/pages/admin/productList';
import PaymentPage from './components/pages/transaksi/Paypage';

function App() {
  return (
    
    <Router>
      <div className="App">
        <br />
        <br />
        <NavbarComp/>
        <Switch>
        <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/register" component={Register} />
          <Route path="/Login" component={Login} />
          <Route path="/admin" component={productLists} />
          <Route path="/adminCret" component={CreateProd} />
          <Route path="/edit/:id" component={EditProd} />
          <Route path="/payment/:id" component={PaymentPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
