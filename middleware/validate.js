const { body, param, validationResult } = require('express-validator');
const { ObjectId } = require('mongodb');

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }

    const extractedErrors = [];
    errors.array().map(err => extractedErrors.push({ [err.path || err.param]: err.msg }));

    return res.status(422).json({
        errors: extractedErrors,
    });
}; 

// Reusable rule to validate that the ID in the URL path is a valid MongoDB ObjectId
const validateParamId = [
    param('id')
        .custom((value) => ObjectId.isValid(value))
        .withMessage('The provided ID parameter is not a valid 24-character hex MongoDB ObjectId'),
    handleValidationErrors
];

// 1. Users Validation Rules
const userValidationRules = [
    body('name').trim().notEmpty().withMessage('Name is required').isString().withMessage('Name must be a string'),
    body('email').trim().isEmail().withMessage('Must be a valid email address'),
    body('role').trim().notEmpty().withMessage('Role is required').isIn(['student', 'sensei']).withMessage('Role must be student or sensei'),
    body('tierLevel').trim().notEmpty().withMessage('Tier level/rank is required'),
    body('joinDate').trim().notEmpty().withMessage('Join date is required').isISO8601().withMessage('Join date must be a valid YYYY-MM-DD format'),
    body('isActive').isBoolean().withMessage('isActive must be a boolean true/false value'),
    handleValidationErrors
];

// 2. Training Plans Validation Rules
const planValidationRules = [
    body('weekCommencing').trim().notEmpty().withMessage('Week commencing date is required').isISO8601().withMessage('Week commencing must be a valid YYYY-MM-DD date'),
    body('focusArea').trim().notEmpty().withMessage('Focus area is required'),
    body('difficultyTier').trim().notEmpty().withMessage('Difficulty tier is required'),
    body('description').trim().notEmpty().withMessage('Description is required'),
    handleValidationErrors
];

// 3. Techniques Validation Rules
const techniqueValidationRules = [
    body('planId')
        .notEmpty().withMessage('Connected training planId is required')
        .isString().withMessage('planId must be a valid text string reference')
        .custom((value) => ObjectId.isValid(value)).withMessage('planId must be a valid MongoDB ObjectId'),
    body('name').trim().notEmpty().withMessage('Technique name is required'),
    body('category').trim().notEmpty().withMessage('Category is required'),
    body('difficulty').trim().notEmpty().withMessage('Difficulty is required'),
    body('steps').isArray({ min: 1 }).withMessage('Steps must be an array containing at least one step instruction'),
    body('videoUrl').optional({ checkFalsy: true }).isURL().withMessage('Must be a valid URL link'),
    body('lastUpdatedBy').trim().notEmpty().withMessage('lastUpdatedBy username/id tracking is required'),
    handleValidationErrors
];

// 4. Attendance Logs Validation Rules
const logValidationRules = [
    body('studentId')
        .notEmpty().withMessage('Connected studentId reference is required')
        .isString().withMessage('studentId must be a text string')
        .custom((value) => ObjectId.isValid(value)).withMessage('studentId must be a valid MongoDB ObjectId'),
    body('date').trim().notEmpty().withMessage('Log date is required').isISO8601().withMessage('Date must be a valid YYYY-MM-DD date format'),
    body('classType').trim().notEmpty().withMessage('Class type details are required'),
    body('matTimeMinutes').isInt({ min: 1 }).withMessage('Mat time minutes must be a positive integer'),
    handleValidationErrors
];

module.exports = {
    handleValidationErrors,
    validateParamId,
    userValidationRules,
    planValidationRules,
    techniqueValidationRules,
    logValidationRules
};