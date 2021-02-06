app.service("DriverPermitService", function (Restangular) {
		
	this.searchDriverPermits = function(searchDTO) {
        return Restangular.one("driverPermit/searchDriverPermits").get(searchDTO);
	};
	
	this.exportDriverPermits = function(searchDTO) {
        return Restangular.one("driverPermit/exportDriverPermits").withHttpConfig({ responseType:'arraybuffer' }).get(searchDTO);
	};
	
	this.getDriverPermit = function(driverPermitId) {
		return Restangular.one("driverPermit/getDriverPermit/" + driverPermitId).get();
	};
	
	this.saveDriverPermit = function(dto) {
		return Restangular.all("driverPermit/saveDriverPermit").post(dto);
	};
	
	this.updateDriverPermit = function(dto) {
		return Restangular.all("driverPermit/updateDriverPermit").post(dto);
	};
	
	this.batchUpdateDrivingPermits = function(dto){
		return Restangular.all("driverPermit/batchUpdateDrivingPermits").post(dto);
	};
	
	this.deleteDriverPermit = function(dto) {
		return Restangular.all("driverPermit/deleteDriverPermit").post(dto);
	};
	
	this.getPermitTesters = function(statusCode) {
		return Restangular.all("driverPermit/getPermitTesters/" + statusCode).getList();
	};
			
	this.getDriverPermitClassDTO = function(driverPermitClasses, permitClassCode) {
		for (var i = 0; i < driverPermitClasses.length; i++) {
			if (driverPermitClasses[i].permitClass.code === permitClassCode) {
				return driverPermitClasses[i];
			}
		}
		return null;
	};
	
	this.getSupDriverPermits =  function(driverPermitId,driverNricNo){
		return Restangular.all("driverPermit/getSupDriverPermits/"+ driverPermitId + "/" + driverNricNo).getList();
	};
	
	this.getSupDriverPermitsByDriver =  function(driverNricNo){
		return Restangular.all("driverPermit/getSupDriverPermitsByDriver/"+ driverNricNo).getList();
	};
	
	this.mapProperties = function(srcObj, destObj) {
		destObj.permitClass.code = srcObj.permitClass.code;
		destObj.permitClass.name = srcObj.permitClass.name; 
		destObj.points = srcObj.points;
		destObj.noOfTests = srcObj.noOfTests;
		destObj.testerCode = srcObj.testerCode;
		destObj.obtainDate = srcObj.obtainDate;
		destObj.retestFlag = srcObj.retestFlag;
	};
	
	this.validateProperties = function(driverPermitClass) {
		var errors = "";
		if (!driverPermitClass.permitClass.code) {
			errors += "&bull; Please select the Permit Class.<br>";
		}
		if (!driverPermitClass.points) {
			errors += "&bull; Please enter the Points.<br>";
		}
		if (!driverPermitClass.noOfTests) {
			errors += "&bull; Please enter the No. of Tests.<br>";
		}
		if (!driverPermitClass.testerCode) {
			errors += "&bull; Please enter the Tester Code.<br>";
		}
		if (!driverPermitClass.obtainDate) {
			errors += "&bull; Please select the Obtain Date.<br>";
		}
		if (errors.length > 0) {
			errors = errors.substring(0, errors.length - 4);
		}
		return errors;
	};
	
	this.validateBatchProperties = function(dto) {
		var errors = "";
		if(dto.batchUpdate=="Permit Status"){
			if(!dto.statusCode){
				errors +="&bull; Please select the Permit Status.<br>";
			}
			if(!dto.effectiveDate && !dto.effectiveDateRange){
				errors +="&bull; Please select the Effective Date.<br>";
			}
			if(dto.statusCode =="PRMT_DEC"){
				if(!dto.deceasedReferenceNo){
					errors +="&bull; Please enter the Reference No.<br>";
				}
			}
		} else if(dto.batchUpdate == "Issue Date"){
			if(!dto.issueDate){
				errors +="&bull; Please select the Issue Date.<br>";
			}
			
		} else if(dto.batchUpdate == "Add Permit Class"){
			if (!dto.permitClass) {
				errors += "&bull; Please select the Permit Class.<br>";
			}
			if (!dto.points) {
				errors += "&bull; Please enter the Points.<br>";
			}
			if (!dto.noOfTests) {
				errors += "&bull; Please enter the No. of Tests.<br>";
			}
			if (!dto.testerCode) {
				errors += "&bull; Please enter the Tester Code.<br>";
			}
			if (!dto.obtainDate) {
				errors += "&bull; Please select the Obtain Date.<br>";
			}
		}
		if (errors.length > 0) {
			errors = errors.substring(0, errors.length - 4);
		}
		return errors;
	};
	
});