import React, { Component } from 'react';
import './Login.css'; // Ensure you have the necessary styles here

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            rememberMe: false,
            currentUser Type: 'patient', // Default to patient
            errorMessage: '',
            successMessage: '',
        };
    }

    handleFieldChange = (value, field) => {
        this.setState({ [field]: value });
    };

    handleUser TypeChange = (type) => {
        this.setState({ currentUser Type: type });
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password, rememberMe, currentUser Type } = this.state;

        // Call your Supabase login function here
        try {
            // Example Supabase login code (replace with your actual implementation)
            const { user, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            });

            if (error) {
                this.setState({ errorMessage: error.message, successMessage: '' });
                return;
            }

            // Check user type and handle login success
            // This part needs to be implemented according to your logic
            // ...

            this.setState({ successMessage: 'Login successful! Redirecting...', errorMessage: '' });

            if (rememberMe) {
                localStorage.setItem('supabase.auth.token', JSON.stringify(user));
            }

            setTimeout(() => {
                window.location.href = `/${currentUser Type}_dashboard.html`;
            }, 1500);
        } catch (error) {
            this.setState({ errorMessage: 'An unexpected error occurred. Please try again.', successMessage: '' });
            console.error('Login error:', error);
        }
    };

    render() {
        const { email, password, rememberMe, errorMessage, successMessage } = this.state;

        return (
            <div className="login-container">
                <div className="header">
                    <h1>E-Health Advisor</h1>
                    <p>Welcome back! Please login to continue.</p>
                </div>

                {errorMessage && <div className="error-message">{errorMessage}</div>}
                {successMessage && <div className="success-message">{successMessage}</div>}

                <div className="tab-container">
                    <button className={`tab-button ${this.state.currentUser Type === 'patient' ? 'active' : ''}`} 
                            onClick={() => this.handleUser TypeChange('patient')}>
                        Patient
                    </button>
                    <button className={`tab-button ${this.state.currentUser Type === 'admin' ? 'active' : ''}`} 
                            onClick={() => this.handleUser TypeChange('admin')}>
                        Admin
                    </button>
                </div>

                <form id="loginForm" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <div className="input-group">
                            <i>📧</i>
                            <input
                                type="email"
                                id="email"
                                required
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => this.handleFieldChange(e.target.value, 'email')}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <div className="input-group">
                            <i>🔒</i>
                            <input
                                type="password"
                                id="password"
                                required
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => this.handleFieldChange(e.target.value, 'password')}
                            />
                        </div>
                    </div>

                    <div className="remember-forgot">
                        <label className="remember-me">
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={() => this.setState({ rememberMe: !rememberMe })}
                            />
                            <span>Remember me</span>
                        </label>
                        <a href="#" className="forgot-password" id="forgotPassword">Forgot password?</a>
                    </div>

                    <button type="submit" className="login-button">Sign in</button>
                </form>
            </div>
        );
    }
}

export default Login;
