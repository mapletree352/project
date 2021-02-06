app.controller('VehicleSearchController', function($q, $scope, VehicleService, CommonService, Constants) {
	if(!$scope.$root.checkAccessRights('showSearchVehicles')){return;}
	var vehicleTypesPromise = CommonService.getVehicleTypes();
	var hubsPromise = CommonService.getHubs();
	var nodesPromise = CommonService.getNodes();
	var permitClassesPromise = CommonService.getPermitClasses();
	var purposesPromise = CommonService.getPurposes();
	var aviStatusesPromise = CommonService.getStatuses('AVI');
	var statusesPromise = CommonService.getStatuses('MAINTENANCE');
	var esEquipmentsPromise = CommonService.getEsEquipments();
	$scope.tab = 'profile';
	$scope.advSearchCollapsed = true;
	$scope.searchDTO = { startIndex:0, pageSize:Constants.PAGE_SIZE };
	$scope.checkboxes = { all: false, records: {} };
	$scope.$root.limitAccess($scope.searchDTO);
	
	$q.all([ vehicleTypesPromise, hubsPromise, nodesPromise, permitClassesPromise, purposesPromise, aviStatusesPromise, statusesPromise, esEquipmentsPromise ]).then(function(data) {
		$scope.vehicleTypes = data[0];
		$scope.vehicleTypes.push(Constants.VEHICLE_TYPE_NOT_SET);
		$scope.hubs = data[1];
		$scope.nodes = data[2];
		$scope.permitClasses = data[3];
		$scope.purposes = data[4];
		$scope.aviStatuses = data[5];
		$scope.statuses = data[6];
		$scope.esEquipments = data[7];
		$scope.aviStatusesForBatch = [];
		_.each($scope.aviStatuses, function(aviStatus) {
			if (aviStatus.code === Constants.AVI_PASS || aviStatus.code === Constants.AVI_FAIL) {
				$scope.aviStatusesForBatch.push(aviStatus);
			}
		});
		if ($scope.$root.session.userRole.cat === Constants.USER_ROLE_CAT_HQ) {
			$scope.hubs.push(Constants.HUB_NOT_SET);
			$scope.nodes.push(Constants.NODE_NOT_SET);
		}
	});
		
	$scope.paginate = function(tableState) {
		if(CommonService.initPagination($scope, tableState)) {
			CommonService.setPaginationSearch($scope, tableState);
			var resultPromise = VehicleService.searchVehicles($scope.searchDTO);
			$q.all([ resultPromise]).then(function(data) {
				CommonService.setPaginationResult($scope, tableState, data);
				if (data[0].records.length === 0) {
					$scope.$root.infoDialog("No result found.");
				}
			});
		}
	};
	
	$scope.search = function() {
		CommonService.resetPagination($scope, 0, Constants.PAGE_SIZE);
		CommonService.search($scope, "vehicleNo");
	}
	
	$scope.download = function() {
		var resultPromise = VehicleService.exportVehicles($scope.searchDTO);
		$q.all([ resultPromise ]).then(function(data) {
			$scope.$root.exportFile(data[0], "text/plain", "vehicles.xlsx");
		});
	};
	
	$scope.checkAll = function() {
		_.each($scope.records, function(record) {
			$scope.checkboxes.records[record.vehicleNo] = $scope.checkboxes.all;
		});
	};
	
	$scope.reset = function() {
		CommonService.resetPagination($scope, 0, Constants.PAGE_SIZE);
		$scope.searchDTO = { startIndex:0, pageSize:Constants.PAGE_SIZE };
		$scope.$root.limitAccess($scope.searchDTO);
	};
	
	$scope.setSelection = function(batchUpdateType) {
		$scope.dto = { batchUpdateType: batchUpdateType, vehicleNos: [] };
		$scope.selectedVehicles = [];
    	_.each($scope.records, function(record){
    		if ($scope.checkboxes.records[record.vehicleNo]){
    			$scope.selectedVehicles.push({ vehicleNo:record.vehicleNo, vehicleType:record.vehicleType });
    			$scope.dto.vehicleNos.push(record.vehicleNo);
    		}
    	});    	
		if ($scope.selectedVehicles.length == 0) {
			$scope.$root.errorDialog('Please select at least one record.');
		} else {
			$scope.batchUpdateType = batchUpdateType;
			$('#batchUpdateModal').modal({ backdrop:'static' });
		}
	}
	
	$scope.batchUpdate = function() {
		var resultPromise = VehicleService.batchUpdateVehicles($scope.dto);
		$q.all([ resultPromise ]).then(function(result) {
			$scope.$root.infoDialog(result[0]);
			$scope.search();
		});
	};
});

app.controller('VehicleController', function($q, $scope, $stateParams, VehicleService, SelfServiceService, CommonService, Constants) {
	if(!$scope.$root.checkAccessRights('showSearchVehicles')){return;}
	var vehiclePromise = VehicleService.getVehicle($stateParams.vehicleNo);
	var purposesPromise = CommonService.getPurposes();
	var vehicleTypesPromise = CommonService.getVehicleTypes('N');
	var aviStatusesPromise = CommonService.getStatuses('AVI');
	$scope.tab = 'profile';
	$scope.vehicleCalendars;
	$scope.vehicleCalendarsSelect;
	
	$q.all([vehiclePromise, purposesPromise, vehicleTypesPromise, aviStatusesPromise ]).then(function(data){
		$scope.dto = data[0];
		$scope.purposes = data[1];
		$scope.vehicleTypes = data[2];
		$scope.aviStatuses = [];
		_.each(data[3], function(aviStatus) {
			if (aviStatus.code === Constants.AVI_PASS || aviStatus.code === Constants.AVI_FAIL || aviStatus.code === Constants.AVI_EXPIRED) {
				$scope.aviStatuses.push(aviStatus);
			}
		});
	});
	
	$scope.confirm = function() {
		if ($scope.isAviPreviouslyNotSet && $scope.dto.aviDueDate) {
			$scope.$root.confirmDialog('Setting up the AVI Due Date will allow this vehicle to be tasked for indents and auto-scheduled based on its Maintenance Cycle of <strong>' + $scope.dto.maintenanceCycle.name + '</strong>. Are you sure you want to update the Vehicle?', $scope.update);
		} else {
			$scope.$root.confirmDialog('Are you sure you want to update the Vehicle?', $scope.update);			
		}
	};
	
	$scope.update = function() {
		var resultPromise = VehicleService.updateVehicle($scope.dto);
		$q.all([ resultPromise ]).then(function(result) {
			$scope.$root.infoDialog(result[0]);
			vehiclePromise = VehicleService.getVehicle($stateParams.vehicleNo);
			$q.all([vehiclePromise, purposesPromise, aviStatusesPromise ]).then(function(data){
				$scope.dto = data[0];
				$scope.isAviPreviouslyNotSet = false;
			});
		});
	};
	
// calendar
	
	$(document).ready(function () {
	    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
	        $('.calendar').fullCalendar('render');
	    });
	});
	
	$('.calendar').fullCalendar({
		height: 600,
		header: {
			left: 'prev,next today ',
			center: 'title',
			right: 'month,agendaWeek,agendaDay'
		},
		selectable: true,
		editable: true,
		displayEventTime: false,
		eventLimit: true, // allow "more" link when too many events
		eventClick: function(event, jsEvent, view) {
			if(event.id > 0){
			
				var destination = "";
				var getTaskDetailPromise = SelfServiceService.getTaskDetail(event.id);
				$q.all([getTaskDetailPromise]).then(function(data){
					$scope.vehicleCalendarsSelect = data[0];
					
					if(angular.equals($scope.vehicleCalendarsSelect.indentReportingVenue,$scope.vehicleCalendarsSelect.indentDestinationVenue)){
						destination = $scope.vehicleCalendarsSelect.indentReportingVenue;
					}else{
						destination = $scope.vehicleCalendarsSelect.indentReportingVenue + " -> " + $scope.vehicleCalendarsSelect.indentDestinationVenue;
					}
					
					$('#modalTitle').html($scope.vehicleCalendarsSelect.indentActivity + " @ " + destination);
					
				});
				
				
				$('#fullCalModal').modal();
				
			}else{
				return false;
			}
									
		},
		events: function(start,end,timezone,callback) {
			
			var vehicleCalendarDTO = new Object();
			var events = [];
			vehicleCalendarDTO.startDate = start.format('DD-MMM-YYYY HH:mm:ss');
			vehicleCalendarDTO.endDate = end.format('DD-MMM-YYYY HH:mm:ss');
			vehicleCalendarDTO.vehicleNo = $stateParams.vehicleNo;
			var colors = "";
			var taskDetailId = 0;

			var getVehicleCalendarsPromise = VehicleService.getVehicleCalendars(vehicleCalendarDTO);
			$q.all([getVehicleCalendarsPromise]).then(function(data) {
				$scope.vehicleCalendars = data[0];
				_.each($scope.vehicleCalendars, function(vehicleCalendar) {
					if ((vehicleCalendar.statusCode).indexOf("!") !== -1) {
						colors = "red";
					} else if (vehicleCalendar.userAssignedFlag === 'Y') {
						colors = "mediumblue";
					} else {
						colors = "black";
					}
					
					if(vehicleCalendar.taskDetailId !== null){
						taskDetailId = vehicleCalendar.taskDetailId;
					}else{
						taskDetailId = 0;
					}
					
					events.push({
						id: taskDetailId,
						title: vehicleCalendar.maintenanceLabel ? vehicleCalendar.maintenanceLabel : vehicleCalendar.statusCode,
						start: moment(vehicleCalendar.startDate,'DD-MMM-YYYY HH:mm:ss'),
						end:  moment(vehicleCalendar.endDate,'DD-MMM-YYYY HH:mm:ss'),
						color: colors
					});
				
				});
				callback(events);
			});
			
		}

	});
	
	$scope.searchDTO = { startIndex:0, pageSize:Constants.PAGE_SIZE, vehicleNo:$stateParams.vehicleNo };
	
	$scope.searchVehicleTrips = function(tableState) {
		if (CommonService.initPagination($scope, tableState)) {
			CommonService.setPaginationSearch($scope, tableState);
			var resultPromise = VehicleService.searchVehicleTrips($scope.searchDTO);
			$q.all([ resultPromise ]).then(function(data) {
				CommonService.setPaginationResult($scope, tableState, data);
				$scope.tableState = tableState;
			});
		}
	};
	
	$scope.searchButton = function() {
		CommonService.resetPagination($scope, 0, Constants.PAGE_SIZE);
		$scope.searchVehicleTrips($scope.tableState);
	};
	
	$scope.reset = function() {
		CommonService.resetPagination($scope, 0, Constants.PAGE_SIZE);
		$scope.searchDTO = { startIndex:0, pageSize:Constants.PAGE_SIZE, vehicleNo:$stateParams.vehicleNo };
	};
	 
    $scope.setTotalMileage = function(totalMileage){
    	$scope.totalMileage = totalMileage;
    };
    
    $scope.getAuditLog = function(tableState) {
    	$scope.searchDTO = { startIndex:0, pageSize:Constants.PAGE_SIZE, entityId:$scope.dto.id, entity:'VehicleController' };
    	
    	CommonService.initPagination($scope, tableState);
        CommonService.setPaginationSearch($scope, tableState);
        var auditLogPromise = CommonService.getAuditLog($scope.searchDTO);
        $q.all([ auditLogPromise ]).then(function(data) {
        	CommonService.setPaginationResult($scope, tableState, data);
        	$scope.tableState = tableState;
        });
    }
});

app.controller('VehicleTypeSearchController', function($q, $scope, VehicleService, CommonService, Constants) {
	if(!$scope.$root.checkAccessRights('showSearchVehicleTypes')){return;}
	var vehicleTypesPromise = CommonService.getVehicleTypes();
	var permitClassesPromise = CommonService.getPermitClasses();
	var purposesPromise = CommonService.getPurposes();
	var maintenanceCyclePromise = CommonService.getMaintenanceCycles();
	var esEquipmentsPromise = CommonService.getEsEquipments();
	$scope.tab = 'profile';
	$scope.advSearchCollapsed = true;
	$scope.checkboxes = { all: false, records: {} };
	$scope.searchDTO = { startIndex:0, pageSize:Constants.PAGE_SIZE };
	
	$(".numbersOnly").keyup(function () { 
	    this.value = this.value.replace(/[^0-9\.]/g,'');
	});
	
	$q.all([ vehicleTypesPromise, permitClassesPromise, purposesPromise, maintenanceCyclePromise, esEquipmentsPromise]).then(function(data) {
		$scope.vehicleTypes = data[0];
		$scope.vehicleTypes.push(Constants.VEHICLE_TYPE_NOT_SET);
		$scope.permitClasses = data[1];
		$scope.purposes = data[2];
		$scope.maintenanceCycles = data[3];
		$scope.esEquipments = data[4];
	});
	
	$scope.checkAll = function() {
		_.each($scope.records, function(record) {
			$scope.checkboxes.records[record.id] = $scope.checkboxes.all;
		});
	};
	
	$scope.setSelection = function(batchUpdateType) {
		$scope.dto = { batchUpdateType: batchUpdateType, ids: [] };
		$scope.selectedVehicleTypes = [];
    	_.each($scope.records, function(record){
    		if ($scope.checkboxes.records[record.id]){
    			$scope.selectedVehicleTypes.push({ esEquipmentDesc:record.esEquipmentDesc, name:record.name });
    			$scope.dto.ids.push(record.id);
    		}
    	});    	
		if ($scope.selectedVehicleTypes.length == 0) {
			$scope.$root.errorDialog('Please select at least one record.');
		} else {
			$scope.batchUpdateType = batchUpdateType;
			$('#batchUpdateModal').modal({ backdrop:'static' });
		}
	}
	
	$scope.batchUpdate = function() {
		var resultPromise = VehicleService.batchUpdateVehicleTypes($scope.dto);
		$q.all([ resultPromise ]).then(function(result) {
			$scope.$root.infoDialog(result[0]);
			$scope.search();
		});
	};
	
	$scope.paginate = function(tableState) {
		if(CommonService.initPagination($scope, tableState)) {
			CommonService.setPaginationSearch($scope, tableState);
			var resultPromise = VehicleService.searchVehicleTypes($scope.searchDTO);
			$q.all([ resultPromise]).then(function(data) {
				CommonService.setPaginationResult($scope, tableState, data);
				if (data[0].records.length === 0) {
					$scope.$root.infoDialog("No result found.");
				}
			});
		}
	};
	
	$scope.search = function() {
		CommonService.resetPagination($scope, 0, Constants.PAGE_SIZE);
		CommonService.search($scope, "name");
	};
	
	$scope.download = function() {
		var resultPromise = VehicleService.exportVehicleTypes($scope.searchDTO);
		$q.all([ resultPromise ]).then(function(data) {
			$scope.$root.exportFile(data[0], "text/plain", "vehicle_types.xlsx");
		});
	};
	
	$scope.reset = function() {
		CommonService.resetPagination($scope, 0, Constants.PAGE_SIZE);
		$scope.searchDTO = { startIndex:0, pageSize:Constants.PAGE_SIZE };
	};
});

app.controller('VehicleTypeController', function($q, $scope, $stateParams, VehicleService, CommonService, Constants, Upload, $timeout) {
	if(!$scope.$root.checkAccessRights('showSearchVehicleTypes')){return;}
	var vehicleTypePromise = VehicleService.getVehicleType($stateParams.vehicleTypeId);
	var purposesPromise = CommonService.getPurposes();
	var permitClassesPromise = CommonService.getPermitClasses('N');
	var maintenanceCyclesPromise = CommonService.getMaintenanceCycles();
	var esEquipmentsPromise = CommonService.getEsEquipments();
	$scope.checkboxes = { all: false, records: {}};
	$scope.uploadDTO = { };

	$q.all([vehicleTypePromise, purposesPromise, permitClassesPromise, maintenanceCyclesPromise, esEquipmentsPromise]).then(function(data){
		$scope.dto = data[0];
		$scope.purposes = data[1];
		$scope.permitClasses = data[2];
		$scope.maintenanceCycles = data[3];
		$scope.esEquipments = data[4];
	});
	
	$scope.reloadMaintenanceCycle = function() {
		var maintenanceCyclePromise = VehicleService.reloadMaintenanceCycle($scope.dto.maintenanceCycleId);
		$q.all([ maintenanceCyclePromise ]).then(function(data) {
			$scope.dto.maintenanceCycle = data[0];
		});
	};
	
	$scope.update = function() {
		var resultPromise = VehicleService.updateVehicleType($scope.dto);
		$q.all([ resultPromise ]).then(function(result) {
			$scope.$root.infoDialog(result[0]);
		});
	};
	
	$scope.uploadFile = function(file, errFiles) {
        if (file) {
            file.upload = Upload.upload({
                url: Constants.BASE_URL + '/vehicle/uploadVehicleTypeImage',
                method: 'POST',
                headers: { authorization: $scope.$root.session.token },
                data: { file: file, vehicleTypeId: $stateParams.vehicleTypeId }
            });

            file.upload.then(function (response) {
                $timeout(function () {
                	if (response.data === 'error') {
                		$scope.$root.infoDialog("Vehicle Type Image fail to upload!");                		
                	} else {
                		$scope.dto.imagePath = response.data;
                		$scope.$root.infoDialog("Vehicle Type Image uploaded successfully!");
                	}
                });
            });
        }   
    }
	
	$scope.getAuditLog = function(tableState) {
    	$scope.searchDTO = { startIndex:0, pageSize:Constants.PAGE_SIZE, entityId:$scope.dto.id, entity:'VehicleTypeController' };
    	
    	CommonService.initPagination($scope, tableState);
        CommonService.setPaginationSearch($scope, tableState);
        var auditLogPromise = CommonService.getAuditLog($scope.searchDTO);
        $q.all([ auditLogPromise ]).then(function(data) {
        	CommonService.setPaginationResult($scope, tableState, data);
        	$scope.tableState = tableState;
        });
    }
});

app.controller('VehicleTypeCreateController', function($q, $scope, $stateParams, VehicleService, CommonService, Constants, Upload, $timeout) {
	if(!$scope.$root.checkAccessRights('showNewVehicleType')){return;}
	var purposesPromise = CommonService.getPurposes();
	var permitClassesPromise = CommonService.getPermitClasses('N');
	var maintenanceCyclesPromise = CommonService.getMaintenanceCycles();
	var esEquipmentsPromise = CommonService.getEsEquipments();
	$scope.uploadDTO = { };
	$scope.dto = {obsolete : Constants.FLAG_NO};

	$q.all([purposesPromise, permitClassesPromise, maintenanceCyclesPromise, esEquipmentsPromise]).then(function(data){
		$scope.purposes = data[0];
		$scope.permitClasses = data[1];
		$scope.maintenanceCycles = data[2];
		$scope.esEquipments = data[3];
	});
	
	$scope.reloadMaintenanceCycle = function() {
		var maintenanceCyclePromise = VehicleService.reloadMaintenanceCycle($scope.dto.maintenanceCycleId);
		$q.all([ maintenanceCyclePromise ]).then(function(data) {
			$scope.dto.maintenanceCycle = data[0];
		});
	};
	
	$scope.update = function() {
		var resultPromise = VehicleService.createVehicleType($scope.dto);
		$q.all([ resultPromise ]).then(function(result) {
			$scope.$root.infoDialog(result[0]);
			$scope.uploadDTO = { };
			$scope.dto = {obsolete : Constants.FLAG_NO};
		});
	};
	
	$scope.uploadFile = function(file, errFiles) {
        if (file) {
            file.upload = Upload.upload({
                url: Constants.BASE_URL + '/vehicle/uploadNewVehicleTypeImage',
                method: 'POST',
                headers: { authorization: $scope.$root.session.token },
                data: { file: file }
            });

            file.upload.then(function (response) {
                $timeout(function () {
                	if (response.data === 'error') {
                		$scope.$root.infoDialog("Vehicle Type Image fail to upload!");                		
                	} else {
                		$scope.dto.imagePath = response.data;
                		$scope.$root.infoDialog("Vehicle Type Image uploaded successfully!");
                	}
                });
            });
        }   
    }
});

app.controller('VehicleLoanEndorsementController', function($q, $scope, VehicleService, CommonService, Constants) {
	if(!$scope.$root.checkAccessRights('showVehicleTLoanEndorsement')){return;}
	$scope.decisions = [];
	$scope.searchDTO = { startIndex:0, pageSize:Constants.PAGE_SIZE, statusCodes:[Constants.LOAN_PENDING_ENDORSEMENT, Constants.LOAN_EXT_PENDING_ENDORSEMENT] };
	$scope.$root.limitAccess($scope.searchDTO);
	var firstLoad = true;
	
	$scope.paginate = function(tableState) {
		if(CommonService.initPagination($scope, tableState)) {
			CommonService.setPaginationSearch($scope, tableState);
			var resultPromise = VehicleService.searchVehicleLoans($scope.searchDTO);
			$q.all([ resultPromise ]).then(function(data) {			
				CommonService.setPaginationResult($scope, tableState, data);
				_.each($scope.records, function(record) {
					$scope.decisions[record.id] = { id: record.id, idLabel: record.vehicleNo, decision:'UNDECIDED', decisionReason:'' };
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
	
	$scope.confirm = function() {
		var confirmedDecisions = [];
		_.each($scope.records, function(record) {
			if ($scope.decisions[record.id].decision !== 'NO') {
				$scope.decisions[record.id].decisionReason = ''; // reset rejection reason
			}
			if ($scope.decisions[record.id].decision !== 'UNDECIDED') {
				confirmedDecisions.push($scope.decisions[record.id]); // only send decided records
			}
		});
		
		var resultPromise = VehicleService.endorseVehicleLoans(confirmedDecisions);
		$q.all([ resultPromise ]).then(function(result) {
			$scope.$root.infoDialog(result[0]);
			$scope.decisions = [];
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

// TODO: to change parentNodeId to logged in user's node id
app.controller('VehicleLoanApprovalController', function($q, $scope, VehicleService, CommonService, Constants) {
	if(!$scope.$root.checkAccessRights('showVehicleTLoanApproval')){return;}
	$scope.decisions = [];
	$scope.searchDTO = { startIndex:0, pageSize:Constants.PAGE_SIZE, statusCodes:[Constants.LOAN_PENDING_APPROVAL, Constants.LOAN_EXT_PENDING_APPROVAL] };
	$scope.$root.limitAccess($scope.searchDTO);
	var firstLoad = true;
	
	$scope.paginate = function(tableState) {
		if(CommonService.initPagination($scope, tableState)) {
			CommonService.setPaginationSearch($scope, tableState);
			var resultPromise = VehicleService.searchVehicleLoans($scope.searchDTO);
			$q.all([ resultPromise ]).then(function(data) {			
				CommonService.setPaginationResult($scope, tableState, data);
				_.each($scope.records, function(record) {
					$scope.decisions[record.id] = { id: record.id, idLabel: record.vehicleNo, decision:'UNDECIDED', decisionReason:'' };
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
	
	$scope.confirm = function() {
		var confirmedDecisions = [];
		_.each($scope.records, function(record) {
			if ($scope.decisions[record.id].decision !== 'NO') {
				$scope.decisions[record.id].decisionReason = ''; // reset rejection reason
			}
			if ($scope.decisions[record.id].decision !== 'UNDECIDED') {
				confirmedDecisions.push($scope.decisions[record.id]); // only send decided records
			}
		});
		
		var resultPromise = VehicleService.approveVehicleLoans(confirmedDecisions);
		$q.all([ resultPromise ]).then(function(result) {
			$scope.$root.infoDialog(result[0]);
			$scope.decisions = [];
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
