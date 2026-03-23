import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import Signup from './components/Signup';
import Signin from './components/Signin';
import Addproducts from './components/Addproducts';
import Getproducts from './components/Getproducts';
import Makepayment from './components/Makepayment';
import Notfound from './components/Notfound';
import EditProduct from './components/EditProduct';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<Getproducts />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/addproducts' element={<Addproducts />} />
          <Route path='/makepayment' element={<Makepayment />} />
          <Route path='/editproduct' element={<EditProduct />} />
          <Route path='*' element={<Notfound />} />
        </Routes>

        {<Footer />}

      </div>
    </Router>
  );
}

export default App;
