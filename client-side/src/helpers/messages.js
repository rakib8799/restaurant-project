// eslint-disable-next-line import/prefer-default-export
export const showErrorMsg = (msg) => (
    <div className="alert alert-danger text-center" role="alert">
        {msg}
    </div>
);
export const showSuccessMsg = (msg) => (
    <div className="alert alert-success text-center" role="alert">
        {msg}
    </div>
);
