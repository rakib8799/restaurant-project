import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import equals from 'validator/lib/equals';
import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';
import { authSignUp } from '../../api/auth';
import { showLoading } from '../../helpers/loading';
import { showErrorMsg, showSuccessMsg } from '../../helpers/messages';

const SignUp = () => {
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        errorMsg: '',
        successMsg: '',
        loading: false,
    });
    const { username, email, password, confirmPassword, errorMsg, successMsg, loading } = userData;
    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value,
            errorMsg: '',
            successMsg: '',
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        // client-side validation
        if (isEmpty(username) || isEmpty(email) || isEmpty(password) || isEmpty(confirmPassword)) {
            setUserData({
                ...userData,
                errorMsg: 'All fileds are required',
            });
        } else if (!isEmail(email)) {
            setUserData({
                ...userData,
                errorMsg: 'Invalid email',
            });
        } else if (!equals(password, confirmPassword)) {
            setUserData({
                ...userData,
                errorMsg: 'Passwords do not match',
            });
        } else {
            // eslint-disable-next-line no-unused-vars
            const data = { username, email, password };
            setUserData({
                ...userData,
                successMsg: 'Validation is successful',
                loading: true,
            });
            authSignUp(data)
                .then((res) => {
                    console.log(res);
                    setUserData({
                        username: '',
                        email: '',
                        password: '',
                        confirmPassword: '',
                        loading: false,
                        // successMsg: res.data.successMessage,
                    });
                })
                .catch((err) => {
                    console.log(err.message);
                    setUserData({
                        ...userData,
                        loading: false,
                        errorMsg: err.response.data.errorMessage,
                    });
                });
        }
    };
    return (
        <>
            <div className="container d-flex" style={{ width: '450px', height: '92vh' }}>
                <form
                    // action=""
                    onSubmit={handleSubmit}
                    className="align-self-center card p-5 pt-4 pb-3 shadow mb-5"
                    style={{ width: '100%' }}
                >
                    <h2 className="text-center">Sign Up</h2>
                    {loading && <div className="text-center">{showLoading()}</div>}
                    {errorMsg && showErrorMsg(errorMsg)}
                    {successMsg && showSuccessMsg(successMsg)}
                    <div className="input-group mt-2 mb-3">
                        <span className="input-group-text" id="basic-addon1">
                            <FontAwesomeIcon icon={faUser} />
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            name="username"
                            value={username}
                            onChange={handleChange}
                            placeholder="Username"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                        />
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">
                            <FontAwesomeIcon icon={faEnvelope} />
                        </span>
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            value={email}
                            onChange={handleChange}
                            placeholder="Email address"
                            aria-label="Email"
                            aria-describedby="basic-addon2"
                        />
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon3">
                            <FontAwesomeIcon icon={faLock} />
                        </span>
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            value={password}
                            onChange={handleChange}
                            placeholder="Create password"
                            aria-label="Password"
                            aria-describedby="basic-addon3"
                        />
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">
                            <FontAwesomeIcon icon={faLock} />
                        </span>
                        <input
                            type="password"
                            className="form-control"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm Password"
                            aria-label="Confirm Password"
                            aria-describedby="basic-addon4"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">
                        Signup
                    </button>
                    <p>
                        Already have an account?{' '}
                        <Link className="text-decoration-none" to="/signIn">
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </>
    );
};
export default SignUp;
