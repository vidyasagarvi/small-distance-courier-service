import getNextPossibleShipmentsList from '../src/util/nextPossibleShipmentList.js';
import getClosestShipment from './util/closestShipment.js';
import getPackagePriceDiscount  from './packagePriceDiscount.js';
import truncate  from './util/truncate.js';

class PackageDeliveryTime {
  constructor() {
    // Initialize the shipment calculator utility
    this.shipmentCalculator = new getNextPossibleShipmentsList();
  }



  getPackageDeliveryTime({
    noOfPackages,
    packageList,
    noOfVehicles,
    maxSpeed,
    maxCarriableCapacity,
    basePrice,
  }) {
    try {
      // Check for missing or invalid input parameters
      
      if (
        !noOfPackages ||
        !packageList ||
        !maxSpeed ||
        !noOfVehicles ||
        !maxCarriableCapacity
      ){
        return 'Please provide all the required input parameters.';
      }
 
      const vehicleAvailabilityArray = Array(parseInt(noOfVehicles)).fill(0);
      let newUpdatedPackageList = [...packageList];
      let packagesWithDuration = [];

      while (newUpdatedPackageList.length > 0) {
        // Get the list of possible shipments for the current set of packages

        const possibleShipmentList = this.shipmentCalculator.getNextPossibleShipmentsList(
          newUpdatedPackageList,
          maxCarriableCapacity
        );

         // Find the closest shipment based on the possible shipment list

        const nextDeliveryManager = new getClosestShipment(possibleShipmentList, packageList);
        const closestShipment = nextDeliveryManager.getClosestShipment();
        const nextDelivery = closestShipment;

        // Calculate the earliest available time for the next delivery


        const nextAvailabeAt = Math.min(...vehicleAvailabilityArray);
        let durationForSingleTrip = 0;
        
        // Iterate over each package in the next delivery
        nextDelivery.forEach(element => {
          let currentPackage = packageList[element];
          let calculatedTimeOfPkg = {};
         
          // Calculate the delivery time for the current package
          let deliveryTime = truncate(packageList[element].distance / maxSpeed);
          currentPackage.duration = truncate(nextAvailabeAt + deliveryTime);
          calculatedTimeOfPkg.duration = truncate(nextAvailabeAt + deliveryTime);
          calculatedTimeOfPkg.pkgId = currentPackage.pkgId;
          
    
          // Calculate the package price discount
          const packagePriceDiscount = getPackagePriceDiscount.getPackagePriceDiscount({
            pkgId: currentPackage.pkgId,
            pkgWeightInKg: currentPackage.weight,
            distanceInKm: currentPackage.distance,
            basePrice: basePrice,
            offerCode: currentPackage.offerCode,
          });

          // Assign calculated delivery cost and discount to the package

          calculatedTimeOfPkg.deliveryCost = truncate(packagePriceDiscount.price);
          calculatedTimeOfPkg.discount = truncate(packagePriceDiscount.discount);
         
          // Update the duration for single trip if needed
          durationForSingleTrip = Math.max(deliveryTime, durationForSingleTrip);
          packagesWithDuration.push(calculatedTimeOfPkg);
        });

       // Update the availability array with the next available time slots for vehicles
        vehicleAvailabilityArray[vehicleAvailabilityArray.indexOf(nextAvailabeAt)] =
          nextAvailabeAt + 2 * durationForSingleTrip;

          // Remove processed packages from the updated package list
          newUpdatedPackageList = newUpdatedPackageList.filter(
          element => element.duration === undefined
        );
      }
     
      // Return the list of packages with calculated delivery times
      return packagesWithDuration;
    } catch (error) {
      // Handle errors during package delivery time calculation
      console.error('Error occurred while calculating Time:', error.message);
      return [];
    }
  }

  // Format the package delivery times into a table format

  formatPackageDeliveryTimes(packageDeliveryTimes) {
    const table = [];

    packageDeliveryTimes.forEach(element => {
      if (element.duration === undefined) {
        table.push(['Please enter ', 'valid data', 'inputs']);
      } else {
        table.push([
          element.pkgId,
          element.discount,
          element.deliveryCost,
          element.duration,
        ]);
      }
    });
// Return the formatted table
    return table;
  }

}

export default PackageDeliveryTime;
