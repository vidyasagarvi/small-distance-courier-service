import PackageDeliveryTime  from '../packageDeliveryTime.js'; // Import PackageDeliveryTime module for package delivery time calculation
import * as inquire from '../inquiry.js'; // Import inquire module for user input prompts
import chalk from 'chalk';   // Import chalk for colorful console output
import Table from 'cli-table3'; // Import cli-table3 for creating CLI tables

const packageDeliveryTimeInstance = new PackageDeliveryTime(); // Create an instance of PackageDeliveryTime

/**
 * Function to get all package delivery times
 */
const getAllPkgDeliveryTime = async () => {
  try {
    // Prompt the user to provide base price and number of packages
    const { basePrice, noOfPackages } = await inquire.askBaseCostNoOfPkgs();
    
    // Initialize an empty array to store package details
    const packageList = [];
    
    // Create a CLI table for displaying package delivery details
    const table = new Table({
      head: [
        'Package Id',
        'Discount',
        'Total Cost',
        'Estimated Delivery Time In Hour',
      ],
      colWidths: [15, 23, 18, 23],
      wordWrap: true,
    });

    // Iterate over each package to collect its details
    for (let i = 0; i < noOfPackages; i++) {
      console.log('Enter the details of package', i + 1);
      
      // Prompt the user to provide details of the current package
      const { pkgId, pkgWeightInKg, distanceInKm, offerCode } = await inquire.askQuestionsForDeliveryCost();
      
      // Add the package details to the packageList array
      packageList.push({
        pkgId,
        weight: parseInt(pkgWeightInKg),
        distance: parseInt(distanceInKm),
        offerCode,
        index: i,
      });
    }

    // Prompt the user to provide vehicle details
    const { noOfVehicles, maxCarriableCapacity, maxSpeed } = await inquire.askVehicleDetails();

    // Calculate package delivery times using PackageDeliveryTime instance
    const packageDeliveryTimes = packageDeliveryTimeInstance.getPackageDeliveryTime({
      noOfPackages,
      packageList,
      maxSpeed,
      maxCarriableCapacity,
      noOfVehicles,
      basePrice,
    });

    // Handle the scenario when packageList is empty
    if (!packageList.length) {
      console.warn(chalk.yellow('No package details provided. Please enter package information.'));
      // Handle the empty array scenario (e.g., exit the program, prompt for input)
      return; // Or throw an error if appropriate for your application logic
    }

    // Format package delivery times into a readable table
    const formattedTable = packageDeliveryTimeInstance.formatPackageDeliveryTimes(packageDeliveryTimes);

    // Add formatted table rows to the CLI table
    formattedTable.forEach(element => {
      table.push(element);
    });

    // Log a message indicating successful calculation of delivery time along with discount and price
    console.log(chalk.green('Calculated delivery time along with discount and price'));
    // Display the CLI table
    console.log(table.toString());
  } catch (error) {
    // Handle any errors that occur during the calculation process
    console.error('An error occurred while calculating delivery time:', error.message);
  }
};


export default getAllPkgDeliveryTime;
