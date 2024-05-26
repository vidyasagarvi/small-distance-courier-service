import offerCodes from './MockData/offerCodes.json' assert { type: 'json' };

class PackagePriceCalculator {
  // Function to check if a value is between a given range
  static isBetween(value, min, max) {
    return value >= min && value <= max;
  }

  // Function to calculate package price discount
  static getPackagePriceDiscount({
    pkgId,
    pkgWeightInKg,
    distanceInKm,
    offerCode,
    basePrice,
    costOfUnitDistance = 5,
    costOfUnitWeight = 10,
  }) {
    try {
      // Parse input values to ensure they are numbers
      pkgWeightInKg = parseInt(pkgWeightInKg);
      basePrice = parseInt(basePrice);
      distanceInKm = parseInt(distanceInKm);
      offerCode = offerCode && offerCode.toUpperCase();

      // Check for missing or invalid input parameters
      if (
        !pkgId ||
        !pkgWeightInKg ||
        !distanceInKm ||
        !costOfUnitDistance ||
        !costOfUnitWeight ||
        typeof pkgWeightInKg !== 'number' ||
        typeof distanceInKm !== 'number'
      )
      {
        return 'Please enter all the valid parameters';
      }

      // Calculate the initial price
      let price =
        basePrice +
        pkgWeightInKg * costOfUnitWeight +
        distanceInKm * costOfUnitDistance;
      let discount = 0;

      // Check if the offer code is valid
      offerCode =
        offerCode &&
        offerCode
          .split(/[ ,]+/)
          .find((element) =>
            offerCodes.hasOwnProperty(element.toUpperCase())
          );

      // If no offer code is provided, return the initial price and discount
      if (!offerCode) return { price, discount, pkgId };

      // Check if the package meets the conditions for the offer code
      if (
        PackagePriceCalculator.isBetween(
          distanceInKm,
          offerCodes[offerCode].distanceRange.min,
          offerCodes[offerCode].distanceRange.max
        ) &&
        PackagePriceCalculator.isBetween(
          pkgWeightInKg,
          offerCodes[offerCode].weightRange.min,
          offerCodes[offerCode].weightRange.max
        )
      ) {
        // Calculate the discount based on the offer code
        discount = (offerCodes[offerCode].discount / 100) * price;
        // Update the price after applying the discount
        price = price - discount;
      }

      // Return the calculated price and discount
      return { price, discount, pkgId };
    } catch (error) {
      // Handle errors during package price calculation
      console.warn(chalk.yellow('Error occurred while calculating package price:.'));
      // Return null or throw an error depending on the requirements of the application
      return null;
    }
  }
}

export default PackagePriceCalculator;
