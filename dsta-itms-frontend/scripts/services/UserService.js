app.service("UserService", function ($q,Restangular) {
		
	this.getAllRole = function(){
		return Restangular.all("user/getAllRole").getList();
	};
	
	this.getFilterRole = function(){
		return Restangular.all("user/getFilterRole").getList();
	};
	
	this.getUserById = function(id) {
		return Restangular.one("user/getUserById/" + id).get();
	};
	
	this.getUserByNric = function(nricNo){
		return Restangular.one("user/getUser/" + nricNo).get();
	};
	
	this.createNewUser = function(userDTO){
		return Restangular.all("user/createNewUser").post(userDTO);
	};
	
	this.updateUser = function(userDTO){
		return Restangular.all("user/updateUser").post(userDTO);
	};

	this.disableUser = function(idArr) {
		return Restangular.all("user/disable").post(idArr);
	};
	
	this.notifyDisableUser = function(idArr) {
		return Restangular.all("user/notifyDisable").post(idArr);
	};
	
	this.extendValidityDate = function(userIdArr){
		return Restangular.all("user/extendValidityDate").post(userIdArr);
	};
	
	this.searchUserAccount = function(searchDTO) {
        return Restangular.one("user/searchUserAccount").get(searchDTO);
	};

	this.getNricName = function(nricName){
		return Restangular.one("user/getNricName/" + nricName).get();
	};
	
	this.createUserRegistration = function(userRegistrationDTO){
		return Restangular.all("user/createUserRegistration").post(userRegistrationDTO);
	};
	
	this.reactivateUserAccount = function(userDTO){
		return Restangular.all("user/reactivateUserAccount").post(userDTO);
	};
	
	this.checkExistUser = function(nricNo){
		return Restangular.one("user/checkExistUser/" + nricNo).get();
	};
	
	this.checkReactivateUser = function(nricNo){
		return Restangular.one("user/checkReactivateUser/" + nricNo).get();
	};
	
	this.searchUserRegistrations = function(searchDTO) {
        return Restangular.one("user/getUserRegistrations").get(searchDTO);
	};
	
	this.submitUserRegistrationApprovals = function(decisionDTOs) {
		return Restangular.all("user/submitUserRegistrationApprovals").post(decisionDTOs);
	};
	
	this.submitUserReactivationApprovals = function(decisionDTOs){
		return Restangular.all("user/submitUserReactivationApprovals").post(decisionDTOs);
	};
	
	this.getUserRegistration = function(nricNo){
		return Restangular.one("user/getUserRegistration/" + nricNo).get();
	};
	
	this.exportUsers = function(searchDTO){
		return Restangular.one("user/exportUsers").withHttpConfig({ responseType:'arraybuffer' }).get(searchDTO);
	};
	
	this.unitEndoseUserRegistration = function(uuid,decision) {
		return Restangular.one("user/unitEndoseUserRegistration/" + uuid + "/" + decision).get();
	};
	
	this.getUserRegistrationByUUID = function(uuid){
		return Restangular.one("user/getUserRegistrationByUUID/"+uuid).get();
	};
	
	this.getHandoverRoles = function(nricNo){
		return Restangular.one("user/getHandoverRoles/"+nricNo).getList();
	};

	
});
