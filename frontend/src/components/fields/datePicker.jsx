import React from "react";
import DateView from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useField, Field } from 'formik';

const DatePicker = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <>
            <label htmlFor={props.id || props.name}>{label}</label>
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
            <Field name={props.name}>
                {
                    ({ form, field }) => {
                        const { setFieldValue } = form
                        const { value } = field
                        return <DateView id={props.name} {...field} selected={value} onChange={val => setFieldValue(props.name, val)} />
                    }
                }

            </Field>
        </>
    )
}

export default DatePicker;