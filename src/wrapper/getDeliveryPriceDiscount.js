import * as inquire from '../inquiry.js'; // Import inquiry module for user input prompts

import Table from 'cli-table3';  // Import cli-table3 for creating CLI tables


import PackagePriceCalculator from '../packagePriceDiscount.js';  // Import PackagePriceCalculator module for calculating package price discount

import chalk from 'chalk';  // Import chalk for colorful console output

class DeliveryPriceCalculator {
  async calculateDeliveryPriceDiscount() {
    try {
      // Prompt the user to provide base price and number of packages
      const { basePrice, noOfPackages } = await inquire.askBaseCostNoOfPkgs();

      // Create a CLI table for displaying package discounts and prices
      const table = new Table({
        head: ['Package Id', 'Discount', 'Total cost'],
        colWidths: [15, 23, 18],
        wordWrap: true,
      });

      // Iterate over each package to calculate its discount and price
      for (let index = 0; index < noOfPackages; index++) {
        console.log('Enter details of package', index + 1);

        // Prompt the user to provide details of the current package
        const { pkgId, pkgWeightInKg, distanceInKm, offerCode } =
          await inquire.askQuestionsForDeliveryCost();

        // Check if any required information is missing
        if (!pkgId || !pkgWeightInKg || !distanceInKm || !offerCode || !basePrice) {
          console.warn(chalk.yellow('Please provide all required information'));
          // Handle the empty values according to your application logic (e.g., prompt user for input, throw an error, return default values)
          return; // or throw new Error('Please provide all required information');
        }

        // Calculate the package price discount
        const pkgPriceDiscount = PackagePriceCalculator.getPackagePriceDiscount({
          pkgId,
          pkgWeightInKg,
          distanceInKm,
          offerCode,
          basePrice,
        });

        // Add the package discount and price to the table
        if (pkgPriceDiscount.discount !== undefined) {
          table.push([
            pkgPriceDiscount.pkgId,
            pkgPriceDiscount.discount,
            pkgPriceDiscount.price,
          ]);
        } else {
          table.push(['entered', 'details', 'are not valid']);
        }
      }

      // Log a message indicating that discount and price have been calculated
      console.log(chalk.green('calculated discount and price'));
      // Display the table of package discounts and prices
      console.log(table.toString());
    } catch (error) {
      // Handle any errors that occur during the calculation process
      console.error('An error occurred while calculating discount and price:', error.message);
    }
  }
}

export default DeliveryPriceCalculator;
