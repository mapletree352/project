app.service("SystemService", function ($q,Restangular) {
	//implementation
	
	this.saveRoleFunctions = function(roleFunctionDTOs){
		return Restangular.all("system/saveRoleFunctions").post(roleFunctionDTOs);
	};
	
	this.getRoleFunctions = function(){
		return Restangular.all("system/getRoleFunctions").getList(); 
	};
	
	this.getModules = function(){
		return Restangular.all("system/getModules").getList();
	};

	this.getNotificationTypes = function(){
		return Restangular.all("system/getManageNotifications").getList();
	};
	
	this.getNotificationModules = function(){
		return Restangular.all("system/getNotificationModules").getList();
	};
	
	this.saveNotificationTypes = function(notificationTypeDTO){
		return Restangular.all("system/saveNotificationTypes").post(notificationTypeDTO);
	};
	
	this.getSystemParameters = function() {
		return Restangular.all("system/getSystemParameters").getList();
	};
	
	this.getSystemCategories = function() {
		return Restangular.all("system/getSystemCategories").getList();
	};
	
	this.getActivities = function(activityCode){
		return Restangular.all("system/getActivities/" + activityCode).getList();
	};
	
	this.getRewardTypes = function() {
		return Restangular.all("system/getRewardTypes").getList();
	};
	
	this.saveDoubleBookOut = function(activityDTOs) {
		return Restangular.all("system/saveDoubleBookOut").post(activityDTOs);
	};
	
	this.saveRewardType = function(rewardTypeDTOs) {
		return Restangular.all("system/saveRewardType").post(rewardTypeDTOs);
	};
	
	this.saveActivity = function(activityDTOs){
		return Restangular.all("system/saveActivity").post(activityDTOs);
	};
	
	this.saveSystemParameter = function(systemParameterDTO){
		return Restangular.all("system/saveSystemParameter").post(systemParameterDTO);
	};
	
	this.getSupportStructures = function(){
		return Restangular.all("system/getSupportStructures").getList();
	};
	
	this.saveSupportStructure = function(supportStructureDTOs){
		return Restangular.all("system/saveSupportStructure").post(supportStructureDTOs);
	};
	
	this.getOffences = function(){
		return Restangular.all("system/getOffences").getList();
	};
	
	this.getOffenceTypes = function(){
		return Restangular.all("system/getOffenceTypes").getList();
	};
	
	this.getProficiencies = function(){
		return Restangular.all("system/getProficiencies").getList();
	};
	
	this.getTowTypes = function(){
		return Restangular.all("system/getTowTypes").getList();
	};
	
	this.getReasons = function(){
		return Restangular.all("system/getReasons").getList();
	};
	
	this.getVenues = function(){
		return Restangular.all("system/getVenues").getList();
	};
	
	this.getPermitTypes = function(){
		return Restangular.all("system/getPermitTypes").getList();
	};
	
	this.getPermitClasses = function(){
		return Restangular.all("system/getPermitClasses").getList();
	};
	
	this.getPurposes = function(){
		return Restangular.all("system/getPurposes").getList();
	};
	
	this.getDrivingCategories = function(){
		return Restangular.all("system/getDrivingCategories").getList();
	};
	
	this.saveUpdateVehiclePurpose = function(purposeDTO){
		return Restangular.all("system/saveUpdateVehiclePurpose").post(purposeDTO);
	};
	
	this.saveUpdateTowType = function(towTypeDTO){
		return Restangular.all("system/saveUpdateTowType").post(towTypeDTO);
	};
	
	this.saveUpdateProficiency = function(proficiencyDTO){
		return Restangular.all("system/saveUpdateProficiency").post(proficiencyDTO);
	};
	
	this.saveUpdatePermitType = function(permitTypeDTO){
		return Restangular.all("system/saveUpdatePermitType").post(permitTypeDTO);
	};
	
	this.saveUpdatePermitClass = function(permitClassDTO){
		return Restangular.all("system/saveUpdatePermitClass").post(permitClassDTO);
	};
	
	this.saveUpdateOffenceType = function(offenceTypeDTO){
		return Restangular.all("system/saveUpdateOffenceType").post(offenceTypeDTO);
	};
	
	this.saveUpdateOffence = function(offenceDTO){
		return Restangular.all("system/saveUpdateOffence").post(offenceDTO);
	};
	
	this.saveUpdateDrivingCategory = function(drivingCategoryDTO){
		return Restangular.all("system/saveUpdateDrivingCategory").post(drivingCategoryDTO);
	};
	
	this.saveUpdateVenue = function(venueDTO){
		return Restangular.all("system/saveUpdateVenue").post(venueDTO);
	};
	
	this.deleteMasterData = function(masterDataDeleteDTO){
		return Restangular.all("system/deleteMasterData").post(masterDataDeleteDTO);
	};
	
	this.getSnapShotTypes = function(typeCode){
		return Restangular.all("system/getSnapShotTypes/" + typeCode).getList();
	};
	
	this.getSnapShotRewardType = function(id){
		return Restangular.all("system/getSnapShotRewardType/" + id).getList();
	};
	
	this.getSnapShotDoubleBookOutType = function(id){
		return Restangular.all("system/getSnapShotDoubleBookOutType/" + id).getList();
	};
	
	this.getSnapShotActivityType = function(id){
		return Restangular.all("system/getSnapShotActivityType/" + id).getList();
	};
	
	this.searchPurposeName = function(name) {
		return Restangular.all("system/searchPurposeName/" + name).getList();	
	};
	
	this.searchTowTypeName = function(name) {
		return Restangular.all("system/searchTowTypeName/" + name).getList();
	};
	
	this.searchProficiencyName = function(name){
		return Restangular.all("system/searchProficiencyName/" + name).getList();
	};
	
	this.searchPermitTypeName = function(name){
		return Restangular.all("system/searchPermitTypeName/"+ name).getList();
	};
	
	this.searchPermitTypePrefix = function(prefix){
		return Restangular.all("system/searchPermitTypePrefix/"+prefix).getList();
	};
	
	this.searchOffenceTypeName = function(name){
		return Restangular.all("system/searchOffenceTypeName/"+name).getList();
	};	
	
	this.searchOffenceName = function(name){
		return Restangular.all("system/searchOffenceName/"+name).getList();
	};
	
	this.searchPermitClassName = function(name){
		return Restangular.all("system/searchPermitClassName/"+name).getList();
	};
	
	this.searchPermitClassCode = function(code){
		return Restangular.all("system/searchPermitClassCode/"+code).getList();
	};
	
	this.searchVenueName = function(name){
		return Restangular.all("system/searchVenueName/"+name).getList();
	};
	
	this.searchVenueTypeName = function(name){
		return Restangular.all("system/searchVenueTypeName/"+name).getList();
	};
	
});
