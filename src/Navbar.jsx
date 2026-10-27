
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Navbar() {
    const navigate = useNavigate();
    const [user, setUser] = useState(localStorage.getItem('user'));

    function handleLogin() {
        setUser(localStorage.getItem('user'));
    }

    function handleLogout() {
        localStorage.removeItem('user');
        setUser(null);
        navigate('/login');
    }

    // Update Navbar when the login page returns a successful login
    window.onuserlogin = handleLogin;

    return (
        <nav className="Navbar">
            <Link to="/" className="brand">
                <div className="brand-icon">
                    <span className="brand-letter">I</span>
                    <span className="brand-dot"></span>
                </div>

                <div className="brand-text">
                    <h2>Invenzo<span>.</span></h2>
                    <p>Smart Stock. Simple Control.</p>
                </div>
            </Link>

            <div className="Navlinks">
                <Link to="/">Home</Link>
                <Link to="/products">Products</Link>
                <Link to="/suppliers">Suppliers</Link>
                <Link to="/addproducts">Add Products</Link>
                <Link to="/addsuppliers">Add Suppliers</Link>
                <Link to="/contact">Contact</Link>

                {!user && (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}

                {user && (
                    <button type="button" onClick={handleLogout}>
                        Logout
                    </button>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
