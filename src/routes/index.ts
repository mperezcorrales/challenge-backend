import * as express from 'express';
import {getOrderNearbyTrucks, getTrucksList, homeSuccessFunction, loginRequest, updateDefaultTruckDistance, updateTruckInfo} from "../controller";

const router = express.Router();

router.get('/', homeSuccessFunction);
router.post('/login-request', loginRequest);
router.post('/update-truck-info', updateTruckInfo);
router.post('/get-order-nearby-trucks', getOrderNearbyTrucks);
router.get('/get-trucks-list', getTrucksList);
router.post('/update-default-truck-distance', updateDefaultTruckDistance);

export default router;