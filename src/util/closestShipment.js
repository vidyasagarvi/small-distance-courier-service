class ClosestShipment {
    /**
     * Constructor to initialize ClosestShipment instance
     * @param {Array} possibleShipments - List of possible shipments
     * @param {Array} packages - List of packages
     */
    constructor(possibleShipments, packages) {
      this.possibleShipments = possibleShipments; // Initialize possible shipments
      this.packages = packages; // Initialize packages
      this.closestShipment = null; // Initialize closest shipment to null
    }
  
    /**
     * Method to find the closest shipment from the list of possible shipments
     * @returns {Array} - Closest shipment
     */
    getClosestShipment() {
      try {
        // If only one possible shipment, return it directly
        if (this.possibleShipments.length === 1) return this.possibleShipments[0];
  
        // Array to store distances for each possible shipment
        const distanceList = [];
  
        // Iterate over possible shipments to calculate distances
        for (const shipment of this.possibleShipments) {
          let distance = 0;
          // Calculate maximum distance among packages in the shipment
          for (const element of shipment) {
            distance = Math.max(distance, this.packages[element].distance);
          }
          distanceList.push(distance); // Push calculated distance to distanceList
        }
  
        // Find the index of the minimum distance in distanceList
        const closestShipmentIndex = distanceList.indexOf(Math.min(...distanceList));
  
        // Return the closest shipment from the possible shipments list
        return this.possibleShipments[closestShipmentIndex];
      } catch (error) {
        // Handle any errors that occur during the process
        console.error('An error occurred while finding the closest shipment:', error.message);
        return null; // Return null if an error occurs
      }
    }
  }

  export default ClosestShipment;
// Export the ClosestShipment class
  