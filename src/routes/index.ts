import * as express from 'express';
import {getOrderNearbyTrucks, getTrucksList, homeSuccessFunction, loginRequest, updateDefaultTruckDistance, updateTruckInfo} from "../controller";
import {getOrderNearbyTrucksValidator, loginRequestValidator, updateDefaultTruckDistanceValidator, updateTruckInfoValidator, validateMiddleware} from "../validations";


const router = express.Router();

router.get('/', homeSuccessFunction);
router.post('/login-request', loginRequestValidator(), validateMiddleware, loginRequest);
router.post('/update-truck-info', updateTruckInfoValidator(), validateMiddleware, updateTruckInfo);
router.post('/get-order-nearby-trucks', getOrderNearbyTrucksValidator(), validateMiddleware, getOrderNearbyTrucks);
router.get('/get-trucks-list', getTrucksList);
router.post('/update-default-truck-distance', updateDefaultTruckDistanceValidator(), validateMiddleware, updateDefaultTruckDistance);


export default router;