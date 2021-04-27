import {TruckAttributes, TruckModel, TruckStatic} from "../sqlz/models/truck";
import {coordinatesDistance} from "../utils/common";
import {UserModel} from "../sqlz/models/user";
import {NearbyTruckDistanceModel} from "../sqlz/models/nearbytruckdistance";

export const getTrucksListService = async () => {
    try {
        return await TruckModel.findAll();
    } catch (e) {
        console.log("err general-service");
        throw new Error(e.message);
    }
};

export const loginRequestService = async (username, password) => {
    try {
        return await UserModel.findOne({where: {username: username, password: password}});
    } catch (e) {
        console.log("err general-service");
        throw new Error(e.message);
    }
};

export const updateTruckInfoService = async (truckInfo) => {
    try {
        console.log('truckInfo: ', truckInfo);
        await TruckModel.update({
            geo_location: {
                latitude: truckInfo.latitude,
                longitude: truckInfo.longitude
            },
            license_plate: truckInfo.licensePlate,
            allowed_weight: truckInfo.allowedWeight,
            current_cargo_weight: truckInfo.currentCargoWeight,
            current_number_of_pallets: truckInfo.currentNumberOfPallets,
            max_number_of_pallets: truckInfo.maxNumberOfPallets,
        }, {
            where: {
                id: truckInfo.id
            }
        });
        return 1
    } catch (e) {
        console.log("err general-service");
        console.error('error:' , e);
        throw new Error(e.message);
    }
};

export const getOrderNearbyTrucksService = async (orderRequestParams) => {
    try {
        const truckList = await TruckModel.findAll({raw: true});
        let nearbyDistanceRequestedKM;
        if(orderRequestParams.nearbyRadiusKM) {
            nearbyDistanceRequestedKM = orderRequestParams.nearbyRadiusKM;
        } else {
            const savedDefaultNearbyDistance = await NearbyTruckDistanceModel.findOne({where: {id: 1}});
            nearbyDistanceRequestedKM = savedDefaultNearbyDistance.default_distance;
        }
        console.log('nearbyDistanceRequestedKM', nearbyDistanceRequestedKM);
        return truckList.filter(truck => {
            return coordinatesDistance(orderRequestParams.pickupGeoLocation.latitude,  orderRequestParams.pickupGeoLocation.longitude,
                truck.geo_location.latitude, truck.geo_location.longitude, 'K') < nearbyDistanceRequestedKM;
        });
    } catch (e) {
        console.log("err general-service");
        console.error('error:' , e);
        throw new Error(e.message);
    }
};

export const updateDefaultTruckDistanceService = async (defaultDistance) => {
    try {
        await NearbyTruckDistanceModel.update({
            default_distance: defaultDistance
        }, {
            where: {
                id: 1
            }
        });
        return 1
    } catch (e) {
        console.log("err general-service");
        console.error('error:' , e);
        throw new Error(e.message);
    }
};