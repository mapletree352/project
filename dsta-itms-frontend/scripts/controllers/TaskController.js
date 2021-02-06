app.controller('TaskSearchController', function($q, $scope, $location,$stateParams, TaskService, CommonService, Constants, Upload) {
	if(!$scope.$root.checkAccessRights('showSearchTasks')){return;}
	$scope.confirmRecords = [];
	$scope.showHidden = {nsIndentShow:false, bookOutShow:false, bookInShow: false};
	$scope.selectedTaskIdArray = [];
	$scope.maxHour = moment().add(Constants.BOOK_IN_OUT_MAXHOURS, 'hours');
	$scope.unitMaxDate = Constants.UNIT_CAT_MAX_STARTDATE_SEARCH;
	$scope.input = {dateRange:''};
	var isSearchOnLoad = ($stateParams.statusCode != window.undefined);
	var statusesPromise = CommonService.getStatuses("TASK");
	var nodesPromise = CommonService.getNodes();
	var vehicleTypesPromise = CommonService.getVehicleTypes();
	var resourceTypesPromise = CommonService.getResourceTypes();
	var hubPromise = CommonService.getHubs();
	$scope.advSearchCollapsed = true;
	$scope.checkboxes = { all: false, records: {} };
	$scope.searchDTO = { startIndex:0, pageSize:Constants.PAGE_SIZE, order: "", orderProperty:"", statusCode:""};
	$scope.$root.limitAccess($scope.searchDTO);
	$scope.initialSort = isSearchOnLoad ? 'asc' : 'desc';
	
	if(isSearchOnLoad){
		$scope.searchDTO.statusCode = $stateParams.statusCode;
	}
	
	$q.all([ statusesPromise, nodesPromise, vehicleTypesPromise, resourceTypesPromise, hubPromise ]).then(function(data) {
		$scope.statuses = data[0];
		$scope.nodes = data[1];
		$scope.vehicleTypes = data[2];
		$scope.resourceTypes = data[3];
		$scope.hubs = data[4];
	});
	
	$scope.checkAll = function() {
		_.each($scope.records, function(record) {
			$scope.checkboxes.records[record.id] = $scope.checkboxes.all;
		});
	};
	
	$scope.paginate = function(tableState) {
		$scope.checkboxes = { all: false, records: {} };
		if (CommonService.initPagination($scope, tableState)) {
			CommonService.setPaginationSearch($scope, tableState);
			var resultPromise = TaskService.searchTasks($scope.searchDTO);
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
		if ($scope.$root.session.userRole.cat === Constants.USER_ROLE_CAT_UNIT) {
			$scope.searchDTO.startDateRange = $scope.input.startDateRange;
			$scope.searchDTO.endDateRange = $scope.input.endDateRange;
		}
		if(isSearchOnLoad) {
			CommonService.search($scope, "startDate");
		} else {
			CommonService.search($scope, "id");
		}
	};
	
	$scope.reset = function() {
		CommonService.resetPagination($scope, 0, Constants.PAGE_SIZE);
		$scope.searchDTO = { startIndex:0, pageSize:Constants.PAGE_SIZE, order: "", orderProperty:"" };
		$scope.input = {};
		$scope.$root.limitAccess($scope.searchDTO);
	};
	
	$scope.bookInOutClick = function(type,tableState){
    	$scope.selectedTaskArray = [];
    	$scope.confirmRecords = [];
    	$scope.selectedTaskIdArray = [];
    	$scope.confirmDateTime = moment();
    	$scope.showHidden.nsIndentShow = false;
    	_.each($scope.records, function(record){
    		if (!!$scope.checkboxes.records[record.id]){
    			$scope.selectedTaskIdArray.push(record.id);
    			$scope.selectedTaskArray.push(record);
    		}	
    	});
    	
    	if(type == 'bookIn'){
    		$scope.confirmRecords = $scope.selectedTaskArray;
        	$scope.showHidden.bookOutShow = false;
        	$scope.showHidden.bookInShow = true;
        	$scope.showHidden.nsIndentShow = false;
    	} else {
    		var isContinue = true;
    		$scope.confirmRecords = $scope.selectedTaskArray;
        	_.each($scope.confirmRecords, function(confirmRecord){
        		if(isContinue == true){
        			if(confirmRecord.nsIndentFlag == "Y"){
        				$scope.showHidden.nsIndentShow = true;
        				isContinue = false;
        			}
        		}
        	});
        	$scope.showHidden.bookOutShow = true;
        	$scope.showHidden.bookInShow = false;
    	}
    };

    $scope.isNSindent = function(){
    	if($scope.showHidden.nsIndentShow == true && !$scope.isBookOut()){
    		return true;
    	}else{
    		return false;
    	}
    };
    
    $scope.isBookOut = function(){
    	if($scope.showHidden.bookOutShow == true && $scope.showHidden.nsIndentShow == false){
    		return true;
    	}else{
    		return false;
    	}
    };
    
    $scope.isBookIn = function(){
    	if($scope.showHidden.bookInShow == true){
    		return true;
    	}else{
    		return false;
    	}
    };
    
    $scope.confirmBookOut = function() {
    	var taskConfirmBookInOutDTO = new Object();
		taskConfirmBookInOutDTO.taskIds = $scope.selectedTaskIdArray;
		taskConfirmBookInOutDTO.confirmDateTime = $scope.confirmDateTime;
		var confirmBookOutDriverPromise = TaskService.confirmBookOutDriver(taskConfirmBookInOutDTO);
		$q.all([ confirmBookOutDriverPromise ]).then(function(data) {
			$scope.$root.infoDialog(data[0]);
			$scope.search();
		});
    };
    
    $scope.confirmBookIn = function() {
		var taskConfirmBookInOutDTO = new Object();
		taskConfirmBookInOutDTO.taskIds = $scope.selectedTaskIdArray;
		taskConfirmBookInOutDTO.confirmDateTime = $scope.confirmDateTime;
		var confirmBookInDriverPromise = TaskService.confirmBookInDriver(taskConfirmBookInOutDTO);
		$q.all([ confirmBookInDriverPromise ]).then(function(data) {
			$scope.$root.infoDialog(data[0]);
			$scope.search();
		});
    };
    
    $scope.uploadFile = function(file, errFiles) {
        if (file) {
        	var isContinue = true;
        	var isAllNSIndent = true;
        	
    		_.each($scope.confirmRecords, function(confirmRecord){
        		if(isContinue == true){
        			if(confirmRecord.nsIndentFlag == Constants.FLAG_NO){
        				isAllNSIndent = false;
        				isContinue = false;
        			}
        		}
        	});
    		
    		if (isAllNSIndent == false) {
    			$scope.$root.errorDialog("Please select all NS Indent or Not NS Indent only.");
    		} else {
    			var taskConfirmBookInOutDTO = new Object();
        		taskConfirmBookInOutDTO.taskIds = $scope.selectedTaskIdArray;
        		taskConfirmBookInOutDTO.confirmDateTime = $scope.confirmDateTime;
        		var uploadIndentTOPromise = TaskService.uploadIndentTO(taskConfirmBookInOutDTO,file);
        		$q.all([ uploadIndentTOPromise ]).then(function(data) {
        			$scope.$root.infoDialog(data[0]);
        			$scope.search();
    			});
        		
        		file.upload = Upload.upload({
        			url: Constants.BASE_URL + '/task/bookoutNSIndentTO',
        			method: 'POST',
        			data: { file: file, token: $scope.$root.session.token, taskConfirmBookInOutDTO: taskConfirmBookInOutDTO }
        		});
        		
        		file.upload.then(function (response) {
        			$timeout(function () {
        				$scope.$root.infoDialog(response.data);
        				$scope.search();
        			});
        		});
        	}
    	} else {
        	$scope.$root.errorDialog("Error in opening file.");
        }
    }
    
    if(isSearchOnLoad) {
		$scope.$watch('tableState', function() {
			if ($scope.tableState) {
				$scope.search();
			}
	    });	
	}
});

app.controller('TaskController', function($q, $scope, $stateParams, TaskService, CommonService, Constants) {
	if(!$scope.$root.checkAccessRights('showSearchTasks')){return;}
	$scope.selectedTaskDetail;
	$scope.selectedType = {type:""};
	$scope.checkBookOut = {isBookOut:false};
	$scope.moreCriteriaCollapsed = true;
	$scope.checkboxes = { all: false, records: {} };
	$scope.adjustMileage = {adjustedMileage:0, currentMileage:0, adjustmentReason:"", taskDetailId:null};
	$scope.searchDTO = { startIndex:0, pageSize:Constants.PAGE_SIZE };
	$scope.selectedResource;
	$scope.maxDate = moment().add(Constants.BOOK_IN_OUT_MAXHOURS, 'hours');

	var taskPromise = TaskService.getTask($stateParams.taskId);
	var towTypePromise = CommonService.getTowTypes('N');
	var proficiencyPromise = CommonService.getProficiencies('N');
	var nodePromise = CommonService.getNodes();
	var unitPromise = CommonService.getUnits();
	var hubPromise = CommonService.getHubs();
	var drivingCatPromise = CommonService.getDrivingCategories();
	var pesPromise = CommonService.getPeses();
	var securityCatPromise = CommonService.getSecurityCategories();
	var vehicleTypePromise = CommonService.getVehicleTypes('N');
	
	$q.all([ taskPromise,towTypePromise,proficiencyPromise,nodePromise,unitPromise,drivingCatPromise,pesPromise,securityCatPromise,vehicleTypePromise, hubPromise]).then(function(data) {
		$scope.task = data[0];
		$scope.towTypes = data[1];
		$scope.proficiencies1 = data[2];
		$scope.nodes = data[3];
		$scope.units = data[4];
		$scope.licenseCategories = data[5];
		$scope.peses = data[6];
		$scope.securityCategories = data[7];
		$scope.vehicleTypes = data[8];
		$scope.hubs = data[9];
		$scope.minDateTime = formatDate($scope.task.taskStartDate);
		$scope.maxDateTime = formatDate($scope.task.taskEndDate);
		
	});
	
	$scope.checkAll = function() {
		_.each($scope.taskDetails, function(record) {
			$scope.checkboxes.records[record.id] = $scope.checkboxes.all;
		});
	};
	
	$scope.isSwitchTask = function(taskDetails){
		var isSwitch = false;
		_.each(taskDetails, function(taskDetail){
			if(taskDetail.isSwitchTask){
				isSwitch = true;
			}
		});
		
		if(isSwitch){
			return true;
		}else{
			return false;
		}
		
	};
	
	$scope.isBookOut = function(taskDetails){
		var isBookOut = false;
		_.each(taskDetails, function(taskDetail){
			if(taskDetail.status == "Booked Out" || taskDetail.status == "Temporary Book Out"){
				isBookOut = true;
			}
		});
		
		if(isBookOut){
			return true;
		}else{
			return false;
		}
		
	};
	
	$scope.showBookOut = function(taskDetail){
		return (taskDetail.status === "Booked Out" || taskDetail.status === "Book Out (Resumed)") && taskDetail.driverName !== "DRIVER NOT REQUIRED";
	};
	
	$scope.bookInOut = function(record,isBookOut){
		$scope.selectedTaskDetail = record;
		$scope.checkBookOut.isBookOut = isBookOut;
		$scope.confirmDateTime = moment();
	};
	
	$scope.showDetail = function(type,record){
		$scope.selectedTaskDetail = {};
		$scope.vehicleResults = {};
		$scope.driverResults = {};
		if(type == "changeDriver"){
			$scope.selectedTaskDetail = record;
			$scope.selectedType.type = "changeDriver";
			$scope.searchDTO = { startIndex:0, pageSize:Constants.PAGE_SIZE };
			$scope.$root.limitAccess($scope.searchDTO);
			$scope.searchDTO.vehicleTypeId = $scope.task.indentVehicleTypeId;
			$scope.searchDTO.taskDetailId = record.id;
			$scope.searchDTO.detailPeriodRange = record.startDate + " to " + record.endDate;
			$scope.searchDTO.isBufferedTO = "false";
			$scope.searchDTO.isTL = "false";
			$scope.searchDTO.isDriverTrainee = "false";
			$scope.searchDTO.isNoRestDriver = "false";
			$scope.searchDTO.driverOrigin = 1;
			$scope.searchDTO.towTypeIds = $scope.task.indentTowTypeIds;
			$scope.searchDTO.proficiencyIds = $scope.task.indentProficiencyIds;
			$scope.searchDTO.taskId = $scope.task.id;
			$scope.showDriverResults(false);
		}else if(type == "changeVehicle"){
			if($scope.task.parkdownFlag == 'Y'){
				$scope.$root.infoDialog("Please assign Vehicle at the Normal Task to reflect the changes in ParkDown Task.");
			}else{
				$scope.selectedType.type = "changeVehicle";
				$scope.selectedTaskDetail = record;
				$scope.searchDTO = { startIndex:0, pageSize:Constants.PAGE_SIZE };
				$scope.$root.limitAccess($scope.searchDTO);
				$scope.searchDTO.vehicleTypeId = $scope.task.indentVehicleTypeId;
				$scope.searchDTO.taskDetailId = record.id;
				$scope.searchDTO.isBuffered = "false";
				$scope.searchDTO.detailPeriodRange = record.startDate + " to " + record.endDate;
				$scope.searchDTO.taskId = $scope.task.id;
				$('#changeVehicleModal').modal({ backdrop:'static' });
				$scope.showVehicleResults(false);
			}
		}else{
			$scope.selectedType.type = "splitDetail";
			$scope.searchDTO.taskId = $scope.task.id;
			$scope.searchDTO = { startIndex:0, pageSize:Constants.PAGE_SIZE };
		}

		
		//CommonService.resetPagination($scope, 0, Constants.PAGE_SIZE);
	};
	
	var reload = function(tableState){
		$scope.checkboxes = { all: false, records: {} };
		var taskPromise = TaskService.getTask($stateParams.taskId);
		$q.all([ taskPromise]).then(function(data) {
			$scope.task = data[0];
			$scope.confirmDateTime = null;
		});	
	};

	
	$scope.getAllSwitchTask = function(taskDetails){
		var switchTaskUsers = [];
		_.each(taskDetails,function(taskDetail){
			if(taskDetail.isSwitchTask){
				if(!($scope.task.parkdownFlag=='Y' && switchTaskUsers.length==1)){
					switchTaskUsers.push(taskDetail);
				}
			}
		});
		$scope.selectedTaskDetail = switchTaskUsers; 
		$scope.confirmDateTime = moment();
	};
	
	$scope.amendDetailClick = function(record){
		$scope.amendDetail = {detailDateRange:""};
		$scope.selectedTaskDetail = record;
		$scope.amendDetail.detailDateRange = record.startDate + " to " + record.endDate;
	};
	
	$scope.adjustMileageClick = function(record){
		$scope.adjustMileage.adjustmentReason = "";
		$scope.adjustMileage.currentMileage = record.mileage;
		$scope.adjustMileage.adjustedMileage= record.mileage;
		$scope.adjustMileage.taskDetailId = record.id;
	};
	
	$scope.unassignClick = function(type,record){
		var content = "";
		var taskDetailChangeDTO = new Object();
		taskDetailChangeDTO.taskDetailId = record.id;
		if(type == "vehicle" && $scope.task.parkdownFlag == 'Y'){
			$scope.$root.infoDialog("Please assign Vehicle at the Normal Task to reflect the changes in ParkDown Task.");
		}else{
			if(type == "vehicle"){
				
				content = "Are you sure you want to assign the following vehicle to Task Detail : <br>";
				content += "Vehicle: ";
				if(record.vehicleNo!=null){
					content	+= record.vehicleNo + " (" + record.vehicleType + ")<br>";
				}
				taskDetailChangeDTO.isUnassignDriver = false;
				
			}else{
				content = "Are you sure you want to assign the following driver to Task Detail : <br>";
				content += "Driver: "; 
				if(record.driverName!=null){
					content	+= record.driverName + " (" + record.driverNric + ")<br>";
				}
				taskDetailChangeDTO.isUnassignDriver = true;
			}
			
			$scope.$root.confirmDialog(content,$scope.confirmUnassign,taskDetailChangeDTO);
		}	
	};

	$scope.confirmSwitchTask = function(taskDetailDTO){
		var taskDetailConfirmBookInOutDTO = new Object();
		taskDetailConfirmBookInOutDTO.taskDetailId = taskDetailDTO.id;
		taskDetailConfirmBookInOutDTO.confirmDateTime = $scope.confirmDateTime;
		var switchTaskPromise = TaskService.switchTask(taskDetailConfirmBookInOutDTO);
		$q.all([switchTaskPromise]).then(function(data){
			$scope.$root.infoDialog(data[0]);
			reload();
		});
	};
	
	$scope.confirmBookInOut = function(){

		var taskDetailConfirmBookInOutDTO = new Object();
		taskDetailConfirmBookInOutDTO.taskDetailId = $scope.selectedTaskDetail.id;
		taskDetailConfirmBookInOutDTO.confirmDateTime = $scope.confirmDateTime;
		var bookInOutTaskDetailPromise = TaskService.bookInOutTaskDetail(taskDetailConfirmBookInOutDTO);
		$q.all([bookInOutTaskDetailPromise]).then(function(data){
			$scope.$root.infoDialog(data[0]);
			reload();
		});
		
	};
	
	$scope.adjustMileageConfirmation = function(){
		var content = "Do you want to proceed to adjust mileage for the selected task detail? <br>";
    	$scope.$root.confirmDialog(content,$scope.confirmAdjustMileage,null);
	};
	
	$scope.confirmAdjustMileage = function(){
		var adjustMileagePromise = TaskService.adjustMileage($scope.adjustMileage);
		$q.all([adjustMileagePromise]).then(function(data){
			$scope.$root.infoDialog(data[0]);
			reload();
			$('#adjustMileageModal').modal('hide');
		});
	};
	
	$scope.removeSelectedDetails = function(){
    	var taskDetailIds = [];
    	_.each($scope.taskDetails, function(record){
    		if (!!$scope.checkboxes.records[record.id]){
    			taskDetailIds.push(record.id);
    		}	
    	});
    	
    	var content = "Do you want to proceed to remove following selected task detail(s) <br>";
    	$scope.$root.confirmDialog(content,$scope.confirmRemoveSelectedDetails,taskDetailIds);
    	
	};
	
	$scope.confirmRemoveSelectedDetails = function(taskDetailIds){

    	var removeTaskDetailsPromise = TaskService.removeTaskDetails(taskDetailIds);
    	$q.all([removeTaskDetailsPromise]).then(function(data){
    		$scope.$root.infoDialog(data[0]);
    		reload();
    	});
	
	}
	
	$scope.confirmAssignVehicle = function() {
		var assignVehiclePromise = TaskService.assignVehicle($scope.selectedVehicle);
		$q.all([assignVehiclePromise]).then(function(data){
			$('#changeVehicleModal').modal('hide');
			$scope.$root.infoDialog(data[0]);
			reload();
		});
	};
	
	$scope.confirmResourceDialog = function(record){
		$scope.remark = "";
		$scope.selectedResource = record;
		if($scope.selectedType.type == "splitDetail"){
			var content = "Do you want to proceed to add detail on " + $scope.searchDTO.detailPeriodRange;
			$scope.$root.confirmDialog(content,$scope.confirmSplitDetail,null);
		}else{
			$('#resourceConfirmDialog').modal({ backdrop:'static' });
		}
	};
	
	$scope.confirmAdjustDetail = function(){
		
		var taskDetailChangeDTO = new Object();
		
		taskDetailChangeDTO.taskDetailId = $scope.selectedTaskDetail.id;
		taskDetailChangeDTO.detailPeriodRange = $scope.amendDetail.detailDateRange;
		taskDetailChangeDTO.taskId = $scope.task.id;
		
		var adjustDetailPromise = TaskService.adjustDetail(taskDetailChangeDTO);
		$q.all([adjustDetailPromise]).then(function(data){
			$scope.$root.infoDialog(data[0]);
			reload();
		});
	};
	
	$scope.confirmUnassign = function(taskDetailChangeDTO){
		var unassignPromise = TaskService.unassign(taskDetailChangeDTO);
		$q.all([unassignPromise]).then(function(data){
			$scope.$root.infoDialog(data[0]);
			reload();
		});
	};
	
	$scope.confirmSplitDetail = function(){
		var taskDetailChangeDTO = new Object();

		taskDetailChangeDTO.taskId = $scope.task.id;
		taskDetailChangeDTO.detailPeriodRange = $scope.searchDTO.detailPeriodRange;
		var addChangeDetailPromise = TaskService.splitDetail(taskDetailChangeDTO);
		$q.all([addChangeDetailPromise]).then(function(data){
			$scope.$root.infoDialog(data[0]);
			$('#AddDetailModal').modal('hide');
			reload();
		});
		
	};
	
	$scope.confirmChangeVehicleDriver = function() {
		var taskDetailChangeDTO = new Object();
		taskDetailChangeDTO.taskId = $scope.task.id;
		taskDetailChangeDTO.detailPeriodRange = $scope.searchDTO.detailPeriodRange;
		if($scope.selectedTaskDetail !=null){
			taskDetailChangeDTO.taskDetailId = $scope.selectedTaskDetail.id;
		}
		taskDetailChangeDTO.remark = $scope.remark;
		if($scope.selectedType.type == "changeDriver"){
			//for change driver
			taskDetailChangeDTO.driverId = $scope.selectedResource.id;
			var addChangeDetailPromise = TaskService.assignDriver(taskDetailChangeDTO);
			$q.all([addChangeDetailPromise]).then(function(data){
				$scope.$root.infoDialog(data[0]);
				$('#ChangeDriverModal').modal('hide');
				reload();
			});
		}else{
			//for change vehicle
			taskDetailChangeDTO.vehicleId = $scope.selectedResource.id;
			var checkVehiclePromise = TaskService.checkVehicle(taskDetailChangeDTO);
			$q.all([checkVehiclePromise]).then(function(data){
				$scope.selectedVehicle = data[0];
				if($scope.selectedVehicle.isDriverFam && $scope.selectedVehicle.isSameType){
					$scope.confirmAssignVehicle();
				}else{
					var content = "";
					content = "Please note that: <br>";
					if(!$scope.selectedVehicle.isDriverFam){
						content += "- Driver does not have a Vehicle Familiarisation on the assigned Vehicle Type. If you continue to assign the Vehicle, the Driver will be un-assign.<br>";
					}
					if(!$scope.selectedVehicle.isSameType){
						content += "- The vehicle type is not same as the Task vehicle type.<br>"; 
					}
					$scope.$root.confirmDialog(content,$scope.confirmAssignVehicle,null);
				}

			});
		};
	};
	
	$scope.bestMatchVehicleDriver = function(type){
		if(type == "vehicle"){
			$scope.vehicleResults = {};
			var vehicleResultPromise = TaskService.searchTaskVehicle($scope.searchDTO);
			$q.all([vehicleResultPromise]).then(function(data){
				$scope.vehicleBestMatchResults = data[0];
				
				if($scope.vehicleBestMatchResults.length==0){
					$scope.$root.infoDialog("No best match result found.");
				}else{
					$scope.confirmResourceDialog($scope.vehicleBestMatchResults[0]);
				}
			});
		}else{
			$scope.driverResults={};
			var resultPromise = TaskService.searchTaskDriver($scope.searchDTO);
			$q.all([ resultPromise ]).then(function(data) {
				$scope.driverBestMatchResults = data[0];
				
				if($scope.driverBestMatchResults.length==0){
					$scope.$root.infoDialog("No best match result found.");
				}else{
					$scope.confirmResourceDialog($scope.driverBestMatchResults[0]);
				}
			});
		}
		
	};
	
	$scope.showDriverResults = function(isAutoSearch){
		$scope.driverResults={};
		var resultPromise = TaskService.searchTaskDriver($scope.searchDTO);
		$q.all([ resultPromise ]).then(function(data) {
			$scope.driverResults = data[0];
			
			if($scope.driverResults.length===0){
				if(isAutoSearch){
					$scope.$root.infoDialog("No result found.");
				}
			}
		});
	};
	
	$scope.showVehicleResults = function(isAutoSearch){
		$scope.vehicleResults = {};
		var vehicleResultPromise = TaskService.searchTaskVehicle($scope.searchDTO);
		$q.all([vehicleResultPromise]).then(function(data){
			$scope.vehicleResults = data[0];
			
			if($scope.vehicleResults.length===0){
				if(isAutoSearch){
					$scope.$root.infoDialog("No result found.");
				}
			}
		});
		
	};
	
	var formatDate = function(oldDate){
		var arrayDate = oldDate.split("-");
		var year = arrayDate[2].split(" ");
		var time = year[1].split(":");
		var month = (new Date(Date.parse(arrayDate[1] +" 1, 2012"))).getMonth();
		
		return moment({ y    :year[0], M     :month, d   :arrayDate[0], h    :time[0], m      :time[1]});
	};
	
	$scope.getAuditLog = function(tableState) {
    	$scope.searchDTO = { startIndex:0, pageSize:Constants.PAGE_SIZE, entityId:$scope.task.id, entity:'TaskController' };
    	
    	CommonService.initPagination($scope, tableState);
        CommonService.setPaginationSearch($scope, tableState);
        var auditLogPromise = CommonService.getAuditLog($scope.searchDTO);
        $q.all([ auditLogPromise ]).then(function(data) {
        	CommonService.setPaginationResult($scope, tableState, data);
        	$scope.tableState = tableState;
        });
    }
	
	/*$scope.paginate = function(tableState) {
	if (CommonService.initPagination($scope, tableState)) {
		CommonService.setPaginationSearch($scope, tableState);
		var resultPromise = TaskService.searchTaskDriver($scope.searchDTO);
		$q.all([ resultPromise ]).then(function(data) {
			CommonService.setPaginationResult($scope, tableState, data);
		});
	}
};*/
	
});

app.controller('CreditRefundApprovalController', function($q, $scope, $stateParams, TaskService, CommonService, Constants) {
	if(!$scope.$root.checkAccessRights('showCreditRefundApproval')){return;}
	$scope.decisions = [];
	$scope.searchDTO = { startIndex:0, pageSize:Constants.PAGE_SIZE, statusCode:Constants.TASK_UNFULFILL_PENDING};
	var firstLoad = true;
		
	$scope.paginate = function(tableState){
		if (CommonService.initPagination($scope, tableState)) {
			CommonService.setPaginationSearch($scope, tableState);
			var resultPromise = TaskService.searchTasks($scope.searchDTO);
			$q.all([ resultPromise ]).then(function(data) {
				CommonService.setPaginationResult($scope, tableState, data);
				_.each(data[0].records, function(record) {
					$scope.decisions[record.id] = { id: record.id, decision:'UNDECIDED', decisionReason:'' };
				});
				if ($scope.records.length === 0 && firstLoad) {
					$scope.$root.infoDialog("No result found.");
				}
			});
		}
	};
	
	$scope.search = function() {
		CommonService.resetPagination($scope, 0, Constants.PAGE_SIZE);
		CommonService.search($scope, "startDate");
	};
	
	$scope.submitCreditApproval = function(tableState){
		$scope.$root.confirmDialog("Are you sure you want to approve and/or reject the Credit Refunds?", $scope.submit,tableState);
	}
	
	$scope.submit = function(tableState) {
		var confirmedDecisions = [];
		_.each($scope.records, function(record) {
			if ($scope.decisions[record.id].decision != 'NO') {
				$scope.decisions[record.id].decisionReason = ''; // reset rejection reason
			}
			if ($scope.decisions[record.id].decision != 'UNDECIDED') {
				confirmedDecisions.push($scope.decisions[record.id]); // only send decided records
			}
		});
		var resultPromise = TaskService.submitCreditRefundApprovals(confirmedDecisions);
		$q.all([ resultPromise ]).then(function(result) {
			$scope.$root.infoDialog(result[0]);
			$scope.decisions = [];
			$scope.count=0;
			$('[dcBtnName|="all"]').removeClass('active btn-success btn-danger btn-warning').addClass('btn-default');
			$scope.search();	
		});	
	};
	
	$scope.decideAll = function(allDecision) {
		_.each($scope.records, function(record) {
			$scope.decisions[record.id].decision = allDecision;
		});
	};
	
	$scope.$watch('tableState', function() {
		if ($scope.tableState) {
			$scope.search();
			firstLoad = false;
		}
    });
});
