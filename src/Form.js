import { Formik, Form, Field, ErrorMessage, useField } from 'formik';
import * as Yup from 'yup';
// import { useEffect } from "react";

// const validate = (values) => {
//     const errors = {};

//     if (!values.name) errors.name = 'Обязательное поле';
    
//     if (values.name.length < 5)  errors.name = 'Слишком короткое имя!';

//     if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) errors.email = 'неправильный email адрес';
//     else if(values.email.length < 5) errors.email = 'Это поле должно быть заполнено!'

//     return errors;
// }

const MyTextInput = ({label, ...props}) => {
    const [field, meta] = useField(props);

    return (
        <>
            <label htmlFor= {props.name}>{label}</label>
            <input {...props} {...field}/>
            {meta.touched && meta.error ? (
                <div className = "error">{meta.error}</div>
            ): null} 
        </>
    )
}   

const MyCheckBox = ({children, ...props}) => {
    const [field, meta] = useField({...props, type:'checkbox'});

    return (
        <>
            <label htmlFor= {props.name}>
                <input type = "checkbox" {...props} {...field}/>
                {children}
            </label>

            {meta.touched && meta.error ? (
                <div className = "error">{meta.error}</div>
            ): null} 
        </>
    )
}   


const CustomForm = () => {

    // const labelControl = (name, text) => {
    //   return ( 
    //     <>
    //         <label htmlFor="name">{text}</label> 
    //         <Field
    //             id={name}
    //             name={name}
    //             type="text"
    //         /> 
    //         <ErrorMessage className = "error" name = {name} component = "div"/>
    //     </>
    //   )
    // }

    return (
        <Formik
            initialValues = {{
                name:   '',
                email: '',
                amount: 0,
                currency: '',
                text: '',
                terms: false
            }}  
            validationSchema = { Yup.object( {
                name: Yup.string()  
                        .min(2, '2 symbols is required ')
                        .required('name is required field'),
                email: Yup.string()
                        .email('email is wrong!')
                        .required('email is required field'),
                amount: Yup.number()
                        .moreThan(5, 'number is less than minimal value!')
                        .required('amount is required field'),            
                currency: Yup.string().required('chose the currency'),
                text: Yup.string()
                        .min(10, 'Not less than 10 symbols')
                        .required('text is required field'),
                terms: Yup.boolean()
                        .required('agreement is necessary')
                        .oneOf([true], 'agreement is necessary')
                })}
            onSubmit = { values => console.log(JSON.stringify(values, null, 2  )) }
            >

            <Form className="form">
                <h2>Send a donation</h2>
               <MyTextInput
                    label= "Your name"
                    id="name"
                    name="name"
                    type="text"    
               />
                <MyTextInput 
                    label = "Your email"
                    id="email"
                    name="email"
                    type="email"
                />
                <label htmlFor="amount">Amount</label>
                <Field
                    id="amount"
                    name="amount"
                    type="number"
                />
                <ErrorMessage className = "error" name = "amount" component = "div"/>
                <label htmlFor="currency">Currency</label>
                <Field
                    id="currency"
                    name="currency"
                    as = "select">
                        <option value="">Chose the currency</option>
                        <option value="USD">USD</option>
                        <option value="UAH">UAH</option>
                        <option value="RUB">RUB</option>
                </Field>
                <ErrorMessage className = "error" name = "currency" component = "div"/>
                <label htmlFor="text">Your massagge</label>
                <Field
                    id="text"
                    name="text"
                    as = "textarea"                 
                />
                <ErrorMessage className = "error" name = "text" component = "div"/>
                <ErrorMessage className = "error" name = "terms" component = "div"/>
                <MyCheckBox name = "terms">Did you agree to privacy policy?</MyCheckBox>
                <button type="submit">Submit</button>
            </Form>
        </Formik>
    )
}

export default CustomForm;