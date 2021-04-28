import { body, validationResult } from 'express-validator';
import * as express from "express";

export const validateMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next()
    }
    const extractedErrors = [];
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));

    return res.status(422).json({
        errors: extractedErrors,
    })
};

export const loginRequestValidator = () => {
    return [
        body('username').isString(),
        body('password').isString()
    ]
};

export const updateTruckInfoValidator = () => {
    return [
        body('id').isNumeric(),
        body('latitude').isNumeric(),
        body('longitude').isNumeric(),
        body('licensePlate').isString(),
        body('allowedWeight').isNumeric(),
        body('currentCargoWeight').isNumeric(),
        body('currentNumberOfPallets').isNumeric(),
        body('maxNumberOfPallets').isNumeric(),
    ]
};

export const getOrderNearbyTrucksValidator = () => {
    return [
        body('pickupGeoLocation').notEmpty(),
        body('pickupGeoLocation.latitude').isNumeric(),
        body('pickupGeoLocation.longitude').isNumeric(),
        body('deliveryGeoLocation').notEmpty(),
        body('deliveryGeoLocation.latitude').isNumeric(),
        body('deliveryGeoLocation.longitude').isNumeric(),
    ]
};

export const updateDefaultTruckDistanceValidator = () => {
    return [
        body('defaultDistance').isNumeric(),
    ]
};