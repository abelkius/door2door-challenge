import express from 'express';
import {vehicleRouter} from './resources/vehicle';
import {apiErrorHandler} from './modules/apiErrorHandler';

export const restRouter = express.Router();

restRouter.use('/vehicles', vehicleRouter);
restRouter.use(apiErrorHandler);
