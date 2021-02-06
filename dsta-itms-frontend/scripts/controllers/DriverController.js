app.controller('DriverSearchController', function($q, $scope, DriverService, Constants, CommonService, DriverService, DriverPermitService) {
	if (!$scope.$root.checkAccessRights('showSearchDrivers')) { return; }
	var driverTypesPromise = CommonService.getDriverTypes();
	var hubsPromise = CommonService.getHubs();
	var nodesPromise = CommonService.getNodes();
	var opsTagUnitsPromise = CommonService.getUnits('N');
	var opsTagSubunitsPromise = CommonService.getSubunits();
	var vocationsPromise = CommonService.getVocations();
	var securityCategoriesPromise = CommonService.getSecurityCategories();
	var vehicleTypesPromise = CommonService.getVehicleTypes();
	var towTypesPromise = CommonService.getTowTypes();
	var drivingCategoriesPromise = CommonService.getDrivingCategories();
	var proficienciesPromise = CommonService.getProficiencies();
	var skillStatusesPromise = CommonService.getStatuses('SKILL');
	var permitTypesPromise = CommonService.getPermitTypes();
	var permitClassesPromise = CommonService.getPermitClasses();
	var permitStatusesPromise = CommonService.getStatuses('PERMIT');
	var rewardTypesPromise = CommonService.getRewardTypes();
	var rewardStatusesPromise = CommonService.getStatuses('REWARD');
	var offencesPromise = CommonService.getOffences();
	var offenceTypesPromise = CommonService.getOffenceTypes();
	var offenceIssuersPromise = CommonService.getOffenceIssuers();
	var assessmentStatusesPromise = CommonService.getStatuses('ASSESSMENT');
	$scope.tab = 'profile';
	$scope.advSearchCollapsed = true;
	$scope.searchDTO = { startIndex:0, pageSize:Constants.PAGE_SIZE};
	$scope.checkboxes = { all: false, records: {} };
	$scope.$root.limitAccess($scope.searchDTO);
	$scope.today = moment();
	
	$q.all([ driverTypesPromise, hubsPromise, nodesPromise, opsTagUnitsPromise, vocationsPromise, securityCategoriesPromise, vehicleTypesPromise, towTypesPromise, drivingCategoriesPromise, proficienciesPromise, skillStatusesPromise, 
	         permitTypesPromise, permitClassesPromise, permitStatusesPromise, rewardTypesPromise, rewardStatusesPromise, offencesPromise, offenceTypesPromise, offenceIssuersPromise, assessmentStatusesPromise, opsTagSubunitsPromise]).then(function(data) {
	    $scope.driverTypes = data[0];
		$scope.hubs = data[1];
		$scope.nodes = data[2];
		$scope.opsTagUnits = data[3];
		$scope.vocations = data[4];
		$scope.securityCategories = data[5];
		$scope.vehicleTypes = data[6];
		$scope.towTypes = data[7];
		$scope.drivingCategories = data[8];
		$scope.proficiencies = data[9];
		$scope.skillStatuses = data[10];
		$scope.permitTypes = data[11];
		$scope.permitClasses = data[12];
		$scope.permitStatuses = data[13];
		$scope.rewardTypes = data[14];
		$scope.rewardStatuses = data[15];
		$scope.offences = data[16];
		$scope.offenceTypes = data[17];
		$scope.offenceIssuers = data[18];
		$scope.assessmentStatuses = data[19];
		$scope.subunits = data[20];
	});
    
	$scope.paginate = function(tableState) {
		$scope.checkboxes = { all: false, records: {} };
		if (CommonService.initPagination($scope, tableState)) {
			CommonService.setPaginationSearch($scope, tableState);
			var resultPromise =  DriverService.searchDrivers($scope.searchDTO);
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
		CommonService.search($scope, "nricNo");
	};
	
	$scope.download = function() {
		var resultPromise = DriverService.exportDrivers($scope.searchDTO);
		$q.all([ resultPromise ]).then(function(data) {
			$scope.$root.exportFile(data[0], "text/plain", "drivers.xlsx");
		});
	};
	
	$scope.checkAll = function() {
		_.each($scope.records, function(record) {
			$scope.checkboxes.records[record.nricNo] = $scope.checkboxes.all;
		});
	};
	
	$scope.setSelection = function(batchUpdate) {
		$scope.dto = { batchUpdate: batchUpdate, nricNos: [] };
		$scope.selectedDrivers = [];
    	_.each($scope.records, function(record){
    		if ($scope.checkboxes.records[record.nricNo]){
    			$scope.selectedDrivers.push({ nricNo:record.nricNo, name:record.name });
    			$scope.dto.nricNos.push(record.nricNo);
    		}
    	});    	
		if ($scope.selectedDrivers.length == 0) {
			$scope.$root.errorDialog('Please select at least one record.');
		} else {
			$scope.batchUpdate = batchUpdate;
			$('#batchUpdateModal').modal({ backdrop:'static' });
		}
	};
	
	$scope.batchUpdateFunction = function() {
		var resultPromise = DriverService.batchUpdateDrivers($scope.dto);
		$q.all([ resultPromise ]).then(function(result) {
			$scope.$root.infoDialog(result[0]);
			$scope.search();
		});
	};
    
    $scope.reset = function() {
    	$scope.searchDTO = { startIndex:0, pageSize:Constants.PAGE_SIZE };
    	$scope.$root.limitAccess($scope.searchDTO);
    };
    
});

app.controller('DriverController', function($q, $scope, $stateParams, DriverService, SelfServiceService, VehicleService, DriverPermitService, CommonService, Constants) {
	if(!$scope.$root.checkAccessRights('showSearchDrivers')){return;}
	var driverPromise = DriverService.getDriver($stateParams.nricNo);
	var opsTagUnitsPromise = CommonService.getUnits('N');
	var opsTagSubunitsPromise = CommonService.getSubunits(); // TODO: to retrieve only active units' subunits
	var vehicleTypesPromise = CommonService.getVehicleTypes();
	var towTypesPromise = CommonService.getTowTypes();
	var drivingCategoriesPromise = CommonService.getDrivingCategories();
	var proficenciesPromise = CommonService.getProficiencies();
	var assessmentStatusesPromise = CommonService.getStatuses('ASSESSMENT');
	var rewardTypesPromise = CommonService.getRewardTypes();
	var permitClassesPromise = CommonService.getPermitClasses('N');
	var checkClaimedRewardsPromise = DriverService.checkClaimedRewards($stateParams.nricNo);
	$scope.photoUrl = Constants.DEFAULT_PERSONNEL_PHOTO_URL;
	$scope.tab = 'profile';
	$scope.VEHICLE_FAM = Constants.VEHICLE_FAM_CODE;
	$scope.DRIVING_CATEGORY = Constants.DRIVING_CATEGORY_CODE;
	$scope.PROFICIENCY = Constants.PROFICIENCY_CODE;
	$scope.REWARD = Constants.REWARD;
	$scope.checkboxes = [];
	$scope.checkboxes[$scope.VEHICLE_FAM] = { all: false, items: {} };
	$scope.checkboxes[$scope.DRIVING_CATEGORY] = { all: false, items: {} };
	$scope.checkboxes[$scope.PROFICIENCY] = { all: false, items: {} };
	$scope.checkboxes[$scope.REWARD] = { all: false, items: {} };
	$scope.withdrawDTO = { driverNricNo: $stateParams.nricNo };
	$scope.today = moment();
	
	$q.all([ driverPromise, opsTagUnitsPromise, opsTagSubunitsPromise, vehicleTypesPromise, towTypesPromise, drivingCategoriesPromise, proficenciesPromise, assessmentStatusesPromise, rewardTypesPromise, permitClassesPromise, checkClaimedRewardsPromise]).then(function(data) {
		$scope.dto = data[0];
		$scope.opsTagUnits = data[1];
		$scope.subunits = data[2];
		$scope.vehicleTypes = data[3];
		$scope.towTypes = data[4];
		$scope.drivingCategories = data[5];
		$scope.proficiencies = data[6];
		$scope.assessmentStatuses = data[7];
		$scope.rewardTypes = data[8];
		$scope.vehPermitClasses = data[9];
		$scope.safetyBadgeClaimed = data[10][0];
		$scope.cl2ACDLClaimed = data[10][1];
		$scope.cl2BCDLClaimed = data[10][2];
		$scope.cl2CDLClaimed = data[10][3];
		$scope.cl3CDLClaimed = data[10][4];
		$scope.cl4CDLClaimed = data[10][5];
		
		var photoUrlPromise = CommonService.getPersonnelPhotoUrl($stateParams.nricNo);
		$q.all([ photoUrlPromise ]).then(function(urlData) {
			$scope.photoUrl = urlData[0] ? urlData[0] : Constants.DEFAULT_PERSONNEL_PHOTO_URL;	
		});
	});
	
	$scope.checkAll = function(items, code) {
		_.each(items, function(item) {
			$scope.checkboxes[code].items[item.id] = $scope.checkboxes[code].all;
		});
	};
	
	$scope.update = function() {
		var updateDTO = {
			nricNo: $scope.dto.nricNo,
			opsTagNodeId: $scope.dto.opsTagNodeId,
			opsTagUnitCode: $scope.dto.opsTagUnitCode,
			platoon: $scope.dto.platoon,
			section: $scope.dto.section
		};
		if ($scope.dto.opsTagUnitCode) {
			updateDTO.opsTagSubunitId = $scope.dto.opsTagSubunitId;
		}
		var resultPromise = DriverService.updateDriver(updateDTO);
		$q.all([ resultPromise ]).then(function(result) {
			$scope.$root.infoDialog(result[0]);
		});
	};
	
	$scope.saveDriverVehicleFam = function() {

		$scope.vehicleFamDTO.typeCode = Constants.VEHICLE_FAM_CODE;
		$scope.vehicleFamDTO.driverNricNo = $stateParams.nricNo;
		var newVehicleFamPromise = DriverService.saveDriverVehicleFam($scope.vehicleFamDTO);
		$q.all([ newVehicleFamPromise ]).then(function(data) {
			$scope.dto.driverVehicleFams.unshift(data[0]);
			$scope.vehicleFamDTO = { assessmentStatusCode:'P', reassessFlag:'N', assessDate: $scope.today};
			$scope.famAssessor = undefined;
			$('#vehicleFamModal').modal('hide');
			$scope.$root.infoDialog('Vehicle Familiarisation saved successfully'); // TODO: to put all alert message in client
		}); 
	};
	
	$scope.saveDriverDrivingCategory = function() {
		$scope.drivingCategoryDTO.typeCode = Constants.DRIVING_CATEGORY_CODE;
		$scope.drivingCategoryDTO.driverNricNo = $stateParams.nricNo;
		var newDrivingCategoryPromise = DriverService.saveDriverDrivingCategory($scope.drivingCategoryDTO);
		$q.all([ newDrivingCategoryPromise ]).then(function(data) {
			$scope.dto.driverDrivingCategories.unshift(data[0]);
			$scope.drivingCategoryDTO = { assessmentStatusCode:'P', reassessFlag:'N' , assessDate: $scope.today};
			$scope.catAssessor = undefined;
			$('#drivingCategoryModal').modal('hide');
			$scope.$root.infoDialog('Driving Category saved successfully');
		}); 
	};
	
	$scope.saveDriverProficiency = function() {
		$scope.proficiencyDTO.typeCode = Constants.PROFICIENCY_CODE;
		$scope.proficiencyDTO.driverNricNo = $stateParams.nricNo;
		var newProficiencyPromise = DriverService.saveDriverProficiency($scope.proficiencyDTO);
		$q.all([ newProficiencyPromise ]).then(function(data) {
			$scope.dto.driverProficiencies.unshift(data[0]);
			$scope.proficiencyDTO = { assessmentStatusCode:'P', reassessFlag:'N', assessDate: $scope.today };
			$scope.proAssessor = undefined;
			$('#proficiencyModal').modal('hide');
			$scope.$root.infoDialog('Skill/Qualification saved successfully');
		}); 
	};
	
	$scope.withdrawVerification = function(items, index) {
		$scope.showRemarks = false;
		$scope.selectedRecords = [];
		_.each(items, function(item) {
			if (index === 'R') {
				if ($scope.checkboxes[index].items[item.id]) {
					$scope.selectedRecords.push(item.status);
					if (!item.status.includes("Verification")) {
						$scope.showRemarks = true;
					}
				}
			} else {
				if ($scope.checkboxes[index].items[item.id]) {
					$scope.selectedRecords.push(item.status);
					if (item.status !== "Pending Approval") {
						$scope.showRemarks = true;
					}
				}
			}
		});	
	}
	
	$scope.withdraw = function(items, index) {
		$scope.withdrawDTO.ids = [];
		_.each(items, function(item) {
			if ($scope.checkboxes[index].items[item.id]) {
				$scope.withdrawDTO.ids.push(item.id);
			}
		});		
		if (index === $scope.VEHICLE_FAM) {
			var resultPromise = DriverService.withdrawDriverVehicleFams($scope.withdrawDTO);
			$q.all([ resultPromise ]).then(function(data) {
				$scope.dto.driverVehicleFams = data[0];
				$scope.withdrawDTO.withdrawalReason = undefined;
				$('#withdrawVehicleFamsModal').modal('hide');
				$scope.$root.infoDialog('Vehicle Fams withdrawal saved successfully');
			});
		} else if(index === $scope.DRIVING_CATEGORY) {
			var resultPromise = DriverService.withdrawDriverDrivingCategories($scope.withdrawDTO);
			$q.all([ resultPromise ]).then(function(data) {
				$scope.dto.driverDrivingCategories = data[0];
				$scope.withdrawDTO.withdrawalReason = undefined;
				$('#withdrawDrivingCategoriesModal').modal('hide');
				$scope.$root.infoDialog('Driving Categories withdrawal saved successfully');
			});
		} else if(index === $scope.PROFICIENCY) {
			var resultPromise = DriverService.withdrawDriverProficiencies($scope.withdrawDTO);
			$q.all([ resultPromise ]).then(function(data) {
				$scope.dto.driverProficiencies = data[0];
				$scope.withdrawDTO.withdrawalReason = undefined;
				$('#withdrawProficienciesModal').modal('hide');
				$scope.$root.infoDialog('Skills/Qualifications withdrawal saved successfully');
			});  
		} else if(index === $scope.REWARD) {
			var resultPromise = DriverService.withdrawDriverRewards($scope.withdrawDTO);
			$q.all([ resultPromise ]).then(function(data) {
				$scope.dto.driverRewards = data[0];
				$scope.withdrawDTO.withdrawalReason = undefined;
				$('#withdrawModal').modal('hide');
				$scope.$root.infoDialog('Rewards withdrawal saved successfully');
			});  
		}
	};	
	
	$scope.saveDriverReward = function() {
		$scope.driverRewardDTO.driverNricNo = $stateParams.nricNo;
		var newdriverRewardPromise = DriverService.saveDriverReward($scope.driverRewardDTO);
		$q.all([ newdriverRewardPromise ]).then(function(data) {
			$scope.dto.driverRewards.unshift(data[0]);
			$('#rewardModal').modal('hide');
			$scope.$root.infoDialog('Reward submitted successfully');
		}); 
	};
	
	$scope.searchDTO = { startIndex:0, pageSize:Constants.PAGE_SIZE, driverNricNo:$stateParams.nricNo };
	$scope.tripSearchFlag = 0;
	$scope.vehicleTypeSearchFlag = 0;
	$scope.vehicleClassSearchFlag = 0;
	
	$scope.searchDriverTrips = function(tableState) {
		CommonService.initPagination($scope, tableState);
		if ($scope.tripSearchFlag == 0 || ($scope.searchDTO.dateRange != null && $scope.searchDTO.dateRange == "")) {
			CommonService.resetPagination($scope, 0, Constants.PAGE_SIZE);
			$scope.tableState = undefined;
		}
		if (CommonService.initPagination($scope, tableState)) {
			CommonService.setPaginationSearch($scope, tableState);
			var resultPromise = DriverService.searchDriverTrips($scope.searchDTO);
			$q.all([ resultPromise ]).then(function(data) {
				CommonService.setPaginationResult($scope, tableState, data);
				$scope.tableState = tableState;
			});
		}
		$scope.totalMileageTrip = undefined;
	};
	
	$scope.searchButton = function() {
		$scope.searchDTO.typeCode = $scope.breakDownBy;
		CommonService.resetPagination($scope, 0, Constants.PAGE_SIZE);
		if ($scope.breakDownBy === 'T') {
			if ($scope.searchDTO.dateRange != null && !$scope.searchDTO.dateRange == "") {
				$scope.tripSearchFlag = 1;
			} else {
				$scope.$root.errorDialog("Date Range is required for Trip.");
				$scope.tripSearchFlag = 0;
			}
			$scope.searchDriverTrips($scope.tableState);
		} else if ($scope.breakDownBy === 'V') {
			$scope.vehicleTypeSearchFlag = 1;
			$scope.searchDriverVehicleTypes($scope.tableState);
		} else if ($scope.breakDownBy === 'L') {
			$scope.vehicleClassSearchFlag = 1;
			$scope.searchDriverVehicleClasses($scope.tableState);
		}
	};
	
	$scope.reset = function() {
		CommonService.resetPagination($scope, 0, Constants.PAGE_SIZE);
		$scope.searchDTO = { startIndex:0, pageSize:Constants.PAGE_SIZE, driverNricNo:$stateParams.nricNo };
	};
	
	$scope.searchDriverVehicleTypes = function(tableState) {
		CommonService.initPagination($scope, tableState);
		if ($scope.vehicleTypeSearchFlag == 0) {
			CommonService.resetPagination($scope, 0, Constants.PAGE_SIZE);
			$scope.tableState = undefined;
		}
		if (CommonService.initPagination($scope, tableState)) {
			CommonService.setPaginationSearch($scope, tableState);
			var resultPromise = DriverService.searchDriverVehicleTypes($scope.searchDTO);
			$q.all([ resultPromise ]).then(function(data) {
				CommonService.setPaginationResult($scope, tableState, data);
				$scope.tableState = tableState;
			});
		}
		$scope.totalMileageVehicleType = undefined;
	};
	
	$scope.searchDriverVehicleClasses = function(tableState) {
		CommonService.initPagination($scope, tableState);
		if ($scope.vehicleClassSearchFlag == 0) {
			CommonService.resetPagination($scope, 0, Constants.PAGE_SIZE);
			$scope.tableState = undefined;
		}
		if (CommonService.initPagination($scope, tableState)) {
			CommonService.setPaginationSearch($scope, tableState);
			var resultPromise = DriverService.searchDriverVehicleClasses($scope.searchDTO);
			$q.all([ resultPromise ]).then(function(data) {
				CommonService.setPaginationResult($scope, tableState, data);
				$scope.tableState = tableState;
			});
		}
		$scope.totalMileageVehPermitClass = undefined;
	};
    
    $scope.setTotalMileageVehicleType = function(totalMileage){
    	$scope.totalMileageVehicleType = totalMileage;
    };
    
    $scope.setTotalMileageVehPermitClass = function(totalMileage){
    	$scope.totalMileageVehPermitClass = totalMileage;
    };
    
    $scope.setTotalMileageTrip = function(totalMileage){
    	$scope.totalMileageTrip = totalMileage;
    };
    
    $scope.openDemeritPointsRecord = function (driverDemeritPoint) {
    	$scope.driverDemeritPointDTO = driverDemeritPoint;
    	$('#demeritPtsRecModal').modal('show');
    };
    
    $scope.download = function() {
    	if ($scope.breakDownBy === 'T') {
    		if ($scope.searchDTO.dateRange != null && !$scope.searchDTO.dateRange == "") {
    			var excelFileName = "driverTrips.xlsx";
        		var resultPromise = DriverService.exportDriverTrips($scope.searchDTO);
    		} else {
    			$scope.$root.errorDialog("Date Range is required for Trip.");
    		}
    		
    	} else if ($scope.breakDownBy === 'V') {
    		var excelFileName = "driverVehicleTypes.xlsx";
    		var resultPromise = DriverService.exportDriverVehicleTypes($scope.searchDTO);
		} else if ($scope.breakDownBy === 'L') {
			var excelFileName = "driverVehicleClasses.xlsx";
			var resultPromise = DriverService.exportDriverVehicleClasses($scope.searchDTO);
		}
    	if (!($scope.breakDownBy === 'T') || ($scope.searchDTO.dateRange != null && !$scope.searchDTO.dateRange == "")) {
			$q.all([ resultPromise ]).then(function(data) {
				$scope.$root.exportFile(data[0], "text/plain", excelFileName);
			});
    	}
	};
	
	$(document).ready(function () {
	    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
	        $('.calendar').fullCalendar('render');
	    });
	});
	
	//calendar
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
					$scope.driverCalendarsSelect = data[0];
					
					if(angular.equals($scope.driverCalendarsSelect.indentReportingVenue,$scope.driverCalendarsSelect.indentDestinationVenue)){
						destination = $scope.driverCalendarsSelect.indentReportingVenue;
					}else{
						destination = $scope.driverCalendarsSelect.indentReportingVenue + " -> " + $scope.driverCalendarsSelect.indentDestinationVenue;
					}
					
					$('#modalTitle').html($scope.driverCalendarsSelect.indentActivity + " @ " + destination);
					
				});
				
				
				$('#fullCalModal').modal();
				
			}else{
				return false;
			}
									
		},
		events: function(start,end,timezone,callback) {
			
			var driverCalendarDTO = new Object();
			var events = [];
			driverCalendarDTO.startDate = start.format('DD-MMM-YYYY HH:mm:ss');
			driverCalendarDTO.endDate = end.format('DD-MMM-YYYY HH:mm:ss');
			driverCalendarDTO.nricNo = $stateParams.nricNo;
			var colors = "";
			var taskDetailId = 0;

			var getDriverCalendarsPromise = DriverService.getDriverCalendars(driverCalendarDTO);
			$q.all([getDriverCalendarsPromise]).then(function(data) {
				$scope.driverCalendars = data[0];
				_.each($scope.driverCalendars, function(driverCalendar) {
					
					if ((driverCalendar.statusCode).indexOf("!") !== -1) {
						colors = "red";
					} else if (driverCalendar.userAssignedFlag === 'Y') {
						colors = "mediumblue";
					} else {
						colors = "black";
					}
					
					if(driverCalendar.taskDetailId !== null){
						taskDetailId = driverCalendar.taskDetailId;
					}else{
						taskDetailId = 0;
					}
					
					events.push({
						id: taskDetailId,
						title: driverCalendar.statusCode,
						start: moment(driverCalendar.startDate,'DD-MMM-YYYY HH:mm:ss'),
						end:  moment(driverCalendar.endDate,'DD-MMM-YYYY HH:mm:ss'),
						color: colors
					});
				
				});
				callback(events);
			});
			
		}

	});
	
	$scope.getAuditLog = function(tableState) {
    	$scope.searchDTO = { startIndex:0, pageSize:Constants.PAGE_SIZE, entityId:$scope.dto.id, entity:'DriverController' };
    	
    	CommonService.initPagination($scope, tableState);
        CommonService.setPaginationSearch($scope, tableState);
        var auditLogPromise = CommonService.getAuditLog($scope.searchDTO);
        $q.all([ auditLogPromise ]).then(function(data) {
        	CommonService.setPaginationResult($scope, tableState, data);
        	$scope.tableState = tableState;
        });
    }
});

app.controller('DriverSkillApprovalController', function($q, $scope, DriverService, CommonService, Constants) {
	if(!$scope.$root.checkAccessRights('showDriverSkillApproval')){return;}
	$scope.decisions = [];
	$scope.searchDTO = { startIndex:0, pageSize:Constants.PAGE_SIZE, statusCodes:[Constants.SKILL_PENDING, Constants.SKILL_PENDING_WITHDRAWAL] };
	$scope.$root.limitAccess($scope.searchDTO);
	var firstLoad = true;
	
	$scope.paginate = function(tableState) {
		if (CommonService.initPagination($scope, tableState)) {
			CommonService.setPaginationSearch($scope, tableState);
			var resultPromise = DriverService.searchDriverSkillApprovals($scope.searchDTO);
			$q.all([ resultPromise ]).then(function(data) {
				CommonService.setPaginationResult($scope, tableState, data);
				_.each($scope.records, function(record) {
					$scope.decisions[record.nricNo] = { id: record.nricNo, idLabel: record.nricNo, decision:'UNDECIDED', decisionReason:undefined };
				});
				if ($scope.records.length === 0 && firstLoad) {
					$scope.$root.infoDialog("No result found.");
				}				
			});	
		} 
	};
	
	$scope.search = function() {
		CommonService.resetPagination($scope, 0, Constants.PAGE_SIZE);
		CommonService.search($scope, "nricNo");
	};
	
	$scope.confirm = function() {
		var confirmedDecisions = [];
		_.each($scope.records, function(record) {
			var decisionDTO = _.clone($scope.decisions[record.nricNo]);
			if (decisionDTO.decision !== 'NO') {
				decisionDTO.decisionReason = undefined; // reset rejection reason
			}
			
			// only send decided records with rejected sub-decisions (the rest of the sub-decisions are assumed to be approved)
			if (decisionDTO.decision !== 'UNDECIDED') {
				var subDecisionDTOs = [];
				if (decisionDTO.decision === 'YES') {
					_.each(record.driverSkills, function(driverSkill) {
						var subDecisionDTO = decisionDTO.subDecisions[driverSkill.typeCode + driverSkill.id];
						if (subDecisionDTO.decision === 'NO') {
							subDecisionDTO.id = driverSkill.typeCode + driverSkill.id;
							if (driverSkill.typeCode === Constants.VEHICLE_FAM_CODE) {
								subDecisionDTO.idLabel = record.nricNo + " (" + driverSkill.vehicleType + ", " + driverSkill.towType + ")";	
							} else if (driverSkill.typeCode === Constants.DRIVING_CATEGORY_CODE) {
								subDecisionDTO.idLabel = record.nricNo + " (" + driverSkill.category + ")";	
							} else if (driverSkill.typeCode === Constants.PROFICIENCY_CODE) {
								subDecisionDTO.idLabel = record.nricNo + " (" + driverSkill.proficiency + ")";
							}							
							subDecisionDTOs.push(subDecisionDTO);
						}
					});	
				}
				decisionDTO.subDecisions = subDecisionDTOs;
				confirmedDecisions.push(decisionDTO);
			}
		});
		var resultPromise = DriverService.approveDriverSkills(confirmedDecisions);
		$q.all([ resultPromise ]).then(function(result) {
			$scope.$root.infoDialog(result[0]);
			$scope.decisions = [];
			$scope.count = 0;
			$('[dcBtnName|="all"]').removeClass('active btn-success btn-danger btn-warning').addClass('btn-default');
			$scope.search();
		});
	};
	
	$scope.decideAll = function(allDecision) {
		_.each($scope.records, function(record) {
			$scope.decisions[record.nricNo].decision = allDecision;
		});
	};
	
	$scope.$watch('tableState', function() {
		if ($scope.tableState) {
			$scope.search();
			firstLoad = false;
		}
    });
});

app.controller('DriverAttachmentEndorsementController', function($q, $scope, DriverService, CommonService, Constants) {
	if(!$scope.$root.checkAccessRights('showDriverAttachmentEndorsement')){return;}
	$scope.decisions = [];
	$scope.searchDTO = { startIndex:0, pageSize:Constants.PAGE_SIZE, statusCodes:[Constants.ATTACHMENT_PENDING_ENDORSEMENT, Constants.ATTACHMENT_EXT_PENDING_ENDORSEMENT] };
	$scope.$root.limitAccess($scope.searchDTO);
	var firstLoad = true;
	
	$scope.paginate = function(tableState) {
		if (CommonService.initPagination($scope, tableState)) {
			CommonService.setPaginationSearch($scope, tableState);
			var resultPromise = DriverService.searchDriverAttachments($scope.searchDTO);
			$q.all([ resultPromise ]).then(function(data) {
				CommonService.setPaginationResult($scope, tableState, data);
				_.each($scope.records, function(record) {
					$scope.decisions[record.id] = { id: record.id, idLabel: record.nricNo, decision:'UNDECIDED', decisionReason:undefined };
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
			if ($scope.decisions[record.id].decision != 'NO') {
				$scope.decisions[record.id].decisionReason = undefined; // reset rejection reason
			}
			if ($scope.decisions[record.id].decision != 'UNDECIDED') {
				confirmedDecisions.push($scope.decisions[record.id]); // only send decided records
			}
		});
		
		var resultPromise = DriverService.endorseDriverAttachments(confirmedDecisions);
		$q.all([ resultPromise ]).then(function(result) {
			$scope.$root.infoDialog(result[0]);
			$scope.decisions = [];
			$scope.count = 0;
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

app.controller('DriverAttachmentApprovalController', function($q, $scope, DriverService, CommonService, Constants) {
	if(!$scope.$root.checkAccessRights('showDriverAttachmentApproval')){return;}
	$scope.decisions = [];
	$scope.searchDTO = { startIndex:0, pageSize:Constants.PAGE_SIZE, statusCodes:[Constants.ATTACHMENT_PENDING_APPROVAL, Constants.ATTACHMENT_EXT_PENDING_APPROVAL] };
	$scope.$root.limitAccess($scope.searchDTO);
	var firstLoad = true;
	
	$scope.paginate = function(tableState) {
		if (CommonService.initPagination($scope, tableState)) {
			CommonService.setPaginationSearch($scope, tableState);
			var resultPromise = DriverService.searchDriverAttachments($scope.searchDTO);
			$q.all([ resultPromise ]).then(function(data) {
				CommonService.setPaginationResult($scope, tableState, data);
				_.each($scope.records, function(record) {
					$scope.decisions[record.id] = { id: record.id, idLabel: record.nricNo, decision:'UNDECIDED', decisionReason:undefined };
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
			if ($scope.decisions[record.id].decision != 'NO') {
				$scope.decisions[record.id].decisionReason = undefined; // reset rejection reason
			}
			if ($scope.decisions[record.id].decision != 'UNDECIDED') {
				confirmedDecisions.push($scope.decisions[record.id]); // only send decided records
			}
		});
		
		var resultPromise = DriverService.approveDriverAttachments(confirmedDecisions);
		$q.all([ resultPromise ]).then(function(result) {
			$scope.$root.infoDialog(result[0]);
			$scope.decisions = [];
			$scope.count = 0;
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

app.controller('DriverRewardVerificationController', function($q, $scope, DriverService, CommonService, Constants) {
	if(!$scope.$root.checkAccessRights('showDriverRewardVerification')){return;}
	$scope.decisions = [];
	$scope.searchDTO = { startIndex:0, pageSize:Constants.PAGE_SIZE, statusCodes:[Constants.PENDING_VERIFICATION, Constants.PENDING_WITHDRAWAL_VERIFICATION] };
	$scope.$root.limitAccess($scope.searchDTO);
	var firstLoad = true;
	
	$scope.paginate = function(tableState) {
		if (CommonService.initPagination($scope, tableState)) {
			CommonService.setPaginationSearch($scope, tableState);
			var resultPromise = DriverService.searchDriverRewards($scope.searchDTO);
			$q.all([ resultPromise ]).then(function(data) {
				CommonService.setPaginationResult($scope, tableState, data);
				_.each($scope.records, function(record) {
					$scope.decisions[record.id] = { id: record.id, idLabel: record.driverNricNo, decision:'UNDECIDED', decisionReason:undefined };
				});
				if($scope.records.length === 0 && firstLoad) {
					$scope.$root.infoDialog("No result found.");
				}
			});	
		} 
	};
	
	$scope.search = function() {
		CommonService.resetPagination($scope, 0, Constants.PAGE_SIZE);
		CommonService.search($scope, "driver.nricNo");
	};
	
	$scope.confirm = function() {
		var confirmedDecisions = [];
		_.each($scope.records, function(record) {
			if ($scope.decisions[record.id].decision != 'NO') {
				$scope.decisions[record.id].decisionReason = undefined; // reset rejection reason
			}
			if ($scope.decisions[record.id].decision != 'UNDECIDED') {
				confirmedDecisions.push($scope.decisions[record.id]); // only send decided records
			}
		});
		
		var resultPromise = DriverService.verifyDriverRewards(confirmedDecisions);
		$q.all([ resultPromise ]).then(function(result) {
			$scope.$root.infoDialog(result[0]);
			$scope.decisions = [];
			$scope.count = 0;
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
		}
    });
});

app.controller('DriverRewardRecommendationController', function($q, $scope, DriverService, CommonService, Constants) {
	if(!$scope.$root.checkAccessRights('showDriverRewardRecommendation')){return;}
	$scope.decisions = [];
	$scope.searchDTO = { startIndex:0, pageSize:Constants.PAGE_SIZE, statusCodes:[Constants.PENDING_RECOMMENDATION, Constants.PENDING_WITHDRAWAL_RECOMMENDATION] };
	$scope.$root.limitAccess($scope.searchDTO);
	var firstLoad = true;
	
	$scope.paginate = function(tableState) {
		if(CommonService.initPagination($scope, tableState)) {
			CommonService.setPaginationSearch($scope, tableState);
			var resultPromise = DriverService.searchDriverRewards($scope.searchDTO);
			$q.all([ resultPromise ]).then(function(data) {
				CommonService.setPaginationResult($scope, tableState, data);
				_.each($scope.records, function(record) {
					$scope.decisions[record.id] = { id: record.id, idLabel: record.driverNricNo, decision:'UNDECIDED', decisionReason:undefined };
				});
				if ($scope.records.length === 0 && firstLoad) {
					$scope.$root.infoDialog("No result found.");
				}
			});	
		} 
	};
	
	$scope.search = function() {
		CommonService.resetPagination($scope, 0, Constants.PAGE_SIZE);
		CommonService.search($scope, "driver.nricNo");
	};
	
	$scope.confirm = function() {
		var confirmedDecisions = [];
		_.each($scope.records, function(record) {
			if ($scope.decisions[record.id].decision != 'NO') {
				$scope.decisions[record.id].decisionReason = undefined; // reset rejection reason
			}
			if ($scope.decisions[record.id].decision != 'UNDECIDED') {
				confirmedDecisions.push($scope.decisions[record.id]); // only send decided records
			}
		});
		
		var resultPromise = DriverService.recommendDriverRewards(confirmedDecisions);
		$q.all([ resultPromise ]).then(function(result) {
			$scope.$root.infoDialog(result[0]);
			$scope.decisions = [];
			$scope.count = 0;
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

app.controller('DriverRewardApprovalController', function($q, $scope, DriverService, CommonService, Constants) {
	if(!$scope.$root.checkAccessRights('showDriverRewardApproval')){return;}
	$scope.decisions = [];
	$scope.searchDTO = { startIndex:0, pageSize:Constants.PAGE_SIZE, statusCodes:[Constants.PENDING_APPROVAL, Constants.PENDING_WITHDRAWAL_APPROVAL] };
	$scope.$root.limitAccess($scope.searchDTO);
	var firstLoad = true;
	
	$scope.paginate = function(tableState) {
		if (CommonService.initPagination($scope, tableState)) {
			CommonService.setPaginationSearch($scope, tableState);
			var resultPromise = DriverService.searchDriverRewards($scope.searchDTO);
			$q.all([ resultPromise ]).then(function(data) {
				CommonService.setPaginationResult($scope, tableState, data);
				_.each($scope.records, function(record) {
					$scope.decisions[record.id] = { id: record.id, idLabel: record.driverNricNo, decision:'UNDECIDED', decisionReason:undefined };
				});
				if ($scope.records.length === 0 && firstLoad) {
					$scope.$root.infoDialog("No result found.");
				}
			});	
		} 
	};
	
	$scope.search = function() {
		CommonService.resetPagination($scope, 0, Constants.PAGE_SIZE);
		CommonService.search($scope, "driver.nricNo");
	};
	
	$scope.confirm = function() {
		var confirmedDecisions = [];
		_.each($scope.records, function(record) {
			if ($scope.decisions[record.id].decision != 'NO') {
				$scope.decisions[record.id].decisionReason = undefined; // reset rejection reason
			}
			if ($scope.decisions[record.id].decision != 'UNDECIDED') {
				confirmedDecisions.push($scope.decisions[record.id]); // only send decided records
			}
		});
		
		var resultPromise = DriverService.approveDriverRewards(confirmedDecisions);
		$q.all([ resultPromise ]).then(function(result) {
			$scope.$root.infoDialog(result[0]);
			$scope.decisions = [];
			$scope.count = 0;
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