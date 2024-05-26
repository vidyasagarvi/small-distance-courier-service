import * as inquire from '../inquiry.js';  // Import inquire module for user input prompts

import offerCodes from '../MockData/offerCodes.json' assert { type: 'json' }; // Import offerCodes JSON file

import AddNewOfferCode  from '../addOfferCodes.js'; // Import AddNewOfferCode module for adding new offer codes
import GetAllOfferCodes from './getAllOfferCodes.js'; // Import GetAllOfferCodes module for displaying all offer codes

class PutNewOfferCode {
  /**
   * Constructor to initialize AddNewOfferCode and GetAllOfferCodes instances
   */
  constructor() {
    this.addNewOfferCode = new AddNewOfferCode(); // Create an instance of AddNewOfferCode
    this.getAllOfferCodes = new GetAllOfferCodes(offerCodes); // Create an instance of GetAllOfferCodes
  }

  /**
   * Function to execute the process of adding a new offer code
   */
  async execute() {
    try {
      // Prompt the user to provide details of the new offer code
      const { offerId, discount, minWeight, maxWeight, minDistance, maxDistance } = await inquire.askNewOfferDetails();

      // Log the details of the new offer code to the console
      console.log('New offer details:', offerId, discount, minWeight, maxWeight, minDistance, maxDistance);

      // Add the new offer code
      this.addNewOfferCode.addNewOffer({
        offerId,
        discount,
        minWeight,
        maxWeight,
        minDistance,
        maxDistance,
      });

      // Display all offer codes after adding the new one
      this.getAllOfferCodes.displayAllOfferCodes();
    } catch (error) {
      // Handle any errors that occur during the execution of adding a new offer code
      console.error('An error occurred while adding a new offer code:', error.message);
    }
  }
}

export default PutNewOfferCode;
// Export the PutNewOfferCode class
