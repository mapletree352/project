app.controller('UserCreateController', function($q, $scope, UserService, CommonService, Constants) {
	if(!$scope.$root.checkAccessRights('showNewUser')){return;}
	var roleArr = [];
	var rolePromise = UserService.getAllRole();
	var hubPromise = CommonService.getHubs();
	var nodePromise = CommonService.getNodes();
	var unitPromise = CommonService.getUnits();
	var validDatePromise = CommonService.getValidDates();
	var subunitPromise = CommonService.getSubunits();
	var statusPromise  = CommonService.getStatuses(Constants.STATUS_USER);
	
	$q.all([rolePromise,hubPromise,nodePromise,unitPromise,validDatePromise,subunitPromise,statusPromise]).then(function(data) {
		$scope.roles = data[0];
		$scope.hubs = data[1];
		$scope.nodes = data[2];
		$scope.units = data[3];
		$scope.validDates = data[4];
		$scope.subunits = data[5];
		$scope.statuses = data[6];
		
		_.each($scope.roles, function(role){
			roleArr.push(role.category);
		});
	});
	
	$scope.user;
	$scope.userRoleDTOs = [];
	$scope.userDetails={};
	
	$scope.nodeFilter = function(roleHub) {
		if (roleHub) {
			return function(node) {
				return node.type === roleHub;
			}
		} else {
			return true;
		}
	};
	
	$scope.subunitFilter = function(roleUnit) {
		if (roleUnit) {
			return function(subunit) {
				return subunit.type === roleUnit;
			}
		} else {
			return true;
		}
	};
	
	$scope.onSelectUser = function($item) {

		var checkExistUser = UserService.checkExistUser($item.code);
		$q.all([checkExistUser]).then(function(isExist){
			var checkUser = isExist[0];
			if(checkUser == true){
				$scope.$root.infoDialog("User account already exists.");
				$scope.user.nricName = "";
				$scope.userDetails={};
				$scope.userRoleDTOs = [];
			}else{
				$scope.user.loginId = $item.code;
				var unitAppointmentPromise = CommonService.getUnitAppointment($item.code);
				$q.all([unitAppointmentPromise]).then(function(data){
					$scope.userDetails =data[0];
				});
				$scope.userRoleDTOs = [];
				$scope.userRoleDTOs.push({});
			}
		});
	};

	$scope.addAssignRole = function() {
		$scope.userRoleDTOs.push({});
	};
	  
	$scope.removeAssignRole = function(index) {
		$scope.userRoleDTOs.splice(index, 1);
	};

	$scope.createUser = function(){
		
		if ($scope.user === null || $scope.user === window.undefined){
			$scope.$root.errorDialog("Please enter user name or nric.");
		}else if($scope.user.nricName === null || $scope.user.nricName === window.undefined){
			$scope.$root.errorDialog("Please enter user name or nric.");
		}else{
			var userRole = new Object();
			var userRoleArr = [];
			if($scope.userDetails!=null){
				$scope.user.unit = $scope.userDetails.unitCode;
				$scope.user.appointment = $scope.userDetails.appointment;
			}
			$scope.user.userRoleDTO = $scope.userRoleDTOs;
			
			$scope.$root.confirmDialog("Do you want to proceed to create user account for " + $scope.user.nricName + " ?",$scope.confirmCreateUser,$scope.user);
		}
		
	};
	
	$scope.confirmCreateUser = function(user){
		var createNewUserPromise = UserService.createNewUser(user);
		$q.all([createNewUserPromise]).then(function(data) {
			$scope.$root.infoDialog(data[0]);
			$scope.user = {};
			$scope.userDetails = {};
			$scope.userRoleDTOs = [];
		});
	}
	
	$scope.cancelUser = function() {
		$scope.user = {};
		$scope.userDetails = {};
		$scope.userRoleDTOs = [];
	};
	
	$scope.roleChange = function(userRoleDto){
		if(roleArr[userRoleDto.roleId-1] == "Unit"){
			userRoleDto.unit = true;
			userRoleDto.subunit = true;
			userRoleDto.hub = false;
			userRoleDto.node = false;
			userRoleDto.hubCode = null;
			userRoleDto.nodeId = null;
		}else if(roleArr[userRoleDto.roleId-1] == "Hub"){
			userRoleDto.unit = false;
			userRoleDto.subunit = false;
			userRoleDto.hub = true;
			userRoleDto.node = false;
			userRoleDto.unitCode = null;
			userRoleDto.subunitId = null;
			userRoleDto.nodeId = null;
		}else if(roleArr[userRoleDto.roleId-1] == "Node"){
			userRoleDto.unit = false;
			userRoleDto.subunit = false;
			userRoleDto.hub = true;
			userRoleDto.node = true;
			userRoleDto.unitCode = null;
			userRoleDto.subunitId = null;
		}else{
			userRoleDto.unit = false;
			userRoleDto.subunit = false;
			userRoleDto.hub = false;
			userRoleDto.node = false;
			userRoleDto.hubCode = null;
			userRoleDto.nodeId = null;
			userRoleDto.unitCode = null;
			userRoleDto.subunitId = null;
		}
	};

});

app.controller('UserSearchController', function($q, $scope, UserService, CommonService, Constants) {
	if(!$scope.$root.checkAccessRights('showSearchUsers')){return;}
	$scope.advSearchCollapsed = true;
	var rolePromise = CommonService.getRoles();
	var hubPromise = CommonService.getHubs();
	var nodePromise = CommonService.getNodes();
	var unitPromise = CommonService.getUnits();
	var statusPromise = CommonService.getStatuses('USER');
	var validDatePromise = CommonService.getValidDates();
	
	$scope.checkboxes = { all: false, records: {} };
	$scope.searchDTO = { startIndex:0, pageSize:Constants.PAGE_SIZE };
	
	$q.all([hubPromise,nodePromise,unitPromise,statusPromise,validDatePromise,rolePromise]).then(function(data) {
		$scope.hubs = data[0];
		$scope.nodes = data[1];
		$scope.units = data[2];
		$scope.statuses = data[3];
		$scope.validDates = data[4];
		$scope.roles = data[5];
	});
	
	$scope.checkAll = function() {
		_.each($scope.records, function(record) {
			$scope.checkboxes.records[record.id] = $scope.checkboxes.all;
		});
	};
	
	$scope.filterNodes = function(roleHub) {
		if (roleHub) {
			return function(node) {
				return node.type === roleHub;
			}
		} else {
			return true;
		}
	};

    $scope.disableClick = function(){
    	$scope.selectedUserArray = [];
    	_.each($scope.records, function(record){
    		if (!!$scope.checkboxes.records[record.id]){
    			$scope.selectedUserArray.push(record.id);
    		}	
    	});
    	$scope.$root.confirmDialog("Do you want to disable the selected user account ?",$scope.confirmDisableClick,$scope.selectedUserArray);
    };
    
    $scope.confirmDisableClick = function(selectedUser){
    	var disablePromise = UserService.disableUser(selectedUser);

    	$q.all([disablePromise]).then(function(message) {
    	$scope.paginate($scope.tableState);
    	$scope.$root.infoDialog(message[0]);
    	});
    };
    
    $scope.notifyDisableClick = function(){
    	$scope.selectedUserArray = [];
    	_.each($scope.records, function(record){
    		if (!!$scope.checkboxes.records[record.id]){
    			$scope.selectedUserArray.push(record.id);
    		}	
    	});
    	$scope.$root.confirmDialog("Are you sure you want to notify the selected user accounts that you will be disabling their accounts ?",$scope.confirmNotifyDisableClick,$scope.selectedUserArray);
    };
    
    $scope.confirmNotifyDisableClick = function(selectedUser){
    	var notifyDisablePromise = UserService.notifyDisableUser(selectedUser);

    	$q.all([notifyDisablePromise]).then(function(message) {
    	$scope.paginate($scope.tableState);
    	$scope.$root.infoDialog(message[0]);
    	});
    }
    
    $scope.updateValidityDate = function(tableState){
    	$scope.selectedUserArray = [];
    	_.each($scope.records, function(record){
    		if (!!$scope.checkboxes.records[record.id]){
    			$scope.selectedUserArray.push(record.id);
    		};	
    	});
    	
    	var userExtendValidDateDTO = new Object();
    	userExtendValidDateDTO.userId = $scope.selectedUserArray;
    	userExtendValidDateDTO.validExtendDate = $scope.validityEndDate;
    	var extendValidityDatePromise = UserService.extendValidityDate(userExtendValidDateDTO);

    	$q.all([extendValidityDatePromise]).then(function(message) {
    		$scope.$root.infoDialog(message[0]);
    		$scope.paginate($scope.tableState);
    	});

	};
    
    $scope.search = function() {
		CommonService.resetPagination($scope, 0, Constants.PAGE_SIZE);
		$scope.paginate($scope.tableState);
	};
    
    $scope.reset = function() {
    	$scope.searchDTO = {};
    	$scope.user = [];
		CommonService.resetPagination($scope, 0, Constants.PAGE_SIZE);
		$scope.searchDTO = { startIndex:0, pageSize:Constants.PAGE_SIZE };
	};

	$scope.paginate = function(tableState) {
		$scope.checkboxes = { all: false, records: {} };
		if (CommonService.initPagination($scope, tableState)) {
			CommonService.setPaginationSearch($scope, tableState);
			var resultPromise = UserService.searchUserAccount($scope.searchDTO);
			$q.all([ resultPromise ]).then(function(data) {
				CommonService.setPaginationResult($scope, tableState, data);
				 $scope.persons = data[0];
				 if (data[0].records.length === 0) {
					$scope.$root.infoDialog("No result found.");
				}
			});
		}
	};
	
	$scope.download = function() {
		var resultPromise = UserService.exportUsers($scope.searchDTO);
		$q.all([ resultPromise ]).then(function(data) {
			$scope.$root.exportFile(data[0], "text/plain", "users.xlsx");
		});
	};

});

app.controller('UserController', function($q, $scope, $stateParams, $rootScope, CommonService,UserService, Constants) {
	if(!$scope.$root.checkAccessRights('showSearchUsers')){return;}
	var roleArr = [];
	var userPromise = UserService.getUserById($stateParams.personId);
	var validDatePromise = CommonService.getValidDates();
	var rolePromise = UserService.getAllRole();
	var hubPromise = CommonService.getHubs();
	var nodePromise = CommonService.getNodes();
	var unitPromise = CommonService.getUnits();
	var subunitPromise = CommonService.getSubunits();
	var statusPromise  = CommonService.getStatuses(Constants.STATUS_USER);
	$q.all([userPromise, validDatePromise, rolePromise, hubPromise, nodePromise, unitPromise, subunitPromise, statusPromise]).then(function(data) {
		$scope.user = data[0];
		$scope.validDates = data[1];
		$scope.roles = data[2];
		$scope.hubs = data[3];
		$scope.nodes = data[4];
		$scope.units = data[5];
		$scope.subunits = data[6];
		$scope.statuses = data[7];
		_.each($scope.roles, function(role){
			roleArr.push(role.category);
		});
		
		_.each($scope.user.userRoleDTO, function(userRoleDto){
			checkRoleChange(userRoleDto);
		});
		
		var isExist = false;
		if($scope.user.validityEndDate != null){
			_.each($scope.validDates, function (validDate){
				if(validDate.validDate == $scope.user.validityEndDate){
					isExist = true;
				}
			});
			if(!isExist){
				var validDates = new Object();
				validDates.validDate = $scope.user.validityEndDate;
				$scope.validDates.push(validDates);
			}
		}
		
	});
	
	$scope.nodeFilter = function(roleHub) {
		if (roleHub) {
			return function(node) {
				return node.type === roleHub;
			}
		} else {
			return true;
		}
	};
	
	$scope.subunitFilter = function(roleUnit) {
		if (roleUnit) {
			return function(subunit) {
				return subunit.type === roleUnit;
			}
		} else {
			return true;
		}
	};
	
	$scope.cancelUser = function(){
		var userPromise = UserService.getUserById($stateParams.personId);
		$q.all([userPromise]).then(function(data) {
			$scope.user = data[0];
		});
	};

	$scope.removeAssignRole = function(index){
			$scope.user.userRoleDTO.splice(index,1);
	};
	
	$scope.addAssignRole = function(){
		$scope.user.userRoleDTO.push({});
	};

	$scope.updateUser = function(user){
		$scope.$root.confirmDialog("Do you want to proceed to save the user details ?",$scope.confirmUpdateUser,user);
	};
	
	$scope.confirmUpdateUser = function(user){
		var updateUserPromise = UserService.updateUser(user);
		$q.all([updateUserPromise]).then(function(data) {
			$scope.$root.infoDialog(data[0]);
			var userPromise = UserService.getUserById($stateParams.personId);
			$q.all([userPromise]).then(function(data) {
				$scope.user = data[0];
			});
		});
	};
	
	var checkRoleChange = function(userRoleDto){
		if(roleArr[userRoleDto.roleId-1] == "Unit"){
			userRoleDto.unit = true;
			userRoleDto.subunit = true;
			userRoleDto.hub = false;
			userRoleDto.node = false;
			userRoleDto.hubCode = null;
			userRoleDto.nodeId = null;
		}else if(roleArr[userRoleDto.roleId-1] == "Hub"){
			userRoleDto.unit = false;
			userRoleDto.subunit = false;
			userRoleDto.hub = true;
			userRoleDto.node = false;
			userRoleDto.unitCode = null;
			userRoleDto.subunitId = null;
			userRoleDto.nodeId = null;
		}else if(roleArr[userRoleDto.roleId-1] == "Node"){
			userRoleDto.unit = false;
			userRoleDto.subunit = false;
			userRoleDto.hub = true;
			userRoleDto.node = true;
			userRoleDto.unitCode = null;
			userRoleDto.subunitId = null;
		}else{
			userRoleDto.unit = false;
			userRoleDto.subunit = false;
			userRoleDto.hub = false;
			userRoleDto.node = false;
			userRoleDto.hubCode = null;
			userRoleDto.nodeId = null;
			userRoleDto.unitCode = null;
			userRoleDto.subunitId = null;
		}
	};
	$scope.roleChange = function(userRoleDto){
		checkRoleChange(userRoleDto);
	};
	
	$scope.getAuditLog = function(tableState) {
    	$scope.searchDTO = { startIndex:0, pageSize:Constants.PAGE_SIZE, entityId:$scope.user.id, entity:'UserController' };
    	
    	CommonService.initPagination($scope, tableState);
        CommonService.setPaginationSearch($scope, tableState);
        var auditLogPromise = CommonService.getAuditLog($scope.searchDTO);
        $q.all([ auditLogPromise ]).then(function(data) {
        	CommonService.setPaginationResult($scope, tableState, data);
        	$scope.tableState = tableState;
        });
    }
});

app.controller('UserRegistrationApprovalController', function($q, $scope, $stateParams,Constants, CommonService,UserService) {
	if(!$scope.$root.checkAccessRights('showUserRegistrationApproval')){return;}
	//Need to indicate who load the page. the hub controller or sa. 
	$scope.decisions = [];
	$scope.roleDecisions = [];
	$scope.searchDTO = { startIndex:0, pageSize:Constants.PAGE_SIZE, order:'asc', orderProperty:'createDate', statusCode1:Constants.USER_PENDINGUNIT, statusCode2:Constants.USER_PENDINGHUB, statusCode3:Constants.USER_PENDINGSA };
	var firstLoad = true;
		
	$scope.paginate = function(tableState) {
		if (CommonService.initPagination($scope, tableState)) {
			CommonService.setPaginationSearch($scope, tableState);
			var resultPromise = UserService.searchUserRegistrations($scope.searchDTO);
			$q.all([ resultPromise ]).then(function(data) {
				CommonService.setPaginationResult($scope, tableState, data);
				_.each(data[0].records, function(record) {
					$scope.decisions[record.id] = { id: record.id, decision:'UNDECIDED', decisionReason:'', subDecisions:null};
				});
				if ($scope.records.length === 0 && firstLoad) {
					$scope.$root.infoDialog("No result found.");
				}
			});	
		}
	};
	
	$scope.search = function() {
		CommonService.resetPagination($scope, 0, Constants.PAGE_SIZE);
		CommonService.search($scope, "userNricNo");
	};
	
	// to be improved into decideButton directive
	$scope.decideAll = function(allDecision) {
		_.each($scope.records, function(record) {
			$scope.decisions[record.id].decision = allDecision;
		});
	};
	
	$scope.submit = function(tableState){
		var confirmedDecisions = [];
		var userRoleDecisions = [];
		_.each($scope.records, function(record){
			if($scope.decisions[record.id].decision !='NO') {
				$scope.decisions[record.id].decisionReason = '';
			}
			if($scope.decisions[record.id].decision != 'UNDECIDED'){
				userRoleDecisions=[];
				_.each(record.userRegistrationRoleDTO, function(roleRecord){
					$scope.roleDecisions[roleRecord.id].id = roleRecord.id;
					if($scope.roleDecisions[roleRecord.id].decision == 'YES'){
						$scope.roleDecisions[roleRecord.id].decisionReason = '';
					}
					userRoleDecisions.push($scope.roleDecisions[roleRecord.id]);
				});				
				$scope.decisions[record.id].subDecisions = userRoleDecisions;
				confirmedDecisions.push($scope.decisions[record.id]);
			}
		});
		var submitUserRegistrationPromise = UserService.submitUserRegistrationApprovals(confirmedDecisions);
		$q.all([submitUserRegistrationPromise]).then(function(data){
			$scope.$root.infoDialog(data[0]);
			$scope.decisions = [];
			$scope.count = 0;
			$('[dcBtnName|="all"]').removeClass('active btn-success btn-danger btn-warning').addClass('btn-default');	
			$scope.search();
		});
	};
	
	$scope.$watch('tableState', function() {
		if ($scope.tableState) {
			$scope.search();
			firstLoad = false;
		}
    });
});

app.controller('UserReactivationApprovalController', function($q, $scope, $stateParams,Constants, CommonService,UserService) {
	if(!$scope.$root.checkAccessRights('showUserReactivationApproval')){return;}
	$scope.decisions = [];
	$scope.searchDTO = { startIndex:0, pageSize:Constants.PAGE_SIZE, order:'asc', orderProperty:'updateDate', statusCode:Constants.USER_INACTIVE, reactivation:Constants.USER_REACTIVTION };
	var firstLoad = true;
		
	$scope.paginate = function(tableState) {
		if (CommonService.initPagination($scope, tableState)) {
			CommonService.setPaginationSearch($scope, tableState);
			var resultPromise = UserService.searchUserAccount($scope.searchDTO);
			$q.all([ resultPromise ]).then(function(data) {
				CommonService.setPaginationResult($scope, tableState, data);
				_.each(data[0].records, function(record) {
					$scope.decisions[record.id] = { id: record.id, decision:'UNDECIDED', decisionReason:''};
				});
				if ($scope.records.length === 0 && firstLoad) {
					$scope.$root.infoDialog("No result found.");
				}
			});	
		}
	};
	
	$scope.search = function() {
		CommonService.resetPagination($scope, 0, Constants.PAGE_SIZE);
		CommonService.search($scope, "loginId");
	};
	
	// to be improved into decideButton directive
	$scope.decideAll = function(allDecision) {
		_.each($scope.records, function(record) {
			$scope.decisions[record.id].decision = allDecision;
		});
	};
	
	$scope.submit = function(tableState){
		var confirmedDecisions = [];
		_.each($scope.records, function(record){
			if($scope.decisions[record.id].decision !='NO') {
				$scope.decisions[record.id].decisionReason = '';
			}
			if($scope.decisions[record.id].decision != 'UNDECIDED'){
				confirmedDecisions.push($scope.decisions[record.id]);
			}
		});
		var submitUserReactivationPromise = UserService.submitUserReactivationApprovals(confirmedDecisions);
		$q.all([submitUserReactivationPromise]).then(function(data){
			$scope.$root.infoDialog(data[0]);
			$scope.decisions = [];
			$scope.count = 0;
			$('[dcBtnName|="all"]').removeClass('active btn-success btn-danger btn-warning').addClass('btn-default');	
			$scope.search();
		});
	};	
	
	$scope.$watch('tableState', function() {
		if ($scope.tableState) {
			$scope.search();
			firstLoad = false;
		}
    });
});

