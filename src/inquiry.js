import inquirer from 'inquirer';


export const askQuestionsForDeliveryCost = () => {
		const deliveryCostquestions = [
			{
				name: 'details',
				type: 'input',
				message: 'Enter package details in the format: pkg_id pkg_weight_in_kg distance_in_km offer_code',
				validate: function (value) {
					const parts = value.trim().split(/\s+/);
					if (parts.length === 4 && parts.every(part => part.length > 0)) {
						const [pkgId, pkgWeightInKg, distanceInKm] = parts;
						if (isNaN(pkgWeightInKg) || isNaN(distanceInKm)) {
							return 'Please enter valid numeric values for package weight and distance';
						}
						return true;
					} else {
						return 'Please provide exactly four values separated by spaces: pkgId pkgWeightInKg distanceInKm offerCode';
					}
				},
			},
		];
		return inquirer.prompt(deliveryCostquestions).then((answers) => {
			const [pkgId, pkgWeightInKg, distanceInKm, offerCode] = answers.details.trim().split(/\s+/);
			return { pkgId, pkgWeightInKg: parseFloat(pkgWeightInKg), distanceInKm: parseFloat(distanceInKm), offerCode };
		});
	};
	export const askTypeFunction = () => {
		const questions = [
			{
				type: 'list',
				name: 'typeOfFunctionality',
				message: 'calculate delivery cost or delivery time for the packages',
				choices: [
					'Calculate delivery cost',
					'Calculate delivery time',
					'Get all existing offers code',
					'Add new offer code',
					'Exit',
				],
				default: 'Calculate delivery cost',
			},
		]
		return inquirer.prompt(questions)
	};
	export const askBaseCostNoOfPkgs = () => {
		const questions = [
			{
				type: 'input',
				name: 'details',
				message: 'Enter the base delivery cost and the number of packages in the format: base_delivery_cost no_of_packge',
				validate: function (value) {
					const parts = value.trim().split(/\s+/);
					if (parts.length === 2 && parts.every(part => part.length > 0)) {
						const [basePrice, noOfPackages] = parts;
						if (isNaN(basePrice) || isNaN(noOfPackages)) {
							return 'Please enter valid numeric values for the base delivery cost and the number of packages';
						}
						return true;
					} else {
						return 'Please provide exactly two values separated by spaces: basePrice noOfPackages';
					}
				},
			},
		];
		return inquirer.prompt(questions).then((answers) => {
			const [basePrice, noOfPackages] = answers.details.trim().split(/\s+/);
			return { basePrice: parseFloat(basePrice), noOfPackages: parseInt(noOfPackages) };
		});
	};
	export const askVehicleDetails = () => {
		const questions = [
			{
				type: 'input',
				name: 'details',
				message: 'Enter vehicle details in the format: no_of_vehicles max_speed max_carriable_weight',
				validate: function (value) {
					const parts = value.trim().split(/\s+/);
					if (parts.length === 3 && parts.every(part => part.length > 0)) {
						const [noOfVehicles, maxSpeed, maxCarriableCapacity] = parts;
						if (isNaN(noOfVehicles) || isNaN(maxSpeed) || isNaN(maxCarriableCapacity)) {
							return 'Please enter valid numeric values for the number of vehicles, maximum speed, and maximum carriable capacity';
						}
						return true;
					} else {
						return 'Please provide exactly three values separated by spaces: noOfVehicles maxSpeed maxCarriableCapacity';
					}
				},
			},
		];
		return inquirer.prompt(questions).then((answers) => {
			const [noOfVehicles, maxSpeed, maxCarriableCapacity] = answers.details.trim().split(/\s+/);
			return { noOfVehicles: parseInt(noOfVehicles), maxSpeed: parseFloat(maxSpeed), maxCarriableCapacity: parseFloat(maxCarriableCapacity) };
		});
	};
	export const askNewOfferDetails = () => {
		const questions = [
			{
				type: 'input',
				name: 'offerId',
				message: 'Please Enter the Id of the offer you would give,',
				validate: function (value) {
					if (value.length) {
						return true
					} else {
						return 'Please Enter the Id of the offer you would give'
					}
				},
			},
			{
				type: 'input',
				name: 'discount',
				message: 'Please Enter the discount',
				validate: function (value) {
					if (value.length && typeof parseInt(value) == 'number') {
						return true
					} else {
						return 'Please enter the discount'
					}
				},
			},
			{
				type: 'input',
				name: 'minWeight',
				message: 'Please Enter the minimum weight of the package',
				validate: function (value) {
					if (value.length && typeof parseInt(value) == 'number') {
						return true
					} else {
						return 'Please enter minimum weight of the package'
					}
				},
			},
			{
				type: 'input',
				name: 'maxWeight',
				message: 'Please Enter the maximum weight of the package',
				validate: function (value) {
					if (value.length && typeof parseInt(value) == 'number') {
						return true
					} else {
						return 'Please enter maximum weight of the package'
					}
				},
			},
			{
				type: 'input',
				name: 'minDistance',
				message: 'Please Enter the minimum distance of the package',
				validate: function (value) {
					if (value.length && typeof parseInt(value) == 'number') {
						return true
					} else {
						return 'Please enter minimum distance of the package'
					}
				},
			},
			{
				type: 'input',
				name: 'maxDistance',
				message: 'Please Enter the maximum distance of the package',
				validate: function (value) {
					if (value.length && typeof parseInt(value) == 'number') {
						return true
					} else {
						return 'Please enter maximum distance of the package'
					}
				},
			},
		]
		return inquirer.prompt(questions)
	};
