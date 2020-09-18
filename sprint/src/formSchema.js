import * as yup from 'yup';

export default yup.object().shape({
    name: yup.string().required('Name is required').min(2, 'Name must be at least two characters long'),
    size: yup.string().oneOf(['small', 'medium', 'large'], 'You must choose a size'),
    sauce: yup.string().oneOf(['red', 'white', 'bbq'], 'You must choose a sauce'),

});