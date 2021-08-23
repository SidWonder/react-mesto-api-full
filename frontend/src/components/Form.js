import React from 'react';

// eslint-disable-next-line react/prop-types
function Form({name, title, children, onSubmit,}) {
    return (
        <div className={`authpage form_type_${name}`}>
            <div className="authpage__container">
                <h3 className="authform__title">{title}</h3>
                <form className="authform" name={name} method="GET" noValidate onSubmit={onSubmit}>
                    {children}
                </form>
            </div>
        </div>
    );
}

export default Form;
