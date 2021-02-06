app.controller('DetailSheetController', function($q, $scope, CommonService, SelfServiceService,Constants) {
	if(!$scope.$root.checkAccessRights('showSearchDetailReport')){return;}
	//implementation here
	//$scope.loading = false;
	$scope.searchDTO = { startIndex:0, pageSize:Constants.PAGE_SIZE, order: "", orderProperty:""};
	$scope.maxDate;
	var hubsPromise = CommonService.getHubs();
	var nodesPromise = CommonService.getNodes();
	$q.all([hubsPromise, nodesPromise ]).then(function(data) {
		$scope.hubs = data[0];
    	$scope.nodes = data[1];
    	$scope.searchDTO.startDate = moment();
    	if($scope.session.userRole.cat === 'Unit'){
    		$scope.maxDate = moment().add(Constants.UNIT_CAT_MAX_STARTDATE_SEARCH,'days');
    	}else{
    		$scope.maxDate = moment().add(Constants.NODE_CAT_MAX_STARTDATE_SEARCH,'days');
    	}
	});
	
	$scope.paginate = function(tableState) {
		if (CommonService.initPagination($scope, tableState)) {
			CommonService.setPaginationSearch($scope, tableState);
			var resultPromise = SelfServiceService.searchTaskDetails($scope.searchDTO);
			$q.all([ resultPromise ]).then(function(data) {
				CommonService.setPaginationResult($scope, tableState, data);
				if (data[0].records.length === 0) {
					$scope.$root.infoDialog("No result found.");
				}
				//$scope.loading = false;
			});
		}
	};
	
	$scope.search = function() {
		//$scope.loading = true;
		CommonService.resetPagination($scope, 0, Constants.PAGE_SIZE);
		$scope.searchDTO.order = "desc";
		$scope.searchDTO.orderProperty = "id"; 
		$scope.paginate($scope.tableState);
	};
	
	$scope.reset = function() {
		CommonService.resetPagination($scope, 0, Constants.PAGE_SIZE);
		$scope.searchDTO = { startIndex:0, pageSize:Constants.PAGE_SIZE };
	};
	
	$scope.exportDetailSheet = function(){
		//$scope.loading = true;
		var resultPromise = SelfServiceService.exportDetailSheet($scope.searchDTO);
		$q.all([ resultPromise ]).then(function(data) {
			$scope.$root.exportFile(data[0], "text/plain", "detailsheet.xlsx");
			//$scope.loading = false;
		});	
	};
	
});

app.controller('AllOrdersController', function($q, $scope, CommonService, IndentService, Constants) {
	if(!$scope.$root.checkAccessRights('showSearchAllOrdersReport')){return;}
	var hubsPromise = CommonService.getHubs();
	var nodesPromise = CommonService.getNodes();
	//$scope.loading = false;
	$scope.searchDTO = { startIndex:0, pageSize:Constants.PAGE_SIZE, templateFlag: Constants.FLAG_NO };
	
	$q.all([ hubsPromise, nodesPromise]).then(function(data) {
    	$scope.hubs = data[0];
    	$scope.nodes = data[1];
	});
	
	$scope.paginate = function(tableState) {
		if (CommonService.initPagination($scope, tableState)) {
			CommonService.setPaginationSearch($scope, tableState);
			var resultPromise = IndentService.searchIndents($scope.searchDTO);
			$q.all([ resultPromise ]).then(function(data) {
				CommonService.setPaginationResult($scope, tableState, data);		
				if (data[0].records.length === 0) {
					$scope.$root.infoDialog("No result found.");
				}
				//$scope.loading = false;
			});
		}
	};
	
	$scope.search = function() {
		//$scope.loading = true;
		CommonService.resetPagination($scope, 0, Constants.PAGE_SIZE);
		CommonService.search($scope, "indentNo");
	};
	
	$scope.reset = function() {
		CommonService.resetPagination($scope, 0, Constants.PAGE_SIZE);
		$scope.searchDTO = { startIndex:0, pageSize:Constants.PAGE_SIZE };
	};
	
	$scope.exportAllOrders = function(){
		//$scope.loading = true;
		var resultPromise = IndentService.exportAllOrders($scope.searchDTO);
		$q.all([ resultPromise ]).then(function(data) {
			$scope.$root.exportFile(data[0], "text/plain", "all_orders.xlsx");
			//$scope.loading = false;
		});	
	};
	
});

app.controller('SupportedPurposesReportController', function($q, $scope, CommonService, IndentService, Constants) {
	if(!$scope.$root.checkAccessRights('showSupportedPurposesReport')){return;}
	var hubsPromise = CommonService.getHubs();
	var nodesPromise = CommonService.getNodes();
	$scope.searchDTO = { startIndex:0, pageSize:Constants.PAGE_SIZE, order: "", orderProperty:""};
	
	$q.all([ hubsPromise, nodesPromise]).then(function(data) {
    	$scope.hubs = data[0];
    	$scope.nodes = data[1];
	});
	
	$scope.paginate = function(tableState) {
		if (CommonService.initPagination($scope, tableState)) {
			CommonService.setPaginationSearch($scope, tableState);
			var resultPromise = IndentService.searchSupportedPurposesReport($scope.searchDTO);
			$q.all([ resultPromise ]).then(function(data) {
				CommonService.setPaginationResult($scope, tableState, data);
				if (data[0].records.length === 0) {
					$scope.$root.infoDialog("No result found.");
				}
				//$scope.loading = false;
			});
		}
	};
	
	$scope.search = function() {
		if ($scope.searchDTO.dateRange != null && !$scope.searchDTO.dateRange == "") {
			CommonService.resetPagination($scope, 0, Constants.PAGE_SIZE);
			CommonService.search($scope, "indentNo");
			$scope.searchDTO.order = "desc";
			$scope.searchDTO.orderProperty = "id"; 
			$scope.paginate($scope.tableState);
		} else {
			$scope.$root.errorDialog("Please specify a Date Range.");
		}
	};
	
	$scope.reset = function() {
		CommonService.resetPagination($scope, 0, Constants.PAGE_SIZE);
		$scope.searchDTO = { startIndex:0, pageSize:Constants.PAGE_SIZE };
	};
	
	$scope.exportSupportedPurposesReport = function(){
		if ($scope.searchDTO.dateRange != null && !$scope.searchDTO.dateRange == "") {
			var resultPromise = IndentService.exportSupportedPurposesReport($scope.searchDTO);
			$q.all([ resultPromise ]).then(function(data) {
				$scope.$root.exportFile(data[0], "text/plain", "supported_purposes_report.xlsx");
			});	
		} else {
			$scope.$root.errorDialog("Please specify a Date Range.");
		}
	};
	
});

app.controller('TOMileageReportController', function($q, $scope, CommonService, DriverService, Constants) {
	if(!$scope.$root.checkAccessRights('showTOMileageReport')){return;}
	var hubsPromise = CommonService.getHubs();
	var nodesPromise = CommonService.getNodes();
	$scope.searchDTO = { startIndex:0, pageSize:Constants.PAGE_SIZE, order: "", orderProperty:""};
	
	$q.all([ hubsPromise, nodesPromise]).then(function(data) {
    	$scope.hubs = data[0];
    	$scope.nodes = data[1];
	});
	
	$scope.search = function() {
		if ($scope.searchDTO.dateRange != null && !$scope.searchDTO.dateRange == "") {
			var resultPromise = DriverService.searchTOMileageReport($scope.searchDTO);
			$q.all([ resultPromise ]).then(function(data) {
				if (data[0].length === 0) {
					$scope.$root.infoDialog("No result found.");
				} else {
					$scope.searchTOMileageReport = data[0];
				}
			});
		} else {
			$scope.$root.errorDialog("Please specify a Date Range.");
		}
	};
	
	$scope.reset = function() {
		CommonService.resetPagination($scope, 0, Constants.PAGE_SIZE);
		$scope.searchDTO = { startIndex:0, pageSize:Constants.PAGE_SIZE };
	};
	
	$scope.exportTOMileageReport = function(){
		if ($scope.searchDTO.dateRange != null && !$scope.searchDTO.dateRange == "") {
			var resultPromise = DriverService.exportTOMileageReport($scope.searchDTO);
			$q.all([ resultPromise ]).then(function(data) {
				if (data[0].length === 0) {
					$scope.$root.infoDialog("No result found.");
				} else {
					$scope.$root.exportFile(data[0], "text/plain", "to_mileage_report.xlsx");
				}
			});	
		} else {
			$scope.$root.errorDialog("Please specify a Date Range.");
		}
	};
	
});

app.controller('VehicleMileageReportController', function($q, $scope, CommonService, VehicleService, Constants) {
	if(!$scope.$root.checkAccessRights('showVehicleMileageReport')){return;}
	var hubsPromise = CommonService.getHubs();
	var nodesPromise = CommonService.getNodes();
	$scope.searchDTO = { startIndex:0, pageSize:Constants.PAGE_SIZE, order: "", orderProperty:""};
	
	$q.all([ hubsPromise, nodesPromise]).then(function(data) {
    	$scope.hubs = data[0];
    	$scope.nodes = data[1];
	});
	
	$scope.search = function() {
		if ($scope.searchDTO.dateRange != null && !$scope.searchDTO.dateRange == "") {
			var resultPromise = VehicleService.searchVehicleMileageReport($scope.searchDTO);
			$q.all([ resultPromise ]).then(function(data) {
				$scope.searchVehicleMileageReport = data[0];
			});
		} else {
			$scope.$root.errorDialog("Please specify a Date Range.");
		}
	};
	
	$scope.reset = function() {
		CommonService.resetPagination($scope, 0, Constants.PAGE_SIZE);
		$scope.searchDTO = { startIndex:0, pageSize:Constants.PAGE_SIZE };
	};
	
	$scope.exportVehicleMileageReport = function(){
		if ($scope.searchDTO.dateRange != null && !$scope.searchDTO.dateRange == "") {
			var resultPromise = VehicleService.exportVehicleMileageReport($scope.searchDTO);
			$q.all([ resultPromise ]).then(function(data) {
				if (data[0].length === 0) {
					$scope.$root.infoDialog("No result found.");
				} else {
					$scope.$root.exportFile(data[0], "text/plain", "vehicle_mileage_report.xlsx");
				}
			});
		} else {
				$scope.$root.errorDialog("Please specify a Date Range.");
		}
	};
	
});

app.controller('CreditStatusReportController', function($q, $scope, CommonService, CreditService, Constants) {
	if(!$scope.$root.checkAccessRights('showCreditStatusReport')){return;}
	
	$scope.currentYear = moment().year();

	$scope.searchDTO = { workYear:String($scope.currentYear), startIndex:0, pageSize:Constants.PAGE_SIZE };
	
	$scope.search = function() {
		var resultPromise = CreditService.searchCreditStatusReport($scope.searchDTO);
		$q.all([ resultPromise ]).then(function(data) {
			$scope.searchCreditStatusReport = data[0];
		});
	};
	
	$scope.reset = function() {
		CommonService.resetPagination($scope, 0, Constants.PAGE_SIZE);
		$scope.searchDTO = { startIndex:0, pageSize:Constants.PAGE_SIZE };
	};
	
	$scope.exportCreditStatusReport = function(){
		var resultPromise = CreditService.exportCreditStatusReport($scope.searchDTO);
		$q.all([ resultPromise ]).then(function(data) {
			$scope.$root.exportFile(data[0], "text/plain", "credit_status_report.xlsx");
		});
	};
	
});

app.controller('TaskFulfilmentReportController', function($q, $scope, CommonService, TaskService, Constants) {
	if(!$scope.$root.checkAccessRights('showTaskFulfilmentReport')){return;}
	var hubsPromise = CommonService.getHubs();
	var nodesPromise = CommonService.getNodes();
	$scope.searchDTO = { startIndex:0, pageSize:Constants.PAGE_SIZE, order: "", orderProperty:""};

	$q.all([ hubsPromise, nodesPromise]).then(function(data) {
    	$scope.hubs = data[0];
    	$scope.nodes = data[1];
	});
	
	$scope.search = function() {
		if ($scope.searchDTO.dateRange != null && !$scope.searchDTO.dateRange == "") {
			var resultPromise = TaskService.searchTaskFulfilmentReport($scope.searchDTO);
			$q.all([ resultPromise ]).then(function(data) {
				$scope.searchTaskFulfilmentReport = data[0];
			});
		} else {
			$scope.$root.errorDialog("Please specify a Date Range.");
		}
	};
	
	$scope.reset = function() {
		CommonService.resetPagination($scope, 0, Constants.PAGE_SIZE);
		$scope.searchDTO = { startIndex:0, pageSize:Constants.PAGE_SIZE };
	};
	
	$scope.exportTaskFulfilmentReport = function(){
		if ($scope.searchDTO.dateRange != null && !$scope.searchDTO.dateRange == "") {
			var resultPromise = TaskService.exportTaskFulfilmentReport($scope.searchDTO);
			$q.all([ resultPromise ]).then(function(data) {
				if (data[0].length === 0) {
					$scope.$root.infoDialog("No result found.");
				} else {
					$scope.$root.exportFile(data[0], "text/plain", "task_fulfilment_report.xlsx");
				}
			});
		} else {
				$scope.$root.errorDialog("Please specify a Date Range.");
		}
	};
	
});

app.controller('TOUtilisationRateReportController', function($q, $scope, CommonService, DriverService, Constants) {
	if(!$scope.$root.checkAccessRights('showTOUtilisationRateReport')){return;}
	var hubsPromise = CommonService.getHubs();
	var nodesPromise = CommonService.getNodes();
	$scope.searchDTO = { startIndex:0, pageSize:Constants.PAGE_SIZE, order: "", orderProperty:""};

	$q.all([ hubsPromise, nodesPromise]).then(function(data) {
    	$scope.hubs = data[0];
    	$scope.nodes = data[1];
	});
	
	$scope.search = function() {
		if ($scope.searchDTO.dateRange != null && !$scope.searchDTO.dateRange == "") {
			var resultPromise = DriverService.searchTOUtilisationRateReport($scope.searchDTO);
			$q.all([ resultPromise ]).then(function(data) {
				if (data[0].length === 0) {
					$scope.$root.infoDialog("No result found.");
				} else {
					$scope.searchTOUtilisationRateReport = data[0];
				}
			});
		} else {
			$scope.$root.errorDialog("Please specify a Date Range.");
		}
	};
	
	$scope.reset = function() {
		CommonService.resetPagination($scope, 0, Constants.PAGE_SIZE);
		$scope.searchDTO = { startIndex:0, pageSize:Constants.PAGE_SIZE };
	};
	
	$scope.exportTOUtilisationRateReport = function(){
		if ($scope.searchDTO.dateRange != null && !$scope.searchDTO.dateRange == "") {
			var resultPromise = DriverService.exportTOUtilisationRateReport($scope.searchDTO);
			$q.all([ resultPromise ]).then(function(data) {
				if (data[0].length === 0) {
					$scope.$root.infoDialog("No result found.");
				} else {
					$scope.$root.exportFile(data[0], "text/plain", "to_utilisation_rate_report.xlsx");
				}
			});	
		} else {
			$scope.$root.errorDialog("Please specify a Date Range.");
		}
	};
	
});

app.controller('VehicleUtilisationRateReportController', function($q, $scope, CommonService, VehicleService, Constants) {
	if(!$scope.$root.checkAccessRights('showVehicleUtilisationRateReport')){return;}
	var hubsPromise = CommonService.getHubs();
	var nodesPromise = CommonService.getNodes();
	$scope.searchDTO = { startIndex:0, pageSize:Constants.PAGE_SIZE, order: "", orderProperty:""};

	$q.all([ hubsPromise, nodesPromise]).then(function(data) {
    	$scope.hubs = data[0];
    	$scope.nodes = data[1];
	});
	
	$scope.search = function() {
		if ($scope.searchDTO.dateRange != null && !$scope.searchDTO.dateRange == "") {
			var resultPromise = VehicleService.searchVehicleUtilisationRateReport($scope.searchDTO);
			$q.all([ resultPromise ]).then(function(data) {
				$scope.searchVehicleUtilisationRateReport = data[0];
			});
		} else {
			$scope.$root.errorDialog("Please specify a Date Range.");
		}
	};
	
	$scope.reset = function() {
		CommonService.resetPagination($scope, 0, Constants.PAGE_SIZE);
		$scope.searchDTO = { startIndex:0, pageSize:Constants.PAGE_SIZE };
	};
	
	$scope.exportVehicleUtilisationRateReport = function(){
		if ($scope.searchDTO.dateRange != null && !$scope.searchDTO.dateRange == "") {
			var resultPromise = VehicleService.exportVehicleUtilisationRateReport($scope.searchDTO);
			$q.all([ resultPromise ]).then(function(data) {
				if (data[0].length === 0) {
					$scope.$root.infoDialog("No result found.");
				} else {
					$scope.$root.exportFile(data[0], "text/plain", "vehicle_utilisation_rate_report.xlsx");
				}
			});
		} else {
				$scope.$root.errorDialog("Please specify a Date Range.");
		}
	};
	
});

app.controller('AdhocReportController', function($q, $scope, CommonService, ReportService, Constants) {
	if(!$scope.$root.checkAccessRights('showAdhocReport')){return;}
	
	$scope.searchDTO = {};
	
	var indentStatusesPromise = CommonService.getStatuses("INDENT");
	var hubsPromise = CommonService.getHubs();
	var nodesPromise = CommonService.getNodes();
	var unitsPromise = CommonService.getUnits();
	var subunitsPromise = CommonService.getSubunits();
	var vehicleTypesPromise = CommonService.getVehicleTypes();
//	var vehicleTypesPromise = "";
	var vehiclePurposesPromise = CommonService.getPurposes();
	var activityTypesPromise = CommonService.getActivityTypes();
	var venuesPromise = CommonService.getVenues();
	var countriesPromise = CommonService.getCountries();
	var resourceTypesPromise = CommonService.getResourceTypes();
	var taskStatusesPromise = CommonService.getStatuses("TASK");
	var taskDetailStatusesPromise = CommonService.getStatuses("DETAIL");
	var esEquipmentsPromise = CommonService.getEsEquipments();
	var vehiclePermitClassesPromise = CommonService.getPermitClasses();
	var driverTypesPromise = CommonService.getDriverTypes();
	
	$q.all([ indentStatusesPromise, hubsPromise, nodesPromise, unitsPromise, subunitsPromise, vehicleTypesPromise, vehiclePurposesPromise, activityTypesPromise, venuesPromise, 
	         countriesPromise, resourceTypesPromise, taskStatusesPromise, taskDetailStatusesPromise, esEquipmentsPromise, vehiclePermitClassesPromise, driverTypesPromise ]).then(function(data) {
	    $scope.indentStatuses = data[0];
		$scope.hubs = data[1];
		$scope.nodes = data[2];
		$scope.units = data[3];
		$scope.subUnits = data[4];
		$scope.vehicleTypes = data[5];
		$scope.vehiclePurposes = data[6];
		$scope.activityTypes = data[7];
		$scope.venues = data[8];
		$scope.countries = data[9];
		$scope.resourceTypes = data[10];
		$scope.taskStatuses = data[11];
		$scope.taskDetailStatuses = data[12];
		$scope.esEquipments = data[13];
		$scope.vehiclePermitClasses = data[14];
		$scope.driverTypes = data[15];
	});
	
	$scope.removeCriteria = function(index, item) {
		$scope.models.lists.B.splice(index, 1);
        $scope.models.lists.A.push(item);
	};
	
    $scope.reset = function() {
        for (var i = 0; i < $scope.models.lists.B.length; i++) {
            $scope.models.lists.A.push($scope.models.lists.B[i]);
        }
        $scope.models.lists.B = [];
	};
	
	$scope.changeModule = function() {
        var module = $scope.searchDTO.module;
        if (module === "indent") {
            $scope.columns = [
              ["indentNo", "Indent No.", "text", ""],
              ["name", "Activity Name / Purpose", "text", ""],
              ["activityType.code", "Activity Type", "activityType", "activityType.name"],
              ["startDate", "Indent Start Date", "date", ""],
              ["endDate", "Indent End Date", "date", ""],
              ["campMovement", "Camp Movement", "inOut", ""],
              ["reportingVenue.id", "Reporting Venue", "venue", "reportingVenue.name"],
              ["destinationVenue.id", "Destination Venue", "venue", "destinationVenue.name"],
              ["reportingInfo", "Reporting Info", "text", ""],
              ["destinationInfo", "Destination Info", "text", ""],
              ["unit.code", "Unit", "unit", "unit.name"],
              ["subUnit.id", "Subunit", "subUnit", "subUnit.name"],
              ["credits", "Credits", "bigDecimal", ""],
              ["hub.code", "Hub", "hub", "hub.name"],
              ["node.id", "Node", "node", "node.name"],
              ["overseasFlag", "Overseas", "yesNo", ""],
              ["country.code", "Country", "country", "country.name"],
              ["indentResources.parkdownFlag", "Park-Down", "yesNo", ""],
              ["waitingListFlag", "Waiting List", "yesNo", ""],
              ["transferredFlag", "Forwarded", "yesNo", ""],
              ["pocNricNo", "POC NRIC No", "text", ""],
              ["pocName", "POC Name", "text", ""],
              ["pocMobileNo", "POC Mobile No.", "text", ""],
              ["pocOfficeNo", "POC Office No.", "text", ""],
              ["approveDate", "Approve Date", "date", ""],
              ["approvedBy", "Approved By", "text", ""],
              ["confirmDate", "Confirm Date", "date", ""],
              ["confirmedBy", "Confirmed By", "text", ""],
              ["createDate", "Create Date", "date", ""],
              ["createdBy", "Created By", "text", ""],
              ["submitDate", "Submit Date", "date", ""],
              ["submittedBy", "Submitted By", "text", ""],
              ["status.code", "Indent Status", "indentStatus", "status.name"],
              ["reason", "Rejection Reason", "text", ""]
            ].map(function(element) {
                return {
                    code: element[0],
                    name: element[1],
                    type: element[2],
                    projectionField: element[3]
                };
            });
        } else if (module === "indentResource") {
            $scope.columns = [
                ["id", "Indent Resource ID", "number", ""],
                ["indent.indentNo", "Indent No.", "text", ""],
                ["resourceType.code", "Resource Type", "resourceType", "resourceType.name"],
                ["credits", "Credits", "bigDecimal", ""],
                ["operatorQuantity", "Driver Quantity", "number", ""],
                ["vehicleQuantity", "Vehicle Quantity", "number", ""],
                ["vehicleType.id", "Vehicle Type", "vehicleType", "vehicleType.name"],
                ["purpose.id", "Vehicle Purpose", "vehiclePurpose", "purpose.name"],
                ["parkdownFlag", "Park-Down", "yesNo", ""],
                ["parkdownTime", "Park-Down Date", "date", ""],
                ["parkdownDuration", "Park-Down Duration", "number", ""],
                ["remarks", "Remarks", "text", ""]
            ].map(function(element) {
                return {
                    code: element[0],
                    name: element[1],
                    type: element[2],
                    projectionField: element[3]
                };
            });
        } else if (module === "task") {
            $scope.columns = [
                ["id", "Task ID", "number", ""],
                ["indent.indentNo", "Indent No.", "text", ""],
                ["indentResource.id", "Indent Resource ID", "number", ""],
                ["credits", "Credits", "bigDecimal", ""],
                ["startDate", "Task Start Date", "date", ""],
                ["endDate", "Task End Date", "date", ""],
                ["status.code", "Status", "taskStatus", "status.name"],
                ["createDate", "Create Date", "date", ""],
                ["createdBy", "Create By", "text", ""]
            ].map(function(element) {
                return {
                    code: element[0],
                    name: element[1],
                    type: element[2],
                    projectionField: element[3]
                };
            });
        } else if (module === "taskDetail") {
            $scope.columns = [
                ["id", "Task Detail ID", "number", ""],
                ["task.id", "Task ID", "number", ""],
                ["indent.indentNo", "Indent No.", "text", ""],
                ["startDate", "Task Detail Start Date", "date", ""],
                ["endDate", "Task Detail End Date", "date", ""],
                ["bookinDate", "Book-In Date", "date", ""],
                ["bookoutDate", "Book-Out Date", "date", ""],
                ["calculatedMileage", "Transponder Mileage", "bigDecimal", ""],
                ["mileage", "Mileage", "bigDecimal", ""],
                ["mileageOverrideFlag", "Mileage Adjusted", "yesNo", ""],
                ["driver.nricNo", "Driver NRIC No.", "text", ""],
                ["driver.name", "Driver Name", "text", ""],
                ["vehicle.vehicleNo", "Vehicle No.", "text", ""],
                ["vehicleType.id", "Vehicle Type", "vehicleType", "vehicleType.name"],
                ["status.code", "Status", "taskDetailStatus", "status.name"],
                ["createDate", "Create Date", "date", ""],
                ["createdBy", "Create By", "text", ""]
            ].map(function(element) {
                return {
                    code: element[0],
                    name: element[1],
                    type: element[2],
                    projectionField: element[3]
                };
            });
        } else if (module === "driver") {
            $scope.columns = [
                ["nricNo", "NRIC No.", "text", ""],
                ["name", "Name", "text", ""],
                ["driverType.code", "Driver Type", "driverType", "driverType.name"],
                ["unit.code", "Driver Unit", "unit", "unit.name"],
                ["ehrHub.code", "e-HR Hub", "hub", "ehrHub.name"],
                ["ehrNode.id", "e-HR Node", "node", "ehrNode.name"],
                ["opsTagNode.id", "Node", "node", "opsTagNode.name"],
                ["attachedNode.id", "Attached Node", "node", "attachedNode.name"],
                ["opsTagUnit.code", "Ops Tag Unit", "unit", "opsTagUnit.name"],
                ["opsTagSubunit.id", "Ops Tag Subunit", "subUnit", "opsTagSubunit.name"],
                ["platoon", "Platoon", "text", ""],
                ["section", "Section", "text", ""],
                ["mileage", "Total Mileage", "bigDecimal", ""],
                ["lastAccidentDate", "Last Accident Date", "date", ""],
                ["mileageSinceLastAccident", "Total Mileage Since Last Traffic Accident", "bigDecimal", ""],
                ["incentiveMileage", "Eligible Mileage for Incentive", "bigDecimal", ""],
                ["safetyBadgeMileage", "Eligible Mileage for Safe & Courteous Badge", "bigDecimal", ""],
                ["cl2Mileage", "Eligible Mileage for CL2B/2A/2 CDL Conversion", "bigDecimal", ""],
                ["cl3Mileage", "Eligible Mileage for CL3 CDL Conversion", "bigDecimal", ""],
                ["cl4Mileage", "Eligible Mileage for CL4 CDL Conversion", "bigDecimal", ""],
                ["demeritPoints", "Demerit Points", "number", ""]
            ].map(function(element) {
                return {
                    code: element[0],
                    name: element[1],
                    type: element[2],
                    projectionField: element[3]
                };
            });
        } else if (module === "vehicle") {
            $scope.columns = [
                ["vehicleNo", "Vehicle No", "text", ""],
                ["vehicleType.id", "Vehicle Type", "vehicleType", "vehicleType.name"],
                ["ehrHub.code", "e-HR Hub", "hub", "ehrHub.name"],
                ["ehrNode.id", "e-HR Node", "node", "ehrNode.name"],
                ["loanNode.id", "Loaned Node", "node", "loanNode.name"],
                ["esLocation.name", "ES Location", "text", ""],
                ["esStorageLocation.name", "ES Storage Location", "text", ""],
                ["esCostCenter.name", "Cost Center", "text", ""],
                ["ivdInfo", "IVD Info", "text", ""],
                ["esEquipment.id", "ES Equipment Description", "esEquipment", "esEquipment.name"],
                ["esMaterial", "ES Material Description", "text", ""],
                ["vehicleType.frontCapacity", "Front Capacity", "number", ""],
                ["vehicleType.rearCapacity", "Rear Capacity", "number", ""],
                ["vehicleType.militaryLoadClass", "Military Load Class", "text", ""],
                ["maintenanceCycle.extVendorFlag", "PM by Ext. Vendor", "yesNo", ""],
                ["maintenanceCycle.monthsInterval", "PM Interval Months", "number", ""],
                ["maintenanceCycle.mileageInterval", "PM Interval Mileage", "number", ""],
                ["vehicleType.pmMajorDuration", "Major PM Duration", "number", ""],
                ["vehicleType.pmNormalDuration", "Minor PM Duration", "number", ""],
                ["vehicleType.speedLimit", "Speed Limit", "number", ""],
                ["permitClass.code", "Vehicle Permit Class", "vehiclePermitClass", "permitClass.name"],
                ["mileage", "Mileage", "bigDecimal", ""]
            ].map(function(element) {
                return {
                    code: element[0],
                    name: element[1],
                    type: element[2],
                    projectionField: element[3]
                };
            });
        }
        $scope.models = {
	       selected: null,
	       lists: {"A": $scope.columns, "B": []}
        };
        
        $scope.export = function() {
        	var hasAtLeastOneDisplayField = false;
            for (var i = 0; i < $scope.models.lists.B.length; i++) {
                if (angular.isUndefined($scope.models.lists.B[i].displayType)) {
                	alert("Please select a type.");
                	return;
                } else if ($scope.models.lists.B[i].displayType != 1) {
                	if (angular.isUndefined($scope.models.lists.B[i].criteria)) {
                		alert("Please select a criteria.");
                		return;
                	} else if (angular.isUndefined($scope.models.lists.B[i].conjunction)) {
                		if (i != $scope.models.lists.B.length - 1) {
                			for (var j = i + 1; j < $scope.models.lists.B.length; j++) {
                				if ($scope.models.lists.B[j].displayType != 1) {
                					alert("Please select a conjunction.");
                        			return;
                				}
                			}
                		}
                	}
                }
                if ($scope.models.lists.B[i].displayType != 2) {
                	hasAtLeastOneDisplayField = true;
                }
            }
            
            if ($scope.models.lists.B.length > 0) {
            	if (!hasAtLeastOneDisplayField) {
                	alert("Please select at least 1 field to display");
                	return;
                }
            	var dto = { test:"1", criterias: $scope.models.lists.B };
            	if (module === "indent") {
            		var excelFileName = "indent_adhoc_report.xlsx";
            	} else if (module === "indentResource") {
            		var excelFileName = "indent_resource_adhoc_report.xlsx";
            	} else if (module === "task") {
            		var excelFileName = "task_adhoc_report.xlsx";
            	} else if (module === "taskDetail") {
            		var excelFileName = "task_detail_adhoc_report.xlsx";
            	} else if (module === "driver") {
            		var excelFileName = "driver_adhoc_report.xlsx";
            	} else if (module === "vehicle") {
            		var excelFileName = "vehicle_adhoc_report.xlsx";
            	}
            	var resultPromise = ReportService.exportAdhocReport($scope.models.lists.B, module);
            	$q.all([ resultPromise ]).then(function(data) {
    				$scope.$root.exportFile(data[0], "text/plain", excelFileName);
    			});
            } else {
            	alert("Please select at least 1 field");
            }
    	};
    }
	
});