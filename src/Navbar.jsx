import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();

    const [user, setUser] = useState(
        localStorage.getItem("user")
    );

    useEffect(() => {
        setUser(localStorage.getItem("user"));
    }, [location.pathname]);

    function handleLogout() {
        localStorage.removeItem("user");
        setUser(null);
        navigate("/login");
    }

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

                {user && (
                    <>
                        <Link to="/addproducts">Add Products</Link>
                        <Link to="/addsuppliers">Add Suppliers</Link>
                        <Link to="/contact">Contact</Link>

                        <button
                            type="button"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </>
                )}

                {!user && (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;