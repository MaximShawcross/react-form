import { useFormik } from "formik";
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


const Form = () => {

    const formik = useFormik({
        initialValues: {
            name:   '',
            email: '',
            amount: 0,
            currency: '',
            text: '',
            terms: false
        },
        validationSchema: Yup.object( {
            name: Yup.string()
                    .min(2, '2 symbols is required ')
                    .required('name should be not clear'),
            email: Yup.string()
                    .email('email is wrong!')
                    .required('email should be not clear'),
            amount: Yup.number()
                    .moreThan(5, 'number is less than minimal value!')
                    .required('amount should can not be empty'),            
            currency: Yup.string().required('chose the valute'),
            text: Yup.string()
                    .min(10, 'Not less than 10 symbols')
                    .required('text should be not clear'),
            terms: Yup.boolean()
                    .required('agreement is necessary')
                    .oneOf([true], 'agreement is necessary')

                      
        } ),    
        onSubmit: (values) => {
            console.log(JSON.stringify(values, null, 2  ));
        }
    })  

    // useEffect(() => {
    //     console.log(formik.initialValues);
    // }, [formik])

    return (
        <form className="form" onSubmit={formik.handleSubmit}>
            <h2>Отправить пожертвование</h2>
            <label htmlFor="name">Ваше имя</label> 
            <input
                id="name"
                name="name"
                type="text"
                value = {formik.values.name}
                onChange = {formik.handleChange} // 
                onBlur = {formik.handleBlur}
            />
            {formik.errors.name && formik.touched.name ? <p className="error">{formik.errors.name}</p>: null}
            <label htmlFor="email">Ваша почта</label>
            <input
                id="email"
                name="email"
                type="email"
                value = {formik.values.email}
                onChange = {formik.handleChange}
                onBlur = {formik.handleBlur}
            />
            {formik.errors.email && formik.touched.email? <p className="error">{formik.errors.email}</p>: null}
            <label htmlFor="amount">Количество</label>
            <input
                id="amount"
                name="amount"
                type="number"
                value = {formik.values.amount}
                onChange = {formik.handleChange}
                onBlur = {formik.handleBlur}
            />
            {formik.errors.amount && formik.touched.amount ? <p className="error">{formik.errors.amount}</p>: null}
            <label htmlFor="currency">Валюта</label>
            <select
                id="currency"
                name="currency"
                value = {formik.values.currency}
                onChange = {formik.handleChange}
                onBlur = {formik.handleBlur}>
                    
                    <option value="">Выберите валюту</option>
                    <option value="USD">USD</option>
                    <option value="UAH">UAH</option>
                    <option value="RUB">RUB</option>
                    {formik.errors.currency && formik.touched.currency ? <p className="error"> {formik.errors.currency}</p>: null}
            </select>
            <label htmlFor="text">Ваше сообщение</label>
            <textarea 
                id="text"
                name="text"
                value = {formik.values.text}
                onChange = {formik.handleChange}
                onBlur = {formik.handleBlur}
            />
            {formik.errors.text && formik.touched.text ? <p className="error">{formik.errors.text}</p>: null}
            <label className="checkbox">
                <input 
                    name="terms" 
                    type="checkbox" 
                    value = {formik.values.terms}
                    onChange = {formik.handleChange}
                    onBlur = {formik.handleBlur}/>
                Соглашаетесь с политикой конфиденциальности?
            </label>
            {formik.errors.terms && formik.touched.terms ? <p className="error">{formik.errors.terms}</p>: null}
            <button type="submit">Отправить</button>
        </form>
    )
}

export default Form;