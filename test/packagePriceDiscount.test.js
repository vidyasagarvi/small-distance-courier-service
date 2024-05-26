import { expect } from '@jest/globals';

import getPackagePriceDiscount from '../src/packagePriceDiscount.js';  



class PackagePriceDiscountTest {
  constructor() {
    this.runTests();
  }

  runTests() {
    describe('verify CalulateOffer function ', () => {
      describe('Invalid arguments, passes', () => {
        test('No offercode or no default arguments', () => {
          this.testNoOfferCodeOrDefaultArguments();
        });

        test('Invalid package details', () => {
          this.testInvalidPackageDetails();
        });

        test('Invalid offercode', () => {
          this.testInvalidOfferCode();
        });

        test('Two invalid offercodes', () => {
          this.testTwoInvalidOfferCodes();
        });
      });

      describe('valid arguments, passes', () => {
        test('NO offerCode', () => {
          this.testNoOfferCode();
        });

        test('Valid offerCode', () => {
          this.testValidOfferCode1();
        });

        test('Valid offerCode', () => {
          this.testValidOfferCode2();
        });

        test('Valid 2 or more offerCodes', () => {
          this.testValidTwoOrMoreOfferCodes();
        });
      });
    });
  }
  
  testNoOfferCodeOrDefaultArguments() {
    expect(getPackagePriceDiscount.getPackagePriceDiscount({})).toEqual('Please enter all the valid parameters');
  }

  testInvalidPackageDetails() {
    expect(
      getPackagePriceDiscount.getPackagePriceDiscount({
        pkgId: 'PKG1',
        pkgWeightInKg: 3,
        distanceInKm: 'any input',
        basePrice: 100,
        offerCode: 'OFR001',
      })
    ).toEqual('Please enter all the valid parameters');
  }

  testInvalidOfferCode() {
    expect(
      getPackagePriceDiscount.getPackagePriceDiscount({
        pkgId: 'PKG1',
        pkgWeightInKg: 3,
        distanceInKm: 5,
        basePrice: 100,
        offerCode: 'OFR01',
      })
    ).toEqual({ price: 155, discount: 0, pkgId: 'PKG1' });
  }

  testTwoInvalidOfferCodes() {
    expect(
      getPackagePriceDiscount.getPackagePriceDiscount({
        pkgId: 'PKG1',
        pkgWeightInKg: 3,
        distanceInKm: 5,
        basePrice: 100,
        offerCode: 'invalidOfferCode1, invalidOfferCode2',
      })
    ).toEqual({ price: 155, discount: 0, pkgId: 'PKG1' });
  }

  testNoOfferCode() {
    expect(
      getPackagePriceDiscount.getPackagePriceDiscount({
        pkgId: 'PKG1',
        pkgWeightInKg: 5,
        distanceInKm: 5,
        basePrice: 100,
      })
    ).toEqual({ price: 175, discount: 0, pkgId: 'PKG1' });
  }

  testValidOfferCode1() {
    expect(
      getPackagePriceDiscount.getPackagePriceDiscount({
        pkgId: 'PKG1',
        pkgWeightInKg: 15,
        distanceInKm: 5,
        basePrice: 100,
      })
    ).toEqual({ price: 275, discount: 0, pkgId: 'PKG1' });
  }

  testValidOfferCode2() {
    expect(
      getPackagePriceDiscount.getPackagePriceDiscount({
        pkgId: 'PKG1',
        pkgWeightInKg: 155,
        distanceInKm: 50,
        offerCode: 'OFR002',
        basePrice: 100,
      })
    ).toEqual({ price: 1767, discount: 133, pkgId: 'PKG1' });
  }

  testValidTwoOrMoreOfferCodes() {
    expect(
      getPackagePriceDiscount.getPackagePriceDiscount({
        pkgId: 'PKG1',
        pkgWeightInKg: 155,
        distanceInKm: 50,
        offerCode: 'OFR002 OFR003',
        basePrice: 100,
      })
    ).toEqual({ price: 1767, discount: 133, pkgId: 'PKG1' });
  }
}

// Instantiate the PackagePriceDiscountTest class to run the tests
new PackagePriceDiscountTest();
