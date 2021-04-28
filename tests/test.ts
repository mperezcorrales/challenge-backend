import {expect} from 'chai';
import 'mocha';
import {coordinatesDistance, getRandomInt} from "../src/utils/common";
import {NearbyTruckDistanceModel} from "../src/sqlz/models/nearbytruckdistance";
import {getOrderNearbyTrucksService, updateDefaultTruckDistanceService} from "../src/services";
import {TruckModel} from "../src/sqlz/models/truck";

describe('Common utils tests', function () {
    describe('Testing coordinatesDistance', function () {
        it('Same position returns 0 distance', function () {
            const distanceFound = coordinatesDistance(52.3, 4.97, 52.3, 4.97, 'K');
            expect(distanceFound).to.equal(0);
        });
        it('Verifying google maps measured distance is between expected range', function () {
            const distanceFound = coordinatesDistance(52.352, 4.901, 52.304, 4.960, 'K');
            expect(distanceFound).to.lessThan(7).and.greaterThan(6.5);
        });
    });
});

describe('Update truck info tests tests', function () {

    let savedDefaultNearbyDistance: number;
    let addedTruckId;

    before('Getting initial nearby distance', async () => {
        const savedDefaultNearbyDistanceResp = await NearbyTruckDistanceModel.findOne({where: {id: 1}});
        savedDefaultNearbyDistance = savedDefaultNearbyDistanceResp.default_distance;
        console.log('savedDefaultNearbyDistance', savedDefaultNearbyDistance)
        return;
    });

    before('Creating test truck', async () => {
        const createdTruck = await TruckModel.create({
            geo_location: {latitude: -12.117, longitude: -77.0275},
            license_plate: 'ABC-123',
            allowed_weight: 20,
            current_cargo_weight: 10,
            current_number_of_pallets: 8,
            max_number_of_pallets: 4
        });
        addedTruckId = createdTruck.id;

        return;
    });

    describe('Testing correct updates', function () {
        it('Updates value correctly in db', async function () {
            const valueToUpdate: number = getRandomInt(30);
            await updateDefaultTruckDistanceService(valueToUpdate);
            const savedTruckDistanceResp = await NearbyTruckDistanceModel.findOne({where: {id: 1}});
            const distance = savedTruckDistanceResp.default_distance;
            // @ts-ignore --> added due to https://github.com/sequelize/sequelize/issues/4870#issuecomment-157311158
            expect(parseFloat(distance)).to.equal(valueToUpdate);
            return;
        });
    });

    describe('Testing updates to default nearby distance changes returned trucks', function () {
        it('Testing with a default nearby range of 20km where it should find the test truck', async function () {
            console.log('Trucks distance: ', coordinatesDistance(-12.117, -77.0275, -12.0568, -76.983, 'K'));
            await updateDefaultTruckDistanceService(10);
            const nearbyTrucks = await getOrderNearbyTrucksService({
                pickupGeoLocation: {
                    latitude: -12.0568,
                    longitude: -76.983
                },
                deliveryGeoLocation: {
                    latitude: -12.5568,
                    longitude: -77.283
                }
            });
            console.log('nearbyTrucks', nearbyTrucks)
            expect(nearbyTrucks.length).to.greaterThanOrEqual(1);

            return;
        });

        it('Testing with a default nearby range of 10 km where it should NOT find the test truck', async function () {
            await updateDefaultTruckDistanceService(5);
            const nearbyTrucks = await getOrderNearbyTrucksService({
                pickupGeoLocation: {
                    latitude: -12.0568,
                    longitude: -76.983
                },
                deliveryGeoLocation: {
                    latitude: -12.5568,
                    longitude: -77.283
                }
            });
            expect(nearbyTrucks.length).to.equal(0);

            return;
        });
    });

    after('Resetting to initial nearby distance', async () => {
        await updateDefaultTruckDistanceService(savedDefaultNearbyDistance);
        return;
    });

    after('Deleting test truck', async () => {
        await TruckModel.destroy({
            where: {
                id: addedTruckId
            }
        });
        return;
    });
});