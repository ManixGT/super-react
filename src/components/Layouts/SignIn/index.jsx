import { Link, useNavigate } from 'react-router-dom';
import styles from './SignInPage.module.css';
import { ReusableFormComponent } from '../../SharedUI/ReactForms';

const fields = [
    {
        name: 'email',
        label: 'Email',
        type: 'email',
        placeholder: 'Enter your email',
        validation: {
            required: 'Email is required',
            pattern: {
                value: /^\S+@\S+$/i,
                message: 'Invalid email format',
            },
        },
    },
    {
        name: 'password',
        label: 'Password',
        type: 'password',
        placeholder: 'Enter your password',
        validation: {
            required: 'Password is required',
            minLength: {
                value: 6,
                message: 'Minimum 6 characters',
            },
        },
    },
];

const SignInPage = () => {
    const navigate = useNavigate();

    const handleSubmit = (data) => {
        console.log('Signed in:', data);
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.heading}>Sign In</h1>

                <ReusableFormComponent fields={fields} onSubmit={handleSubmit} />

                <div className={styles.forgotPassword}>
                    <Link to="/forgot-password">Forgot Password?</Link>
                </div>

                <div className={styles.separator}>
                    <span>or</span>
                </div>

                <button
                    className={styles.otpButton}
                    onClick={() => navigate('/login-otp')}
                >
                    Sign in with OTP
                </button>

                <p className={styles.loginText}>
                    Don't have an account?{' '}
                    <Link to="/signUp" className={styles.link}>
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignInPage;
