app.service("TaskService", function ($http, Restangular) {
	
	this.searchTasks = function(searchDTO) {
		//alert('REQUEST: ' + JSON.stringify(searchDTO));
        return Restangular.one("task/searchTasks").get(searchDTO);
	};
	
	this.searchTaskDriver = function(searchDTO){
		/*alert('REQUEST: ' + JSON.stringify(searchDTO));*/
        return Restangular.one("task/searchTaskDriver").get(searchDTO);
	};
	
	this.searchTaskVehicle = function(searchDTO){
	/*	alert('REQUEST: ' + JSON.stringify(searchDTO));*/
        return Restangular.one("task/searchTaskVehicle").get(searchDTO);
	}
	
	this.getTask = function(taskId) {
		return Restangular.one("task/getTask/" + taskId).get();
	};
	
	this.confirmBookOutDriver = function(taskConfirmBookInOutDTO) {
		return Restangular.all("task/confirmBookOutDriver").post(taskConfirmBookInOutDTO);
	};
	
	this.confirmBookInDriver = function(taskConfirmBookInOutDTO) {
		return Restangular.all("task/confirmBookInDriver").post(taskConfirmBookInOutDTO);
	};
	
	this.bookInOutTaskDetail = function(taskDetailConfirmBookInOutDTO) {
		return Restangular.all("task/bookInOutTaskDetail").post(taskDetailConfirmBookInOutDTO);
	};
	
	this.switchTask = function(taskDetailConfirmBookInOutDTO){
		return Restangular.all("task/switchTask").post(taskDetailConfirmBookInOutDTO);
	};
	
	this.removeTaskDetails = function(taskDetailIds){
		return Restangular.all("task/removeTaskDetails").post(taskDetailIds);
	};
	
	this.splitDetail = function(taskDetailChangeDTO){
		return Restangular.all("task/splitDetail").post(taskDetailChangeDTO);
	};
	
	this.adjustMileage = function(taskAdjustMileageDTO){
		return Restangular.all("task/adjustMileage").post(taskAdjustMileageDTO);
	};
	
	this.assignDriver = function(taskDetailChangeDTO){
		return Restangular.all("task/assignDriver").post(taskDetailChangeDTO);
	};
	
	this.checkVehicle = function(taskDetailChangeDTO){
		return Restangular.all("task/checkVehicle").post(taskDetailChangeDTO);
	};
	
	this.assignVehicle = function(taskDetailChangeDTO){
		return Restangular.all("task/assignVehicle").post(taskDetailChangeDTO);
	};
	
	this.adjustDetail = function(taskDetailChangeDTO){
		return Restangular.all("task/adjustDetail").post(taskDetailChangeDTO);
	};
	
	this.unassign = function(taskDetailChangeDTO){
		return Restangular.all("task/unassign").post(taskDetailChangeDTO);
	};
	
	this.unassignResources = function(taskIds){
		return Restangular.all("task/unassignResources").post(taskIds);
	};
	
	this.getTotalCredits = function(taskIds){
		return Restangular.all("task/getTotalCredits").post(taskIds);
	};
	
	this.confirmRefundResource = function(taskRefundCreditDTO){
		return Restangular.all("task/confirmRefundResource").post(taskRefundCreditDTO);
	};
	
	this.submitCreditRefundApprovals = function(decisionDTOs){
		return Restangular.all("task/submitCreditRefundApprovals").post(decisionDTOs);
	};
	
	this.confirmBestMatchAssign = function(taskIds){
		return Restangular.all("task/confirmBestMatchAssign").post(taskIds);
	};
	
	this.exportTasks = function(searchDTO){
		return Restangular.one("task/exportTasks").withHttpConfig({ responseType:'arraybuffer' }).get(searchDTO);
	};

	this.searchTaskFulfilmentReport = function(searchDTO) {
		return Restangular.one("task/searchTaskFulfilmentReport").get(searchDTO);
	};
	
	this.exportTaskFulfilmentReport = function(searchDTO) {
		return Restangular.one("task/exportTaskFulfilmentReport").withHttpConfig({ responseType:'arraybuffer' }).get(searchDTO);
	};
	
});
