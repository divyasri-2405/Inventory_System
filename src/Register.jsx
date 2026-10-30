import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUsers, saveUsers } from "./data/storage";

function Register() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    function handleRegister(e) {
        e.preventDefault();

        setError("");
        setMessage("");

        const users = getUsers();

        const existingUser = users.find(
            (user) =>
                user.email.toLowerCase() === email.trim().toLowerCase()
        );

        if (existingUser) {
            setError("This email is already registered.");
            return;
        }

        const newUser = {
            id: Date.now().toString(),
            username: username.trim(),
            email: email.trim(),
            password: password
        };

        saveUsers([...users, newUser]);

        setMessage("Registration successful!");

        setUsername("");
        setEmail("");
        setPassword("");

        navigate("/login");
    }

    return (
        <div className="form-card auth-card">
            <h2>Create Invenzo Account</h2>

            <p>Register to manage your inventory.</p>

            {error && <p className="error">{error}</p>}
            {message && <p className="success">{message}</p>}

            <form onSubmit={handleRegister}>
                <label>Username</label>

                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    required
                />

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
                    placeholder="Create a password"
                    minLength={6}
                    required
                />

                <button type="submit">Register</button>
            </form>

            <p>
                Already have an account?{" "}
                <Link to="/login">Login</Link>
            </p>
        </div>
    );
}

export default Register;