app.service("IndentService", function (Restangular) {
	
//	this.searchIndents = function(searchDTO) {
//        return Restangular.one("indent/searchIndents").get(searchDTO);
//	};
	
	this.searchIndents = function(searchDTO) {
        return Restangular.one("indent/searchIndents").get(searchDTO);
	};
	
	this.getNodeChart = function(searchDTO) {
		return Restangular.one("indent/getNodeChart").get(searchDTO);
	};
	
	this.getNodeButtonChart = function(searchDTO) {
		return Restangular.one("indent/getNodeButtonChart").get(searchDTO);
	};
	
	this.getResourceAvailability = function(searchDTO) {
		return Restangular.one("indent/getResourceAvailability").get(searchDTO);
	};
	
	this.recountResourceAvailability = function(dto) {
		return Restangular.all("indent/recountResourceAvailability").post(dto);
	};
	
	this.getIndent = function(indentNo) {
		return Restangular.one("indent/getIndent/" + indentNo).get();
	};
	
	this.getForwardedHub = function(id) {
		return Restangular.one("indent/getForwardedHub/" + id).get();
	};
	
	this.saveAsDraft = function(dto) {
		return Restangular.all("indent/saveAsDraft").post(dto);
	};
	
	this.deleteDraft = function(dto) {
		return Restangular.all("indent/deleteDraft").post(dto);
	};
	
	this.saveAsTemplate = function(dto) {
		return Restangular.all("indent/saveAsTemplate").post(dto);
	};
	
	this.deleteTemplate = function(templateId) {
		return Restangular.all("indent/deleteTemplate/"+ templateId).post();
	};
	
	this.createIndent = function(dto) {
		//alert('REQUEST: ' + JSON.stringify(dto));
		return Restangular.all("indent/createIndent").post(dto);
	};
	
	this.setWaitinglistFlag = function(dto) {
		return Restangular.all("indent/setWaitinglistFlag").post(dto);
	};
	
	this.updateIndentStatus = function(dto) {
		return Restangular.all("indent/updateIndentStatus").post(dto);
	};
	
	this.recommendIndent = function(dto) {
		return Restangular.all("indent/recommendIndent").post(dto);
	};

	this.recommendIndents = function(decisionDTOs) {
		return Restangular.all("indent/recommendIndents").post(decisionDTOs);
	};
	
	this.approveIndent = function(dto) {
		return Restangular.all("indent/approveIndent").post(dto);
	};

	this.approveIndents = function(decisionDTOs) {
		return Restangular.all("indent/approveIndents").post(decisionDTOs);
	};
	
	this.acceptMultiIndent = function(dto) {
		return Restangular.all("indent/acceptMultiIndent").post(dto);
	};

	this.acceptMultiIndents = function(decisionDTOs) {
		return Restangular.all("indent/acceptMultiIndents").post(decisionDTOs);
	};
	
	this.acceptSingleIndent = function(dto) {
		return Restangular.all("indent/acceptSingleIndent").post(dto);
	};

	this.acceptSingleIndents = function(decisionDTOs) {
		return Restangular.all("indent/acceptSingleIndents").post(decisionDTOs);
	};
	
	this.confirmIndent = function(dto) {
		return Restangular.all("indent/confirmIndent").post(dto);
	};

	this.confirmIndents = function(decisionDTOs) {
		return Restangular.all("indent/confirmIndents").post(decisionDTOs);
	};
	
	this.forwardSingleIndent = function(dto) {
		return Restangular.all("indent/forwardSingleIndent").post(dto);
	};
	
	this.forwardMultiIndent = function(dto) {
		return Restangular.all("indent/forwardMultiIndent").post(dto);
	};

	this.recallIndent = function(dto) {
		return Restangular.all("indent/recallIndent").post(dto);
	};
	
	this.revertIndent = function(dto) {
		return Restangular.all("indent/revertIndent").post(dto);
	};
	
	this.cancelIndent = function(dto) {
		return Restangular.all("indent/cancelIndent").post(dto);
	};
	
	this.approveCentralVoteUsage = function(dto) {
		return Restangular.all("indent/approveCentralVoteUsage").post(dto);
	};
	
	this.approveCentralVoteUsages = function(decisionDTOs) {
		return Restangular.all("indent/approveCentralVoteUsages").post(decisionDTOs);
	};
	
	this.exportAllOrders = function(searchDTO) {
		return Restangular.one("indent/exportAllOrders").withHttpConfig({ responseType:'arraybuffer' }).get(searchDTO);
	};
	
	this.getUnitCredits = function(unitCode) {
        return Restangular.one("indent/getUnitCredits/"+unitCode).get();       
	};
	
	this.searchSupportedPurposesReport = function(searchDTO) {
        return Restangular.one("indent/searchSupportedPurposesReport").get(searchDTO);
	};
	
	this.exportSupportedPurposesReport = function(searchDTO) {
        return Restangular.one("indent/exportSupportedPurposesReport").withHttpConfig({ responseType:'arraybuffer' }).get(searchDTO);
	};
	
	this.filterResourceTypes = function(input) {
		if (input == 'Y') {
			return function(resourceType) {
				return resourceType.code === "DRV";
			}
		} else if (input == 'Allocated Resource') {
			return function(resourceType) {
				return resourceType.code === "VEH";
			}
		}
		return true;
	};
	
	this.filterVehicleTypes = function(id) {
		if (id) {
			return function(vehicleType) {
				return purpose.id === id;
			}
		}
		return true;
	};
	
	this.filterCurrentHub = function(codeName) {
		if (codeName) {
			return function(code) {
				return code.name != codeName;
			}
		}
		return true;
	};
	
	this.getIndentResourceDTO = function(indentResources, counter) {
		for (var i = 0; i < indentResources.length; i++) {
			if (indentResources[i].id == counter) {
				return indentResources[i];
			}
		}
		return null;
	};
	
	this.mapProperties = function(srcObj, destObj, purpose) {
		destObj.id = srcObj.id;
		destObj.resourceType = srcObj.resourceType;
		destObj.resourceTypeName = srcObj.resourceTypeName;
		destObj.vehicleType = srcObj.vehicleType;
		destObj.vehicleTypeName = srcObj.vehicleTypeName;
		destObj.vehicleQuantity = srcObj.vehicleQuantity;
		destObj.operatorQuantity = srcObj.operatorQuantity;
		destObj.parkdownFlag = srcObj.parkdownFlag;
		destObj.parkdownCampMovement = srcObj.parkdownCampMovement;
		destObj.parkdownDuration = srcObj.parkdownDuration;
		destObj.parkdownQuantity = srcObj.parkdownQuantity;
		destObj.parkdownTime = srcObj.parkdownTime;
		destObj.credits = srcObj.credits;
		destObj.vehNodeAvail = srcObj.vehNodeAvail;
		destObj.drvNodeAvail = srcObj.drvNodeAvail
		destObj.vehParkdownAvail = srcObj.vehParkdownAvail;
		destObj.drvParkdownAvail = srcObj.drvParkdownAvail;
		destObj.vehHubAvail = srcObj.vehHubAvail;
		destObj.drvHubAvail = srcObj.drvHubAvail;
		destObj.waitingList = srcObj.waitingList;
		destObj.proficiencyList = srcObj.proficiencyList;
		destObj.towTypeList = srcObj.towTypeList;
		destObj.proficiencyNameList = srcObj.proficiencyNameList;
		destObj.towTypeNameList = srcObj.towTypeNameList;
		destObj.remarks = srcObj.remarks;
		if(purpose != null){
			destObj.purpose = srcObj.purpose;
			destObj.purposeName = srcObj.purposeName;
		}
	};
	
	var toAmend = {};
	this.mapIndent = function(){
		var addIndent = function(srcObj) {
			toAmend = srcObj;
		};
		var getMappedIndent = function(){
			return toAmend;
		};

		return{
			addIndent: addIndent,
			getMappedIndent: getMappedIndent
		};   
	};
	
//	this.validateForProperties = function(dto) {
//		var errors = "";
//		if(dto.hubList == null) {
//			errors += "&bull; Please select at least one Hub.<br>";
//		}
//		if(!dto.reasons) {
//			errors += "&bull; Please enter the reason.<br>";
//		}
//		if(errors.length > 0) {
//			errors = errors.substring(0, errors.length - 4);
//		}
//		return errors;
//	};
	
	this.validateDTOProperties = function(dto, indentResource, role, activityType) {
		var errors = "";
		if(!dto.activityId) {
			errors += "&bull; Please select the Activity Type.<br>";
		}
		if(dto.overseasFlag === 'Y') {
			if(!dto.country) {
				errors += "&bull; Please select the Country.<br>";
			}
		}
		if(!dto.activityName) {
			errors += "&bull; Please enter the Activity Name.<br>";
		}
		if(role !== 'Unit' || role !== 'Node') {
			if(!dto.unitCode) {
				errors += "&bull; Please enter the Customer Unit.<br>";
			}
		}
		if(dto.overseasFlag === 'N') {
			if(!dto.campMovement) {
				errors += "&bull; Please select the Camp Movement.<br>";
			}
		}
		if(!dto.dateRange) {
			errors += "&bull; Please select the Indent Period.<br>";
		}
		if(!dto.reportingVenueId && activityType !== 'MT Admin') {
			errors += "&bull; Please select the Reporting Venue.<br>";
		}
		if(!dto.reportingInfo && activityType !== 'MT Admin') {
			errors += "&bull; Please enter the Reporting Info.<br>";
		}
		if(!dto.destinationVenueId && activityType !== 'MT Admin' && dto.overseasFlag == 'N') {
			errors += "&bull; Please select the Destination Venue.<br>";
		}
		if(!dto.poc && activityType !== 'MT Admin') {
			errors += "&bull; Please enter the Reporting Point-of-Contact.<br>";
		}
		if(indentResource.length === 0) {		
			errors += "&bull; Please add at least one resource.<br>";
		}
		if(errors.length > 0) {
			errors = errors.substring(0, errors.length - 4);
		}
		return errors;
	};
	
	this.validateIRProperties = function(indentResource, dto, activityType) {
		var errors = "";
		if(!dto.dateRange) {
			errors += "&bull; Please select the Indent Period.<br>";
		}
		if(!indentResource.resourceType) {
			errors += "&bull; Please select the Resource Type.<br>";
		}
		if(!indentResource.vehicleType) {
			errors += "&bull; Please select the Vehicle Type.<br>";
		}
		if((activityType === "Training" || activityType === "Admin" || activityType === "Urgent Admin") && indentResource.resourceType !== "DRV") {
			if(!indentResource.purpose) {
				errors += "&bull; Please select the Indent Purpose.<br>";
			}
		}
		if(indentResource.resourceType == "VEH_DRV") {
			if(indentResource.vehicleQuantity === 0){
				errors += "&bull; Please enter at least 1 Required Quantity.<br>";
			}
		}
		if(indentResource.resourceType == "VEH") {
			if(indentResource.vehicleQuantity === 0){
				errors += "&bull; Please enter at least 1 Required Quantity.<br>";
			}
		}
		if(indentResource.resourceType == "DRV") {
			if(indentResource.operatorQuantity === 0){
				errors += "&bull; Please enter at least 1 Required Quantity.<br>";
			}
		}
		if(indentResource.parkdownFlag === "Y") {
			if(!indentResource.parkdownCampMovement) {
				errors += "&bull; Please select if Park-Down is within Supporting Node Complex.<br>";
			}
			if(!indentResource.parkdownTime) {
				errors += "&bull; Please select the Park-Down Date & Time.<br>";
			}
			if(!indentResource.parkdownDuration) {
				errors += "&bull; Please select the Park-Down Duration.<br>";
			}
			
		}
		if(errors.length > 0) {
			errors = errors.substring(0, errors.length - 4);
		}
		return errors;
	};
	
});
