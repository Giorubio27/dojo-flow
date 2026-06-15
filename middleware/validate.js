const { body, validationResult } = require('express-validator');

// 1. Users Validation Rules
const userValidationRules = [
    body('_id')
        .notEmpty().withMessage('User ID (_id) is required')
        .isString().withMessage('User ID must be a string'),
    body('name')
        .trim().notEmpty().withMessage('Name is required')
        .isString().withMessage('Name must be a string'),
    body('email')
        .trim().isEmail().withMessage('Must be a valid email address'),
    body('role')
        .trim().notEmpty().withMessage('Role is required')
        .isIn(['student', 'sensei']).withMessage('Role must be student, or sensei'),
    body('tierLevel')
        .trim().notEmpty().withMessage('Tier level/rank is required'),
    body('joinDate')
        .trim().notEmpty().withMessage('Join date is required')
        .isISO8601().withMessage('Join date must be a valid YYYY-MM-DD format'),
    body('isActive')
        .isBoolean().withMessage('isActive must be a boolean true/false value'),
    handleValidationErrors
];

// 2. Training Plans Validation Rules
const planValidationRules = [
    body('_id')
        .notEmpty().withMessage('Plan ID (_id) is required')
        .isString().withMessage('Plan ID must be a string'),
    body('weekCommencing')
        .trim().notEmpty().withMessage('Week commencing date is required')
        .isISO8601().withMessage('Week commencing must be a valid YYYY-MM-DD date'),
    body('focusArea')
        .trim().notEmpty().withMessage('Focus area is required'),
    body('difficultyTier')
        .trim().notEmpty().withMessage('Difficulty tier is required'),
    body('description')
        .trim().notEmpty().withMessage('Description is required'),
    handleValidationErrors
];

// 3. Techniques Validation Rules
const techniqueValidationRules = [
    body('_id')
        .notEmpty().withMessage('Technique ID (_id) is required')
        .isString().withMessage('Technique ID must be a string'),
    body('planId')
        .notEmpty().withMessage('Connected training planId is required')
        .isString().withMessage('planId must be a valid text string reference'),
    body('name')
        .trim().notEmpty().withMessage('Technique name is required'),
    body('category')
        .trim().notEmpty().withMessage('Category is required'),
    body('difficulty')
        .trim().notEmpty().withMessage('Difficulty is required'),
    body('steps')
        .isArray({ min: 1 }).withMessage('Steps must be an array containing at least one step instruction'),
    body('videoUrl')
        .optional({ checkFalsy: true }).isURL().withMessage('Must be a valid URL link'),
    body('lastUpdatedBy')
        .trim().notEmpty().withMessage('lastUpdatedBy username/id tracking is required'),
    handleValidationErrors
];

// 4. Attendance Logs Validation Rules
const logValidationRules = [
    body('_id')
        .notEmpty().withMessage('Log ID (_id) is required')
        .isString().withMessage('Log ID must be a string'),
    body('studentId')
        .notEmpty().withMessage('Connected studentId reference is required')
        .isString().withMessage('studentId must be a text string'),
    body('date')
        .trim().notEmpty().withMessage('Log date is required')
        .isISO8601().withMessage('Date must be a valid YYYY-MM-DD date format'),
    body('classType')
        .trim().notEmpty().withMessage('Class type details are required'),
    body('matTimeMinutes')
        .isInt({ min: 1 }).withMessage('Mat time minutes must be a positive integer'),
    handleValidationErrors
];

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }

    const extractedErrors = [];
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));

    return res.status(422).json({
        errors: extractedErrors,
    });
}; 

module.exports = {
    validate,
    logValidationRules,
    techniqueValidationRules,
    planValidationRules, 
    userValidationRules
}