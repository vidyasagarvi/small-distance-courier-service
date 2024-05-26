class ShipmentCalculator {
    /**
     * Method to get the list of next possible shipments based on package list and maximum carriable capacity
     * @param {Array} packageList - List of packages
     * @param {number} maxCarriableCapacity - Maximum carriable capacity
     * @returns {Array|String} - List of next possible shipments or error message
     */
    getNextPossibleShipmentsList(packageList, maxCarriableCapacity) {
      try {
        // Check if package list is provided and not empty, and maximum carriable capacity is provided
        if (!packageList || packageList.length === 0 || !maxCarriableCapacity)
          return 'Invalid Inputs'; // Return error message if inputs are invalid
  
        let possiblePackages = []; // Array to store possible packages
        let localHighestSum = 0; // Variable to track local highest sum
        const possiblePackagesIndices = []; // Array to store indices of possible packages
  
        // Iterate over all possible subsets of packageList
        for (let i = 1; i < 1 << packageList.length; i++) {
          const weightedSubset = {}; // Object to store weighted subset
          const subset = []; // Array to store current subset
  
          // Generate current subset based on bitmask i
          for (let j = 0; j < packageList.length; j++) {
            if (i & (1 << j)) subset.push(packageList[j]); // Add package to subset if bit is set
          }
  
          weightedSubset.subset = subset; // Assign subset to weightedSubset object
  
          let temp = 0; // Variable to calculate sum of weights in current subset
  
          // Calculate sum of weights in current subset
          subset.forEach(element => (temp = element.weight + temp));
          weightedSubset.integratedSum = temp; // Assign sum to weightedSubset object
  
          // Check if current subset weight is within maxCarriableCapacity and higher than localHighestSum
          if (temp <= maxCarriableCapacity && temp >= localHighestSum) {
            localHighestSum = temp; // Update localHighestSum
            possiblePackages.push(weightedSubset); // Push weightedSubset to possiblePackages array
          }
        }
  
        // Filter possiblePackages to keep only those with integratedSum equal to localHighestSum
        possiblePackages = possiblePackages.filter(
          element => element.integratedSum === localHighestSum
        );
  
        // Convert each subset in possiblePackages to indices and push to possiblePackagesIndices array
        possiblePackages.forEach(element => {
          let temp = [];
          element.subset.forEach(ele => temp.push(ele.index));
          possiblePackagesIndices.push(temp);
        });
  
        return possiblePackagesIndices; // Return list of next possible shipments
      } catch (error) {
        console.error('An error occurred while calculating next possible shipments:', error.message);
        return 'Error occurred'; // Return error message if an error occurs
      }
    }
  }
  
  export default ShipmentCalculator;
 // Export the ShipmentCalculator class
  