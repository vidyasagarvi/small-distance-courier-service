import * as fs from 'fs';
import offerCodes from './MockData/offerCodes.json' assert { type: 'json' };


class AddNewOfferCode {
  constructor() {
    // Load existing offer codes from offerCodes.json file
    //this.offerCodes = require('./offerCodes.json');
    this.offerCodes = offerCodes;

  }

  // Function to add a new offer code
  addNewOffer({
    offerId,
    discount,
    minWeight,
    maxWeight,
    minDistance,
    maxDistance,
  }) {
    try {
      // Parse input values to ensure they are numbers
      discount = parseInt(discount);
      minWeight = parseInt(minWeight);
      maxWeight = parseInt(maxWeight);
      minDistance = parseInt(minDistance);
      maxDistance = parseInt(maxDistance);

      // Check for missing or invalid input parameters
      if (
        !offerId ||
        !discount ||
        !minWeight ||
        !maxWeight ||
        !minDistance ||
        !maxDistance
      )
        throw new Error('Please enter all valid inputs');

      // Add the new offer code to the offerCodes object
      this.offerCodes[offerId.toUpperCase()] = {
        discount,
        distanceRange: {
          min: minDistance,
          max: maxDistance,
        },
        weightRange: {
          min: minWeight,
          max: maxWeight,
        },
      };

      // Write the updated offerCodes object to the offerCodes.json file
      fs.writeFile('src/MockData/offerCodes.json', JSON.stringify(this.offerCodes), (err) => {
        if (err) throw err;
      });

      // Log a success message to the console
      console.log('Offer added successfully');

      // Return null or throw an error depending on the requirements of the application
      return null;
    } catch (error) {
      // Handle errors during adding new offer code
      console.error('Error occurred while adding new offer code:', error.message);
      // Return null or throw an error depending on the requirements of the application
      return null;
    }
  }
}

export default AddNewOfferCode;
