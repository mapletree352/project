app.service("DriverService", function (Restangular) {
		
	this.searchDrivers = function(searchDTO) {
		return Restangular.one("driver/searchDrivers").get(searchDTO);
	};
	
	this.exportDrivers = function(searchDTO) {
		return Restangular.one("driver/exportDrivers").withHttpConfig({ responseType:'arraybuffer' }).get(searchDTO);
	};

	this.getDriver = function(nricNo) {
		return Restangular.one("driver/getDriver/" + nricNo).get();
	};
	
	this.batchUpdateDrivers = function(dto){
		return Restangular.all("driver/batchUpdateDrivers").post(dto);
	};
	
	this.updateDriver = function(dto) {
		return Restangular.all("driver/updateDriver").post(dto);
	};
	
	this.saveDriverVehicleFam = function(driverVehicleFamDTO) {
		return Restangular.all("driver/saveDriverVehicleFam").post(driverVehicleFamDTO);
	};
	
	this.saveDriverDrivingCategory = function(driverDrivingCategoryDTO) {
		return Restangular.all("driver/saveDriverDrivingCategory").post(driverDrivingCategoryDTO);
	};
	
	this.saveDriverProficiency = function(driverProficiencyDTO) {
		return Restangular.all("driver/saveDriverProficiency").post(driverProficiencyDTO);
	};
	
	this.withdrawDriverVehicleFams = function(withdrawDTO) {
		return Restangular.all("driver/withdrawDriverVehicleFams").post(withdrawDTO);
	};
	
	this.withdrawDriverDrivingCategories = function(withdrawDTO) {
		return Restangular.all("driver/withdrawDriverDrivingCategories").post(withdrawDTO);
	};
	
	this.withdrawDriverProficiencies = function(withdrawDTO) {
		return Restangular.all("driver/withdrawDriverProficiencies").post(withdrawDTO);
	};
	
	this.searchDriverSkillApprovals = function(searchDTO) {
		return Restangular.one("driver/searchDriverSkillApprovals").get(searchDTO);
	};
	
	this.approveDriverSkills = function(decisionDTOs) {
		return Restangular.all("driver/approveDriverSkills").post(decisionDTOs);
	};
	
	this.searchDriverAttachments = function(searchDTO) {
		return Restangular.one("driver/searchDriverAttachments").get(searchDTO);
	};
	
	this.endorseDriverAttachments = function(decisionDTOs) {
		return Restangular.all("driver/endorseDriverAttachments").post(decisionDTOs);
	};
		
	this.approveDriverAttachments = function(decisionDTOs) {
		return Restangular.all("driver/approveDriverAttachments").post(decisionDTOs);
	};
	
	this.saveDriverReward = function(driverRewardDTO) {
		return Restangular.all("driver/saveDriverReward").post(driverRewardDTO);
	};
	
	this.searchDriverRewards = function(searchDTO) {
		return Restangular.one("driver/searchDriverRewards").get(searchDTO);
	};
	
	this.verifyDriverRewards = function(decisionDTOs) {
		return Restangular.all("driver/verifyDriverRewards").post(decisionDTOs);
	};
	
	this.recommendDriverRewards = function(decisionDTOs) {
		return Restangular.all("driver/recommendDriverRewards").post(decisionDTOs);
	};
	
	this.approveDriverRewards = function(decisionDTOs) {
		return Restangular.all("driver/approveDriverRewards").post(decisionDTOs);
	};
	
	this.withdrawDriverRewards = function(withdrawDTO) {
		return Restangular.all("driver/withdrawDriverRewards").post(withdrawDTO);
	};
	
	this.searchDriverTrips = function(searchDTO) {
		return Restangular.one("driver/searchDriverTrips").get(searchDTO);
	};
	
	this.searchDriverVehicleTypes = function(searchDTO) {
		return Restangular.one("driver/searchDriverVehicleTypes").get(searchDTO);
	};
	
	this.searchDriverVehicleClasses = function(searchDTO) {
		return Restangular.one("driver/searchDriverVehicleClasses").get(searchDTO);
	};
	
	this.checkClaimedRewards = function(nricNo) {
		return Restangular.one("driver/checkClaimedRewards/" + nricNo).get();;
	};
	
	this.exportDriverTrips = function(searchDTO) {
		return Restangular.one("driver/exportDriverTrips").withHttpConfig({ responseType:'arraybuffer' }).get(searchDTO);
	};
	
	this.exportDriverVehicleTypes = function(searchDTO) {
		return Restangular.one("driver/exportDriverVehicleTypes").withHttpConfig({ responseType:'arraybuffer' }).get(searchDTO);
	};
	
	this.exportDriverVehicleClasses = function(searchDTO) {
		return Restangular.one("driver/exportDriverVehicleClasses").withHttpConfig({ responseType:'arraybuffer' }).get(searchDTO);
	};
	
	this.getDriverCalendars = function(driverCalendarDTO) {
		return Restangular.all("driver/getDriverCalendars").post(driverCalendarDTO);
	};
	
	this.searchTOMileageReport = function(searchDTO) {
		return Restangular.one("driver/searchTOMileageReport").get(searchDTO);
	};
	
	this.exportTOMileageReport = function(searchDTO) {
		return Restangular.one("driver/exportTOMileageReport").withHttpConfig({ responseType:'arraybuffer' }).get(searchDTO);
	};
	
	this.searchTOUtilisationRateReport = function(searchDTO) {
		return Restangular.one("driver/searchTOUtilisationRateReport").get(searchDTO);
	};
	
	this.exportTOUtilisationRateReport = function(searchDTO) {
		return Restangular.one("driver/exportTOUtilisationRateReport").withHttpConfig({ responseType:'arraybuffer' }).get(searchDTO);
	};
	
});
