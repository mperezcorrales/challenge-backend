export interface GeoLocation {
    latitude: number,
    longitude: number
}

interface DeliveryRoute {
    pickupGeoLocation: GeoLocation,
    deliveryGeoLocation: GeoLocation
}

interface ShipperOrderParams {
    route: DeliveryRoute,
    totalWeight: number,
    numberOfPallets: number,
    nearbyRadiusKM?: number
}