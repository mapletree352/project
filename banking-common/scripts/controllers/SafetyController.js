app.controller('DriverOffenceSearchController', function($q, $scope, SafetyService, CommonService, Constants) {
	if(!$scope.$root.checkAccessRights('showSearchDriverOffences')){return;}
	var statusesPromise = CommonService.getStatuses('APPROVAL');
	var offencesPromise = CommonService.getOffences();
	var offenceTypesPromise = CommonService.getOffenceTypes();
	var offenceIssuersPromise = CommonService.getOffenceIssuers();
	var permitStatusesPromise = CommonService.getStatuses('PERMIT');
	$scope.advSearchCollapsed = true;
	$scope.searchDTO = { startIndex:0, pageSize:Constants.PAGE_SIZE };
	$scope.permitStatuses = [];
	
	$q.all([ statusesPromise, offencesPromise, offenceTypesPromise, offenceIssuersPromise, permitStatusesPromise ]).then(function(data) {
		$scope.statuses = data[0];
		$scope.offences = data[1];
		$scope.offenceTypes = data[2];
		$scope.offenceIssuers = data[3];
		_.each(data[4], function(permitStatus) {
			if (permitStatus.code === 'PRMT_SUS' || permitStatus.code === 'PRMT_REV') {
				$scope.permitStatuses.push(permitStatus);
			}	
		});
	});
	
	$scope.paginate = function(tableState) {
		$scope.checkboxes = { all: false, records: {} };
		if (CommonService.initPagination($scope, tableState)) {
			CommonService.setPaginationSearch($scope, tableState);
			var resultPromise = SafetyService.searchDriverOffences($scope.searchDTO);
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
	
	$scope.download = function() {
		var resultPromise = SafetyService.exportDriverOffences($scope.searchDTO);
		$q.all([ resultPromise ]).then(function(data) {
			$scope.$root.exportFile(data[0], "text/plain", "driver_offences.xlsx");
		});
	};
	
	$scope.reset = function() {
		CommonService.resetPagination($scope, 0, Constants.PAGE_SIZE);
		$scope.searchDTO = { startIndex:0, pageSize:Constants.PAGE_SIZE };
		$scope.driver = "";
		$scope.vehicle = "";
	};
});

app.controller('DriverOffenceController', function($q, $scope, $stateParams, SafetyService, CommonService, Constants) {
	if(!$scope.$root.checkAccessRights('showSearchDriverOffences')){return;}
	var driverOffencePromise = SafetyService.getDriverOffence($stateParams.driverOffenceId);
	$scope.permitStatuses = [];
	
	$q.all([ driverOffencePromise ]).then(function(data) {
		$scope.dto = data[0];
		$scope.vehicle = $scope.dto.vehicleNo + ' (' + $scope.dto.vehicleType + ')';
		$scope.isEditable = ($scope.dto.status === 'Pending');
		if ($scope.isEditable) {
			var offencesPromise = CommonService.getOffences('N');
			var offenceTypesPromise = CommonService.getOffenceTypes('N');
			var offenceIssuersPromise = CommonService.getOffenceIssuers();
			var permitStatusesPromise = CommonService.getStatuses('PERMIT');
			$q.all([ offencesPromise, offenceTypesPromise, offenceIssuersPromise, permitStatusesPromise ]).then(function(data) {
				$scope.offences = data[0];
				$scope.offenceTypes = data[1];
				$scope.offenceIssuers = data[2];
				_.each(data[3], function(permitStatus) {
					if (permitStatus.code === 'PRMT_SUS' || permitStatus.code === 'PRMT_REV') {
						$scope.permitStatuses.push(permitStatus);	
					}
				});
			});	
		}
	});
	
	$scope.update = function() {
		var resultPromise = SafetyService.updateDriverOffence($scope.dto);
		$q.all([ resultPromise ]).then(function(result) {
			$scope.$root.infoDialog(result[0]);
		});
	};
	
	$scope.delete = function() {
		var resultPromise = SafetyService.deleteDriverOffence($stateParams.driverOffenceId);
		$q.all([ resultPromise ]).then(function(result) {
			$scope.$root.infoDialog(result[0]);
			$scope.$root.go('driver_offences');
		});
	};
	
	$scope.getAuditLog = function(tableState) {
    	$scope.searchDTO = { startIndex:0, pageSize:Constants.PAGE_SIZE, entityId:$scope.dto.id, entity:'DriverOffenceController' };
    	
    	CommonService.initPagination($scope, tableState);
        CommonService.setPaginationSearch($scope, tableState);
        var auditLogPromise = CommonService.getAuditLog($scope.searchDTO);
        $q.all([ auditLogPromise ]).then(function(data) {
        	CommonService.setPaginationResult($scope, tableState, data);
        	$scope.tableState = tableState;
        });
    }
});

app.controller('DriverOffenceNewController', function($q, $scope, SafetyService, CommonService) {
	if(!$scope.$root.checkAccessRights('showNewDriverOffence')){return;}
	var offencesPromise = CommonService.getOffences('N');
	var offenceTypesPromise = CommonService.getOffenceTypes('N');
	var offenceIssuersPromise = CommonService.getOffenceIssuers();
	var permitStatusesPromise = CommonService.getStatuses('PERMIT');
	$scope.permitStatuses = [];
	
	$q.all([ offencesPromise, offenceTypesPromise, offenceIssuersPromise, permitStatusesPromise ]).then(function(data) {
		$scope.offences = data[0];
		$scope.offenceTypes = data[1];
		$scope.offenceIssuers = data[2];
		_.each(data[3], function(permitStatus) {
			if (permitStatus.code === 'PRMT_SUS' || permitStatus.code === 'PRMT_REV') {
				$scope.permitStatuses.push(permitStatus);	
			}	
		});
	});
	
	$scope.onSelectDriver = function($item) {
		$scope.dto.driverNricNo = $item.code; 
		var driverPermitNoPromise = SafetyService.getDriverPermitNo($scope.dto.driverNricNo);
		$q.all([ driverPermitNoPromise ]).then(function(data) {
			$scope.driverPermitNo = data[0];
		});
	};
	
	$scope.save = function() {
		var resultPromise = SafetyService.saveDriverOffence($scope.dto);
		$q.all([ resultPromise ]).then(function(result) {
			$scope.$root.infoDialog(result[0]);
			$scope.reset();
		});
	};
	
	$scope.reset = function() {
		$scope.dto = {};
		$scope.driverPermitNo = "";
		$scope.permitStatuses = "";
		$scope.driver = "";
		$scope.vehicle = "";
	};
});

app.controller('DriverOffenceApprovalController', function($q, $scope, SafetyService, CommonService, Constants) {
	if(!$scope.$root.checkAccessRights('showDriverOffenceApproval')){return;}
	$scope.decisions = [];
	$scope.searchDTO = { startIndex:0, pageSize:Constants.PAGE_SIZE, statusCode:Constants.PENDING };
	var firstLoad = true;
	
	$scope.paginate = function(tableState) {
		if(CommonService.initPagination($scope, tableState)) {
			CommonService.setPaginationSearch($scope, tableState);
			var resultPromise = SafetyService.searchDriverOffenceApprovals($scope.searchDTO);
			$q.all([ resultPromise ]).then(function(data) {
				CommonService.setPaginationResult($scope, tableState, data);
				_.each($scope.records, function(record) {
					$scope.decisions[record.id] = { id: record.id, idLabel: record.driverNricNo, decision:'UNDECIDED', decisionReason:'' };
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
	}
	
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
		var resultPromise = SafetyService.approveDriverOffences(confirmedDecisions);
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

app.controller('DriverReductionSearchController', function($q, $scope, SafetyService, CommonService, Constants) {
	if(!$scope.$root.checkAccessRights('showSearchDemeritPointsReductions')){return;}
	var statusesPromise = CommonService.getStatuses('APPROVAL');
	$scope.searchDTO = { startIndex:0, pageSize:Constants.PAGE_SIZE };
	
	$q.all([ statusesPromise ]).then(function(data) {
		$scope.statuses = data[0];
	});
	
	$scope.paginate = function(tableState) {
		$scope.checkboxes = { all: false, records: {} };
		if (CommonService.initPagination($scope, tableState)) {
			CommonService.setPaginationSearch($scope, tableState);
			var resultPromise = SafetyService.searchDriverReductions($scope.searchDTO);
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
	
	$scope.download = function() {
		var resultPromise = SafetyService.exportDriverReductions($scope.searchDTO);
		$q.all([ resultPromise ]).then(function(data) {
			$scope.$root.exportFile(data[0], "text/plain", "demerit_points_reductions.xlsx");
		});
	};
	
	$scope.reset = function() {
		CommonService.resetPagination($scope, 0, Constants.PAGE_SIZE);
		$scope.searchDTO = { startIndex:0, pageSize:Constants.PAGE_SIZE };
	};
});

app.controller('DriverReductionController', function($q, $scope, $stateParams, SafetyService, CommonService, Constants) {
	if(!$scope.$root.checkAccessRights('showSearchDemeritPointsReductions')){return;}
	var driverReductionPromise = SafetyService.getDriverReduction($stateParams.driverDemeritPointsId);
	
	$q.all([ driverReductionPromise ]).then(function(data) {
		$scope.dto = data[0];
	});
	
	$scope.update = function() {
		var resultPromise = SafetyService.updateDriverReduction($scope.dto);
		$q.all([ resultPromise ]).then(function(result) {
			$scope.$root.infoDialog(result[0]);
		});
	};
	
	$scope.delete = function() {
		var resultPromise = SafetyService.deleteDriverReduction($stateParams.driverDemeritPointsId);
		$q.all([ resultPromise ]).then(function(result) {
			$scope.$root.infoDialog(result[0]);
			$scope.$root.go('driver_reductions');
		});
	};
	
	$scope.getAuditLog = function(tableState) {
    	$scope.searchDTO = { startIndex:0, pageSize:Constants.PAGE_SIZE, entityId:$scope.dto.id, entity:'DriverReductionController' };
    	
    	CommonService.initPagination($scope, tableState)
        CommonService.setPaginationSearch($scope, tableState);
        var auditLogPromise = CommonService.getAuditLog($scope.searchDTO);
        $q.all([ auditLogPromise ]).then(function(data) {
        	CommonService.setPaginationResult($scope, tableState, data);
        	$scope.tableState = tableState;
        });
    }
});

app.controller('DriverReductionNewController', function($q, $scope, SafetyService) {
	if(!$scope.$root.checkAccessRights('showNewDemeritPointsReduction')){return;}
	$scope.dto = {};
	
	$scope.onSelectDriver = function($item) {
		$scope.dto.driverNricNo = $item.code; 
		var currentDemeritPointsPromise = SafetyService.getCurrentDemeritPoints($item.code);
		$q.all([ currentDemeritPointsPromise ]).then(function(data) {
			$scope.currentDemeritPoints = data[0];
		});
	};
	
	$scope.save = function() {
		var resultPromise = SafetyService.saveDriverReduction($scope.dto);
		$q.all([ resultPromise ]).then(function(result) {
			$scope.$root.infoDialog(result[0]);
			$scope.reset();
		});
	};
	
	$scope.reset = function() {
		$scope.dto = {};
		$scope.driver = "";
		$scope.currentDemeritPoints = "";
	};
});

app.controller('DriverReductionApprovalController', function($q, $scope, SafetyService, CommonService, Constants) {
	if(!$scope.$root.checkAccessRights('showDemeritPointsReductionApproval')){return;}
	$scope.decisions = [];
	$scope.searchDTO = { startIndex:0, pageSize:Constants.PAGE_SIZE, statusCode:Constants.PENDING };
	var firstLoad = true;
	
	$scope.paginate = function(tableState) {
		if (CommonService.initPagination($scope, tableState)) {
			CommonService.setPaginationSearch($scope, tableState);
			var resultPromise = SafetyService.searchDriverReductionApprovals($scope.searchDTO);
			$q.all([ resultPromise ]).then(function(data) {
				CommonService.setPaginationResult($scope, tableState, data);
				_.each($scope.records, function(record) {
					$scope.decisions[record.id] = { id: record.id, idLabel: record.driverNricNo, decision:'UNDECIDED', decisionReason:'' };
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
	}
	
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
		var resultPromise = SafetyService.approveDriverReductions(confirmedDecisions);
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