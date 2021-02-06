app.service("DashboardService", function (Restangular) {

	this.getCreditStatus = function(searchCreditDTO) {
		return Restangular.all("dashboard/getCreditStatus").getList(searchCreditDTO);
	};

	this.dismissNotifications = function(notificationIdArr) {
		return Restangular.all("dashboard/dismissNotifications").post(notificationIdArr);
	};
	
	this.getNotifications = function() {
		return Restangular.all("dashboard/getNotifications").getList();
	};
	
	this.getPendingActions = function() {
		return Restangular.all("dashboard/getPendingActions").getList();
	};
	this.getTOResourceOverViewData = function(searchDTO) {
		return Restangular.all("dashboard/getTOResourceOverViewData").getList(searchDTO);
	};
	this.getVehResourceOverViewData = function(searchDTO) {
		return Restangular.all("dashboard/getVehResourceOverViewData").getList(searchDTO);
	};
	this.getResourceOverViewDataInitLoad = function(searchDTO) {
		return Restangular.all("dashboard/getResourceOverViewDataInitLoad").getList(searchDTO);
	};
	
});
