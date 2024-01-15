import { body } from "express-validator";

const validateAndFormatBirthdate = (value, { req }) => {
    if (!value) {
        return true;
    }

    // Check if the birthdate is in the correct format (yyyy/MM/dd)
    const dateRegex = /^(19|20)\d\d\/(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])$/;

    if (!dateRegex.test(value)) {
        throw new Error('Invalid birthdate format, Please use (yyyy/MM/dd)');
    }

    // Convert it to a Date object and check if it's a valid date
    const dateParts = value.split('/');
    const year = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10) - 1; // months are zero-based in JavaScript
    const day = parseInt(dateParts[2], 10);

    const formattedDate = new Date(year, month, day);

    if (
        formattedDate.getFullYear() !== year ||
        formattedDate.getMonth() !== month ||
        formattedDate.getDate() !== day
    ) {
        throw new Error('Invalid date values');
    }

    // If it's valid, update the birthdate in the request body
    req.body.birthdate = formattedDate;

    return true;
};




// Login validation rules
export const userValidationRules = [
    // Validate first name
    body('firstName').notEmpty().withMessage('First name is required'),

    // Validate last name
    body('lastName').notEmpty().withMessage('Last name is required'),

    // Validate email
    body('email').isEmail().withMessage('Invalid email address'),

    // Validate mobile number
    body('mobileNumber')
        .isLength({ min: 10, max: 10 })
        .withMessage('Mobile number must be 10 digits')
        .isNumeric()
        .withMessage('Mobile number must be numeric'),

    // Validate birthdate (optional)
    body('birthdate').optional().custom(validateAndFormatBirthdate),

    // Validate addressLine1
    body('addresses.addressLine1').notEmpty().withMessage('Address Line 1 is required'),

    // Validate addressLine2 (optional)
    body('addresses.addressLine2').optional(),

    // Validate pincode
    body('addresses.pincode')
        .notEmpty()
        .withMessage('Pincode is required')
        .isLength({ min: 4, max: 6 })
        .withMessage('Pincode must be between 4 and 6 digits')
        .isNumeric()
        .withMessage('Pincode must be numeric'),

    // Validate city
    body('addresses.city').notEmpty().withMessage('City is required'),

    // Validate state
    body('addresses.state').notEmpty().withMessage('State is required'),

    // Validate type
    body('addresses.type')
        .notEmpty()
        .withMessage('Type is required')
        .isIn(['Home', 'Office'])
        .withMessage('Type must be either Home or Office'),


];