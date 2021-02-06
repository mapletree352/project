app.service("CreditService", function (Restangular) {
		
	this.saveOrUpdateHqCreditStatus = function(dto) {
		return Restangular.all("credits/saveOrUpdateHqCreditStatus").post(dto);
	}
	
	this.getAllocationsHq = function(workYear) {
		return Restangular.one("credits/getAllocationsHq/" + workYear).get();
	};
	
	this.saveAllocationsHq = function(newDTO) {
		return Restangular.all("credits/saveAllocationsHq").post(newDTO);
	};
		
	this.getAllocationsDivFmn = function(workYear, formationCode) {
		return Restangular.one("credits/getAllocationsDivFmn/" + workYear + "/" + formationCode).get();
	};
	
	this.saveAllocationsDivFmn = function(newDTO) {
		return Restangular.all("credits/saveAllocationsDivFmn").post(newDTO);
	};
	
	this.searchCreditStatuses = function(searchDTO) {
        return Restangular.one("credits/searchCreditStatuses").get(searchDTO);
	};
	
	this.exportCreditStatuses = function(searchDTO) {
        return Restangular.one("credits/exportCreditStatuses").withHttpConfig({ responseType:'arraybuffer' }).get(searchDTO);
	};
	
	this.searchCreditTxns = function(searchDTO) {
		return Restangular.one("credits/searchCreditTxns").get(searchDTO);
	};
	
	this.exportCreditTxns = function(searchDTO) {
        return Restangular.one("credits/exportCreditTxns").withHttpConfig({ responseType:'arraybuffer' }).get(searchDTO);
	};
	
	this.getUnitPenaltyCredits = function(workYear, unitCode) {
        return Restangular.one("credits/getUnitPenaltyCredits/" + workYear + "/" + unitCode).get();
	};
	
	this.returnCredits = function(dto) {
        return Restangular.all("credits/returnCredits").post(dto);
	};
	
	this.searchCreditStatusReport = function(searchDTO) {
		return Restangular.one("credits/searchCreditStatusReport").get(searchDTO);
	};
	
	this.exportCreditStatusReport = function(searchDTO) {
		return Restangular.one("credits/exportCreditStatusReport").withHttpConfig({ responseType:'arraybuffer' }).get(searchDTO);
	};
		
});
