app.service("VehicleAvailService", function (Restangular) {
	
	this.search = function(searchDTO) {
        return Restangular.one("vehicleAvail/searchVehicleAvail").get(searchDTO);
	};
	
	this.exportVehicleAvail = function(searchDTO) {
		return Restangular.one("vehicleAvail/exportVehicleAvail").withHttpConfig({ responseType:'arraybuffer' }).get(searchDTO);
	};
	
	this.save = function(dto) {
        return Restangular.all("vehicleAvail/saveVehicleAvail").post(dto);
	};
	
	this.getVehicleAvailBreakdowns = function(breakdownSearchDTO) {
        return Restangular.one("vehicleAvail/getVehicleAvailBreakdowns").get(breakdownSearchDTO);
	};
	
	this.getPmInfo = function(vehicleNos) {
		return Restangular.all("vehicleAvail/getPmInfo").get(vehicleNos);
	}
	
	this.scheduleNextPm = function(pmActionDTO) {
		return Restangular.all("vehicleAvail/scheduleNextPm").post(pmActionDTO)
	};
	
	this.sendForPm = function(pmActionDTO) {
		return Restangular.all("vehicleAvail/sendForPm").post(pmActionDTO)
	};
	
	this.returnFromPm = function(pmActionDTO) {
		pmActionDTO.maintenanceId = -1; // to bypass mandatory check since all PM actions uses the same DTO
		return Restangular.all("vehicleAvail/returnFromPm").post(pmActionDTO)
	};
	
	this.saveVehicleLoan = function(newDTO) {
        return Restangular.all("vehicleAvail/saveVehicleLoan").post(newDTO);
	};
	
	this.returnVehicleLoan = function(newDTO) {
        return Restangular.all("vehicleAvail/returnVehicleLoan").post(newDTO);
	};
	
	this.extendVehicleLoan = function(newDTO) {
        return Restangular.all("vehicleAvail/extendVehicleLoan").post(newDTO);
	};
	
});
