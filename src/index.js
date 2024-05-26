// Import necessary modules and dependencies

import * as inquire from './inquiry.js';

// Import JSON file containing existing offer codes

import offerCodes from './MockData/offerCodes.json' assert { type: 'json' };
// Import wrapper classes and functions
import OfferCodeTable from './wrapper/getAllOfferCodes.js';

import DeliveryPriceCalculator from './wrapper/getDeliveryPriceDiscount.js';

import getAllPkgDeliveryTime  from './wrapper/getDeliveryTime.js';

import PutNewOfferCode  from './wrapper/putNewOffer.js';

// Instantiate DeliveryPriceCalculator for calculating delivery price discounts
const deliveryPriceCalculator = new DeliveryPriceCalculator()


class AppRunner {
     
// Initialize OfferCodeTable and PutNewOfferCode instances

  constructor() {

    this.offerCodeTable = new OfferCodeTable(offerCodes);
    this.putNewOfferCode = new PutNewOfferCode();

    // Start the application

    this.runApp();
  }

    // Method to run the application

  async runApp() {
    try {
      // Prompt the user for the type of functionality they want to perform
       const { typeOfFunctionality } = await inquire.askTypeFunction();

       // Perform actions based on user's choice
        switch (typeOfFunctionality) {
        case 'Calculate delivery cost': 
         
        // Calculate delivery price discounts

          await deliveryPriceCalculator.calculateDeliveryPriceDiscount();
          break;
        case 'Calculate delivery time':
          // Calculate package delivery times
         await getAllPkgDeliveryTime(); 
          break;
        case 'Get all existing offers code':
          // Display all existing offer codes
          this.offerCodeTable.displayAllOfferCodes();
          break;
        case 'Add new offer code':
          // Add a new offer code
          await this.putNewOfferCode.execute();
          break;
        case 'Exit':
           // Exit the application
          process.exit(0);
          break;
        default:
          break;
      }
      // Repeat the application process
      this.runApp();
    } catch (error) {
       // Handle errors that may occur during execution
      console.error('An error occurred:', error);
    }
  }
}

// Instantiate the AppRunner class to start the application
new AppRunner();
