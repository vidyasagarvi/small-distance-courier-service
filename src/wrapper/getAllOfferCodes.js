import chalk from 'chalk';  // Import chalk for colorful console output
import Table from 'cli-table3';  // Import cli-table3 for creating CLI tables


class OfferCodeTable {
  constructor(offerCodes) {
    // Initialize OfferCodeTable with existing offer codes
    this.offerCodes = offerCodes;
    // Create a CLI table for displaying offer codes
    this.table = new Table({
      head: [
        'Offer Id',
        'Discount%',
        'Minimum Weight',
        'Maximum Weight',
        'Minimum Distance',
        'Maximum Distance',
      ],
      colWidths: [15, 18, 18, 18, 18, 18],
      wordWrap: true,
    });
  }

  // Function to display all existing offer codes
  displayAllOfferCodes() {
    try {
     
      // Log a message indicating that existing offer codes will be displayed
      console.log(chalk.green('All the existing offer codes'));

      // Iterate over each offer code and add its details to the table
      Object.keys(this.offerCodes).forEach(element => {
        const offer = this.offerCodes[element];
        this.table.push([
          element,
          offer.discount,
          offer.distanceRange.min,
          offer.distanceRange.max,
          offer.weightRange.min,
          offer.weightRange.max,
        ]);
      });

      // Display the table of offer codes
      console.log(this.table.toString());
    } catch (error) {
      // Handle any errors that occur during the display process
      console.error('Error occurred while displaying offer codes:', error.message);
    }
  }
}

export default OfferCodeTable;

