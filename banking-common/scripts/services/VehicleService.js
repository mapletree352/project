app.service("VehicleService", function (Restangular) {
	
	this.searchVehicles = function(searchDTO) {
		return Restangular.one("vehicle/searchVehicles").get(searchDTO);
	};
	
	this.exportVehicles = function(searchDTO) {
		return Restangular.one("vehicle/exportVehicles").withHttpConfig({ responseType:'arraybuffer' }).get(searchDTO);
	};
	
	this.getVehicle = function(vehicleNo) {
		return Restangular.one("vehicle/getVehicle/" + vehicleNo).get();
	};
	
	this.updateVehicle = function(dto) {
		return Restangular.all("vehicle/updateVehicle").post(dto);
	};
	
	this.batchUpdateVehicles = function(dto) {
		return Restangular.all("vehicle/batchUpdateVehicles").post(dto);
	};
	
	this.searchVehicleTypes = function(searchDTO) {
        return Restangular.one("vehicle/searchVehicleTypes").get(searchDTO);
	};
	
	this.exportVehicleTypes = function(searchDTO) {
        return Restangular.one("vehicle/exportVehicleTypes").withHttpConfig({ responseType:'arraybuffer' }).get(searchDTO);
	};
	
	this.getVehicleType = function(vehicleTypeId) {
		return Restangular.one("vehicle/getVehicleType/" + vehicleTypeId).get();
	};
	
	this.updateVehicleType = function(dto) {
		return Restangular.all("vehicle/updateVehicleType").post(dto);
	};
	
	this.createVehicleType = function(dto) {
		return Restangular.all("vehicle/createVehicleType").post(dto);
	};
	
	this.batchUpdateVehicleTypes = function(dto) {
		return Restangular.all("vehicle/batchUpdateVehicleTypes").post(dto);
	};
		
	this.reloadMaintenanceCycle = function(maintenanceCycleId) {
		return Restangular.one("vehicle/reloadMaintenanceCycle/" + maintenanceCycleId).get();
	};
	
	this.searchVehicleLoans = function(searchDTO) {
		return Restangular.one("vehicle/searchVehicleLoans").get(searchDTO);
	};
	
	this.endorseVehicleLoans = function(decisionDTOs) {
		return Restangular.all("vehicle/endorseVehicleLoans").post(decisionDTOs);
	};
		
	this.approveVehicleLoans = function(decisionDTOs) {
		return Restangular.all("vehicle/approveVehicleLoans").post(decisionDTOs);
	};
	
	this.getVehicleCalendars = function(vehicleCalendarDTO) {
		return Restangular.all("vehicle/getVehicleCalendars").post(vehicleCalendarDTO);
	};
	
	this.searchVehicleTrips = function(searchDTO) {
		return Restangular.one("vehicle/searchVehicleTrips").get(searchDTO);
	};
	
	this.searchVehicleMileageReport = function(searchDTO) {
		return Restangular.one("vehicle/searchVehicleMileageReport").get(searchDTO);
	};
	
	this.exportVehicleMileageReport = function(searchDTO) {
		return Restangular.one("vehicle/exportVehicleMileageReport").withHttpConfig({ responseType:'arraybuffer' }).get(searchDTO);
	};
	
	this.searchVehicleUtilisationRateReport = function(searchDTO) {
		return Restangular.one("vehicle/searchVehicleUtilisationRateReport").get(searchDTO);
	};
	
	this.exportVehicleUtilisationRateReport = function(searchDTO) {
		return Restangular.one("vehicle/exportVehicleUtilisationRateReport").withHttpConfig({ responseType:'arraybuffer' }).get(searchDTO);
	};
	
});