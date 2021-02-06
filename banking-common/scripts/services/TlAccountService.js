app.service("TlAccountService", function(Restangular) {

	this.searchTlAccounts = function(searchDTO) {
		return Restangular.one("tlAccount/searchTlAccounts").get(searchDTO);
	};

	this.getTlAccount = function(id) {
		return Restangular.one("tlAccount/getTlAccount/" + id).get();
	};

	this.saveTlAccount = function(dto) {
		return Restangular.all("tlAccount/saveTlAccount").post(dto);
	};
	
	this.updateTlAccount = function(dto) {
		return Restangular.all("tlAccount/updateTlAccount").post(dto);
	};
	
	this.validatePassword = function(passwordDTO) {
		return Restangular.all("tlAccount/validatePassword").post(passwordDTO);
	}
});