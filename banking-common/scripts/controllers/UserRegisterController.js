app.controller('RegisterController', function($q, $scope, $stateParams, $rootScope, CommonService,UserService) {

	//alert($rootScope.loginId);
	var roleArr = [];
	var rolePromise = UserService.getFilterRole();
	var hubPromise = CommonService.getHubs();
	var nodePromise = CommonService.getNodes();
	var unitPromise = CommonService.getUnits();
	var subunitPromise = CommonService.getSubunits();

	$q.all([rolePromise, hubPromise, nodePromise, unitPromise,subunitPromise]).then(function(data) {
		$scope.roles = data[0];
		$scope.hubs = data[1];
		$scope.nodes = data[2];
		$scope.units = data[3];
		$scope.subunits = data[4];
		
		_.each($scope.roles, function(role){
			roleArr.push(role.category);
		})
	});
	
	$scope.userRegistrationDTO = {};
	$scope.userRegRoles = [];
	$scope.userRegRoles.push({});
	
	$scope.onSelectUser = function($item) {

		var checkExistUser = UserService.checkExistUser($item.code);
		$q.all([checkExistUser]).then(function(isExist){
			var checkUser = isExist[0];
			if(checkUser == true){
				$scope.$root.infoDialog("User account already exists.");
				$scope.user.nricName = "";
				$scope.userNricNo = {};
				$scope.userDetail={};
			}else{
				$scope.userNricNo = $item.code;
				var userUnitAppointmentPromise = CommonService.getUnitAppointment($item.code);
				$q.all([userUnitAppointmentPromise]).then(function(data){
					$scope.userDetail = data[0];
				});
			}
		});
		
		
	};
	
	$scope.onSelectHandOver = function($item) {
		$scope.handOverNricNo = $item.code;
		var handOverUnitAppointmentPromise = CommonService.getUnitAppointment($item.code);
		var handOverUserRolePromise = UserService.getHandoverRoles($item.code);
		$q.all([handOverUnitAppointmentPromise,handOverUserRolePromise]).then(function(data){
			$scope.handOverDetail = data[0];
			if(data[1] != null){
				$scope.userRegRoles = data[1];
				for(var role of $scope.userRegRoles){
					$scope.roleChange(role,false);
				}
			}

		});
	};
	
	$scope.onSelectApprover = function($item) {
		$scope.approverNricNo = $item.code;
		var approverUnitAppointmentPromise = CommonService.getUnitAppointment($item.code);
		$q.all([approverUnitAppointmentPromise]).then(function(data){
			$scope.approverDetail = data[0];
		});
	};
	
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
	
	$scope.addAssignRole = function(){
		$scope.userRegRoles.push({});
	};
	
	$scope.removeAssignRole = function(index){
		$scope.userRegRoles.splice(index,1);
	};
	
	$scope.roleChange = function(userRegRole,isCheck){
		if(roleArr[userRegRole.roleId-1] == "Unit"){
			userRegRole.unit = true;
			userRegRole.subunit = true;
			userRegRole.hub = false;
			userRegRole.node = false;
			userRegRole.hubCode = null;
			userRegRole.nodeId = null;
		}else if(roleArr[userRegRole.roleId-1] == "Hub"){
			userRegRole.unit = false;
			userRegRole.subunit = false;
			userRegRole.hub = true;
			userRegRole.node = false;
			userRegRole.subunitId = null;
			userRegRole.unitCode = null;
			userRegRole.nodeId = null;
		}else if(roleArr[userRegRole.roleId-1] == "Node"){
			userRegRole.unit = false;
			userRegRole.hub = true;
			userRegRole.node = true;
			userRegRole.unitCode = null;
			userRegRole.subunitId = null;
		}else{
			userRegRole.unit = false;
			userRegRole.subunit = false;
			userRegRole.hub = false;
			userRegRole.node = false;
			userRegRole.hubCode = null;
			userRegRole.nodeId = null;
			userRegRole.unitCode = null;
			userRegRole.subunitId = null;
		}
		if(isCheck){
			if(roleArr[userRegRole.roleId-1] == "Unit" && $scope.userDetail != undefined && $scope.userDetail !=null){
				userRegRole.unitCode = $scope.userDetail.unitCode;
			}else if(roleArr[userRegRole.roleId-1] == "Hub" && $scope.userDetail != undefined && $scope.userDetail !=null){
				userRegRole.hubCode = $scope.userDetail.hubCode;
			}else if(roleArr[userRegRole.roleId-1] == "Node" && $scope.userDetail != undefined && $scope.userDetail !=null){
				userRegRole.hubCode = $scope.userDetail.hubCode;
				userRegRole.nodeId = $scope.userDetail.nodeId;
			}
			
		}
	};
	
	$scope.createUserRegistration = function(){
		if($scope.userNricNo != undefined && $scope.userNricNo != null){
			$scope.userRegistrationDTO.userNricNo = $scope.userNricNo;
			$scope.userRegistrationDTO.userUnit = $scope.userDetail.unitName;
			$scope.userRegistrationDTO.userAppointment = $scope.userDetail.appointment;
			$scope.userRegistrationDTO.userServiceStatus = $scope.user.serviceStatus;
			$scope.userRegistrationDTO.userContactNo = $scope.userRegistrationDTO.userContactNo;

		}
		
		if($scope.handOverNricNo!= undefined && $scope.handOverNricNo != null){
			$scope.userRegistrationDTO.handOverUnit = $scope.handOverDetail.unitName;
			$scope.userRegistrationDTO.handOverNricNo = $scope.handOverNricNo;
		}

		if($scope.userRegRoles[0].roleId != null){
			$scope.userRegistrationDTO.userRegistrationRoleDTO = $scope.userRegRoles;
		}else{
			$scope.userRegistrationDTO.userRegistrationRoleDTO = null;
		}
		
		if($scope.approverNricNo != undefined && $scope.approverNricNo != null){
			$scope.userRegistrationDTO.approverNricNo = $scope.approverNricNo;
			$scope.userRegistrationDTO.approverUnit = $scope.approverDetail.unitName;
			$scope.userRegistrationDTO.approverAppointment = $scope.approverDetail.appointment;
		}
		
		var createUserRegistrationPromise = UserService.createUserRegistration($scope.userRegistrationDTO);
		$q.all([createUserRegistrationPromise]).then(function(data) {
			if(data[0]==true){
				window.location.href = "#/registered";
			}else{
				$scope.$root.InfoDialog("User failed to register!");
			}
		});
		
		

	};
	
	$scope.userFilterChange = function(){
		if($scope.user != null && $scope.user!= undefined){
			if($scope.user.nricName == null || $scope.user.nricName == undefined){
				$scope.userDetail=null;
			}
		}
	};
	
	$scope.handoverFilterChange = function() {
		if($scope.userRegistrationDTO != null && $scope.userRegistrationDTO != undefined){
			if($scope.userRegistrationDTO.handOver == null || $scope.userRegistrationDTO.handOver == undefined){
				$scope.handOverDetail = null;
			}
		}
	};
	
	$scope.approverFilterChange = function() {
		if($scope.userRegistrationDTO != null && $scope.userRegistrationDTO != undefined){
			if($scope.userRegistrationDTO.approver == null || $scope.userRegistrationDTO.approver == undefined){
				$scope.approverDetail = null;
			}
		}
	};

});

app.controller('ReactivateController', function($q, $scope, $stateParams,CommonService,UserService) {
	
	var roleArr = [];
	var rolePromise = UserService.getFilterRole();
	var hubPromise = CommonService.getHubs();
	var nodePromise = CommonService.getNodes();
	var unitPromise = CommonService.getUnits();
	
	$q.all([rolePromise, hubPromise, nodePromise, unitPromise]).then(function(data) {
		$scope.roles = data[0];
		$scope.hubs = data[1];
		$scope.nodes = data[2];
		$scope.units = data[3];
	});
	
	$scope.onSelectUser = function($item) {

		var checkReactivateUserPromise = UserService.checkReactivateUser($item.code);
		$q.all([checkReactivateUserPromise]).then(function(isExist){
			var checkUser = isExist[0];
			if(checkUser == true){
				var userPromise = UserService.getUserByNric($item.code);
				$q.all([userPromise]).then(function(data){
					$scope.userRegistration = data[0];
					
					alert("length: " + $scope.user.userRoleDTO.length);
					
					_.each($scope.roles, function(role){
						roleArr.push(role.category);
					});
					
					_.each($scope.userRegistration.userRoleDTO, function(userRoleDto){
						checkRoleChange(userRoleDto);
					});
				});
			}else{
				$scope.$root.infoDialog("Selected user is not inactive. Please check the user status.");
				$scope.userNricNo = "";
				$scope.userRegistration={};
				$scope.user={};
				$scope.roles = [];
			}
		});
		
		
	};
	
	$scope.reactivateUserAccount = function(){
		
		var reactivateUserAccountPromise = UserService.reactivateUserAccount($scope.userRegistration);
		$q.all([reactivateUserAccountPromise]).then(function(data) {
			if(data[0]==true){
				window.location.href = "#/reactivated";
			}else{
				$scope.$root.InfoDialog("User failed to reactivate!");
			}
		});
		
	};
	
	var checkRoleChange = function(userRoleDto){
		if(roleArr[userRoleDto.roleId-1] == "Unit"){
			userRoleDto.unit = true;
			userRoleDto.hub = false;
			userRoleDto.node = false;
			userRoleDto.hubCode = null;
			userRoleDto.nodeId = null;
		}else if(roleArr[userRoleDto.roleId-1] == "Hub"){
			userRoleDto.unit = false;
			userRoleDto.hub = true;
			userRoleDto.node = false;
			userRoleDto.unitCode = null;
			userRoleDto.nodeId = null;
		}else if(roleArr[userRoleDto.roleId-1] == "Node"){
			userRoleDto.unit = false;
			userRoleDto.hub = true;
			userRoleDto.node = true;
			userRoleDto.unitCode = null;
		}else{
			userRoleDto.unit = false;
			userRoleDto.hub = false;
			userRoleDto.node = false;
			userRoleDto.hubCode = null;
			userRoleDto.nodeId = null;
			userRoleDto.unitCode = null;
		}
	}
	
});


app.controller('UpdateController', function($q, $scope, $stateParams,CommonService,UserService) {
	
	$scope.userRegistrationDTO;
	var roleArr = [];
	var rolePromise = UserService.getFilterRole();
	var hubPromise = CommonService.getHubs();
	var nodePromise = CommonService.getNodes();
	var unitPromise = CommonService.getUnits();
	var userPromise = UserService.getUserById($stateParams.personId);
	
	$q.all([rolePromise, hubPromise, nodePromise, unitPromise, userPromise]).then(function(data) {
		$scope.roles = data[0];
		$scope.hubs = data[1];
		$scope.nodes = data[2];
		$scope.units = data[3];
		$scope.user = data[4];
		
		_.each($scope.roles, function(role){
			roleArr.push(role.category);
		});
		
		_.each($scope.user.userRoleDTO, function(userRoleDto){
			checkRoleChange(userRoleDto);
		});
	});
	
	$scope.onSelectHandOver = function($item) {
		$scope.handOverNricNo = $item.code;
		var handOverUnitAppointmentPromise = CommonService.getUnitAppointment($item.code);
		$q.all([handOverUnitAppointmentPromise]).then(function(data){
			$scope.handOverDetail = data[0];
		});
	};
	
	$scope.onSelectApprover = function($item) {
		$scope.approverNricNo = $item.code;
		var approverUnitAppointmentPromise = CommonService.getUnitAppointment($item.code);
		$q.all([approverUnitAppointmentPromise]).then(function(data){
			$scope.approverDetail = data[0];
		});
	};
	
	$scope.nodeFilter = function(roleHub) {
		if (roleHub) {
			return function(node) {
				return node.type === roleHub;
			}
		} else {
			return true;
		}
	};
	
	$scope.addAssignRole = function(){
		$scope.user.userRoleDTO.push({});
	};
	
	$scope.removeAssignRole = function(index){
		$scope.user.userRoleDTO.splice(index,1);
	};
	
	var checkRoleChange = function(userRoleDto){
		if(roleArr[userRoleDto.roleId-1] == "Unit"){
			userRoleDto.unit = true;
			userRoleDto.hub = false;
			userRoleDto.node = false;
			userRoleDto.hubCode = null;
			userRoleDto.nodeId = null;
		}else if(roleArr[userRoleDto.roleId-1] == "Hub"){
			userRoleDto.unit = false;
			userRoleDto.hub = true;
			userRoleDto.node = false;
			userRoleDto.unitCode = null;
			userRoleDto.nodeId = null;
		}else if(roleArr[userRoleDto.roleId-1] == "Node"){
			userRoleDto.unit = false;
			userRoleDto.hub = true;
			userRoleDto.node = true;
			userRoleDto.unitCode = null;
		}else{
			userRoleDto.unit = false;
			userRoleDto.hub = false;
			userRoleDto.node = false;
			userRoleDto.hubCode = null;
			userRoleDto.nodeId = null;
			userRoleDto.unitCode = null;
		}
	}
	
	$scope.roleChange = function(userRoleDto){
		checkRoleChange(userRoleDto);
	};
	
	$scope.updateUserAccount = function(){
		
		$scope.userRegistrationDTO.user = $scope.user.person;
		$scope.userRegistrationDTO.userNricNo = $scope.user.loginId;
		$scope.userRegistrationDTO.userName = $scope.user.name;
		$scope.userRegistrationDTO.userUnit = $scope.user.unit;
		$scope.userRegistrationDTO.userAppointment = $scope.user.appointment;
		$scope.userRegistrationDTO.userServiceStatus = $scope.user.sericeStatus;
		$scope.userRegistrationDTO.userContactNo = $scope.user.userContactNo;
		
		$scope.userRegistrationDTO.handOverNricNo = $scope.handOverNricNo;
		$scope.userRegistrationDTO.handOverUnit = $scope.handOverDetail.unit;

		$scope.userRegistrationDTO.userRegistrationRoleDTO = $scope.user.userRoleDTO;

		$scope.userRegistrationDTO.approverNricNo = $scope.approverNricNo;
		$scope.userRegistrationDTO.approverUnit = $scope.approverDetail.unit;
		$scope.userRegistrationDTO.approverAppointment = $scope.approverDetail.appointment;

		var updateUserAccountPromise = UserService.createUserRegistration($scope.userRegistrationDTO);
		$q.all([updateUserAccountPromise]).then(function(data) {
			if(data[0]==true){
				window.location.href = "#/updated";
			}else{
				$scope.$root.InfoDialog("User failed to update!");
			}
		});

	};
	
});

app.controller('EndorsementController', function($q, $scope, $stateParams,CommonService,UserService,Constants) {

	var userRegistrationPromise = UserService.getUserRegistrationByUUID($stateParams.uuid);
	
	$q.all([userRegistrationPromise]).then(function(data) {
		$scope.userName = data[0];
		if($scope.userName === null){
			$scope.$root.errorDialog("No such user registration found.");
		}else{
			var content = "Do you wish to endorse the following user: ";
			content += $scope.userName;
			$scope.content = content;
			$('#userEndorseModal').modal({ backdrop:'static' });
			//$scope.$root.confirmDialog(content,$scope.confirmEndorsement,$stateParams.uuid);
		}
	});
	
	$scope.confirmApprove = function(){
		var content = "Are you sure you want to endorse this user?";
		$scope.$root.confirmDialog(content,$scope.confirmEndorsement,Constants.DECISION_YES);
	};
	
	$scope.confirmReject = function(){
		var content = "Are you sure you want to reject this user?";
		$scope.$root.confirmDialog(content,$scope.confirmEndorsement,Constants.DECISION_NO);
	};
	
	$scope.confirmEndorsement = function(decision){
		var endorseUserRegistrationPromise = UserService.unitEndoseUserRegistration($stateParams.uuid,decision);
		$q.all([endorseUserRegistrationPromise]).then(function(data) {
			$scope.$root.infoDialog(data[0]);
		});
	};
	
});

