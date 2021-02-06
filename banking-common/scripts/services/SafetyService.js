app.service("SafetyService", function (Restangular) {
	
	this.searchDriverOffences = function(searchDTO) {
        return Restangular.one("safety/searchDriverOffences").get(searchDTO);
	};
	
	this.exportDriverOffences = function(searchDTO) {
        return Restangular.one("safety/exportDriverOffences").withHttpConfig({ responseType:'arraybuffer' }).get(searchDTO);
	};
	
	this.getDriverOffence = function(driverOffenceId) {
		return Restangular.one("safety/getDriverOffence/" + driverOffenceId).get();
	};
	
	this.getDriverPermitNo = function(nricNo) {
		return Restangular.one("safety/getDriverPermitNo/" + nricNo).get();
	};
	
	this.saveDriverOffence = function(dto) {
		return Restangular.all("safety/saveDriverOffence").post(dto);
	};
	
	this.updateDriverOffence = function(dto) {
		return Restangular.all("safety/updateDriverOffence").post(dto);
	};
	
	this.deleteDriverOffence = function(driverOffenceId) {
		return Restangular.all("safety/deleteDriverOffence").post(driverOffenceId);
	};
	
	this.searchDriverOffenceApprovals = function(searchDTO) {
        return Restangular.one("safety/searchDriverOffenceApprovals").get(searchDTO);
	};
	
	this.approveDriverOffences = function(decisionDTOs) {
		return Restangular.all("safety/approveDriverOffences").post(decisionDTOs);
	};
	
	this.searchDriverReductions = function(searchDTO) {
        return Restangular.one("safety/searchDriverReductions").get(searchDTO);
	};
	
	this.exportDriverReductions = function(searchDTO) {
        return Restangular.one("safety/exportDriverReductions").withHttpConfig({ responseType:'arraybuffer' }).get(searchDTO);
	};
	
	this.getDriverReduction = function(driverDemeritPointsId) {
		return Restangular.one("safety/getDriverReduction/" + driverDemeritPointsId).get();
	};
	
	this.getCurrentDemeritPoints = function(nricNo) {
		return Restangular.one("safety/getCurrentDemeritPoints/" + nricNo).get();
	};
	
	this.saveDriverReduction = function(dto) {
		return Restangular.all("safety/saveDriverReduction").post(dto);
	};
	
	this.updateDriverReduction = function(dto) {
		return Restangular.all("safety/updateDriverReduction").post(dto);
	};
	
	this.deleteDriverReduction = function(driverDemeritPointsId) {
		return Restangular.all("safety/deleteDriverReduction").post(driverDemeritPointsId);
	};
	
	this.searchDriverReductionApprovals = function(searchDTO) {
        return Restangular.one("safety/searchDriverReductionApprovals").get(searchDTO);
	};
	
	this.approveDriverReductions = function(decisionDTOs) {
		return Restangular.all("safety/approveDriverReductions").post(decisionDTOs);
	};
});
