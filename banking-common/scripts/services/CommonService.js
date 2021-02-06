app.service("CommonService", function ($q, Restangular) {
	
	this.testEmail = function(nricNo) {
    	return Restangular.all("common/testEmail/" + nricNo).post();
    };
	
	this.getPersonnelPhotoUrl = function(nricNo) {
		return Restangular.one("common/getPersonnelPhotoUrl/" + nricNo).get();
	};
	
	this.getPersonnelFromEhr = function(nricNo) {
		return Restangular.one("common/getPersonnelFromEhr/" + nricNo).get();
	};
	
	this.getActivities = function(typeCode) {
		if (typeCode) {
			return Restangular.all("common/getActivities/" + typeCode).getList();	
		} else {
			return Restangular.all("common/getActivities").getList();
		}
	};
	
	this.getActivityTypes = function() {
		return Restangular.all("common/getActivityTypes").getList();
	};
	
	this.getAuditLog = function (searchDTO) {
		return Restangular.one("common/getAuditLog").get(searchDTO);
	};
	
	this.getCountries = function() {
		return Restangular.all("common/getCountries").getList();
	};
	
	this.getCreditTxnTypes = function() {
		return Restangular.all("common/getCreditTxnTypes").getList();
	};
	
	this.getDriverStatuses = function() {
		return Restangular.all("common/getDriverStatuses").getList();
	};
	
	this.getDrivingCategories = function() {
		return Restangular.all("common/getDrivingCategories").getList();
	};
	
	this.getDriverTypes = function() {
		return Restangular.all("common/getDriverTypes").getList();
	};
	
	this.getEsEquipments = function() {
		return Restangular.all("common/getEsEquipments").getList();
	};
	
	this.getMaintenanceCycles = function() {
		return Restangular.all("common/getMaintenanceCycles").getList();
	};
	
	this.getMaintenances = function(maintenanceCycleId) {
		return Restangular.all("common/getMaintenances/" + maintenanceCycleId).getList();
	}
	
	this.getFormations = function() {
		return Restangular.all("common/getFormations").getList();
	};
	
	this.getHolidayDates = function(dateRange) {
		return Restangular.all("common/getHolidayDates/" + dateRange).getList();
	};
	
	this.getHubs = function(defunctFlag) {
		if (defunctFlag) {
			return Restangular.all("common/getHubs/" + defunctFlag).getList();	
		} else {
			return Restangular.all("common/getHubs").getList();
		}
	};
	
	this.getNodes = function(hubCode, defunctFlag) {
		if (hubCode && defunctFlag) {
			return Restangular.all("common/getNodes/" + hubCode + "/" + defunctFlag).getList();	
		} else {
			return Restangular.all("common/getNodes").getList();
		}
	};
	
	this.getOffences = function(obsoleteFlag) {
		if(obsoleteFlag){
			return Restangular.all("common/getOffences/"+obsoleteFlag).getList();
		}else{
			return Restangular.all("common/getOffences").getList();
		}	
	};
		
	this.getOffenceTypes = function(obsoleteFlag) {
		if(obsoleteFlag){
			return Restangular.all("common/getOffenceTypes/" + obsoleteFlag).getList();
		}else{
			return Restangular.all("common/getOffenceTypes").getList();
		}
	};
	
	this.getOffenceIssuers = function() {
		return Restangular.all("common/getOffenceIssuers").getList();
	};
	
	this.getPeses = function() {
		return Restangular.all("common/getPeses").getList();
	};
	
	this.getPermitClasses = function(obsoleteFlag) {
		if(obsoleteFlag){
			return Restangular.all("common/getPermitClasses/"+obsoleteFlag).getList();
		}else{
			return Restangular.all("common/getPermitClasses").getList();
		}
	};
	
	this.getPermitTypes = function(obsoleteFlag) {
		if(obsoleteFlag){
			return Restangular.all("common/getPermitTypes/"+obsoleteFlag).getList();
		}else{
			return Restangular.all("common/getPermitTypes").getList();
		}
	};
		
	this.getProficiencies = function(obsoleteFlag) {
		if(obsoleteFlag){
			return Restangular.all("common/getProficiencies/" + obsoleteFlag).getList();
		}else{
			return Restangular.all("common/getProficiencies").getList();
		}
		
	};
	
	this.getPurposes = function(activityTypeCode) {
		if (activityTypeCode) {
			return Restangular.all("common/getPurposes/" + activityTypeCode).getList();	
		} else {
			return Restangular.all("common/getPurposes").getList();
		}
		
	}
	
	this.getResourceTypes = function() {
		return Restangular.all("common/getResourceTypes").getList();
	};
	
	this.getReasons = function(reasonType) {
		return Restangular.all("common/getReasons/" + reasonType).getList();
	};
	
	this.getRewardTypes = function() {
		return Restangular.all("common/getRewardTypes").getList();
	}; 
	
	this.getRoles = function() {
		return Restangular.all("common/getRoles").getList();
	}; 
	
	this.getSecurityCategories = function() {
		return Restangular.all("common/getSecurityCategories").getList();
	};
	
	this.getStatuses = function(statusType) {
		return Restangular.all("common/getStatuses/" + statusType).getList();
	};
			
	this.getSubunits = function() {
		return Restangular.all("common/getSubunits").getList();
	};
	
	this.getTemplate = function(templateId) {
		return Restangular.one("common/getTemplate/"+ templateId).get();
	};
	
	this.getTemplates = function() {
		return Restangular.all("common/getTemplates").getList();
	};
	
	this.getTowTypes = function(obsoleteFlag) {
		if (obsoleteFlag) {
			return Restangular.all("common/getTowTypes/" + obsoleteFlag).getList();	
		} else {
			return Restangular.all("common/getTowTypes").getList();
		}
	};
	
	this.getUnits = function(nsFlag) {
		if (nsFlag) {
			return Restangular.all("common/getUnits/" + nsFlag).getList();	
		} else {
			return Restangular.all("common/getUnits").getList();
		}
	};
	
	this.getVenues = function(venueTypeId) {
		if (venueTypeId) {
			return Restangular.all("common/getVenues/" + venueTypeId).getList();	
		} else {
			return Restangular.all("common/getVenues").getList();
		}
	};
	
	this.getVenueTypes = function() {
		return Restangular.all("common/getVenueTypes").getList();
	}
	
	this.getVehicles = function() {
		return Restangular.all("common/getVehicles").getList();
	};
	
	this.getVehicleStatuses = function() {
		return Restangular.all("common/getVehicleStatuses").getList();
	};
	
	this.getVehicleTypes = function(obsoleteFlag) {
		if (obsoleteFlag) {
			return Restangular.all("common/getVehicleTypes/" + obsoleteFlag).getList();	
		} else {
			return Restangular.all("common/getVehicleTypes").getList();
		}
	};
	
	this.getVehicleTypePurposes = function(purposeId) {
		return Restangular.all("common/getVehicleTypePurposes/"+ purposeId).getList();
	};
	
	this.getVocations = function() {
		return Restangular.all("common/getVocations").getList();
	};
	
	this.filterNodes = function(hubCode) {
		if (hubCode) {
			return function(node) {
				return node.type === hubCode;
			}
		}
		return true;
	};
	
	this.filterSubunits = function(unitCode) {
		if (unitCode) {
			return function(subunit) {
				return subunit.type === unitCode;
			}
		}
		return true;
	};
	
	this.filterVehicleTypes = function(purposeId) {
		if (purposeId) {
			return function(vehicleType) {
				return _.contains(vehicleType.purposeIds, (purposeId))
			}
		}
		return true;
	};
	
	this.searchNricNames = function(nricOrName,unitCode) {
		var nricNamesPromise = Restangular.all("common/searchNricNames/" + nricOrName + "/" + unitCode).getList();
		return $q.all([ nricNamesPromise ]).then(function(data) {
			return data[0];
		});
	};
	
	this.searchUnits = function(codeOrName) {
		var unitsPromise = Restangular.all("common/searchUnits/" + codeOrName).getList();
		return $q.all([ unitsPromise ]).then(function(data) {
			return data[0];
		});
	};
	
	this.searchSubunits = function(codeOrName) {
		var subunitsPromise = Restangular.all("common/searchSubunits/" + codeOrName).getList();
		return $q.all([ subunitsPromise ]).then(function(data) {
			return data[0];
		});
	};
	
	this.searchUnitsByNode = function(codeOrName, id) {
		var unitsByNodePromise = Restangular.all("common/searchUnitsByNode/" + codeOrName + "/" + id).getList();
		return $q.all([ unitsByNodePromise ]).then(function(data) {
			return data[0];
		});
	}; 
	
	this.searchUnitsByHub = function(codeOrName, hubCode) {
		var unitsByHubPromise = Restangular.all("common/searchUnitsByHub/" + codeOrName + "/" + hubCode).getList();
		return $q.all([ unitsByHubPromise ]).then(function(data) {
			return data[0];
		});
	}; 

	this.searchVehicleNoTypes = function(vehicleNoOrType) {
		var vehicleNoTypesPromise = Restangular.all("common/searchVehicleNoTypes/" + vehicleNoOrType).getList();
		return $q.all([ vehicleNoTypesPromise ]).then(function(data) {
			return data[0];
		});
	};
		
	this.getValidDates = function(){
		return Restangular.all("common/getValidDates").getList();
	};
	
	this.getUnitAppointment = function(nricNo){
		return Restangular.one("common/getUnitAppointment/"+ nricNo).get();
	};
	
	this.getFunctions = function(){
		return Restangular.all("common/getFunctions").getList();
	};
	
	// initializing smart-table's tableState with pagination values, keep a copy of it in $scope, and return true if it is initialized already
	this.initPagination = function($scope, tableState) {
		if (angular.isUndefined($scope.tableState)) {
			tableState.pagination.start = $scope.searchDTO.startIndex;
			tableState.pagination.number = $scope.searchDTO.pageSize;
			$scope.tableState = tableState;
			return false;
		}
		return true;
	};
	
	// resetting smart-table pagination values (note: tableState should have been initialized and kept in $scope by now)
	this.resetPagination = function($scope, startIndex, pageSize) {
		$scope.tableState.order = undefined;
		$scope.tableState.orderProperty = undefined;
		$scope.tableState.pagination.start = startIndex;
		$scope.tableState.pagination.number = pageSize;
		$scope.tableState.pagination.numberOfPages = 0;
		$scope.tableState.pagination.totalItemCount = 0;
		$scope.records = [];
	};
	
	// setting smart-table's tableState with pagination values
	this.setPaginationSearch = function($scope, tableState) {
		$scope.searchDTO.startIndex = tableState.pagination.start;
		$scope.searchDTO.pageSize = tableState.pagination.number;
//		$scope.searchDTO.order = tableState.order;
//		$scope.searchDTO.orderProperty = tableState.orderProperty;
		if(tableState.order != window.undefined){
			$scope.searchDTO.order = tableState.order;
		}
		if(tableState.orderProperty != window.undefined){
			$scope.searchDTO.orderProperty = tableState.orderProperty;	
		}
	};
	
	// setting smart-table's records (asynchronously call requires data to be separated) 
	this.setPaginationResult = function($scope, tableState, data) {
		$scope.records = data[0].records;
		tableState.pagination.numberOfPages = data[0].noOfPages;
		tableState.pagination.totalItemCount = data[0].total;
	};
	
	// fire the command to search
	this.search = function($scope, defaultOrderProperty) {
		if (defaultOrderProperty) {
			setTimeout(function() {
			    angular.element('#' + escapeSelector(defaultOrderProperty)).click();
			});	
		} else {
			$scope.paginate($scope.tableState);
		}
	};
	
	function escapeSelector(s){
	    return s.replace( /(:|\.|\[|\])/g, "\\$1");
	};
	
});
