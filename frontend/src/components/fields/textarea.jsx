import React from "react";
import { useField } from 'formik';

const TextArea = ({ label, ...props }) => {

    const [field, meta] = useField(props);
    return (
        <>
            <label htmlFor={props.id || props.name}>{label}</label>
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
            <input className={meta.touched && meta.error ? "textarea-error" : "textarea"} {...field} {...props} />
        </>
    );
};

export default TextArea;