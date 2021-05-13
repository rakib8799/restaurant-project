import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';
import { authSignIn } from '../../api/auth';
import { showLoading } from '../../helpers/loading';
import { showErrorMsg, showSuccessMsg } from '../../helpers/messages';

const SignIn = () => {
    const [userLoginData, setUserLoginData] = useState({
        email: '',
        password: '',
        errorMsg: '',
        successMsg: '',
        loading: false,
    });
    const { email, password, errorMsg, successMsg, loading } = userLoginData;
    const handleChange = (e) => {
        setUserLoginData({
            ...userLoginData,
            [e.target.name]: e.target.value,
            errorMsg: '',
            successMsg: '',
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        // client-side validation
        if (isEmpty(email) || isEmpty(password)) {
            setUserLoginData({
                ...userLoginData,
                errorMsg: 'All fileds are required',
            });
        } else if (!isEmail(email)) {
            setUserLoginData({
                ...userLoginData,
                errorMsg: 'Invalid email',
            });
        } else {
            // eslint-disable-next-line no-unused-vars
            const data = { email, password };
            setUserLoginData({
                ...userLoginData,
                successMsg: 'Validation is successful',
                loading: true,
            });
            authSignIn(data)
                .then((res) => {
                    console.log(res);
                    setUserLoginData({
                        email: '',
                        password: '',
                        loading: false,
                        successMsg: res.data.successMessage,
                    });
                })
                .catch((err) => {
                    console.log(err.message);
                    setUserLoginData({
                        ...userLoginData,
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
                    <h2 className="text-center">Sign In</h2>
                    {loading && <div className="text-center">{showLoading()}</div>}
                    {errorMsg && showErrorMsg(errorMsg)}
                    {successMsg && showSuccessMsg(successMsg)}
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
                            placeholder="Password"
                            aria-label="Password"
                            aria-describedby="basic-addon3"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">
                        Signin
                    </button>
                    <p>
                        Don&#39;t have an account?{' '}
                        <Link className="text-decoration-none" to="/signUp">
                            Register
                        </Link>
                    </p>
                </form>
            </div>
        </>
    );
};
export default SignIn;
