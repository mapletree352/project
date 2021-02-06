app.controller('RoleController', function($q, $scope, $stateParams,CommonService,SystemService) {
	if(!$scope.$root.checkAccessRights('showManageRoles')){return;}
	$scope.checkboxes=[];
	
	var rolePromise = CommonService.getRoles();
	var functionPromise = CommonService.getFunctions();
	var getFunctionRolePromise = SystemService.getRoleFunctions();
	var getModulePromise = SystemService.getModules();
	$q.all([rolePromise,functionPromise,getFunctionRolePromise,getModulePromise]).then(function(data){
		$scope.roles = data[0];
		$scope.tempRoles = data[0];
		$scope.tempFunctions = data[1];
		$scope.functions = data[1];
		$scope.functionRoles = data[2];
		$scope.modules = data[3];
		
		_.each($scope.roles, function(role){
			$scope.checkboxes[role.id] = []; 
			_.each($scope.functions, function(functionDTO){
				$scope.checkboxes[role.id][functionDTO.id] = false;
			});
		});
		
		_.each($scope.functionRoles, function(functionRole){
			_.each(functionRole.functionIds, function(functionId){
				$scope.checkboxes[functionRole.roleId][functionId] = true;
			});
		});

	});
	
	
	$scope.updateModule = function(){
		if($scope.moduleSelected == null) {
			$scope.functions = $scope.tempFunctions
		}else{
			var functionArray = [];
			_.each($scope.tempFunctions, function(dbFunction){
				if(dbFunction.module == $scope.moduleSelected){
					functionArray.push(dbFunction);
				}
			});
			$scope.functions = functionArray;
		}
		
	};

	$scope.updateRole = function(){

		if($scope.roleSelected.length==0){
			$scope.roles = $scope.tempRoles;
		}else{
			var roleArray = [];
			_.each($scope.roleSelected, function(roleId){
				var selectedRole = _.find($scope.tempRoles,function(role){
					if(role.id == roleId){
						return role;
					}
				});
				roleArray.push(selectedRole);
			});
			$scope.roles = roleArray;
		}
	};
	
	$scope.reset = function(){
		
		$scope.moduleSelected = null;
		var getFunctionRolePromise = SystemService.getRoleFunctions();
		var rolePromise = CommonService.getRoles();
		var functionPromise = CommonService.getFunctions();

		$q.all([rolePromise,functionPromise,getFunctionRolePromise]).then(function(data){
			$scope.roles = data[0];
			$scope.functions = data[1];
			$scope.functionRoles = data[2];

			_.each($scope.roles, function(role){
				$scope.checkboxes[role.id] = []; 
				_.each($scope.functions, function(functionDTO){
					$scope.checkboxes[role.id][functionDTO.id] = false;
				});
			});
			
			_.each($scope.functionRoles, function(functionRole){
				_.each(functionRole.functionIds, function(functionId){
					$scope.checkboxes[functionRole.roleId][functionId] = true;
				});
			});

		});
	};
	

	
	$scope.save = function(){
		var roleFunctionDTOs = [];
		var roleFunctionDTO = new Object();
		var confirmFunctions = [];
		
		_.each($scope.tempRoles, function(role){
			roleFunctionDTO = new Object();
			confirmFunctions = [];
			_.each($scope.tempFunctions, function(functionDTO){
				if($scope.checkboxes[role.id][functionDTO.id]==true){
					confirmFunctions.push(functionDTO.id);
				}
			});
			if(confirmFunctions.length != 0){
				roleFunctionDTO.roleId = role.id;
				roleFunctionDTO.functionIds = confirmFunctions;
				roleFunctionDTOs.push(roleFunctionDTO);
			}
		});
		
		$scope.$root.confirmDialog("Do you want to proceed to save the functions to roles ?",$scope.confirmSaveRoles,roleFunctionDTOs);
	};
	
	$scope.confirmSaveRoles = function(roleFunctionDTOs){
		var saveRoleFunctionsPromise = SystemService.saveRoleFunctions(roleFunctionDTOs);
		$q.all([saveRoleFunctionsPromise]).then(function(data){
			$scope.$root.infoDialog(data[0]);
		});
	};
	
});

app.controller('ManageNotificationController', function($q, $scope, $stateParams,CommonService,SystemService) {
	//if(!$scope.$root.checkAccessRights('showManageNotifications')){return;}
	$scope.checkboxesEmail=[];
	$scope.checkboxesDashboard=[];
	$scope.selectedNotification={};
	var notificationTypesPromise = SystemService.getNotificationTypes();
	var notificationModulesPromise = SystemService.getNotificationModules();
	$q.all([notificationTypesPromise,notificationModulesPromise]).then(function(data){
		$scope.notifications = data[0];
		$scope.tempNotifications = data[0];
		$scope.pendingActions = data[0];
		$scope.tempPendingActions = data[0];
		$scope.modules = data[1];
	});
	
	$scope.updateNotificationModule = function(){
		if($scope.notificationModuleSelected == null) {
			$scope.notifications = $scope.tempNotifications;
		}else{
			var notificationArray = [];
			_.each($scope.tempNotifications, function(notification){
				if(notification.module == $scope.notificationModuleSelected){
					notificationArray.push(notification);
				}
			});
			$scope.notifications = notificationArray;
		}
		
	};
	
	$scope.updateActionModule = function(){
		if($scope.actionModuleSelected == null) {
			$scope.pendingActions = $scope.tempPendingActions;
		}else{
			var actionArray = [];
			_.each($scope.tempPendingActions, function(pendingAction){
				if(pendingAction.module == $scope.actionModuleSelected){
					actionArray.push(pendingAction);
				}
			});
			$scope.pendingActions = actionArray;
		}
		
	};
	
	$scope.showNotification = function(notification){
		if(notification!=null){
			$scope.selectedNotification.code = notification.code;
			$scope.selectedNotification.module = notification.module;
			$scope.selectedNotification.event = notification.event;
			$scope.selectedNotification.message = notification.message;
			$scope.selectedNotification.emailSubject = notification.emailSubject;
			$scope.selectedNotification.pendingActionFlag = notification.pendingActionFlag;
			$scope.selectedNotification.notificationTypeRoleDTOs = notification.notificationTypeRoleDTOs;
			
			$scope.checkboxesEmail=[];
			$scope.checkboxesDashboard=[];
			
			_.each(notification.notificationTypeRoleDTOs, function(dto){
				
				if(dto.isEmail == 'Y'){
					$scope.checkboxesEmail[dto.id] = true;
				}else{
					$scope.checkboxesEmail[dto.id] = false;
				}

				if(dto.isDashboard == 'Y'){
					$scope.checkboxesDashboard[dto.id] = true;
				}else{
					$scope.checkboxesDashboard[dto.id] = false;
				}
				
			});
			
			
			$('#editModal').modal({backdrop:'static'});
		}
		
	};

	$scope.saveNotification = function(){
		var notificationTypeRoleDTOs = [];
		
		_.each($scope.selectedNotification.notificationTypeRoleDTOs, function(notification){
			var notificationTypeRoleDTO = new Object();
			notificationTypeRoleDTO.id = notification.id;
			if($scope.checkboxesEmail[notification.id] == true){
				notificationTypeRoleDTO.isEmail = 'Y';
			}else{
				notificationTypeRoleDTO.isEmail = 'N';
			}
			if($scope.checkboxesDashboard[notification.id] == true){
				notificationTypeRoleDTO.isDashboard = 'Y';
			}else{
				notificationTypeRoleDTO.isDashboard = 'N';
			}
			notificationTypeRoleDTOs.push(notificationTypeRoleDTO);
		});
		
		$scope.selectedNotification.notificationTypeRoleDTOs = notificationTypeRoleDTOs;
		
		$scope.$root.confirmDialog("Do you want to proceed to save the notifications?",$scope.confirmSaveNotifications,$scope.selectedNotification);
	};
	
	$scope.confirmSaveNotifications = function(notificationTypeDTO){
		var saveNotificationTypesPromise = SystemService.saveNotificationTypes(notificationTypeDTO);
		$q.all([saveNotificationTypesPromise]).then(function(data){
			$scope.$root.infoDialog(data[0]);
			var notificationTypesPromise = SystemService.getNotificationTypes();
			$q.all([notificationTypesPromise]).then(function(data){
				$scope.notifications = data[0];
				$scope.tempNotifications = data[0];
			});
		});
	};
	
});

app.controller('ManageSupportStructureController', function($q, $scope, $stateParams,CommonService,SystemService,Constants) {
	//if(!$scope.$root.checkAccessRights('showManageSupportStrutures')){return;}
	$scope.unitSelected = {};
	$scope.subunitSelected = {};
	$scope.unitFilterSelected = {code:null,name:null};
	$scope.subunitFilterSelected = {id:null,name:null};
	$scope.supportStructureDTOs = [];
	var hubPromise = CommonService.getHubs();
	var nodePromise = CommonService.getNodes();
	var unitPromise = CommonService.getUnits();
	var unitPromise = CommonService.getUnits();
	var subunitPromise = CommonService.getSubunits();
	var manageHubPromise = SystemService.getSupportStructures();
	$q.all([hubPromise,nodePromise,unitPromise,manageHubPromise,subunitPromise]).then(function(data) {
		$scope.hubs = data[0];
		$scope.nodes = data[1];
		$scope.units = data[2];
		$scope.manageHubs = data[3];
		$scope.tempManageHubs = data[3];
		$scope.subunits = data[4];
	});
	
	$scope.updateFilter = function() {
		$scope.updateHub();
		$scope.updateNode();
		$scope.updateUnit();
		$scope.updateSubunit();
	};
	
	$scope.updateHub = function(){
		if($scope.hubSelected == null || $scope.hubSelected == undefined) {
			$scope.manageHubs = $scope.tempManageHubs;
		}else{
			
			var hubArray = [];
			for(var hub of $scope.tempManageHubs){
				if(hub.code == $scope.hubSelected.code){
					hubArray.push(hub);
				}
			};
			$scope.manageHubs = hubArray;
		}
	};
	
	$scope.updateNode = function(){
		if($scope.nodeSelected!= null && $scope.nodeSelected!= undefined) {
			var hubArray = [];
			for(var hub of $scope.manageHubs){
				var nodeArray = [];
				for(var node of hub.nodeDTOs){
					
					if(node.id == $scope.nodeSelected.id){
						nodeArray.push(node);
					}
				}
				if(nodeArray!==null && nodeArray.length!==0){
					var tempHub =  new Object();
					tempHub.code = hub.code;
					tempHub.name = hub.name;
					tempHub.nodeDTOs = nodeArray;
					hubArray.push(tempHub);
				}

			}
			$scope.manageHubs = hubArray;
		}
	};
	
	$scope.updateUnit = function(){

		if($scope.unitFilterSelected.code != null){
				var hubArray = [];
				for(var hub of $scope.manageHubs){
					var nodeArray = [];
					for(var node of hub.nodeDTOs){
						var unitArray = [];
						for(var unit of node.unitDTOs){
							if(unit.code == $scope.unitFilterSelected.code){
								unitArray.push(unit);
							}
						}
						if(unitArray!==null && unitArray.length!==0){
							var tempNode = new Object();
							tempNode.id = node.id;
							tempNode.name = node.name;
							tempNode.unitDTOs = unitArray;
							nodeArray.push(tempNode);
						}
					
					}
					if(nodeArray!==null && nodeArray.length!==0){
						var tempHub =  new Object();
						tempHub.code = hub.code;
						tempHub.name = hub.name;
						tempHub.nodeDTOs = nodeArray;
						hubArray.push(tempHub);
					}
				}
				$scope.manageHubs = hubArray;
		}
		
	};
	
	$scope.updateSubunit = function(){
		if($scope.subunitFilterSelected.id != null){
			var hubArray = [];
			for(var hub of $scope.manageHubs){
				var nodeArray = [];
				for(var node of hub.nodeDTOs){
					var unitArray = [];
					for(var unit of node.unitDTOs){
						var subunitArray = [];
						for(var subunit of unit.subunitDTOs){
							if(subunit.id == $scope.subunitFilterSelected.id){
								subunitArray.push(subunit);
							}
						}
						if(subunitArray!==null && subunitArray.length!==0){
							var tempUnit = new Object();
							tempUnit.code = unit.code;
							tempUnit.name = unit.name;
							tempUnit.subunitDTOs = subunitArray;
							unitArray.push(tempUnit);
						}
						
					}
					if(unitArray!==null && unitArray.length!==0){
						var tempNode = new Object();
						tempNode.id = node.id;
						tempNode.name = node.name;
						tempNode.unitDTOs = unitArray;
						nodeArray.push(tempNode);
					}
				
				}
				if(nodeArray!==null && nodeArray.length!==0){
					var tempHub =  new Object();
					tempHub.code = hub.code;
					tempHub.name = hub.name;
					tempHub.nodeDTOs = nodeArray;
					hubArray.push(tempHub);
				}
			}
			$scope.manageHubs = hubArray;
	}
	};
	
	$scope.onSelectFilterSubunit = function($item){
		$scope.subunitFilterSelected.id = $item.id;
		$scope.subunitFilterSelected.name = $item.name;
		
		$scope.updateFilter();
	};
	
	$scope.subunitFilterChange = function(){
		if($scope.subunitFilter == null || $scope.subunitFilter == undefined){
			$scope.subunitFilterSelected.id = null;
			$scope.subunitFilterSelected.name = null;
			
			$scope.updateFilter();
		}
	};
	
	$scope.onSelectFilterUnit = function($item){
		$scope.unitFilterSelected.code = $item.code;
		$scope.unitFilterSelected.name = $item.name;

		$scope.updateFilter();
	};
	
	$scope.unitFilterChange = function(){
		if($scope.unitFilter== null || $scope.unitFilter == undefined){
			$scope.unitFilterSelected.code = null;
			$scope.unitFilterSelected.name = null;

			$scope.updateFilter();
		}
	};
	
	$scope.onSelectUnit = function($item) {
		$scope.unitSelected.code = $item.code;
		$scope.unitSelected.name = $item.name;
	};
	
	$scope.onSelectSubunit = function($item){
		$scope.subunitSelected.id = $item.id;
		$scope.subunitSelected.name = $item.name;
	};
	
	$scope.addUnit = function(selectedNode,selectedHub){
		
		var isAdded = false;
		for(var hub of $scope.manageHubs){
			if(selectedHub.code== hub.code){
				for(var node of hub.nodeDTOs){
					if(node.id == selectedNode.id){
						var unit = new Object();
						unit.name = $scope.unitSelected.name;
						unit.code = $scope.unitSelected.code;
						node.unitDTOs.push(unit);
						isAdded = true;
						break;
					}
				}
			}	
			if(isAdded){
				break;
			}
		}		
		
		var supportStructureDTO = new Object();
		supportStructureDTO.hubCode = selectedHub.code;
		supportStructureDTO.nodeId = selectedNode.id;
		supportStructureDTO.unitCode = $scope.unitSelected.code;
		supportStructureDTO.deleteUnitFlag = Constants.FLAG_NO;
		$scope.supportStructureDTOs.push(supportStructureDTO);
	
		$scope.$root.infoDialog("Unit added.");
		selectedNode.isAddUnit = false;
	};
	
	$scope.addSubunit = function(selectedUnit,selectedNode,selectedHub){
		
		var isAdded = false;
		for(var hub of $scope.manageHubs){
			if(selectedHub.code == hub.code){
				for(var node of hub.nodeDTOs){
					if(selectedNode.id == node.id){
						for(var unit of node.unitDTOs){
							if(unit.code == selectedUnit.code){
								if(unit.subunitDTOs == null){
									unit.subunitDTOs = new Array();
								}
							
								var subunit = new Object();
								subunit.id = $scope.subunitSelected.id;
								subunit.name = $scope.subunitSelected.name;
								unit.subunitDTOs.push(subunit);
								isAdded = true;
								
								break;
							}
						}
					}
					if(isAdded){
						break;
					}
				}
			
			}
			if(isAdded){
				break;
			}
		}
		
		var supportStructureDTO = new Object();
		supportStructureDTO.hubCode = selectedHub.code;
		supportStructureDTO.nodeId = selectedNode.id;
		supportStructureDTO.unitCode = selectedUnit.code;
		supportStructureDTO.subunitId = $scope.subunitSelected.id;
		supportStructureDTO.deleteSubunitFlag = Constants.FLAG_NO;
		$scope.supportStructureDTOs.push(supportStructureDTO);
	
		$scope.$root.infoDialog("Subunit added.");
		unit.isAddSubUnit = false;
			
			
	};
	
	$scope.deleteUnit = function(selectedNode,selectedHub,selectedUnit){
		var isDelete = false;
		for(var hub of $scope.manageHubs){
			if(selectedHub.code== hub.code){
				for(var node of hub.nodeDTOs){
					if(selectedNode.id == node.id){
						for(var unit of node.unitDTOs){
							if(unit.code == selectedUnit.code){
								var index = node.unitDTOs.indexOf(unit);
								if(index!==-1){
									node.unitDTOs.splice(index,1);
									isDelete = true;
									break;
								}
								
							}
						}
					}
					if(isDelete){
						break;
					}
				}
			}	
			if(isDelete){
				break;
			}
		}
		
		if(isDelete){
			var supportStructureDTO = new Object();
			supportStructureDTO.hubCode = selectedHub.code;
			supportStructureDTO.nodeId = selectedNode.id;
			supportStructureDTO.unitCode = selectedUnit.code;
			supportStructureDTO.deleteUnitFlag = Constants.FLAG_YES;
			$scope.supportStructureDTOs.push(supportStructureDTO);
		}
		
		
		$scope.$root.infoDialog("Unit deleted.");

	};
	
	
	
	$scope.deleteSubunit = function(selectedNode,selectedHub,selectedUnit,selectedSubunit){
		var isDelete = false;
		for(var hub of $scope.manageHubs){
			if(selectedHub.code== hub.code){
				for(var node of hub.nodeDTOs){
					if(selectedNode.id == node.id){
						for(var unit of node.unitDTOs){
							if(unit.code == selectedUnit.code){
								for(var subunit of unit.subunitDTOs){
									if(subunit.id == selectedSubunit.id){
										var index = unit.subunitDTOs.indexOf(subunit);
										if(index!==-1){
											unit.subunitDTOs.splice(index,1);
											isDelete = true;
											break;
										}
									}
								}
							}
						}
					}
					if(isDelete){
						break;
					}
				}
			}	
			if(isDelete){
				break;
			}
		}
		
		if(isDelete){
			var supportStructureDTO = new Object();
			supportStructureDTO.hubCode = selectedHub.code;
			supportStructureDTO.nodeId = selectedNode.id;
			supportStructureDTO.unitCode = selectedUnit.code;
			supportStructureDTO.subunitId = selectedSubunit.id;
			supportStructureDTO.deleteSubunitFlag = Constants.FLAG_YES;
			$scope.supportStructureDTOs.push(supportStructureDTO);
		}
		
		
		$scope.$root.infoDialog("Subunit deleted.");

	};
	
	
	$scope.save = function() {
		var saveSupportStructurePromise = SystemService.saveSupportStructure($scope.supportStructureDTOs);
		$q.all([saveSupportStructurePromise]).then(function(data){
			$scope.supportStructureDTOs = [];
			$scope.$root.infoDialog(data[0]);
			var manageHubPromise = SystemService.getSupportStructures();
			$q.all([manageHubPromise]).then(function(data) {
				$scope.manageHubs = data[0];
			});
		});
	};
	
	
	
});

app.controller('ManageParameterController', function($q, $scope, $stateParams,CommonService,SystemService,Constants) {
	//if(!$scope.$root.checkAccessRights('showManageParameters')){return;}
	$scope.selectedParameter={};
	var systemParameterPromise = SystemService.getSystemParameters();
	var systemParameterCategoryPromise = SystemService.getSystemCategories();
	var snapShotRewardTypePromise = SystemService.getSnapShotTypes('REWARD');
	var snapShotActivityTypePromise = SystemService.getSnapShotTypes('ACTIVITY');
	var snapShotDoubleBookOutPromise = SystemService.getSnapShotTypes('DOUBLEBOOKOUT');
	$q.all([systemParameterPromise,systemParameterCategoryPromise,snapShotRewardTypePromise,snapShotActivityTypePromise,snapShotDoubleBookOutPromise]).then(function(data){

		$scope.systemParameters = data[0];
		$scope.tempSystemParameters = data[0];
		$scope.categories = data[1];
		$scope.paramTab='G';
		$scope.snapShotRewards = data[2];
		$scope.snapShotActivities = data[3];
		$scope.snapShotDoubleBookOuts = data[4];
		
		if($scope.snapShotRewards!=null){
			$scope.snapShotRewardType = $scope.snapShotRewards[0].id;
		}
		
		if($scope.snapShotActivities!=null){
			$scope.snapShotActivityType = $scope.snapShotActivities[0].id;
		}
		
		if($scope.snapShotDoubleBookOuts!=null){
			$scope.snapShotDoubleBookOutType = $scope.snapShotDoubleBookOuts[0].id;
		}
		
		$scope.updateReward();
		$scope.updateDoubleBookOut();
		$scope.updateActivity();
		
	});
	
	$scope.updateReward = function(){
		var snapShotRewardTypePromise = SystemService.getSnapShotRewardType($scope.snapShotRewardType);
		$q.all([snapShotRewardTypePromise]).then(function(data){
			$scope.rewardParameters = data[0];
		});
	};
	
	$scope.updateActivity = function(){
		var snapShotActivityTypePromise = SystemService.getSnapShotActivityType($scope.snapShotActivityType);
		$q.all([snapShotActivityTypePromise]).then(function(data){
			$scope.activityParameters = data[0];
		});
	};
	
	$scope.updateDoubleBookOut = function(){
		var snapShotDoubleBookOutTypePromise = SystemService.getSnapShotDoubleBookOutType($scope.snapShotDoubleBookOutType);
		$q.all([snapShotDoubleBookOutTypePromise]).then(function(data){
			$scope.doubleBookoutParameters = data[0];
		});
	};
	
	$scope.reload = function() {
		
		if($scope.paramTab == 'D'){
			var snapShotActivityTypePromise = SystemService.getSnapShotTypes('DOUBLEBOOKOUT');
			$q.all([snapShotActivityTypePromise]).then(function(data){
				
				$scope.snapShotDoubleBookOuts = data[0];
				
				if($scope.snapShotDoubleBookOuts!=null){
					$scope.snapShotDoubleBookOutType = $scope.snapShotDoubleBookOuts[0].id;
				}
				$scope.updateDoubleBookOut();			
			});
			
		}else if($scope.paramTab == 'A'){
			
			var snapShotActivityTypePromise = SystemService.getSnapShotTypes('ACTIVITY');
			$q.all([snapShotActivityTypePromise]).then(function(data){
				$scope.snapShotActivities = data[0];
				if($scope.snapShotActivities!=null){
					$scope.snapShotActivityType = $scope.snapShotActivities[0].id;
				}
				
				$scope.updateActivity();
			});
			
		}else if($scope.paramTab == 'R'){
			var snapShotRewardTypePromise = SystemService.getSnapShotTypes('REWARD');
			$q.all([snapShotRewardTypePromise]).then(function(data){
				$scope.snapShotRewards = data[0];
				if($scope.snapShotRewards!=null){
					$scope.snapShotRewardType = $scope.snapShotRewards[0].id;
				}
				$scope.updateReward();
			});
	
		}

	}
	
	$scope.save = function(){
		if($scope.paramTab == 'D'){
			$scope.$root.confirmDialog("Do you want to proceed to save Double Book-out parameters?",$scope.confirmSaveDoubleBookOut,$scope.doubleBookoutParameters);
		}else if($scope.paramTab == 'A'){
			$scope.$root.confirmDialog("Do you want to proceed to save Activities parameters?",$scope.confirmSaveActivity,$scope.activityParameters);
		}else if($scope.paramTab == 'R'){
			$scope.$root.confirmDialog("Do you want to proceed to save Reward Types parameters?",$scope.confirmSaveRewardType,$scope.rewardParameters);
		}
	};
	
	$scope.showParameter = function(parameter){
		$scope.selectedParameter.code = parameter.code;
		$scope.selectedParameter.name = parameter.name;
		$scope.selectedParameter.metric = parameter.metric;
		$scope.selectedParameter.effectiveDate = moment();
		$scope.selectedParameter.value = parameter.value;
		$scope.selectedParameter.newValue = parameter.value;
	};
	
	$scope.saveParameters = function(parameter){
		$scope.$root.confirmDialog("Do you want to proceed to update the following system parameters : " + parameter.name + "?",$scope.confirmSaveSystemParameter,parameter);
	};
	
	$scope.confirmSaveSystemParameter = function(parameter){
		var saveSystemParameterPromise = SystemService.saveSystemParameter(parameter);
		$q.all([saveSystemParameterPromise]).then(function(data){
			$scope.$root.infoDialog(data[0]);
			reloadSystemParameter();
		});
	};
	
	var reloadSystemParameter = function(){
		var systemParameterPromise = SystemService.getSystemParameters();
		$q.all([systemParameterPromise]).then(function(data){
			$scope.systemParameters = data[0];
			$scope.tempSystemParameters = data[0];
		});
	};
	
	$scope.reset = function(){
		var activityPromise = SystemService.getActivities("null");
		var activityDoubleBkOutPromise = SystemService.getActivities(Constants.OPERATIONS);
		var rewardTypesPromise = SystemService.getRewardTypes();
		$q.all([activityPromise,activityDoubleBkOutPromise,rewardTypesPromise]).then(function(data){
			$scope.activityParameters = data[0];
			$scope.doubleBookoutParameters = data[1];
			//$scope.rewardParameters = data[2];
		});
		$scope.reload();
	};
	
	$scope.updateCategory = function(){
		if($scope.categorySelected == null) {
			$scope.systemParameters = $scope.tempSystemParameters;
		}else{
			var systemParatemeterArray = [];
			_.each($scope.tempSystemParameters, function(parameter){
				if(parameter.category == $scope.categorySelected){
					systemParatemeterArray.push(parameter);
				}
			});
			$scope.systemParameters = systemParatemeterArray;
		}
		
	};
	
	$scope.confirmSaveDoubleBookOut = function(activityDTOs){
		var saveDoubleBookOutPromise = SystemService.saveDoubleBookOut(activityDTOs);
		$q.all([saveDoubleBookOutPromise]).then(function(data){
			$scope.$root.infoDialog(data[0]);
			$scope.reload();
		});
	};
	
	$scope.confirmSaveActivity = function(activityDTOs){
		var saveActivityPromise = SystemService.saveActivity(activityDTOs);
		$q.all([saveActivityPromise]).then(function(data){
			$scope.$root.infoDialog(data[0]);
			$scope.reload();
		});
	};
	
	$scope.confirmSaveRewardType = function(rewardTypeDTOs){
		var saveRewardTypePromise = SystemService.saveRewardType(rewardTypeDTOs);
		$q.all([saveRewardTypePromise]).then(function(data){
			$scope.$root.infoDialog(data[0]);
			$scope.reload();
		});
	};

});

app.controller('ManageMasterDataController', function($q, $scope, $stateParams,CommonService,SystemService,Constants,$rootScope) {
	
	$scope.selectedVehiclePurpose = {};
	$scope.selectedTowType = {};
	$scope.selectedDrivingCategory = {};
	$scope.selectedProficiency = {};
	$scope.selectedPermitType = {};
	$scope.selectedPermitClass = {};
	$scope.selectedOffenceType = {};
	$scope.selectedOffence = {};
	$scope.selectedReason = {};
	$scope.selectedVenue = {};
	$scope.selectedHoliday = {};
	
	var offencePromise = SystemService.getOffences();
	var offenceTypePromise = SystemService.getOffenceTypes();
	var proficiencyPromise = SystemService.getProficiencies();
	var towTypePromise = SystemService.getTowTypes();
	var reasonPromise = SystemService.getReasons();
	var venuePromise = SystemService.getVenues();
	var permitTypePromise = SystemService.getPermitTypes();
	var purposePromise = SystemService.getPurposes();
	var activityTypePromise = CommonService.getActivityTypes();
	var drivingCategoryPromise = SystemService.getDrivingCategories();
	var venueTypePromise = CommonService.getVenueTypes();
	var permitClassPromise = SystemService.getPermitClasses();
	$q.all([offencePromise,offenceTypePromise,proficiencyPromise,towTypePromise,reasonPromise,venuePromise,permitTypePromise,purposePromise,activityTypePromise,drivingCategoryPromise,venueTypePromise,permitClassPromise]).then(function(data){
		$scope.cdOffencesCommitted = data[0];
		$scope.tempOffencesCommitted = data[0];
		$scope.cdOffenceTypes = data[1];
		$scope.tempOffenceTypes = data[1];
		$scope.cdProficiences = data[2];
		$scope.tempProficiences = data[2];
		$scope.cdTowTypes = data[3];
		$scope.tempTowTypes = data[3];
		$scope.cdReasons = data[4];
		$scope.cdVenues = data[5];
		$scope.tempVenues = data[5];
		$scope.cdPermitTypes = data[6];
		$scope.tempPermitTypes = data[6];
		$scope.cdVehiclePurposes = data[7];
		$scope.tempVehiclePurposes = data[7];
		$scope.activityTypes = data[8];
		$scope.cdDrivingCategories = data[9];
		$scope.tempDrivingCategories = data[9];
		$scope.venueTypes = data[10];
		$scope.cdPermitClasses = data[11];
		$scope.tempPermitClasses = data[11];
	});
	
	//vehicle purpose
	$scope.updatePurpose = function(){
		
		if(($scope.selectedPurposeName === window.undefined || $scope.selectedPurposeName === null) && $scope.purposeObsoleteSelected !== 'Y' 
			&& $scope.purposeObsoleteSelected !== 'N' && ($scope.selectedActivityType === window.undefined || $scope.selectedActivityType === null)){
			$scope.cdVehiclePurposes = $scope.tempVehiclePurposes;
		}else{
			$scope.cdVehiclePurposes = $scope.tempVehiclePurposes;
			updatePurposeObsolete($scope.cdVehiclePurposes);
			updateActivityTypePurpose($scope.cdVehiclePurposes);
			updatePurposeName($scope.cdVehiclePurposes);
		}
		
	};
	
	updatePurposeName = function(vehiclePurposes){
		if($scope.selectedPurposeName !== window.undefined && $scope.selectedPurposeName !== null){
			var purposeArray = [];
			_.each(vehiclePurposes, function(purpose){
				if(purpose.name == $scope.selectedPurposeName){
					purposeArray.push(purpose);
				}
			});
			$scope.cdVehiclePurposes = purposeArray;
		}
		
	};
	
	$scope.purposeNameChange = function(){
		if($scope.selectedPurposeName === window.undefined || $scope.selectedPurposeName === null){
			$scope.updatePurpose();
		}
	}
	
	updatePurposeObsolete = function(vehiclePurposes){
		if($scope.purposeObsoleteSelected === 'Y' || $scope.purposeObsoleteSelected === 'N') {
			var purposeArray = [];
			_.each(vehiclePurposes, function(purpose){
				if(purpose.obsolete == $scope.purposeObsoleteSelected){
					purposeArray.push(purpose);
				}
			});
			$scope.cdVehiclePurposes = purposeArray;
		}
	};
	
	updateActivityTypePurpose = function (vehiclePurposes){
		if($scope.selectedActivityType !== window.undefined && $scope.selectedActivityType!==null){
			var purposeArray = [];
			_.each(vehiclePurposes, function(purpose){
				if(purpose.activityTypeCode == $scope.selectedActivityType){
					purposeArray.push(purpose);
				}
			});
			$scope.cdVehiclePurposes = purposeArray;
		}
	};
	
	$scope.searchPurposeName = function(name){
		if(!$rootScope.filterSpecialChar(name)){
			var purposeNamePromise = SystemService.searchPurposeName(name);
			$q.all([purposeNamePromise]).then(function(data){
				$scope.purposes = data[0];
			});
		}else{
			$rootScope.errorDialog("Please use either alphabets or numbers to search.");
		}
	};
	
	$scope.onSelectPurpose = function($item){
		$scope.updatePurpose();
	};
	
	$scope.showVehiclePurpose = function(vehiclePurpose){
		if(vehiclePurpose == null){
			$scope.selectedVehiclePurpose = {};
			$scope.selectedVehiclePurpose.isEdit = false;
		}else{
			$scope.selectedVehiclePurpose.name = vehiclePurpose.name;
			$scope.selectedVehiclePurpose.id = vehiclePurpose.id;
			$scope.selectedVehiclePurpose.activityType = vehiclePurpose.activityType;
			$scope.selectedVehiclePurpose.activityTypeCode = vehiclePurpose.activityTypeCode;
			$scope.selectedVehiclePurpose.obsolete = vehiclePurpose.obsolete;
			$scope.selectedVehiclePurpose.isEdit = true;
		}
		$('#addEditVehiclePurposeModal').modal({ backdrop:'static' });
	};
	
	$scope.saveUpdateVehiclePurpose = function(){
		var saveUpdateVehiclePurposePromise = SystemService.saveUpdateVehiclePurpose($scope.selectedVehiclePurpose);
		$q.all([saveUpdateVehiclePurposePromise]).then(function(message){
			$scope.$root.infoDialog(message[0]);
			var purposePromise = SystemService.getPurposes();
			$q.all([purposePromise]).then(function(data){
				$scope.cdVehiclePurposes = data[0];
				$scope.tempVehiclePurposes = data[0];
				$scope.updatePurpose();
				
			});
		});
	};
	
	// Tow Type
	$scope.updateTowType = function(){
		
		if(($scope.selectedTowTypeName === window.undefined || $scope.selectedTowTypeName === null) && $scope.towTypeObsoleteSelected !== 'Y' 
			&& $scope.towTypeObsoleteSelected !== 'N'){
			$scope.cdTowTypes = $scope.tempTowTypes;
		}else{
			$scope.cdTowTypes = $scope.tempTowTypes;
			updateTowTypeObsolete($scope.cdTowTypes);
			updateTowTypeName($scope.cdTowTypes);
		}

	};
	
	updateTowTypeObsolete = function(towTypes){
		if($scope.towTypeObsoleteSelected === 'Y' || $scope.towTypeObsoleteSelected === 'N') {
			var towTypeArray = [];
			_.each(towTypes, function(towType){
				if(towType.obsolete == $scope.towTypeObsoleteSelected){
					towTypeArray.push(towType);
				}
			});
			$scope.cdTowTypes = towTypeArray;
		}
	};
	
	updateTowTypeName = function(towTypes){
		if($scope.selectedTowTypeName !== window.undefined && $scope.selectedTowTypeName !== null){
			var towTypeArray = [];
			_.each(towTypes, function(towType){
				if(towType.name == $scope.selectedTowTypeName){
					towTypeArray.push(towType);
				}
			});
			$scope.cdTowTypes = towTypeArray;	
		}
	};
	
	$scope.towTypeNameChange = function(){
		if($scope.selectedTowTypeName === window.undefined || $scope.selectedTowTypeName === null){
			$scope.updateTowType();
		}
	};
	
	$scope.searchTowTypeName = function(name){
		if(!$rootScope.filterSpecialChar(name)){
			var towTypeNamePromise = SystemService.searchTowTypeName(name);
			$q.all([towTypeNamePromise]).then(function(data){
				$scope.towTypes = data[0];
			});
		}else{
			$rootScope.errorDialog("Please use either alphabets or numbers to search.");
		}
	};
	
	$scope.onSelectTowType = function($item){
		$scope.updateTowType();
	};
	
	$scope.showTowType = function(towType){
		if(towType == null){
			$scope.selectedTowType = {};
			$scope.selectedTowType.isEdit = false;
		}else{
			$scope.selectedTowType.name = towType.name;
			$scope.selectedTowType.id = towType.id;
			$scope.selectedTowType.isEdit = true;
			$scope.selectedTowType.obsolete = towType.obsolete;
		}
		$('#addEditTowTypeModal').modal({ backdrop:'static' });
	};
	
	$scope.saveUpdateTowType = function(){
		var saveUpdateTowTypePromise = SystemService.saveUpdateTowType($scope.selectedTowType);
		$q.all([saveUpdateTowTypePromise]).then(function(message){
			$scope.$root.infoDialog(message[0]);
			var towTypePromise = SystemService.getTowTypes();
			$q.all([towTypePromise]).then(function(data){
				$scope.cdTowTypes = data[0];
				$scope.tempTowTypes = data[0];
				$scope.updateTowType();
				
			});
		});
	};
	
	// Driving Category
	
	$scope.updateDrivingCategory = function(){
		
		if($scope.drivingCategoryObsoleteSelected !== 'Y' && $scope.drivingCategoryObsoleteSelected !== 'N'){
			$scope.cdDrivingCategories = $scope.tempDrivingCategories;
		}else{
			$scope.cdDrivingCategories = $scope.tempDrivingCategories;
			updateDrivingCategoryObsolete($scope.cdDrivingCategories);
		}

	};
	
	updateOffenceDemeritPoints = function(offences){
		if($scope.offenceDemeritSelected != window.undefined && $scope.offenceDemeritSelected != null){
			var offencesArray = [];
			_.each(offences, function(offence){
				if(offence.demeritPoints == $scope.offenceDemeritSelected){
					offencesArray.push(offence);
				}
			});
			$scope.cdOffencesCommitted = offencesArray;
		}
	};
	
	updateDrivingCategoryObsolete = function(drivingCategories){
		if($scope.drivingCategoryObsoleteSelected === 'Y' || $scope.drivingCategoryObsoleteSelected === 'N') {
			var drivingCategoryArray = [];
			_.each(drivingCategories, function(drivingCategory){
				if(drivingCategory.obsolete == $scope.drivingCategoryObsoleteSelected){
					drivingCategoryArray.push(drivingCategory);
				}
			});
			$scope.cdDrivingCategories = drivingCategoryArray;
		}
	};
	
	$scope.showDrivingCategory = function(drivingCategory){
		if(drivingCategory==null){
			$scope.selectedDrivingCategory = {};
			$scope.selectedDrivingCategory.isEdit = false;
		}else{
			$scope.selectedDrivingCategory.id = drivingCategory.id;
			$scope.selectedDrivingCategory.name = drivingCategory.name;
			$scope.selectedDrivingCategory.mileageMoreThanEqual = drivingCategory.mileageMoreThanEqual;
			$scope.selectedDrivingCategory.mileageLessThanEqual = drivingCategory.mileageLessThanEqual;
			$scope.selectedDrivingCategory.isEdit = true;
			$scope.selectedDrivingCategory.obsolete = drivingCategory.obsolete;
		}
		$('#addEditDrivingCategoryModal').modal({backdrop:'static'});
	};
	
	$scope.saveUpdateDrivingCategory = function(){
		var saveUpdateDrivingCategoryPromise = SystemService.saveUpdateDrivingCategory($scope.selectedDrivingCategory);
		$q.all([saveUpdateDrivingCategoryPromise]).then(function(message){
			$scope.$root.infoDialog(message[0]);
			var drivingCategoryPromise = SystemService.getDrivingCategories();
			$q.all([drivingCategoryPromise]).then(function(data){
				$scope.cdDrivingCategories = data[0];
				$scope.tempDrivingCategories = data[0];
			});
		});
	};
	
	// Proficiency
	
	$scope.updateProficiency = function(){
		
		
		if(($scope.selectedProficiencyName === window.undefined || $scope.selectedProficiencyName === null) && $scope.proficiencyObsoleteSelected !== 'Y' 
			&& $scope.proficiencyObsoleteSelected !== 'N'){
			$scope.cdProficiences = $scope.tempProficiences;
		}else{
			$scope.cdProficiences = $scope.tempProficiences;
			updateProficiencyObsolete($scope.cdProficiences);
			updateProficiencyName($scope.cdProficiences);
		}
		
	};
	
	updateProficiencyObsolete = function(proficiencies){
		if($scope.proficiencyObsoleteSelected === 'Y' || $scope.proficiencyObsoleteSelected === 'N') {
			var proficiencyArray = [];
			_.each(proficiencies, function(proficiency){
				if(proficiency.obsolete == $scope.proficiencyObsoleteSelected){
					proficiencyArray.push(proficiency);
				}
			});
			$scope.cdProficiences = proficiencyArray;
		}		
	};
	
	updateProficiencyName = function(proficiencies){
		if($scope.selectedProficiencyName !== window.undefined && $scope.selectedProficiencyName !== null){
			var proficiencyArray = [];
			_.each(proficiencies, function(proficiency){
				if(proficiency.name == $scope.selectedProficiencyName){
					proficiencyArray.push(proficiency);
				}
			});
			$scope.cdProficiences = proficiencyArray;	
		}
	};
	
	$scope.proficiencyNameChange = function(){
		if($scope.selectedProficiencyName === window.undefined || $scope.selectedProficiencyName === null){
			$scope.updateProficiency();
		}
	};
	
	$scope.searchProficiencyName = function(name){
		if(!$rootScope.filterSpecialChar(name)){
			var proficiencyNamePromise = SystemService.searchProficiencyName(name);
			$q.all([proficiencyNamePromise]).then(function(data){
				$scope.proficiencies = data[0];
			});
		}else{
			$rootScope.errorDialog("Please use either alphabets or numbers to search.");
		}
	};
	
	$scope.onSelectProficiency = function($item){
		$scope.updateProficiency();
	};
	
	$scope.showProficiency = function(proficiency){
		if(proficiency == null){
			$scope.selectedProficiency = {};
			$scope.selectedProficiency.isEdit = false;
		}else{
			$scope.selectedProficiency.name = proficiency.name;
			$scope.selectedProficiency.id = proficiency.id;
			$scope.selectedProficiency.isEdit = true;
			$scope.selectedProficiency.obsolete = proficiency.obsolete;
		}
		$('#addEditProficiencyModal').modal({ backdrop:'static' });
	};
	
	$scope.saveUpdateProficiency = function(){
		var saveUpdateProficiencyPromise = SystemService.saveUpdateProficiency($scope.selectedProficiency);
		$q.all([saveUpdateProficiencyPromise]).then(function(message){
			$scope.$root.infoDialog(message[0]);
			var proficiencyPromise = SystemService.getProficiencies();
			$q.all([proficiencyPromise]).then(function(data){
				$scope.cdProficiences = data[0];
				$scope.tempProficiences = data[0];
				$scope.updateProficiency();
			});
		});
	};
	
	// Offence Committed
	
	$scope.updateOffence = function(){
		if(($scope.offenceObsoleteSelected !== 'Y' && $scope.offenceObsoleteSelected !== 'N') && 
				($scope.offenceDemeritSelected === window.undefined || $scope.offenceDemeritSelected === null || $scope.offenceDemeritSelected === '')
				&& ($scope.selectedOffenceName === window.undefined || $scope.selectedOffenceName === null)){
			$scope.cdOffencesCommitted = $scope.tempOffencesCommitted;
		}else{
			$scope.cdOffencesCommitted = $scope.tempOffencesCommitted;
			updateOffenceName($scope.cdOffencesCommitted);
			updateOffenceDemeritPoints($scope.cdOffencesCommitted);
			updateOffenceObsolete($scope.cdOffencesCommitted);
		}
		
	};
	
	updateOffenceDemeritPoints = function(offences){
		if($scope.offenceDemeritSelected != window.undefined && $scope.offenceDemeritSelected != null){
			var offencesArray = [];
			_.each(offences, function(offence){
				if(offence.demeritPoints == $scope.offenceDemeritSelected){
					offencesArray.push(offence);
				}
			});
			$scope.cdOffencesCommitted = offencesArray;
		}
	};
	
	updateOffenceObsolete = function(offences){
		if($scope.offenceObsoleteSelected === 'Y' || $scope.offenceObsoleteSelected === 'N') {
			var offencesArray = [];
			_.each(offences, function(offence){
				if(offence.obsolete == $scope.offenceObsoleteSelected){
					offencesArray.push(offence);
				}
			});
			$scope.cdOffencesCommitted = offencesArray;
		}
	};

	updateOffenceName = function(offences){
		if($scope.selectedOffenceName !== window.undefined && $scope.selectedOffenceName !== null){
			var offencesArray = [];
			_.each(offences, function(offence){
				if(offence.name == $scope.selectedOffenceName){
					offencesArray.push(offence);
				}
			});
			$scope.cdOffencesCommitted = offencesArray; 
		}
	};
	
	$scope.offenceNameChange = function(){
		if($scope.selectedOffenceName !== window.undefined || $scope.selectedOffenceName !== null){
			$scope.updateOffence();
		}
	};
	
	$scope.searchOffenceName = function(name){
		if(!$rootScope.filterSpecialChar(name)){
			var offencePromise = SystemService.searchOffenceName(name);
			$q.all([offencePromise]).then(function(data){
				$scope.offences = data[0];
			});
		}else{
			$rootScope.errorDialog("Please use either alphabets or numbers to search.");
		}
	};
	
	$scope.onSelectOffence = function($item){
		$scope.updateOffence();
	}
	
	$scope.showOffence = function(offence){
		if(offence == null){
			$scope.selectedOffence = {};
			$scope.selectedOffence.isEdit = false;
		}else{
			$scope.selectedOffence.name = offence.name;
			$scope.selectedOffence.id = offence.id;
			$scope.selectedOffence.demeritPoints = offence.demeritPoints;
			$scope.selectedOffence.isEdit = true;
			$scope.selectedOffence.obsolete = offence.obsolete;
		}
		$('#addEditOffenceModal').modal({backdrop:'static'});
	};
	
	$scope.saveUpdateOffence = function(){
		var saveUpdateOffencePromise = SystemService.saveUpdateOffence($scope.selectedOffence);
		$q.all([saveUpdateOffencePromise]).then(function(message){
			$scope.$root.infoDialog(message[0]);
			var offencePromise = SystemService.getOffences();
			$q.all([offencePromise]).then(function(data){
				$scope.cdOffencesCommitted = data[0];
				$scope.tempOffencesCommitted = data[0];
				$scope.updateOffence();
			});
		});
	};
	
	// Offence Type
	$scope.updateOffenceType = function(){

		if(($scope.selectedOffenceTypeName === window.undefined || $scope.selectedOffenceTypeName === null) && ($scope.offenceTypeObsoleteSelected !== 'Y' 
			&& $scope.offenceTypeObsoleteSelected !== 'N')  && ($scope.offenceTypeAccidentSelected !== 'Y' 
				&& $scope.offenceTypeAccidentSelected !== 'N')){
			$scope.cdOffenceTypes = $scope.tempOffenceTypes;
		}else{
			$scope.cdOffenceTypes = $scope.tempOffenceTypes;
			updateOffenceTypeObsolete($scope.cdOffenceTypes);
			updateOffenceTypeAccident($scope.cdOffenceTypes);
			updateOffenceTypeName($scope.cdOffenceTypes);
		}
	};
	
	updateOffenceTypeObsolete = function(offenceTypes){
		if($scope.offenceTypeObsoleteSelected === 'Y' || $scope.offenceTypeObsoleteSelected === 'N') {
			var offenceTypesArray = [];
			_.each(offenceTypes, function(offenceType){
				if(offenceType.obsolete == $scope.offenceTypeObsoleteSelected){
					offenceTypesArray.push(offenceType);
				}
			});
			$scope.cdOffenceTypes = offenceTypesArray;
		}
	};
	
	updateOffenceTypeAccident = function(offenceTypes){
		if($scope.offenceTypeAccidentSelected === 'Y' || $scope.offenceTypeAccidentSelected === 'N') {
			var offenceTypesArray = [];
			_.each(offenceTypes, function(offenceType){
				if(offenceType.accidentFlag == $scope.offenceTypeAccidentSelected){
					offenceTypesArray.push(offenceType);
				}
			});
			$scope.cdOffenceTypes = offenceTypesArray;
		}
	};
	
	updateOffenceTypeName = function(offenceTypes){
		if($scope.selectedOffenceTypeName !== window.undefined && $scope.selectedOffenceTypeName !== null){
			var offenceTypesArray = [];
			_.each(offenceTypes, function(offenceType){
				if(offenceType.name == $scope.selectedOffenceTypeName){
					offenceTypesArray.push(offenceType);
				}
			});
			$scope.cdOffenceTypes = offenceTypesArray; 
		}
	};
	
	$scope.offenceTypeNameChange = function(){
		if($scope.selectedOffenceTypeName !== window.undefined || $scope.selectedOffenceTypeName !== null){
			$scope.updateOffenceType();
		}
	};
	
	$scope.searchOffenceTypeName = function(name){
		if(!$rootScope.filterSpecialChar(name)){
			var offenceTypePromise = SystemService.searchOffenceTypeName(name);
			$q.all([offenceTypePromise]).then(function(data){
				$scope.offenceTypes = data[0];
			});
		}else{
			$rootScope.errorDialog("Please use either alphabets or numbers to search.");
		}
	};
	
	$scope.onSelectOffenceTypeName = function($item){
		$scope.updateOffenceType();
	};
	
	$scope.showOffenceType = function(offenceType){
		if(offenceType == null){
			$scope.selectedOffenceType = {};
			$scope.selectedOffenceType.isEdit = false;
		}else{
			$scope.selectedOffenceType.name = offenceType.name;
			$scope.selectedOffenceType.id = offenceType.id;
			$scope.selectedOffenceType.accidentFlag = offenceType.accidentFlag;
			$scope.selectedOffenceType.isEdit = true;
			$scope.selectedOffenceType.obsolete = offenceType.obsolete;
		}
		$('#addEditOffenceTypeModal').modal({backdrop:'static'});
	};
	
	$scope.saveUpdateOffenceType = function(){
		var saveUpdateOffenceTypePromise = SystemService.saveUpdateOffenceType($scope.selectedOffenceType);
		$q.all([saveUpdateOffenceTypePromise]).then(function(message){
			$scope.$root.infoDialog(message[0]);
			var offenceTypePromise = SystemService.getOffenceTypes();
			$q.all([offenceTypePromise]).then(function(data){
				$scope.cdOffenceTypes = data[0];
				$scope.tempOffenceTypes = data[0];
				$scope.updateOffenceType();
			});
		});
	};
	
	// Permit Type
	
	$scope.updatePermitType = function(){

		if(($scope.selectedPermitTypeName === window.undefined || $scope.selectedPermitTypeName === null) && ($scope.permitTypeObsoleteSelected !== 'Y' 
			&& $scope.permitTypeObsoleteSelected !== 'N')  && ($scope.selectedPermitTypePrefix === window.undefined || $scope.selectedPermitTypePrefix === null)){
			$scope.cdPermitTypes = $scope.tempPermitTypes;
		}else{
			$scope.cdPermitTypes = $scope.tempPermitTypes;
			updatePermitTypeObsolete($scope.cdPermitTypes);
			updatePermitTypeName($scope.cdPermitTypes);
			updatePermitTypePrefix($scope.cdPermitTypes);
		}
	};
	
	updatePermitTypeObsolete = function(permitTypes){
		if($scope.permitTypeObsoleteSelected === 'Y' || $scope.permitTypeObsoleteSelected === 'N') {
			var permitTypesArray = [];
			_.each(permitTypes, function(permitType){
				if(permitType.obsolete == $scope.permitTypeObsoleteSelected){
					permitTypesArray.push(permitType);
				}
			});
			$scope.cdPermitTypes = permitTypesArray;
		}
	};
	
	updatePermitTypeName = function(permitTypes){
		if($scope.selectedPermitTypeName !== window.undefined && $scope.selectedPermitTypeName !== null){
			var permitTypeArray = [];
			_.each(permitTypes, function(permitType){
				if(permitType.name == $scope.selectedPermitTypeName){
					permitTypeArray.push(permitType);
				}
			});
			$scope.cdPermitTypes = permitTypeArray;	
		}
	};
	
	updatePermitTypePrefix = function(permitTypes){
		if($scope.selectedPermitTypePrefix !== window.undefined && $scope.selectedPermitTypePrefix !== null){
			var permitTypeArray = [];
			_.each(permitTypes, function(permitType){
				if(permitType.prefix == $scope.selectedPermitTypePrefix){
					permitTypeArray.push(permitType);
				}
			});
			$scope.cdPermitTypes = permitTypeArray;	
		}
	};
	
	$scope.searchPermitTypeName = function(name){
		if(!$rootScope.filterSpecialChar(name)){
			var permitTypePromise = SystemService.searchPermitTypeName(name);
			$q.all([permitTypePromise]).then(function(data){
				$scope.permitTypeNames = data[0];
			});
		}else{
			$rootScope.errorDialog("Please use either alphabets or numbers to search.");
		}
	};
	
	$scope.onSelectPermitTypeName = function($item){
		$scope.updatePermitType();
	};
	
	$scope.searchPermitTypePrefix = function(prefix){
		if(!$rootScope.filterSpecialChar(prefix)){
			var permitTypePromise = SystemService.searchPermitTypePrefix(prefix);
			$q.all([permitTypePromise]).then(function(data){
				$scope.permitTypePrefixs = data[0];
			});
		}else{
			$rootScope.errorDialog("Please use either alphabets or numbers to search.");
		}
	};
	
	$scope.onSelectPermitTypePrefix = function($item){
		$scope.updatePermitType();
	};
	
	$scope.permitTypeNameChange = function(){
		if($scope.selectedPermitTypeName !== window.undefined || $scope.selectedPermitTypeName !== null){
			$scope.updatePermitType();
		}
	};
	
	$scope.permitTypePrefixChange = function() {
		if($scope.selectedPermitTypePrefix !== window.undefined || $scope.selectedPermitTypePrefix !== null){
			$scope.updatePermitType();
		}
	};

	$scope.showPermitType = function(permitType){
		if(permitType == null){
			$scope.selectedPermitType = {};
			$scope.selectedPermitType.isEdit = false;
		}else{
			$scope.selectedPermitType.name = permitType.name;
			$scope.selectedPermitType.code = permitType.code;
			$scope.selectedPermitType.prefix = permitType.prefix;
			$scope.selectedPermitType.obsolete = permitType.obsolete;
			$scope.selectedPermitType.isEdit = true;
		}
		$('#addEditPermitTypeModal').modal({ backdrop:'static' });
	};
	
	$scope.saveUpdatePermitType = function(){
		var saveUpdatePermitTypePromise = SystemService.saveUpdatePermitType($scope.selectedPermitType);
		$q.all([saveUpdatePermitTypePromise]).then(function(message){
			$scope.$root.infoDialog(message[0]);
			var permitTypePromise = SystemService.getPermitTypes();
			$q.all([permitTypePromise]).then(function(data){
				$scope.cdPermitTypes = data[0];
				$scope.tempPermitTypes = data[0];
				$scope.updatePermitType();
			});
		});
	};
	
	// Permit Class
	
	$scope.updatePermitClass = function(){
//		if(($scope.permitClassObsoleteSelected !== 'Y' && $scope.permitClassObsoleteSelected !== 'N')  &&
//			($scope.permitClassMileageTypeSelected === "" || $scope.permitClassMileageTypeSelected === null || $scope.permitClassMileageTypeSelected === window.undefined)){
		if(($scope.selectedPermitClassCode === window.undefined || $scope.selectedPermitClassCode === null) && ($scope.permitClassObsoleteSelected !== 'Y' 
			&& $scope.permitClassObsoleteSelected !== 'N')  && ($scope.selectedPermitClassName === window.undefined || $scope.selectedPermitClassName === null) &&
			($scope.permitClassMileageTypeSelected === "" || $scope.permitClassMileageTypeSelected === null || $scope.permitClassMileageTypeSelected === window.undefined)){
			$scope.cdPermitClasses = $scope.tempPermitClasses;
		}else{
			$scope.cdPermitClasses = $scope.tempPermitClasses;
			updatePermitClassObsolete($scope.cdPermitClasses);
			updatePermitClassName($scope.cdPermitClasses);
			updatePermitClassCode($scope.cdPermitClasses);
			updatePermitClassMileageType($scope.cdPermitClasses);
		}
	};
	
	$scope.searchPermitClassName = function(name){
		if(!$rootScope.filterSpecialChar(name)){
			var permitClassPromise = SystemService.searchPermitClassName(name);
			$q.all([permitClassPromise]).then(function(data){
				$scope.permitClassNames = data[0];
			});
		}else{
			$rootScope.errorDialog("Please use either alphabets or numbers to search.");
		}
	};
	
	$scope.onSelectPermitClassName = function($item){
		$scope.updatePermitClass();
	};
	
	$scope.searchPermitClassCode = function(code){
		if(!$rootScope.filterSpecialChar(code)){
			var permitClassPromise = SystemService.searchPermitClassCode(code);
			$q.all([permitClassPromise]).then(function(data){
				$scope.permitClassCodes = data[0];
			});
		}else{
			$rootScope.errorDialog("Please use either alphabets or numbers to search.");
		}
	};
	
	$scope.onSelectPermitClassCode = function($item){
		$scope.updatePermitClass();
	};
	
	$scope.permitClassNameChange = function(){
		if($scope.selectedPermitClassName !== window.undefined || $scope.selectedPermitClassName !== null){
			$scope.updatePermitClass();
		}
	};
	
	$scope.permitClassCodeChange = function(){
		if($scope.selectedPermitClassCode !== window.undefined || $scope.selectedPermitClassCode !== null){
			$scope.updatePermitClass();
		}
	};
	
	updatePermitClassName = function(permitClasses){
		if($scope.selectedPermitClassName !== window.undefined && $scope.selectedPermitClassName !== null){
			var permitClassArray = [];
			_.each(permitClasses, function(permitClass){
				if(permitClass.name == $scope.selectedPermitClassName){
					permitClassArray.push(permitClass);
				}
			});
			$scope.cdPermitClasses = permitClassArray;	
		}
	};
	
	updatePermitClassCode = function(permitClasses){
		if($scope.selectedPermitClassCode !== window.undefined && $scope.selectedPermitClassCode !== null){
			var permitClassArray = [];
			_.each(permitClasses, function(permitClass){
				if(permitClass.code == $scope.selectedPermitClassCode){
					permitClassArray.push(permitClass);
				}
			});
			$scope.cdPermitClasses = permitClassArray;	
		}
	};
	
	updatePermitClassMileageType = function(permitClasses) {
		if($scope.permitClassMileageTypeSelected !== "" && $scope.permitClassMileageTypeSelected !== null && $scope.permitClassMileageTypeSelected !== window.undefined){
			var permitClassesArray = [];
			_.each(permitClasses, function(permitClass){
				if(permitClass.mileageType == $scope.permitClassMileageTypeSelected){
					permitClassesArray.push(permitClass);
				}
			});
			$scope.cdPermitClasses = permitClassesArray;
		}
	};
	
	updatePermitClassObsolete = function(permitClasses){
		if($scope.permitClassObsoleteSelected === 'Y' || $scope.permitClassObsoleteSelected === 'N') {
			var permitClassesArray = [];
			_.each(permitClasses, function(permitClass){
				if(permitClass.obsolete == $scope.permitClassObsoleteSelected){
					permitClassesArray.push(permitClass);
				}
			});
			$scope.cdPermitClasses = permitClassesArray;
		}
	};
	
	$scope.showPermitClass = function(permitClass){
		if(permitClass == null){
			$scope.selectedPermitClass = {};
			$scope.selectedPermitClass.isEdit = false;
		}else{
			$scope.selectedPermitClass.code = permitClass.code;
			$scope.selectedPermitClass.name = permitClass.name;
			$scope.selectedPermitClass.mileageType = permitClass.mileageType;
			$scope.selectedPermitClass.obsolete = permitClass.obsolete;
			$scope.selectedPermitClass.isEdit = true;
		}
		$('#addEditPermitClassModal').modal({backdrop:'static'});
	};
	
	$scope.saveUpdatePermitClass = function(){
		var saveUpdatePermitClassPromise = SystemService.saveUpdatePermitClass($scope.selectedPermitClass);
		$q.all([saveUpdatePermitClassPromise]).then(function(message){
			$scope.$root.infoDialog(message[0]);
			var permitClassPromise = SystemService.getPermitClasses();
			$q.all([permitClassPromise]).then(function(data){
				$scope.cdPermitClasses = data[0];
				$scope.tempPermitClasses = data[0];
				$scope.updatePermitClass();
			});
		});
	};
	
	// Venue
	
	$scope.updateVenue = function() {
		if(($scope.selectedVenueName === window.undefined || $scope.selectedVenueName === null) && ($scope.selectedVenueType === window.undefined || $scope.selectedVenueType === null)&&
				$scope.selectedVenueObsolete !== 'N' && $scope.selectedVenueObsolete !== 'Y'){
			$scope.cdVenues = $scope.tempVenues;
		}else{
			$scope.cdVenues = $scope.tempVenues;
			updateVenueName($scope.cdVenues);
			updateVenueType($scope.cdVenues);
			updateVenueObsolete($scope.cdVenues);
		}
		
	};
	
	$scope.venueNameChange = function(){
		if($scope.selectedVenueName !== window.undefined || $scope.selectedVenueName !== null){
			$scope.updateVenue();
		}
	};
	
	updateVenueName = function(venues){
		if($scope.selectedVenueName !== window.undefined && $scope.selectedVenueName !== null){
			var venueArray = [];
			_.each(venues, function(venue){
				if(venue.name == $scope.selectedVenueName){
					venueArray.push(venue);
				}
			});
			$scope.cdVenues = venueArray;	
		}
	};
	
	updateVenueType = function(venues){
		if($scope.selectedVenueType != window.undefined && $scope.selectedVenueType != null){
			var venueArray = [];
			_.each(venues, function(venue){
				if(venue.type == $scope.selectedVenueType){
					venueArray.push(venue);
				}
			});
			$scope.cdVenues = venueArray;
		}
	};
	
	$scope.venueTypeChange = function(){
		if($scope.selectedVenueType !== window.undefined || $scope.selectedVenueType !== null){
			$scope.updateVenue();
		}
	};
	
	$scope.onSelectVenue = function(){
		
		$scope.updateVenue();
	};
	
	updateVenueObsolete = function(venues){
		if($scope.selectedVenueObsolete === 'Y' || $scope.selectedVenueObsolete === 'N') {
			var venuesArray = [];
			_.each(venues, function(venue){
				if(venue.obsolete == $scope.selectedVenueObsolete){
					venuesArray.push(venue);
				}
			});
			$scope.cdVenues = venuesArray;
		}
	};
	
	$scope.searchVenueName = function(name){
		if(!$rootScope.filterSpecialChar(name)){
			var venuePromise = SystemService.searchVenueName(name);
			$q.all([venuePromise]).then(function(data){
				$scope.venues = data[0];
			});
		}else{
			$rootScope.errorDialog("Please use either alphabets or numbers to search.");
		}
	};
	
	$scope.onSelectVenueType = function(){
		$scope.updateVenue();
	};
	
	$scope.searchVenueTypeName = function(name){
		if(!$rootScope.filterSpecialChar(name)){
			var venueTypePromise = SystemService.searchVenueTypeName(name);
			$q.all([venueTypePromise]).then(function(data){
				$scope.venueTypeNames = data[0];
			});
		}else{
			$rootScope.errorDialog("Please use either alphabets or numbers to search.");
		}
	};
	
	$scope.showVenue = function(venue){
		if(venue==null){
			$scope.selectedVenue = {};
			$scope.selectedVenue.isEdit = false;
		}else{
			$scope.selectedVenue.id = venue.id;
			$scope.selectedVenue.name = venue.name;
			$scope.selectedVenue.typeId = venue.typeId;
			$scope.selectedVenue.type = venue.type;
			$scope.selectedVenue.isEdit = true;
			$scope.selectedVenue.obsolete = venue.obsolete;
		}
		$('#addEditVenueModal').modal({backdrop:'static'});
	};
	
	$scope.saveUpdateVenue = function(){
		var saveUpdateVenuePromise = SystemService.saveUpdateVenue($scope.selectedVenue);
		$q.all([saveUpdateVenuePromise]).then(function(message){
			$scope.$root.infoDialog(message[0]);
			var venuePromise = SystemService.getVenues();
			$q.all([venuePromise]).then(function(data){
				$scope.cdVenues = data[0];
				$scope.tempVenues = data[0];
				$scope.updateVenue();
			});
		});
	};
	
	
	
	$scope.deleteMasterData = function(typeCode,code,id){
		var masterDataDeleteDTO = new Object();
		masterDataDeleteDTO.type = typeCode;
		if(code != null) {
			masterDataDeleteDTO.code = code;
		}
		if(id != null) {
			masterDataDeleteDTO.id = id;
		}
		var deleteMasterDataPromise = SystemService.deleteMasterData(masterDataDeleteDTO);
		$q.all([deleteMasterDataPromise]).then(function(message){
			$scope.$root.infoDialog(message[0]);
			var towTypePromise = SystemService.getTowTypes();
			$q.all([towTypePromise]).then(function(data){
				$scope.cdTowTypes = data[0];
			});
		});
	};
	
});

