app.controller('IndentCreateController', function($q, $scope, $stateParams, IndentService, CommonService, Constants) {
	if(!$scope.$root.checkAccessRights('showNewIndent')){return;}
	var activitiesPromise = CommonService.getActivities();
	var venueTypesPromise = CommonService.getVenueTypes();
	var countriesPromise = CommonService.getCountries();
	var subUnitsPromise = CommonService.getSubunits();
	var towTypesPromise = CommonService.getTowTypes('N');
	var proPromise = CommonService.getProficiencies('N');;
	var vehicleTypesPromise = CommonService.getVehicleTypes('N');
	var resourceTypesPromise = CommonService.getResourceTypes();
	var counter = 1;
	var parkdownCounter = 1;
	
	$scope.checkBlank = 'N'; //when refreshed, hide everything
	$scope.checkboxes = { all:false, records:{ } };
	$scope.dto = { indentResources:[ ] };
	$scope.parkdown = { };
	$scope.ns = { };
	$scope.manual = { };
	//$scope.loading = false;
	$scope.chartLoading = false;
	//chart data here
	$scope.stackedBar = 'StackedBar';
	$scope.colours = ['#FF0000','#0000ff'];
	$scope.series = ['Indented', 'Balance'];
	//chart data here
	
	//Filtering	
	$scope.filterResourceTypes = function(isOverseas) {
		return IndentService.filterResourceTypes(isOverseas);
	};
	
	$scope.filterVehicleTypes = function(id) {
		if(id != undefined){
			$scope.indentResource.vehicle = null;
			var vehicleTypesPromise = CommonService.getVehicleTypePurposes(id);
			
			$q.all([ vehicleTypesPromise ]).then(function(data) {
				$scope.vehicleTypes = data[0];
			});
		}
		_.each($scope.purposes, function(purpose) {
			if(purpose.id == id){
				$scope.indentResource.purposeName = purpose.name;
			}
		});
	};
	
	$scope.filterReportingVenues = function(id, resetVenueId) {
		if(id != undefined){
			if (resetVenueId) {
				$scope.dto.reportingVenueId = null;	
			}
			var venuesPromise = CommonService.getVenues(id);
			$q.all([ venuesPromise ]).then(function(data) {
				$scope.reportingVenues = data[0];
			});
		}
	};
	
	$scope.filterDestinationVenues = function(id, resetVenueId) {
		if(id != undefined){
			if (resetVenueId) {
				$scope.dto.destinationVenueId = null;	
			}
			var venuesPromise = CommonService.getVenues(id);
			$q.all([ venuesPromise ]).then(function(data) {
				$scope.destinationVenues = data[0];
			});
		}
	};
	// End of Filtering
	
	$scope.mappedIndent = IndentService.mapIndent().getMappedIndent();  //Draft, Reverted, Recalled, template indents
	IndentService.mapIndent().addIndent(null);
	if($scope.mappedIndent != null){
		$scope.dto = $scope.mappedIndent;
		$scope.isEditTemplate = $scope.mappedIndent.isEditTemplate;
		$scope.checkBlank = 'N';
		$scope.manual.manualEntry = "N";
		$scope.unit = $scope.dto.unit;
		$scope.activityType = $scope.dto.activityType;
		$scope.activityTypeCode = ' ';
		if($scope.activityType == 'Training'){
			$scope.activityTypeCode = 'TRG';
		}
		if($scope.activityType == 'Admin'){
			$scope.activityTypeCode = 'ADM';
		}
		if($scope.activityType == 'Urgent Admin'){
			$scope.activityTypeCode = 'UG_ADM';
		}
		var purposesPromise = CommonService.getPurposes($scope.activityTypeCode);
			
		$q.all([ purposesPromise ]).then(function(data) {
			$scope.purposes = data[0];
		});
		if($scope.dto.status === 'Reverted' || $scope.dto.status === 'Recalled'){
			$scope.minDateTime = formatStartDateTime($scope.dto.startDate);
			$scope.maxDateTime = formatEndDateTime($scope.dto.endDate);
			if(moment($scope.maxDateTime).isSame($scope.minDateTime)){
				$scope.maxDateTime.add(12, 'hours').calendar();
				$scope.maxDateTime.subtract(1, 'seconds').calendar();
			}
		}
		$scope.filterReportingVenues($scope.dto.reportingVenueTypeId, false);
		$scope.filterDestinationVenues($scope.dto.destinationVenueTypeId, false);
	}
	
	$q.all([ activitiesPromise, countriesPromise, venueTypesPromise, subUnitsPromise,
		towTypesPromise, proPromise, vehicleTypesPromise, resourceTypesPromise ]).then(function(data) {
		$scope.activities = data[0];
		$scope.countries = data[1];
		$scope.venueTypes = data[2];
		$scope.subUnits = data[3];
		$scope.towTypes = data[4];
		$scope.proficiencies = data[5];
		$scope.vehicleTypes = data[6];
		$scope.resourceTypes = data[7];
		
		if($scope.session.userRole.cat === Constants.USER_ROLE_CAT_UNIT) {
			$scope.dto.unitCode = $scope.session.userRole.unitCode;
			$scope.dto.unit = $scope.session.userRole.unitNameAndCode;
			$scope.getUnitCredits($scope.dto.unitCode, $scope.session.nsFlag); // TODO: to change to userRole.nsFlag
			
		} else if ($scope.session.userRole.cat === Constants.USER_ROLE_CAT_NODE) {
			$scope.dto.unitCode = $scope.session.unitCode;
			$scope.dto.unit = $scope.session.unitNameAndCode;
			$scope.getUnitCredits($scope.dto.unitCode, $scope.session.nsFlag); // TODO: to change to userRole.nsFlag
		}
		
		if($scope.mappedIndent != null){
			$scope.getUnitCredits($scope.dto.unitCode, $scope.dto.unitNsFlag);
		}
	});
	
	$scope.setSelectedActivityType = function() {
		_.each($scope.activities, function(activity) {
			if (activity.id == $scope.dto.activityId) {
				$scope.selectedActivityType = activity.type + activity.name;
				$scope.activityType = activity.type;
				$scope.dto.activityType = $scope.activityType;
				$scope.checkBlank = 'N';
				$scope.activityTypeCode = ' ';
				if(activity.type == 'Training'){
					$scope.activityTypeCode = 'TRG';
				}
				if(activity.type == 'Admin'){
					$scope.activityTypeCode = 'ADM';
				}
				if(activity.type == 'Urgent Admin'){
					$scope.activityTypeCode = 'UG_ADM';
				}
				var purposesPromise = CommonService.getPurposes($scope.activityTypeCode);
				
				$q.all([ purposesPromise ]).then(function(data) {
					$scope.purposes = data[0];
				});
				//reset all fields if activity type change
				$scope.manual.manualEntry = "N";
				$scope.dto.overseasFlag = "N";
				$scope.dto.nsIndent = 'N';
				$scope.dto.activityName = null;
				$scope.dto.subUnit = null;
				$scope.dto.country = null;
				$scope.dto.campMovement = 'IN';
				$scope.dto.dateRange = null;
				$scope.dto.reportingVenueTypeId = null;
				$scope.dto.reportingVenueId = null;
				$scope.dto.reportingInfo = null;
				$scope.dto.destinationVenueTypeId = null;
				$scope.dto.destinationVenueId = null;
				$scope.dto.additionalInfo = null;
				$scope.dto.poc = null;
				$scope.dto.pocOfficeNo = null;
				$scope.dto.pocMobileNo = null;
				$scope.dto.templateFlag = 'N';
				$scope.dto.indentResources = [];
				$scope.dto.credits = 0;
				
				if(activity.type == 'Operations'){
					$scope.dto.campMovement = 'OUT';
				}
				if($scope.session.userRole.cat === Constants.USER_ROLE_CAT_HUB || $scope.session.userRole.cat === Constants.USER_ROLE_CAT_HQ){
					$scope.dto.unitCode = null;
					$scope.unit = null;
				}
				return; 
			}
		});
	};
	
	//reset ng-model when certain fields change
	$scope.resetIsOverseasFields = function(overseasFlag){
		if(overseasFlag == 'N'){
			$scope.dto.country = null;	
		}
		if(overseasFlag == 'Y'){
			$scope.dto.destinationVenueId = null;
			$scope.dto.additionalInfo = null;
			$scope.dto.campMovement = null;
		}
	};
	
	$scope.resetSubunitsFields = function(unitCode, subunitCode){
		if(unitCode != subunitCode){
			$scope.dto.subUnit = null;
		}		
	};
	
	$scope.setPoc = function(poc, hpNo, officeNo){
		$scope.dto.pocNricNo = poc;
		if(hpNo != null){
			$scope.dto.pocMobileNo = hpNo;
		}
		if(officeNo != null){
			$scope.dto.pocOfficeNo = officeNo;
		}
	};
	
	$scope.resetPoc = function(){
		$scope.dto.poc = null;
		$scope.dto.pocOfficeNo = null;
		$scope.dto.pocMobileNo = null;
	};
	
	$scope.resetCodeFields = function(resourceType){
		var vehicleTypesPromise = CommonService.getVehicleTypes('N');
		
		$q.all([ vehicleTypesPromise ]).then(function(data) {
			$scope.vehicleTypes = data[0];
		});
		$scope.indentResource.vehicleType = null;
		$scope.indentResource.operatorQuantity = 0;
		$scope.indentResource.vehicleQuantity = 0;
		$scope.indentResource.parkdownFlag = 'N';
		$scope.dto.parkdownFlag = 'N';
		$scope.indentResource.parkdownTime = null;
		$scope.indentResource.parkdownDuration = 0;
		$scope.indentResource.parkdownQuantity = 0;
		$scope.indentResource.towTypeList = [];
		$scope.indentResource.proficiencyList = [];
		$scope.indentResource.remarks  = null;
		$scope.indentResource.purpose = null;
		$scope.indentResource.purposeName = null;
	};
	
	$scope.resetParkdownFields = function(parkdownFlag){
		$scope.dto.parkdownFlag = parkdownFlag;
		if($scope.parkdownTime != null && $scope.parkdownDate != null && parkdownFlag == 'Y'){
			$scope.indentResource.parkdownTime = $scope.parkdownDate+" "+$scope.parkdownTime;
			getResourceAvailability();
			if(moment().isAfter($scope.indentResource.parkdownTime)){
				$scope.indentResource.parkdownTime = null;
				return;
			}
			$scope.getChartValue();
		}
		if(parkdownFlag == 'N'){
			getResourceAvailability();
			$scope.indentResource.parkdownCampMovement = null;
			$scope.indentResource.parkdownDuration = 0;
			$scope.indentResource.parkdownTime = null;
			$scope.indentResource.parkdownQuantity = 0;
			$scope.getChartValue();

		}
	};
	//End of reseting 
		
	//on the fly calculation methods
	$scope.otfIndentDates = function(dateRange){
		var dates = dateRange.split(" to ");
		var date = dates[0].split(" ");
		var time = date[1].split(":");
		$scope.maxDate = moment(dates[0], "DD-MMM-YYYY HH:mm").subtract(30, 'minutes');
		//get diff
		var dateDiff =moment(dates[0], "DD-MMM-YYYY HH:mm").diff(moment(),'days');
		if(dateDiff>5){
			$scope.minDate = moment($scope.maxDate, "DD-MMM-YYYY HH:mm").subtract(5, 'days').set({'hour': 0, 'minute': 0 });
		}else{
			if(dateDiff==0){
				$scope.minDate = moment($scope.maxDate, "DD-MMM-YYYY HH:mm").set({'hour': 0, 'minute': 0 });
			}else{
				var now = moment();
				$scope.minDate = moment($scope.maxDate, "DD-MMM-YYYY HH:mm").subtract(dateDiff, 'days').set({'hour': now.hour()+1, 'minute': 0 });
			}
			
		}
		$scope.parkdownDate = moment($scope.maxDate, "DD-MMM-YYYY").subtract(1, 'days').format('DD-MMM-YYYY');
		$scope.parkdownTime = time[0] + ":00";
		
		calculateCredits();
		setTimeout(function() {
			 recountResourceAvailability();
		}, 500);
	};
	
	$scope.otfVehicleType = function(){
		if ($scope.vehicleTypes.length > 0) {
			_.each($scope.vehicleTypes, function(vehicleType) {
				if(vehicleType.id == $scope.indentResource.vehicleType){
					$scope.indentResource.vehicleTypeName = vehicleType.name;
				}
			});
		}
		$scope.getChartValue();
	};
	
	$scope.openVehicleImage = function(){
		$('#openImageModal').modal('show');
	};
	
	$scope.otfParkdownTime = function(){
		if($scope.indentResource.parkdownTime != null){
			$scope.getChartValue();
		}
		getResourceAvailability();
	};
	
	$scope.otfParkdownDuration = function(){
		getResourceAvailability();
		calculateParkdownTO($scope.indentResource.parkdownCampMovement, $scope.indentResource.vehicleQuantity, $scope.indentResource.parkdownDuration);
	};
	
	$scope.otfParkdownMovement = function(){
		calculateParkdownTO($scope.indentResource.parkdownCampMovement, $scope.indentResource.vehicleQuantity, $scope.indentResource.parkdownDuration);
	};
	
	$scope.otfParkdownVehQty = function(){
		calculateParkdownTO($scope.indentResource.parkdownCampMovement, $scope.indentResource.vehicleQuantity, $scope.indentResource.parkdownDuration);
	};
	
	$scope.otfVehDrvQty = function(qty){
		if(qty != null){
			$scope.indentResource.operatorQuantity = qty;
		}
		$scope.isWaitingList($scope.indentResource.vehicleQuantity, $scope.indentResource.vehNodeAvail, $scope.indentResource.drvNodeAvail);
		calculateParkdownTO($scope.indentResource.parkdownCampMovement, $scope.indentResource.vehicleQuantity, $scope.indentResource.parkdownDuration);
	};
	//End of on the fly calculation methods
	
	$scope.isWaitingList = function(resourceQty, vehNodeAvailability, drvNodeAvailability) {
		$scope.indentResource.waitingList = 'N';
		
		if(angular.isDefined(resourceQty)){
			if(vehNodeAvailability != null){
				if(resourceQty > vehNodeAvailability){
					$scope.indentResource.waitingList = 'Y';
				}
			}
			if(drvNodeAvailability != null){
				if(resourceQty > drvNodeAvailability){
					$scope.indentResource.waitingList = 'Y';
				}
			}
		}		
	};
	
	$scope.setWaitingListFlag = function(){
		if($scope.dto.activityId === undefined){
			$scope.$root.errorDialog("Please Select an Activity Type.");
			return;
		}

		var errors = IndentService.validateDTOProperties($scope.dto, $scope.dto.indentResources, $scope.session.userRole.cat, $scope.activityType);
		if (errors.length > 0) {
    		$scope.$root.errorDialog(errors);
    		$('#confirmSubmitModal').modal('hide');	
    	} else{
    		//$scope.loading = true;
    		if($scope.activityType == 'Operations' || $scope.activityType == 'Urgent Admin' || $scope.activityType == 'MT Admin' || $scope.activityType == 'MT Maintenance') {
				$scope.dto.waitinglistFlag = 'N';
				//$scope.loading = false;
				$('#confirmSubmitModal').modal('show');
			} else {
				var waitingListCounter = 0;
				_.each($scope.dto.indentResources, function(indentResource) {	
					if(indentResource.waitingList == 'Y'){
						waitingListCounter++;
					}
				});
				if(waitingListCounter == 0) {
					var resultPromise = IndentService.setWaitinglistFlag($scope.dto);
					$q.all([ resultPromise ]).then(function(data) {	
						$scope.result = data[0];
						if($scope.result.waitinglistFlag == "Y"){
							$scope.dto.waitinglistFlag = 'Y';
							//$scope.loading = false;
						} else {
							$scope.dto.waitinglistFlag = 'N';
							//$scope.loading = false;
						}
						$('#confirmSubmitModal').modal('show');
					});
				} else {
					$scope.dto.waitinglistFlag = 'Y';
					//$scope.loading = false;
					$('#confirmSubmitModal').modal('show');
				}
			}
    	}
	};
	
	$scope.getUnitCredits = function(unitCode, nsFlag){
		if(nsFlag != null){
			$scope.ns.isNsFlag = nsFlag;
		}
	    $scope.dto.unitCode = unitCode;    
		var workYearCreditsPromise = IndentService.getUnitCredits($scope.dto.unitCode);

		$q.all([ workYearCreditsPromise ]).then(function(data) {
	    	$scope.advance = null;
	    	$scope.workYearCredits = data[0];	    	
	    	 if($scope.workYearCredits.nextWorkYearAllocatedCredits == 0){
	    		$scope.advance = "Advance Credits";
	    		$scope.workYearCredits.nextWorkYearAllocatedCredits = Math.ceil(0.2*$scope.workYearCredits.currentWorkYearAllocatedCredits);
	 	    	$scope.workYearCredits.nextWorkYearRemainingCredits = $scope.workYearCredits.nextWorkYearAllocatedCredits + $scope.workYearCredits.nextWorkYearRemainingCredits;
	 	    	$scope.unitFormation = data[0].formation;
	 	    	$scope.unitNode = data[0].node;
	 	    }
		});
	};

	$scope.checkAll = function() {
		_.each($scope.dto.indentResources, function(indentResource) { 
			$scope.checkboxes.records[indentResource.id] = $scope.checkboxes.all;
		});
	};
	
	$scope.checkLimit = function(value, limit, isVeh, isDrv) {
	      if(value > limit){ 
	          if(isVeh){
	        	  $scope.indentResource.vehicleQuantity = limit;
	          }
	          if(isDrv){
	        	  $scope.indentResource.operatorQuantity = limit;
	          }
	       }
	      if(isVeh && isDrv){
	    	  var qty = $scope.indentResource.vehicleQuantity
	      } else {
	    	  qty = null;
	      }
	      $scope.otfVehDrvQty(qty);
	    };
	    
	$scope.showIndentResourceModal = function(indentResourceId) {
		if (!$scope.dto.unitCode) {
			$scope.$root.errorDialog("Please select the Customer Unit.");
		} else if (!$scope.dto.dateRange) {
			$scope.$root.errorDialog("Please select the Indent Period.");
		} else {
			if(indentResourceId) {
				$scope.indentResource = { isAdd:false };
				var indentResourceDTO = IndentService.getIndentResourceDTO($scope.dto.indentResources, indentResourceId);
				$scope.filterVehicleTypes(indentResourceDTO.purpose);
				IndentService.mapProperties(indentResourceDTO, $scope.indentResource, indentResourceDTO.purpose);
				if($scope.dto.status === 'Reverted' || $scope.dto.status === 'Recalled'){
					$scope.maxQty = $scope.indentResource.vehicleQuantity || $scope.indentResource.operatorQuantity;
				}
				$scope.getChartValue();
			} else {
				$scope.indentResource = { isAdd:true };
			}	
			$('#indentResourceModal').modal({ backdrop:'static' });	
		}
    };

    $scope.addOrEditIndentResource = function(isNew) {
    	if(isNew != 'Recalled' && isNew != 'Reverted'){
	    	var errors = IndentService.validateIRProperties($scope.indentResource, $scope.dto, $scope.activityType);
	    	if (errors.length > 0) {
	    		$scope.$root.errorDialog(errors);
	    	} else {
	    		getResourceAvailability();
		    	var indentResourceDTO = IndentService.getIndentResourceDTO($scope.dto.indentResources, $scope.indentResource.id)
		    	if ($scope.indentResource.isAdd) {
	    			$scope.indentResource.id = counter;
	    			indentResourceDTO = { };
	        		IndentService.mapProperties($scope.indentResource, indentResourceDTO, $scope.indentResource.purpose);
	        		$scope.dto.indentResources.push(indentResourceDTO);
	        		counter++;
	        		$scope.dto.showAvailability =! $scope.dto.showAvailability;
	        		$('#indentResourceModal').modal('hide');
	        		$('#recallOrRevertModalDialog').modal('hide');
		    	} else {
		    		IndentService.mapProperties($scope.indentResource, indentResourceDTO, $scope.indentResource.purpose);
		    		$scope.dto.showAvailability =! $scope.dto.showAvailability;
		    		$('#indentResourceModal').modal('hide');
		    		$('#recallOrRevertModalDialog').modal('hide');
		    	}
		    	calculateCredits();
	    	}
    	} else {
    		$('#recallOrRevertModalDialog').modal('show');
    	}
    };
    
    $scope.removeIndentResources = function() {
    	var i = $scope.dto.indentResources.length;
    	while (i--) {
    		if ($scope.checkboxes.records[$scope.dto.indentResources[i].id]) {
    			$scope.dto.indentResources.splice(i, 1);
    			calculateCredits();
    		}
    		if($scope.dto.indentResources.length == 0){
    			$scope.checkboxes = { all:false, records:{ } };
    			$scope.dto.credits = 0;
    		}
    	}
	};
	
	$scope.draft = function(){
		if ($scope.dto.activityId === undefined) {
			$scope.$root.errorDialog("Please Select an Activity Type.");
			$('#indentDraftModal').modal('hide');
		} else if (!$scope.dto.unitCode) {
			$scope.$root.errorDialog("Please Select an Customer Unit.");
			$('#indentDraftModal').modal('hide');
		} else {
			$('#indentDraftModal').modal('show');
		}
	};
	
	$scope.saveAsDraft = function(){
		var resultPromise = IndentService.saveAsDraft($scope.dto);
		$q.all([ resultPromise ]).then(function(result) {
			$scope.$root.infoDialog(result[0]);
		});
	};
	
	$scope.deleteDraft = function(){
		var resultPromise = IndentService.deleteDraft($scope.dto);
		$q.all([ resultPromise ]).then(function(result) {
			$scope.$root.infoDialog(result[0]);
			$scope.$root.reloadPage('/indent_new');
		});
	};
	
	$scope.template = function(){
		if ($scope.dto.indentResources === undefined || $scope.dto.indentResources.length === 0) {
			$scope.$root.errorDialog("Please add at least one resource.");
			$('#indentTemplateModal').modal('hide');
		} else {
			$('#indentTemplateModal').modal('show');
		}
	};
	
	$scope.saveAsTemplate = function(){
		if (!$scope.dto.templateName) {
			$scope.$root.errorDialog("Please enter the Template Name.");
		} else {
			var resultPromise = IndentService.saveAsTemplate($scope.dto);
			$q.all([ resultPromise ]).then(function(result) {
				$scope.message = result[0];
				$('#templateDialog').modal('show');
			});
		}
		
	};
	
	$scope.goToManageTemplates = function() {
		$('#templateDialog ').modal('hide');
		$scope.$root.reloadPage('/templates');
	};
	
	 $scope.deleteTemplate = function() {
		 var resultPromise = IndentService.deleteTemplate($scope.dto.id);
		   	$q.all([ resultPromise ]).then(function(result) {
		   		$scope.$root.reloadPage('/templates');
		   		$scope.$root.infoDialog(result[0]);
		   	});
	};
		
	$scope.create = function() {
		if($scope.dto.status == "Recalled"){
			$scope.dto.status = "INDT_RCL";
		}
		if($scope.dto.status == "Reverted"){
			$scope.dto.status = "INDT_RVT";
		}
		if($scope.dto.status == "Draft"){
			$scope.dto.status = "INDT_DFT";
		}
    	$scope.dto.currentWorkYearRemainingCredits = $scope.workYearCredits.currentWorkYearRemainingCredits;
    	$scope.dto.nextWorkYearRemainingCredits = $scope.workYearCredits.nextWorkYearRemainingCredits;
		var resultPromise = IndentService.createIndent($scope.dto);
		$q.all([ resultPromise ]).then(function(result) {
			var splitString = result[0].split('-');
			$scope.infoUrlDialog(splitString[0], splitString[1], splitString[2]); // message, indent ID, url
		});
//		setTimeout(function(){
//	   		reload();
//		}, 2000);
//		$scope.indentReset();
	};
	
	var reload = function(){
		$scope.$root.reloadPage('/indent_new');
	};
	
	$scope.indentReset = function() {
		$scope.selectedActivityType = null;
		$scope.checkBlank = "Y";
		$scope.dto = { indentResources:[] };
		if($scope.session.userRole.cat === Constants.USER_ROLE_CAT_UNIT) {
			$scope.dto.unitCode = $scope.session.userRole.unitCode;
			$scope.dto.unit = $scope.session.userRole.unitNameAndCode;
			$scope.getUnitCredits($scope.dto.unitCode, null); // TODO: to change to userRole.nsFlag
			
		} else if ($scope.session.userRole.cat === Constants.USER_ROLE_CAT_NODE) {
			$scope.dto.unitCode = $scope.session.unitCode;
			$scope.dto.unit = $scope.session.unitNameAndCode;
			$scope.getUnitCredits($scope.dto.unitCode, null); // TODO: to change to userRole.nsFlag
		}
	};
	
	$scope.infoUrlDialog = function(message, indentNo, url) {
		$scope.message = message;
		$scope.url = url;
		$scope.indentNo = indentNo;
		if($scope.dto.status == "INDT_RVT" || $scope.dto.status == "INDT_RCL"){
			$scope.showSimilarIndent = false;
		} else {
			$scope.showSimilarIndent = true;
		}
		$('#infoUrlDialog').modal('show');		
	};
	
	$scope.infoUrlDialogOk = function(isReload) {
		if(isReload){
			$scope.reloadPage('/indent_new');
		}
		$('#infoUrlDialog').modal('hide');		
	};
	
	$scope.similarIndent = function() {
		$scope.getUnitCredits($scope.dto.unitCode, $scope.dto.unitNsFlag);
		recountResourceAvailability();
		$('#infoUrlDialog').modal('hide');	
	};
	
	// Start of calculation methods
	// to calculate credits per TO (if the day crosses more than 6 hours or crosses 12 noon = 1 credit, else 0.5 credit)
	function calculateCreditsPerTO(startDate, originalEndDate) {
		var creditsPerTO = 0;
		if (startDate && originalEndDate) {
			
			// to handle boundary cases of 1200 and 0000 in the calculation below by substracting 1 second to it
			var endDate = originalEndDate;
			if ((originalEndDate.hours() === 12 || originalEndDate.hours() === 0) && originalEndDate.minutes() === 0) {
				endDate = originalEndDate.add(-1, 'second');
			}
			if (startDate.isSame(endDate, 'day')) {
				creditsPerTO += endDate.diff(startDate, 'minute') > 360 || (startDate.format('a') !== endDate.format('a')) ? 1 : 0.5;
			} else {
				var startDate2359 = moment(startDate, "DD-MMM-YYYY").set({'hour': 23, 'minute': 59, 'second': 59, 'millisecond': 0 });
				var endDate0000 = moment(endDate, "DD-MMM-YYYY").set({'hour': 0, 'minute': 0, 'second': 0, 'millisecond': 0 });
				var d1 = moment(startDate2359, "DD-MMM-YYYY").add(1, 'second');
				var d2 = moment(endDate0000, "DD-MMM-YYYY");
				creditsPerTO += (startDate2359.diff(startDate, 'minute') > 360 || startDate.format('a') !== startDate2359.format('a')) ? 1 : 0.5;
				creditsPerTO += (endDate.diff(endDate0000, 'minute') > 360 || endDate0000.format('a') !== endDate.format('a')) ? 1 : 0.5;
				creditsPerTO += d2.isAfter(d1) ? (d2.diff(d1, 'day') * 1) : 0;
			}
		}
		return creditsPerTO;
	} 
	
	// to calculate credits per indent resource and the total credits for the indent 
	function calculateCredits() {
		if ($scope.dto.dateRange && $scope.dto.indentResources.length > 0) {
			var dateRange = $scope.$root.parseDateRange($scope.dto.dateRange);
			var startDate = dateRange[0];
			var endDate = dateRange[1];
			var creditsPerTO = calculateCreditsPerTO(startDate, endDate);
			var totalCredits = 0;
			_.each($scope.dto.indentResources, function(resource) {
				var credits = 0;
				var parkdownCredits = 0;
				if (resource.code !== Constants.VEHICLE_ONLY && $scope.activityType !== 'MT Admin') {
					credits += creditsPerTO * resource.operatorQuantity;
					if (resource.parkdownFlag === Constants.FLAG_YES) {
						var pdStartDate = moment(resource.parkdownTime, "DD-MMM-YYYY");
						var pdEndDate = moment(pdStartDate, "DD-MMM-YYYY").add(resource.parkdownDuration, 'hour');
						var pdCreditsPerTO = calculateCreditsPerTO(pdStartDate, pdEndDate);
						parkdownCredits = pdCreditsPerTO * resource.parkdownQuantity;
						credits += parkdownCredits;
					}
				}
				resource.credits = credits;
				resource.parkdownCredits = parkdownCredits;
				totalCredits += credits;
			});
			$scope.dto.credits = totalCredits;
		}
	};

	function formatStartDateTime(dateTime){ // "DD-MMM-YYYY HH:mm"
		var splitDateTime = dateTime.split(" ");
		var date = splitDateTime[0]; // DD-MMM-YYYY
		var time = splitDateTime[1]; // HH:mm
		var splitDate = date.split("-"); // [0] DD, [1] MMM, [2] YYYY	
		var splitTime = time.split(":"); // [0] HH, [1] mm
		var month = (new Date(Date.parse(splitDate[1] +" 1, 2012"))).getMonth();
		
		return moment({ y: splitDate[2], M: month, d: splitDate[0], h: splitTime[0] <= 11 ? 0 : 12, m: 0 });
	};
	
	function formatEndDateTime(dateTime){ // "DD-MMM-YYYY HH:mm"
		var splitDateTime = dateTime.split(" ");
		var date = splitDateTime[0]; // DD-MMM-YYYY
		var time = splitDateTime[1]; // HH:mm
		var splitDate = date.split("-"); // [0] DD, [1] MMM, [2] YYYY	
		var splitTime = time.split(":"); // [0] HH, [1] mm
		var month = (new Date(Date.parse(splitDate[1] +" 1, 2012"))).getMonth();
		
		return moment({ y: splitDate[2], M: month, d: splitDate[0], h: splitTime[0] <= 11 ? 11 : 23, m: 59 });
	};
	
	function getResourceAvailability() {
		//$scope.loading = true;
		var searchDTO = {};
		searchDTO.dateRange = $scope.dto.dateRange;
		searchDTO.resourceType = $scope.indentResource.resourceType;
		searchDTO.vehicleId = $scope.indentResource.vehicleType;
		searchDTO.parkdownFlag =  $scope.indentResource.parkdownFlag;
		searchDTO.parkdownDuration = $scope.indentResource.parkdownDuration;
		searchDTO.parkdownTime = $scope.indentResource.parkdownTime;
		searchDTO.unitCode = $scope.dto.unitCode;
		
		if(searchDTO.parkdownFlag == "N" || (searchDTO.parkdownFlag == "Y" && searchDTO.parkdownTime != null)){
			if ($scope.indentResource.resourceType === Constants.VEHICLE_ONLY){
				var resultPromise = IndentService.getResourceAvailability(searchDTO);
				$q.all([ resultPromise ]).then(function(data) {
					$scope.indentResource.vehNodeAvail = data[0] === undefined ? 0 : data[0];
					//$scope.loading = false;
				});
			} else if ($scope.indentResource.resourceType === Constants.DRIVER_ONLY){
				var resultPromise = IndentService.getResourceAvailability(searchDTO);
				$q.all([ resultPromise ]).then(function(data) {
					$scope.indentResource.drvNodeAvail = data[0] === undefined ? 0 : data[0];
					//$scope.loading = false;
				});
			} else if ($scope.indentResource.resourceType === Constants.VEHICLE_DRIVER) {
				searchDTO.resourceType = Constants.VEHICLE_ONLY;
				var vehChartPromise = IndentService.getResourceAvailability(searchDTO);
				searchDTO.resourceType = Constants.DRIVER_ONLY;
				var drvChartPromise = IndentService.getResourceAvailability(searchDTO);	
				$q.all([ vehChartPromise, drvChartPromise ]).then(function(data) { 	
					$scope.indentResource.vehNodeAvail = data[0] === undefined ? 0 : data[0];
					$scope.indentResource.drvNodeAvail = data[1] === undefined ? 0 : data[1];
					//$scope.loading = false;
				});
			}	
		}
	};
	
	function recountResourceAvailability() {
		//$scope.loading = true;
		if(!$scope.dto.unitCode || !$scope.dto.dateRange || $scope.dto.indentResources.length === 0){
			//$scope.loading = false;
			return;
		} else {
			var resultPromise = IndentService.recountResourceAvailability($scope.dto);
			$q.all([ resultPromise ]).then(function(data) {
				$scope.dto = data[0];
				//$scope.loading = false;
			});
		}
	};
	
	function calculateParkdownTO(movement, qty, parkdownDuration) {
		if(movement || qty > 0 || parkdownDuration > 0) {
			if(movement === "OUT") {
				$scope.indentResource.parkdownQuantity = qty;
			}
			if(movement === "IN") {
				if(parkdownDuration && qty > 0) {
					$scope.indentResource.parkdownQuantity = Math.ceil(qty/parkdownDuration);
				}
			}
		} else {
			$scope.indentResource.parkdownQuantity = 0;
		}
	};
	// End of calculation methods
	
	// All resource visibility methods
	$scope.getChartValue = function(){
		$scope.chartLoading = true;
		$scope.dto.parkdownFlag = $scope.indentResource.parkdownFlag;
		if(angular.isDefined($scope.indentResource)){
			$scope.indentResource.waitingList = 'N';
		}
		var searchDTO = {};
		searchDTO.unitCode = $scope.dto.unitCode;
		searchDTO.dateRange = $scope.dto.dateRange;
		searchDTO.resourceType = $scope.indentResource.resourceType;
		searchDTO.vehicleId = $scope.indentResource.vehicleType;
		searchDTO.parkdownFlag = $scope.indentResource.parkdownFlag;
		searchDTO.parkdownTime = $scope.indentResource.parkdownTime;
		
			if($scope.dto.dateRange != null && $scope.indentResource.vehicleType != null){
				if($scope.indentResource.resourceType === Constants.VEHICLE_ONLY){	
		
				    var vehChartPromise = IndentService.getNodeChart(searchDTO);
				    $q.all([ vehChartPromise ]).then(function(data) {
				    	$scope.vehChart = data[0];
					    $scope.vehChartFirstDate = $scope.vehChart.chartFirstDate;
						$scope.chartLoading = false;	
				    });
				    getResourceAvailability();
				}
				if($scope.indentResource.resourceType === Constants.DRIVER_ONLY){	
		
				    var drvChartPromise = IndentService.getNodeChart(searchDTO);
				    $q.all([ drvChartPromise ]).then(function(data){
				    	$scope.drvChart = data[0];
					    $scope.drvChartFirstDate = $scope.drvChart.chartFirstDate;
						$scope.chartLoading = false;
				    });
				    getResourceAvailability();
				}
			    if($scope.indentResource.resourceType === Constants.VEHICLE_DRIVER){
			    	
			    	searchDTO.resourceType = Constants.VEHICLE_ONLY;
					var vehChartPromise = IndentService.getNodeChart(searchDTO);
					
					searchDTO.resourceType = Constants.DRIVER_ONLY;
					var drvChartPromise = IndentService.getNodeChart(searchDTO);
					
				    $q.all([ vehChartPromise, drvChartPromise ]).then(function(data) { 	
				    	$scope.vehChart = data[0];
				    	$scope.drvChart = data[1];
					    $scope.vehChartFirstDate = $scope.vehChart.chartFirstDate;
					    $scope.drvChartFirstDate = $scope.drvChart.chartFirstDate;
						$scope.chartLoading = false;
				    });
				    getResourceAvailability();
			    }
			    $scope.isWaitingList($scope.indentResource.vehicleQuantity, $scope.indentResource.vehNodeAvail, $scope.indentResource.drvNodeAvail);
			}
	};
	
	$scope.getButtonChart = function(button, dateRange, vehicleId){
		$scope.chartLoading = true;
		var searchDTO = {};
		searchDTO.dateRange = dateRange;
		searchDTO.button = button;
		searchDTO.vehicleId = vehicleId;
		searchDTO.unitCode = $scope.dto.unitCode;
		var btn = button.split("-");	    
	    var resourceTypeCode = btn[0];
			if(dateRange != null && vehicleId != null && resourceTypeCode === Constants.VEHICLE_ONLY){
				
				searchDTO.chartFirstDate = $scope.vehChartFirstDate;		
				searchDTO.nodeAvail = $scope.indentResource.vehNodeAvail;
				searchDTO.parkdownNodeAvail = $scope.indentResource.vehParkdownAvail;
				
		    	var vehChartPromise = IndentService.getNodeButtonChart(searchDTO);
			    $q.all([ vehChartPromise ]).then(function(data) {
			    	$scope.vehChart = data[0];
				   	$scope.vehChartFirstDate = $scope.vehChart.chartFirstDate;
					$scope.chartLoading = false;
			    });
			}
		    if(dateRange != null && vehicleId != null && resourceTypeCode === Constants.DRIVER_ONLY){
		    	
				searchDTO.chartFirstDate = $scope.drvChartFirstDate;
		    	searchDTO.nodeAvail = $scope.indentResource.drvNodeAvail;
		    	searchDTO.parkdownNodeAvail = $scope.indentResource.drvParkdownAvail;
		    	
				var drvChartPromise = IndentService.getNodeButtonChart(searchDTO);
			    $q.all([ drvChartPromise ]).then(function(data) {
			    	$scope.drvChart = data[0];
				    $scope.drvChartFirstDate = $scope.drvChart.chartFirstDate;
					$scope.chartLoading = false;
			    });
		    }
	};
	// End of resource visibility methods
	
});

app.controller('IndentSearchController', function($q, $scope, $stateParams, IndentService, CommonService, Constants) {
	if(!$scope.$root.checkAccessRights('showSearchIndents')){return;}
	var isSearchOnLoad = ($stateParams.statusCodes != window.undefined);
	var statusesPromise = CommonService.getStatuses("INDENT");
	var hubsPromise = CommonService.getHubs();
	var nodesPromise = CommonService.getNodes();
	var activitiesPromise = CommonService.getActivities();
	var venuesPromise = CommonService.getVenues();
	$scope.searchDTO = { startIndex:0, pageSize:Constants.PAGE_SIZE, templateFlag: Constants.FLAG_NO };
	$scope.advSearchCollapsed = true;
	//$scope.loading = false;
	$scope.initialSort = isSearchOnLoad ? 'asc' : 'desc';
	
	$q.all([ statusesPromise, hubsPromise, nodesPromise, activitiesPromise, venuesPromise ]).then(function(data) {
    	$scope.statuses = data[0];
    	$scope.hubs = data[1];
    	$scope.nodes = data[2];
    	$scope.activities = data[3];
    	$scope.venues = data[4];
		if(isSearchOnLoad){
			if($stateParams.statusCodes === Constants.INDENT_PENDING_CUSTOMER){
				$scope.searchDTO.statusCodes = ["INDT_DFT", "INDT_SUB", "INDT_RVT", "INDT_RCL"];
			} else if ($stateParams.statusCodes === Constants.INDENT_PENDING_TRANSPORT) {
				$scope.searchDTO.statusCodes = ["INDT_REC", "INDT_APP", "INDT_CFM"];
			}
		}
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
			});
		}
	};
		
	$scope.search = function() {
		CommonService.resetPagination($scope, 0, Constants.PAGE_SIZE);
		if(isSearchOnLoad) {
			CommonService.search($scope, "startDate");
		} else {
			CommonService.search($scope, "indentNo");
		}
	};
	
	$scope.reset = function() {
		CommonService.resetPagination($scope, 0, Constants.PAGE_SIZE);
		$scope.searchDTO = { startIndex:0, pageSize:Constants.PAGE_SIZE, templateFlag: Constants.FLAG_NO };
	};
	
	if(isSearchOnLoad) {
		$scope.$watch('tableState', function() {
			if ($scope.tableState) {
				$scope.search();
			}
	    });	
	}
});

app.controller('IndentController', function($q, $scope, $sce, $stateParams, $location, CommonService, IndentService, Constants, TaskService, Upload, $timeout) {
	if(!$scope.$root.checkAccessRights('showSearchIndents')){return;}
	var indentPromise = IndentService.getIndent($stateParams.indentNo);
	var hubCodesPromise = CommonService.getHubs();
	var counter = 1;
	$scope.checkboxes = { all:false, allTask:false, records:{}, taskRecords:{} };	
	$scope.supported = { };
	
	$q.all([ indentPromise, hubCodesPromise ]).then(function(data) {
		$scope.dto = data[0];
		$scope.hubCodes = data[1];
		if($scope.dto.hubNamelist != null){
			$scope.supported.hubNamelist = $sce.trustAsHtml($scope.dto.hubNamelist);
			if($scope.session.userRole.cat === Constants.USER_ROLE_CAT_HUB && $scope.session.userRole.hub !== $scope.dto.hubCode){
				//get forwarded hub supporting indent status
				var forwardedHubPromise = IndentService.getForwardedHub($scope.dto.id);
				$q.all([ forwardedHubPromise ]).then(function(data) {
					$scope.supporting = data[0];
				});
			}
		}
	});
	
	$scope.filterCurrentHub = function(hubName) {
		return IndentService.filterCurrentHub(hubName);
	};
	
	$scope.checkAll = function() {
		_.each($scope.dto.indentResources, function(indentResource) { 
			$scope.checkboxes.records[indentResource.id] = $scope.checkboxes.all;
		});
	};
	
	$scope.checkAllTask = function(){
		_.each($scope.dto.tasks, function(task) {
			$scope.checkboxes.taskRecords[task.id] = $scope.checkboxes.allTask;
		});
	};
	
	$scope.showIndentResourceModal = function(indentResourceId) {
		if(indentResourceId) {
			$scope.indentResource = { };
			var indentResourceDTO = IndentService.getIndentResourceDTO($scope.dto.indentResources, indentResourceId);
			IndentService.mapProperties(indentResourceDTO, $scope.indentResource, indentResourceDTO.purpose);
		} else {
			return;
		}	
		$('#indentResourceModal').modal({ backdrop:'static' });	
    };
    
	$scope.amend = function(){
		if($scope.dto.templateFlag == 'Y'){
			$scope.dto.isEditTemplate = "Y";
		} else {
			$scope.dto.isEditTemplate = "N";
		}
		IndentService.mapIndent().addIndent($scope.dto);
		$scope.$root.go('/indent_new');
	};
	
	$scope.submit = function(status) {
		if(status == "INDT_REC"){
			$scope.dto.status = status;
			var resultPromise = IndentService.recommendIndent($scope.dto);
		}
		if(status == "INDT_REJ_REC"){
			if (!$scope.dto.reasons) {
				$scope.$root.errorDialog("Please enter the reason(s).");
				return;
			} else{
			$scope.dto.status = "INDT_REJ";
			var resultPromise = IndentService.recommendIndent($scope.dto);
			}
		}
		if(status == "INDT_APP"){
			$scope.dto.status = status;
			var resultPromise = IndentService.approveIndent($scope.dto);
		}
		if(status == "INDT_REJ_APP"){
			if (!$scope.dto.reasons) {
				$scope.$root.errorDialog("Please enter the reason(s).");
				return;
			} else{
			$scope.dto.status = "INDT_REJ";
			var resultPromise = IndentService.approveIndent($scope.dto);
			}
		}
		if(status == "INDT_CFM"){
			$scope.dto.status = status;
			var resultPromise = IndentService.confirmIndent($scope.dto);
		}
		if(status == "INDT_REJ_CFM"){
			if (!$scope.dto.reasons) {
				$scope.$root.errorDialog("Please enter the reason(s).");
				return;
			} else{
			$scope.dto.status = "INDT_REJ";
			var resultPromise = IndentService.confirmIndent($scope.dto);
			}
		}
		if(status == "INDT_FOR_MUL"){
			if (!$scope.dto.hubList) {
				$scope.$root.errorDialog("Please enter at least one hub.");
				return;
			} else if(!$scope.dto.reasons){
				$scope.$root.errorDialog("Please enter the reason(s).");
				return;
			} else{	
	    		$scope.dto.status = "INDT_FOR";
				var resultPromise = IndentService.forwardMultiIndent($scope.dto);
			}
		}
		if(status == "INDT_FOR_SIN"){
			if (!$scope.dto.forwardedHubCode) {
				$scope.$root.errorDialog("Please enter the hub.");
				return;
			} else if(!$scope.dto.reasons){
				$scope.$root.errorDialog("Please enter the reason(s).");
				return;
			} else{	
	    		$scope.dto.status = "INDT_FOR";
				var resultPromise = IndentService.forwardSingleIndent($scope.dto);
			}
		}
		if(status == "INDT_ACC_SIN"){
			$scope.dto.status = "INDT_APP";
			var resultPromise = IndentService.acceptSingleIndent($scope.dto);
		}
		if(status == "INDT_ACC_MUL"){
			$scope.dto.status = "INDT_APP";
			var resultPromise = IndentService.acceptMultiIndent($scope.dto);
		}
		if(status == "INDT_REJ_ACC_SIN"){
			if (!$scope.dto.reasons) {
				$scope.$root.errorDialog("Please enter the reason(s).");
				return;
			} else{
			$scope.dto.status = "INDT_REJ";
				var resultPromise = IndentService.acceptSingleIndent($scope.dto);
			}
		}
		if(status == "INDT_REJ_ACC_MUL"){
			if (!$scope.dto.reasons) {
				$scope.$root.errorDialog("Please enter the reason(s).");
				return;
			} else{
			$scope.dto.status = "INDT_REJ";
				var resultPromise = IndentService.acceptMultiIndent($scope.dto);
			}
		}
		if(status == "APP"){
			$scope.dto.status = status;
			var resultPromise = IndentService.approveCentralVoteUsage($scope.dto);
		}
		if(status == "REJ"){
			if (!$scope.dto.reasons) {
				$scope.$root.errorDialog("Please enter the reason(s).");
				return;
			} else{
			$scope.dto.status = status;
			var resultPromise = IndentService.approveCentralVoteUsage($scope.dto);
			}
		}
		if(status == "INDT_CNL"){
			if (!$scope.dto.reasons) {
				$scope.$root.errorDialog("Please enter the reason(s).");
				return;
			} else{
				if($scope.dto.status === "Reverted"){
					$scope.dto.isReverted = "Y";	
				} else {
					$scope.dto.isReverted = "N";	
				}
				var resultPromise = IndentService.cancelIndent($scope.dto);
			}
		}
		if(status == "INDT_RCL"){
			if (!$scope.dto.reasons) {
				$scope.$root.errorDialog("Please enter the reason(s).");
				return;
			} else{
				var resultPromise = IndentService.recallIndent($scope.dto);
			}
		}
		if(status == "INDT_RVT"){
			if (!$scope.dto.reasons) {
				$scope.$root.errorDialog("Please enter the reason(s).");
				return;
			} else{
				var resultPromise = IndentService.revertIndent($scope.dto);
			}
		}
		if(status == "DEL_DFT"){
			var resultPromise = IndentService.deleteDraft($scope.dto);
		}
		if(status == "DEL_DFT"){		
			$q.all([ resultPromise ]).then(function(result) {
				$scope.$root.infoDialog(result[0]);
				$scope.$root.reloadPage('/indents');
			});
		} else {
			$q.all([ resultPromise ]).then(function(result) {
				reload();
				$scope.$root.infoDialog(result[0]);
			});
		}
	};
	
	//task
	$scope.searchDTO = { startIndex:0, pageSize:Constants.PAGE_SIZE };
	$scope.moreCriteriaCollapsed = true;
	$scope.selectedVehicle = {};
	$scope.selectedResource;
	
	var towTypePromise = CommonService.getTowTypes('N');
	var proficiencyPromise = CommonService.getProficiencies('N');
	var nodePromise = CommonService.getNodes();
	var unitPromise = CommonService.getUnits();
	var hubPromise = CommonService.getHubs();
	var drivingCatPromise = CommonService.getDrivingCategories();
	var pesPromise = CommonService.getPeses();
	var securityCatPromise = CommonService.getSecurityCategories();
	var vehicleTypePromise = CommonService.getVehicleTypes('N');
	var reasonPromise = CommonService.getReasons('CREDIT_REFUND');
	
	$q.all([towTypePromise,proficiencyPromise,nodePromise,unitPromise,drivingCatPromise,pesPromise,securityCatPromise,vehicleTypePromise,reasonPromise,hubPromise]).then(function(data) {
		$scope.towTypes = data[0];
		$scope.proficiencies1 = data[1];
		$scope.nodes = data[2];
		$scope.units = data[3];
		$scope.licenseCategories = data[4];
		$scope.peses = data[5];
		$scope.securityCategories = data[6];
		$scope.vehicleTypes = data[7];
		$scope.reasons = data[8];
		$scope.hubs = data[9];
	});
	
	$scope.selectedRecord = function(record,type){
		$scope.searchDTO = {};
		$scope.vehicleResults={};
		$scope.driverResults={};
		$scope.searchDTO.detailPeriodRange = record.startDate + " to " + record.endDate;
		$scope.searchDTO.driverOrigin = 1;
		$scope.searchDTO.taskId = record.id;
		$scope.searchDTO.type = type;
		$scope.searchDTO.vehicleTypeId = record.vehicleTypeId;
		if(record.taskDetailId != null){
			$scope.searchDTO.taskDetailId = record.taskDetailId;
		}
		$scope.searchDTO.towTypeIds = record.indentTowTypeIds;
		$scope.searchDTO.proficiencyIds = record.indentProficiencyIds;
		if(type=='vehicle' && record.parkdownIndentFlag=='Y'){
			$scope.$root.infoDialog("Please assign Vehicle at the Normal Task to reflect the changes in ParkDown Task.");
		}else if(type=='vehicle'){
			$scope.searchDTO.isBuffered = "false";
			$scope.$root.limitAccess($scope.searchDTO);
			$('#allocateVehicleModal').modal({ backdrop:'static' });
			$scope.showVehicleResults(false);
		}else{
			$scope.searchDTO.isBufferedTO = "false";
			$scope.searchDTO.isTL = "false";
			$scope.searchDTO.isDriverTrainee = "false";
			$scope.searchDTO.isNoRestDriver = "false";
			$scope.$root.limitAccess($scope.searchDTO);
			$scope.showDriverResults(false);
		}
		
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
					$scope.assignVehicleConfirmDialog($scope.vehicleBestMatchResults[0]);
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
					$scope.assignDriverConfirmDialog($scope.driverBestMatchResults[0]);
				}
			});
		}

		
	};
	
	$scope.showDriverResults = function(isAutoSearch){
		$scope.driverResults = {};
		var driverResultPromise = TaskService.searchTaskDriver($scope.searchDTO);
		$q.all([ driverResultPromise ]).then(function(data) {
			$scope.driverResults = data[0];
			if($scope.driverResults.length===0){
				if(isAutoSearch){
					$scope.$root.infoDialog("No result found.");
				}
			}
		});
		//$scope.paginate($scope.tableState);
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
		
	}
	
	$scope.assignDriverConfirmDialog = function(record){
		$scope.selectedResource = record;
		$('#resourceConfirmDialog').modal({ backdrop:'static' });
	}
	
	$scope.assignVehicleConfirmDialog = function(record){
		$scope.selectedResource = record;
		$('#resourceConfirmDialog').modal({ backdrop:'static' });
	}
	
	$scope.confirmChangeVehicleDriver = function(){
		var taskDetailChangeDTO = new Object();
		
		taskDetailChangeDTO.taskId = $scope.searchDTO.taskId;
		taskDetailChangeDTO.detailPeriodRange = $scope.searchDTO.detailPeriodRange;
		if($scope.searchDTO.taskDetailId !=null){
			taskDetailChangeDTO.taskDetailId = $scope.searchDTO.taskDetailId;
		}
		
		if($scope.searchDTO.type == 'vehicle'){
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
		}else{
			taskDetailChangeDTO.driverId = $scope.selectedResource.id;
			var assignDriverPromise = TaskService.assignDriver(taskDetailChangeDTO);
			$q.all([assignDriverPromise]).then(function(data){
				$scope.$root.infoDialog(data[0]);
				$('#allocateDriverModal').modal('hide');
				reload();
			});
		}
		
	};
	
	
	$scope.confirmAssignVehicle = function() {
		var assignVehiclePromise = TaskService.assignVehicle($scope.selectedVehicle);
		$q.all([assignVehiclePromise]).then(function(data){
			$scope.$root.infoDialog(data[0]);
			reload();
			$('.modal-backdrop').remove();
			$('#allocateVehicleModal').modal('hide');
		});
		
	}
	
	var reload = function(){
		var indentPromise = IndentService.getIndent($stateParams.indentNo);
		$scope.checkboxes = { all:false, allTask:false, records:{}, taskRecords:{} };	
		$q.all([ indentPromise]).then(function(data) {
			$scope.dto = data[0];
			if($scope.dto.hubNamelist != null){
				$scope.supported.hubNamelist = $sce.trustAsHtml($scope.dto.hubNamelist);
				if($scope.session.userRole.cat === Constants.USER_ROLE_CAT_HUB && $scope.session.userRole.hub !== $scope.dto.hubCode){
					//get forwarded hub supporting indent status
					var forwardedHubPromise = IndentService.getForwardedHub($scope.dto.id);
					$q.all([ forwardedHubPromise ]).then(function(data) {
						$scope.supporting = data[0];
					});
				}
			}
		});
	};
	
	$scope.unassignResource = function(){
		var taskIds = [];
    	_.each($scope.dto.tasks, function(record){
    		if (!!$scope.checkboxes.taskRecords[record.id]){
    			taskIds.push(record.id);
    		}	
    	});
    	
    	var content = "Do you want to proceed to unassign resources to the following selected task(s): <br>";
    	for(var i=0;i<taskIds.length;i++){
    		content +=" - " + taskIds[i] + "<br>";
    	}
    	$scope.$root.confirmDialog(content,$scope.confirmUnassignResource,taskIds);
    	
	};
	
	$scope.confirmUnassignResource = function(taskIds){
		var unassignResourcesPromise = TaskService.unassignResources(taskIds);
    	$q.all([unassignResourcesPromise]).then(function(data){
    		$scope.$root.infoDialog(data[0]);
    		reload();
    	});
	};
	
	$scope.creditRefund = function(){
		$scope.taskRefundCreditDTO=[];
		var taskIds = [];
    	_.each($scope.dto.tasks, function(record){
    		if (!!$scope.checkboxes.taskRecords[record.id]){
    			taskIds.push(record.id);
    		}	
    	});
    	
    	var getTotalCreditsPromise = TaskService.getTotalCredits(taskIds);
    	$q.all([getTotalCreditsPromise]).then(function(data){
    		$scope.taskRefundCreditDTO = data[0];
    		$('#cancelResourceModal').modal({ backdrop:'static' });
    	});
    	
	};
	
	$scope.confirmRefundResource = function(taskRefundCreditDTO){
		
		var confirmRefundResourcePromise = TaskService.confirmRefundResource(taskRefundCreditDTO);
		$q.all([confirmRefundResourcePromise]).then(function(data){
			$scope.$root.infoDialog(data[0]);
			reload();
		});
		
	};
	
	$scope.bestMatchAssign = function(){
		var taskIds = [];
		var content = "";
		content  = "Do you want to proceed to assign best match for the following task(s)?<br>";
    	_.each($scope.dto.tasks, function(record){
    		if (!!$scope.checkboxes.taskRecords[record.id]){
    			taskIds.push(record.id);
    			content += "- " + record.id + " <br>";
    		}	
    	});
    	
    	$scope.$root.confirmDialog(content,$scope.confirmBestMatchAssign,taskIds);
	};
	
	$scope.confirmBestMatchAssign = function(taskIds){
		var confirmBestMatchAssignPromise = TaskService.confirmBestMatchAssign(taskIds);
		$q.all([confirmBestMatchAssignPromise]).then(function(data){
			$scope.$root.infoDialog(data[0]);
			reload();
		});
	};
	
	$scope.go = function(path){
		 $location.path( path );
	};
	
	$scope.uploadFile = function(file, errFiles) {
		 
        if (file) {
        	
        	var strTaskIds = "";
        	_.each($scope.dto.tasks, function(record){
        		if (!!$scope.checkboxes.taskRecords[record.id]){
        			strTaskIds += "- " + record.id + "<br>";
        		}	
        	});
        	
        	if(strTaskIds != ""){
        		
        		var message = "Do you want to procced to mass allocate NS TO for task :<br>" + strTaskIds;
        		$scope.$root.confirmDialog(message,$scope.confirmNSTOupload,file);
        		
        	}else{
        		$scope.$root.errorDialog("Please select at least one task.");
        	}

        }     
	};
 
	$scope.confirmNSTOupload = function(file){
		 
		if (file) {
			var taskIds = "";
			_.each($scope.dto.tasks, function(record){
				if (!!$scope.checkboxes.taskRecords[record.id]){
					taskIds += record.id+"_";
				}	
			});
	        	
			if(taskIds != ""){
				var newTaskIdsStr = taskIds.substring(0, taskIds.length-1);

				file.upload = Upload.upload({
					url: Constants.BASE_URL + '/task/bookoutNSIndentTO/' + newTaskIdsStr,
					method: 'POST',
					data: { file : file, token: $scope.$root.session.token}
				});

				file.upload.then(function (response) {
					$timeout(function () {
						$scope.$root.infoDialog(response.data);
						$scope.paginate($scope.tableState);

					});
				});
			}else{
				$scope.$root.errorDialog("Please select at least one task.");
			}

		}     
	};
	
	$scope.getAuditLog = function(tableState) {
    	$scope.searchDTO = { startIndex:0, pageSize:Constants.PAGE_SIZE, entityId:$scope.dto.id, entity:'IndentController' };
    	
    	CommonService.initPagination($scope, tableState);
        CommonService.setPaginationSearch($scope, tableState);
        var auditLogPromise = CommonService.getAuditLog($scope.searchDTO);
        $q.all([ auditLogPromise ]).then(function(data) {
        	CommonService.setPaginationResult($scope, tableState, data);
        	$scope.tableState = tableState;
        });
    }
});

app.controller('IndentRecommendationController', function($q, $scope, IndentService, CommonService, Constants) {
	if(!$scope.$root.checkAccessRights('showIndentRecommendation')){return;}
	$scope.decisions = [];
	$scope.searchDTO = { startIndex:0, pageSize:Constants.PAGE_SIZE, statusCode:Constants.INDENT_SUBMITTED, templateFlag: Constants.FLAG_NO };
	var firstLoad = true;
	
	$scope.paginate = function(tableState) {
		if (CommonService.initPagination($scope, tableState)) {
			CommonService.setPaginationSearch($scope, tableState);
			var resultPromise = IndentService.searchIndents($scope.searchDTO);
			$q.all([ resultPromise ]).then(function(data) {
				CommonService.setPaginationResult($scope, tableState, data);
				_.each(data[0].records, function(record) {
					$scope.decisions[record.indentNo] = { id: record.indentNo, decision:'UNDECIDED', decisionReason:'' };
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
	
	$scope.confirm = function(){
		var errors = "";
		_.each($scope.records, function(record) {
			if ($scope.decisions[record.indentNo].decision == 'NO') {
				if($scope.decisions[record.indentNo].decisionReason == '' || $scope.decisions[record.indentNo].decisionReason == null){
					errors += "&bull; Please enter the reason for Indent ID "+ record.indentNo +".<br>";
				}
			}
		});
		if(errors.length > 0){
			$scope.$root.errorDialog(errors);
			$('#confirmSubmitModal').modal('hide');
		} else {
			$('#confirmSubmitModal').modal('show');
		}
	};
	
	$scope.submit = function() {	
		var confirmedDecisions = [];
		_.each($scope.records, function(record) {
			if ($scope.decisions[record.indentNo].decision != 'NO') {
				$scope.decisions[record.indentNo].decisionReason = ''; // reset rejection reason
			}
			if ($scope.decisions[record.indentNo].decision != 'UNDECIDED') {
				confirmedDecisions.push($scope.decisions[record.indentNo]); // only send decided records
			}
		});
		var resultPromise = IndentService.recommendIndents(confirmedDecisions);
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
			$scope.decisions[record.indentNo].decision = allDecision;
		});
	};

	$scope.$watch('tableState', function() {
		if ($scope.tableState) {
			$scope.search();
			firstLoad = false;
		}
    });
});

app.controller('IndentApprovalController', function($q, $scope, IndentService, CommonService, Constants) {
	if(!$scope.$root.checkAccessRights('showIndentApproval')){return;}
	$scope.decisions = [];
	$scope.searchDTO = { startIndex:0, pageSize:Constants.PAGE_SIZE, statusCode:Constants.INDENT_RECOMMENDED, templateFlag: Constants.FLAG_NO };
	var firstLoad = true;
		
	$scope.paginate = function(tableState) {
		if (CommonService.initPagination($scope, tableState)) {
			CommonService.setPaginationSearch($scope, tableState);
			var resultPromise = IndentService.searchIndents($scope.searchDTO);
			$q.all([ resultPromise ]).then(function(data) {
				CommonService.setPaginationResult($scope, tableState, data);
				_.each(data[0].records, function(record) {
					$scope.decisions[record.indentNo] = { id: record.indentNo, decision:'UNDECIDED', decisionReason:'' };
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
	
	$scope.confirm = function(){
		var errors = "";
		_.each($scope.records, function(record) {
			if ($scope.decisions[record.indentNo].decision == 'NO') {
				if($scope.decisions[record.indentNo].decisionReason == '' || $scope.decisions[record.indentNo].decisionReason == null){
					errors += "&bull; Please enter the reason for Indent ID "+ record.indentNo +".<br>";
				}
			}
		});
		if(errors.length > 0){
			$scope.$root.errorDialog(errors);
			$('#confirmSubmitModal').modal('hide');
		} else {
			$('#confirmSubmitModal').modal('show');
		}
	};
	
	$scope.submit = function() {
		var confirmedDecisions = [];
		_.each($scope.records, function(record) {
			if ($scope.decisions[record.indentNo].decision != 'NO') {
				$scope.decisions[record.indentNo].decisionReason = ''; // reset rejection reason
			}
			if ($scope.decisions[record.indentNo].decision != 'UNDECIDED') {
				confirmedDecisions.push($scope.decisions[record.indentNo]); // only send decided records
			}
		});
		var resultPromise = IndentService.approveIndents(confirmedDecisions);
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
			$scope.decisions[record.indentNo].decision = allDecision;
		});
	};
	
	$scope.$watch('tableState', function() {
		if ($scope.tableState) {
			$scope.search();
			firstLoad = false;
		}
    });
});

app.controller('IndentAcceptanceController', function($q, $scope, IndentService, CommonService, Constants) {
	if(!$scope.$root.checkAccessRights('showIndentAcceptance')){return;}
	$scope.decisions = [];
	$scope.searchDTO = { startIndex:0, pageSize:Constants.PAGE_SIZE, statusCode:Constants.INDENT_RECOMMENDED, transferredFlag:Constants.FLAG_YES, templateFlag: Constants.FLAG_NO };
	var firstLoad = true;
	
	$scope.paginate = function(tableState) {
		if (CommonService.initPagination($scope, tableState)) {
			CommonService.setPaginationSearch($scope, tableState);
			var resultPromise = IndentService.searchIndents($scope.searchDTO);
			$q.all([ resultPromise ]).then(function(data) {
				CommonService.setPaginationResult($scope, tableState, data);
				_.each(data[0].records, function(record) {
					$scope.decisions[record.indentNo] = { id: record.indentNo, decision:'UNDECIDED', decisionReason:'' };
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
	
	$scope.confirm = function(){
		var errors = "";
		_.each($scope.records, function(record) {
			if ($scope.decisions[record.indentNo].decision == 'NO') {
				if($scope.decisions[record.indentNo].decisionReason == '' || $scope.decisions[record.indentNo].decisionReason == null){
					errors += "&bull; Please enter the reason for Indent ID "+ record.indentNo +".<br>";
				}
			}
		});
		if(errors.length > 0){
			$scope.$root.errorDialog(errors);
			$('#confirmSubmitModal').modal('hide');
		} else {
			$('#confirmSubmitModal').modal('show');
		}
	};
	
	$scope.submit = function() {
		var confirmedDecisions = [];
		_.each($scope.records, function(record) {
			if ($scope.decisions[record.indentNo].decision != 'NO') {
				$scope.decisions[record.indentNo].decisionReason = ''; // reset rejection reason
			}
			if ($scope.decisions[record.indentNo].decision != 'UNDECIDED') {
				confirmedDecisions.push($scope.decisions[record.indentNo]); // only send decided records
			}
		});
		var resultPromise = IndentService.acceptSingleIndents(confirmedDecisions);
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
			$scope.decisions[record.indentNo].decision = allDecision;
		});
	};
	
	$scope.$watch('tableState', function() {
		if ($scope.tableState) {
			$scope.search();
			firstLoad = false;
		}
    });
});

app.controller('IndentMultiAcceptanceController', function($q, $scope, IndentService, CommonService, Constants) {
	if(!$scope.$root.checkAccessRights('showIndentAcceptance')){return;}
	$scope.decisions = [];
	$scope.searchDTO = { startIndex:0, pageSize:Constants.PAGE_SIZE, statusCode:Constants.PENDING, templateFlag: Constants.FLAG_NO };
	var firstLoad = true;
	
	$scope.paginate = function(tableState) {
		if (CommonService.initPagination($scope, tableState)) {
			CommonService.setPaginationSearch($scope, tableState);
			var resultPromise = IndentService.searchIndents($scope.searchDTO);
			$q.all([ resultPromise ]).then(function(data) {
				CommonService.setPaginationResult($scope, tableState, data);
				_.each(data[0].records, function(record) {
					$scope.decisions[record.indentNo] = { id: record.indentNo, decision:'UNDECIDED', decisionReason:'' };
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
	
	$scope.confirm = function(){
		var errors = "";
		_.each($scope.records, function(record) {
			if ($scope.decisions[record.indentNo].decision == 'NO') {
				if($scope.decisions[record.indentNo].decisionReason == '' || $scope.decisions[record.indentNo].decisionReason == null){
					errors += "&bull; Please enter the reason for Indent ID "+ record.indentNo +".<br>";
				}
			}
		});
		if(errors.length > 0){
			$scope.$root.errorDialog(errors);
			$('#confirmSubmitModal').modal('hide');
		} else {
			$('#confirmSubmitModal').modal('show');
		}
	};
	
	$scope.submit = function() {
		var confirmedDecisions = [];
		_.each($scope.records, function(record) {
			if ($scope.decisions[record.indentNo].decision != 'NO') {
				$scope.decisions[record.indentNo].decisionReason = ''; // reset rejection reason
			}
			if ($scope.decisions[record.indentNo].decision != 'UNDECIDED') {
				confirmedDecisions.push($scope.decisions[record.indentNo]); // only send decided records
			}
		});
		var resultPromise = IndentService.acceptMultiIndents(confirmedDecisions);
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
			$scope.decisions[record.indentNo].decision = allDecision;
		});
	};
	
	$scope.$watch('tableState', function() {
		if ($scope.tableState) {
			$scope.search();
			firstLoad = false;
		}
    });
});

app.controller('IndentConfirmationController', function($q, $scope, IndentService, CommonService, Constants) {
	if(!$scope.$root.checkAccessRights('showIndentConfirmation')){return;}
	$scope.decisions = [];
	$scope.searchDTO = { startIndex:0, pageSize:Constants.PAGE_SIZE, statusCode:Constants.INDENT_APPROVED, templateFlag: Constants.FLAG_NO, notMtMaint:Constants.MT_MAINT };
	var firstLoad = true;
			
	$scope.paginate = function(tableState) {
		if (CommonService.initPagination($scope, tableState)) {
			CommonService.setPaginationSearch($scope, tableState);
			var resultPromise = IndentService.searchIndents($scope.searchDTO);
			$q.all([ resultPromise ]).then(function(data) {
				CommonService.setPaginationResult($scope, tableState, data);
				_.each(data[0].records, function(record) {
					$scope.decisions[record.indentNo] = { id: record.indentNo, decision:'UNDECIDED', decisionReason:'' };
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
	
	$scope.confirm = function(){
		var errors = "";
		_.each($scope.records, function(record) {
			if ($scope.decisions[record.indentNo].decision == 'NO') {
				if($scope.decisions[record.indentNo].decisionReason == '' || $scope.decisions[record.indentNo].decisionReason == null){
					errors += "&bull; Please enter the reason for Indent ID "+ record.indentNo +".<br>";
				}
			}
		});
		if(errors.length > 0){
			$scope.$root.errorDialog(errors);
			$('#confirmSubmitModal').modal('hide');
		} else {
			$('#confirmSubmitModal').modal('show');
		}
	};
	
	$scope.submit = function() {
		var confirmedDecisions = [];
		_.each($scope.records, function(record) {
			if ($scope.decisions[record.indentNo].decision != 'NO') {
				$scope.decisions[record.indentNo].decisionReason = ''; // reset rejection reason
			}
			if ($scope.decisions[record.indentNo].decision != 'UNDECIDED') {
				confirmedDecisions.push($scope.decisions[record.indentNo]); // only send decided records
			}
		});
		var resultPromise = IndentService.confirmIndents(confirmedDecisions);
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
			$scope.decisions[record.indentNo].decision = allDecision;
		});
	};
	
	$scope.$watch('tableState', function() {
		if ($scope.tableState) {
			$scope.search();
			firstLoad = false;
		}
    });
});

app.controller('IndentMtmaintConfirmationController', function($q, $scope, IndentService, CommonService, Constants) {
	if(!$scope.$root.checkAccessRights('showIndentMtMaintConfirmation')){return;}
	$scope.decisions = [];
	$scope.searchDTO = { startIndex:0, pageSize:Constants.PAGE_SIZE, statusCode:Constants.INDENT_APPROVED, templateFlag: Constants.FLAG_NO, activityTypeCode:Constants.MT_MAINT };
	var firstLoad = true;
			
	$scope.paginate = function(tableState) {
		if (CommonService.initPagination($scope, tableState)) {
			CommonService.setPaginationSearch($scope, tableState);
			var resultPromise = IndentService.searchIndents($scope.searchDTO);
			$q.all([ resultPromise ]).then(function(data) {
				CommonService.setPaginationResult($scope, tableState, data);
				_.each(data[0].records, function(record) {
					$scope.decisions[record.indentNo] = { id: record.indentNo, decision:'UNDECIDED', decisionReason:'' };
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
	
	$scope.confirm = function(){
		var errors = "";
		_.each($scope.records, function(record) {
			if ($scope.decisions[record.indentNo].decision == 'NO') {
				if($scope.decisions[record.indentNo].decisionReason == '' || $scope.decisions[record.indentNo].decisionReason == null){
					errors += "&bull; Please enter the reason for Indent ID "+ record.indentNo +".<br>";
				}
			}
		});
		if(errors.length > 0){
			$scope.$root.errorDialog(errors);
			$('#confirmSubmitModal').modal('hide');
		} else {
			$('#confirmSubmitModal').modal('show');
		}
	};
	
	$scope.submit = function() {
		var confirmedDecisions = [];
		_.each($scope.records, function(record) {
			if ($scope.decisions[record.indentNo].decision != 'NO') {
				$scope.decisions[record.indentNo].decisionReason = ''; // reset rejection reason
			}
			if ($scope.decisions[record.indentNo].decision != 'UNDECIDED') {
				confirmedDecisions.push($scope.decisions[record.indentNo]); // only send decided records
			}
		});
		var resultPromise = IndentService.confirmIndents(confirmedDecisions);
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
			$scope.decisions[record.indentNo].decision = allDecision;
		});
	};
	
	$scope.$watch('tableState', function() {
		if ($scope.tableState) {
			$scope.search();
			firstLoad = false;
		}
    });
});

app.controller('IndentCentralVoteApprovalController', function($q, $scope, IndentService, CommonService, Constants) {
	if(!$scope.$root.checkAccessRights('showCentralVoteApproval')){return;}
	$scope.decisions = [];
	$scope.searchDTO = { startIndex:0, pageSize:Constants.PAGE_SIZE, centralVoteStatusCode:Constants.PENDING, activityId:Constants.NATIONAL_EVENT };
	var firstLoad = true;
		
	$scope.paginate = function(tableState) {
		if (CommonService.initPagination($scope, tableState)) {
			CommonService.setPaginationSearch($scope, tableState);
			var resultPromise = IndentService.searchIndents($scope.searchDTO);
			$q.all([ resultPromise ]).then(function(data) {
				CommonService.setPaginationResult($scope, tableState, data);
				_.each(data[0].records, function(record) {
					$scope.decisions[record.indentNo] = { id: record.indentNo, decision:'UNDECIDED', decisionReason:'' };
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
	
	$scope.submit = function() {
		var confirmedDecisions = [];
		_.each($scope.records, function(record) {
			if ($scope.decisions[record.indentNo].decision != 'NO') {
				$scope.decisions[record.indentNo].decisionReason = ''; // reset rejection reason
			}
			if ($scope.decisions[record.indentNo].decision != 'UNDECIDED') {
				confirmedDecisions.push($scope.decisions[record.indentNo]); // only send decided records
			}
		});
		var resultPromise = IndentService.approveCentralVoteUsages(confirmedDecisions);
		$q.all([ resultPromise ]).then(function(result) {
			$scope.$root.infoDialog(result[0]);
			$scope.decisions = [];
			$scope.count = 0;
			$('[dcBtnName|="all"]').removeClass('active btn-success btn-danger btn-warning').addClass('btn-default');
			$scope.search();
		});
	};
	
	$scope.confirm = function(){
		var errors = "";
		_.each($scope.records, function(record) {
			if ($scope.decisions[record.indentNo].decision == 'NO') {
				if($scope.decisions[record.indentNo].decisionReason == '' || $scope.decisions[record.indentNo].decisionReason == null){
					errors += "&bull; Please enter the reason for Indent ID "+ record.indentNo +".<br>";
				}
			}
		});
		if(errors.length > 0){
			$scope.$root.errorDialog(errors);
			$('#confirmSubmitModal').modal('hide');
		} else {
			$('#confirmSubmitModal').modal('show');
		}
	};
	
	$scope.decideAll = function(allDecision) {
		_.each($scope.records, function(record) {
			$scope.decisions[record.indentNo].decision = allDecision;
		});
	};
	
	$scope.$watch('tableState', function() {
		if ($scope.tableState) {
			$scope.search();
			firstLoad = false;
		}
    });
});

app.controller('ManageTemplateController', function($q, $scope, IndentService, CommonService, Constants) {
	if(!$scope.$root.checkAccessRights('showManageTemplates')){return;}
	var rolesPromise = CommonService.getRoles();
	$scope.searchDTO = { startIndex:0, pageSize:Constants.PAGE_SIZE, templateFlag: Constants.FLAG_YES };
	$scope.advSearchCollapsed = true;
	$scope.checkboxes = { all:false, records:{ } };
	var counter = 0;
	
	$q.all([ rolesPromise ]).then(function(data) {
    	$scope.roles = data[0];
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
			});
		}
	};
	
	$scope.checkAll = function() {
		_.each($scope.records, function(record) {
			$scope.checkboxes.records[record.id] = $scope.checkboxes.all;
		});
	};
	
	$scope.showDeleteMsg = function() {
		counter = 0;
		if(angular.isDefined($scope.records)){
			var i = $scope.records.length;
			while (i--) {
				if ($scope.checkboxes.records[$scope.records[i].id]) {
					counter ++;
				}
			}
			if (counter != 0) {
				$("#deleteTemplateModal").modal('show');
				return
			} else {
				$scope.$root.errorDialog("Please Select at least 1 Template to Delete.");
				$("#deleteTemplateModal").modal('hide');
				return;
			}
		} else {
   			$scope.$root.errorDialog("Please Select at least 1 Template to Delete.");
   			$("#deleteTemplateModal").modal('hide');
		}
	};
	
	 $scope.deleteTemplate = function() {
	    var i = $scope.records.length;
	   	while (i--) {
	    	if ($scope.checkboxes.records[$scope.records[i].id]) {
	   			var resultPromise = IndentService.deleteTemplate($scope.records[i].id);
	   			$q.all([ resultPromise ]).then(function(result) {
	   				$scope.$root.infoDialog(result[0]);
	   			});
	   		}
	   	}
	   	setTimeout(function(){
	   		reload();
		}, 2000);
	   	$scope.reset();
	};
	
	var reload = function(){
		$scope.$root.reloadPage('/templates');
	};
	
	$scope.search = function() {
		CommonService.resetPagination($scope, 0, Constants.PAGE_SIZE);
		CommonService.search($scope, "indentTemplate.templateName");
	};
	
	$scope.reset = function() {
		$scope.checkboxes = { all:false };
		CommonService.resetPagination($scope, 0, Constants.PAGE_SIZE);
		$scope.searchDTO = { startIndex:0, pageSize:Constants.PAGE_SIZE, templateFlag: Constants.FLAG_YES };
		$scope.searchDTO.templateType = "Global";
	};
	
});
