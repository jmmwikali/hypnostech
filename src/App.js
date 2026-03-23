import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import { AuthProvider } from './components/AuthContext';
import AdminRoute      from './components/AdminRoute';

import Signup       from './components/Signup';
import Signin       from './components/Signin';
import Addproducts  from './components/Addproducts';
import Getproducts  from './components/Getproducts';
import Makepayment  from './components/Makepayment';
import Notfound     from './components/Notfound';
import EditProduct  from './components/EditProduct';
import Footer       from './components/Footer';
import Cart         from './components/Cart';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* ── Public routes ── */}
            <Route path='/'          element={<Getproducts />} />
            <Route path='/signup'    element={<Signup />} />
            <Route path='/signin'    element={<Signin />} />
            <Route path='/cart'      element={<Cart />} />
            <Route path='/makepayment' element={<Makepayment />} />

            {/* ── Admin-only routes ── */}
            <Route path='/addproducts' element={
              <AdminRoute><Addproducts /></AdminRoute>
            } />
            <Route path='/editproduct' element={
              <AdminRoute><EditProduct /></AdminRoute>
            } />

            <Route path='*' element={<Notfound />} />
          </Routes>

          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
