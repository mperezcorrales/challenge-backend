import * as express from 'express';
import {getOrderNearbyTrucksService, getTrucksListService, loginRequestService, updateDefaultTruckDistanceService, updateTruckInfoService} from "../services";

export const homeSuccessFunction = (req: express.Request, res: express.Response) => {
    res.status(200).send({
        home: 'success'
    });
};

export const loginRequest = (req: express.Request, res: express.Response) => {
    const {username, password} = req.body;
    loginRequestService(username, password)
        .then((foundUser) => {
            if(foundUser) {
                res.status(200).send(foundUser);
            } else {
                res.sendStatus(401)
            }
        })
        .catch((err) => {
            console.error('getTrucksList err: ', err);
            res.sendStatus(500);
        })
};

export const updateTruckInfo = (req: express.Request, res: express.Response) => {
    updateTruckInfoService(req.body)
        .then((resp) => {
            res.sendStatus(200)
        })
        .catch((err) => {
            console.error('getTrucksList err: ', err);
            res.sendStatus(500);
        })
};

export const getOrderNearbyTrucks = (req: express.Request, res: express.Response) => {
    getOrderNearbyTrucksService(req.body)
        .then((nearbyTrucks) => {
            res.status(200).send(nearbyTrucks);
        })
        .catch((err) => {
            console.error('getTrucksList err: ', err);
            res.sendStatus(500);
        })
};

export const getTrucksList = (req: express.Request, res: express.Response) => {
    getTrucksListService()
        .then((trucks) => {
            res.status(200).send(trucks);
        })
        .catch((err) => {
            console.error('getTrucksList err: ', err);
            res.sendStatus(500);
        })
};

export const updateDefaultTruckDistance = (req: express.Request, res: express.Response) => {
    const {defaultDistance} = req.body;
    updateDefaultTruckDistanceService(defaultDistance)
        .then((resp) => {
            res.sendStatus(200);
        })
        .catch((err) => {
            console.error('getTrucksList err: ', err);
            res.sendStatus(500);
        })
};