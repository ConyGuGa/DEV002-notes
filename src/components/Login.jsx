import { useState } from 'react';
import { useAuth } from '../context/authContext'
import { useNavigate } from 'react-router-dom';
import { Alert } from './Alert';
import "./css-components/Login.css";


export function Login() {

    const [user, setUser] = useState({
        email: '',
        password: '',
    });
    const { login, loginWithGoogle } = useAuth()
    const navigate = useNavigate()
    const [error, setError] = useState();


    const handleChange = ({ target: { name, value } }) =>
        setUser({ ...user, [name]: value })


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {

            await login(user.email, user.password)
            navigate("/");
        } catch (error) {
            console.log(error.code);
            setError(error.message);
        }
    }

    const handleGoogleSignIn = async () => {
        try {
            throw new Error('googleError')
            await loginWithGoogle()
            navigate("/");
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div>
            <div className="login-box">
                {error && < Alert message={error} />}


                <form onSubmit={handleSubmit}
                    className="container-contact"
                >
                    <div className="container-info">
                        <div>
                            <label htmlFor="email">
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                onChange={handleChange}
                                placeholder="Email"
                                className="inputs"
                            />
                            <label
                                htmlFor="password" >
                            </label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                onChange={handleChange}
                                className="inputs"
                                placeholder="Password"
                            />
                        </div>
                    </div>
                    <div className="btn-container">
                        <button className="btn-login">
                            Login
                        </button>
                    </div>
                </form>

            </div>
            <div>
                <button onClick={handleGoogleSignIn}>Access</button>
                <p>You don't have an account yet?     Create Account</p>


            </div> </div>
    )

}