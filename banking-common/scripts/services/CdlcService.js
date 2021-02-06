app.service("CdlcService", function (Restangular) {
	
	this.updateCollectionStatus = function(collectionsDTO) {
		return Restangular.all("cdlc/updateCollectionStatus").post(collectionsDTO);
	};
	
	
	this.getPersonnel = function(nricNo) {
		return Restangular.one("cdlc/getPersonnel/" + nricNo).get();
	};
	
	this.getTpOutCome = function(tpOutcomeId) {
		return Restangular.one("cdlc/getTpOutCome/" + tpOutcomeId).get();
	};
	this.searchUnit = function(codeOrName) {
		
		return Restangular.one("accident/searchUnit/" + codeOrName).get();
	};
	this.saveOrUpdateCdlcConversionTypes = function(cdlcConversionTypesDTO) {
		return Restangular.all("cdlc/saveOrUpdateCdlcConversionTypes").post(cdlcConversionTypesDTO);
	};
	
	this.getDriverDetails = function(nricNo) {
		return Restangular.one("cdlc/getDriverDetails/"+nricNo).get();
	};	
	this.deleteCdlcConversionType = function(cdlcConversionTypesDTO) {
		return Restangular.all("cdlc/deleteCdlcConversionType").post(cdlcConversionTypesDTO);
	};	
	this.saveOrUpdateCdlcConversionTypes = function(cdlcConversionTypesDTO) {
		return Restangular.all("cdlc/saveOrUpdateCdlcConversionTypes").post(cdlcConversionTypesDTO);
	};
	this.getCdlcConversionTypesDTO = function(getcdlcConversionTypesDTO, counter) {
		for (var i = 0; i <  getcdlcConversionTypesDTO.length; i++) {
			if ( getcdlcConversionTypesDTO[i].counterId == counter) {
				return  getcdlcConversionTypesDTO	[i];
			}
		}
		return null;
	};

	this.mapCdlcConversionTypesProperties=function(srcObj, destObj) {
		destObj.id=srcObj.id;
		destObj.name=srcObj.name;
		destObj.rewardId=srcObj.rewardId;
		destObj.rewardName=srcObj.rewardName;

		
		destObj.counterId=srcObj.counterId;
		
	}
	this.getTpScreenOutComeDTO = function(getTpScreenOutComeDTO, counter) {
		for (var i = 0; i <  getTpScreenOutComeDTO.length; i++) {
			if ( getTpScreenOutComeDTO[i].counterId == counter) {
				return  getTpScreenOutComeDTO	[i];
			}
		}
		return null;
	};

	this.mapTpScreenOutProperties=function(srcObj, destObj) {
		destObj.id=srcObj.id;
		destObj.name=srcObj.name;
		destObj.counterId=srcObj.counterId;
		destObj.rewardName=srcObj.rewardName;
	};
	this.updateTpScreenDetails = function(cdlcUpdateDTO) {
		return Restangular.all("cdlc/updateTpScreenDetails").post(cdlcUpdateDTO);
	};
	
	this.saveOrUpdateTpScreenOutcome = function(tpScreenOutcomeDTO) {
		return Restangular.all("cdlc/saveOrUpdateTpScreenOutcome").post(tpScreenOutcomeDTO);
	};
	this.deleteTpScreenOutcome = function(searchDTO) {
		return Restangular.all("cdlc/deleteTpScreenOutcome").post(searchDTO);
	};	
	this.approveOrRejectCdlc=function(decisionDTOs){
		return Restangular.all("cdlc/approveOrRejectCdlc").post(decisionDTOs);
	};
	this.exportCdlcConversion=function(searchDTO) {
        return Restangular.one("cdlc/exportCdlcConversion").withHttpConfig({ responseType:'arraybuffer' }).get(searchDTO);
	};
	this.searchCdlcConversion=function(searchDTO){
		return Restangular.one("cdlc/searchCdlcConversion").get(searchDTO);
	};
	this.searchCDLCs=function(searchDTO){
		return Restangular.one("cdlc/searchCDLCs").get(searchDTO);
	};
	this.getCdlcConversionTypes=function(){
		return Restangular.all("cdlc/getCdlcConversionTypes").getList();
	};
	this.getTpOutcomes=function(){
		return Restangular.all("cdlc/getTpOutcomes").getList();
	};
	
	this.getCDLC = function(id) {
		return Restangular.one("cdlc/getCDLC/" + id).get();
	};
	this.searchUnit = function(codeOrName) {		
		return Restangular.one("cdlc/searchUnit/" + codeOrName).get();
	};
	this.updateCdlcHoldApplication=function(cdlcDTO){
		return Restangular.all("cdlc/updateCdlcHoldApplication").post(cdlcDTO);
	};
	
	this.updateCdlcApproveApplication=function(cdlcDTO){
		return Restangular.all("cdlc/updateCdlcApproveApplication").post(cdlcDTO);
	};
	
	this.updateCdlcUnHoldApplication=function(cdlcDTO){
		return Restangular.all("cdlc/updateCdlcUnHoldApplication").post(cdlcDTO);
	};
	this.updateCdlcRejectApplication=function(cdlcDTO){
		return Restangular.all("cdlc/updateCdlcRejectApplication").post(cdlcDTO);
	};
	
	this.saveUpdateCDLC=function(newCdlcDTO){
		return Restangular.all("cdlc/saveUpdateCDLC").post(newCdlcDTO);
	};
	

	
	this.searchNricNames = function(nricOrName) {
		return Restangular.all("common/searchNricNames/" + nricOrName).getList();
	};
	this.getDriverOffencesDTO = function(getDriverOffencesDTO, counter) {
		for (var i = 0; i <  getDriverOffencesDTO.length; i++) {
			if ( getDriverOffencesDTO[i].counterId == counter) {
				return  getDriverOffencesDTO[i];
			}
		}
		return null;
	};

	this.mapDriverOffencesProperties=function(srcObj, destObj) {
		
		destObj.counterId=srcObj.counterId;
		destObj.type =srcObj.type;
		destObj.offenceOrReductionReason=srcObj.offenceOrReductionReason;
		destObj.issueDate=srcObj.issueDate;
		destObj.issuedBy=srcObj.issuedBy;
		destObj.submitDate=srcObj.submitDate;
		destObj.submittedBy=srcObj.submittedBy;
		destObj.demeritPoints=srcObj.demeritPoints;
		destObj.fineAmt= parseFloat(srcObj.fineAmt).toFixed(2);
		destObj.vehicleType=srcObj.vehicleType;
		destObj.vehicleNo=srcObj.vehicleNo;
		destObj.location=srcObj.location;
		destObj.status=srcObj.status;
		
		
	}
});
