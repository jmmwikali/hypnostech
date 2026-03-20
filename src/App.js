import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import Signup from './components/Signup';
import Signin from './components/Signin';
import Addproducts from './components/Addproducts';
import Getproducts from './components/Getproducts';
import Makepayment from './components/Makepayment';
import Notfound from './components/Notfound';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h2>Welcome to Hypnos Tech - Power Your World</h2>
        </header>
        <Routes>
          <Route path='/' element={<Getproducts />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/addproducts' element={<Addproducts />} />
          <Route path='/makepayment' element={<Makepayment />} />
          <Route path='*' element={<Notfound />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;
