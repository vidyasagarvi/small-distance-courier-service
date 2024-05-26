import { expect } from '@jest/globals';
import getNextPossibleShipmentsList from '../src/util/nextPossibleShipmentList.js'

class ShipmentTest {
  constructor() {
    this.shipmentCalculator = new getNextPossibleShipmentsList();
    this.runTests();
  }

  runTests() {
    describe('verify calculate find next potential weights to be function', () => {
      describe('Invalid arguments', () => {
        test('No input array or no individual values, passes ', () => {
          this.testInvalidArguments();
        });
      });

      describe('Valid arguments', () => {
        test('Valid input array, passes ', () => {
          this.testValidArguments1();
        });
        test('Valid input array, passes ', () => {
          this.testValidArguments2();
        });
        test('Valid input array, passes ', () => {
          this.testValidArguments3();
        });
      });
    });
  }

  testInvalidArguments() {
    expect(this.shipmentCalculator.getNextPossibleShipmentsList([], 200)).toEqual('Invalid Inputs');
  }

  testValidArguments1() {
    expect(
      this.shipmentCalculator.getNextPossibleShipmentsList(
        [
          { weight: 100, index: 0 },
          { weight: 75, index: 1 },
          { weight: 175, index: 2 },
          { weight: 1, index: 3 },
          { weight: 155, index: 4 },
        ],
        200
      )
    ).toEqual([
      [0, 1, 3],
      [2, 3],
    ]);
  }

  testValidArguments2() {
    expect(
      this.shipmentCalculator.getNextPossibleShipmentsList(
        [
          { weight: 50, index: 0 },
          { weight: 75, index: 1 },
          { weight: 175, index: 2 },
          { weight: 110, index: 3 },
          { weight: 155, index: 4 },
        ],
        200
      )
    ).toEqual([[1, 3]]);
  }

  testValidArguments3() {
    expect(
      this.shipmentCalculator.getNextPossibleShipmentsList(
        [
          { weight: 50, index: 0 },
          { weight: 60, index: 1 },
          { weight: 175, index: 2 },
          { weight: 110, index: 3 },
          { weight: 155, index: 4 },
        ],
        200
      )
    ).toEqual([[2]]);
  }
}

// Instantiate the ShipmentTest class to run the tests
new ShipmentTest();
