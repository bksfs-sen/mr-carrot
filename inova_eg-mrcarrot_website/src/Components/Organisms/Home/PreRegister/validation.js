
import * as Yup from 'yup';

export const PreRegisterSchema = Yup.object().shape({
    first_name: Yup.string().required('Required'),
    last_name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required').trim(),
    phone_number: Yup.string().trim()
        .min(11, '* Your Phone number must be at least 12 characters')
        .max(11, '* Your Phone number must be at least 12 characters')
        .required('* Your Phone number must be at least 12 characters'),

});