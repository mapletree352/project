var data = {};

data.statuses = [
	['D', 'Draft'],
	['S', 'Submitted'],
	['R', 'Recommended'],
	['A', 'Approved'],
	['AC', 'Accepted'],
	['C', 'Confirmed'],
	['CO', 'Completed'],
	['CA', 'Cancelled'],
	['RE', 'Rejected'],
].map(function(element) {
	return {
		code: element[0],
		name: element[1]
	};
});

data.taskStatuses = [
	[1601, 'Pending'],
	[1602, 'Executing'],
	[1603, 'Completed'],
	[1605, 'Cancelled'],
	[1606, 'Unfulfilled']
].map(function(element) {
	return {
		id: element[0],
		name: element[1]
	};
});

data.surveyStatuses = [
	['X', 'Not Required'],
	['C', 'Completed'],
	['P', 'Pending'],
	['O', 'Outstanding']
].map(function(element) {
	return {
		code: element[0],
		name: element[1]
	};
});

data.towTypes = [
	[2, '1.5 TON CARGO TRAILER'],
	[1, '1/2 TON CARGO TRAILER'],
	[21, '20-FT FLAT BED'],
	[81, '60 FT TRAILER'],
	[79, 'ASSAULT BOAT TRAILER'],
	[8, 'BOAT TRAILER'],
	[77, 'CPSS TRAILER (CBRE)'],
	[23, 'CARGO GIRDER BRIDGE'],
	[22, 'COMMAND POST'],
	[3, 'FH 2000'],
	[4, 'FH 88'],
	[20, 'FUEL TANKER TRAILER'],
	[15, 'GRS'],
	[9, 'GENERATOR'],
	[11, 'GENERATOR/PCV TRAILER'],
	[16, 'GUNS'],
	[71, 'JACO DRILL TRAILER'],
	[5, 'M71S'],
	[76, 'MDPS TRAILER (CBRE)'],
	[80, 'MISSILE TRAILER'],
	[12, 'MPDS'],
	[19, 'MTV TRAILER'],
	[17, 'MOBILE FIELD UNIT'],
	[70, 'MOBILE GROUND DATA TERMINAL TRAILER'],
	[6, 'MORTAR'],
	[0, 'NO TOWING'],
	[75, 'PET TRAILER (CBRE)'],
	[10, 'PET TRAILER'],
	[73, 'RTCV TRAILER'],
	[25, 'SLWH'],
	[74, 'STEAM GENERATOR TRAILER'],
	[52, 'STEE TOW TYPE 1'],
	[78, 'TCV TRAILER (CBRE)'],
	[26, 'TPQ'],
	[14, 'TPQ 36'],
	[72, 'TSVC TRAILER'],
	[24, 'WATER TANK (L/R)'],
	[18, 'WATER TRAILER']
].map(function(element) {
	return {
		id: element[0],
		name: element[1]
	};
});

data.proficiencies1 = [
	[405, 'ATP'],
	[51, 'CHEMICAL DEFENCE'],
	[302, 'CLASS 2B (COMMERCIAL)'],
	[303, 'CLASS 3 (COMMERCIAL)'],
	[304, 'CLASS 4 (COMMERCIAL)'],
	[48, 'CLASS 4S'],
	[301, 'CLASS 5 (COMMERCIAL)'],
	[406, 'DRIVER GUIDE'],
	[49, 'FORKLIFT'],
	[404, 'HMCT'],
	[322, 'HYDRAULIC TAILGATE'],
	[400, 'OPERATE HYDRAULIC CRANE'],
	[999, 'NOT REQUIRED']
].map(function(element) {
	return {
		id: element[0],
		name: element[1]
	};
});

data.vehClasses = [
	[1, '2'],
	[2, '2A'],
	[3, '2AX'],
	[4, '2B'],
	[5, '2BX'],
	[6, '2X'],
	[7, '3'],
	[8, '3/4'],
	[9, '3/4X'],
	[10, '3X'],
	[11, '4'],
	[12, '4S'],
	[13, '4SH'],
	[14, '4T'],
	[15, '4X'],
	[16, '5'],
	[17, '5T'],
	[18, '5X'],
	[19, 'FL1'],
	[20, 'ML1'],
 ].map(function(element) {
    	return {
    		id: element[0],
    		name: element[1]
    	};
 });

data.mileageIncentiveStatuses = [
  	['1', 'PENDING'], 
  	['2', 'CLAIMED'], 
  	['3', 'CLAIMED (3k)'], 
  	['4', 'UNCLAIMED'],
  	['5', 'RESET']
  ].map(function (element) {
  	return {
  		code: element[0],
  		name: element[1]
  	};
  });

data.indents = [
	[1, 'Training - Company Training', 'Attachment', 'Out Camp', '2 May 2016, 23:30', 12, 'YES', 'CLEMENTI CAMP', 'BLOCK A', '', '', 4, 4, [[1, 3, 3, '3 TON BCP', 'Vehicle and Transport Operator'], [2, 1, 0, '10 TON', 'Vehicle Only']]],
	[2, 'Training - Company Training', 'Attachment', 'Out Camp', '3 May 2016, 00:00', 12, 'YES', 'CLEMENTI CAMP', 'BLOCK A', '', '', 4, 4, [[1, 3, 3, '3 TON BCP', 'Vehicle and Transport Operator']]],
	[3, 'Training - Company Training', 'Attachment', 'Out Camp', '4 May 2016, 00:00', 12, 'YES', 'CLEMENTI CAMP', 'BLOCK A', '', '', 4, 4, [[1, 3, 3, '3 TON BCP', 'Vehicle and Transport Operator']]],
	[4, 'Training - Company Training', '1-Way', 'Out Camp', '2 May 2016, 00:00', 2, 'NO', 'CLEMENTI MRT', 'PICKUP POINT', 'CLEMENTI CAMP', 'BLOCK A', 0, 0.5, [[1, 3, '3 TON BCP', 'Vehicle and Transport Operator']]]
].map(function (element) {
	return {
		id: element[0],
		subActivity: element[1],
		type: element[2],
		movement: element[3],
		reportTime: element[4],
		duration: element[5],
		preParking: element[6],
		reportVenue: element[7],
		reportInfo: element[8],
		destinationVenue: element[9],
		destinationInfo: element[10],
		manDays: element[11],
		credits: element[12],
		resources: element[13].map(function (element) {
			return {
				id: element[0],
				quantity: element[1],
				credits: element[2],
				vehicleType: element[3],
				resourceType: element[4]
			};
		})
	};
});

data.resources = [
	[1, 3, 3, 4.5, '3 TON BCP', 'Vehicle and Transport Operator'], 
	[2, 1, 0, 0, '10 TON', 'Vehicle Only']
].map(function (element) {
	return {
		id: element[0],
		parkdownQuantity: element[1],
		quantity: element[2],
		credits: element[3],
		vehicleType: element[4],
		resourceType: element[5]
	};
});

data.countries = [
	['TH', 'Thailand'], 
	['TW', 'Taiwan'], 
	['AU', 'Australia'], 
	['US', 'United States'],
	['OT', 'Others']
].map(function (element) {
	return {
		code: element[0],
		name: element[1]
	};
});

data.indentSets = [
	[1, '2016000001', 'Training', 'Training - Company Training', 'Training Name 1', '1 FD COL COY', '01 Mar 2016', 'SUBMITTED', data.indents],
	[2, '2016000002', 'Training', 'Training - Company Training', 'Training Name 2', '1 FD COL COY', '03 Mar 2016', 'RECOMMENDED (Waiting List)', data.indents],
	[3, '2016000003', 'Exercise', 'Exercise - Company Exercise', 'Exercise Name 1', '1 FD COL COY', '12 Mar 2016', 'APPROVED', data.indents],
	[4, '2016000004', 'Exercise', 'Exercise - Company Exercise', 'Exercise Name 2', '1 FD COL COY', '12 Mar 2016', 'CONFIRMED', data.indents],
	[5, '2016000005', 'Training', 'Training - Company Training', 'Training Name 3', '1 FD COL COY', '15 Mar 2016', 'COMPLETED', data.indents]
].map(function(element) {
	return {
		id: element[0],
		indentSetNo: element[1],
		activity: element[2],
		subActivity: element[3],
		name: element[4],
		unit: element[5],
		date: element[6],
		status: element[7],
		indents: element[8]
	};
});

data.tasks = [
	[1, 100725, 'Pending Execution ', 'CPL MUHAMMAD NOOR RIZAN BIN ISMAIL', 'ITI NODE', 'L/R FFR 1Ton', 'MID3300 ', 'ITI NODE', '05/05/2016 00:00 ', '06/05/2016 00:00 ', '-', '-', true],
	[2, 100728, 'Under Execution ', 'CPL JULIAN CHENG LEE KONG', 'ITI NODE', 'L/R FFR 1Ton', 'MID3301 ', 'ITI NODE', '02/05/2016 00:00 ', '05/05/2016 00:00 ', 'Required', 'Required', true],
	[3, 100729, 'Under Execution ', 'LCP WONG SENG MENG', 'ITI NODE', 'L/R FFR 1Ton', 'MID3309 ', 'ITI NODE', '05/05/2016 00:00 ', '10/05/2016 00:00 ', 'Required', 'Required', false],
	[4, 100730, 'Completed ', 'LCP ALEX CHAN HOCK SIEW', 'ITI NODE', 'L/R FFR 1Ton', 'MID3302 ', 'ITI NODE', '04/05/2016 00:00 ', '04/05/2016 00:00 ', 'Outstanding', 'Completed', false],
	[5, 100726, 'Pending Execution ', '-', '-', 'L/R FFR 1Ton', '- ', '-', '31/05/2016 00:00 ', '31/05/2016 00:00 ', '-', '-', false],
	[6, 100727, 'Pending Execution ', '-', '-', 'L/R FFR 1Ton', '- ', '-', '31/05/2016 00:00 ', '31/05/2016 00:00 ', '-', '-', false],
	[7, 100731, 'Pending Execution ', '-', '-', 'L/R FFR 1Ton', 'MID3310 ', 'ITI NODE', '31/05/2016 00:00 ', '31/05/2016 00:00 ', '-', '-', false],
	[8, 100732, 'Pending Execution ', 'CPL RUDI BIN SAMAD', 'ITI NODE', 'L/R FFR 1Ton', '- ', '-', '31/05/2016 00:00 ', '31/05/2016 00:00 ', '-', '-', false],
	[9, 100733, 'Pending Execution ', 'CPL JEREMIAH K. SOLOMON', 'ITI NODE', 'L/R FFR 1Ton', 'MID3314 ', 'ITI NODE', '31/05/2016 00:00 ', '31/05/2016 00:00 ', 'Required', 'Required', false],
	[10, 100734, 'Pending Execution ', 'PTE VIJAY SUNDRUMOORTHY', 'ITI NODE', 'L/R FFR 1Ton', 'MID3315 ', 'ITI NODE', '31/05/2016 00:00 ', '31/05/2016 00:00 ', '-', '-', false]
].map(function(element) {
	return {
		id: element[0],
		taskId: element[1],
		status: element[2],
		driverName: element[3],
		driverNode: element[4],
		vehicleType: element[5],
		vehicleNo: element[6],
		vehicleNode: element[7],
		startTime: element[8],
		endTime: element[9],
		surveyStatus: element[10],
		toStatus: element[11],
		highlight: element[12]
	};
});

data.caps = [
	['BEDOK NODE', '120', '100', '10%', '10', '90%', '90', '50', '50'],
	['PASIR RIS NODE', '120', '100', '10%', '10', '80%', '80', '50', '50'],
	['CHANGI NAVAL BASE', '120', '100', '10%', '10', '75%', '75', '50', '50'],
	['PAYA LEBAR AIR BASE', '120', '100', '10%', '10', '70%', '70', '50', '50'],
	['SELETAR NODE', '120', '100', '10%', '10', '60%', '60', '50', '50'],
	['TOTAL', '600', '500', '10%', '50', '75%', '350', '50', '50']
  ].map(function(element) {
  	return {
  		node: element[0],
  		holding: element[1],
  		deployable: element[2],
  		bufferPt: element[3],
  		buffer: element[4],
  		availablePt: element[5],
  		available: element[6],
  		approved: element[7],
  		remaining: element[8],
  	};
});

data.loanTOs = [
 	['BEDOK NODE', 'ITI NODE', 'S8477512Z CPL MUHAMMAD NOOR RIZAN'],
 	['BEDOK NODE', 'ITI NODE', 'S8897452C CPL LEE ZHE KAI'],
 	['PAYA LEBAR AIR BASE', 'PASIR RIS NODE', 'S8574987F CPL TAN MING LIANG'],
   ].map(function(element) {
   	return {
   		parentNode: element[0],
   		attachedNode: element[1],
   		personnel: element[2],
   	};
 });

data.loanVehs = [
	['BEDOK NODE', 'ITI NODE', 'MID0001', '3 TON GS'],
	['BEDOK NODE', 'ITI NODE', 'MID0002', '3 TON GS'],
	['PAYA LEBAR AIR BASE', 'PASIR RIS NODE', 'MID0003', '7 TON GUN TOWER']
   ].map(function(element) {
   	return {
   		parentNode: element[0],
   		receivingNode: element[1],
   		vehicleNo: element[2],
   		vehicleType: element[3],
   	};
 });

data.operators = [
['S8806477A', 'CPL BENJAMIN TAN AH MUN', 'DVR', 'BEDOK NODE', '-', '1 ADF', '', 'C', '3333.0', '667.0', '667.0', '3667.0', '0.0'],
['S8812475B', 'CPL JACKIE CHOO KANG MO', 'DVR', 'BEDOK NODE', '-', '1 ADF', '', 'C', '3333.0', '667.0', '667.0', '3667.0', '0.0'],
['S8824235C', 'CPL RONALD YAP LI KANG', 'DVR', 'BEDOK NODE', '-', '1 ADF', 'BRAVO', 'C', '3333.0', '667.0', '667.0', '3667.0', '0.0'],
['S8836874D', 'CPL LEE SHENG CHONG', 'DVR', 'BEDOK NODE', '-', '1 ADF', 'ALPHA', 'C', '3333.0', '667.0', '667.0', '3667.0', '0.0'],
['S8842541E', 'CPL TAN AH TAT', 'DVR', 'BEDOK NODE', '-', '1 ADF', '', 'C', '3333.0', '667.0', '667.0', '3667.0', '0.0'],
['S8856987F', 'CPL YAP GUAN CHONG', 'DVR', 'BEDOK NODE', '-', '1 ADF', '', 'C', '3333.0', '667.0', '667.0', '3667.0', '0.0'],
].map(function(element) {
	return {
		nric: element[0],
		name: element[1],
		appointment: element[2],
		node: element[3],
		attachmentNode: element[4],
		opsTagUnit: element[5],
		opsTagSubUnit: element[6],
		drivingCAT: element[7],
		totalMileage: element[8],
		mileageToIncentive: element[9],
		mileageToBadge: element[10],
		mileageToCDL: element[11],
		demeritPoints: element[12]
	};
});

data.approveSkills = [
	[1, 'Vehicle Familiarisation', '3 TON GS, No Towing', 'Pass', '15 Feb 2016', 'MSG KALIPUMA S/O RAJANGAM', '20 Feb 2016', 'CPT TAN SHENG LONG'],
	[2, 'Vehicle Familiarisation', '5 TON GS, No Towing', 'Pass', '15 Feb 2016', 'MSG KALIPUMA S/O RAJANGAM', '20 Feb 2016', 'CPT TAN SHENG LONG'],
	[3, 'Vehicle Familiarisation (Withdraw)', '7 TON GS, No Towing', 'Pass', '15 Feb 2016', 'MSG KALIPUMA S/O RAJANGAM', '20 Feb 2016', 'CPT TAN SHENG LONG'],
	[4, 'Driving CAT', 'B', 'Pass', '15 Feb 2016', 'MSG KALIPUMA S/O RAJANGAM', '20 Feb 2016', 'CPT TAN SHENG LONG'],
	[5, 'Operational Proficiency', 'Chemical Defence', 'Pass', '15 Feb 2016', 'MSG KALIPUMA S/O RAJANGAM', '20 Feb 2016', 'CPT TAN SHENG LONG'],
].map(function (element) {
	return {
		id: element[0],
		skillType: element[1],
		skill: element[2],
		status: element[3],
		assessedOn: element[4],
		assessedBy: element[5],
		recommendedOn: element[6],
		recommendedBy: element[7],
	};
});

data.approveSkillTOs = [
	[1, 'S8477006Z', '3SG CHONG WEI XIANG', 'Submitted on 01 Mar 2016 by CPL Chan Wai Kit', data.approveSkills],
	[2, 'S8477006Z', 'CPL MUHAMMAD RAFIQ', 'Submitted on 01 Mar 2016 by CPL Chan Wai Kit', data.approveSkills],
	[3, 'S8477006Z', 'CPL MUHAMMAD HALIM', 'Submitted on 01 Mar 2016 by CPL Chan Wai Kit', data.approveSkills],
	[4, 'S8477006Z', 'CPL TAN JIA JIE', 'Submitted on 01 Mar 2016 by CPL Chan Wai Kit', data.approveSkills],
	[5, 'S8477006Z', 'CPL JONATHAN LIM', 'Submitted on 01 Mar 2016 by CPL Chan Wai Kit', data.approveSkills]
].map(function(element) {
	return {
		id: element[0],
		nric: element[1],
		name: element[2],
		submissionInfo: element[3],
		skills: element[4]
	};
});

data.approveRewardTOs = [
  	[1, 'S8477006Z', 'CPL CHONG WEI XIANG', 'Submitted on 01 Mar 2016 by CPL Chan Wai Kit', '1K Incentives', '12 Feb 2016', 'SSG JOHN KONG', '15 Feb 2016', 'MSG KALIPUMA S/O RAJANGAM', '20 Feb 2016', 'CPT TAN SHENG LONG'],
  	[2, 'S8477006Z', 'CPL MUHAMMAD RAFIQ', 'Submitted on 01 Mar 2016 by CPL Chan Wai Kit', 'Safe & Courteous Badge', '12 Feb 2016', 'SSG JOHN KONG', '15 Feb 2016', 'MSG KALIPUMA S/O RAJANGAM', '20 Feb 2016', 'CPT TAN SHENG LONG'],
  	[3, 'S8477006Z', 'CPL MUHAMMAD HALIM', 'Submitted on 01 Mar 2016 by CPL Chan Wai Kit', 'Safe & Courteous Badge (Withdraw)', '12 Feb 2016', 'SSG JOHN KONG', '15 Feb 2016', 'MSG KALIPUMA S/O RAJANGAM', '20 Feb 2016', 'CPT TAN SHENG LONG'],
  	[4, 'S8477006Z', 'CPL TAN JIA JIE', 'Submitted on 01 Mar 2016 by CPL Chan Wai Kit', 'CDL Conversion', '12 Feb 2016', 'SSG JOHN KONG', '15 Feb 2016', 'MSG KALIPUMA S/O RAJANGAM', '20 Feb 2016', 'CPT TAN SHENG LONG'],
  	[5, 'S8477006Z', 'CPL JONATHAN LIM', 'Submitted on 01 Mar 2016 by CPL Chan Wai Kit', '1K Incentives', '12 Feb 2016', 'SSG JOHN KONG', '15 Feb 2016', 'MSG KALIPUMA S/O RAJANGAM', '20 Feb 2016', 'CPT TAN SHENG LONG']
].map(function(element) {
  	return {
  		id: element[0],
  		nric: element[1],
  		name: element[2],
  		submissionInfo: element[3],
  		rewardType: element[4],
  		submittedOn: element[5],
  		submittedBy: element[6],
  		verifiedOn: element[7],
  		verifiedBy: element[8],
  		recommendedOn: element[9],
  		recommendedBy: element[10],
  	};
});

data.approveOffenceTOs = [
   	[1, 'S8477006Z', 'CPL CHONG WEI XIANG', 'Submitted on 01 Mar 2016 by CPL Chan Wai Kit', 'INT / TRG ACCIDENT (LOCAL)', 'Illegal Parking', 'L/R FFR 1 TON', 'MID1234', 'BUKIT BATOK AVE 2', '8', '250', '01-Apr-2015', 'LTA', '01-May-2015', 'MSG LIM CHEE LUCK'],
   	[2, 'S8477006Z', 'CPL MUHAMMAD RAFIQ', 'Submitted on 01 Mar 2016 by CPL Chan Wai Kit', 'INT / TRG ACCIDENT (LOCAL)', 'Illegal Parking', 'L/R FFR 1 TON', 'MID1234', 'BUKIT BATOK AVE 2', '8', '250', '01-Apr-2015', 'LTA', '01-May-2015', 'MSG LIM CHEE LUCK'],
   	[3, 'S8477006Z', 'CPL MUHAMMAD HALIM', 'Submitted on 01 Mar 2016 by CPL Chan Wai Kit', 'INT / TRG ACCIDENT (LOCAL)', 'Illegal Parking', 'L/R FFR 1 TON', 'MID1234', 'BUKIT BATOK AVE 2', '8', '250', '01-Apr-2015', 'LTA', '01-May-2015', 'MSG LIM CHEE LUCK'],
 ].map(function(element) {
   	return {
   		id: element[0],
   		nric: element[1],
   		name: element[2],
   		submissionInfo: element[3],
   		offenceType: element[4],
   		offenceCommitted: element[5],
   		vehicleType: element[6],
   		vehicleNo: element[7],
   		location: element[8],
   		demeritPoints: element[9],
   		fine: element[10],
   		issuedOn: element[11],
   		issuedBy: element[12],
   		recommendedOn: element[13],
   		recommendedBy: element[14],
   	};
 });

data.approveCdlcs = [
	[1, '10005', 'S8856419C', 'CPL CHONG WEI XIANG', 'Submitted on 01 Mar 2016 by Chan Mei Ling', 'CL3,CL4', 'CPT LEE LI LI', '01-Aug-2016', 'TPT HUB EAST', 'Hub S1', '96544512', 'Chan Mei Ling', '01-Aug-2016', 'Yes', 'Yes', 'Yes'],
	[2, '10006', 'S8844219C', 'CPL MUHAMMAD RAFIQ', 'Submitted on 01 Mar 2016 by Chan Mei Ling', 'CL3,CL4', 'CPT LEE LI LI', '01-Aug-2016', 'TPT HUB EAST', 'Hub S1', '96544512', 'Chan Mei Ling', '01-Aug-2016', 'Yes', 'Yes', 'Yes'],
	[3, '10007', 'S8875412C', 'CPL MUHAMMAD HALIM', 'Submitted on 01 Mar 2016 by Chan Mei Ling', 'CL3,CL4', 'CPT LEE LI LI', '01-Aug-2016', 'TPT HUB EAST', 'Hub S1', '96544512', 'Chan Mei Ling', '01-Aug-2016', 'Yes', 'Yes', 'Yes'],
	[4, '10008', 'S8956472A', 'CPL TAN JIA JIE', 'Submitted on 01 Mar 2016 by Chan Mei Ling', 'CL3,CL4', 'CPT LEE LI LI', '01-Aug-2016', 'TPT HUB EAST', 'Hub S1', '96544512', 'Chan Mei Ling', '01-Aug-2016', 'Yes', 'Yes', 'Yes'],
	[5, '10009', 'S9541234A', 'CPL JONATHAN LIM', 'Submitted on 01 Mar 2016 by Chan Mei Ling', 'CL3,CL4', 'CPT LEE LI LI', '01-Aug-2016', 'TPT HUB EAST', 'Hub S1', '96544512', 'Chan Mei Ling', '01-Aug-2016', 'Yes', 'Yes', 'Yes'],
].map(function(element) {
	return {
		id: element[0],
		applicationID: element[1],
    	nric: element[2],
    	name: element[3],
    	submissionInfo: element[4],
    	classesApplied: element[5],
    	recommendedBy: element[6],
    	recommendedOn: element[7],
    	recommenderUnit: element[8],
    	recommenderAppt: element[9],
    	recommenderContact: element[10],
    	processedBy: element[11],
    	processedOn: element[12],
    	mileageChecked: element[13],
    	tpScreened: element[14],
    	classesEligible: element[15],
    	remarks: element[16],
    };
});

data.approveAttOutTOs = [
   	[1, 'S8477006Z', 'CPL CHONG WEI XIANG', 'Submitted on 01 Mar 2016 by CPL Chan Wai Kit', 'BEDOK NODE', 'PASIR NODE', '01-May-2016 to 01-Aug-2016', 'Attach-Out', 'To support Exercise Pinnacle.'],
   	[2, 'S8477006Z', 'CPL MUHAMMAD RAFIQ', 'Submitted on 01 Mar 2016 by CPL Lee Ming Ming', 'BEDOK NODE', 'PASIR NODE', '01-May-2016 to 01-Aug-2016', 'Attach-Out Extension', 'To support Exercise Pinnacle 2.'],
   	[3, 'S8477006Z', 'CPL MUHAMMAD HALIM', 'Submitted on 01 Mar 2016 by CPL Chan Wai Kit', 'BEDOK NODE', 'PASIR NODE', '01-May-2016 to 01-Aug-2016', 'Attach-Out', 'To support Exercise Pinnacle.'],
   	[4, 'S8477006Z', 'CPL TAN JIA JIE', 'Submitted on 01 Mar 2016 by CPL Chan Wai Kit', 'BEDOK NODE', 'PASIR NODE', '01-May-2016 to 01-Aug-2016', 'Attach-Out', 'To support Exercise Pinnacle.'],
   	[5, 'S8477006Z', 'CPL JONATHAN LIM', 'Submitted on 01 Mar 2016 by CPL Chan Wai Kit', 'BEDOK NODE', 'PASIR NODE', '01-May-2016 to 01-Aug-2016', 'Attach-Out', 'To support Exercise Pinnacle.']
 ].map(function(element) {
   	return {
   		id: element[0],
   		nric: element[1],
   		name: element[2],
   		submissionInfo: element[3],
   		parent: element[4],
   		loan: element[5],
   		period: element[6],
   		type: element[7],
   		reason: element[8]
   	};
 });

data.approveTLoanVehs = [
   	[1, 'MID1234', '3 TON GS', 'Submitted on 01 Mar 2016 by CPL Chan Wai Kit', 'BEDOK NODE', 'PASIR NODE', '01-May-2016 to 01-Aug-2016', 'T-Loan', 'To support Exercise Pinnacle.'],
   	[2, 'MID1233', '3 TON GS', 'Submitted on 01 Mar 2016 by CPL Chan Wai Kit', 'BEDOK NODE', 'PASIR NODE', '01-May-2016 to 01-Aug-2016', 'T-Loan Extension', 'To support Exercise Pinnacle 2.'],
   	[3, 'MID1232', '7 TON GS', 'Submitted on 01 Mar 2016 by CPL Chan Wai Kit', 'BEDOK NODE', 'PASIR NODE', '01-May-2016 to 01-Aug-2016', 'T-Loan', 'To support Exercise Pinnacle.'],
   	[4, 'MID1231', '7 TON GS', 'Submitted on 01 Mar 2016 by CPL Chan Wai Kit', 'BEDOK NODE', 'PASIR NODE', '01-May-2016 to 01-Aug-2016', 'T-Loan', 'To support Exercise Pinnacle.'],
   	[5, 'MID1230', '7 TON GS', 'Submitted on 01 Mar 2016 by CPL Chan Wai Kit', 'BEDOK NODE', 'PASIR NODE', '01-May-2016 to 01-Aug-2016', 'T-Loan', 'To support Exercise Pinnacle.']
 ].map(function(element) {
   	return {
   		id: element[0],
   		mid: element[1],
   		vehType: element[2],
   		submissionInfo: element[3],
   		parent: element[4],
   		loan: element[5],
   		period: element[6],
   		type: element[7],
   		reason: element[8]
   	};
 });

data.vehs = [
	['MID20000', '5 TON GS (AUTO)', '4', 'BEDOK NODE', '-', 'Pass', '19-Jun-2015', '01-Jun-2016', '01-Jun-2016', '20K/AVI', '18000', 'DETAIL'],
	['MID20001', '5 TON GS (AUTO)', '4', 'BEDOK NODE', '-', 'Expired', '19-Jun-2014', '01-Jun-2016', '01-Jun-2016', '20K/AVI', '18000', 'xNODE DETAIL'],
	['MID20002', '5 TON GS (AUTO)', '4', 'BEDOK NODE', '-', 'Fail', '19-Jun-2015', '01-Jun-2016', '01-Jun-2016', '20K/AVI', '18000', 'xHUB DETAIL'],
	['MID20003', '5 TON GS (AUTO)', '4', 'BEDOK NODE', '-', 'Pass', '19-Jun-2015', '01-Jun-2016', '01-Jun-2016', '20K/AVI', '18000', 'CM'],
	['MID20004', '5 TON GS (AUTO)', '4', 'BEDOK NODE', 'SELETAR NODE', 'Pass', '19-Jun-2015', '01-Jun-2016', '01-Jun-2016', '20K/AVI', '18000', 'T-LOAN'],
	['MID20005', '5 TON GS (AUTO)', '4', 'BEDOK NODE', '-', 'Pass', '19-Jun-2015', '01-Jun-2016', '01-Jun-2016', '20K/AVI', '18000', '15K'],
	['MID20006', '5 TON GS (AUTO)', '4', 'BEDOK NODE', '-', 'Pass', '19-Jun-2015', '01-Jun-2016', '01-Jun-2016', '20K/AVI', '18000', '20K/AVI'],
	['MID20006', '5 TON GS (AUTO)', '4', 'BEDOK NODE', '-', 'Pass', '19-Jun-2015', '01-Jun-2016', '01-Jun-2016', '20K/AVI', '18000', '20K/AVI MISS'],
	['MID20007', '5 TON GS (AUTO)', '4', 'BEDOK NODE', '-', 'Pass', '19-Jun-2015', '01-Jun-2016', '01-Jun-2016', '20K/AVI', '18000', 'DOWN'],
	['MID20008', '5 TON GS (AUTO)', '4', 'BEDOK NODE', '-', 'Pass', '19-Jun-2015', '01-Jun-2016', '01-Jun-2016', '20K/AVI', '18000', 'BER'],
	['MID20009', '5 TON GS (AUTO)', '4', 'BEDOK NODE', '-', 'Pass', '19-Jun-2015', '01-Jun-2016', '01-Jun-2016', '20K/AVI', '18000', 'AVAILABLE'],
  ].map(function(element) {
  	return {
  		vehicleNo: element[0],
  		vehicleType: element[1],
  		licClass: element[2],
  		node: element[3],
  		tLoanNode: element[4],
  		aviStatus: element[5],
  		aviDueDate: element[6],
  		nextAviDate: element[7],
  		nextPmDate: element[8],
  		nextPmType: element[9],
  		mileage: element[10],
  		status: element[11],
  	};
  });

data.vehTypes = [
	['TRK, CARGO: 5 TONS, M.A.N. 16.284 LAERC','MAN 16.284 LAERC 5 GS','5 TON GS (AUTO)','4','4','90','Yes','5000','90','Yes','2','16'],
	['TRK, CARGO: 5 TONS, M.A.N. 16.284 LAERC','MAN 16.284 LAERC 5 GS','5 TON GS (AUTO)','4','4','90','Yes','5000','90','Yes','2','16'],
	['TRK, CARGO: 5 TONS, M.A.N. 16.284 LAERC','MAN 16.284 LAERC 5 GS','5 TON GS (AUTO)','4','4','90','Yes','5000','90','Yes','2','16'],
	['TRK, CARGO: 5 TONS, M.A.N. 16.284 LAERC','MAN 16.284 LAERC 5 GS','5 TON GS (AUTO)','4','4','90','Yes','5000','90','Yes','2','16'],
	['TRK, CARGO: 5 TONS, M.A.N. 16.284 LAERC','MAN 16.284 LAERC 5 GS','5 TON GS (AUTO)','4','4','90','Yes','5000','90','Yes','2','16'],
	['TRK, CARGO: 5 TONS, M.A.N. 16.284 LAERC','MAN 16.284 LAERC 5 GS','5 TON GS (AUTO)','4','4','90','Yes','5000','90','Yes','2','16'],
	['TRK, CARGO: 5 TONS, M.A.N. 16.284 LAERC','MAN 16.284 LAERC 5 GS','5 TON GS (AUTO)','4','4','90','Yes','5000','90','Yes','2','16'],
	['TRK, CARGO: 5 TONS, M.A.N. 16.284 LAERC','MAN 16.284 LAERC 5 GS','5 TON GS (AUTO)','4','4','90','Yes','5000','90','Yes','2','16'],
	['TRK, CARGO: 5 TONS, M.A.N. 16.284 LAERC','MAN 16.284 LAERC 5 GS','5 TON GS (AUTO)','4','4','90','Yes','5000','90','Yes','2','16'],
	['TRK, CARGO: 5 TONS, M.A.N. 16.284 LAERC','MAN 16.284 LAERC 5 GS','5 TON GS (AUTO)','4','4','90','Yes','5000','90','Yes','2','16']
   ].map(function(element) {
   	return {
   		esMaterialDesc: element[0],
   		esEquipmentDesc: element[1],
   		vehicleType: element[2],
   		vehicleLicenceClass: element[3],
   		noOfWheels: element[4],
   		speedLimit: element[5],
   		hasImage: element[6],
   		pmMileage: element[7],
   		pmInterval: element[8],
   		isPmByExtVendor: element[9],
   		frontCapacity: element[10],
   		rearCapacity: element[11],
   	};
});

data.templates = [
 	['BME (Infantry/Guards)','Generic','','10-Jun-2016 14:00','CPT DONOVAN TAN WEE KIM'],
 	['4NTM (Infantry/Guards)','Generic','','10-Jun-2016 14:00','CPT DONOVAN TAN WEE KIM'],
 	['Urgent Admin','Generic','','10-Jun-2016 14:00','CPT DONOVAN TAN WEE KIM'],
 	['MT/Admin','Generic','','10-Jun-2016 14:00','CPT DONOVAN TAN WEE KIM'],
 	['MT/Admin - AVI','Role-Based','Hub Controller (HUB EAST)','10-Jun-2016 14:00','SSG YEO CHAI MING'],
 	['Custom Template 2','Role-Based','Hub Executive (HUB EAST)','10-Jun-2016 14:00','SSG JOHNNY KONG LONG MING'],
 	['Custom Template 3','Role-Based','Node Controller (BEDOK NODE)','10-Jun-2016 14:00','SSG LEE LAI LING'],
 	['Custom Template 4','Role-Based','Requester (3 CSH)','10-Jun-2016 14:00','SSG CHUA KA SHENG'],
    ].map(function(element) {
    	return {
    		templateName: element[0],
    		templateType: element[1],
    		role: element[2],
    		createdOn: element[3],
    		createdBy: element[4]
    	};
 });

data.allocations = [
	[1, '2016/17', 'HQ 2 PDF COMD', '2 PDF TRG CEN', 200, 10, 150, 0, 0, 0, 0, 0, 50],
	[2, '2016/17', 'HQ 2 PDF COMD', '6 SIR', 200, 10, 150, 0, 0, 0, 0, 0, 50],
	[3, '2016/17', 'HQ 3 DIV', '2 SIR', 200, 10, 150, 0, 0, 0, 0, 0, 50],
	[4, '2016/17', 'HQ 3 DIV', '20 SA', 200, 10, 150, 0, 0, 0, 0, 0, 50],
	[5, '2016/17', 'HQ 3 DIV', '21 SA', 200, 10, 150, 0, 0, 0, 0, 0, 50],
	[6, '2016/17', 'HQ 3 DIV', '23 SA', 200, 10, 150, 0, 0, 0, 0, 0, 50],
	[7, '2016/17', 'HQ 3 DIV', '3 SIG BN', 200, 10, 150, 0, 0, 0, 0, 0, 50],
	[8, '2016/17', 'HQ 3 DIV', '30 SCE', 200, 10, 150, 0, 0, 0, 0, 0, 50],
	[9, '2016/17', 'HQ 3 DIV', '40 SAR', 200, 10, 150, 0, 0, 0, 0, 0, 50],
	[10, '2016/17', 'HQ 3 DIV', '46 SAR', 200, 10, 150, 0, 0, 0, 0, 0, 50],
	[11, '2016/17', 'HQ 3 DIV', '5 SIR', 200, 10, 150, 0, 0, 0, 0, 0, 50],
	[12, '2016/17', 'HQ 3 DIV', 'AETC', 200, 10, 150, 0, 0, 0, 0, 0, 50],
	[13, '2016/17', 'HQ 3 DIV', 'HQ 3 DISCOM', 200, 10, 150, 0, 0, 0, 0, 0, 50],
	[14, '2016/17', 'HQ 3 DIV', 'HQ 3 SIB', 200, 10, 150, 0, 0, 0, 0, 0, 50],
	[15, '2016/17', 'HQ 3 DIV', 'HQ 8 SAB', 200, 10, 150, 0, 0, 0, 0, 0, 50],
	[16, '2016/17', 'HQ 6 DIV', '1 SIR', 200, 10, 150, 0, 0, 0, 0, 0, 50],
	[17, '2016/17', 'HQ 6 DIV', '4 SIR', 200, 10, 150, 0, 0, 0, 0, 0, 50],
	[18, '2016/17', 'HQ 6 DIV', 'HQ 2 SIB', 200, 10, 150, 0, 0, 0, 0, 0, 50],
	[19, '2016/17', 'HQ 9 DIV/INF', '3 SIR', 200, 10, 150, 0, 0, 0, 0, 0, 50],
	[20, '2016/17', 'HQ 9 DIV/INF', 'BMTC HQ', 200, 10, 150, 0, 0, 0, 0, 0, 50],
	[21, '2016/17', 'HQ 9 DIV/INF', 'BMTC SCHOOL 1', 200, 10, 150, 0, 0, 0, 0, 0, 50],
	[22, '2016/17', 'HQ 9 DIV/INF', 'BMTC SCHOOL 2', 200, 10, 150, 0, 0, 0, 0, 0, 50],
	[23, '2016/17', 'HQ 9 DIV/INF', 'ITI', 200, 10, 150, 0, 0, 0, 0, 0, 50],
	[24, '2016/17', 'HQ 9 DIV/INF', 'SIW', 200, 10, 150, 0, 0, 0, 0, 0, 50],
	[25, '2016/17', 'HQ 9 DIV/INF', 'SWI', 200, 10, 150, 0, 0, 0, 0, 0, 50],
	[26, '2016/17', 'HQ ARMOUR', '41 SAR', 200, 10, 150, 0, 0, 0, 0, 0, 50],
	[27, '2016/17', 'HQ ARMOUR', '42 SAR', 200, 10, 150, 0, 0, 0, 0, 0, 50],
	[28, '2016/17', 'HQ ARMOUR', 'HQ 4 SAB', 200, 10, 150, 0, 0, 0, 0, 0, 50],
	[29, '2016/17', 'HQ SA', '23 SA', 200, 10, 150, 0, 0, 0, 0, 0, 50],
	[30, '2016/17', 'HQ SA', '24 SA', 200, 10, 150, 0, 0, 0, 0, 0, 50],
	[31, '2016/17', 'HQ SCE', '38 SCE', 200, 10, 150, 0, 0, 0, 0, 0, 50],
	[32, '2016/17', 'HQ SCE', 'ETI', 200, 10, 150, 0, 0, 0, 0, 0, 50],
	[33, '2016/17', 'OTHERS POOL', '2 SIG BN', 200, 10, 150, 0, 0, 0, 0, 0, 50],
	[34, '2016/17', 'OTHERS POOL', '6 AMB', 200, 10, 150, 0, 0, 0, 0, 0, 50],
	[35, '2016/17', 'OTHERS POOL', 'OETI', 200, 10, 150, 0, 0, 0, 0, 0, 50],
	[36, '2016/17', 'OTHERS POOL', 'SISPEC', 200, 10, 150, 0, 0, 0, 0, 0, 50],
	[37, '2016/17', 'OTHERS POOL', 'TPT CEN(EAST)', 200, 10, 150, 0, 0, 0, 0, 0, 50],
	[38, '2016/17', 'OTHERS POOL', 'TPT CEN(WEST)', 200, 10, 150, 0, 0, 0, 0, 0, 50],
	[39, '2016/17', 'SCH OF ARMR', 'ATI', 200, 10, 150, 0, 0, 0, 0, 0, 50],
	[40, '2016/17', 'TPT COMD HQ', 'CENTRAL VOTE', 200, 10, 150, 0, 0, 0, 0, 0, 50],
	[41, '2016/17', 'TPT COMD HQ', 'HQ 2 PDF COMD', 200, 10, 150, 0, 0, 0, 0, 0, 50],
	[42, '2016/17', 'TPT COMD HQ', 'HQ 3 DIV', 200, 10, 150, 0, 0, 0, 0, 0, 50],
	[43, '2016/17', 'TPT COMD HQ', 'HQ 6 DIV', 200, 10, 150, 0, 0, 0, 0, 0, 50],
	[44, '2016/17', 'TPT COMD HQ', 'HQ 9 DIV/INF', 200, 10, 150, 0, 0, 0, 0, 0, 50],
	[45, '2016/17', 'TPT COMD HQ', 'HQ ARMOUR', 200, 10, 150, 0, 0, 0, 0, 0, 50],
	[46, '2016/17', 'TPT COMD HQ', 'HQ SA', 200, 10, 150, 0, 0, 0, 0, 0, 50],
	[47, '2016/17', 'TPT COMD HQ', 'HQ SCE', 200, 10, 150, 0, 0, 0, 0, 0, 50],
	[48, '2016/17', 'TPT COMD HQ', 'OTHERS POOL', 200, 10, 150, 0, 0, 0, 0, 0, 50],
	[49, '2016/17', 'MTC', '', 200, 10, 150, 0, 0, 0, 0, 0, 50],
	[50, '2016/17', 'MTC', '', 200, 10, 150, 0, 0, 0, 0, 0, 50],
	[51, '2016/17', 'MTC', '', 200, 10, 150, 0, 0, 0, 0, 0, 50]
].map(function(element) {
	return {
		id: element[0],
		year: element[1],
		div: element[2],
		unit: element[3],
		allocated: element[4],
		precommitted: element[5],
		utilized: element[6],
		refunded: element[7],
		transferredOut: element[8],
		transferredIn: element[9],
		penalty: element[10],
		return: element[11],
		remaining: element[12]
	};
});

data.offences = [
	[1, 'INT / TRG ACCIDENT (LOCAL)', 'Tailgating resulting in accident', 'MID31007', 'L/R FFR 1Ton', 'Bukit Batok Ave 2', '250', '9', 'LTA', '31/03/2016', 'S8121014Z', '02/04/2016', '', '', 'PENDING'],
    [2, 'INT / TRG ACCIDENT (LOCAL)', 'Driver failure to wear seat belt ', 'MID31007', 'L/R FFR 1Ton', 'Bukit Batok Ave 2', '250', '3', 'LTA', '31/03/2016', 'S8121014Z', '02/04/2016', 'S7142695C', '03/04/2016', 'APPROVED']
].map(function(element) {
	return {
		id: element[0],
		offenceType: element[1],
		offenceCommitted: element[2],
		vehicleNo: element[3],
		vehicleType: element[4],
		location: element[5],
		fine: element[6],
		demeritPoints: element[7],
		issuedBy: element[8],
		issuedOn: element[9],
		recommendedBy: element[10],
		recommendedOn: element[11],
		approvedBy: element[12],
		approvedOn: element[13],
        approvalStatus: element[14]
	};
});

data.demeritAdjustments = [
 	[1, '3', 'TO has taken and pass re-test on 01-Jan-2015.', 'S8121014Z', '31-Mar-2016', '', '', 'PENDING'],
    [2, '3', 'TO has taken and pass re-test on 01-Jan-2015.', 'S8121014Z', '31-Mar-2016', 'S7142695C', '01-Apr-2016', 'APPROVED']
 ].map(function(element) {
 	return {
 		id: element[0],
 		pointsAdjusted: element[1],
 		reasons: element[2],
 		recommendedBy: element[3],
 		recommendedOn: element[4],
 		approvedBy: element[5],
 		approvedOn: element[6],
        approvalStatus: element[7]
 	};
 });

data.permitClasses = [
	['LOA/LNTL2776173', '2A', '1', '1', '12345', '13-Apr-2016', 'No'],
	['LOA/LNTL2776173', '2AX', '1', '1', '12345', '13-Apr-2016', 'No'],
	['SAF/TPT/N/00159/95', '2A', '1', '1', '12345', '13-Apr-2016', 'No'],
	['SAF/TPT/N/00159/95', '2AX', '1', '1', '12345', '13-Apr-2016', 'No'],
	['SAF/TPT/N/00159/95', '2B', '1', '1', '12345', '13-Apr-2016', 'No'],
	['SAF/TPT/N/00159/95', '2BX', '1', '1', '12345', '13-Apr-2016', 'No'],
	['SAF/TPT/N/00159/95', '3X', '1', '1', '12345', '13-Apr-2016', 'Yes'],
].map(function(element) {
	return {
    	permitNo: element[0],
    	label: element[1],
    	points: element[2],
    	noOfTests: element[3],
    	testerCode: element[4],
    	obtainedOn: element[5],
    	status: element[6],
	};
});

data.drivingPermits = [
	['LOA/LNTL2776173', 'LOA', 'Superceded', '23-Jan-2016', '13-Apr-2016', ''],
	['SAF/TPT/N/00159/95', 'QDL', 'Valid', '13-Apr-2016', '13-Apr-2016', ''],
].map(function(element) {
	return {
		permitNo: element[0],
    	permitType: element[1],
    	permitStatus: element[2],
    	issuedOn: element[3],
    	statusFrom: element[4],
    	statusTo: element[5],
    	permitClasses: data.permitClasses.filter(function(permitClass) {
			return permitClass.permitNo == element[0];
		})
	};
});

data.drivingCats = [
	['B', 'Pass', 'S8477116Z', '01-Jan-2016', 'S8123457D', '01-Feb-2016', '', '', 'PENDING'],
    ['C', 'Pass', 'S8477116Z', '01-Jan-2015', 'S8123457D', '01-Feb-2016', 'S2549422I', '05-Feb-2016', 'WITHDRAWN'],
    ['D', 'Pass', 'S8477116Z', '01-Jan-2014', 'S8123457D', '01-Feb-2016', 'S2549422I', '05-Feb-2016', 'APPROVED']
].map(function(element) {
	return {
		drivingCat: element[0],
		status: element[1],
		assessedBy: element[2],
		assessedOn: element[3],
		recommendedBy: element[4],
		recommendedOn: element[5],
		approvedBy: element[6],
		approvedOn: element[7],
		approvalStatus: element[8]
	};
});

data.proficiencies = [
	['CLASS 3 (commercial)', 'Pass', 'S8477116Z', '01-Jan-2016',  'S8123457D', '01-Feb-2016', 'S2549422I', '05-Feb-2016', 'APPROVED'],
    ['Hydraulic Tailgate', 'Pass', 'S8477116Z', '01-Jan-2016', 'S8123457D', '01-Feb-2016', 'S2549422I', '05-Feb-2016', 'APPROVED']
].map(function(element) {
	return {
		proficiency: element[0],
		status: element[1],
		assessedBy: element[2],
		assessedOn: element[3],
		recommendedBy: element[4],
		recommendedOn: element[5],
		approvedBy: element[6],
		approvedOn: element[7],
		approvalStatus: element[8]
	};
});

data.familiarisations = [
	['3 TON BCP', 'No Towing', 'Pass', 'S8477116Z', '01-Jan-2016', 'S8123457D', '01-Feb-2016', 'S2549422I', '05-Feb-2016', 'APPROVED'],
    ['7 TON Gun Tower', 'Gun', 'Pass', 'S8477116Z', '01-Jan-2016', 'S8123457D', '01-Feb-2016', 'S2549422I', '05-Feb-2016', 'REJECTED']
].map(function(element) {
	return {
		vehicleType: element[0],
        towType: element[1],
		status: element[2],
		assessedBy: element[3],
		assessedOn: element[4],
		recommendedBy: element[5],
		recommendedOn: element[6],
		approvedBy: element[7],
		approvedOn: element[8],
		approvalStatus: element[9],
	};
});

data.mileageByVs = [
	['3 TON BCP', '1880.0', '2', '01-Apr-2016'],
    ['7 TON Gun Tower', '5443.0', '0', '15-Jan-2016']
].map(function(element) {
	return {
		vehicleType: element[0],
		mileage: element[1],
        speedingCount: element[2],
		dateLastDriven: element[3]
	};
});

data.mileageByLs = [
	['2BX', '1880.0', '2', '01-Apr-2016'],
    ['3X', '5443.0', '0', '15-Jan-2016']
].map(function(element) {
	return {
        vehicleClass: element[0],
		mileage: element[1],
        speedingCount: element[2],
		dateLastDriven: element[3]
	};
});

data.mileageByTs = [
	['1', '100725', '01-Jan-2016 08:00', '01-Jan-2016 10:00', '3 TON BCP', '2BX', '0', '110.0', 'PENDING'],
    ['2', '100725', '02-Jan-2016 08:00', '02-Jan-2016 10:00', '3 TON BCP', '2BX', '0', '120.0', 'PENDING'],
    ['3', '100725', '03-Jan-2016 08:00', '03-Jan-2016 10:00', '7 TON Gun Tower', '3X', '0', '40.0', 'UNCLAIMED'],
    ['4', '100726', '04-Jan-2016 08:00', '04-Jan-2016 10:00', '3 TON BCP', '2BX', '0', '33.0', 'UNCLAIMED'],
    ['5', '100726', '05-Jan-2016 08:00', '05-Jan-2016 10:00', '3 TON BCP', '2BX', '1', '44.0', 'UNCLAIMED'],
    ['6', '100726', '06-Jan-2016 08:00', '06-Jan-2016 10:00', '7 TON Gun Tower', '3X', '0', '110.0', 'CLAIMED'],
    ['7', '100726', '07-Jan-2016 08:00', '07-Jan-2016 10:00', '3 TON BCP', '2BX', '0', '110.0', 'CLAIMED (3K)'],
    ['8', '100727', '08-Jan-2016 08:00', '08-Jan-2016 10:00', '3 TON BCP', '2BX', '0', '55.0', 'CLAIMED (3K)'],
    ['9', '100727', '09-Jan-2016 08:00', '09-Jan-2016 10:00', '3 TON BCP', '2BX', '1', '110.0', 'RESETED'],
    ['10', '100727', '10-Jan-2016 08:00', '10-Jan-2016 10:00', '3 TON BCP', '2BX', '0', '110.0', 'RESETED'],
].map(function(element) {
	return {
		tripId: element[0],
		taskId: element[1],
		dateTimeStart: element[2],
        dateTimeEnd: element[3],
		vehicleType: element[4],
        licenceClass: element[5],
        speedingCount: element[6],
        mileage: element[7],
        claimed: element[8]
	};
});

data.rewards = [
	['1K Incentive', 'S8854714C', '29-Apr-2016', '', '', '', '', '', '', 'PENDING VERIFICATION'],
	['1K Incentive', 'S8854714C', '29-Apr-2016', 'S8457142C', '01-May-2016', '', '', '', '', 'VERIFICATION REJECTED'],
    ['1K Incentive', 'S8854714C', '29-Jan-2016', 'S8457142C', '01-Feb-2016', '', '', '', '', 'PENDING RECOMMENDATION'],
    ['1K Incentive', 'S8854714C', '29-Jan-2016', 'S8457142C', '01-Feb-2016', 'S8141251Z', '23-Apr-2016', 'S7447451A', '01-May-2016', 'RECOMMENDATION REJECTED'],
    ['Safe & Courteous Badge', 'S8854714C', '29-Nov-2015', 'S8457142C', '01-Dec-2015', 'S8141251Z', '23-Apr-2015', 'S7447451A', '01-Apr-2016', 'PENDING APPROVAL'],
    ['Safe & Courteous Badge', 'S8854714C', '29-Sep-2015', 'S8457142C', '01-Oct-2015', 'S8141251Z', '23-Apr-2015', 'S7447451A', '01-Apr-2016', 'APPROVAL REJECTED'],
	['Safe & Courteous Badge', 'S8854714C', '29-Sep-2015', 'S8457142C', '01-Oct-2015', 'S8141251Z', '23-Apr-2015', 'S7447451A', '01-Apr-2016', 'APPROVED'],
	['CDL Conversion', 'S8854714C', '29-Sep-2015', 'S8457142C', '01-Oct-2015', 'S8141251Z', '23-Apr-2015', 'S7447451A', '01-Apr-2016', 'WITHDRAWN']
].map(function(element) {
	return {
		rewardsType: element[0],
		submittedBy: element[1],
		submittedOn: element[2],
		verifiedBy: element[3],
		verifiedOn: element[4],
		recommendedBy: element[5],
		recommendedOn: element[6],
        approvedBy: element[7],
        approvedOn: element[8],
        approvalStatus: element[9]
	};
});

data.licences = [
	['QDL', 'SAF/TPT/N/00159/95', '2AX,2B,2A,2BX,3X', 'VALID', '23-Apr-2014'],
    ['QDL', 'SAF/TPT/N/00159/94', '2AX,2B,2A,2BX,3X', 'REVOKED', '23-Jan-2014']
].map(function(element) {
	return {
		licenceType: element[0],
		licenceNo: element[1],
        licenceClasses: element[2],
		status: element[3],
        issueDate: element[4]
	};
});

data.hours = ['0.5', '1.0', '1.5', '2.0', '2.5', '3.0', '3.5', '4.0', '4.5', '5.0', '5.5', '6.0', '6.5', '7.0', '7.5', '8.0', '8.5', '9.0', '9.5', '10.0', '10.5', '11.0', '11.5', '12.0', '12.5', '13.0', '13.5', '14.0', '14.5', '15.0', '15.5', '16.0', '16.5', '17.0', '17.5', '18.0', '18.5', '19.0', '19.5', '20.0', '20.5', '21.0', '21.5', '22.0', '22.5', '23.0', '23.5', '24.0'];
data.creditActions = [
	["Allocate", "Allocate"], 
	["Pre-Commit", "Pre-Commit"], 
	["Commit", "Commit"], 
	["Penalty", "Penalty"], 
	["Refund", "Refund"], 
	["Recover", "Recover (Penalty)"], 
	["Transfer In", "Transfer In"], 
	["Transfer Out", "Transfer Out"]
].map(function(element) {
	return {
		id: element[0],
		title: element[1]
	}
});

data.creditMovements = [
	[1, 2016, '01-Apr-2016 12:53', 'Allocate', 0, 200, 200.0, 200.0],
	[2, 2015, '13-Mar-2016 11:36', 'Commit', 0, -14.5, 2.5, 2.5],
	[2, 2015, '13-Mar-2016 11:36', 'Pre-Commit', -14.5, 0, 17, 2.5],
	[3, 2015, '11-Mar-2016 11:36', 'Commit', 0, -13.5, 17, 17],
	[3, 2015, '11-Mar-2016 11:36', 'Pre-Commit', -13.5, 0, 30.5, 17],
	[4, 2015, '09-Mar-2016 11:36', 'Commit', 0, -5, 30.5, 30.5],
	[4, 2015, '09-Mar-2016 11:36', 'Pre-Commit', -5, 0, 35.5, 30.5],
	[4, 2015, '09-Mar-2016 11:36', 'Refund', 10, 0, 35.5, 35.5],
	[4, 2015, '09-Mar-2016 11:36', 'Pre-Commit', -10, 0, 35.5, 20.5],
	[4, 2015, '09-Mar-2016 11:36', 'Pre-Commit', -5, 0, 35.5, 30.5],
	[5, 2015, '07-Mar-2016 11:36', 'Pre-Commit', -11.5, 0, 47, 35.5],
	[6, 2015, '05-Mar-2016 11:36', 'Pre-Commit', -10.5, 0, 57.5, 47],
	[7, 2015, '03-Mar-2016 11:36', 'Pre-Commit', -16, 0, 73.5, 57.5],
	[8, 2015, '01-Mar-2016 11:36', 'Pre-Commit', -8.5, 0, 80, 73.5],
	[9, 2015, '28-Feb-2016 11:36', 'Refund', 0, 2, 82, 82],
	[10, 2015, '26-Feb-2016 11:36', 'Pre-Commit', -6.5, 0, 86.5, 80],
	[11, 2015, '24-Feb-2016 11:36', 'Pre-Commit', -5.5, 0, 92, 86.5],
	[12, 2015, '22-Feb-2016 11:36', 'Pre-Commit', -4.5, 0, 96.5, 92]
].map(function(element) {
	return {
		id: element[0],
		year: element[1],
		time: element[2],
		action: element[3],
		reserved: element[4],
		actual: element[5],
		balance: element[6],
		usable: element[7]
	};
});

data.hours = ['0.5', '1.0', '1.5', '2.0', '2.5', '3.0', '3.5', '4.0', '4.5', '5.0', '5.5', '6.0', '6.5', '7.0', '7.5', '8.0', '8.5', '9.0', '9.5', '10.0', '10.5', '11.0', '11.5', '12.0', '12.5', '13.0', '13.5', '14.0', '14.5', '15.0', '15.5', '16.0', '16.5', '17.0', '17.5', '18.0', '18.5', '19.0', '19.5', '20.0', '20.5', '21.0', '21.5', '22.0', '22.5', '23.0', '23.5', '24.0'];

data.activities = [
	[3, "Training"],
//	[2, "Exercise"],
	[1, "Ops"],
	[6, "Urgent Admin"],
	[7, "MT Admin"],
	[4, "Admin"],
	[8, "National Events"]
].map(function (element) {
	return {
		id: element[0],
		name: element[1]
	};
});

data.subactivities = [
//	['4051', 'Customer Call', '5'],
//	['9999', 'Deployable Indent Set Subactivity', '5'],
//	['2001', 'Exercise - ATEC Evaluation', '2'],
//	['2006', 'Exercise - Battalion Exercise', '2'],
//	['2010', 'Exercise - Battalion TEWT', '2'],
//	['2007', 'Exercise - Brigade Exercise', '2'],
//	['2011', 'Exercise - Brigade TEWT', '2'],
//	['2003', 'Exercise - Combat Skill badge', '2'],
//	['2005', 'Exercise - Company Exercise', '2'],
//	['2008', 'Exercise - Division Exercise', '2'],
//	['2012', 'Exercise - Division TEWT', '2'],
//	['2002', 'Exercise - Full troop exercise', '2'],
//	['2013', 'Exercise - Others ', '2'],
//	['2004', 'Exercise - Platoon Exercise', '2'],
//	['2009', 'Exercise - Section Exercise', '2'],
	['3901', 'Training - ATEC Evaluation', '3'],
	['3003', 'Training - Battalion Training', '3'],
	['3004', 'Training - Brigade Training', '3'],
	['3002', 'Training - Company Training', '3'],
	['3005', 'Training - Division Training', '3'],
	['3902', 'Training - IPPT / VOC / Range', '3'],
	//	['3007', 'Training - Others ', '3'],
	['3001', 'Training - Platoon Training', '3'],
	//  ['3006', 'Training - Section Training', '3'],
	//	['3008', 'Training - Trooplift', '3'],
	['1012', 'Operations - Others ', '1'],
	['1099', 'Operations - National Event', '1'],
	//	['1002', 'Operations - Attachment Standby', '1'],
	['1098', 'Operations - Duty Driver', '1'],
	['1011', 'Operations - Ops Bacinet Standby', '1'],
	['1009', 'Operations - Rostered Standby 12NTM', '1'],
	['1005', 'Operations - Rostered Standby 15min NTM', '1'],
	['1013', 'Operations - Rostered Standby 1NTM', '1'],
	['1006', 'Operations - Rostered Standby 2NTM', '1'],
	['1010', 'Operations - Rostered Standby 48NTM', '1'],
	['1007', 'Operations - Rostered Standby 4NTM', '1'],
	['1008', 'Operations - Rostered Standby 8NTM', '1'],
	['1003', 'Operations - Rostered Standby P1', '1'],
	['1004', 'Operations - Rostered Standby P2', '1'],
//	['1001', 'Operations - Troop Lifting', '1'],
//	['4050', 'Ops Standby Test 1', '1'],
	['4000', 'Admin', '4'],
//	['4010', 'Admin - Allocated Resource (Self-Drive / Appt. Holder)', '4'],
//	['4002', 'Admin - Document Dispatch', '4'],
//	['4003', 'Admin - Document Dispatch (Secret)', '4'],
//	//	['4007', 'Admin - IPPT', '4'],
//	['4004', 'Admin - Passenger Ferry', '4'],
//	//	['4008', 'Admin - Rostered Duties', '4'],
//	['4009', 'Admin - Safety Coverage', '4'],
//	['4005', 'Admin - Small Item Delivery (combined detail)', '4'],
//	['4006', 'Admin - Store Lift', '4'],
//	['4001', 'Admin - Urine Sample Delivery', '4'],
	['5000', 'MT Admin', '5'],
//	['5005', 'MT Admin - Collect vehicle from maintenance site', '5'],
//	['5009', 'MT Admin - Driver attachment', '5'],
//	['5003', 'MT Admin - Node Training', '5'],
//	['5008', 'MT Admin - Orientation and familiarisation', '5'],
//	['5006', 'MT Admin - Send personnel for driver replacement', '5'],
//	['5004', 'MT Admin - Send vehicle for maintenance', '5'],
//	['5001', 'MT Admin - Store Lift', '5'],
//	['5002', 'MT Admin - Top-up Fuel', '5'],
	//['6003', 'Urgent Admin - Ambulance', '6'],
	['6000', 'Urgent Admin', '6']
//	['6001', 'Urgent Admin - Send to detention barracks', '6'],
//	['6002', 'Urgent Admin - VIP Visit', '6']
].map(function (element) {
	return {
		id: element[0],
		name: element[1],
		activityId: element[2],
		text: element[1]
	};
});

data.vehiclePurposes = [
	['AV', 'Ammo Vehicle', '3'],
	['CV', 'Conducting Vehicle', '3'],
	['RC', 'Recce', '3'],
	['SC', 'Safety Coverage', '3'],
	['SR', 'Store Run', '3'],
	['SV', 'Supervising Vehicle', '3'],
	['TI', 'Training Inspection', '3'],
	['TL', 'Troop Lift', '3'],
	['OT', 'Others', '3'],
	['AR', 'Allocated Resource (Self-Drive / Appt. Holder)', '4'],
	['DD', 'Document Dispatch', '4'],
	['DDS', 'Document Dispatch (Secret)', '4'],
	['PF', 'Passenger Ferry', '4'],
	['SC', 'Safety Coverage', '4'],
	['SID', 'Small Item Delivery (combined detail)', '4'],
	['SL', 'Store Lift', '4'],
	['UD', 'Urine Sample Delivery', '4'],
	['VC', 'Collect vehicle from maintenance site', '5'],
	['DA', 'Driver attachment', '5'],
	['NT', 'Node Training', '5'],
	['OF', 'Orientation and familiarisation', '5'],
	['DR', 'Send personnel for driver replacement', '5'],
	['VM', 'Send vehicle for maintenance', '5'],
	['SL', 'Store Lift', '5'],
	['TF', 'Top-up Fuel', '5'],
	['DB', 'Send to detention barracks', '6'],
	['VIP', 'VIP Visit', '6']
].map(function (element) {
	return {
		code: element[0],
		name: element[1],
		activityId: element[2]
	};
});

data.vehicleTypes = [
	[1, '1.5 TON (CAPACITY F1/R4)'],
//	[2, '1.5 TON CARGO TRAILER (CAPACITY F1/R0)'],
	[257, '10 TON (CAPACITY F2/R20)'],
	[3, '106 JEEP (CAPACITY F1/R6)'],
	[5, '3 TON ATLAS 3006B CRANE (CAPACITY F2/R0)'],
	[7, '3 TON BCP'],
	[6, '3 TON BDE CP'],
	[1246, '3 TON COMMAND POST BCP'],
	[1248, '3 TON COMMAND POST FDC'],
	[1247, '3 TON COMMAND POST GECP'],
	[8, '3 TON DIV CP'],
	[9, '3 TON FDC'],
	[10, '3 TON GECP'],
	[4, '3 TON GS'],
	[11, '3 TON HIAB CRANE'],
	[1249, '3 TON METEO'],
	[12, '3 TON POWER TAILGATE'],
	[13, '3 TON TRACK-WAY CLASS 30'],
	[221, '3 TON TRACKWAY CLASS 30 (TYPE A)'],
	[222, '3 TON TRACKWAY CLASS 30 (TYPE B)'],
	[223, '3 TON TRACKWAY CLASS 30 (TYPE C)'],
	[249, '3 TON W/MRS SET'],
	[207, '5 TON  SKID TANKER (SEMI-AUTO)'],
	[1251, '5 TON 14.240 (MANUAL) ATLAS CRANE'],
	[15, '5 TON ATLAS 3006B CRANE (MANUAL)'],
	[204, '5 TON ATLAS CRANE (MANUAL)'],
	[16, '5 TON CGS (AUTO)'],
	[205, '5 TON CRANE (AUTO)'],
	[17, '5 TON CRANE W/WINCH'],
	[233, '5 TON FIREGATE'],
	[14, '5 TON GS (AUTO)'],
	[203, '5 TON GS (MANUAL)'],
	[21, '5 TON GS - STEYR (SEMI-AUTO)'],
	[18, '5 TON GUN TOWER'],
	[19, '5 TON HIAB CRANE(AUTO)'],
	[219, '5 TON MODULE 1 EQPT (CBRE)'],
	[220, '5 TON MODULE 2 EQPT (CBRE)'],
	[266, '5 TON OLD MAN TRUCK(MANUAL)'],
	[208, '5 TON POWER TAILGATE'],
	[1252, '5 TON RADAR'],
	[274, '5 TON RECOVERY WRECKER'],
	[273, '5 TON SKID TANKER (SEMI-AUTO)'],
	[20, '5 TON SKID TANKER(AUTO)'],
	[206, '5 TON SKID TANKER(MANUAL)'],
	[22, '5 TON WINCH (AUTO)'],
	[23, '7 TON GUN TOWER'],
	[70, '7 TON RECOVERY WRECKER'],
	[24, '7 TON TRANSPORTER'],
	[247, '8 TON'],
	[1263, '8 TON GS'],
	[1260, 'ASAEDSAD'],
	[1261, 'ASAEDSAD'],
	[1262, 'ASAEDSADS'],
	[1266, 'BATMOBILE'],
	[265, 'COACH BUS (21SEATERS) NON-AIRCON'],
	[264, 'COACH BUS 24SEATER'],
	[243, 'COACH BUS 28SEATER'],
	[54, 'COACH BUS 42SEATER'],
	[47, 'COACH BUS 48SEATER'],
	[27, 'COMD JEEP'],
	[1254, 'DOG CAR'],
	[250, 'DOGVAN'],
	[251, 'END OF RUNWAY VEHICLE'],
	[215, 'EOD 5TON'],
	[216, 'EOD BUS'],
	[1259, 'EVEREST 0.7TON'],
	[1258, 'EVEREST 0.7TON'],
	[28, 'FORD AMBULANCE'],
	[1253, 'FORD EVEREST 0.7TON'],
	[71, 'FORD EVEREST'],
	[212, 'FORD RANGER'],
	[260, 'GOLF CART'],
	[29, 'GP CAR'],
	[31, 'GP CAR (AUTO)'],
	[32, 'GP CAR (MANUAL)'],
	[30, 'GP CAR (PROVOST)'],
	[1255, 'HELICOPTER'],
	[33, 'HINO BUS/IED BUS'],
	[268, 'HMCT - MB LAK2624'],
	[34, 'HMCT 6 WHEELLER'],
	[200, 'HMCT 8 WHEELLER'],
	[267, 'HMCT,10 TON'],
	[35, 'HMTV'],
	[253, 'HYDRAZINE RESPONSE'],
	[240, 'ISUZU PICKUP'],
	[37, 'L/R AMBULANCE'],
	[36, 'L/R FFR 1TON'],
	[38, 'L/R TACT CP'],
	[39, 'LMTV'],
	[40, 'LPV'],
	[41, 'LSV AGL'],
	[42, 'LSV MILAN'],
	[271, 'LSV SPIDER'],
	[43, 'LSV SPIKE'],
	[272, 'LSV VLSS'],
	[1239, 'LANDROVER FAMS/ METEO'],
	[1236, 'LANDROVER FIREGATE'],
	[1237, 'LANDROVER FIREGATE/ MD'],
	[1238, 'LANDROVER MD'],
	[1241, 'LANDROVER OCEANIA'],
	[1240, 'LANDROVER OPS TWILIGHT'],
	[248, 'LORRY - TWIN CAB'],
	[52, 'M/BENZ SPRINTER(CBRE)'],
	[209, 'MB 290 (HELI CP)'],
	[210, 'MB 290 (HELI)'],
	[1264, 'MB 290 1.5 TON BFI'],
	[44, 'MB 290 1.5 TON'],
	[45, 'MB 290 1.5 TON CP'],
	[1244, 'MB 290 1.5 TON FIREGATE'],
	[1242, 'MB 290 1.5 TON MD'],
	[1243, 'MB 290 1.5 TON MD/ FIREGATE'],
	[46, 'MB 290 1.5 TON VSAT'],
	[201, 'MB 290 1.5 TON WPU'],
	[235, 'MB 300GE JEEP'],
	[48, 'MB SPRINTER 413CDI'],
	[26, 'MERC, AMBULANCE'],
	[50, 'MILAN JEEP'],
	[51, 'MINIBUS (12SEATERS)'],
	[263, 'MINIBUS (14SEATERS)'],
	[53, 'MINIBUS (18SEATERS)'],
	[55, 'MINIBUS URVAN'],
	[56, 'MTV TRAILER'],
	[244, 'MAXI VAN'],
	[1268, 'NEW FORD'],
	[242, 'NISSAN PICKUP'],
	[1265, 'OUV'],
	[252, 'PILOT TRANSPORTER'],
	[270, 'PLUV'],
	[269, 'PSV'],
	[57, 'PICK-UP'],
	[58, 'PICK-UP DOUBLE CABIN'],
	[238, 'PICKUP - FLATBED'],
	[239, 'PICKUP - TWIN CAB'],
	[214, 'PRIME MOVER'],
	[202, 'PROVOST BIKE (MP)'],
	[261, 'QUAD BIKE'],
	[49, 'QUICK RESPONSE VEH - MB313 CDI-1T'],
	[59, 'REBRO BIKE'],
	[60, 'RECCE BIKE (HONDA)'],
	[61, 'RECCE BIKE (YAMAHA)'],
	[63, 'RECCE JEEP (AUTO)'],
	[62, 'RECCE JEEP (MANUAL)'],
	[64, 'SPIKE JEEP'],
	[65, 'STAFF CAR (GRADE 1) - MERCEDES'],
	[66, 'STAFF CAR (GRADE 2) - AUDI'],
	[241, 'STAFF CAR (GRADE 3) - CHEVROLET'],
	[67, 'STAFF CAR (GRADE 3) - FORD'],
	[68, 'STAFF CAR (GRADE 3) - PROTON'],
	[1267, 'STEE VEHICLE'],
	[213, 'SUV'],
	[218, 'SUV (CBRE)'],
	[217, 'SUV (CBRE) QRV'],
	[1257, 'TESTQ3123'],
	[1256, 'TEST_BY_LIXIN'],
	[69, 'UNIMOG GS'],
	[0, 'UNKNOWN'],
	[211, 'UNIMOG COMMS'],
	[1245, 'UNIMOG OPS TWILIGHT'],
	[25, 'VAN, AMBULANCE']
].map(function (element) {
	return {
		id: element[0],
		name: element[1]
	};
});

data.customers = [
	['PTE', 'S8947641J', 'VINOD RAJ', "6234 2345", "9173 7343"],
	['LCP', 'S9034008E', 'ANG SONGJIE, BENSON', "6234 2345", "9173 7343"],
	['DX9', 'S1502866A', 'KUAN KUAN SIN', "6234 2345", "9173 7343"],
	['LCP', 'S9075915I', 'HUANG JING', "6234 2345", "9173 7343"],
	['CFC', 'S9105843Z', 'MOHAMMAD FAIZ BIN RAMLI', "6234 2345", "9173 7343"],
	['SSG', 'S8137022B', 'MOHAMMAD HAIRIL BIN RAIMI', "6234 2345", "9173 7343"],
	['CPL', 'S8833275Z', 'WAN JIANHUI', "6234 2345", "9173 7343"],
	['CPL', 'S9316786D', 'JONATHAN SOH YI XIN', "6234 2345", "9173 7343"],
	['LCP', 'S9124758E', 'LEE HIAN HUI, JARED', "6234 2345", "9173 7343"],
	['LCP', 'S9014113I', 'RANDAL LUI WAI LUM', "6234 2345", "9173 7343"],
	['3SG', 'S8728831E', 'MUHAMMAD JASRIE FIRDAUS', "6234 2345", "9173 7343"],
	['3SG', 'S8811899E', 'MUHAMMAD KASIM BIN UMORTHA', "6234 2345", "9173 7343"],
	['DX6', 'S1458980E', 'SAFARUDIN BIN HASSAN', "6234 2345", "9173 7343"]
].map(function (element) {
	return {
		rank: element[0],
		nricNo: element[1],
		name: element[1] + ': ' + element[0] + ' ' + element[2],
		officeNo: element[3],
		mobileNo: element[4]
	};
});

data.persons = [
	['S7230621Z', 'LEOW KOK PENG', 'LCP', 'DVR', '432 SAR', 'ARMY', 'DVR', 'NSPC_WOSE', '30-Aug-2012', '19-Sep-1990', 'CAT 2(CS)'],
	['S7230655D', 'SHAMSUDIN BIN ABDUL KADIR', '3SG', 'TPT SUPVR', '258 SA', 'ARMY', 'TPT SUPVR(ADV)', 'NSPC_WOSE', '31-Aug-2012', '20-Mar-1991', 'CAT 2(CS)'],
	['S6844623F', 'NG KOK KENG', 'LCP', 'NO APPT#', '87 GDS', 'ARMY', 'DVR', 'NSPC_WOSE', '26-Nov-2008', '17-Mar-1987', 'CAT 2(CS)'],
	['S7228946C', 'SOH JIM HAN, ANDY', 'LCP', 'NO APPT#', 'MR(AGE GP),RPC', 'ARMY', 'DVR', 'NSPC_WOSE', '14-Aug-2012', '19-Sep-1990', 'CAT 2(CS)'],
	['S7228983H', 'TERRY YEO KOK LIANG', 'LCP', 'NO APPT#', 'MNSR E=LCP,RPC', 'ARMY', 'DVR', 'NSPC_WOSE', '20-Aug-2012', '26-Dec-1991', 'CAT 2(CS)'],
	['S7229005D', 'STEVEN LIM CHIN BOON', 'PTE', 'NO APPT#', 'ONSR CRIOFF,RPC', 'ARMY', 'TPT SUPVR', 'NSPC_WOSE', '23-Aug-2012', '19-Sep-1990', 'CAT 2(CS)'],
	['S7229020H', 'SIOW YONG HAN', 'LCP', 'DVR', '543 SIR', 'ARMY', 'DVR', 'NSPC_WOSE', '07-Aug-2012', '19-Sep-1990', 'CAT 2(CS)'],
	['S7229023B', 'LIM BOON SING', 'PTE', 'NO APPT#', 'MR(AGE GP),RPC', 'ARMY', 'DVR', 'NSPC_WOSE', '22-Aug-2012', '26-Mar-1990', 'CAT 2(CS)'],
	['S7229062C', 'JAIHIDIN BIN JA\'AFAR', 'CPL', 'NO APPT#', 'MR(AGE GP),RPC', 'ARMY', 'DVR', 'NSPC_WOSE', '13-Aug-2012', '24-Jun-1992', 'CAT 2(CS)'],
	['S7229086J', 'TAN KANG YIH', 'CPL', 'DVR', '693 SIR', 'ARMY', 'DVR', 'NSPC_WOSE', '15-Aug-2012', '20-Mar-1991', 'CAT 2(CS)'],
	['S7229096H', 'PETER KRISHNA S/O SELVARAJOO', 'LCP', 'NO APPT#', 'MR(AGE GP),RPC', 'ARMY', 'DVR', 'NSPC_WOSE', '15-Aug-2012', '08-Dec-1992', 'CAT 2(CS)'],
	['S7229212Z', 'ANG TECK SENG', 'LCP', 'NO APPT#', 'MR(AGE GP),RPC', 'ARMY', 'DVR', 'NSPC_WOSE', '12-Aug-2012', '02-Jul-1991', 'CAT 2(CS)'],
	['S7229255C', 'SHAIFUL BIN SAABAN', 'CPL', 'NO APPT#', 'MR(AGE GP),RPC', 'ARMY', 'DVR', 'NSPC_WOSE', '28-Aug-2012', '24-Jun-1993', 'CAT 2(CS)'],
	['S7233094C', 'CHUA HOCK BOON', 'PTE', 'DVR', '673 SIR', 'ARMY', 'DVR', 'NSPC_WOSE', '08-Sep-2012', '19-Sep-1990', 'CAT 2(CS)'],
	['S7233110I', 'KHONG SIAK LOONG', 'LCP', 'POL SUP ASST', 'TPT COMD HQ', 'ARMY', 'SUP ASST(GE)', 'NSPC_WOSE', '14-Sep-2012', '14-Jul-1992', 'CAT 2(CS)'],
	['S7233113C', 'NG CHIN HENG', 'LCP', 'NO APPT#', '542 SIR', 'ARMY', 'DVR', 'NSPC_WOSE', '18-Sep-2012', '23-Jun-1992', 'CAT 2(CS)'],
	['S7233130C', 'CHIN KOK POH', 'LCP', 'NO APPT#', 'MR(AGE GP),RPC', 'ARMY', 'DVR', 'NSPC_WOSE', '25-Aug-2012', '19-Sep-1990', 'CAT 2(CS)'],
	['S7245901F', 'TANG CHOR NGEE', 'LCP', 'NO APPT#', 'MR(AGE GP),RPC', 'ARMY', 'DVR', 'NSPC_WOSE', '03-Dec-2012', '19-Dec-1990', 'CAT 2(CS)'],
	['S7245906G', 'LAU YUIT YAN', 'LCP', 'DVR', 'HQ 3 DIV', 'ARMY', 'DVR', 'NSPC_WOSE', '03-Dec-2012', '20-Dec-1990', 'CAT 2(CS)'],
	['S7245942C', 'CHUA SWU YAU', 'CPL', 'TECH SUP ASST', 'TPT CEN(NORTH)/1 SAF TPT BN', 'ARMY', 'SUP ASST(AMMO)', 'NSPC_WOSE', '08-Dec-2012', '16-Mar-1993', 'CAT 2(CS)'],
	['S7245964D', 'TAN YEW LENG CLARENCE', '3SG', 'IC', '3 SAF TPT BN', 'ARMY', 'TPT SUPVR', 'NSPC_WOSE', '27-Nov-2012', '17-Dec-1993', 'CAT 2(CS)'],
	['S7246015D', 'TAN KIAN ANN', 'LCP', 'NO APPT#', 'MR(AGE GP),RPC', 'ARMY', 'DVR', 'NSPC_WOSE', '10-Dec-2012', '19-Dec-1990', 'CAT 2(CS)'],
	['S7246024C', 'MOHD EDDIE FAIZAL BIN MOHAMED TAIB', 'LCP', 'DVR', '255 SA', 'ARMY', 'DVR', 'NSPC_WOSE', '20-Sep-2012', '01-Sep-1993', 'CAT 2(CS)'],
	['S7246039A', 'OH BENG LYE', 'LCP', 'DVR', '451 SAR', 'ARMY', 'DVR', 'NSPC_WOSE', '01-Dec-2012', '19-Dec-1990', 'CAT 2(CS)'],
	['S7246089H', 'CHIO BOON CHIEO', '3SG', 'NO APPT#', '3 GSTB', 'ARMY', 'DVR(TRAINEE)', 'NSPC_WOSE', '02-Mar-1995', '00-Jan-1900', 'CAT 2(CS)'],
	['S7246095B', 'LIM KIAN HUAT', 'CPL', 'NO APPT#', 'MR(AGE GP),RPC', 'ARMY', 'DVR', 'NSPC_WOSE', '29-Nov-2012', '19-Dec-1990', 'CAT 2(CS)'],
	['S7246132J', 'KOH TIAN SIEW', 'LCP', 'NO APPT#', 'MR(AGE GP),RPC', 'ARMY', 'DVR', 'NSPC_WOSE', '08-Dec-2012', '19-Dec-1990', 'CAT 2'],
	['S7246162B', 'BU YAM HUI', 'LCP', 'DVR', '587 SIR', 'ARMY', 'DVR', 'NSPC_WOSE', '09-Dec-2012', '19-Dec-1990', 'CAT 2(CS)'],
	['S7246267Z', 'MUHAMMAD AZLI BIN SAHARI', 'LCP', 'NO APPT#', 'MR(AGE GP),RPC', 'ARMY', 'DVR', 'NSPC_WOSE', '16-Dec-2012', '24-Jun-1993', 'CAT 2(CS)'],
	['S7246330G', 'LONG CHAY SENG, STEVEN', 'LCP', 'DVR(HVY CLASS)', '3 GSTB', 'ARMY', 'DVR(TRAINEE)', 'NSPC_WOSE', '07-Dec-2012', '16-Jul-1991', 'CAT 2A'],
	['S7246455I', 'HOO AH PENG', 'LCP', 'DVR', '3 DIV ARTY HQ', 'ARMY', 'DVR', 'NSPC_WOSE', '10-Dec-2012', '18-Jan-1995', 'CAT 2(CS)'],
	['S7246461C', 'NEW ENG SOON', 'LCP', 'NO APPT#', 'MR(AGE GP),RPC', 'ARMY', 'DVR', 'NSPC_WOSE', '11-Dec-2012', '19-Dec-1990', 'CAT 2(CS)'],
	['S7246466D', 'ONG BAN SENG', 'LCP', 'NO APPT#', 'MNSR E=LCP,RPC', 'ARMY', 'DVR', 'NSPC_WOSE', '22-Nov-2012', '02-Jul-1991', 'CAT 2(CS)'],
	['S7246480Z', 'PANG KIAN YEW', 'LCP', 'NO APPT#', 'ONSR IMPRN,SAFPU', 'ARMY', 'DVR', 'NSPC_WOSE', '11-Dec-2012', '20-Mar-1991', 'CAT 2(CS)'],
	['S7246512A', 'TANG KAM HON DONOVAN', 'CPL', 'NO APPT#', 'MR(AGE GP),RPC', 'ARMY', 'DVR', 'NSPC_WOSE', '08-Dec-2012', '02-Jul-1991', 'CAT 2(CS)'],
	['S7246519I', 'LIM CHOON SEONG', 'LCP', 'DVR', '22 LOG SP GP', 'ARMY', 'DVR', 'NSPC_WOSE', '27-Nov-2012', '19-Dec-1990', 'CAT 2(CS)'],
	['S7246524E', 'TAN KWEE YONG', 'LCP', 'NO APPT#', 'DNSR O WK,RPC', 'ARMY', 'DVR', 'NSPC_WOSE', '09-Dec-2012', '15-Jan-1991', 'CAT 2(CS)'],
	['S7246561Z', 'LEE CHOON KWANG', 'LCP', 'DVR', '588 SIR', 'ARMY', 'DVR', 'NSPC_WOSE', '26-Nov-2012', '19-Dec-1990', 'CAT 2(CS)'],
	['S7246577F', 'LEE BOON TUAN', 'LCP', 'NO APPT#', 'SPECIAL HL,RPC', 'ARMY', 'DVR', 'NSPC_WOSE', '04-Nov-2012', '19-Mar-1991', 'CAT 2(CS)'],
	['S7246619E', 'TEY TECK SOON', '3SG', 'DVR', '21 DS MED BN', 'ARMY', 'TPT SUPVR', 'NSPC_WOSE', '07-Dec-2012', '15-Jan-1991', 'CAT 2(CS)'],
	['S7246623C', 'CHUA ENG KHOON', 'LCP', 'NO APPT#', 'MR(AGE GP),RPC', 'ARMY', 'DVR', 'NSPC_WOSE', '06-Dec-2012', '19-Dec-1990', 'CAT 2(CS)'],
	['S7230732A', 'WOO MUN KIAT', 'LCP', 'DVR', '541 SIR', 'ARMY', 'DVR', 'NSPC_WOSE', '16-Aug-2012', '19-Sep-1990', 'CAT 2(CS)'],
	['S7230750Z', 'YAN KAR KIONG', 'LCP', 'NO APPT#', 'MR(AGE GP),RPC', 'ARMY', 'DVR', 'NSPC_WOSE', '01-Sep-2012', '02-Jul-1991', 'CAT 2(CS)'],
	['S7230783F', 'JUFFREY BIN MOHAMED', 'LCP', 'NO APPT#', 'MR(AGE GP),RPC', 'ARMY', 'DVR', 'NSPC_WOSE', '31-Aug-2012', '16-Jul-1991', 'CAT 2(CS)'],
	['S7230785B', 'HUANG FENG BAO', 'LCP', 'DVR', '425 SAR', 'ARMY', 'DVR', 'NSPC_WOSE', '27-Aug-2012', '17-Mar-1993', 'CAT 2(CS)'],
	['S7230790I', 'ONG RAYMOND', 'CPL', 'DVR(HVY CLASS)', '3 GSTB', 'ARMY', 'DVR', 'NSPC_WOSE', '26-Aug-2012', '24-Jun-1993', 'CAT 2(CS)'],
	['S7230879D', 'HO KWOK KEONG', 'LCP', 'DVR', '622 SIR', 'ARMY', 'DVR', 'NSPC_WOSE', '19-Aug-2012', '18-Oct-1990', 'CAT 2(CS)'],
	['S7230881F', 'SULAIMAN BIN MOHAMED ISMAIL', 'LCP', 'NO APPT#', 'MR(AGE GP),RPC', 'ARMY', 'DVR', 'NSPC_WOSE', '18-Aug-2012', '08-Dec-1992', 'CAT 2(CS)'],
	['S7230943Z', 'YONG CHIN FUNG', 'PTE', 'DVR', '543 SIR', 'ARMY', 'DVR', 'NSPC_WOSE', '31-Dec-1950', '19-Sep-1990', 'CAT 2(CS)'],
	['S7230973A', 'TAN POH SOON', 'LCP', 'NO APPT#', 'HL,RPC(ONE N)', 'ARMY', 'DVR', 'NSPC_WOSE', '29-Aug-2012', '19-Sep-1990', 'CAT 2(CS)'],
	['S7231002J', 'LEE WAI KHUEN', 'PTE', 'DVR', '1 GSMB', 'ARMY', 'DVR', 'NSPC_WOSE', '29-Aug-2012', '29-Sep-1992', 'CAT 2A'],
	['S7231015B', 'HAIROMEE BIN JUMAIN', 'CPL', 'NO APPT#', 'MR(AGE GP),RPC', 'ARMY', 'DVR', 'NSPC_WOSE', '02-Aug-2012', '03-Sep-1991', 'CAT 2(CS)'],
	['S7231019E', 'LENG WAI KHEONG, ELWYN', 'CPL', 'NO APPT#', 'MR(AGE GP),RPC', 'ARMY', 'DVR', 'NSPC_WOSE', '28-Aug-2012', '03-Sep-1991', 'CAT 2(CS)'],
	['S7231020I', 'TEO CHANG KIN', 'LCP', 'NO APPT#', 'MNSR E=LCP,RPC', 'ARMY', 'DVR', 'NSPC_WOSE', '22-Aug-2012', '26-Mar-1992', 'CAT 2(CS)'],
	['S7243612A', 'AIZAN BIN MASUTI', 'CPL', 'DVR', '273 SA', 'ARMY', 'DVR', 'NSPC_WOSE', '07-Oct-2012', '19-Dec-1990', 'CAT 2(CS)'],
	['S7243613Z', 'IBRAHIM BIN OTHMAN', 'LCP', 'NO APPT#', 'HQ 6 DIV', 'ARMY', 'DVR', 'NSPC_WOSE', '05-Oct-2012', '19-Dec-1990', 'CAT 2(CS)'],
	['S7243635J', 'TAN GUAN ENG', 'LCP', 'DVR', '466 SAR', 'ARMY', 'DVR', 'NSPC_WOSE', '18-Nov-2012', '19-Jul-1995', 'CAT 2(CS)'],
	['S7243717I', 'NAZARUDIN BIN MALIK', 'LCP', 'DVR', '557 SIR', 'ARMY', 'DVR', 'NSPC_WOSE', '31-Dec-1950', '19-Dec-1990', 'CAT 2(CS)'],
	['S7243730F', 'SENG KHEE NGIAT', 'LCP', 'NO APPT#', 'MR(AGE GP),RPC', 'ARMY', 'DVR', 'NSPC_WOSE', '28-Nov-2012', '02-Jul-1991', 'CAT 2A'],
	['S7243731D', 'SUHAIMI MOHAMED SALLEH', 'LCP', 'NO APPT#', 'RHL,HQ 3 DIV', 'ARMY', 'DVR', 'NSPC_WOSE', '23-Nov-2012', '29-Sep-1992', 'CAT 2(CS)'],
	['S7243745D', 'YAZI BIN MOHAMED NOR', 'LCP', 'NO APPT#', 'MNSR E=LCP,RPC', 'ARMY', 'DVR', 'NSPC_WOSE', '28-Nov-2012', '19-Dec-1990', 'CAT 2(CS)'],
	['S7231585E', 'TAN TECK HENG', 'PTE', 'NO APPT#', 'ONSR CRIOFF,RPC', 'ARMY', 'DVR', 'NSPC_WOSE', '31-Dec-1950', '19-Sep-1990', 'CAT 2(CS)'],
	['S7231598G', 'MUTHUSAMY SUBRAMANIAM', 'LCP', 'DVR', '240 SA', 'ARMY', 'DVR', 'NSPC_WOSE', '17-Aug-2012', '10-Dec-1991', 'CAT 2(CS)'],
	['S7231626F', 'ABDUL GHANI BIN JAABAR', 'LCP', 'DVR(HVY CLASS)', '1 GSTB', 'ARMY', 'DVR', 'NSPC_WOSE', '24-Aug-2012', '31-Mar-1992', 'CAT 2(CS)'],
	['S6839590I', 'RAMLEE BIN AHMAD', 'PTE', 'NO APPT#', 'MR(AGE GP),RPC', 'ARMY', 'DVR', 'NSPC_WOSE', '22-Oct-2008', '17-Dec-1986', 'CAT 2(CS)'],
	['S6839668I', 'NEO AH SENG', 'CPL', 'NO APPT#', '504 SIR', 'ARMY', 'DVR', 'NSPC_WOSE', '10-Oct-2008', '01-Jan-1985', 'CAT 2(CS)'],
	['S6839723E', 'TAN KIM SAN', 'LCP', 'NO APPT#', 'MR(AGE GP),RPC', 'ARMY', 'DVR', 'NSPC_WOSE', '09-Oct-2008', '16-Dec-1986', 'CAT 2A - MANUAL'],
	['S6839736G', 'SAM TUCK LAM', 'PTE', 'DVR', '257 SA', 'ARMY', 'DVR', 'NSPC_WOSE', '14-Oct-2008', '13-Sep-1988', 'CAT 2(CS)'],
	['S6839761H', 'QUAH YAW KHOON', 'LCP', 'NO APPT#', 'MR(AGE GP),RPC', 'ARMY', 'DVR', 'NSPC_WOSE', '18-Oct-2008', '17-Dec-1986', 'CAT 2(CS)'],
	['S6839806A', 'KAMIS BIN BUANG', 'PTE', 'NO APPT#', '214 SA', 'ARMY', 'DVR', 'NSPC_WOSE', '24-Sep-2008', '16-Dec-1986', 'CAT 2(CS)'],
	['S6839807Z', 'TAN HOO ENG', 'LCP', 'NO APPT#', 'MR(AGE GP),RPC', 'ARMY', 'DVR', 'NSPC_WOSE', '11-Oct-2008', '15-Dec-1987', 'CAT 2(CS)'],
	['S6839861D', 'SIM BOON PING', 'LCP', 'NO APPT#', '308 SCE', 'ARMY', 'DVR', 'NSPC_WOSE', '11-Oct-2008', '17-Dec-1986', 'CAT 2(CS)'],
	['S6839866E', 'TAN THIAM LEONG', 'LCP', 'DVR', '30 SCE', 'ARMY', 'DVR', 'NSPC_WOSE', '23-Oct-2008', '16-Dec-1986', 'CAT 2(CS)'],
	['S6839871A', 'NG CHEE FAI', '3SG', 'NO APPT#', 'MR(AGE GP),RPC', 'ARMY', 'TPT SUPVR', 'NSPC_WOSE', '04-Oct-2008', '16-Dec-1986', 'CAT 2(CS)'],
	['S6839888F', 'TAN JUN DA', '1SG', 'NO APPT#', 'RHL,HQ 3 DIV', 'ARMY', 'TPT SUPVR', 'NSPC_WOSE', '06-Oct-2008', '17-Dec-1986', 'CAT 2(CS)'],
	['S6839927J', 'NEO POH SENG BOBBY', 'PTE', 'NO APPT#', 'ONSR CRIOFF,RPC', 'ARMY', 'DVR', 'NSPC_WOSE', '16-Sep-2008', '15-Dec-1987', 'CAT 2(CS)'],
	['S6839956D', 'SONG HOCK YONG', 'LCP', 'NO APPT#', 'MR(AGE GP),RPC', 'ARMY', 'DVR', 'NSPC_WOSE', '08-Oct-2008', '16-Dec-1986', 'CAT 2(CS)'],
	['S6840042B', 'CHUA GEK HUAT', 'LCP', 'NO APPT#', 'MR(AGE GP),RPC', 'ARMY', 'DVR', 'NSPC_WOSE', '12-Oct-2008', '16-Dec-1986', 'CAT 2(CS)'],
	['S6840063E', 'SIM HWEE SOON', 'LCP', 'NO APPT#', 'MR(AGE GP),RPC', 'ARMY', 'DVR', 'NSPC_WOSE', '09-Oct-2008', '15-Jun-1988', 'CAT 2(CS)'],
	['S6840077E', 'KOUNG HOE KEET', 'PTE', 'NO APPT#', 'MR(AGE GP),RPC', 'ARMY', 'DVR', 'NSPC_WOSE', '21-Oct-2008', '16-Dec-1986', 'CAT 2(CS)'],
	['S6840109G', 'MICHAEL S/O SAMI PILLAY', 'LCP', 'NO APPT#', 'MR(AGE GP),RPC', 'ARMY', 'DVR', 'NSPC_WOSE', '17-Oct-2008', '16-Dec-1986', 'CAT 2(CS)'],
	['S6840128C', 'MOHAMMAD YAZID BIN AHMAD', 'LCP', 'NO APPT#', 'HL,RPC(ONE N)', 'ARMY', 'DVR', 'NSPC_WOSE', '12-Oct-2008', '16-Dec-1986', 'CAT 2(CS)'],
	['S6845979F', 'KHOO SAY GUAN', 'LCP', 'NO APPT#', 'DNSR O WK,RPC', 'ARMY', 'DVR(TRAINEE)', 'NSPC_WOSE', '15-Jun-1990', '00-Jan-1900', 'CAT 2(CS)'],
	['S6923486J', 'TEO KOON SUN', 'LCP', 'NO APPT#', '188 SIR', 'ARMY', 'DVR', 'NSPC_WOSE', '07-Jul-2009', '15-Sep-1987', 'CAT 2(CS)'],
	['S6923490I', 'CHUA SOI PING', 'PTE', 'NO APPT#', 'ONSR CRIOFF,RPC', 'ARMY', 'DVR', 'NSPC_WOSE', '30-Jun-2009', '15-Sep-1987', 'CAT 2(CS)'],
	['S6923533F', 'ISHAK BIN AHMAD', 'PTE', 'NO APPT#', 'MR(AGE GP),RPC', 'ARMY', 'DVR', 'NSPC_WOSE', '05-Jul-2009', '15-Sep-1987', 'CAT 2(CS)'],
	['S6923547F', 'NG WEE KIEN', 'CPL', 'NO APPT#', 'MR(AGE GP),RPC', 'ARMY', 'DVR', 'NSPC_WOSE', '05-Jul-2009', '15-Dec-1987', 'CAT 2(CS)'],
	['S6923563H', 'PHANG JOEH YUIN', 'PTE', 'NO APPT#', 'MR(AGE GP),RPC', 'ARMY', 'DVR', 'NSPC_WOSE', '03-Jul-2009', '15-Dec-1987', 'CAT 2(CS)'],
	['S6923604I', 'CHUA HOCK LEONG', 'PFC', 'DVR', '1 CSH', 'ARMY', 'DVR', 'NSPC_WOSE', '07-Jul-2009', '15-Jun-1988', 'CAT 2(CS)'],
	['S6923616B', 'YONG FAH KEONG', 'LCP', 'NO APPT#', 'HL,RPC(ONE N)', 'ARMY', 'DVR', 'NSPC_WOSE', '10-Jul-2009', '15-Sep-1987', 'CAT 2(CS)'],
	['S6923711H', 'CHIA CHONG VOON', 'LCP', 'NO APPT#', 'MR(AGE GP),RPC', 'ARMY', 'DVR', 'NSPC_WOSE', '08-Jul-2009', '15-Jun-1988', 'CAT 2(CS)'],
	['S6923842D', 'TEE NGIN HUAT', 'PTE', 'NO APPT#', '400 SAR', 'ARMY', 'DVR', 'NSPC_WOSE', '10-Jun-2009', '15-Dec-1987', 'CAT 2A'],
	['S6923937D', 'CHUA CHEE HUI', 'LCP', 'NO APPT#', 'MR(AGE GP),RPC', 'ARMY', 'DVR', 'NSPC_WOSE', '11-Jul-2009', '14-Jun-1988', 'CAT 2(CS)'],
	['S6923973J', 'SIM ENG HWA', 'LCP', 'NO APPT#', 'MR(AGE GP),RPC', 'ARMY', 'DVR', 'NSPC_WOSE', '10-Jul-2009', '16-Sep-1987', 'CAT 2(CS)'],
	['S6923985D', 'MOHAMED IMBRAN BIN MAZLAN', 'LCP', 'NO APPT#', 'MR(AGE GP),RPC', 'ARMY', 'DVR', 'NSPC_WOSE', '05-Jul-2009', '15-Sep-1987', 'CAT 2(CS)'],
	['S6923989G', 'SOH SIN MIN', 'LCP', 'NO APPT#', 'MR(AGE GP),RPC', 'ARMY', 'DVR', 'NSPC_WOSE', '08-Jul-2009', '15-Sep-1987', 'CAT 2(CS)'],
	['S6924064Z', 'CHAN ANG WANG', 'LCP', 'NO APPT#', '400 SAR', 'ARMY', 'DVR', 'NSPC_WOSE', '30-Jul-2009', '15-Sep-1987', 'CAT 2(CS)'],
	['S6924075E', 'ROSLAN BIN ALI', 'PTE', 'NO APPT#', '214 SA', 'ARMY', 'DVR', 'NSPC_WOSE', '30-Jul-2009', '15-Sep-1987', 'CAT 2(CS)'],
	['S6924114Z', 'KOH CHIN SOON', 'LCP', 'DVR', '400(A) SAR', 'ARMY', 'DVR', 'NSPC_WOSE', '03-Aug-2009', '15-Sep-1987', 'CAT 2A'],
	['S6924157C', 'POH CHONG SEAN', 'LCP', 'NO APPT#', '264 SA', 'ARMY', 'DVR', 'NSPC_WOSE', '28-Jul-2009', '15-Dec-1987', 'CAT 2(CS)']
].map(function (element) {
	return {
		nricNo: element[0],
		name: element[1],
		displayName: element[2] + ' ' + element[1] + ' (' + element[0] + ')',
		rank: element[2],
		appointment: element[3],
		unit: element[4],
		service: element[5],
		vocation: element[6],
		ptag: element[7],
		enlistmentDate: element[8],
		ord: element[9],
		security: element[10],
	};
});

data.drivers = [
	[1, 'LCP LEOW KOK PENG', 'S7230621Z', 'ITI NODE', 'CHINESE', 'BUDDISM', 'A', '31-Mar-2016 16:00', '02-Apr-2016 08:00', '27-Mar-2016 15:40', '27-Mar-2016 21:30', '5 TON GS (AUTO)'],
	[2, '3SG SHAMSUDIN BIN ABDUL KADIR', 'S7230655D', 'ITI NODE', 'MALAY', 'ISLAM', 'A', '31-Mar-2016 16:00', '02-Apr-2016 08:00', '27-Mar-2016 15:40', '27-Mar-2016 21:30', '5 TON GS (AUTO)'],
	[3, 'LCP NG KOK KENG', 'S6844623F', 'ITI NODE', 'CHINESE', 'CATHOLICISM', 'A', '31-Mar-2016 16:00', '02-Apr-2016 08:00', '27-Mar-2016 15:40', '27-Mar-2016 21:30', '5 TON GS (AUTO)'],
	[4, 'LCP SOH JIM HAN, ANDY', 'S7228946C', 'ITI NODE', 'CHINESE', 'NIL', 'A', '31-Mar-2016 16:00', '02-Apr-2016 08:00', '27-Mar-2016 15:40', '27-Mar-2016 21:30', '5 TON GS (AUTO)'],
	[5, 'LCP TERRY YEO KOK LIANG', 'S7228983H', 'ITI NODE', 'CHINESE', 'CATHOLICISM', 'A', '31-Mar-2016 16:00', '02-Apr-2016 08:00', '27-Mar-2016 15:40', '27-Mar-2016 21:30', '5 TON GS (AUTO)'],
	[6, 'PTE STEVEN LIM CHIN BOON', 'S7229005D', 'ITI NODE', 'CHINESE', 'BUDDISM', 'A', '31-Mar-2016 16:00', '02-Apr-2016 08:00', '27-Mar-2016 15:40', '27-Mar-2016 21:30', '5 TON GS (AUTO)'],
	[7, 'LCP SIOW YONG HAN', 'S7229020H', 'ITI NODE', 'CHINESE', 'NIL', 'A', '31-Mar-2016 16:00', '02-Apr-2016 08:00', '27-Mar-2016 15:40', '27-Mar-2016 21:30', '5 TON GS (AUTO)'],
	[8, 'PTE LIM BOON SING', 'S7229023B', 'ITI NODE', 'CHINESE', 'CHRISTIANITY', 'A', '31-Mar-2016 16:00', '02-Apr-2016 08:00', '27-Mar-2016 15:40', '27-Mar-2016 21:30', '5 TON GS (AUTO)'],
	[9, 'CPL JAIHIDIN BIN JA\'AFAR', 'S7229062C', 'ITI NODE', 'MALAY', 'ISLAM', 'A', '31-Mar-2016 16:00', '02-Apr-2016 08:00', '27-Mar-2016 15:40', '27-Mar-2016 21:30', '5 TON GS (AUTO)'],
	[10, 'CPL TAN KANG YIH', 'S7229086J', 'ITI NODE', 'CHINESE', 'BUDDISM', 'A', '31-Mar-2016 16:00', '02-Apr-2016 08:00', '27-Mar-2016 15:40', '27-Mar-2016 21:30', '5 TON GS (AUTO)']
].map(function (element) {
	return {
		id: element[0],
		name: element[1],
		nricNo: element[2],
		node: element[3],
		race: element[4],
		religion: element[5],
		pes: element[6],
		startTime: element[7],
		endTime: element[8],
		prevStartTime: element[9],
		prevEndTime: element[10],
		prevVehicleType: element[11]
	};
});

data.tripSummaries = [
	[1, 'S8806477A', 'CPL MUHAMMAD NOOR RIZAN BIN ISMAIL', 'ITI Node', 'MID33309', 'LR 110 GS', 'ITI Node', '15-Apr-2015 01:36', '01-May-2015 05:11', 'Pending', 53.6],
	[2, 'S7834544C', 'PTE TAN CHEW HENG', 'ITI Node', 'MID33309', 'LR 110 GS', 'ITI Node', '10-Apr-2016 00:49', '15-Apr-2016 01:35', 'Pending', 37.1],
	[3, 'S7229005D', 'PTE STEVEN LIM CHIN BOON', 'ITI Node', 'MID33309', 'LR 110 GS', 'ITI Node', '01-Apr-2016 23:10', '10-Apr-2016 00:48', 'Booked Out', 140.1]
].map(function (element) {
	return {
		id: element[0],
		nricNo: element[1],
		driver: element[2],
		driverNode: element[3],
		vehicleNo: element[4],
		vehicleModel: element[5],
		vehicleNode: element[6],
		startTime: element[7],
		endTime: element[8],
		status: element[9],
		totalMileage: element[10]
	};
});

data.trips = [
	[1, 'S8806477A', 'CPL MUHAMMAD NOOR RIZAN BIN ISMAIL', 'ITI Node', 'MID33309', 'LR 110 GS', 'ITI Node', '31-Mar-2016 23:10', '31-Mar-2016 23:30', 11.2, 11.2],
	[2, 'S8806477A', 'CPL MUHAMMAD NOOR RIZAN BIN ISMAIL', 'ITI Node', 'MID33309', 'LR 110 GS', 'ITI Node', '31-Mar-2016 23:41', '31-Mar-2016 23:57', 13.1, 24.3],
	[3, 'S8806477A', 'CPL MUHAMMAD NOOR RIZAN BIN ISMAIL', 'ITI Node', 'MID33309', 'LR 110 GS', 'ITI Node', '01-Apr-2016 00:15', '01-Apr-2016 00:48', 29.3, 53.6],
	[4, 'S7229005D', 'PTE STEVEN LIM CHIN BOON', 'ITI Node', 'MID33309', 'LR 110 GS', 'ITI Node', '01-Apr-2015 01:35', '01-Apr-2015 01:55', 19.3, 72.9],
	[5, 'S7229005D', 'PTE STEVEN LIM CHIN BOON', 'ITI Node', 'MID33309', 'LR 110 GS', 'ITI Node', '01-Apr-2015 02:05', '01-Apr-2015 02:31', 23.7, 96.6],
	[6, 'S7229005D', 'PTE STEVEN LIM CHIN BOON', 'ITI Node', 'MID33309', 'LR 110 GS', 'ITI Node', '01-Apr-2015 03:04', '01-Apr-2015 03:37', 25.1, 121.7],
	[7, 'S7229005D', 'PTE STEVEN LIM CHIN BOON', 'ITI Node', 'MID33309', 'LR 110 GS', 'ITI Node', '01-Apr-2015 03:45', '01-Apr-2015 04:24', 41.7, 163.4],
	[8, 'S7229005D', 'PTE STEVEN LIM CHIN BOON', 'ITI Node', 'MID33309', 'LR 110 GS', 'ITI Node', '01-Apr-2015 04:41', '01-Apr-2015 05:11', 30.3, 193.7]
].map(function (element) {
	return {
		id: element[0],
		nricNo: element[1],
		driver: element[2],
		driverNode: element[3],
		vehicleNo: element[4],
		vehicleModel: element[5],
		vehicleNode: element[6],
		startTime: element[7],
		endTime: element[8],
		mileage: element[9],
		totalMileage: element[10]
	};
});

data.vehicles = [
	[1, 'MID10781', '3 TON GS', 'DIEPPE BARRACK 2', '31-Mar-2016 16:00', '02-Apr-2016 08:00'],
	[2, 'MID108', 'STAFF CAR (GRADE 3) - Chevrolet', 'LTC', '31-Mar-2016 16:00', '02-Apr-2016 08:00'],
	[3, 'MID10846', '3 TON GS', 'DIEPPE BARRACK 2', '31-Mar-2016 16:00', '02-Apr-2016 08:00'],
	[4, 'MID110', 'STAFF CAR (GRADE 3) - Chevrolet', 'DIEPPE BARRACK 2', '31-Mar-2016 16:00', '02-Apr-2016 08:00'],
	[5, 'MID11065', '3 TON GS', 'SEMBAWANG A NODE NEW', '31-Mar-2016 16:00', '02-Apr-2016 08:00'],
	[6, 'MID11073', '3 TON GS', 'SEMBAWANG A NODE NEW', '31-Mar-2016 16:00', '02-Apr-2016 08:00'],
	[7, 'MID11122', '3 TON GS', 'SEMBAWANG A NODE NEW', '31-Mar-2016 16:00', '02-Apr-2016 08:00'],
	[8, 'MID11132', '3 TON GS', 'SEMBAWANG A NODE NEW', '31-Mar-2016 16:00', '02-Apr-2016 08:00'],
	[9, 'MID11148', '3 TON GS', 'SEMBAWANG A NODE NEW', '31-Mar-2016 16:00', '02-Apr-2016 08:00'],
	[10, 'MID11151', '3 TON GS', 'SEMBAWANG A NODE NEW', '31-Mar-2016 16:00', '02-Apr-2016 08:00']
].map(function (element) {
	return {
		id: element[0],
		vehicleNo: element[1],
		name: element[2],
		node: element[3],
		startTime: element[4],
		endTime: element[5]
	};
});

data.venues = [
	[299, 'AMOY QUEE CAMP'],
	[334, 'AYER RAJAH CAMP'],
	[338, 'BCTC'],
	[859, 'BEDOK CAMP'],
	[340, 'BEDOK SPORTS AND FITNESS CENTRE'],
	[344, 'BIC RANGE'],
	[345, 'BISHAN STADIUM'],
	[843, 'BO TIEN HOME'],
	[857, 'BUKIT PANJANG CAMP'],
	[871, 'CHANGI AIRBASE'],
	[2025, 'CHANGI HOSPITAL'],
	[385, 'CHANGI INTERNATIONAL AIRPORT POLICE DIVISION'],
	[386, 'CHANGI NAVAL BASE'],
	[387, 'CHANGI POINT FERRY JETTY'],
	[389, 'CHANGI SEAVIEW CHALET'],
	[391, 'CHIA SERVICE STATION'],
	[392, 'CHOA CHU KANG COMFORT DELGRO'],
	[393, 'CHOA CHU KANG STADIUM'],
	[878, 'CHONG PANG CAMP'],
	[404, 'CLEMENTI CAMP'],
	[410, 'CMPB'],
	[841, 'DIEPPE BARRACKS'],
	[425, 'DSO NATIONAL LABORATORIES'],
	[426, 'DSTA'],
	[429, 'DTTB TOWER B'],
	[430, 'EAST COAST PARK'],
	[862, 'ECP CARPARK B'],
	[431, 'ELISS CENTRE'],
	[445, 'GLOUCESTER CAMP'],
	[446, 'GOMBAK CAMP'],
	[449, 'GRAND COPTHORNE HOTEL'],
	[450, 'GRAND HYATT HOTEL'],
	[861, 'HAVELOCK'],
	[454, 'HEALTH SCIENCES AUTHORITY'],
	[456, 'HENDON CAMP'],
	[467, 'HILLVIEW CAMP'],
	[468, 'HOTEL INTER-CONTINENTAL'],
	[501, 'HUME AVE'],
	[863, 'INDECO DEFU LANE'],
	[503, 'ISTANA'],
	[510, 'JALAN MURAI'],
	[511, 'JOO CHIAT AVE'],
	[512, 'JOO GUAN SENG'],
	[513, 'JURONG CAMP'],
	[518, 'JURONG ISLAND'],
	[520, 'JURONG POINT'],
	[521, 'KAKI BUKIT CAMP'],
	[522, 'KALLANG SEA TRAINING CENTRE'],
	[2028, 'KATIB CAMP'],
	[523, 'KEAT HONG CAMP'],
	[526, 'KENT RIDGE PARK'],
	[527, 'KHATIB CAMP'],
	[851, 'KRANJI CAMP 2'],
	[539, 'KRANJI CAMP 3'],
	[555, 'LADANG'],
	[556, 'LAM SAM AREA'],
	[557, 'LENTOR ROAD'],
	[558, 'LIM CHU KANG AREA'],
	[559, 'LIM CHU KANG CAMP 1'],
	[560, 'LIM CHU KANG CAMP 2'],
	[563, 'LORONG ASRAMA'],
	[860, 'MACRITCHIE RESERVIOR'],
	[565, 'MACRITCHIE RESERVOIR'],
	[566, 'MAJU CAMP'],
	[572, 'MANDAI 300M RANGE'],
	[573, 'MANDAI CAMP 2'],
	[574, 'MANDAI HILL CAMP'],
	[581, 'MARINA SQUARE'],
	[583, 'MARSILING TRAINING AREA'],
	[582, 'MERITUS MANDARIN'],
	[585, 'MINDEF'],
	[587, 'MOONBEAM WALK'],
	[588, 'MOUNT PLEASANT'],
	[846, 'MOWBRAY CAMP'],
	[589, 'MURAI GATE'],
	[590, 'MURAI RESERVOIR'],
	[591, 'NATIONAL STADIUM'],
	[592, 'NATIONAL UNIVERSITY HOSPITAL'],
	[593, 'NEE SOON 100M RANGE 1'],
	[594, 'NEE SOON 100M RANGE 2'],
	[595, 'NEE SOON 500M RANGE'],
	[597, 'NEE SOON CAMP'],
	[608, 'NEE SOON DRICLAD CENTER'],
	[613, 'NEW PARK HOTEL'],
	[622, 'ORIENTAL HOTEL'],
	[623, 'PAN PACIFIC HOTEL'],
	[624, 'PANDAN LOOP'],
	[625, 'PASIR LABA CAMP'],
	[638, 'PASIR RIS BUS INTERCHANGE'],
	[639, 'PASIR RIS CAMP'],
	[649, 'PASIR RIS PARK'],
	[873, 'PAYA LEBAR AIR BASE'],
	[653, 'PENINSULA HOTEL'],
	[654, 'PERMATANG'],
	[845, 'PHILIPS SERVICING CENTRE'],
	[655, 'PIERCE AMMUNITION DEPOT'],
	[660, 'POYAN RANGE'],
	[662, 'PULAU TEKONG 100M RANGE'],
	[663, 'PULAU TEKONG FERRY TERMINAL'],
	[664, 'PULAU TEKONG MEDICAL CENTRE'],
	[665, 'PULAU TEKONG MPH'],
	[666, 'PULAU TEKONG PARADE SQUARE'],
	[667, 'PUNGGOL MARINA'],
	[668, 'PYAD'],
	[669, 'RAKIT RESERVOIR'],
	[671, 'REGENT HOTEL'],
	[865, 'RIFLE RANGE CAMP'],
	[682, 'SAF FERRY TERMINAL'],
	[388, 'SAF HOLIDAY CHALETS'],
	[686, 'SAF YACHT CLUB'],
	[690, 'SAFTI 100M RANGE 1'],
	[694, 'SAFTI LIVE FIRING AREA A'],
	[695, 'SAFTI MI'],
	[701, 'SAFTI RANGE 2'],
	[704, 'SARIMBUN'],
	[706, 'SELARANG CAMP'],
	[874, 'SELETAR AIR BASE'],
	[716, 'SELETAR CAMP'],
	[721, 'SELETAR EAST CAMP'],
	[725, 'SELETAR WET GAP'],
	[726, 'SEMBAWANG AIR BASE'],
	[850, 'SEMBAWANG CAMP'],
	[732, 'SEMBAWANG WHARVES'],
	[733, 'SENTOSA FERRY TERMINAL'],
	[734, 'SERANGOON CENTRAL DRIVE'],
	[735, 'SHANGRI-LA HOTEL'],
	[736, 'SIA TERMINAL 2 COACH WAITING AREA'],
	[877, 'SINGAPORE CHANGI AIRPORT'],
	[739, 'SINGAPORE GENERAL HOSPITAL'],
	[2027, 'SINGAPORE GENERAL HOSPTIAL'],
	[740, 'SINGAPORE SHOOTING CLUB GATE'],
	[890, 'ST ELECTRONICS AMK'],
	[897, 'ST KINETICS'],
	[777, 'STAGMONT CAMP'],
	[790, 'STE'],
	[791, 'STK'],
	[792, 'SUN SPORTS CLUB'],
	[794, 'SUNGEI GEDONG CAMP'],
	[801, 'SUNTEC CITY'],
	[803, 'SWAMI HOME'],
	[804, 'SWISSOTEL'],
	[805, 'TAMPINES STADIUM'],
	[2026, 'TAN TOCK SENG HOSPITAL'],
	[806, 'TANJONG GUL CAMP'],
	[813, 'TEKONG BMTC HQ'],
	[814, 'TEKONG FERRY TERMINAL'],
	[815, 'TEKONG FIBUA VILLAGE'],
	[816, 'TEKONG HAND GRENADE RANGE'],
	[817, 'TEKONG MT LINE'],
	[1025, 'TEKONG NODE'],
	[818, 'TEKONG PARADE SQUARE'],
	[819, 'TEMASEK CLUB'],
	[875, 'TENGAH AIR BASE'],
	[390, 'THE CHEVRONS'],
	[823, 'THE ORIENTAL SINGAPORE'],
	[824, 'TOA PAYOH STADIUM'],
	[825, 'TRADOC FOYER'],
	[828, 'TUAS NAVAL BASE'],
	[831, 'UBI COMFORT DELGRO'],
	[832, 'UNITED SPORTS AT KALLANG PUDDING'],
	[835, 'WEST COAST FERRY TERMINAL'],
	[836, 'WOODLANDS MRT'],
	[849, 'YISHUN AREA'],
	[837, 'YISHUN AVE 7 TP 11'],
	[847, 'YISHUN INDUSTRIAL PARK'],
	[838, 'YMCA APARTMENT'],
	[842, 'YORK HILL'],
	[9999, 'OTHERS']
].map(function (element) {
	return {
		id: element[0],
		name: element[1]
	};
});

data.ranks = [
	['PVT'],
	['LCP'],
	['CPL'],
	['CFC'],
	['3SG'],
	['2SG'],
	['1SG'],
	['SSG'],
	['3WO'],
	['2WO'],
	['1WO'],
	['MWO'],
	['SWO'],
	['CWO']
].map(function (element) {
	return {
		code: element[0]
	};
});

data.peses = [
	['A'],
	['B'],
	['BP'],
	['C1L1'],
	['C1L2'],
	['C1L3'],
	['C1L9'],
	['C2L1'],
	['C2L2'],
	['C2L3'],
	['C2L9'],
	['C9L1'],
	['C9L2'],
	['C9L3']
//	['C9L9'],
//	['D'],
//	['E1L3'],
//	['E1L9'],
//	['E9L3'],
//	['E9L9'],
//	['F'],
//	['N']
].map(function (element) {
	return {
		code: element[0]
	};
});

data.securityCategories = [
	['CAT 1A'],
	['CAT 1'],
	['CAT 2A - Manual'],
	['CAT 2A'],
	['CAT 2'],
	['CAT 2 (CS)'],
	['NA']
].map(function (element) {
	return {
		code: element[0]
	};
});

data.licenseCategories = [
	['A'],
	['B'],
	['C'],
	['D'],
	['E']
].map(function (element) {
	return {
		code: element[0]
	};
});

data.mtActions = [
	['CM'],
	['AVI'],
  	['UQM 5k'],
  	['UQM 10k'],
  	['UQM 15k'],
  	['UQM 20k'],
  	['UQM 25k'],
  	['UQM 30k'],
  	['UQM 35k'],
  	['UQM 40k'],
  ].map(function (element) {
  	return {
  		code: element[0]
  	};
});

data.mtStatuses = [
	['AVAILABLE'],
	['DOWN'],
	['BER'],
	['DETAIL'],
	['xNODE DETAIL'],
	['xHUB DETAIL'],
	['T-LOAN'],
    ['CM'],
	['PM'],
	['AVI'],
	['PM MISS'],
	['AVI MISS'],
    ].map(function (element) {
    	return {
    		name: element[0]
    	};
  });

data.divs = [
	["P10K", "HQ 2 PDF COMD"],
	["001H", "HQ 3 DIV"],
	["338D", "HQ 6 DIV"],
	["BA73", "HQ 9 DIV/INF"],
	["521H", "HQ ARMOUR"],
	["070E", "HQ SA"],
	["082F", "HQ SCE"],
	["OPOOL", "OTHERS POOL"],
	["064H", "SCH OF ARMR"],
	["BB50", "TPT COMD HQ"]
].map(function (element) {
	return {
		code: element[0],
		name: element[1]
	};
});

data.units = [
	['BA62', '1 ADF', 33, 'ARMY', ''],
	['054A', '1 CDO BN', 26, 'ARMY', ''],
	['400B', '1 GSMB', 35, 'ARMY', ''],
	['018E', '1 GUARDS', 33, 'ARMY', ''],
	['BA79', '1 MI BN', 7, 'ARMY', ''],
	['458B', '1 SAF TPT BN', 36, 'ARMY', ''],
	['025M', '1 SIR', 20, 'ARMY', ''],
	['271C', '104 SIR', 16, 'ARMY', ''],
	['197D', '2 PDF', 8, 'ARMY', ''],
	['R07D', '2 PDF SIGS UNIT', 16, 'ARMY', ''],
	['014F', '2 PDF TRG CEN', 8, 'ARMY', ''],
	['170J', '2 SIG BN', 5, 'ARMY', ''],
	['032D', '2 SIR', 20, 'ARMY', ''],
	['071B', '20 SA', 19, 'ARMY', ''],
	['072M', '21 SA', 17, 'ARMY', ''],
	['R09K', '21 SIG BN', 33, 'ARMY', ''],
	['L57C', '22 LOG SP GP', 17, 'ARMY', ''],
	['075A', '23 SA', 19, 'ARMY', ''],
	['R15F', '23 SIG BN', 6, 'ARMY', ''],
	['076K', '24 SA', 19, 'ARMY', ''],
	['BB73', '3 AMB', 1, 'ARMY', ''],
	['502B', '3 DIV ARTY HQ', 19, 'ARMY', ''],
	['621C', '3 DSMB', 1, 'ARMY', ''],
	['035F', '3 GUARDS', 27, 'ARMY', ''],
	['602H', '3 SAF TPT BN', 35, 'ARMY', ''],
	['171H', '3 SIG BN', 1, 'ARMY', ''],
	['026G', '3 SIR', 24, 'ARMY', ''],
	['530G', '3(A) SAF TPT BN', 21, 'ARMY', ''],
	['085H', '30 SCE', 1, 'ARMY', ''],
	['K15H', '319 SCE', 19, 'ARMY', ''],
	['K27K', '324 SCE', 20, 'ARMY', ''],
	['K29C', '326 SCE', 16, 'ARMY', ''],
	['K30D', '327 SCE', 24, 'ARMY', ''],
	['K31A', '328 SCE', 29, 'ARMY', ''],
	['087B', '35 SCE', 29, 'ARMY', ''],
	['084J', '36 SCE', 29, 'ARMY', ''],
	['K32K', '380 SCE', 15, 'ARMY', ''],
	['K24G', '39 SCE', 29, 'ARMY', ''],
	['027D', '4 SIR', 17, 'ARMY', ''],
	['061F', '40 SAR', 2, 'ARMY', ''],
	['062C', '41 SAR', 17, 'ARMY', ''],
	['H11B', '42 SAR', 6, 'ARMY', ''],
	['063J', '42 SAR', 6, 'ARMY', ''],
	['324K', '46 SAR', 6, 'ARMY', ''],
	['033A', '5 SIR', 3, 'ARMY', ''],
	['BB74', '6 AMB', 28, 'ARMY', ''],
	['F05D', '6 DIV ARTY HQ', 20, 'ARMY', ''],
	['L16J', '6 DSMB', 20, 'ARMY', ''],
	['353J', '6 SIG BN', 20, 'ARMY', ''],
	['034K', '6 SIR', 8, 'ARMY', ''],
	['R99F', '8 SIG BN', 5, 'ARMY', ''],
	['BB35', '8 SIGS BN', 5, 'ARMY', ''],
	['F44B', '89 ARTY GP', 15, 'ARMY', ''],
	['BB75', '9 AMB', 24, 'ARMY', ''],
	['L31G', '9 DSMB', 24, 'ARMY', ''],
	['AKS05', 'A KINS SUPPORT UNIT 5 "A" KI', 19, 'ARMY', ''],
	['AKN01', 'A KINS UNIT 1', 85, 'ARMY', ''],
	['H26E', 'AETC', 6, 'ARMY', ''],
	['BB57', 'AFC', 7, 'ARMY', 'BB71 '],
	['BB24', 'AI', 19, 'ARMY', ''],
	['BA61', 'AIOEU', 5, 'ARMY', ''],
	['548A', 'ALTC', 35, 'ARMY', ''],
	['BA65', 'ALTI', 35, 'ARMY', ''],
	['BB76', 'AMB', 17, 'ARMY', ''],
	['508F', 'ARTC', 20, 'ARMY', ''],
	['H18C', 'ASU', 16, 'ARMY', ''],
	['392K', 'ATC', 15, 'ARMY', ''],
	['L39E', 'ATEC', 7, 'ARMY', ''],
	['BB34', 'ATI', 6, 'ARMY', ''],
	['S02C', 'BCTC', 4, 'ARMY', ''],
	['S25H', 'BMTC HQ', 25, 'ARMY', ''],
	['S26E', 'BMTC SCHOOL 1', 25, 'ARMY', ''],
	['S27B', 'BMTC SCHOOL 2', 25, 'ARMY', ''],
	['BB17', 'CBT INT GP', 17, 'ARMY', ''],
	['BA74', 'CCO, MAJU CAMP', 9, 'ARMY', ''],
	['U67K', 'CCO,NEE SOON', 28, 'ARMY', ''],
	['418G', 'CCO,PASIR LABA', 7, 'ARMY', ''],
	['U47F', 'CCO,STAGMONT', 5, 'ARMY', ''],
	['473K', 'CP COMDT SELETAR', 29, 'ARMY', ''],
	['C07B', 'CRF', 26, 'ARMY', ''],
	['BB48', 'CSS COMD HQ', 17, 'ARMY', ''],
	['BB65', 'CTAB', 35, 'ARMY', ''],
	['DKR12', 'D KINS UNIT RESERVE 12', 83, 'ARMY', ''],
	['352C', 'DETC', 29, 'ARMY', ''],
	['U78B', 'ESG', 19, 'ARMY', ''],
	['BB25', 'ETI', 29, 'ARMY', ''],
	['U48C', 'GOMBAK BASE', 50, 'ARMY', ''],
	['BB64', 'GSAB', 50, 'ARMY', ''],
	['U04K', 'GS-MINDEF', 1, 'ARMY', ''],
	['P09H', 'HQ 1 PDF COMD', 16, 'ARMY', ''],
	['B15K', 'HQ 13 SIB', 33, 'ARMY', ''],
	['B25E', 'HQ 15 SIB', 23, 'ARMY', ''],
	['P10K', 'HQ 2 PDF COMD', 8, 'ARMY', ''],
	['021J', 'HQ 2 SIB', 20, 'ARMY', ''],
	['L01H', 'HQ 21 DISCOM', 33, 'ARMY', ''],
	['588G', 'HQ 21 SIB', 9, 'ARMY', ''],
	['610M', 'HQ 22 SIB', 9, 'ARMY', ''],
	['0', 'HQ 23 SIB', 8, 'ARMY', '014F '],
	['P03D', 'HQ 24 SIB', 9, 'ARMY', ''],
	['P46A', 'HQ 26 SIB', 16, 'ARMY', ''],
	['P51A', 'HQ 27 SIB', 16, 'ARMY', ''],
	['P17M', 'HQ 28 SIB', 9, 'ARMY', ''],
	['P24D', 'HQ 29 SIB', 16, 'ARMY', ''],
	['620F', 'HQ 3 DISCOM', 35, 'ARMY', ''],
	['001H', 'HQ 3 DIV', 1, 'ARMY', ''],
	['028A', 'HQ 3 SIB', 3, 'ARMY', ''],
	['454C', 'HQ 3(A) DISCOM', 17, 'ARMY', ''],
	['P01M', 'HQ 30 SIB', 9, 'ARMY', ''],
	['P21B', 'HQ 31 SIB', 9, 'ARMY', ''],
	['P44G', 'HQ 32 SIB', 9, 'ARMY', ''],
	['055K', 'HQ 4 SAB', 17, 'ARMY', ''],
	['659J', 'HQ 5 SIB', 10, 'ARMY', ''],
	['H12M', 'HQ 54 SAB', 9, 'ARMY', ''],
	['L15C', 'HQ 6 DISCOM', 20, 'ARMY', ''],
	['338D', 'HQ 6 DIV', 1, 'ARMY', ''],
	['H29G', 'HQ 62 SAB', 15, 'ARMY', ''],
	['B78K', 'HQ 63 SIB', 23, 'ARMY', ''],
	['B79F', 'HQ 65 SIB', 24, 'ARMY', ''],
	['275B', 'HQ 7 SIB', 27, 'ARMY', ''],
	['B29D', 'HQ 76 SIB', 9, 'ARMY', ''],
	['347C', 'HQ 8 SAB', 2, 'ARMY', ''],
	['L30M', 'HQ 9 DISCOM', 24, 'ARMY', ''],
	['422M', 'HQ 9 DIV', 2, 'ARMY', ''],
	['BA73', 'HQ 9 DIV/INF', 24, 'ARMY', ''],
	['B08D', 'HQ 9 SIB', 9, 'ARMY', ''],
	['H33M', 'HQ 93 SAB', 17, 'ARMY', ''],
	['K22B', 'HQ ARMCEG', 29, 'ARMY', ''],
	['521H', 'HQ ARMOUR', 6, 'ARMY', ''],
	['U52F', 'HQ ARMY MED SVCS', 36, 'ARMY', ''],
	['403D', 'HQ CDO', 1, 'ARMY', ''],
	['BC56', 'HQ CIG/SMI INSTITUTE', 1, 'ARMY', ''],
	['B83K', 'HQ GUARDS', 23, 'ARMY', ''],
	['390D', 'HQ INF', 1, 'ARMY', ''],
	['L38H', 'HQ MES', 17, 'ARMY', ''],
	['243K', 'HQ NCC', 19, 'ARMY', ''],
	['108D', 'HQ RSAF', 36, 'AIR', ''],
	['L43H', 'HQ S&T', 1, 'ARMY', ''],
	['070E', 'HQ SA', 19, 'ARMY', ''],
	['BB63', 'HQ SAFAC', 35, 'JOINT', ''],
	['082F', 'HQ SCE', 28, 'ARMY', ''],
	['BC42', 'HQ SIGNALS AND COMMAND SYSTEMS', 5, 'ARMY', ''],
	['B82A', 'ITC', 2, 'ARMY', ''],
	['BA71', 'ITI', 4, 'ARMY', ''],
	['BB55', 'JCISD', 50, 'ARMY', ''],
	['749M', 'KTSC', 19, 'ARMY', ''],
	['BB51', 'MES COMD HQ', 35, 'ARMY', ''],
	['U12J', 'MSD-MINDEF', 50, 'ARMY', ''],
	['BA23', 'NSAD', 35, 'ARMY', ''],
	['Q99J', 'O TRG,AOMC', 35, 'ARMY', ''],
	['S14D', 'OCS,SAFTI MI', 1, 'ARMY', ''],
	['136K', 'OETI', 8, 'ARMY', ''],
	['Y71C', 'RHL,HQ 6 DIV', 20, 'ARMY', ''],
	['138C', 'SAF AMMO BASE', 21, 'ARMY', ''],
	['U89F', 'SAS HQ,SAFTI MI', 1, 'ARMY', ''],
	['064H', 'SCH OF ARMR', 15, 'ARMY', ''],
	['074D', 'SCH OF ARTY', 19, 'ARMY', ''],
	['BA22', 'SIG INSTITUTE', 5, 'ARMY', ''],
	['279A', 'SISPEC', 17, 'ARMY', ''],
	['354H', 'SIW', 7, 'ARMY', ''],
	['190C', 'SMI', 7, 'ARMY', ''],
	['152B', 'SMP', 17, 'ARMY', ''],
	['089G', 'SOCE', 28, 'ARMY', ''],
	['142F', 'SOL', 21, 'ARMY', ''],
	['B05B', 'SPECIAL OP FORCE', 26, 'ARMY', ''],
	['AA13', 'SP-LS,HQ SIG', 5, 'ARMY', ''],
	['AD86', 'SP-LS,HQ SIGNALS&COMMAND SYSTEMS', 5, 'ARMY', ''],
	['639H', 'STC', 21, 'ARMY', ''],
	['BC14', 'SUPPLY HUB(WEST)', 17, 'ARMY', ''],
	['BA72', 'SWI', 7, 'ARMY', ''],
	['S11B', 'T 7 BTS', 64, 'ARMY', ''],
	['911C', 'T SCSC', 1, 'ARMY', ''],
	['BB70', 'TPT CEN(EAST)', 17, 'ARMY', ''],
	['BB71', 'TPT CEN(NORTH)/1 SAF TPT BN', 8, 'ARMY', ''],
	['BB72', 'TPT CEN(WEST)', 80, 'ARMY', ''],
	['BB50', 'TPT COMD HQ', 1, 'ARMY', ''],
	['U63M', 'TRADOC', 7, 'ARMY', ''],
	['S12M', 'WARRANT OFFR SCH', 17, 'ARMY', '']
].map(function (element) {
	return {
		code: element[0],
		name: element[1],
		nodeId: element[2],
		parentUnit: element[3],
		credits: [
			{
				year: 2015,
				available: 10.5,
				budgeted: 120.0
			}, {
				year: 2016,
				available: 36.0,
				budgeted: 120.0
			}
		]
	};
});

data.nodes = [
	[66, 3, '1 SIG'],
	[16, 1, 'AMOY QUEE NODE'],
	[65, 12, 'APU/SAF MU'],
	[27, 2, 'BEDOK NODE'],
	[3, 3, 'BUKIT PANJANG NODE'],
	[67, 12, 'CHANGI AIR BASE'],
	[63, 12, 'CHANGI NAVAL BASE'],
	[22, 1, 'CHONG PANG NODE'],
	[8, 12, 'CLEMENTI NODE'],
	[83, 2, 'DIEPPE BARRACK 2'],
	[81, 34, 'EMPTY NODE'],
	[82, 34, 'EMPTY NODE2'],
	[80, 3, 'HUB WEST HQ'],
	[4, 3, 'ITI NODE'],
	[1, 3, 'JURONG NODE'],
	[2, 3, 'KEAT HONG NODE'],
	[19, 26, 'KHATIB NODE'],
	[17, 26, 'KRANJI NODE'],
	[59, 3, 'LIM CHU KANG CAMP II'],
	[37, 1, 'LTC'],
	[20, 26, 'MANDAI HILL NODE'],
	[50, 1, 'MTC'],
	[61, 3, 'MURAI'],
	[28, 2, 'NEE SOON NODE'],
	[26, 2, 'PASIR RIS NODE'],
	[68, 12, 'PAYA LEBAR AIR BASE'],
	[7, 3, 'PLC NODE'],
	[18, 1, 'SAFPU NODE'],
	[62, 12, 'SAFTI SC'],
	[24, 2, 'SELARANG NODE'],
	[29, 2, 'SELETAR NODE'],
	[84, 26, 'SEMBAWANG A NODE NEW'],
	[35, 26, 'SEMBAWANG C NODE'],
	[36, 1, 'SEMBAWANG HMCT NODE'],
	[5, 3, 'STAGMONT NODE'],
	[85, 3, 'STEE NODE'],
	[87, 3, 'STEE NODE TEST'],
	[6, 3, 'SUNGEI GEDONG NODE'],
	[70, 1, 'SUP & TPT CEN'],
	[25, 2, 'TEKONG NODE'],
	[60, 3, 'TENGAH AIRBASE'],
	[75, 12, 'TPT FORMATION HQ'],
	[72, 12, 'TPT HUB CENTRAL HQ'],
	[74, 2, 'TPT HUB EAST HQ'],
	[71, 1, 'TPT HUB NORTH HQ'],
	[73, 3, 'TPT HUB WEST HQ'],
	[64, 12, 'TUAS NAVAL BASE']
].map(function (element) {
	return {
		id: element[0],
		hubId: element[1],
		name: element[2],
		units: data.units.filter(function(unit) {
			return unit.nodeId == element[0];
		})
	};
});

data.hubs = [
	[2, 'TPT HUB EAST', 'N', 'Y', 'BB70 '],
	[3, 'TPT HUB WEST', 'N', 'Y', 'BB72 '],
	//	[1, 'HQ INF', 'N', 'Y', 'B82A '],
	[26, 'TPT CEN(NORTH)/1 SAF TPT BN', 'N', 'Y', 'BB71 '],
	[12, 'TPT HUB CTR', 'N', 'Y', '602H ']
].map(function(element) {
	return {
		id: element[0],
		name: element[1],
		nodes: data.nodes.filter(function(node) {
			return node.hubId == element[0];
		})
	};
});

data.audits = [
	[1, '07-Apr-2016 15:12', 'LCP Tan Joo Koon', 'XXX was modified from AAA to BBB'],
	[2, '03-Apr-2016 21:09', 'LCP Tan Joo Koon', 'XXX was modified from AAA to BBB'],
	[3, '01-Apr-2016 14:01', 'LCP Tan Joo Koon', 'XXX was modified from AAA to BBB'],
	[4, '14-Mar-2016 02:27', 'LCP Tan Joo Koon', 'XXX was modified from AAA to BBB'],
	[5, '01-Mar-2016 15:35', 'LCP Tan Joo Koon', 'XXX was modified from AAA to BBB']
].map(function (element) {
	return {
		id: element[0],
		dateTime: element[1],
		modifiedBy: element[2],
		description: element[3]
	};
});

data.parameters = [
	['Welfare', 'TO Prep Time', '2', 'Hours', 'Global', 'No. of hours required to prep / un-prep for detail'],
	['Welfare', 'Maximum Cumulative Driving Hours For Day Hours', '6', 'Hours', 'Global', 'No. of cumulative day hours after which no more day detailing is allowed'],
	['Welfare', 'Maximum Cumulative Driving Hours For Night Hours', '6', 'Hours', 'Global', 'No. of cumulative night hours after which no more night detailing is allowed'],
	['Welfare', 'Minimum Continuous Rest Per Day', '7', 'Hours', 'Global', 'No. of hours of continuous rest required per day'],
	['Welfare', 'Attachment Duration Requiring Full-Day Rest', '3', 'Days', 'Global', 'No. of days of attachment after which 1 full day of continuous rest is required'],
	['Welfare', 'ORD Cut-off Date', '5', 'Days', 'Global', 'No. of days before ORD when TO will no longer be picked for detailing'],
	['Credit', 'Penalty after First cut-off', '50', '%', 'Global', 'Percentage of credits of amended resource after first cut-off'],
	['Credit', 'Penalty after Second cut-off', '100', '%', 'Global', 'Percentage of credits of amended resource after resource allocation'],
	['Credit', 'Usable Advance Credit', '20', '%', '', 'Max. percentage of last Work Year\'s credits that can be used in advance in current Work Year if insufficient credits'],
	 ['Credit', 'Maximum Allocation Per Year', '12', '', '', 'Max. no. of credit allocations that can be done per work year'],
	['Report', 'Detail Sheet Generation Date', '3', 'Days', '', 'No. of days before execution date when users can generate the detail sheet'],
	['Maintenance', 'Vehicle No-Move Notification Date', '5, 12', 'Days', '', 'No. of days of vehicle no-move before triggering notification to Node'],
	['Maintenance', 'Time Gap Between Detail and UQM', '12', 'Hours', 'Global', 'No. of hours required to prep the vehicle for UQM directly after detail'],
	['Maintenance', 'Time Gap Between Detail and AVI', '120', 'Hours', 'Global', 'No. of hours required to prep the vehicle for AVI directly after detail'],
	['Maintenance', 'Time Gap Between Maintenance and Detail', '0', 'Hours', 'Global', 'No. of hours required to prep the vehicle for detail directly after maintenance'],
	['Availability', 'Hub TO Threshold', '70', '%', '', 'Percentage of total Hub TO holding below which a warning will be indicated'],
	['Availability', 'Hub Vehicle Threshold', '70', '%', '', 'Percentage of total Hub Vehicle holding below which a warning will be indicated'],
	['Availability', 'TO Buffer', '10', '%', 'Node', 'Percentage of Available TOs of each Driver Category which will be reserved as buffer'],
	['Availability', 'Maximum Consecutive DaysTO No Detail', '10', 'Days', 'Global', 'No. of consecutive days without detail after which TO will be prioritised for detailing'],
	['Availability', 'Vehicle Buffer', '10', '%', 'Node', 'Percentage of Available Vehicles of each Vehicle Type which will be reserved as buffer'],
	['Availability', 'Minimum Number of Vehicles Before Buffer', '10', 'Qty', 'Global', 'No. of vehicles required before bufferring will kick in'],
	['Availability', 'Maximum Consecutive Days Vehicle in Buffer', '3', 'Days', 'Global', 'No. of consecutive days in buffer after which vehicle should no longer be placed in buffer'],
	['CDL Conversion', 'Notification Date', '2', 'Months', '', 'No. of months before ORD'],
	['Indent', 'Draft Indent Housekeeping', '30', 'Days', '', 'No. of days after which un-submitted Draft indents will be purged from the system'],
	['Indent', 'Day Hours', '8:00-18:00', 'Time', '', 'Timing which is considered day hours'],
	['Indent', 'In-Camp Parkdown Duration', '30', 'Minutes', '', 'No. of minutes required to park-down a vehicle within camp compound'],
	['Indent', 'BME Trooplift', '12,16', 'Qty', '', ''],
	['Indent', 'Ops Standby Commencement Time', '2:00', 'Time', '', 'Fixed start / end time for Ops Standby Indents'],
	['Indent', 'Maximum Park-down Days', '3', 'Days', '', 'Max. no. of days before execution date when park-down can be requested'],
	['Indent', 'No-Move Timing', '7:30-9:30, 18:00-20:00', 'Time', '', 'Weekday timings where Out-Camp movement is not allowed'],
	['Survey', 'Customer Feedback Frequency', '10', '%', '', 'Percentage likelihood that a task will be picked for customer feedback'],
	['Survey', 'TO Feedback Frequency', '10', '%', '', 'Percentage likelihood that a task will be picked for TO feedback'],
	['Task', 'MT Maintenance Bookin Duration', '1.5', 'Hours', '', 'Default duration of MT Maintenance indents'],
	['Task', 'Book-In Reminder Time', '0.5', 'Hours', '', 'No. of hours from scheduled Book-In time, after which a notification will be sent if not yet booked in.'],
	['System', 'Items Per Page', '20', '', '', 'No. of records to display per search result page'],
	['System', 'User Session Inactivity Period', '30', 'Mins', '', 'No. of minutes of inactivity before session times out']
].map(function (element) {
	return {
		paramType: element[0],
		shortDescription: element[1],
		value: element[2],
		valueType: element[3],
		level: element[4],
		longDescription: element[5]
	};
});

data.activityParameters = [
	['Operations - Rostered Standby P1', '', '11', '4', '', ''],
	['Operations - Rostered Standby P2', '', '11', '4', '', ''],
	['Operations - Rostered Standby 15min NTM', '', '11', '0', '', ''],
	['Operations - Rostered Standby 1NTM', '', '11', '0', '', ''],
	['Operations - Rostered Standby 2NTM', '', '11', '0', '', ''],
	['Operations - Rostered Standby 4NTM', '', '11', '0', '', ''],
	['Operations - Rostered Standby 8NTM', '', '11', '0', '', ''],
	['Operations - Rostered Standby 12NTM', '', '11', '0', '', ''],
	['Operations - Rostered Standby 48NTM', '', '11', '0', '', ''],
	['Operations - Ops Bacinet Standby', '', '11', '0', '', ''],
	['Operations - Others ', '', '11', '7 (1800-0600), 0', '', ''],
	['Operations - Duty Driver', '', '11', '4', '', ''],
	['Operations - National Event', '', '12', '7 (1800-0600), 0', '', ''],
	['Training - IPPT / VOC / Range', '180', '24', '7 (1800-0600), 0', '90', '15'],
	['Training - ATEC Evaluation', '180', '21', '7 (1800-0600), 0', '90', '15'],
	['Training - Platoon Training', '180', '25', '7 (1800-0600), 0', '90', '15'],
	['Training - Company Training', '180', '24', '7 (1800-0600), 0', '90', '15'],
	['Training - Battalion Training', '180', '23', '7 (1800-0600), 0', '90', '15'],
	['Training - Brigade Training', '180', '22', '7 (1800-0600), 0', '90', '15'],
	['Training - Division Training', '180', '21', '7 (1800-0600), 0', '90', '15'],
	['Admin - Urine Sample Delivery', '15', '31', '', '', '15'],
	['Admin - Document Dispatch', '15', '33', '', '', '15'],
	['Admin - Document Dispatch (Secret)', '15', '32', '', '', '15'],
	['Admin - Passenger Ferry', '15', '33', '', '', '15'],
	['Admin - Small Item Delivery (combined detail)', '15', '33', '', '', '15'],
	['Admin - Store Lift', '15', '33', '', '', '15'],
	['Admin - Safety Coverage', '15', '32', '', '', '15'],
	['Admin - Allocated Resource', '15', '34', '', '15', ''],
	['MT Admin - Store Lift', '15', '', '', '', ''],
	['MT Admin - Top-up Petrol', '15', '', '', '', ''],
	['MT Admin - Node Training', '15', '', '', '', ''],
	['MT Admin - Send vehicle for maintenance', '15', '', '', '', ''],
	['MT Admin - Send personnel for driver replacement', '15', '', '', '', ''],
	['MT Admin - Orientation and familiarisation', '15', '', '', '', ''],
	['MT Admin - Driver attachment', '15', '', '', '', ''],
	['Urgent Admin - Send to detention barracks', '15', '', '', '', ''],
	['Urgent Admin - VIP Visit', '15', '', '', '', ''],
	['Urgent Admin - Ambulance', '15', '', '', '', '']
].map(function (element) {
	return {
		activity: element[0],
		window: element[1],
		priority: element[2],
		restTime: element[3],
		penalty50: element[4],
		penalty100: element[5]
	};
});

data.doubleBookoutParameters = [
	['Operations - Ops Rostered Standby 15min NTM', '', '', '', ''],
	['Operations - Ops Rostered Standby 1NTM', '', '', '', ''],
	['Operations - Ops Rostered Standby 2NTM', '3', '3', '', ''],
	['Operations - Ops Rostered Standby 4NTM', '1', '2', '1', '2'],
	['Operations - Ops Rostered Standby 8NTM', '1', '1', '1', '1'],
	['Operations - Ops Rostered Standby 12NTM', '1', '1', '1', '1'],
	['Operations - Ops Rostered Standby 48NTM', '1', '1', '1', '1']
].map(function (element) {
	return {
		activity: element[0],
		trainingIn: element[1],
		trainingOut: element[2],
		adminIn: element[3],
		adminOut: element[4]
	};
});

data.rewardParameters = [
	['1K Incentive', '1000', 'N', '0', '0'],
	['3K Incentive', '3000', 'N', '0', '0'],
	['Safety and Courtesy Badge', '4000', 'N', '0', '0'],
	['CDL Conversion', '7000', 'Y', '8', '21']
].map(function (element) {
	return {
		reward: element[0],
		mileage: element[1],
		accident: element[2],
		demeritPoints: element[3],
		age: element[4]
	};
});

data.roles = [
	[1, 'RQ', 'Requestor', 'Unit'],
	[2, 'RC', 'Recommender', 'Unit'],
	[3, 'NE', 'Node Executive', 'Node'],
	[4, 'NC', 'Node Controller', 'Node'],
	[5, 'NCMD', 'Hd Tpt Node / OC', 'Node'],
	[6, 'NSM', 'NSM / CSM', 'Node'],
	[7, '', 'Node Trg / Plt WO', 'Node'],
	[8, '', 'Maintenance WO', 'Node'],
	[9, 'HE', 'Hub Executive', 'Hub'],
	[10, 'HC', 'Hub Controller (Ops)', 'Hub'],
	[11, '', 'Hub Controller (Vehicle)', 'Hub'],
	[12, '', 'Hub Controller (Manpower)', 'Hub'],
	[13, 'HQ', 'HQ Controller', 'HQ'],
	[14, '', 'Transport Safety Officer', 'HQ'],
	[15, 'LA', 'Licence Admin', 'HQ'],
	[16, '', 'Transport Credit Account Mgr', 'HQ'],
	[17, '', 'Div/Fmn Transport Credit Controller', 'DivFmn'],
	[18, '', 'Auditor', 'HQ'],
	[19, '', 'MES', 'HQ'],
	[0, 'SA', 'System Admin', 'System'],
	[-1, 'SU', 'Super User', 'HQ'],
].map(function (element) {
	return {
		id: element[0],
		code: element[1],
		name: element[2],
		level: element[3]
	};
});

data.functions = [
	['INDENT','Submit Indent',1,,1,1,,,,,,,,,,,,,,,,],
	['INDENT','Submit Indent (MT Admin)',,,,,,,,1,,,,,,,,1,1,,,],
	['INDENT','Submit Indent (Urgent Admin)',1,,1,1,,,,,,,,,,,,,,,,],
	['INDENT','Cancel Indent',1,,1,1,,,,1,,,,,,,,1,1,,,],
	['INDENT','Recall Indent',1,,1,1,,,,,,,,,,,,,,,,],
	['INDENT','Create Indent Template',1,,,,,,,1,,,,,,,,1,1,,,],
	['INDENT','Manage Indent Templates',1,,,,,,,1,,,,,,,,1,1,,,],
	['INDENT','Create Shared Indent Template',,,,,,,,,,,1,,,,,,,,,],
	['INDENT','Manage Shared Indent Templates',,,,,,,,,,,1,,,,,,,,,],
	['INDENT','Create Parkdown Indent',1,,1,1,,,,,,,,,,,,,,,,],
	['INDENT','Search Indents',1,1,1,1,,,,1,,1,,,1,,,1,1,,,],
	['INDENT','View Indent',1,1,1,1,,,,1,,1,,,1,,,1,1,,,],
	['INDENT','Recommend / Reject Indent',,1,1,,,,,,,,,,,,,,,,,],
	['INDENT','Approve / Reject Indent',,,1,1,,,,,,,,,,,,,,,,],
	['INDENT','Forward Indent',,,1,1,,,,,,,,,,,,,,,,],
	['INDENT','Accept / Reject Forwarded Indent',,,1,1,,,,,,,,,,,,,,,,],
	['INDENT','Confirm Indent',,,1,1,,,,,,,,,,,,,,,,],
	['INDENT','Revert Indent',,,1,1,,,,1,,,,,,,,1,1,,,],
	['INDENT','Approve / Reject Central Vote Indent',,,,,,,,,,,,,1,,,,,,,],
	['TASK','Search Tasks',1,1,1,1,,,,1,,1,,,,,,1,1,,,],
	['TASK','View Task',1,1,1,1,,,,1,,1,,,,,,1,1,,,],
	['TASK','Assign Driver',,,1,1,,,,1,,,,,,,,1,1,,,],
	['TASK','Assign Vehicle',,,1,1,,,,1,,,,,,,,1,1,,,],
	['TASK','Initiate Transport Credit Refund',,,1,,,,,,,,,,,,,,,,,],
	['TASK','Approve / Reject Transport Credit Refund',,,,,,,,,,,,,1,,,,,,,],
	['TASK','Add Task Detail',,,1,1,,,,1,,,,,,,,1,1,,,],
	['TASK','Remove Task Detail',,,1,1,,,,1,,,,,,,,1,1,,,],
	['TASK','Adjust Detail Period',,,1,1,,,,1,,,,,,,,1,1,,,],
	['TASK','Endorse / Reject Adjust Detail Period',,,,,,,,,,,,,,,,1,1,,,],
	['TASK','Adjust Mileage',,,,,,,,,,,,,,,,1,1,,,],
	['TASK','Update Survey / Feedback',,,1,1,,,,1,,,,,,,,1,1,,,],
	['TASK','Book Out / In Task',,,,,,,,1,,,,,,,,1,1,,,],
	['TASK','Switch Task (Double Book-out)',,,,,,,,1,,,,,,,,1,1,,,],
	['TASK','Approve MT Maintenance Book Out',,,,,,,,1,,,,,,,,1,1,,,],
	['RESOURCE','Personnel Profile Query (Whole MINDEF)',,,,,,,,,,,1,1,,,,,,,,],
	['RESOURCE','Search TO',,,1,1,,1,1,1,1,1,,1,,,,1,1,1,,],
	['RESOURCE','View TO Profile',,,1,1,,1,1,1,1,1,,1,,,,1,1,1,,],
	['RESOURCE','Update TO (ITMS Node) Tagging',,,,,,1,,,,,,,,,,,,,,],
	['RESOURCE','Update TO (Plt/Sect/Ops) Tagging',,,1,,,,,1,1,,,,,,,1,1,1,,],
	['RESOURCE','Update TO Skills (Military Driving Permit)',,,,,,,,,,,,1,,,,,,,,],
	['RESOURCE','Update TO Skills (Others)',,,1,,,,,1,1,,,,,,,1,1,,,],
	['RESOURCE','Approve / Reject Skills (Others)',,,,,,,,,,,,,,,,1,1,,,],
	['RESOURCE','Submit TO Rewards',,,1,,,,,1,1,,,,,,,1,1,1,,],
	['RESOURCE','Verify / Reject Rewards',,,,,,,,,,,,,,,,1,,,,],
	['RESOURCE','Recommend / Reject Rewards',,,,,,1,,,,,,,,,,,,,,],
	['RESOURCE','Approve / Reject Rewards',,,,,,,,,,,,,,,,,,,,],
	['RESOURCE','Final Approve / Reject Rewards (CDL)',,,,,,,,,,,,1,,,,,,,,],
	['RESOURCE','Update TO Demerit Points',,,,,,,1,,,,,,,,,,,,,],
	['RESOURCE','View TO Availability',,,1,1,,1,,1,1,1,,,,,,1,1,,,],
	['RESOURCE','Update TO Availability',,,,,,,,1,1,,,,,,,1,1,,,],
	['RESOURCE','Endorse / Reject TO Attachment',,,,,,,,,,,,,,,,1,,,,],
	['RESOURCE','Approve / Reject TO Attachment',,,1,,,,,,,1,,,,,,,,,,],
	['RESOURCE','Search Vehicle Type',,,1,1,1,,,1,,1,1,,,,,1,1,,,1],
	['RESOURCE','View Vehicle Type',,,1,1,1,,,1,,1,1,,,,,1,1,,,1],
	['RESOURCE','Update Vehicle Type Profile',,,,,,,,,,,1,,,,,,,,,],
	['RESOURCE','Search Vehicle',,,1,1,1,,,1,,1,,,,,,1,1,,,1],
	['RESOURCE','View Vehicle',,,1,1,1,,,1,,1,,,,,,1,1,,,1],
	['RESOURCE','Update Vehicle Purpose',,,,,,,,,,,1,,,,,,,,,],
	['RESOURCE','Update Vehicle (OUV) Purpose',,,,,,,,1,,,,,,,,1,1,,,],
	['RESOURCE','Update Vehicle Maintenance',,,,,1,,,,,,,,,,,,,,1,],
	['RESOURCE','View Vehicle Availability',,,1,1,1,,,1,,1,,,,,,1,1,,1,1],
	['RESOURCE','Update Vehicle Availability',,,,,,,,,,,,,,,,1,1,,1,],
	['RESOURCE','Endorse / Reject Vehicle Loan',,,,,,,,,,,,,,,,1,,,,],
	['RESOURCE','Approve / Reject Vehicle Loan',,,1,,,,,,,1,,,,,,,,,,],
	['RESOURCE','Update Buffer %',,,1,,,,,,,,,,,,,,,,,],
	['CREDIT','View Credit Allocation',,,,,,,,,,,,,1,,,,,,,],
	['CREDIT','Allocate Credit (HQ Level)',,,,,,,,,,,,,1,,,,,,,],
	['CREDIT','Allocate Credit (Div/Formation Level)',,,,,,,,,,,,,1,1,,,,,,],
	['CREDIT','View Credit Status',1,1,1,1,,,,1,,1,,,1,1,,1,1,,,],
	['CREDIT','View Credit Movement',1,1,1,1,,,,1,,1,,,1,1,,1,1,,,],
	['CREDIT','Transfer Credit',,,,,,,,,,,,,1,1,,,,,,],
	['CREDIT','Recover Credit',,,,,,,,,,,,,1,,,,,,,]
].map(function (element) {
	return {
		module: element[0],
		function: element[1],
		role1: element[2],
		role2: element[3],
		role3: element[4],
		role4: element[5],
		role5: element[6],
		role6: element[7],
		role7: element[8],
		role8: element[9],
		role9: element[10],
		role10: element[11],
		role11: element[12],
		role12: element[13],
		role13: element[14],
		role14: element[15],
		role15: element[16],
		role16: element[17],
		role17: element[18],
		role18: element[19],
		role19: element[20],
		role20: element[21]
	};
});

data.notifications = [
	['Resource', 'Non-movement of vehicle after X days', 'Notification', 'Node Controller / Exec', 'Y', 'Y'],
	['Task', 'Detail Period Adjusted', 'Notification', 'Node Cmd / FSM', 'Y', 'Y'],
	['Task', 'Resource Swapped', 'Notification', 'Node Cmd / FSM', 'Y', 'Y'],
	['Task', 'Refund pending approval', 'Notification', 'HQ', 'Y', 'Y'],
	['Task', 'Refund Approved / Rejected', 'Notification', 'Hub Controller / Exec', 'Y', 'Y'],
	['Task', 'Detail not yet Booked In', 'Notification', 'Node Controller / Exec', 'Y', 'Y'],
	['Indent', 'Resources freed up and avaliable for another indent on the waiting list', 'Notification', 'Hub Controller / Exec', 'Y', 'Y'],
	['Indent', 'Indent Cancelled', 'Notification', 'Node Controller / Exec', 'Y', 'Y'],
	['Driving Category', 'Recommend to upgrade TO Driving Category when eligible', 'Notification', 'Node Controller / Exec', 'Y', 'Y'],
	['Driving Category', 'Recommendation pending approval', 'Notification', 'Node Cmd / FSM', 'Y', 'Y'],
	['Driving Category', 'Upgrade Approved / Rejected', 'Notification', 'Node Controller / Exec', 'Y', 'Y'],
	['3K Incentive', 'Recommend for 3K Incentive when eligible', 'Notification', 'Node Trg WO', 'Y', 'Y'],
	['3K Incentive', 'Recommendation pending approval', 'Notification', 'Node OC', 'Y', 'Y'],
	['3K Incentive', 'Recommendation pending approval', 'Notification', 'Hub HQ S1', 'Y', 'Y'],
	['3K Incentive', 'Recommendation pending approval', 'Notification', 'Hub HQ CO', 'Y', 'Y'],
	['3K Incentive', 'Rewards Approved / Rejected', 'Notification', 'Node Trg WO', 'Y', 'Y'],
	['CDL Conversion', 'Recommend for CDL Conversion when eligible', 'Notification', 'Node OC', 'Y', 'Y'],
	['CDL Conversion', 'Recommendation pending approval', 'Notification', 'Unit S1', 'Y', 'Y'],
	['CDL Conversion', 'Recommendation pending approval', 'Notification', 'CO', 'Y', 'Y'],
	['CDL Conversion', 'Recommendation pending approval', 'Notification', 'License Officer', 'Y', 'Y'],
	['CDL Conversion', 'Rewards Approved / Rejected', 'Notification', 'Unit S1', 'Y', 'Y'],
	['Maintenance', 'Workshop has YT3. Node to YT5', 'Notification', 'Node Controller / Exec', 'Y', 'Y'],
	['Maintenance', 'Detail not yet Booked In and passed Maintenance date', 'Notification', 'Maintenance WO', 'Y', 'Y'],
	['Vehicle Loan', 'Vehicle Due for return', 'Reminder', 'Node Controller / Exec, both sides', 'Y', 'Y'],
	['Vehicle Loan', 'Vehicle Returned', 'Notification', 'Node Controller / Exec, both sides', 'Y', 'Y']
].map(function (element) {
	return {
		module: element[0],
		event: element[1],
		recipient: element[2],
		type: element[3],
		email: element[4],
		dashboard: element[5]
	};
});


data.cdVehiclePurposes = [
	['Ammo Vehicle', 'Training'],
	['Conducting Vehicle', 'Training'],
	['Recce', 'Training'],
	['Safety Coverage', 'Training'],
	['Store Run', 'Training'],
	['Supervising Vehicle', 'Training'],
	['Training Inspection', 'Training'],
	['Troop Lift', 'Training'],
	['Others', 'Training'],
	['Allocated Resource (Self-Drive / Appt. Holder)', 'Admin'],
	['Document Dispatch', 'Admin'],
	['Document Dispatch (Secret)', 'Admin'],
	['Passenger Ferry', 'Admin'],
	['Safety Coverage', 'Admin'],
	['Small Item Delivery (combined detail)', 'Admin'],
	['Store Lift', 'Admin'],
	['Urine Sample Delivery', 'Admin'],
	['Collect vehicle from maintenance site', 'MT Admin'],
	['Driver attachment', 'MT Admin'],
	['Node Training', 'MT Admin'],
	['Orientation and familiarisation', 'MT Admin'],
	['Send personnel for driver replacement', 'MT Admin'],
	['Send vehicle for maintenance', 'MT Admin'],
	['Store Lift', 'MT Admin'],
	['Top-up Fuel', 'MT Admin'],
	['Send to detention barracks', 'Urgent Admin'],
	['VIP Visit', 'Urgent Admin']
 ].map(function(element) {
 	return {
 		name: element[0],
 		activityType: element[1]
 	};
 });

data.cdReasons = [
	['To be provided', 'Requestor Cancels Indent'],
	['To be provided', 'Recommender/Hub Controller Rejects Submitted Indent'],
	['To be provided', 'Hub/HQ Controller Rejects Recommended Indent'],
	['To be provided', 'Hub/HQ Controller Rejects Forwarded Indent'],
	['To be provided', 'Transport Credit Manager Rejects (National Event) Indent'],
	['To be provided', 'Transport Credit Manager Rejects Credit Refund'],
	['To be provided', 'Hub Controller Rejects TO Attachment'],
	['To be provided', 'Hub Controller Rejects Vehicle Loan'],
	['To be provided', 'Node Exec/Controller/Cmdr/SM/DTL Rejects MT Maintenance Bookout'],
	['To be provided', 'Node Cmdr/SM Rejects Recommended Skill'],
	['To be provided', 'Hub Controller (Manpower) Rejects Verified Rewards'],
	['To be provided', 'Hub Cmdr Rejects Recommended Rewards'],
	['To be provided', 'License Admin Rejects Recommended CDL']
 ].map(function(element) {
 	return {
 		name: element[0],
 		reasonType: element[1],
 	};
 });

data.cdDrivingCategories = [
 	['A', '7000', '-', 'Yes'],
 	['B', '4000', '6999', 'Yes'],
 	['C', '1000', '3999', 'Yes'],
 	['D', '1', '900', 'Yes'],
 	['E', '-', '-', 'No'],
 ].map(function(element) {
 	return {
 		name: element[0],
 		min: element[1],
 		max: element[2],
 		eligible: element[3],
 	};
 });

data.cdPermitTypes = [
	['QDL','SAF/TPT/N'],
	['NVL','SAF/TPT/T'],
	['LOA-LNT','LOA/LNT'],
	['LOA','SAF/TPT/LOA'],
	['CVL','YB/01008/08']
].map(function(element) {
 	return {
 		name: element[0],
 		prefix: element[1]
 	};
});

data.permitStatuses = [
	['Valid'],
	['Change Vocation'],
	['Suspended'],
	['Disqualified'],
	['Revoked'],
	['MINDEF Reserve'],
	['Deceased'],
	['Superceded'],
].map(function(element) {
   	return {
   		name: element[0]
   	};
});

data.cdPermitClasses = [
	['2B','CL 2B (NOT FOR X-CTY)','QDL'],
	['2BX','CL 2B (ATTENDED X-CTY)','QDL'],
	['2A','CL 2A (NOT FOR X-CTY)','QDL'],
	['2AX','CL 2A (ATTENDED X-CTY)','QDL'],
	['2','CL 2 (NOT FOR X-CTY)','QDL'],
	['2X','CL 2 (ATTENDED X-CTY)','QDL'],
	['3','CL 3 (NOT FOR X-CTY)','QDL'],
	['3X','CL 3 (ATTENDED X-CTY)','QDL'],
	['3 & 4','CL 3 & 4 (NOT FOR X-CTY)','QDL'],
	['3 & 4X','CL 3 & 4 (ATTENDED X-CTY)','QDL'],
	['4','CL 4 (NOT FOR X-CTY)','QDL'],
	['4X','CL 4 (ATTENDED X-CTY)','QDL'],
	['4S','CL 4S ARTICULATED VEH','QDL'],
	['4SH','CL 4S HMCT','QDL'],
	['4T','CL 4 TRACTOR ONLY','QDL'],
	['5','CL 5  (NOT FOR X-CTY)','QDL'],
	['FL2','ROUGH TERRAIN FORKLIFT','QDL'],
	['ML1','MARKLIFT','QDL'],
	['2B','CL 2B (NOT FOR X-CTY)','NVL'],
	['2BX','CL 2B (ATTENDED X-CTY)','NVL'],
	['2A','CL 2A (NOT FOR X-CTY)','NVL'],
	['2AX','CL 2A (ATTENDED X-CTY)','NVL'],
	['2','CL 2 (NOT FOR X-CTY)','NVL'],
	['2X','CL 2 (ATTENDED X-CTY)','NVL'],
	['3','CL 3 (NOT FOR X-CTY)','NVL'],
	['3X','CL 3 (ATTENDED X-CTY)','NVL'],
	['4','CL 4 (NOT FOR X-CTY)','NVL'],
	['4X','CL 4 (ATTENDED X-CTY)','NVL'],
	['4T','CL 4 TRACTOR ONLY','NVL'],
	['5T','CL 5 TRACTOR ONLY','NVL'],
	['5X','CL 5 (ATTENDED X-CTY)','NVL'],
	['ML1','MARKLIFT','NVL'],
	['3AX','CL3AX (ATTENDED FOR X-CTY)','LOA'],
	['3AX','CL 3AX(ATTENDED FOR X-CTY)','QDL'],
	['2B','CLASS 2B: MOTOR CYCLE 200cc','CVL'],
	['2A','CLASS 2A: MOTOR CYCLE 201cc to 400cc','CVL'],
	['2','CLASS 2: MOTOR CYCLE 400cc','CVL'],
	['3','CLASS 3: MOTOR VEHICLES ( MANUAL )','CVL'],
	['4','CLASS 4: HEAVY VEHICLES ( MANUAL )','CVL'],
	['5','CLASS 5: HEAVY VEHICLES','CVL'],
	['CL3AX','CL3AX-(ATTEND X -CTY)','NVL'],
	['FL1','LOA FORKLIFT CONVENTIONAL (BELOW 5 TON)','LOA'],
	['CL3 NX','CL3NX (NOT FOR X-CTY)','LOA'],
	['3X','CL3X -(ATTENDED X-CTY)','LOA'],
	['CL 3 NX  (NOT FOR X-CTY)','CL 3 NX (NOT FOR X-CTY)','LOA-LNT'],
	['4 (MPTV)','CL4(MPTV)','QDL'],
	['CL 3 X  (ATTENDED X  - CTY)','CL 3X (ATTENDED X -CTY)','LOA-LNT'],
	['FL3','HEAVY LIFTING FORKLIFT','QDL'],
	['4(MPTV)','CL4(MPTV)','NVL'],
	['CL3ANX (NOT ATTENDED CTY)','CL3A NX','LOA'],
	['CL4TPONLY','CL4TPONLY','QDL'],
	['CL3 STAFF/GP CARS ONLY','CL 3 STAFF/GP CARS ONLY','NVL'],
	['CL3 NX (NOT FOR X-CTY)','CL3 NX','NVL'],
	['CL3 STAFF/GP CARS ONLY','CL3 STAFF/GP CARS ONLY','QDL'],
	['CLASS 5','CLASS 5','QDL'],
	['CL3&4(TP)','CL3&4 TESTING PURPOSES','NVL'],
	['FL1','FL 1','LOA-LNT'],
	['FL 1','LOA -FORKLIFT','NVL'],
	['CL3 A (NX)','CL 4','NVL'],
	['CL3 A (NX)','CL 4','NVL'],
	['CL3 A(NX)','CL3 ANX)','NVL'],
	['CL3AX (ATTEND X-CTY)','CL3 AX','LOA-LNT'],
	['CL3 ANX','CL3 ANX(NOT FOR X-CTY)','QDL'],
 ].map(function(element) {
 	return {
 		name: element[0],
 		description: element[1],
 		type: element[2]
 	};
});

data.cdProficiences = [
	['Class 4S'],
	['Forklift'],
	['Chemical Defence'],
	['Class 5 (commercial)'],
	['Class 2B (commercial)'],
	['Class 3 (commercial)'],
	['Class 4 (commercial)'],
	['Hydraulic tailgate'],
	['Operate hydraulic crane'],
	['HMCT'],
	['ATP'],
	['Driver Guide']
].map(function(element) {
 	return {
 		name: element[0]
 	};
 });

data.cdTowTypes = [
	['No Towing'],
	['SLWH'],
	['TPQ'],
	['1/2 Ton Cargo Trailer'],
	['1.5 Ton Cargo Trailer'],
	['FH 2000'],
	['FH 88'],
	['M71S'],
	['Mortar'],
	['Boat Trailer'],
	['Generator'],
	['PET Trailer'],
	['Generator/PCV Trailer'],
	['MPDS'],
	['TPQ 37'],
	['TPQ 36'],
	['GRS'],
	['Guns'],
	['Mobile Field Unit'],
	['Water Trailer'],
	['MTV Trailer'],
	['Fuel Tanker Trailer'],
	['20-Ft Flat Bed'],
	['Command Post'],
	['Cargo Girder Bridge'],
	['Water Tank (L/R)'],
	['Mobile ground data terminal Trailer'],
	['JACO DRILL TRAILER'],
	['TSVC TRAILER'],
	['RTCV TRAILER'],
	['STEAM GENERATOR TRAILER'],
	['PET TRAILER (CBRE)'],
	['MDPS TRAILER (CBRE)'],
	['CPSS TRAILER (CBRE)'],
	['TCV TRAILER (CBRE)'],
	['Assault Boat Trailer'],
	['MISSILE TRAILER'],
	['60 FT Trailer'],
	['Rapid Deployable Tentage Trailer'],
	['AASK'],
	['Gun Carriage'],
].map(function(element) {
  	return {
   		name: element[0]
   	};
});

data.cdOffenceTypes = [
	['INT / TRG ACCIDENT (LOCAL)', 'Yes'],
	['INT / TRG ACCIDENT (OVERSEAS)', 'Yes'],
	['EXT / TRG ACCIDENT (LOCAL)', 'Yes'],
	['EXT / TRG ACCIDENT (OVERSEAS)', 'Yes'],
	['TRAFFIC POLICE OFFENCE', 'No'],
	['MP COMMAND OFFENCE', 'No'],
	['URA OFFENCE', 'No'],
	['LTA OFFENCE', 'No'],
	['OTHER', 'No']
].map(function(element) {
    return {
      name: element[0],
      isAccident: element[1],
    };
});

data.cdOffencesCommitted = [
	['Drinking Driving', '12'],
	['Exceeding Speed/road limit for vehicle by 41 km/h and above', '18'],
	['Using mobile telephone when driving', '12'],
	['Failing to conform to traffic red light signal', '12'],
	['Exceeding speed/road limit for vehicle by 31 to 40 km/h', '10'],
	['Tailgating resulting in accident', '9'],
	['Inconsiderate Driving (non-accident)', '9'],
	['Careless Driving', '6'],
	['Carry Passengers on a motor vehicle or trailer in a dangerous manner', '6'],
	['Driver failure to wear seat belt', '3'],
	['Exceeding speed/road limit for vehicle by 21 to 30 km/h', '6'],
	['Driving or riding against the flow of traffic', '6'],
	['Failing to give way to pedestrian crossing', '6'],
	['Unable to stop your vehicle before reaching pedestrian crossing', '6'],
	['Failing to allow free and uninterrupted passage to pedestrian', '6'],
	['Failing to give way to pedestrian at controlled intersection', '6'],
	['Failing to give way at ambulance, fire brigade or police vehicle', '4'],
	['Driving while carry load on a motor vehicle in a dangerous manner', '4'],
	['Driver failing to ensure front or rear passenger wears a seat belt', '3'],
	['Failure to display Explosives or Hazards Sign load of AMMO/ POL', '3'],
	['Disobeying Traffic Direction of police officer', '3'],
	['Load failing from vehicle', '6'],
	['Driving on shoulder of an expressway', '6'],
	['Exceeding speed/road limit for vehicle by 1 to 20 km/h', '4'],
	['Crossing double white lines', '4'],
	['Crossing road divider', '4'],
	['Driving or leaving a vehicle in a bus lane during restricted hours', '4'],
	['Failing to give way to oncoming traffic at controlled junction', '4'],
	['Failing to give way to uncontrolled junction', '4'],
	['Failing to give way at junction', '4'],
	['Failing to give way at roundabout', '4'],
	['Forming up incorrectly when turning left or right', '4'],
	['Rider failing to wear or wear securely on his head a protect helmet', '3'],
	['Others', '']
].map(function(element) {
	return {
		name: element[0],
		demeritPoints: element[1]
	};
});

data.cdVenues = [
  	['AYER RAJAH CAMP'],
	['BCTC'],
	['BEDOK SPORTS AND FITNESS CENTRE'],
	['BIC RANGE'],
	['BISHAN STADIUM'],
	['CHANGI INTERNATIONAL AIRPORT POLICE DIVISION'],
	['CHANGI NAVAL BASE'],
	['CHANGI POINT FERRY JETTY'],
	['SAF HOLIDAY CHALETS'],
	['CHANGI SEAVIEW CHALET'],
	['THE CHEVRONS'],
	['CHIA SERVICE STATION'],
	['CHOA CHU KANG COMFORT DELGRO'],
	['CHOA CHU KANG STADIUM'],
	['NEE SOON CAMP'],
	['NEE SOON DRICLAD CENTER'],
	['NEW PARK HOTEL'],
	['ORIENTAL HOTEL'],
	['PAN PACIFIC HOTEL'],
	['PANDAN LOOP'],
	['PASIR LABA CAMP'],
	['PASIR RIS BUS INTERCHANGE'],
	['PASIR RIS CAMP'],
	['PASIR RIS PARK'],
	['PENINSULA HOTEL'],
	['PERMATANG'],
	['PIERCE AMMUNITION DEPOT'],
	['POYAN RANGE'],
	['PULAU TEKONG 100M RANGE'],
	['PULAU TEKONG FERRY TERMINAL'],
	['PUNGGOL MARINA'],
	['PYAD'],
	['RAKIT RESERVOIR'],
	['REGENT HOTEL'],
	['CLEMENTI CAMP'],
	['CMPB'],
	['DSO NATIONAL LABORATORIES'],
	['DSTA'],
	['DTTB TOWER B'],
	['EAST COAST PARK'],
	['ELISS CENTRE'],
	['GLOUCESTER CAMP'],
	['GOMBAK CAMP'],
	['GRAND COPTHORNE HOTEL'],
	['GRAND HYATT HOTEL'],
	['HEALTH SCIENCES AUTHORITY'],
	['HENDON CAMP'],
	['HILLVIEW CAMP'],
	['HOTEL INTER-CONTINENTAL'],
	['HUME AVE'],
	['ISTANA'],
	['JALAN MURAI'],
	['JOO CHIAT AVE'],
	['JOO GUAN SENG'],
	['JURONG CAMP'],
	['JURONG ISLAND'],
	['JURONG POINT'],
	['KAKI BUKIT CAMP'],
	['KALLANG SEA TRAINING CENTRE'],
	['KEAT HONG CAMP'],
	['KENT RIDGE PARK'],
	['KHATIB CAMP'],
	['KRANJI CAMP 3'],
	['LADANG'],
	['LAM SAM AREA'],
	['LENTOR ROAD'],
	['LIM CHU KANG AREA'],
	['LIM CHU KANG CAMP 1'],
	['LIM CHU KANG CAMP 2'],
	['LORONG ASRAMA'],
	['MACRITCHIE RESERVOIR'],
	['MAJU CAMP'],
	['MANDAI 300M RANGE'],
	['MANDAI CAMP 2'],
	['MANDAI HILL CAMP'],
	['MARINA SQUARE'],
	['MERITUS MANDARIN'],
	['MARSILING TRAINING AREA'],
	['MINDEF'],
	['MOONBEAM WALK'],
	['MOUNT PLEASANT'],
	['MURAI GATE'],
	['MURAI RESERVOIR'],
	['NATIONAL STADIUM'],
	['NATIONAL UNIVERSITY HOSPITAL'],
	['NEE SOON 100M RANGE 1'],
	['NEE SOON 100M RANGE 2'],
	['NEE SOON 500M RANGE'],
	['SAF FERRY TERMINAL'],
	['SAF YACHT CLUB'],
	['SAFTI 100M RANGE 1'],
	['SAFTI LIVE FIRING AREA A'],
	['SAFTI MI'],
	['SAFTI RANGE 2'],
	['SARIMBUN'],
	['SELARANG CAMP'],
	['SELETAR CAMP'],
	['SELETAR EAST CAMP'],
	['SELETAR WET GAP'],
	['SEMBAWANG AIR BASE'],
	['SEMBAWANG WHARVES'],
	['SENTOSA FERRY TERMINAL'],
	['SERANGOON CENTRAL DRIVE'],
	['SHANGRI-LA HOTEL'],
	['SIA TERMINAL 2 COACH WAITING AREA'],
	['SINGAPORE GENERAL HOSPITAL'],
	['SINGAPORE SHOOTING CLUB GATE'],
	['STAGMONT CAMP'],
	['OTHERS-24 DEFU LANE 7'],
	['OTHERS-117 DEFU LANE 10'],
	['OTHERS-930 HOUGANG STREET 91'],
	['OTHERS-122 ANG MO KIO AVENUE 3'],
	['OTHERS-44C NEO TIEW ROAD'],
	['OTHERS-136 SERANGOON ROAD'],
	['OTHERS-94 SERANGOON ROAD'],
	['OTHERS-2 SERANGOON ROAD'],
	['OTHERS-37 HALTON ROAD'],
	['OTHERS-171C EDGEDALE PLAINS'],
	['OTHERS-459 JALAN AHMAD IBRAHIM'],
	['OTHERS-535 CLEMENTI ROAD'],
	['OTHERS-2 BUROH LANE'],
	['OTHERS-656 CHOA CHU KANG CRESCENT'],
	['OTHERS-2 WOODLANDS SECTOR 1'],
	['OTHERS-1220 EAST COAST PARKWAY'],
	['OTHERS-0 LABRADOR VILLA ROAD'],
	['OTHERS-802 MOUNTBATTEN ROAD'],
	['OTHERS-9 BRAS BASAH ROAD'],
	['OTHERS-51 BRAS BASAH ROAD'],
	['OTHERS-20 KALLANG AVENUE'],
	['OTHERS-26 CLEMENTI LOOP'],
	['OTHERS-219 JOO CHIAT ROAD'],
	['OTHERS-442 ORCHARD ROAD'],
	['OTHERS-100 ORCHARD ROAD'],
	['OTHERS-6 BOON LAY DRIVE'],
	['OTHERS-10 BRANI WAY'],
	['OTHERS-28 LOYANG DRIVE'],
	['OTHERS-355J SEMBAWANG ROAD'],
	['OTHERS-7 BENOI ROAD'],
	['OTHERS-60 BENOI ROAD'],
	['OTHERS-5 LORONG BAKAR BATU'],
	['OTHERS-300 MANDAI ROAD'],
	['OTHERS-120 PASIR LABA ROAD'],
	['OTHERS-66 DEDAP ROAD'],
	['OTHERS-10 SIN MING DRIVE'],
	['OTHERS-70 JALAN PEMIMPIN'],
	['OTHERS-18 UPPER NERAM ROAD'],
	['OTHERS-1 UPPER NERAM ROAD'],
	['OTHERS-28 LICHI AVENUE'],
	['OTHERS-25 HAZEL PARK TERRACE'],
	['OTHERS-27 PRINCE OF WALES ROAD'],
	['OTHERS-11 PEMIMPIN DRIVE'],
	['OTHERS-66 SIAN TUAN AVENUE'],
	['OTHERS-49A LEEDON PARK'],
	['OTHERS-38F JERVOIS ROAD'],
	['OTHERS-1 LEONIE HILL'],
	['OTHERS-57 THE INGLEWOOD'],
	['OTHERS-1 NORTH BUONA VISTA DRIVE'],
	['OTHERS-19 JALAN SEDAP'],
	['OTHERS-10 DEFU LANE 8'],
	['OTHERS-55 UBI ROAD 1'],
	['OTHERS-188 PANDAN LOOP'],
	['OTHERS-303 ALEXANDRA ROAD'],
	['OTHERS-308 GOMBAK DRIVE'],
	['OTHERS-303 GOMBAK DRIVE'],
	['OTHERS-60 TUAS SOUTH AVENUE 9'],
	['OTHERS-81 CHOA CHU KANG WAY'],
	['OTHERS-9 OLD PIER ROAD'],
	['OTHERS-48 BOON LAY WAY'],
	['OTHERS-601 CHOA CHU KANG ROAD'],
	['OTHERS-6 RAFFLES BOULEVARD'],
	['OTHERS-1 ESPLANADE DRIVE'],
	['OTHERS-140 HILL STREET'],
	['OTHERS-510 UPPER JURONG ROAD'],
	['OTHERS-3 PADANG CHANCERY'],
	['OTHERS-7 RAFFLES AVENUE'],
	['OTHERS-10 KRANJI ROAD'],
	['OTHERS-317 ALEXANDRA ROAD'],
	['OTHERS-1 MARINA BOULEVARD'],
	['OTHERS-231 BAIN STREET'],
	['OTHERS-37 JURONG PORT ROAD'],
	['OTHERS-2 JURONG PORT ROAD'],
	['OTHERS-28 MARSILING DRIVE'],
	['OTHERS-30 IRRAWADDY ROAD'],
	['OTHERS-201 PORTSDOWN ROAD'],
	['OTHERS-920 NEW UPPER CHANGI ROAD'],
	['STE'],
	['STK'],
	['SUN SPORTS CLUB'],
	['SUNGEI GEDONG CAMP'],
	['SUNTEC CITY'],
	['SWAMI HOME'],
	['SWISSOTEL'],
	['TAMPINES STADIUM'],
	['TANJONG GUL CAMP'],
	['TEMASEK CLUB'],
	['THE ORIENTAL SINGAPORE'],
	['TOA PAYOH STADIUM'],
	['TRADOC FOYER'],
	['TUAS NAVAL BASE'],
	['UBI COMFORT DELGRO'],
	['UNITED SPORTS AT KALLANG PUDDING'],
	['WEST COAST FERRY TERMINAL'],
	['WOODLANDS MRT'],
	['YISHUN AVE 7 TP 11'],
	['YMCA APARTMENT'],
	['DIEPPE BARRACKS'],
	['YORK HILL'],
	['BO TIEN HOME'],
	['PHILIPS SERVICING CENTRE'],
	['MOWBRAY CAMP'],
	['YISHUN INDUSTRIAL PARK'],
	['YISHUN AREA'],
	['SEMBAWANG CAMP'],
	['KRANJI CAMP 2'],
	['BUKIT PANJANG CAMP'],
	['BEDOK CAMP'],
	['MACRITCHIE RESERVIOR'],
	['HAVELOCK'],
	['ECP CARPARK B'],
	['INDECO DEFU LANE'],
	['RIFLE RANGE CAMP'],
	['CHANGI AIRBASE'],
	['PAYA LEBAR AIR BASE'],
	['SELETAR AIR BASE'],
	['TENGAH AIR BASE'],
	['SINGAPORE CHANGI AIRPORT'],
	['CHONG PANG CAMP'],
	['ST Kinetics'],
	['AMOY QUEE CAMP'],
	['OTHERS-1 ROCHALIE DRIVE'],
	['OTHERS-12 RIFLE RANGE ROAD'],
	['OTHERS-190 LORONG 6 TOA PAYOH'],
	['OTHERS-40 SCOTTS ROAD'],
	['OTHERS-110 PIONEER SECTOR 2'],
	['OTHERS-2 SIMEI STREET 3'],
	['OTHERS-20 TUAS AVENUE 3'],
	['OTHERS-251 TANGLIN ROAD'],
	['OTHERS-1 PADANG CHANCERY'],
	['OTHERS-10 TUAS WEST ROAD'],
	['OTHERS-11 BIOPOLIS WAY'],
	['OTHERS-11 JALAN TAN TOCK SENG'],
	['OTHERS-16 COLLEGE ROAD'],
	['OTHERS-1 EXPO DRIVE'],
	['OTHERS-35 HOLLAND GROVE DRIVE'],
	['OTHERS-10 SIMEI AVENUE'],
	['OTHERS-105 JALAN TAN TOCK SENG'],
	['OTHERS-30 TUAS WEST ROAD'],
	['OTHERS-185 TOA PAYOH CENTRAL'],
	['OTHERS-7 SHENTON WAY'],
	['OTHERS-29 TUAS WEST ROAD'],
	['OTHERS-695 MANDAI ROAD'],
	['OTHERS-566 WOODLANDS ROAD'],
	['OTHERS-5 LOWER KENT RIDGE ROAD'],
	['OTHERS-307 ALEXANDRA ROAD'],
	['OTHERS-14 KALLANG WAY 4'],
	['OTHERS-3013 BEDOK INDUSTRIAL PARK E'],
	['OTHERS-100 SUNGEI TENGAH ROAD'],
	['OTHERS-0 ANDREW ROAD'],
	['OTHERS-500 LORONG 6 TOA PAYOH'],
	['OTHERS-0 SILOSO ROAD'],
	['OTHERS-601 OLD CHOA CHU KANG ROAD'],
	['OTHERS-3 SENTOSA EAST MALL'],
	['OTHERS-10 BUKIT CHERMIN ROAD'],
	['OTHERS-10 SCOTTS ROAD'],
	['OTHERS-845 GEYLANG ROAD'],
	['OTHERS-397 LORONG 2 TOA PAYOH'],
	['OTHERS-2 TAMPINES AVENUE 9'],
	['OTHERS-128 PRINSEP STREET'],
	['OTHERS-1800 ANG MO KIO AVENUE 1'],
	['OTHERS-19 TANGLIN ROAD'],
	['OTHERS-1033 UPPER SERANGOON ROAD'],
	['OTHERS-65 TANJONG KATONG ROAD'],
	['OTHERS-327 HOUGANG AVENUE 5'],
	['OTHERS-10 JURONG EAST STREET 12'],
	['OTHERS-990 OLD CHOA CHU KANG ROAD'],
	['OTHERS-177 HINDHEDE DRIVE'],
	['OTHERS-69 JALAN BAHTERA'],
	['OTHERS-15 JALAN KILANG BARAT'],
	['OTHERS-216 JURONG EAST STREET 21'],
	['OTHERS-20 TAMPINES CENTRAL 1'],
	['OTHERS-111 BUKIT BATOK WEST AVENUE 6'],
	['OTHERS-55 SIMS AVENUE EAST'],
	['OTHERS-159 OLD AIRPORT ROAD'],
	['OTHERS-29 JALAN SENTOSA'],
	['OTHERS-3A JOO KOON CIRCLE'],
	['OTHERS-14 FAN YOONG ROAD'],
	['OTHERS-10 DOVER DRIVE'],
	['OTHERS-16 TUAS AVENUE 6'],
	['OTHERS-461 MANDAI ROAD'],
	['OTHERS-471 LIM CHU KANG ROAD'],
	['OTHERS-331 YISHUN RING ROAD'],
	['OTHERS-22 TANJONG KLING ROAD'],
	['OTHERS-60 ALBERT STREET'],
	['OTHERS-1 WOODLANDS STREET 13'],
	['OTHERS-297 LORONG 6 TOA PAYOH'],
	['OTHERS-98 VICTORIA STREET'],
	['OTHERS-2 GOODWOOD HILL'],
	['OTHERS-101 SILOSO ROAD'],
	['OTHERS-1 OLD PARLIAMENT LANE'],
	['OTHERS-500 LORONG 6 TOA PAYOH'],
	['OTHERS-500 LORONG 6 TOA PAYOH'],
	['OTHERS-19 KENT RIDGE CRESCENT'],
	['OTHERS-331 ANG MO KIO AVENUE 1'],
	['OTHERS-1 CLUNY ROAD'],
	['OTHERS-61 CHAI CHEE STREET'],
	['OTHERS-20 WOODLANDS AVENUE 9'],
	['OTHERS-39 SCOTTS ROAD'],
	['OTHERS-27 NAPIER ROAD'],
	['OTHERS-10 BEDOK RESERVOIR VIEW'],
	['OTHERS-16 BENOI ROAD'],
	['OTHERS-1 ST. ANDREW ROAD'],
	['OTHERS-3 ST. ANDREW ROAD'],
	['OTHERS-27 MEDICAL DRIVE'],
	['OTHERS-121 DOVER ROAD'],
	['OTHERS-275 JURONG WEST STREET 25'],
	['OTHERS-  AIRPORT CARGO ROAD'],
	['OTHERS-6 BEDOK SOUTH AVENUE 3'],
	['OTHERS-190 DUNEARN ROAD'],
	['OTHERS-100 HIGH STREET'],
	['OTHERS-795 ANG MO KIO STREET 22'],
	['OTHERS-15 ARTILLERY AVENUE'],
	['OTHERS-190 ORCHARD BOULEVARD'],
	['OTHERS-15 KENT RIDGE CRESCENT'],
	['OTHERS-27 BUKIT MANIS ROAD'],
	['OTHERS-80 MARINE PARADE CENTRAL'],
	['OTHERS-1 FULLERTON SQUARE'],
	['OTHERS-6 ANG MO KIO STREET 53'],
	['OTHERS-10 BUKIT CHERMIN ROAD'],
	['OTHERS-1 RAFFLES INSTITUTION LANE'],
	['OTHERS-8 RAFFLES AVENUE'],
	['OTHERS-861 ANG MO KIO AVENUE 10'],
	['OTHERS-20 SCIENCE PARK DRIVE'],
	['OTHERS-29 TANJONG KLING ROAD'],
	['OTHERS-391 NEW BRIDGE ROAD'],
	['OTHERS-130 TANJONG RHU ROAD'],
	['OTHERS-621 CHOA CHU KANG'],
	['OTHERS-236 TAMPINES STREET 21'],
	['OTHERS-41 PANDAN ROAD'],
	['OTHERS-36 CASSIA CRESCENT'],
	['OTHERS-10 TANJONG RHU ROAD'],
	['OTHERS-90 EU TONG SEN STREET'],
	['OTHERS-3013 BEDOK INDUSTRIAL PARK E'],
	['OTHERS-653 YISHUN AVENUE 4'],
	['OTHERS-6 SERANGOON NORTH AVENUE 5'],
	['OTHERS-40 SUNGEI KADUT STREET 1'],
	['OTHERS-30 ATTAP VALLEY ROAD'],
	['OTHERS-83 MARINE PARADE CENTRAL'],
	['OTHERS-53 BENOI ROAD'],
	['OTHERS-80 BRAS BASAH ROAD'],
	['OTHERS-100 EU TONG SEN STREET'],
	['OTHERS-1 ORCHID CLUB ROAD'],
	['OTHERS-219 JALAN KAYU'],
	['OTHERS-1 PASIR RIS CLOSE'],
	['OTHERS-1 NETHERAVON ROAD'],
	['OTHERS-80 RIVERVALE CRESCENT'],
	['OTHERS-638 YISHUN STREET 61'],
	['OTHERS-761 WOODLANDS AVENUE 6'],
	['OTHERS-51 BUKIT BATOK CRESCENT'],
	['OTHERS-103 YISHUN AVENUE 1'],
	['OTHERS-15 STADIUM ROAD'],
	['OTHERS-20 BIDEFORD ROAD'],
	['OTHERS-B CONNAUGHT DRIVE'],
	['OTHERS-34 JOO KOON CIRCLE'],
	['OTHERS-4008 ANG MO KIO AVENUE 10'],
	['OTHERS-800 CORPORATION ROAD'],
	['OTHERS-31 WOODLANDS CRESCENT'],
	['OTHERS-6 CHOA CHU KANG CENTRAL'],
	['OTHERS-513 JELAPANG ROAD'],
	['OTHERS-22 ORANGE GROVE ROAD'],
	['OTHERS-1 MOUNT PLEASANT ROAD'],
	['OTHERS-10 UBI AVENUE 1'],
	['OTHERS-1 TANGLIN ROAD'],
	['OTHERS-25 CHANGI COAST ROAD'],
	['OTHERS-260 TANJONG PAGAR ROAD'],
	['OTHERS-133 HEMMANT ROAD'],
	['OTHERS-320 KING GEORGE AVENUE'],
	['OTHERS-10 KENT RIDGE CRESCENT'],
	['OTHERS-11 CAVENAGH ROAD'],
	['OTHERS-384 BUKIT BATOK WEST AVENUE 5'],
	['OTHERS-1 PIONEER SECTOR 1'],
	['OTHERS-60 SOUTH BUONA VISTA ROAD'],
	['OTHERS-50 SOUTH BUONA VISTA ROAD'],
	['OTHERS-21 TAMPINES AVENUE 1'],
	['OTHERS-7 ANG MO KIO STREET 64'],
	['OTHERS-21 TAMPINES STREET 45'],
	['OTHERS-25 TAMPINES STREET 82'],
	['OTHERS-1 ANG MO KIO STREET 42'],
	['OTHERS-49 MARINE CRESCENT'],
	['OTHERS-8 FOURTH LOK YANG ROAD'],
	['OTHERS-25 CHANGI COAST ROAD'],
	['OTHERS-11 JURONG WEST STREET 65'],
	['OTHERS-10 EU TONG SEN STREET'],
	['OTHERS-535 SERANGOON NORTH AVENUE 4'],
	['OTHERS-10 BUKIT CHERMIN ROAD'],
	['OTHERS-740A BEDOK RESERVOIR ROAD'],
	['OTHERS-2 STAMFORD ROAD'],
	['OTHERS-190 ANG MO KIO AVENUE 8'],
	['OTHERS-1 RAFFLES BOULEVARD'],
	['OTHERS-880 TAMPINES AVENUE 8'],
	['OTHERS-100 HOUGANG AVENUE 2'],
	['OTHERS-1 SELETAR ROAD'],
	['OTHERS-461 CLEMENTI ROAD'],
	['OTHERS-108 JURONG EAST STREET 13'],
	['OTHERS-453A ANG MO KIO AVENUE 10'],
	['OTHERS-1 ANG MO KIO STREET 32'],
	['OTHERS-20 MARINE VISTA'],
	['OTHERS-43 ADMIRALTY ROAD WEST'],
	['OTHERS-37 PIONEER SECTOR 1'],
	['OTHERS-226 SUNGEI GEDONG ROAD'],
	['OTHERS-17 THOMSON HILLS DRIVE'],
	['OTHERS-0'],
	['OTHERS-491 RIVER VALLEY ROAD'],
	['OTHERS-20 KOH SEK LIM ROAD'],
	['OTHERS-116 TECK WHYE LANE'],
	['OTHERS-461 MANDAI ROAD'],
	['OTHERS-501 JALAN AHMAD IBRAHIM'],
	['OTHERS-50 CHOA CHU KANG DRIVE'],
	['OTHERS-1 PARLIAMENT PLACE'],
	['OTHERS-1 BEACH ROAD'],
	['OTHERS-32 BUKIT PANJANG RING ROAD'],
	['OTHERS-2 STADIUM WALK'],
	['OTHERS-10 SENGKANG CENTRAL'],
	['OTHERS-50 EAST COAST ROAD'],
	['OTHERS-111B KING GEORGE AVENUE'],
	['OTHERS-30 PRINSEP STREET'],
	['OTHERS-93 STAMFORD ROAD'],
	['OTHERS-9 KENT RIDGE DRIVE'],
	['OTHERS-7 RAFFLES BOULEVARD'],
	['OTHERS-409 ANG MO KIO AVENUE 10'],
	['OTHERS-320 KING GEORGE AVENUE'],
	['OTHERS-320 KING GEORGE AVENUE'],
	['OTHERS-48 GUL AVENUE'],
	['OTHERS-6 ANG MO KIO AVENUE 2'],
	['OTHERS-157 LORONG 1 TOA PAYOH'],
	['OTHERS-50 TANAH MERAH FERRY ROAD'],
	['OTHERS-5 MARINA GROVE'],
	['OTHERS-30 KALLANG PUDDING ROAD'],
	['OTHERS-11 UPPER SERANGOON VIEW'],
	['OTHERS-21 MARINA STATION ROAD'],
	['OTHERS-21 LOWER KENT RIDGE ROAD'],
	['OTHERS-450 JALAN AHMAD IBRAHIM'],
	['OTHERS-85 SULTAN GATE'],
	['OTHERS-325A ANG MO KIO AVENUE 3'],
	['OTHERS-25 DOVER CLOSE EAST'],
	['OTHERS-60 TUAS ROAD'],
	['OTHERS-101 JALAN BAHAR'],
	['OTHERS-11 JALAN BATU'],
	['OTHERS-180 BEDOK RESERVOIR ROAD']
].map(function(element) {
    return {
      name: element[0]
    };
});

data.cdHolidays = [
	['New Year Day', '1 Jan 2016', 'Yes'],
	['Chinese New Year Day 1', '8 Feb 2016', 'No'],
	['Chinese New Year Day 2', '9 Feb 2016', 'No'],
	['Good Friday', '25 Mar 2016', 'No'],
	['Labour Day', '1 May 2016', 'Yes'],
	['Vesak Day', '21 May 2016', 'No'],
	['Hari Raya Puasa', '6 Jul 2016', 'No'],
	['Hari Raya Haji', '12 Sep 2016', 'No'],
	['National Day', '9 Aug 2016', 'Yes'],
	['Deepavali', '29 Oct 2016', 'No'],
	['Christmas Day', '25 Dec 2016', 'Yes']
].map(function(element) {
	return {
		name: element[0],
		date: element[1],
		repeated: element[2]
	};
});

data.accCategories = [
	['COMBAT VEHICLE INCIDENT'],
	['NON-COMBAT VEHICLE INCIDENT'],
].map(function(element) {
   	return {
   		name: element[0],
   	};
});

data.accLocTypes = [
  	['Training Area'],
  	['Camp'],
  	['Public Road'],
  	['Public Area'],
].map(function(element) {
	return {
		name: element[0],
	};
});


data.accCollisionObjs = [
  	['Animals'],
  	['Lamp Post'],
  	['Parked Vehicle'],
  	['Pedestrian'],
  	['Road divider/kerb/drain'],
  	['Tree']
].map(function(element) {
	return {
		name: element[0],
	};
});

data.accCollisionDirs = [
	['Head On'],
  	['Head to Rear'],
  	['Head to Side'],
  	['Hit & Run'],
  	['Side Swipe (Different direction)'],
  	['Side Swipe (Same direction)']
].map(function(element) {
	return {
		name: element[0],
	};
});

data.accManoevres = [
	['Changing Lane'],
  	['Driving Ahead'],
  	['Entering / Leaving Shoulder'],
  	['Moving Off'],
  	['Negotiating U-turn'],
  	['Overtaking'],
  	['Reversing'],
  	['Stationary'],
  	['Stopping / Slowing Down'],
  	['Turning Left - Waiting'],
  	['Turning Right - Waiting'],
].map(function(element) {
	return {
		name: element[0],
	};
});

data.accRoadFeatures = [
	['Bend'],
	['Blind Corner'],
	['Box-junction'],
	['Camp Area'],
	['Carpark'],
	['Cross-junction'],
	['Expressway'],
	['Filter Lane'],
	['Merging Lane'],
	['Narrow Road'],
	['Others'],
	['Private Road'],
	['Sharp Turn'],
	['Straight Road'],
	['T-junction'],
	['Training Area'],
	['U-turn'],
	['Y-junction']
 ].map(function(element) {
 	return {
 		name: element[0],
 	};
 });

data.accRoadTypes = [
	['X'],
	['Y'],
	['Z'],
 ].map(function(element) {
 	return {
 		name: element[0],
 	};
 });

data.accRoadSurfaces = [
	['Dry'],
	['Dusty'],
	['Hilly'],
	['Muddy'],
	['Oily'],
	['Pebble'],
	['Rocky'],
	['Sandy'],
	['Slippery'],
	['Wet'],
].map(function(element) {
	return {
		name: element[0],
	};
});

data.accSpeedLimits = [
	['Less Than 40 km/h'],
	['40 km/h'],
	['50 km/h'],
	['60 km/h'],
	['70 km/h'],
	['80 km/h'],
	['90 km/h'],
].map(function(element) {
	return {
		name: element[0],
	};
});

data.accTrafficVolumes = [
	['Heavy'],
	['Light'],
	['Medium']
].map(function(element) {
	return {
		name: element[0],
	};
});

data.accVisibilities = [
	['Clear'],
	['Fair'],
	['Others'],
	['Poor'],
].map(function(element) {
	return {
		name: element[0],
	};
});

data.accWeathers = [
	['After Rain'],
	['Drizzling'],
	['Dry'],
	['Fine'],
	['Hazy'],
	['Heavy Rain'],
	['Snowy'],
	['Stormy'],
	['Sunny'],
].map(function(element) {
	return {
		name: element[0],
	};
});

data.accPointErrors = [
	['Failure to keep safety distance'],
	['Failure to slow down sufficiently when turning'],
	['Dozing off momentarily'],
	['Inattentive driving'],
	['Reversing w/o care'],
	['Turning w/o care'],
	['Changing lane w/o care'],
	['Overtaking w/o care'],
	['Veh comd not paying attention on the road'],
	['Veh comd did not guide vehicle when reversing'],
	['Poor visibility'],
	['Others'],
].map(function(element) {
	return {
		name: element[0],
	};
});

data.accSystemErrors = [
	['Unauthorized detail'],
	['MT RAC not completed'],
	['Misuse of vehicle'],
	['Abuse of vehicles'],
	['Route brief not conducted'],
	['Safety brief not conducted'],
	['Routes not planned'],
	['Failure by transport operator to get sufficient rest'],
	['Movement during peak hours'],
	['Failure to inform node of changes during detail'],
	['Others'],
].map(function(element) {
	return {
		name: element[0],
	};
});

data.accComplexities = [
	['STRAIGHTFORWARD'],
	['COMPLEX']
].map(function(element) {
	return {
		name: element[0],
	};
});

data.accInjuries = [
	['NO INJURIES'],
	['MINOR'],
	['MODERATE'],
	['SEVERE'],
	['FATAL']
].map(function(element) {
	return {
		name: element[0],
	};
});

data.accCvVehTypes = [
	['BUS'],
	['CAR'],
	['LORRY'],
	['MOTORBIKE'],
	['TRUCK'],
	['VAN'],
	['OTHERS'],
].map(function(element) {
	return {
		name: element[0],
	};
});

data.accVehicles = [
	['MID12312', 'MILITARY', '5 TON GS (AUTO)', 'Yes', '20-Jan-2016', '20-Dec-2015', 'Windscreen crack', ''],
	['SJK9892A', 'CIVILIAN', 'Car', '', '', '', 'Windscreen crack', '']
].map(function(element) {
	return {
		plateNo: element[0],
		machineType: element[1],
		vehicleType: element[2],
		bocConducted: element[3],
		lastUQM: element[4],
		lastAVI: element[5],
		vehDamages: element[6],
		propDamages: element[7]
	};
});

data.accPersonnels = [
	['S8303514E', 'CPL IRWAN BIN AWANG', 'HUB EAST', 'BEDOK NODE', 'REG', 'DVR', 'B', 'SAF/TPT/N/01942/07', '5000', '3000', '2000', 'Minor'],
	['S8477006A', 'CPL CHEW YAK KING', 'HUB EAST', 'PLC NODE', 'REG', 'DVR', 'B', 'SAF/TPT/N/01941/02', '5000', '3000', '2000', 'No injuries'],
].map(function(element) {
	return {
		nric: element[0],
		name: element[1],
		hub: element[2],
		node: element[3],
		servStat: element[4],
		vocation: element[5],
		drivingCat: element[6],
		permitNo: element[7],
		totalMileage: element[8],
		class3Mileage: element[9],
		class4Mileage: element[10],
		injury: element[11]
	};
});

data.toPostDtlQns = [
	['Was the customer punctual?', 'Yes|No', '1'],
	['Was the vehicle used as per detailed purpose?', 'Yes|No', '2'],
	['Were you given sufficient rest?', 'Yes|No', '3'],
	['Was ration provided?', 'Yes|No', '4'],
	['Was the Vehicle Commander co-operative?', 'Yes|No', '5']
].map(function(element) {
	return {
		name: element[0],
		answers: element[1],
		order: element[2]
	};
});

data.custPostDtlQns = [
	['Punctuality', 'Strongly Agree|Agree|Neutral|Disagree|Strongly Disagree', 'Transport Operator', '1'],
	['Turnout and Bearing', 'Strongly Agree|Agree|Neutral|Disagree|Strongly Disagree', 'Transport Operator', '2'],
	['Attitude and Mannerism', 'Strongly Agree|Agree|Neutral|Disagree|Strongly Disagree', 'Transport Operator', '3'],
	['Driving Skill and Proficiency', 'Strongly Agree|Agree|Neutral|Disagree|Strongly Disagree', 'Transport Operator', '4'],
	['Cleanliness', 'Strongly Agree|Agree|Neutral|Disagree|Strongly Disagree', 'Vehicle', '5'],
	['Serviceability', 'Strongly Agree|Agree|Neutral|Disagree|Strongly Disagree', 'Vehicle', '6'],
	['Security', 'Strongly Agree|Agree|Neutral|Disagree|Strongly Disagree', 'Vehicle', '7'],
	['Turnout and Bearing', 'Strongly Agree|Agree|Neutral|Disagree|Strongly Disagree', 'Overall', '8']
].map(function(element) {
	return {
		name: element[0],
		answers: element[1],
		category: element[2],
		order: element[3]
	};
});

data.custQrterlyQns = [
	['The support of Transport requests has been forthcoming', 'Strongly Agree|Agree|Neutral|Disagree|Strongly Disagree', '1'],
	['The serviceability of vehicles provided are up to standard', 'Strongly Agree|Agree|Neutral|Disagree|Strongly Disagree', '2'],
	['Transport Operators are well trained and demonstrated professionalism', 'Strongly Agree|Agree|Neutral|Disagree|Strongly Disagree', '3'],
	['Overall I am satisfied with the level of the support provided by the Transport Nodes', 'Strongly Agree|Agree|Neutral|Disagree|Strongly Disagree', '4']
].map(function(element) {
	return {
		name: element[0],
		answers: element[1],
		order: element[2]
	};
});

data.permits = [
	['LOA/LNTL2776173', 'LOA-LNT', 'Valid', '2X,2', 'S1576751J', '1WO FELIX RON LIM CHOONG CHEW', '31-Dec-2013', '31-Dec-2013', '', 'HUB EAST', 'BEDOK NODE'],
	['SAF/TPT/N/00444/00', 'QDL', 'Suspended', '2B', 'S7337198H', 'SSG CHIOK GIM KOO, TOMMY', '03-Jan-2000', '31-Dec-2013', '31-Dec-2013', 'HUB EAST', 'PLC NODE'],
	['SAF/TPT/N/00123/90', 'QDL', 'MINDEF Reserve', '2BX,2B,2A', 'S8118627H', 'LCP TENG KIT YUN', '02-Jan-1990', '02-Jan-2013', '', 'HUB EAST', 'BEDOK NODE'],
].map(function(element) {
	return {
		permitNo: element[0],
		permitType: element[1],
		permitStatus: element[2],
		permitClasses: element[3],
		nric: element[4],
		name: element[5],
		issueDate: element[6],
		statusFrom: element[7],
		statusTo: element[8],
		hub: element[9],
		node: element[10],
	};
});

data.cdlcs = [
	['10001', 'S8118627H', 'LCP TENG KIT YUN', '20-Aug-2016', 'S8118627H', 'SAF/TPT/N/00001/03', 'CL3', 'Yes', 'Yes', 'Yes', 'APPROVED', '17-Aug-2016'],
	['10002', 'S8118628H', 'LCP TENG YUN YUN', '20-Aug-2016', 'S8118627H', 'SAF/TPT/N/00004/03', 'CL3', 'Yes', 'Yes', 'Yes', 'SUBMITTED', ''],
	['10003', 'S8654125A', 'LCP LEOW JIA JAY', '20-Aug-2016', 'S8654125A', 'SAF/TPT/N/00002/03', 'CL2,CL3', 'Yes', 'No', '', 'PENDING', ''],
	['10004', 'S8654125A', 'LCP JOHNNY TAN AH LOW', '20-Aug-2016', 'S8654125A', 'SAF/TPT/N/00002/03', 'CL2A,CL3,CL4', '', '', '', 'NEW', ''],
].map(function(element) {
	return {
		id: element[0],
		nric: element[1],
		name: element[2],
		ord: element[3],
		cdl: element[4],
		permitNo: element[5],
		classesApplied: element[6],
		mileageChecked: element[7],
		tpScreened: element[8],
		classesEligible: element[9],
		status: element[10],
		collectionDate: element[11]
	};
});