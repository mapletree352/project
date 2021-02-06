app.service("DriverAvailService", function (Restangular) {
	
	this.searchDriverAvail = function(searchDTO) {
        return Restangular.one("driverAvail/searchDriverAvail").get(searchDTO);
	};
	
	this.exportDriverAvail = function(searchDTO) {
		return Restangular.one("driverAvail/exportDriverAvail").withHttpConfig({ responseType:'arraybuffer' }).get(searchDTO);
	};
	
	this.save = function(newDTO) {
        return Restangular.all("driverAvail/saveDriverAvail").post(newDTO);
	};
	
	this.getDriverAvailBreakdowns = function(breakdownSearchDTO) {
        return Restangular.one("driverAvail/getDriverAvailBreakdowns").get(breakdownSearchDTO);
	};

	this.saveDriverAttachment = function(newDTO) {
        return Restangular.all("driverAvail/saveDriverAttachment").post(newDTO);
	};
	
	this.returnDriverAttachment = function(newDTO) {
        return Restangular.all("driverAvail/returnDriverAttachment").post(newDTO);
	};
	
	this.extendDriverAttachment = function(newDTO) {
        return Restangular.all("driverAvail/extendDriverAttachment").post(newDTO);
	};
	
});
