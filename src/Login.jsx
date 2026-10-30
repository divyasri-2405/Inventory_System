import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUsers } from "./data/storage";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    function handleLogin(e) {
        e.preventDefault();
        setError("");

        const users = getUsers();

        const user = users.find(
            (u) =>
                u.email.toLowerCase() === email.trim().toLowerCase() &&
                u.password === password
        );

        if (user) {
            localStorage.setItem(
                "user",
                JSON.stringify({
                    id: user.id,
                    username: user.username,
                    email: user.email
                })
            );

            navigate("/", { replace: true });
        } else {
            setError("Invalid email or password. Please register first.");
        }
    }

    return (
        <div className="form-card auth-card">
            <h2>Login to Invenzo</h2>
            <p>Sign in to manage your inventory.</p>

            {error && <p className="error">{error}</p>}

            <form onSubmit={handleLogin}>
                <label>Email</label>

                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                />

                <label>Password</label>

                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                />

                <button type="submit">Login</button>
            </form>

            <p>
                Don't have an account?{" "}
                <Link to="/register">Register</Link>
            </p>
        </div>
    );
}

export default Login;