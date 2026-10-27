
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './Navbar';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Products from './Products';
import Suppliers from './Suppliers';
import AddProduct from './AddProduct';
import AddSupplier from './AddSupplier';
import Contact from './Contact';
import Notfound from './Notfound';
import ProtectedRoute from './ProtectedRoute';

function App() {
    return (
        <BrowserRouter>
            <Navbar />

            <main className="container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    {/* Anyone can view these lists */}
                    <Route path="/products" element={<Products />} />
                    <Route path="/suppliers" element={<Suppliers />} />

                    {/* Login required for these pages */}
                    <Route
                        path="/addproducts"
                        element={
                            <ProtectedRoute>
                                <AddProduct />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/addsuppliers"
                        element={
                            <ProtectedRoute>
                                <AddSupplier />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/contact"
                        element={
                            <ProtectedRoute>
                                <Contact />
                            </ProtectedRoute>
                        }
                    />

                    <Route path="*" element={<Notfound />} />
                </Routes>
            </main>

            <footer className="footer">
                <p>Invenzo Inventory Management © 2026</p>
            </footer>
        </BrowserRouter>
    );
}

export default App;
