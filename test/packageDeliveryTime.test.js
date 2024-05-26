import { expect } from '@jest/globals';
import PackageDeliveryTime  from '../src/packageDeliveryTime.js';

const packageDeliveryTimeInstance = new PackageDeliveryTime();

class PackageDeliveryTimeTest {
  constructor() {
    this.runTests();
  }

  runTests() {
    describe('verify calculate Duration function', () => {
      describe('Invalid arguments, passes', () => {
        test('No input array or no individual values', () => {
          this.testInvalidArguments();
        });
      });

      describe('Valid arguments, passes', () => {
        test('Valid inputs with no possible same weight shipments', () => {
          this.testValidArguments1();
        });
        test('Valid inputs with possible different weight packages', () => {
          this.testValidArguments2();
        });
      });
    });
  }

  testInvalidArguments() {
    expect(
      packageDeliveryTimeInstance.getPackageDeliveryTime({
        packageList: [],
      })
    ).toEqual('Please provide all the required input parameters.');
  }

  testValidArguments1() {
    expect(
      packageDeliveryTimeInstance.getPackageDeliveryTime({
        noOfPackages: 5,
        packageList: [
          {
            pkgId: 'PKG1',
            weight: 50,
            index: 0,
            distance: 30,
            offerCode: 'OFR0061',
          },
          {
            pkgId: 'PKG2',
            weight: 75,
            index: 1,
            distance: 125,
            offerCode: 'OFR0008',
          },
          {
            pkgId: 'PKG3',
            weight: 175,
            index: 2,
            distance: 100,
            offerCode: 'OFR0002',
          },
          {
            pkgId: 'PKG4',
            weight: 110,
            index: 3,
            distance: 60,
            offerCode: 'NA',
          },
          {
            pkgId: 'PKG5',
            weight: 155,
            index: 4,
            distance: 95,
            offerCode: 'OFR004',
          },
        ],
        maxSpeed: 70,
        noOfVehicles: 2,
        maxCarriableCapacity: 200,
        basePrice: 100,
      })
    ).toEqual([
      { duration: 1.78, pkgId: 'PKG2', deliveryCost: 1475, discount: 0 },
      { duration: 0.85, pkgId: 'PKG4', deliveryCost: 1500, discount: 0 },
      { duration: 1.42, pkgId: 'PKG3', deliveryCost: 2350, discount: 0 },
      { duration: 4.18, pkgId: 'PKG5', deliveryCost: 2125, discount: 0 },
      { duration: 3.98, pkgId: 'PKG1', deliveryCost: 750, discount: 0 },
    ]);
  }

  testValidArguments2() {
    expect(
      packageDeliveryTimeInstance.getPackageDeliveryTime({
        noOfPackages: 5,
        packageList: [
          {
            pkgId: 'PKG1',
            weight: 100,
            index: 0,
            distance: 30,
            offerCode: 'OFR0004',
          },
          {
            pkgId: 'PKG2',
            weight: 75,
            index: 1,
            distance: 125,
            offerCode: 'OFR0004',
          },
          {
            pkgId: 'PKG3',
            weight: 175,
            index: 2,
            distance: 100,
            offerCode: 'OFR0004',
          },
          {
            pkgId: 'PKG4',
            weight: 40,
            index: 3,
            distance: 60,
            offerCode: 'OFR0040',
          },
          {
            pkgId: 'PKG5',
            weight: 155,
            index: 4,
            distance: 95,
            offerCode: 'OFR0040',
          },
        ],
        maxSpeed: 70,
        noOfVehicles: 2,
        maxCarriableCapacity: 200,
        basePrice: 100,
      })
    ).toEqual([
      { deliveryCost: 800, discount: 0, duration: 0.85, pkgId: 'PKG4' },
      { deliveryCost: 2125, discount: 0, duration: 1.35, pkgId: 'PKG5' },
      { deliveryCost: 2350, discount: 0, duration: 1.42, pkgId: 'PKG3' },
      { deliveryCost: 1250, discount: 0, duration: 3.12, pkgId: 'PKG1' },
      { deliveryCost: 1475, discount: 0, duration: 4.48, pkgId: 'PKG2' },
    ]);
  }
}

// Instantiate the PackageDeliveryTimeTest class to run the tests
new PackageDeliveryTimeTest();
