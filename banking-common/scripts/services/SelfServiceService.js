app.service("SelfServiceService", function (Restangular) {
	
	this.login = function(sessionDTO) {
		return Restangular.all("selfService/login").post(sessionDTO);
	};
	
	this.getDriverTask = function(nricNo){
		return Restangular.all("selfService/getDriverTask/" + nricNo).getList();
	};
	
	this.bookOutTask = function(taskDetailsConfirmBookInOutDTO){
		return Restangular.all("selfService/bookOutTask").post(taskDetailsConfirmBookInOutDTO);
	};
	
	this.switchTask = function(taskDetailsConfirmBookInOutDTO){
		return Restangular.all("selfService/switchTask").post(taskDetailsConfirmBookInOutDTO);
	};
	
	this.bookinTask = function(taskDetailsConfirmBookInOutDTO){
		return Restangular.all("selfService/bookInTask").post(taskDetailsConfirmBookInOutDTO);
	};
	
	this.getPendingConfirmations = function(nricNo){
		return Restangular.all("selfService/getPendingConfirmations/" + nricNo).getList();
	};
	
	this.getTaskCalendars = function(taskCalendarDTOs){
		return Restangular.all("selfService/getTaskCalendars").post(taskCalendarDTOs);
	};
	
	this.getTaskDetail = function(taskDetailId){
		return Restangular.one("selfService/getTaskDetail/" + taskDetailId).get();
	};
	
	this.searchTaskDetails = function(searchDTO) {
        return Restangular.one("selfService/searchTaskDetails").get(searchDTO);
	};
	
	this.mtMaintBookOut = function(mtMaintBookOutDTO) {
		return Restangular.all("selfService/mtMaintBookOut").post(mtMaintBookOutDTO);
	};
	
	this.getDriverDetail = function(nricNo){
		return Restangular.one("selfService/getDriverDetail/" + nricNo).get();
	};
	
	this.exportDetailSheet = function(searchDTO) {
		return Restangular.one("selfService/exportDetailSheet").withHttpConfig({ responseType:'arraybuffer' }).get(searchDTO);
	};
	
});
