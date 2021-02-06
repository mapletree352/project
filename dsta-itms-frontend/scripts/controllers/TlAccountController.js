app.controller('TlAccountSearchController', function($q, $scope, CommonService, TlAccountService, Constants) {
	if(!$scope.$root.checkAccessRights('showSearchTransportLeaderAccounts')){return;}
	var statusesPromise = CommonService.getStatuses('USER');
	var hubsPromise = CommonService.getHubs();
	var nodesPromise = CommonService.getNodes();
	$scope.searchDTO = { startIndex:0, pageSize:Constants.PAGE_SIZE };
	
	$q.all([ statusesPromise, hubsPromise, nodesPromise ]).then(function(data) {
		$scope.statuses = data[0];
		$scope.hubs = data[1];
		$scope.nodes = data[2];
	});
	
	$scope.paginate = function(tableState) {
		$scope.checkboxes = { all: false, records: {} };
		if (CommonService.initPagination($scope, tableState)) {
			CommonService.setPaginationSearch($scope, tableState);
			var resultPromise = TlAccountService.searchTlAccounts($scope.searchDTO);
			$q.all([ resultPromise ]).then(function(data) {
				CommonService.setPaginationResult($scope, tableState, data);
				if (data[0].records.length === 0) {
					$scope.$root.infoDialog("No result found.");
				}
			});
		}
	};
	
	$scope.search = function() {
		CommonService.resetPagination($scope, 0, Constants.PAGE_SIZE);
		CommonService.search($scope, "id");
	};
	
	$scope.reset = function() {
		CommonService.resetPagination($scope, 0, Constants.PAGE_SIZE);
		$scope.searchDTO = { startIndex:0, pageSize:Constants.PAGE_SIZE };
		$scope.driver = "";
	};
});

app.controller('TlAccountController', function($q, $scope, $stateParams, CommonService, TlAccountService, Constants) {
	if(!$scope.$root.checkAccessRights('showSearchTransportLeaderAccounts')){return;}
	var tlAccountPromise = TlAccountService.getTlAccount($stateParams.id);
	var statusesPromise = CommonService.getStatuses('USER');
	
	$q.all([ tlAccountPromise, statusesPromise ]).then(function(data) {
		$scope.dto = data[0];
		$scope.statuses = data[1];
	});
	
	$scope.update = function() {
		if(($scope.oldPassword === "" || $scope.oldPassword === undefined) && ($scope.newPassword === "" || $scope.newPassword === undefined) && ($scope.confirmNewPassword === "" || $scope.confirmNewPassword === undefined)) {
			$scope.updateDTO = { id:$stateParams.id, loginId:$scope.dto.loginId, statusCode:$scope.dto.statusCode, nodeId:$scope.dto.nodeId };
			
			var resultPromise = TlAccountService.updateTlAccount($scope.updateDTO);
			$q.all([ resultPromise ]).then(function(result) {
				$scope.$root.infoDialog(result[0]);
			});
		} else {
			$scope.passwordDTO = { password:$scope.oldPassword, encodedPassword:$scope.dto.password };
			var validatePasswordPromise = TlAccountService.validatePassword($scope.passwordDTO);
			
			$q.all([ validatePasswordPromise ]).then(function(data) {
				$scope.booleanValidatePassword = data[0];
				
				if (!$scope.booleanValidatePassword) {
					$scope.$root.errorDialog("&bull; Invalid old password.");
				} else {
					var errors = "";
					
					if ($scope.newPassword === "" || $scope.newPassword === undefined) {
						errors += "&bull; Please fill in new password.<br>";
					}
					
					if ($scope.confirmNewPassword === "" || $scope.confirmNewPassword === undefined) {
						errors += "&bull; Please fill in confirm new password.<br>";
					}
					
					if (($scope.newPassword !== "" || $scope.newPassword !== undefined) && ($scope.confirmNewPassword !== "" || $scope.confirmNewPassword !== undefined)) {
						if ($scope.newPassword !== $scope.confirmNewPassword){
							errors += "&bull; New password and confirm new password does not match.";
						}
					}
					
					if (errors.length != 0) {
						$scope.$root.errorDialog(errors);
					} else {
						$scope.updateDTO = { id:$stateParams.id, loginId:$scope.dto.loginId, password:$scope.newPassword, statusCode:$scope.dto.statusCode, nodeId:$scope.dto.nodeId };
						
						var resultPromise = TlAccountService.updateTlAccount($scope.updateDTO);
						$q.all([ resultPromise ]).then(function(result) {
							$scope.$root.infoDialog(result[0]);
						});
					}
				}
			});
		}
	};
	
	$scope.getAuditLog = function(tableState) {
    	$scope.searchDTO = { startIndex:0, pageSize:Constants.PAGE_SIZE, entityId:$stateParams.id, entity:'TlAccountController' };
    	
    	CommonService.initPagination($scope, tableState);
        CommonService.setPaginationSearch($scope, tableState);
        var auditLogPromise = CommonService.getAuditLog($scope.searchDTO);
        $q.all([ auditLogPromise ]).then(function(data) {
        	CommonService.setPaginationResult($scope, tableState, data);
        	$scope.tableState = tableState;
        });
    }
});

app.controller('TlAccountNewController', function($q, $scope, DriverService, TlAccountService) {
	if(!$scope.$root.checkAccessRights('showNewTransportLeaderAccount')){return;}
	
	$scope.save = function() {
		var errors = "";
		
		if ($scope.driver === undefined || $scope.driver === null) {
			errors += "&bull; Please fill in login ID.<br>";
		}
		
		if ($scope.password !== $scope.confirmPassword){
			errors += "&bull; Password and confirm password does not match.";
		}
		
		if (errors.length != 0) {
			$scope.$root.errorDialog(errors);
		} else {
			var driverPromise = DriverService.getDriver($scope.driver);
			$q.all([ driverPromise ]).then(function(data) {
				$scope.dto = data[0];
				
				$scope.tlAccountDTO= { loginId:$scope.driver, password:$scope.password, nodeId:$scope.dto.ehrNodeId };
				var resultPromise = TlAccountService.saveTlAccount($scope.tlAccountDTO);
				$q.all([ resultPromise ]).then(function(result) {
					$scope.$root.infoDialog(result[0]);
					$scope.reset();
				});
			});
		}
	};
	
	$scope.reset = function() {
		$scope.driver = "";
		$scope.password = "";
		$scope.confirmPassword = "";
	};
});