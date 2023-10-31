import React from "react";
import { useField } from 'formik';

const MySelect = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <div>
            <label htmlFor={props.id || props.name}>{label}</label>
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
            <select {...field} {...props} className={meta.touched && meta.error ? "select-error" : "select"} />

        </div>
    );
};

export default MySelect;