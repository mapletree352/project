app.controller('DriverPermitSearchController', function($q, $scope, DriverPermitService, CommonService, Constants) {
	if(!$scope.$root.checkAccessRights('showSearchSafDrivingPermits')){return;}
	var statusesPromise = CommonService.getStatuses("PERMIT");
	var permitClassesPromise = CommonService.getPermitClasses();
	var permitTypesPromise = CommonService.getPermitTypes();
	var testersPromise = DriverPermitService.getPermitTesters('A');
	$scope.advSearchCollapsed = true;
	$scope.searchDTO = { startIndex:0, pageSize:Constants.PAGE_SIZE };
	$scope.checkboxes = { all: false, records: {} };
	
	$q.all([ statusesPromise, permitClassesPromise, permitTypesPromise,testersPromise ]).then(function(data) {
		$scope.statuses = data[0];
		$scope.permitClasses = data[1];
		$scope.permitTypes = data[2];
		$scope.testers = data[3];
	});
	
	$scope.paginate = function(tableState) {
		$scope.checkboxes = { all: false, records: {} };
		if (CommonService.initPagination($scope, tableState)) {
			CommonService.setPaginationSearch($scope, tableState);
			var resultPromise = DriverPermitService.searchDriverPermits($scope.searchDTO);
			$q.all([ resultPromise ]).then(function(data) {
				CommonService.setPaginationResult($scope, tableState, data);
				if (data[0].records.length == 0) {
					$scope.$root.infoDialog("No result found.");
				}
			});
		}
	};
	
	$scope.search = function() {
		CommonService.resetPagination($scope, 0, Constants.PAGE_SIZE);
		CommonService.search($scope, "permitNo");
	};
	
	$scope.checkAll = function() {
		_.each($scope.records, function(record) {
			$scope.checkboxes.records[record.permitNo] = $scope.checkboxes.all;
		});
	};
	
	$scope.setSelection = function(batchUpdate) {
		$scope.dto = { batchUpdate: batchUpdate, drivingPermitNos: [] };
		$scope.selectedDrivingPermits = [];
    	_.each($scope.records, function(record){
    		if ($scope.checkboxes.records[record.permitNo]){
    			$scope.selectedDrivingPermits.push({ drivingPermitNo:record.permitNo, drivingPermitType: record.permitType});
    			$scope.dto.drivingPermitNos.push(record.permitNo);
    		}
    	});    	
		if ($scope.selectedDrivingPermits.length == 0) {
			$scope.$root.errorDialog('Please select at least one record.');
		} else {
			$scope.batchUpdate = batchUpdate;
			$('#batchUpdateModal').modal({ backdrop:'static' });
		}
	};
	
	$scope.batchUpdateFunction = function() {
		var errors = DriverPermitService.validateBatchProperties($scope.dto);
    	if (errors.length > 0) {
    		$scope.$root.errorDialog(errors);
    	} else{
			var resultPromise = DriverPermitService.batchUpdateDrivingPermits($scope.dto);
			$q.all([ resultPromise ]).then(function(result) {
				$scope.$root.infoDialog(result[0]);
				$scope.search();
			});
    	}
	};
	
	$scope.download = function() {
		var resultPromise = DriverPermitService.exportDriverPermits($scope.searchDTO);
		$q.all([ resultPromise ]).then(function(data) {
			$scope.$root.exportFile(data[0], "text/plain", "driver_permits.xlsx");
		});
	};
	
	$scope.upload = function() {
		alert('upload');
	};
	
	$scope.reset = function() {
		CommonService.resetPagination($scope, 0, Constants.PAGE_SIZE);
		$scope.searchDTO = { startIndex:0, pageSize:Constants.PAGE_SIZE };
		$scope.driver = "";
	};
});

app.controller('DriverPermitController', function($q, $scope, $stateParams, DriverPermitService, CommonService, Constants) {
	if(!$scope.$root.checkAccessRights('showSearchSafDrivingPermits')){return;}
	var driverPermitPromise = DriverPermitService.getDriverPermit($stateParams.driverPermitId);
	var statusesPromise = CommonService.getStatuses("PERMIT");
	var permitClassesPromise = CommonService.getPermitClasses('N');
	var testersPromise = DriverPermitService.getPermitTesters('A');
	var supDriverPermitsPromise = DriverPermitService.getSupDriverPermits($stateParams.driverPermitId,$stateParams.driverNricNo);
	$scope.photoUrl = Constants.DEFAULT_PERSONNEL_PHOTO_URL;
	$scope.tab = 'permit';
	$scope.checkboxes = { all:false, records:{} };

	$q.all([ driverPermitPromise, statusesPromise, permitClassesPromise, testersPromise, supDriverPermitsPromise ]).then(function(data) {
		$scope.dto = data[0];
		$scope.statuses = data[1];
		$scope.permitClasses = data[2];
		$scope.testers = data[3];
		$scope.supDriverPermits = data[4];
		
		var photoUrlPromise = CommonService.getPersonnelPhotoUrl($stateParams.driverNricNo);
		$q.all([ photoUrlPromise ]).then(function(urlData) {
			$scope.photoUrl = urlData[0] ? urlData[0] : Constants.DEFAULT_PERSONNEL_PHOTO_URL;	
		});
		
		var personnelPromise = CommonService.getPersonnelFromEhr($stateParams.driverNricNo);
		$q.all([ personnelPromise ]).then(function(urlData) {
			$scope.personnelDTO = data[0];
		});
		
		angular.forEach($scope.statuses, function(value) {
			if (value.name === "Deleted"){
				$scope.statuses.splice(value, 1);
			}
		});
	});
		
	$scope.checkAll = function() {
		_.each($scope.dto.driverPermitClasses, function(driverPermitClass) {
			$scope.checkboxes.records[driverPermitClass.permitClass.code] = $scope.checkboxes.all;
		});
	};
		
	$scope.showDriverPermitClassModal = function(permitClassCode) {
		if (permitClassCode) {
			$scope.driverPermitClass = { isAdd:false, permitClass:{}, retestFlag:'N' };
			var driverPermitClassDTO = DriverPermitService.getDriverPermitClassDTO($scope.dto.driverPermitClasses, permitClassCode);
			DriverPermitService.mapProperties(driverPermitClassDTO, $scope.driverPermitClass);
		} else {
			$scope.driverPermitClass = { isAdd:true, permitClass:{}, retestFlag:'N' };
		}
		$('#driverPermitClassModal').modal({ backdrop:'static' });
    };
    
    $scope.addOrEditDriverPermitClass = function() {
    	var driverPermitClassDTO = DriverPermitService.getDriverPermitClassDTO($scope.dto.driverPermitClasses, $scope.driverPermitClass.permitClass.code)
    	if ($scope.driverPermitClass.isAdd) {
    		if (driverPermitClassDTO) {
    			$scope.$root.errorDialog($scope.driverPermitClass.permitClass.name + '" already existed.');
    		} else {
    			driverPermitClassDTO = { permitClass:{ } };
    			DriverPermitService.mapProperties($scope.driverPermitClass, driverPermitClassDTO);
    			
    			
    			$scope.dto.driverPermitClasses.push(driverPermitClassDTO);
    		}
    	} else {
    		DriverPermitService.mapProperties($scope.driverPermitClass, driverPermitClassDTO);
    	}
    };
    
    $scope.removeDriverPermitClasses = function() {
    	var i = $scope.dto.driverPermitClasses.length;
    	while (i--) {
    		if ($scope.checkboxes.records[$scope.dto.driverPermitClasses[i].permitClass.code]) {
    			$scope.dto.driverPermitClasses.splice(i, 1);
    		}
    	}
	};
	
	$scope.update = function() {
		if ($scope.dto.statusCode === 'PRMT_REV') {
			if ($scope.dto.reasons === undefined || $scope.dto.reasons == "") {
				$scope.$root.errorDialog("Please enter the Revoke Reason.");
				return;
			}
		}
		
		var updateDTO = {
			driverNricNo: $scope.dto.driverNricNo,
			permitNo: $scope.dto.permitNo,
			permitTypeCode: $scope.dto.permitTypeCode,
			statusCode: $scope.dto.statusCode,
			effectiveDate: $scope.dto.effectiveDate,
			effectiveDateRange: $scope.dto.effectiveDateRange,
			issueDate: $scope.dto.issueDate,
			expiryDate: $scope.dto.expiryDate,
			supercededBy: $scope.dto.supercededBy,
			reasons: $scope.dto.reasons,
			driverPermitClasses: $scope.dto.driverPermitClasses,
		};
		var resultPromise = DriverPermitService.updateDriverPermit(updateDTO);
		$q.all([ resultPromise ]).then(function(result) {
			$scope.$root.infoDialog(result[0]);
		});
	};
	
	$scope.delete = function() {
		var deleteDTO = {
			driverPermitId: $stateParams.driverPermitId,
			driverNricNo: $scope.dto.driverNricNo,
			permitNo: $scope.dto.permitNo,
			permitTypeCode: $scope.dto.permitTypeCode,
			statusCode: 'PRMT_DEL',
			effectiveDate: $scope.dto.effectiveDate,
			effectiveDateRange: $scope.dto.effectiveDateRange,
			issueDate: $scope.dto.issueDate,
			expiryDate: $scope.dto.expiryDate,
			supercededBy: $scope.dto.supercededBy,
			driverPermitClasses: $scope.dto.driverPermitClasses,
		};
		var resultPromise = DriverPermitService.deleteDriverPermit(deleteDTO);
		$q.all([ resultPromise ]).then(function(result) {
			$scope.$root.infoDialog(result[0]);
			$scope.$root.go('/driver_permits');
		});
	};
	
	$scope.getAuditLog = function(tableState) {
    	$scope.searchDTO = { startIndex:0, pageSize:Constants.PAGE_SIZE, entityId:$stateParams.driverPermitId, entity:'DriverPermitController' };
    	
    	CommonService.initPagination($scope, tableState);
        CommonService.setPaginationSearch($scope, tableState);
        var auditLogPromise = CommonService.getAuditLog($scope.searchDTO);
        $q.all([ auditLogPromise ]).then(function(data) {
        	CommonService.setPaginationResult($scope, tableState, data);
        	$scope.tableState = tableState;
        });
    }
});

app.controller('DriverPermitNewController', function($q, $scope, DriverPermitService, CommonService) {
	if(!$scope.$root.checkAccessRights('showNewSafDrivingPermit')){return;}
	var statusesPromise = CommonService.getStatuses("PERMIT");
	var permitTypesPromise = CommonService.getPermitTypes('N');
	var permitClassesPromise = CommonService.getPermitClasses('N');
	var testersPromise = DriverPermitService.getPermitTesters('A');
	$scope.dto = { driverPermitClasses:[], permitTypeCode:"QDL", statusCode:"PRMT_VLD", effectiveDate:moment().format('DD-MMM-YYYY HH:mm:ss'), issueDate:moment().format('DD-MMM-YYYY HH:mm:ss') };
	$scope.checkboxes = { all:false, records:{} };
	$scope.manual = { manualEntry: 'N' };
	$scope.today = moment();
	
	$q.all([ statusesPromise, permitTypesPromise, permitClassesPromise, testersPromise ]).then(function(data) {
		$scope.statuses = data[0];
		$scope.permitTypes = data[1];
		$scope.permitClasses = data[2];
		$scope.testers = data[3];
	});
		
	$scope.checkAll = function() {
		_.each($scope.dto.driverPermitClasses, function(driverPermitClass) {
			$scope.checkboxes.records[driverPermitClass.permitClass.code] = $scope.checkboxes.all;
		});
	};
	
	$scope.manualEntry = function() {
		if($scope.manual.manualEntry == 'Y'){
			$scope.dto.driverNricNo = null;
			$scope.manual.driver = null;
		} else if ($scope.manual.manualEntry == 'N'){
			$scope.dto.driverNricNo = null;
			$scope.manual.driver = null;
		}
	};
	
	$scope.filterManualDriver = function(driver) {
		var regExp = /\(([^)]+)\)/;
		var letters = /^[A-Za-z]+$/;
		var matches = regExp.exec(driver);
		if(matches){
			if(matches[1].charAt(0).match(/[a-z]/i) && matches[1].charAt(8).match(/[a-z]/i)){
				if(parseInt(matches[1].substring(1,8)) && matches[1].length == 9){
					var driverName = driver.split("(");
					$scope.dto.driverName = driverName[0];
					$scope.dto.driverNricNo = matches[1];
				} else {
					$scope.$root.errorDialog("Please enter driver in the following format: RANK NAME (NRIC) e.g. CPL TAY AH HUAT (S9123457A)");
				}
			} else {
				$scope.$root.errorDialog("Please enter driver in the following format: RANK NAME (NRIC) e.g. CPL TAY AH HUAT (S9123457A)");				
			}
		} else {
			return;
		}
	};
	
	$scope.filterSupDriverPermits = function(item) {
		$scope.dto.driverNricNo = item.code;
		if($scope.dto.driverNricNo != undefined){
			var supDriverPermitsPromise = DriverPermitService.getSupDriverPermitsByDriver($scope.dto.driverNricNo);		
			$q.all([ supDriverPermitsPromise ]).then(function(data) {
				$scope.supDriverPermits = data[0];
			});
		}
	};
	
	$scope.showDriverPermitClassModal = function(permitClassCode) {
		if (permitClassCode) {
			$scope.driverPermitClass = { isAdd:false, permitClass:{}, retestFlag:'N' };
			var driverPermitClassDTO = DriverPermitService.getDriverPermitClassDTO($scope.dto.driverPermitClasses, permitClassCode);
			DriverPermitService.mapProperties(driverPermitClassDTO, $scope.driverPermitClass);
		} else {
			$scope.driverPermitClass = { isAdd:true, permitClass:{}, retestFlag:'N' ,obtainDate:$scope.today};
		}
		$('#driverPermitClassModal').modal({ backdrop:'static' });
    };
    
    $scope.addOrEditDriverPermitClass = function() {
    	var errors = DriverPermitService.validateProperties($scope.driverPermitClass);
    	if (errors.length > 0) {
    		$scope.$root.errorDialog(errors);
    	} else {
    		var driverPermitClassDTO = DriverPermitService.getDriverPermitClassDTO($scope.dto.driverPermitClasses, $scope.driverPermitClass.permitClass.code)   	
        	if ($scope.driverPermitClass.isAdd) {
        		if (driverPermitClassDTO) {
        			$scope.$root.infoDialog($scope.driverPermitClass.permitClass.name + '" already existed.');
        		} else {
        			driverPermitClassDTO = { permitClass:{} };
        			DriverPermitService.mapProperties($scope.driverPermitClass, driverPermitClassDTO);
        			$scope.dto.driverPermitClasses.push(driverPermitClassDTO);
        			$('#driverPermitClassModal').modal('hide');
        		}
        	} else {
        		DriverPermitService.mapProperties($scope.driverPermitClass, driverPermitClassDTO);
        		$('#driverPermitClassModal').modal('hide');
        	}
    	}
    };
    
    $scope.removeDriverPermitClasses = function() {
    	var i = $scope.dto.driverPermitClasses.length;
    	while (i--) {
    		if ($scope.checkboxes.records[$scope.dto.driverPermitClasses[i].permitClass.code]) {
    			$scope.dto.driverPermitClasses.splice(i, 1);
    		}
    	}
	};
	
	$scope.save = function() {
		var resultPromise = DriverPermitService.saveDriverPermit($scope.dto);
		$q.all([ resultPromise ]).then(function(result) {
			$scope.$root.infoDialog(result[0]);
			$scope.reset();
		});
	};
	
	$scope.reset = function() {
		$scope.dto = { driverPermitClasses:[], permitTypeCode:"QDL", statusCode:"PRMT_VLD", effectiveDate:moment().format('DD-MMM-YYYY HH:mm:ss'), issueDate:moment().format('DD-MMM-YYYY HH:mm:ss') };
		$scope.driver = "";
	};
	
});