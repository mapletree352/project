app.controller('CdlcController', function($location,$q, $scope, CdlcService,$stateParams,CommonService,PersonnelService,Constants,$filter) {
	if(!$scope.$root.checkAccessRights('showNewCdlConversion')){return;}
	$scope.cdlcDTO={id:0,applicant:"",cdlcTypeId:"",recommendedBy:"",appointment:"",applicaionId:"",unitCode:"",contactNo:"",processBy:"",processRemarks:"",tpScreenRemark:"",tpScreenDate:""};
	var cdlcClassPromise=CdlcService.getCdlcConversionTypes();
	$scope.driverDTO={};
	
	var tpOutcomesPromise= CdlcService.getTpOutcomes();
	$q.all([cdlcClassPromise,tpOutcomesPromise ]).then(function(data)
	   {
			$scope.cdlClasses=data[0];
			$scope.tpScreeningOutcomes=data[1];
			
	   });
	
	$scope.cdlcViewPanel=function(){
		  var getDriverDetailsPromise=CdlcService.getDriverDetails($scope.cdlcDTO.applicant);
			$q.all([getDriverDetailsPromise]).then(function(data) 
			{	
				$scope.driverDTO=data[0].driverDTO;
				$scope.personnelDTO=data[0].personnelDTO;
				$scope.cdlcDTOs=data[0].cdlcDTOs;
				var points=0;
				_.each(data[0].driverDemeritPoints, function(record)
				{ 
					 points+=record.demeritPoints;
			
				});
				$scope.cdlcDTOs.demeritPoints=points;
				
			});
		$("#cdlcViewPanel").modal();
	}
	  $scope.$watch("cdlcDTO.recommendedBy", function (newValue, oldValue)
	  {
		   if(!angular.isUndefined(newValue)){
				  if(newValue!="")
				  {
					  var getPersonnelPromise=CdlcService.getPersonnel(newValue);
						$q.all([getPersonnelPromise]).then(function(data) 
						{	
							$scope.cdlcDTO.appointment=data[0].personnelDTO.appointment;		
							$scope.cdlcDTO.contactNo=data[0].personnelDTO.mobilePhoneNo;	
							$scope.getSearchUnit(data[0].personnelDTO.unit);
						});
						
				  }
			  }		  	
		});
	
		$scope.getSearchUnit=function(unit)
		{
			var searchUnitpromise=CdlcService.searchUnit(unit);
			$q.all([searchUnitpromise]).then(function(data){
				$scope.cdlcDTO.unitCode=data[0].code;
				$scope.unit=data[0].name+" ("+data[0].code+")";
			
			});	
		};
	
		$scope.$watch("unit", function (newValue, oldValue)
		{
			if(newValue=null){
				if(newValue==""){
					$scope.cdlcDTO.unitCode="";
					$scope.unit="";
				}
			}
					
		});
		
	  	$scope.$watch("personnel", function (newValue, oldValue)
		{
			if(newValue==null|| angular.isUndefined(newValue))
					$scope.cdlcDTO.appointment="";							  	
					$scope.cdlcDTO.unitCode="";
					$scope.unit="";
					$scope.cdlcDTO.contactNo="";
		});
	  		  	
	  $scope.$watch("driver", function (newValue, oldValue)
		{
			if(newValue==null|| angular.isUndefined(newValue))
				$scope.cdlcDTO.applicant="";
			
		});

	  $scope.saveUpdateCdlcApplication=function()
	  {  	
			  var checkValidInput=false;
				  if( angular.isUndefined($scope.cdlcDTO.unitCode) || $scope.cdlcDTO.unitCode==""){
					  checkValidInput=false;
					 	$scope.$root.infoDialog("Please Enter unit");	
				  }else if( angular.isUndefined($scope.cdlcDTO.recommendedBy) || $scope.cdlcDTO.recommendedBy==""){
				  checkValidInput=false;
				 	$scope.$root.infoDialog("Please Enter Recommeded By");	
			  }else  if(angular.isUndefined($scope.cdlcDTO.appointment) || $scope.cdlcDTO.appointment==""){
				  checkValidInput=false;
				 	$scope.$root.infoDialog("Please Enter Appointment");	
			  }	else if(angular.isUndefined($scope.cdlcDTO.contactNo) || $scope.cdlcDTO.contactNo==""){
				  checkValidInput=false;
				 $scope.$root.infoDialog("Please Enter Contact Number");	
			  }	else if($scope.cdlcDTO.applicant==""){
				  checkValidInput=false;
			 	$scope.$root.infoDialog("Please Enter Nric No or Name");	 
			  }
			  else if( angular.isUndefined($scope.cdlcDTO.cdlcTypeId) || $scope.cdlcDTO.cdlcTypeId==""){
				  checkValidInput=false;
				 	$scope.$root.infoDialog("Please Choose CDL Class");	
			  } else if(angular.isUndefined($scope.cdlcDTO.processBy) || $scope.cdlcDTO.processBy==""){
				  checkValidInput=false;
				 	$scope.$root.infoDialog("Please enter Processed By");	
				  
			  }else if(angular.isUndefined($scope.cdlcDTO.processRemarks) || $scope.cdlcDTO.processRemarks=="") {
				  checkValidInput=false;
				 	$scope.$root.infoDialog("Please enter Process Remarks");		  
			  }else if (angular.isUndefined($scope.cdlcDTO.tpScreenDate) || $scope.cdlcDTO.tpScreenDate==""){
				  checkValidInput=false;
				 	$scope.$root.infoDialog("Please Choose TP Screen Date");	
			  }else if (angular.isUndefined($scope.cdlcDTO.tpScreenOutComeId) || $scope.cdlcDTO.tpScreenOutComeId==""){
				  checkValidInput=false;
				 	$scope.$root.infoDialog("Please Choose TP Screen OutCome");	
			  }else{
				  checkValidInput=true;
			  }
			  
			 if(checkValidInput)
			 {
				 var saveUpdateNewCDLCPromise= CdlcService.saveUpdateCDLC($scope.cdlcDTO);
					$q.all([saveUpdateNewCDLCPromise]).then(function(data) 
					{		
						   $location.path(data[0].submit?"/cdlc/"+data[0].id:"/cdlc_new");
					});	
			 }		   
	  }  
	
});

app.controller('CdlcViewController', function($location,$q, $scope, CdlcService,PersonnelService,$stateParams,CommonService,AccidentService,DriverService,Constants) {
	if(!$scope.$root.checkAccessRights('showSearchCdlConversions')){return;}
	$scope.cdlcTab="A";
	$scope.advSearchCollapsed=true;
	$scope.searchDTO = {driverNricNo:"",startIndex:0, pageSize:Constants.PAGE_SIZE };
	$scope.cdlcDTO={isValidDriver:false,id:0,applicant:"",cdlcTypeId:"",recommended:"",recommendedBy:"",appointment:"",applicaionId:"",unitCode:"",contactNo:"",processed:"",processBy:"",holdReason:"",rejectReason:""};
	$scope.cdlcUpdateDTO={id:0,tpScreenRemark:"",tpScreenOutComeId:0,tpScreenDate:null	};
	$scope.personnel="";
	$scope.dto={driverOffences:[]};
	$scope.offenceDTO={};
	var tpOutcomesPromise= CdlcService.getTpOutcomes();
	$q.all([tpOutcomesPromise]).then(function(data) 
	{
		$scope.tpScreeningOutcomes=data[0];
	});	   
	var driverOffenceCounterId=1;
	var cdlcClassPromise=CdlcService.getCdlcConversionTypes();
	var getCDLCPromise=CdlcService.getCDLC($stateParams.id);
	var getVehicleTypesPromise=CommonService.getVehicleTypes();
	$scope.viewSearchNameNricParameter={recommendedBy:"recommendedBy",processBy:"processBy"};
	$q.all([cdlcClassPromise,getCDLCPromise,getVehicleTypesPromise]).then(function(data) 
	{
			$scope.cdlClasses=data[0];
			
			$scope.photo=data[1].photo!=null?data[1].photo:"images/personnels/personnel.gif";
			$scope.cdlcDTO=data[1].cdlcDTO;
			$scope.cdlcDTO.miliageCheckFlagDisplay=$scope.parseYNvalue(data[1].cdlcDTO.miliageCheckFlag);
			$scope.cdlcDTO.tpScreenFlagDisplay=$scope.parseYNvalue(data[1].cdlcDTO.tpScreenFlag);
			$scope.cdlcDTO.eligibleFlagDisplay=$scope.parseYNvalue(data[1].cdlcDTO.eligibleFlag);

			$scope.personnel=data[1].cdlcDTO.recommended;
			$scope.cdlcDTO.recommendedBy=data[1].cdlcDTO.recommendedBy;
			$scope.processBy=data[1].cdlcDTO.processed;
			$scope.cdlcDTO.processBy=data[1].cdlcDTO.processBy;
			$scope.driverDTO=data[1].driverDTO;
			$scope.driverPermit=data[1].driverPermit;
			$scope.getSearchUnit(data[1].cdlcDTO.unitCode);
			
			_.each($scope.driverDTO.driverDemeritPoints, function(record)
			{ 	
				var offencesDTO=CdlcService.getDriverOffencesDTO($scope.dto.driverOffences,driverOffenceCounterId);
				offencesDTO={counterId:driverOffenceCounterId,type:null,offenceOrReductionReason:null,issueDate:null,issuedBy:null,submitDate:null,submittedBy:null,demeritPoints:null,fineAmt:null,vehicleType:null,vehicleNo:null,location:null,status:null};
				
				$scope.offenceDTO={counterId:driverOffenceCounterId,type:record.type,offenceOrReductionReason:record.offenceOrReductionReason,issueDate:record.issueDate,issuedBy:record.issuedBy,submitDate:record.submitDate,submittedBy:record.submittedBy,demeritPoints:record.demeritPoints,fineAmt:record.fineAmt,vehicleType:record.vehicleType,vehicleNo:record.vehicleNo,location:record.location,status:record.status};

				CdlcService.mapDriverOffencesProperties($scope.offenceDTO,offencesDTO);
				$scope.dto.driverOffences.push(offencesDTO);
				driverOffenceCounterId++;
			});	
		
			$scope.searchDTO.driverNricNo=$scope.driverDTO.nricNo;
			  $scope.vehicleTypes=data[2];
		});	   
	
	$scope.reset = function() {
		CommonService.resetPagination($scope, 0, Constants.PAGE_SIZE);
		$scope.searchDTO = { startIndex:0, pageSize:Constants.PAGE_SIZE, driverNricNo:$stateParams.nricNo };
	};
	
	
	$scope.paginate = function(tableState) {
		if(CommonService.initPagination($scope, tableState)) {
			CommonService.setPaginationSearch($scope, tableState);
			var resultPromise = CdlcService.searchCdlcConversionTrip($scope.searchDTO);
			$q.all([ resultPromise]).then(function(data) {
				CommonService.setPaginationResult($scope, tableState, data);

				if (data[0].records.length === 0) {
					$scope.$root.infoDialog("No result found.");
				}
			});
		}
	};
	
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
	
	$scope.updateTpScreenDetails=function(){
		
		var isValidinput=false;
	  if( angular.isUndefined($scope.cdlcUpdateDTO.tpScreenDate) || $scope.cdlcUpdateDTO.tpScreenDate==""){
		  isValidinput=false;
		 $scope.$root.infoDialog("Please choose TP Screen date");
	  }else  if( angular.isUndefined($scope.cdlcUpdateDTO.tpScreenOutComeId) || $scope.cdlcUpdateDTO.tpScreenOutComeId==""){
		  isValidinput=false;
			 $scope.$root.infoDialog("Please choose TP Screen Out Come");
	  }else if( angular.isUndefined($scope.cdlcUpdateDTO.tpScreenRemark) || $scope.cdlcUpdateDTO.tpScreenRemark==""){
		  isValidinput=false;
		 $scope.$root.infoDialog("Please choose TP Screen Remark");
	  }else{
		  isValidinput=true;
	  }
		if(isValidinput){
			$scope.cdlcUpdateDTO.id=$scope.cdlcDTO.id;
			var updateTpScreenDetails=CdlcService.updateTpScreenDetails($scope.cdlcUpdateDTO);
			$q.all([ updateTpScreenDetails ]).then(function(data) {
				$scope.cdlcDTO.status="CDL Application Submitted";
				$scope.cdlcDTO.statusCode="CDLC_SUB";
				$scope.cdlcDTO.tpScreenDate=$scope.cdlcUpdateDTO.tpScreenDate;
				var tpScreenOutComePromise=CdlcService.getTpOutCome($scope.cdlcUpdateDTO.tpScreenOutComeId);
				$q.all([ tpScreenOutComePromise ]).then(function(data) {
					$scope.cdlcDTO.tpScreenOutCome=data[0];	
				});

				$scope.cdlcDTO.tpScreenRemark=$scope.cdlcUpdateDTO.tpScreenRemark;
			});
		}
	
	};
	$scope.countTotalMileage=function(){
		var totalMileage=0;
		_.each($scope.records, function(record){
			totalMileage+=record.mileage;	
		});
		return totalMileage;
	}
	
		$scope.openDemeritPointsRecord=function(counterId){
			
			var offencesDTO=CdlcService.getDriverOffencesDTO($scope.dto.driverOffences,counterId);
			$scope.offenceDTO=offencesDTO;
			$("#demeritPtsRecModal").modal();
			
		}
		$scope.calculateTotalDemeritPoint=function(){
			var totalPoint=0;
			_.each($scope.dto.driverOffences, function(record)
			{ 	
				totalPoint+=record.demeritPoints;
			});	
			return totalPoint;
		}
		$scope.getSearchUnit=function(unit)
		{
			if(!angular.isUndefined(unit)){
				var searchUnitpromise=CdlcService.searchUnit(unit);
				$q.all([searchUnitpromise]).then(function(data){
					$scope.unit=data[0].name + " (" + data[0].code + ")";	
				});	
			}
		}
		
		$scope.updateCDLC=function()
		{
			var checkValidInput=false;
			 
			
			 if( angular.isUndefined($scope.cdlcDTO.unitCode) || $scope.cdlcDTO.unitCode==""){
				  checkValidInput=false;
				 	$scope.$root.infoDialog("Please Enter unit");	
			  }else if( angular.isUndefined($scope.cdlcDTO.recommendedBy) || $scope.cdlcDTO.recommendedBy==""){
				  checkValidInput=false;
				 	$scope.$root.infoDialog("Please Enter Recommeded By");	
			  }else  if( angular.isUndefined($scope.cdlcDTO.recommendDate) || $scope.cdlcDTO.recommendDate==""){
				  checkValidInput=false;
				 	$scope.$root.infoDialog("Please Enter Recommeded Date");	
			  }else  if(angular.isUndefined($scope.cdlcDTO.appointment) || $scope.cdlcDTO.appointment==""){
				  checkValidInput=false;
				 	$scope.$root.infoDialog("Please Enter Appointment");	
			  }	else if(angular.isUndefined($scope.cdlcDTO.contactNo) || $scope.cdlcDTO.contactNo==""){
				  checkValidInput=false;
				 $scope.$root.infoDialog("Please Enter Contact Number");	
			  }	else if($scope.cdlcDTO.applicant==""){
				  checkValidInput=false;
			 	$scope.$root.infoDialog("Please Enter Nric No or Name");	 
			  }	 else if( angular.isUndefined($scope.cdlcDTO.cdlcTypeId) || $scope.cdlcDTO.cdlcTypeId==""){
				  checkValidInput=false;
				 	$scope.$root.infoDialog("Please Choose CDL Class");	
			  } else if(angular.isUndefined($scope.cdlcDTO.processBy) || $scope.cdlcDTO.processBy==""){
				  checkValidInput=false;
				 	$scope.$root.infoDialog("Please enter Processed By");	
				  
			  }else if(angular.isUndefined($scope.cdlcDTO.processDate) || $scope.cdlcDTO.processDate==""){
				  checkValidInput=false;
				 	$scope.$root.infoDialog("Please choose Process Date");		  
			  }else if(angular.isUndefined($scope.cdlcDTO.miliageCheckFlag) || $scope.cdlcDTO.miliageCheckFlag==""){
				  checkValidInput=false;
				 	$scope.$root.infoDialog("Please choose Milage Checked");		  
			  }else if($scope.cdlcDTO.miliageCheckFlag=="N" && (angular.isUndefined($scope.cdlcDTO.tpScreenFlag) || $scope.cdlcDTO.tpScreenFlag=="")){
				  checkValidInput=false;
				 	$scope.$root.infoDialog("Please choose Tp Screen");		  
			  }else if(angular.isUndefined($scope.cdlcDTO.eligibleFlag) || $scope.cdlcDTO.eligibleFlag==""){
				  checkValidInput=false;
				 	$scope.$root.infoDialog("Please choose Class Eligible");		  
			  }else{
				  checkValidInput=true;
			  }
			 
			  if(checkValidInput){
				 var saveUpdateNewCDLCPromise= CdlcService.saveUpdateCDLC($scope.cdlcDTO);
					$q.all([saveUpdateNewCDLCPromise]).then(function(data) 	
					{	
						$scope.cdlcDTO.status="CDL Application Submited";
						$scope.cdlcDTO.statusCode=Constants.CDLC_SUBMITTED;
						$scope.$root.infoDialog(data[0]);		  
					});	
			  }
		};
		

		$scope.parseYNvalue=function(yesNoValue){
			var result="";
			switch (yesNoValue){
				case Constants.FLAG_YES:
					result= "Yes";
					break;
				case Constants.FLAG_NO:
					result=  "No";
					break;
				default:
					result=  "";
					break;
			}
			return result;	
		}
	
		$scope.updateCdlcHoldApplication=function(){
			var updateHoldPromise=CdlcService.updateCdlcHoldApplication($scope.cdlcDTO);
			$q.all([updateHoldPromise]).then(function(data) 
			{	
					$('#holdCdlc').modal('hide');
					$scope.cdlcDTO.status="CDL Application Pending";

					$scope.cdlcDTO.statusCode=Constants.CDLC_PENDING;
					$scope.$root.infoDialog(data[0]);
					
			});
			
		};
		
		$scope.updateCdlcApproveApplication=function(){
			var updateHoldPromise=CdlcService.updateCdlcApproveApplication($scope.cdlcDTO);
			$q.all([updateHoldPromise]).then(function(data) 
			{	
					$('#approveCDLC').modal('hide');
					$scope.cdlcDTO.status="CDL Application Approve";

					$scope.cdlcDTO.statusCode=Constants.CDLC_APP;
					$scope.$root.infoDialog(data[0]);
					
			});
			
		};
		
		$scope.updateCdlcUnHoldApplication=function(){
			var updateHoldPromise=CdlcService.updateCdlcUnHoldApplication($scope.cdlcDTO);
			$q.all([updateHoldPromise]).then(function(data) 
			{	
					$('#holdCdlc').modal('hide');
					$scope.cdlcDTO.status="CDL Application Submitted";
					$scope.cdlcDTO.statusCode=Constants.CDLC_SUBMITTED;

					$scope.$root.infoDialog(data[0]);
			});
			
		};
		
		
		
		
		$scope.updateCdlcRejectApplication=function(){
			var updateRejectPromise=CdlcService.updateCdlcRejectApplication($scope.cdlcDTO);
			$q.all([updateRejectPromise]).then(function(data) 
			{		
					$scope.cdlcDTO.status="CDL Application Rejected";
					$scope.cdlcDTO.statusCode=Constants.CDLC_REJECTED;
		
					$('#rejectCdlc').modal('hide');
					$scope.$root.infoDialog(data[0]);
	
			});
	
		};
		

		$scope.searchNricName=function(value,parameter){
			  var getNricNamePromise= AccidentService.searchNricName(value);
			  $q.all([getNricNamePromise]).then(function(data) 
				{
				  switch(parameter){
					  case $scope.viewSearchNameNricParameter.processBy:
							$scope.processBy=data[0].name+" ("+data[0].code+")";
						  break;
					  
					  case $scope.viewSearchNameNricParameter.recommendedBy:
						  $scope.personnel=data[0].name+" ("+data[0].code+")";	
						  break;	  
				  }
				});
			  
		};
	
		  $scope.$watch("cdlcDTO.processBy", function (newValue, oldValue){
			  if(!angular.isUndefined(oldValue)){
				  if(oldValue!=""){
					  $scope.searchNricName(newValue,$scope.viewSearchNameNricParameter.processBy);
				  }
			  } 
		  });
		    
		$scope.$watch('cdlcDTO.recommendedBy', function (newValue, oldValue){	
				 if(!angular.isUndefined(newValue)){
					  if(newValue!=""&&oldValue!=""){
						  var getPersonnelPromise=PersonnelService.getPersonnel(newValue);
							$q.all([getPersonnelPromise]).then(function(data) 
							{	
								$scope.cdlcDTO.appointment=data[0].appointment;		
							});
					  }	
				  } 
				  if(!angular.isUndefined(oldValue)){
					  if(oldValue!=""){
						  $scope.searchNricName(newValue,$scope.viewSearchNameNricParameter.recommendedBy);				  
					  }
				  } 		  
		    });
		  
			$scope.$watch("personnel", function (newValue, oldValue)
			{
				if(newValue==null|| angular.isUndefined(newValue))
					$scope.cdlcDTO.appointment="";							  	
			});
		
		  
});
app.controller('CdlcSearchController', function($location,$q, $scope, CdlcService,PersonnelService,CommonService,Constants) {
		if(!$scope.$root.checkAccessRights('showSearchCdlConversions')){return;}
		$scope.advSearchCollapsed = true;
		$scope.searchDTO = {startIndex:0, pageSize:Constants.PAGE_SIZE };
		$scope.$root.limitAccess($scope.searchDTO);
		$scope.checkboxes={cdlcRecords:{},allCdlc:false}
		var cdlcClassPromise=CdlcService.getCdlcConversionTypes();
		var tpOutcomesPromise= CdlcService.getTpOutcomes();
		$scope.selectedCDL = [];
		$scope.collectionsDTO={collectionDTO:[]};
		$scope.collection={collectDate:null,collectStatus:""};

		$q.all([cdlcClassPromise,tpOutcomesPromise ]).then(function(data)
		   {

				$scope.cdlClasses=data[0];
				$scope.tpScreeningOutcomes=data[1];
		   });
		

		
	
		$scope.updateCollectionDate= function(){
	
			$scope.dto = { collections: [] };
			var data=[];
	    	_.each($scope.records, function(record){
	    		if ($scope.checkboxes.cdlcRecords[record.id]){
	    			if(record.applicationStatusCode==Constants.CDLC_APPROVED) 
	    				data.push({ applicationId:record.id, applicationNo:record.applicationNo,nric:record.nric,rankName:record.rankName,cdlcType:record.cdlcType,collectStatus:"",collectDate:null,reasons:"",remarks:"" });
	    	    	
	    		}
	    	});    
	    	$scope.selectedCDL =data;
			if ($scope.selectedCDL.length == 0) {
				$scope.$root.errorDialog('Please select at least one approved record.');
			} else {
				
				$('#batchUpdateModal').modal({ backdrop:'static' });
			}
			
		};
		$scope.batchUpdateFunction=function(selectedCDL){
			var isValid=false;
			 if($scope.collection.collectionStatus==Constants.CDLC_COLLECTED && (angular.isUndefined($scope.collection.collectDate) || $scope.collection.collectDate=="" || $scope.collection.collectDate==null)){
				 isValid=false;
					$scope.$root.infoDialog('Please select at Collection Date');		
			
			 }else  if( angular.isUndefined($scope.collection.collectionStatus) || $scope.collection.collectionStatus==""){
				 isValid=false;
					$scope.$root.infoDialog('Please select at Collection Status');
			 }else{
				 isValid=true;
			 }
			 if(isValid){
				var data=[];
		 
			  	_.each(selectedCDL, function(record){
			  		record.collectStatus=$scope.collection.collectionStatus;
			  		record.collectDate=$scope.collection.collectDate;
			  		data.push(record);
			  	
		    	});    
				$scope.collectionsDTO.collectionDTO=data;
				var resultPromise = CdlcService.updateCollectionStatus($scope.collectionsDTO);
					$q.all([ resultPromise]).then(function(data) {
			
					});
			 }
			
		}
		$scope.reset = function()
		{
			CommonService.resetPagination($scope, 0, Constants.PAGE_SIZE);
			$scope.searchDTO={};
			$scope.searchDTO = {driverId:$scope.searchDTO.driverId, startIndex:0, pageSize:Constants.PAGE_SIZE, order: "", orderProperty:"" };
			$scope.$root.limitAccess($scope.searchDTO);
		};
		
		$scope.paginate = function(tableState) {
			if(CommonService.initPagination($scope, tableState)) {
				CommonService.setPaginationSearch($scope, tableState);
				var resultPromise = CdlcService.searchCdlcConversion($scope.searchDTO);
				$q.all([ resultPromise]).then(function(data) {
					CommonService.setPaginationResult($scope, tableState, data);
					if (data[0].records.length === 0) {
						$scope.$root.infoDialog("No result found.");
					}
				});
			}
		};
		$scope.checCdlcAll = function()
		{
			_.each($scope.records, function(record) 
			{ 
				$scope.checkboxes.cdlcRecords[record.id] = $scope.checkboxes.allCdlc;
			});
		};
		
		$scope.search = function() {
			$scope.searchDTO.recommendedBy=$scope.recommendedBy;
			$scope.searchDTO.processby=$scope.processby;
			CommonService.resetPagination($scope, 0, Constants.PAGE_SIZE);
			CommonService.search($scope, "applicationId");
		};
		
		$scope.download = function() {
			var resultPromise = CdlcService.exportCdlcConversion($scope.searchDTO);
			$q.all([resultPromise]).then(function(data) {
				$scope.$root.exportFile(data[0], "text/plain", "CdlcConversion.xlsx");
			});
		};	
});

app.controller('CdlcApprovalController', function($q, $scope,CdlcService,CommonService,Constants) {
		if(!$scope.$root.checkAccessRights('showCdlConversionApproval')){return;}
		$scope.decisions = [];
		$scope.decisionHoldUnHold = {subDecision:[]};
		$scope.searchDTO = { startIndex:0, pageSize:Constants.PAGE_SIZE, statusCodes:[Constants.CDLC_SUBMITTED] };
		$scope.$root.limitAccess($scope.searchDTO);
		var firstLoad = true;
		
		$scope.paginate = function(tableState) {
			if (CommonService.initPagination($scope, tableState)) {
				CommonService.setPaginationSearch($scope, tableState);
				var resultPromise = CdlcService.searchCDLCs($scope.searchDTO);
				$q.all([ resultPromise ]).then(function(data) {
					CommonService.setPaginationResult($scope, tableState, data);
					_.each($scope.records, function(record) {
						$scope.decisions[record.id] = { id: record.id, idLabel: record.nricNo, decision:'UNDECIDED', decisionReason:undefined};			
					});
					if ($scope.records.length === 0 && firstLoad) {
						$scope.$root.infoDialog("No result found.");
					}				
				});	
			} 
		};
		
		$scope.search = function() {
			CommonService.resetPagination($scope, 0, Constants.PAGE_SIZE);
			CommonService.search($scope, "applicant.nricNo");
		};
		
		$scope.confirm = function() {
			var confirmedDecisions = [];
			
			_.each($scope.records, function(record) {
				var decisionDTO = _.clone($scope.decisions[record.id]);
				if (decisionDTO.decision != 'NO') {
					decisionDTO.decisionReason = undefined; // reset rejection reason
				}		
				if (decisionDTO.decision != 'HOLD') {
					decisionDTO.decisionReason = undefined; // reset HOLD reason
				}	
		
				if (decisionDTO.decision !== 'UNDECIDED') {
					decisionDTO.decisionReason=$scope.decisions[record.id].decisionReason;
					confirmedDecisions.push(decisionDTO);
				}
			});
			
			var resultPromise = CdlcService.approveOrRejectCdlc(confirmedDecisions);
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
app.controller('CdlcMasterDataController', function($location,$q, $scope, DriverService,CdlcService,CommonService,Constants) {
		if(!$scope.$root.checkAccessRights('manageCdlConversionData')){return;}
		var cdlcConversionTypeCounter=1;
		var tpScreenOutcomeCounter=1;
		var DeleteErrorMessage="Record has been used by existing data";
		var DeleteMessage="Record is Deleted";
		$scope.dto={cdlcConversionTypes:[],tpScreenOutcomes:[]};
		$scope.searchDTO={cdlcType:0,tpScreenOutcomeId:0};
		$scope.$root.limitAccess($scope.searchDTO);
		var cdlcClassPromise=CdlcService.getCdlcConversionTypes();
		var getRewardTypesPromise=CommonService.getRewardTypes();
		var tpOutcomes= CdlcService.getTpOutcomes();
		$scope.reward={id:0,name:""};
		$q.all([cdlcClassPromise,tpOutcomes,getRewardTypesPromise]).then(function(data) 
		{
			_.each(data[0], function(record) 
			{ 
				$scope.cdlcConversionTypesDTO={id:record.id,name:record.name,rewardId:record.rewardId,rewardName:record.rewardName,counterId:cdlcConversionTypeCounter};
				var cdlcConversionTypesDTO=CdlcService.getCdlcConversionTypesDTO($scope.dto.cdlcConversionTypes,$scope.cdlcConversionTypesDTO.counterId);
				cdlcConversionTypesDTO={id:0,name:"",rewardId:0,rewardName:"",counterId:cdlcConversionTypeCounter};
				cdlcConversionTypeCounter++;
				CdlcService.mapCdlcConversionTypesProperties($scope.cdlcConversionTypesDTO,cdlcConversionTypesDTO);
				$scope.dto.cdlcConversionTypes.push($scope.cdlcConversionTypesDTO);	
			});

			_.each(data[1], function(record) 
					{ 
						$scope.tpScreenOutComeDTO={id:record.id,name:record.name,counterId:tpScreenOutcomeCounter};
						var tpScreenOutComeDTO=CdlcService.getTpScreenOutComeDTO($scope.dto.tpScreenOutcomes,$scope.tpScreenOutComeDTO.counterId);
						tpScreenOutComeDTO={id:0,name:"",counterId:cdlcConversionTypeCounter};
						tpScreenOutcomeCounter++;
						CdlcService.mapTpScreenOutProperties($scope.tpScreenOutComeDTO,tpScreenOutComeDTO);
						$scope.dto.tpScreenOutcomes.push(tpScreenOutComeDTO);	
					});
			
			$scope.rewardTypes=data[2];
		});
		
		$scope.showConversionType=function(typeId)
		{
			var cdlcConversionTypesDTO=CdlcService.getCdlcConversionTypesDTO($scope.dto.cdlcConversionTypes,typeId!=null?typeId:0);
			if(typeId==null)
			{					
				var counters=$scope.dto.cdlcConversionTypes.length;
				$scope.cdlcConversionTypesDTO={isEdit:false,id:0,name:"",rewardId:0,counterId:counters+1};
			}else	
			{
				$scope.cdlcConversionTypesDTO={isEdit:true,id:cdlcConversionTypesDTO.id,name:cdlcConversionTypesDTO.name,rewardId:cdlcConversionTypesDTO.rewardId,counterId:cdlcConversionTypesDTO.counterId};
			}
		
			$('#addEditCdlcConversionTypeModal').modal();
		};
		
		$scope.saveUpdateCdlcConversionType=function(counterId)
		{
			if ($scope.cdlcConversionTypesDTO.name==""||angular.isUndefined($scope.cdlcConversionTypesDTO.name)){
				$scope.$root.infoDialog("Please Enter Cdlc Conversion type");
			}else{
				var cdlcConversionTypesDTO=CdlcService.getCdlcConversionTypesDTO($scope.dto.cdlcConversionTypes,$scope.cdlcConversionTypesDTO.isEdit==true?counterId:0);
				var saveUpdatePromise=CdlcService.saveOrUpdateCdlcConversionTypes($scope.cdlcConversionTypesDTO);
				$q.all([saveUpdatePromise]).then(function(data)
				{
					if(!$scope.cdlcConversionTypesDTO.isEdit)
					{
						var tmp=$scope.cdlcConversionTypesDTO;
						cdlcConversionTypesDTO={id:0,name:"",reward:{id:0,name:""},counterId:0};
						$scope.cdlcConversionTypesDTO={id:data[0],name:tmp.name,rewardId:tmp.rewardId,counterId:tmp.counterId};
						CdlcService.mapCdlcConversionTypesProperties($scope.cdlcConversionTypesDTO,cdlcConversionTypesDTO);
						$scope.dto.cdlcConversionTypes.push(cdlcConversionTypesDTO);	
					}else{
						CdlcService.mapCdlcConversionTypesProperties($scope.cdlcConversionTypesDTO,cdlcConversionTypesDTO);
						$scope.$root.infoDialog("Cdlc Conversion update successfully");
					}
				});
				
			}
		};
		
		$scope.deleteCdlcConversionType=function(typeId){
			var cdlcConversionTypesDTO=CdlcService.getCdlcConversionTypesDTO($scope.dto.cdlcConversionTypes,typeId!=null?typeId:0);
			$scope.searchDTO={cdlcType:cdlcConversionTypesDTO.id};
			var deleteCdlcConversionTypePromise=CdlcService.deleteCdlcConversionType($scope.searchDTO);
			$q.all([deleteCdlcConversionTypePromise]).then(function(data)
			{				
				if(data[0]==true)
				{
					$scope.returnConversionTypeMessage=DeleteErrorMessage;
				}
				else
				{
					$scope.dto.cdlcConversionTypes.splice((cdlcConversionTypesDTO.counterId-1),1);
					$scope.returnConversionTypeMessage=DeleteMessage;	
				}
				$('#deleteConversionTypeModal').modal();		
			});	
		};
		
		$scope.showTpOutCome=function(outcomeId)
		{
			var tpScreenOutcomeDTO=CdlcService.getTpScreenOutComeDTO($scope.dto.tpScreenOutcomes,outcomeId!=null?outcomeId:0);
			if(outcomeId==null)
			{					
				var counters=$scope.dto.tpScreenOutcomes.length;
				$scope.tpScreenOutcomeDTO={isEdit:false,id:0,name:"",counterId:counters+1};
			}else	
			{
				$scope.tpScreenOutcomeDTO={isEdit:true,id:tpScreenOutcomeDTO.id,name:tpScreenOutcomeDTO.name,counterId:tpScreenOutcomeDTO.counterId};
			}
		
			$('#addEditTpOutComeModal').modal();
		};
		
		$scope.saveUpdateTpScreenOutCome=function(counterId)
		{
			if ($scope.tpScreenOutcomeDTO.name==""||angular.isUndefined($scope.tpScreenOutcomeDTO.name)){
				$scope.$root.infoDialog("Please Enter Tp Screen OutCome");
			}else{
				var tpScreenOutcomeDTO=CdlcService.getTpScreenOutComeDTO($scope.dto.tpScreenOutcomes,$scope.tpScreenOutcomeDTO.isEdit==true?counterId:0);
				var saveUpdatePromise=CdlcService.saveOrUpdateTpScreenOutcome($scope.tpScreenOutcomeDTO);
				$q.all([saveUpdatePromise]).then(function(data)
				{
					if(!$scope.tpScreenOutcomeDTO.isEdit)
					{
						var tmp=$scope.tpScreenOutcomeDTO;
						tpScreenOutcomeDTO={id:0,name:"",counterId:0};
						$scope.tpScreenOutcomeDTO={id:data[0],name:tmp.name,counterId:tmp.counterId};
						CdlcService.mapTpScreenOutProperties($scope.tpScreenOutcomeDTO,tpScreenOutcomeDTO);
						$scope.dto.tpScreenOutcomes.push(tpScreenOutcomeDTO);	
					}else{
						CdlcService.mapTpScreenOutProperties($scope.tpScreenOutcomeDTO,tpScreenOutcomeDTO);
						$scope.$root.infoDialog("Tp Screen OutCome update successfully");
					}
				});
				
			}
		};
		
		$scope.deleteTpScreenOutCome=function(outcomeId){
			var tpScreenOutcomeDTO=CdlcService.getTpScreenOutComeDTO($scope.dto.tpScreenOutcomes,outcomeId!=null?outcomeId:0);
			$scope.searchDTO.tpScreenOutcomeId=parseInt(tpScreenOutcomeDTO.id);
			var deleteTpScreenOutComePromise=CdlcService.deleteTpScreenOutcome($scope.searchDTO);
			$q.all([deleteTpScreenOutComePromise]).then(function(data)
			{				
				if(data[0]==true)
				{
					$scope.returnConversionTypeMessage=DeleteErrorMessage;
				}
				else
				{
					$scope.dto.tpScreenOutcomes.splice((tpScreenOutcomeDTO.counterId-1),1);
					$scope.returnConversionTypeMessage=DeleteMessage;	
				}
				$('#deleteTpScreenOutcomeModal').modal();		
			});			
			
			
		};
		
		
});



