app.controller('AccidentController', function($location,DriverService,VehicleService,$timeout,$log,$q, $scope,SafetyService,$stateParams, CommonService,AccidentService,TaskService, Constants,Upload) {
	if(!$scope.$root.checkAccessRights('showNewAccident')){return;}
	$scope.showAddTOModal = function() 
	{
		$('#addTOModal').modal();
	};
	// initial load all lists and DTOs and scope variable
	var machineCounter = 1;
	var personnelInvolvedCounter=1;
	var toInvolvedCounter=1;
	var createNewAccidentpromptMsg="Submit a new Accident Report before Continuing"
	$scope.machineDTO={ };
	$scope.fileType="";
	$scope.vehicles={};
	$scope.mediumDTO={};
	$scope.task={};
	$scope.accidents=[];
	$scope.accidentDto={};
	$scope.accCollisionDir={};
	$scope.checkboxes = {toRecords:{},allTO:false,personnelRecords:{},allPersonnel:false,machineRecords:{}, allMachine:false,allAccidentStatements: false, accidentStatementsRecords: {},allAccidentPhotograph:false,accidentPhotographRecords:{},allSemantics:false,accidentSemanticsRecords:{} ,allTransponderLogData:false,accidentTransponderLogRecords:{},allFIR:false,FIRs:{},allBOI:false,BOIs:{},allPoliceReport:false,policeReports:{}};
	$scope.conclusionDTO={accidentId:0};
	$scope.missionDTO={accidentId:0};
	$scope.machineDTO={accidentId:0,machineVehicles:[],deleteMachineVehicles:[]};
	$scope.newMachineDTO={civillianVehicleType:{id:0,name:''},machineType:{id:0,name:''}};
	$scope.managementDTO={accidentId:0};
	$scope.causesDTO={accidentId:0,pointErrorsId:[],systemErrorsId:[]};
	$scope.dto={machineVehicles:[],personnelInvolved:[],transportOperatorInvolved:[]};
	$scope.manDTO={accidentId:0,personnelInvolved:[],transportOperatorInvolved:[],toDelete:[],personnelDelete:[]};
	$scope.accInjuries={id:0,name:''};	
	$scope.accCategories={id:0,name:''};	
	$scope.accLocTypes={id:0,name:''};
	$scope.accCollisionDirs={id:0,name:''};
	$scope.accManoevres={id:0,name:''};
	$scope.accCollisionObjs={id:0,name:''};
	$scope.newDTO={accidentReportStatus:"",isNewAccident:false};
	$scope.newAttachmentDTO={fileDescription:""};
	$scope.newAttachmentListDTO={accidentFileIds:[]};
	$scope.newAccidentFileDTO={fileType:""};
	$scope.newAnnexDTO={fileDescription:"",fileType:""};
	// Report Tab methods start line=================================================================================
	var getCivillianVehicleTypePromise=AccidentService.getCivillianVehicleTypes();
	var getCategoryPromise = AccidentService.getAccidentCategories();
	var getAccidentLocationTypesPromise = AccidentService.getAccidentLocationTypes();
	var getAccidentCollisionTypesPromise = AccidentService.getAccidentCollisionTypes();
	var getAccidentManoeuvreType = AccidentService.getAccidentManoeuvreTypes();
	var getAccidentCollisionObject = AccidentService.getAccidentCollisionObject();
	var hubsPromise = CommonService.getHubs();
	var nodesPromise = CommonService.getNodes();
	var getAccidentMachineTypesPromise=AccidentService.getAccidentMachineTypes();
	var getAccidentInjuryDegreesPromise=AccidentService.getAccidentInjuryDegrees();
	var subUnitsPromise = CommonService.getSubunits();
	// load all the option list once page is loaded
	$q.all([ getCategoryPromise, getAccidentLocationTypesPromise,getAccidentCollisionTypesPromise,getAccidentManoeuvreType,	
	         getAccidentCollisionObject, hubsPromise,nodesPromise,getAccidentMachineTypesPromise,getCivillianVehicleTypePromise,getAccidentInjuryDegreesPromise,subUnitsPromise]).then(function(data)
	   {
			$scope.accCategories = data[0];
			$scope.accLocTypes = data[1];
			$scope.accCollisionDirs = data[2]
			$scope.accManoevres = data[3];
			$scope.accCollisionObjs = data[4];
			$scope.hubs = data[5];
			$scope.nodes = data[6];
			$scope.accMachineTypes=data[7];		
			$scope.accCvVehTypes=data[8];
			$scope.accInjuries=data[9];
			$scope.subUnits = data[10];		
	   });
	$scope.saveAccident=function()
	{	
		if(angular.isUndefined($scope.newDTO.locationInfo)||$scope.newDTO.locationInfo=="")
		{
			$scope.$root.infoDialog("Please enter AccidentLocation");	
		}else if(angular.isUndefined($scope.newDTO.accidentDate)||$scope.newDTO.accidentDate=="")
		{
			$scope.$root.infoDialog("Please enter Accident Date");
		}else if(angular.isUndefined($scope.newDTO.categoryId)||$scope.newDTO.categoryId==""){
			$scope.$root.infoDialog("Please Choose Accident Category");
		}else if(angular.isUndefined($scope.newDTO.locationTypeId)||$scope.newDTO.locationTypeId==""){
			$scope.$root.infoDialog("Please Choose Location Type");
		}else
		{
			var getNextAccidentIdPromise=AccidentService.getNextAccidentId($scope.newDTO);
			$q.all([getNextAccidentIdPromise]).then(function(data)
			{
				if(!angular.isUndefined(data[0].id)){
					$scope.newDTO.accidentNo = data[0].accidentNo;
					$scope.newDTO.id=data[0].id;
					$scope.newDTO.accidentNo = data[0].accidentNo;
					$scope.newDTO.id=data[0].id;
					$scope.missionDTO.accidentId=data[0].id;
					$scope.manDTO.accidentId=data[0].id;
					$scope.machineDTO.accidentId=data[0].id;
					$scope.newMachineDTO.accidentId=data[0].id;
					$scope.mediumDTO.accidentId=data[0].id;
					$scope.managementDTO.accidentId=data[0].id;
					$scope.newAccidentFileDTO.accidentId=data[0].id;
					$scope.newAttachmentDTO.accidentId=data[0].id;
					$scope.causesDTO.accidentId=data[0].id;
					$scope.conclusionDTO.accidentId=data[0].id;		
					$scope.newAnnexDTO.accidentId=data[0].id;
					$scope.dto.machineVehicles = [];// Accident Machine Tab
					$scope.dto.personnelInvolved=[];// otherpersonnelinvovled table
					$scope.dto.transportOperatorInvolved=[];// Accident Man
				}
				$scope.newDTO.isNewAccident=true;
				$scope.newDTO.accidentReportStatus=data[0].accidentReportStatus;
				 var saveAccidentPromise=AccidentService.saveAccident($scope.newDTO);
				 $q.all([saveAccidentPromise]).then(function(data) 
				{
					 $scope.$root.infoDialog(data[0]);	 
				 });
			 });
			
		}
	};
	// Report Tab methods start line=================================================================================
	// Mission Tab methods Start line================================================================================
	  $scope.msg="";
	  $scope.taskViewMore=function(){
		  if($scope.task!=null)
			$('#viewTask').modal();
	  };
	  $scope.taskGoToEditTask=function(){
	
		  if($scope.task!=null)
		  {
				$('#viewTask').modal('hide');
				$location.path("/task/8055");
		  }
	  };
	  $scope.getTask=function(taskId)
	  {
			 var getAccidentMissionIndentPromise=AccidentService.getAccidentMissionIndent(taskId);
			$q.all([getAccidentMissionIndentPromise]).then(function(data) 
			{
				if(!angular.isUndefined(data[0]))
					$scope.task=data[0];
				else
					$scope.task=null;		
			});  
	  };	
	  
	  $scope.$watch("missionDTO.taskId", function (newValue, oldValue)
	{
		  if(angular.isUndefined($scope.newDTO.accidentNo) && newValue!=null)
		  {
			  $scope.task=null;
			  $scope.indent=null;
		  }else  if(newValue!=null)
		  {  
			  if(!angular.isUndefined($scope.newDTO.accidentNo) && angular.isNumber($scope.missionDTO.taskId))
				  $scope.getTask(newValue);				  
		  }else
		  {	  
			  $scope.task=null;
			  $scope.indent=null;
		  }	    
	});
		$scope.saveMission=function()
		{
			if(!angular.isUndefined($scope.newDTO.accidentNo))
			{	
				if(angular.isUndefined($scope.missionDTO.taskId)||$scope.missionDTO.taskId==null)
				{
					$scope.$root.infoDialog("Please enter task ID");
				}else if(angular.isUndefined($scope.missionDTO.remarks)&&$scope.missionDTO.missionFlag==Constants.FLAG_NO)
				{
						$scope.$root.infoDialog("Please enter remarks");	
				}else if(angular.isUndefined($scope.missionDTO.missionFlag)||$scope.missionDTO.missionFlag=="")
				{
					$scope.$root.infoDialog("Please choose mission straightforward");			
				}else
				{ 
					if(!angular.isUndefined($scope.newDTO.accidentNo))
					{
						var saveAccidentMissionPromise=AccidentService.saveAccidentMission($scope.missionDTO);
						$q.all([saveAccidentMissionPromise]).then(function(data) 
						{
							$scope.newDTO.accidentReportStatus="Updated";
							$scope.$root.infoDialog(data[0]);
						});
					}else
					{
						$scope.$root.errorDialog(createNewAccidentpromptMsg);
					}	
				}
			}else
			{
				$scope.$root.errorDialog(createNewAccidentpromptMsg);
			}
		};
		// Mission Tab methods Start line ================================================================================
	// Man Tab methods line ================================================================================
		$scope.checkAllTO=function()
		{
			_.each($scope.dto.transportOperatorInvolved, function(record)
			{ 
				$scope.checkboxes.toRecords[record.id] = $scope.checkboxes.allTO;
			});	
		};
		$scope.removeTO= function()
		{
			if(!angular.isUndefined($scope.newDTO.accidentNo))
			{
				var i = $scope.dto.transportOperatorInvolved.length;
				while (i--)
				{
					if ($scope.checkboxes.toRecords[ $scope.dto.transportOperatorInvolved[i].id]) 
					{
		    			$scope.manDTO.toDelete.push($scope.dto.transportOperatorInvolved[i].nricNo);
		    			$scope.dto.transportOperatorInvolved.splice(i, 1);
		    		}
		    	}
		    		if($scope.dto.transportOperatorInvolved.length == 0)
		    		{
		    			$scope.checkboxes = {toRecords:{},allTO:false};
		    			$scope.$root.infoDialog("Please select at least one record.");
		    		}
		    	}else{ 		
		    		$scope.$root.errorDialog(createNewAccidentpromptMsg);
		    	}
		};		

			  
	  $scope.$watch("missionDTO.taskId", function (newValue, oldValue)
	  {	
		  if(newValue!=null && ! angular.isUndefined($scope.newDTO.accidentNo))
			  $scope.getTask(newValue);
		  else 
			 $scope.task=null;	    
	  });	  
	  
		$scope.showAddEditToModal=function(tOId)
		{
			if(!angular.isUndefined($scope.newDTO.accidentNo))
			{
				var toDTO=AccidentService.getToInvolvedDTO($scope.dto.transportOperatorInvolved,tOId!=null?tOId:0);
				if(tOId==null)
				{
					$scope.newToInvolvedDTO={nricNo:"",id:0,toId:null,isAdd:false,injuryId:0,isDisabled:false,restHour:0};	
					toDTO={id:0,nricNoName:"",nricNo:"",restHour:"",injury:null,injuryId:0,psychoFlag:"",accPsyProblemDesc:"",ehrHub:"",ehrNode:"",serviceType:"",permitNo:"",driverPermitsCAT:"",cl3Mileage:"",cl4Mileage:"",mileage:"",accidentId:0,InjuryId:0};
					AccidentService.mapToInvolvedProperties(toDTO,$scope.newToInvolvedDTO);		
					$scope.newToInvolvedDTO={ };
					$scope.newToInvolvedDTO.isAdd=true;
					$scope.newToInvolvedDTO.isDisabled=false;
					$scope.driver="";
					$scope.familiarisations={};
					$scope.proficiencies={};
					$scope.taskDetails={};
					$scope.accidents=[];
				}else
				{
					$scope.driver=toDTO.nricNoName;
					AccidentService.mapToInvolvedProperties(toDTO,$scope.newToInvolvedDTO);
					$scope.newToInvolvedDTO.isAdd=false;
					$scope.newToInvolvedDTO.isDisabled=true;
				}
				$('#addTOModal').modal();
			}else
			{
				$scope.$root.errorDialog(createNewAccidentpromptMsg);	
			}
		};
		
		
		$scope.$watch("newToInvolvedDTO.restHour", function (newValue, oldValue)
		{
			if(!$scope.vaildateField(newValue))
			 {
				if(newValue<0)		 
					$scope.$root.infoDialog("Please enter vaild  transport operator rested hour");	  
			 }    
		});
		$scope.saveToInvolved=function(toInvolved)
		{
			var toDTO=AccidentService.getToInvolvedDTO($scope.dto.transportOperatorInvolved,$scope.newToInvolvedDTO.id);
			var checkDuplicateNric=false;
			_.each($scope.dto.transportOperatorInvolved, function(record) 
			{ 
				if(record.nricNo==toInvolved.nricNo)
					checkDuplicateNric=true;
			});
			
			if(checkDuplicateNric&& !$scope.newToInvolvedDTO.isDisabled)
				$scope.$root.infoDialog("Duplicate  Nric or name entered. Please enter other Nric No or name");
			else if ($scope.vaildateField($scope.newToInvolvedDTO.nricNo))
				$scope.$root.infoDialog("Please enter Nric No or name");
			else if($scope.newToInvolvedDTO.injury==null)
				$scope.$root.infoDialog("Please select injury");
			else if($scope.vaildateField($scope.newToInvolvedDTO.restHour))
				$scope.$root.infoDialog("Please enter  transport operator rested hour");
			else if($scope.newToInvolvedDTO.restHour<0)
				$scope.$root.infoDialog("Please enter vaild  transport operator rested hour");
			else if($scope.newToInvolvedDTO.isAdd)
			{
				$scope.newToInvolvedDTO.nricNoName=$scope.driver;
				$scope.newToInvolvedDTO=toInvolved;
				$scope.newToInvolvedDTO.injuryId=toInvolved.injury.id;
				$scope.newToInvolvedDTO.id=toInvolvedCounter;
				toDTO={id:toInvolvedCounter,nricNoName:"",nricNo:"",restHour:"",injury:null,injuryId:0,psychoFlag:"",accPsyProblemDesc:"",ehrHub:"",ehrNode:"",serviceType:"",permitNo:"",driverPermitsCAT:"",cl3Mileage:"",cl4Mileage:"",mileage:"",accidentId:$scope.newDTO.id,InjuryId:$scope.newToInvolvedDTO.injuryId.id};
				AccidentService.mapToInvolvedProperties($scope.newToInvolvedDTO,toDTO);
				$scope.dto.transportOperatorInvolved.push(toDTO);
				$scope.newToInvolvedDTO={ };
				$scope.driver="";
				$scope.familiarisations={ };
				$scope.proficiencies={ };
				$scope.taskDetails={ };
				$scope.accidents=[];
				toInvolvedCounter++;
			}else{
				AccidentService.mapToInvolvedProperties($scope.newToInvolvedDTO,toDTO);	
			}
		}
		$scope.showAddEditPersonnelModal=function(personnelId)
		{
			if(!angular.isUndefined($scope.newDTO.accidentNo))
			{
				var personnelDTO=AccidentService.getPersonnelInvolvedDTO($scope.dto.personnelInvolved,personnelId!=null?personnelId:0);
				$scope.newPersonnelDTO={isAdd:false,isDisabled:false};
				if(personnelId==null)
				{
					personnelDTO={id:0,accidentId:0,injuryId:0};
					AccidentService.mapPersonnelInvolvedProperties(personnelDTO,$scope.newPersonnelDTO);
					$scope.newPersonnelDTO={ };
					$scope.newPersonnelDTO.isAdd=true;
					$scope.newPersonnelDTO.isDisabled=false;
				}else
				{
					$scope.newPersonnelDTO.accidentId=$scope.newDTO.id;
					$scope.newPersonnelDTO.injuryId=personnelDTO.injury.id;
					AccidentService.mapPersonnelInvolvedProperties(personnelDTO,$scope.newPersonnelDTO);
					$scope.newPersonnelDTO.isAdd=false;
					$scope.newPersonnelDTO.isDisabled=true;
				}
				$('#addPerModal').modal();
			}else{
				$scope.$root.errorDialog(createNewAccidentpromptMsg);
			}
			return false;
		};
		
		$scope.vaildateField=function(field)
		{
			return angular.isUndefined(field)||field==null||field==""?true:false;
		};
		$scope.saveUpdatePersonnelInvolved=function(personnelInvolved)
		{
			var checkDuplicateNric=false;
			_.each($scope.dto.personnelInvolved, function(record) 
			{ 
				if(record.nricNo==personnelInvolved.nricNo)
					checkDuplicateNric=true;
			});
			var personnelDTO=AccidentService.getPersonnelInvolvedDTO($scope.dto.personnelInvolved,$scope.newPersonnelDTO.id);
			if(checkDuplicateNric&&	!$scope.newPersonnelDTO.isDisabled)
				$scope.$root.infoDialog("There is duplicate Nric entered, please enter a another Nric");
			else if($scope.vaildateField($scope.newPersonnelDTO.nricNo))
				$scope.$root.infoDialog("Please enter in Nric");
			else if($scope.vaildateField($scope.newPersonnelDTO.name))
				$scope.$root.infoDialog("Please enter in name");		
			else if($scope.vaildateField($scope.newPersonnelDTO.address))
				$scope.$root.infoDialog("Please enter in address");
			else if($scope.vaildateField($scope.newPersonnelDTO.contactNo))
				$scope.$root.infoDialog("Please enter in contact number");
			else if(angular.isUndefined($scope.newPersonnelDTO.injury))
				$scope.$root.infoDialog("Please select  injury");
			else 
			{			
				if($scope.newPersonnelDTO.isAdd)
				{
					$scope.newPersonnelDTO=personnelInvolved;
					$scope.newPersonnelDTO.accidentId=$scope.newDTO.id;
					$scope.newPersonnelDTO.id=personnelInvolvedCounter;
					$scope.newPersonnelDTO.injuryId=personnelInvolved.injury.id;
					personnelDTO={id:personnelInvolvedCounter,accidentId:$scope.newDTO.id,injuryId:$scope.newPersonnelDTO.injury.id};
					AccidentService.mapPersonnelInvolvedProperties($scope.newPersonnelDTO,personnelDTO);
					$scope.dto.personnelInvolved.push(personnelDTO);
					$scope.newPersonnelDTO={ };
					personnelInvolvedCounter++;
				}else
				{
					AccidentService.mapPersonnelInvolvedProperties($scope.newPersonnelDTO,personnelDTO);
				}
				$('#addPerModal').modal('hide');
			}
		};
		$scope.checkAllPersonnel=function()
		{
			_.each($scope.dto.personnelInvolved, function(record) 
			{ 
				$scope.checkboxes.personnelRecords[record.id] = $scope.checkboxes.allPersonnel;
			});
		}
		 $scope.removePersonnel= function() 
		 {
		    	if(!angular.isUndefined($scope.newDTO.accidentNo)){
		    		var i = $scope.dto.personnelInvolved.length;
		    		while (i--) 
		    		{
		    			if ($scope.checkboxes.personnelRecords[ $scope.dto.personnelInvolved[i].id]) 
		    			{
		    				$scope.manDTO.personnelDelete.push($scope.dto.personnelInvolved[i].nricNo);
		    				$scope.dto.personnelInvolved.splice(i, 1);
		    			}
		    		}
		    		if($scope.dto.personnelInvolved.length == 0)
		    		{
		    			$scope.checkboxes = {personnelRecords:{},allPersonnel:false};
		    			$scope.$root.infoDialog("Please select at least one record.");
		    		}
		    	}else
		    	{
		    		$scope.$root.errorDialog(createNewAccidentpromptMsg);
		    	}
		};
		$scope.$watch('newToInvolvedDTO.nricNo', function (newValue, oldValue, scope)
		{
			if(!angular.isUndefined(newValue))
			{
				$scope.getDriver(newValue);
			}		
		}, true);

		$scope.getDriver=function(nricNo)
		{
			var getDriverPromise=DriverService.getDriver(nricNo);
			var getAccidentDriverPromise= AccidentService.getAccidentDriver(nricNo);
			var getManPastTwoDaysTaskDetailsPromise=AccidentService.getManPastTwoDaysTaskDetails(nricNo);
			$q.all([getDriverPromise,getManPastTwoDaysTaskDetailsPromise,getAccidentDriverPromise]).then(function(data) 
			{	
				$scope.newToInvolvedDTO.ehrHub=data[0].ehrHub;
				$scope.newToInvolvedDTO.ehrNode=data[0].ehrNode;
				$scope.newToInvolvedDTO.serviceType=data[0].serviceType;
				$scope.newToInvolvedDTO.vocation=data[0].vocation;
				$scope.newToInvolvedDTO.permitNo=data[0].permitNo;
				$scope.newToInvolvedDTO.driverPermitsCAT=data[0].driverPermitsCAT;
				$scope.newToInvolvedDTO.cl3Mileage=data[0].cl3Mileage;
				$scope.newToInvolvedDTO.cl4Mileage=data[0].cl4Mileage;
				$scope.newToInvolvedDTO.mileage=data[0].mileage;
				$scope.newToInvolvedDTO.permitNo=data[0].driverPermits[0].permitNo;
				$scope.familiarisations=data[0].driverVehicleFams;
				$scope.proficiencies=data[0].driverProficiencies;
				_.each(data[0].driverPermits, function(driverPermit)
				{ 
					if(driverPermit.permitClasses==data[0].driverPermits[0].permitClasses)
						$scope.newToInvolvedDTO.driverPermitsCAT=driverPermit.permitClasses;
					else
						$scope.newToInvolvedDTO.driverPermitsCAT+=","+driverPermit.permitClasses;	
			});
				$scope.taskDetails=data[1];
				var accidentData=[];
				_.each(data[2], function(record)
				{ 
					var vehicleType="";
					_.each(	record.machineDTO.machineVehicles, function(machine)
					{
						if(record.machineDTO.machineVehicles.length>0){
								if(record.machineDTO.machineVehicles[0].vehicleTypeName==machine.vehicleTypeName)
								vehicleType=machine.vehicleTypeName;
									else
								vehicleType+=", "+machine.vehicleTypeName;
						}
					}); 
			
						accidentData.push({	accidentNo:record.accidentReport.accidentNo,accidentDate:record.accidentReport.accidentDate,vehicleType:vehicleType,safDriverNeglience: angular.isUndefined(record.casusDTO.safDriverNeglience)?"NIL":record.casusDTO.safDriverNeglience=="Y"?FLAG_YES:FLAG_NO});
				});
						
					$scope.accidents=accidentData;				
			});
		};
		$scope.saveAccidentMan=function()
		{
			if(!angular.isUndefined($scope.newDTO.accidentNo))
			{
				if(angular.isUndefined($scope.manDTO.manFlag)||$scope.manDTO.manFlag=="")
					$scope.$root.infoDialog("Please choose if transport operator qualified and fitted");			
				else if($scope.manDTO.manFlag==Constants.FLAG_NO && $scope.manDTO.remarks=="")
					$scope.$root.infoDialog("Please enter remarks");
				else
				{
					$scope.manDTO.transportOperatorInvolved=$scope.dto.transportOperatorInvolved;
					$scope.manDTO.personnelInvolved=$scope.dto.personnelInvolved;
					var saveAccidentManPromise=AccidentService.saveAccidentMan($scope.manDTO);
					$q.all([ saveAccidentManPromise ]).then(function(data) 
					{
						$scope.newDTO.accidentReportStatus="Updated";
						$scope.$root.infoDialog(data[0]);	
					});
					var personnelDeleteIndex =$scope.manDTO.personnelDelete.length;
		    		while (personnelDeleteIndex--) 
		    		{
		    			$scope.manDTO.personnelDelete.splice(personnelDeleteIndex);
		    		}
					var toDeleteIndex = $scope.manDTO.toDelete.length;
		    		while (toDeleteIndex--)
		    		{
		    			$scope.manDTO.toDelete.splice(toDeleteIndex);
		    		}	
				}
			}else
			{
				$scope.$root.errorDialog(createNewAccidentpromptMsg);	
			}
		};
	// Machine tab start
	// Line====================================================================
		$scope.vehicle="";
		$scope.showAddVehicleModal=function(machineId,machinetypeid,civillianVehicleType,militaryVehiclePlateNo,vehicleType)
		{
			$scope.vehicle=null;
			if(!angular.isUndefined($scope.newDTO.accidentNo))
			{
				var machineDTO=AccidentService.getMachinesDTO($scope.dto.machineVehicles ,machineId!=null?machineId:0);
				if(machineId==null)
				{
					$scope.vehicles={ };	
					$scope.newMachineDTO={machineType:{id:0,name:''},machineTypeId:0,isDisabled:false,civillianVehicleTypeId:0,civillianVehicleType:civillianVehicleType,machineType:{id:0,name:''}};
					$scope.newMachineDTO.machineType.id=0;
					machineDTO={machineType:{id:0,name:''},machineTypeId:0,isDisabled:false,civillianVehicleTypeId:0,civillianVehicleType:civillianVehicleType,machineType:{id:0,name:''}};
					AccidentService.mapAccidentMachineProperties($scope.newMachineDTO,machineDTO );
					$scope.newMachineDTO={ };
					$scope.newMachineDTO.isDisabled=false;
					$scope.newMachineDTO.isAdd=true;
				}else{
					if(machinetypeid.id==Constants.MilitaryMachineType)
					{	
						$scope.vehicle=militaryVehiclePlateNo+" ("+vehicleType+")";
						$scope.newMachineDTO={machineType:machinetypeid};
					}
					if(machinetypeid.id==Constants.CivillianMachineType)
					{
						$scope.newMachineDTO={civillianVehicleTypeId:civillianVehicleType.id,civillianVehicleType:civillianVehicleType,machineType:machinetypeid};
					}

					AccidentService.mapAccidentMachineProperties(machineDTO,$scope.newMachineDTO);
					$scope.newMachineDTO.isDisabled=true;
					$scope.newMachineDTO.isAdd=false;
				}
				$('#addVehModal').modal();
			}else
			{
				$scope.$root.errorDialog(createNewAccidentpromptMsg);
			}
			return false;
		};
		$scope.checkMachineVehicleAll = function()
		{
			_.each($scope.dto.machineVehicles, function(record) 
			{ 
				$scope.checkboxes.machineRecords[record.id] = $scope.checkboxes.allMachine;
			});
		};
	    $scope.removeMachine= function()
	    {
	    	if(!angular.isUndefined($scope.newDTO.accidentNo))
	    	{
	    		var i = $scope.dto.machineVehicles.length;
	    		while (i--)
	    		{
	    			if ($scope.checkboxes.machineRecords[$scope.dto.machineVehicles[i].id]) 
	    			{
	    				$scope.machineDTO.deleteMachineVehicles.push($scope.dto.machineVehicles[i]);
	    				$scope.dto.machineVehicles.splice(i, 1);
	    			}
	    		}
	    		if($scope.dto.machineVehicles.length == 0)
	    		{
	    			$scope.checkboxes = {machineRecords:{},allMachine:false};
	    		}
	    	}else
	    	{
	    		$scope.$root.errorDialog(createNewAccidentpromptMsg);
	    	}
		};
		$scope.saveAndUpdateMachine=function(machineDTo)
		{
			var checkMiliaryOptionIsVaild=false;
			var checkCivillianOptionIsVaild=false;
			if($scope.newMachineDTO.machineType.id==Constants.MilitaryMachineType)
			{
				if ($scope.newMachineDTO.vehiclePlateNo=="")
				{
					checkMiliaryOptionIsVaild=false;
					$scope.$root.infoDialog("Please enter military vehicle number");
				}else if($scope.newMachineDTO.militaryVehiclePlateNo==null)
				{
					checkMiliaryOptionIsVaild=false;
					$scope.$root.infoDialog("Please Enter military vehicle Number");
				}else if ($scope.newMachineDTO.bocConducted==null||$scope.newMachineDTO.bocConducted=="")
				{
					checkMiliaryOptionIsVaild=false;
					$scope.$root.infoDialog("Please choose BOC conducted option");
				}else
				{
					checkMiliaryOptionIsVaild=true;
				}
			}
			if ($scope.newMachineDTO.machineType.id==Constants.CivillianMachineType)
			{
				if($scope.newMachineDTO.civillianVehiclePlateNo==null||$scope.newMachineDTO.civillianVehiclePlateNo=="")
				{
					checkCivillianOptionIsVaild=false;
					$scope.$root.infoDialog("Please Enter civillian vehicle number");		
					
				}else if ($scope.newMachineDTO.civillianVehicleType==null)
				{
					checkCivillianOptionIsVaild=false;
					$scope.$root.infoDialog("Please choose vehicle type");	
				}else
				{
					checkCivillianOptionIsVaild=true;
				}
			}
			var checkDulipcateVehicle=false;
			var vehicleNumber="";
			switch ($scope.newMachineDTO.machineType.id){
				case Constants.MilitaryMachineType:
					vehicleNumber=$scope.newMachineDTO.militaryVehiclePlateNo;
					break;
				case Constants.CivillianMachineType:
					vehicleNumber=$scope.newMachineDTO.civillianVehiclePlateNo;
					break;
				default: 
					vehicleNumber="";
					break;
			
			}
			_.each($scope.dto.machineVehicles, function(record) {
				if(record.militaryVehiclePlateNo==vehicleNumber)
					checkDulipcateVehicle=true;
				else if(record.civillianVehiclePlateNo==vehicleNumber)
					checkDulipcateVehicle=true;
				else 
					checkDulipcateVehicle=false;
			});
			if(checkDulipcateVehicle && $scope.newMachineDTO.isAdd)
				$scope.$root.infoDialog("Duplicate Vehicle Entered, Please enter correct Number");
			else if(checkMiliaryOptionIsVaild || checkCivillianOptionIsVaild)
			{	
				var machineDTO=AccidentService.getMachinesDTO($scope.dto.machineVehicles,$scope.newMachineDTO.id);
				if($scope.newMachineDTO.isAdd)
				{
					$scope.newMachineDTO.id=$scope.dto.machineVehicles.length+1;
					$scope.newMachineDTO.machineTypeId=$scope.newMachineDTO.machineType.id;
					machineDTO={id:0,machineTypeId:0};
					AccidentService.mapAccidentMachineProperties($scope.newMachineDTO,machineDTO);
					$scope.dto.machineVehicles.push(machineDTO);
					$scope.newMachineDTO={};
					$scope.newMachineDTO={machineType:{id:Constants.MilitaryMachineType}};
					$scope.vehicle="";
					$scope.vehicles={ };
				}else
				{
					if(!angular.isUndefined(machineDTo.civillianVehicleType)&&machineDTo.machineType.id==Constants.CivillianMachineType)
						$scope.newMachineDTO={civillianVehicleType:machineDTo.civillianVehicleType,civillianVehicleTypeId:machineDTo.civillianVehicleType.id,vehicleType:null,latestPmStartDate:null,aviDueDate:null,militaryVehiclePlateNo:null};
					AccidentService.mapAccidentMachineProperties($scope.newMachineDTO,machineDTO);
					$scope.newMachineDTO={};		
					$scope.vehicles={ };	
				}
			}
		};
		$scope.$watch('newMachineDTO.militaryVehiclePlateNo', function (newValue, oldValue, scope)
		{
			if(!angular.isUndefined(newValue))
			{
				if(newValue!=null)
					$scope.getVehicle(newValue);		
				
			}
		}, true);
		$scope.getVehicle=function(militaryVehiclePlateNo){
			var getVehiclePromise=VehicleService.getVehicle(militaryVehiclePlateNo);
			$q.all([getVehiclePromise]).then(function(data) 
			  {	
				if(data[0]!=null)
				{
					$scope.vehicles=data[0];
					$scope.newMachineDTO.vehicleType=data[0].vehicleType;
					$scope.newMachineDTO.latestPmStartDate=data[0].latestPmStartDate;
					$scope.newMachineDTO.aviDueDate=data[0].aviDueDate;
				}
			});
		};
		
			$scope.saveMachine=function()
		{
			if(!angular.isUndefined($scope.newDTO.accidentNo))
			{
				if(angular.isUndefined($scope.machineDTO.machineFlag)||$scope.machineDTO.machineFlag=="")
					$scope.$root.infoDialog("Please choose if vehicle is serviceable and roadworthy");
				else if ($scope.machineDTO.machineFlag==Constants.FLAG_NO && angular.isUndefined($scope.machineDTO.remarks))	
					$scope.$root.infoDialog("Please enter remarks");	
				else
				{
					$scope.machineDTO.machineVehicles=$scope.dto.machineVehicles;
					var saveAccidentMachinePromose=AccidentService.saveAccidentMachine($scope.machineDTO);
					 $q.all([saveAccidentMachinePromose]).then(function(data) 
					{
						$scope.newDTO.accidentReportStatus="Updated";
						 $scope.$root.infoDialog(data[0]);	 
							$scope.machineDTO.deleteMachineVehicles=[];
					});
					
				}
			}else
			{
				$scope.$root.errorDialog(createNewAccidentpromptMsg);
			}	
		};
	// Machinetab End Line====================================================================
	// Medium Start line=======================================================================================
		var getAccidentWeathersPromise=AccidentService.getAccidentWeathers();
		var getAccidentVisbilitiesPromise=AccidentService.getAccidentVisibilities();
		var getAccidentRoadSurfacesPromise=AccidentService.getAccidentRoadSurfaces();
		var getAccidentRoadFeaturesPromise=AccidentService.getAccidentRoadFeatures();
		var getAccidentRoadTypesPromise=AccidentService.getAccidentRoadTypes();
		var getAccidentSpeedLimitsPromise=AccidentService.getAccidentSpeedLimits();
		var getAccidentTrafficVolumesPromise =AccidentService.getAccidentTrafficVolumes();
		var getAccidentPointErrorPromise=AccidentService.getAccidentPointErrors();
		var getAccidentSystemErrorsPromise=AccidentService.getAccidentSystemErrors();
		
		$q.all([ getAccidentWeathersPromise ,getAccidentVisbilitiesPromise,getAccidentRoadSurfacesPromise, getAccidentRoadFeaturesPromise,getAccidentRoadTypesPromise,getAccidentSpeedLimitsPromise ,getAccidentTrafficVolumesPromise,getAccidentPointErrorPromise,getAccidentSystemErrorsPromise]).then(function(data) 
		 {
		      $scope.accWeathers=data[0];
		      $scope.accVisibilities=data[1];
		      $scope.accRoadSurfaces=data[2];
		      $scope.accRoadFeatures=data[3];
		      $scope.accRoadTypes=data[4];
		      $scope.accSpeedLimits=data[5];
		      $scope.accTrafficVolumes=data[6];
		      $scope.accPointErrors=data[7];
		      $scope.accSystemErrors=data[8];			
		});
		$scope.saveMedium=function()
		{
			if(!angular.isUndefined($scope.newDTO.accidentNo)){
				if(angular.isUndefined($scope.mediumDTO.mediumFlag)||$scope.mediumDTO.mediumFlag=="")
					$scope.$root.infoDialog("Please choose contributing factor");	
				else if (!angular.isUndefined($scope.mediumDTO.mediumFlag)&&$scope.mediumDTO.mediumFlag==Constants.FLAG_YES&&angular.isUndefined($scope.mediumDTO.medFlagRemarks))
					$scope.$root.infoDialog("Please enter contributing factor remarks");	
				else
				{
					var accidentServiceSavePromise=AccidentService.saveAccidentMedium($scope.mediumDTO);
						$q.all([accidentServiceSavePromise]).then(function(data) 
						{
							$scope.newDTO.accidentReportStatus="Updated";
							$scope.$root.infoDialog(data[0]);		
						});
				}	
			}	else
			{
				$scope.$root.errorDialog(createNewAccidentpromptMsg);	
			}	
	};	
	// Medium tab End line=========================================================================================  
	// Management Tab start line==============================================================================
		$scope.saveManagement=function()
		{
			if(!angular.isUndefined($scope.newDTO.accidentNo))
			{	
				var checkAuthorizedIsValid=false;
				var checkBriefingIsValid=false;
				var checkVehComIsValid=false;
				var checkFindingIsValid=false;
				
				 if(angular.isUndefined($scope.managementDTO.authorizedFlag)||$scope.managementDTO.authorizedFlag=="")
				{	
					 checkAuthorizedIsValid=false;
						 $scope.$root.infoDialog("Please choose if detail is authorized");				
				}else
				{
					 if($scope.managementDTO.authorizedFlag==Constants.FLAG_YES)
						{
							if(angular.isUndefined($scope.managementDTO.mtRacBy))
							{
								 checkAuthorizedIsValid=false;
								$scope.$root.infoDialog("Please enter MT RAC signed by");
							}else{
								 checkAuthorizedIsValid=true;
							}
						}else{
							 checkAuthorizedIsValid=true;
						}
				}
				 if(angular.isUndefined($scope.managementDTO.safetyBriefFlag)||$scope.managementDTO.safetyBriefFlag=="")
				 {
					 checkBriefingIsValid=false;
						$scope.$root.infoDialog("Please choose if there is road safety briefing");
					}else
					{
						if($scope.managementDTO.safetyBriefFlag==Constants.FLAG_YES )
						{
							if(angular.isUndefined($scope.managementDTO.safetyBriefBy))
							{		
								checkBriefingIsValid=false;
								$scope.$root.infoDialog("Please enter briefing done by");
							}else if(angular.isUndefined($scope.managementDTO.safetyBriefDate))
							{
								 checkBriefingIsValid=false;
								$scope.$root.infoDialog("Please choose briefing done date");			
							}else
							{		 
								checkBriefingIsValid=true;
							}
						}else
						{
							checkBriefingIsValid=true;	
						}		
					}
				 if(angular.isUndefined($scope.managementDTO.vehicleCommanderFlag)||$scope.managementDTO.vehicleCommanderFlag=="")
					{
					 checkVehComIsValid=false;
						$scope.$root.infoDialog("Please choose if there is vehicle commander");
					}else
					{
						if($scope.managementDTO.vehicleCommanderFlag==Constants.FLAG_YES )
						{
							if(angular.isUndefined($scope.managementDTO.vehicleCommanderNameNRIC))
							{
								 checkVehComIsValid=false;
								$scope.$root.infoDialog("Please enter vehicle commander name or Nric");
							} else if(angular.isUndefined($scope.managementDTO.vehicleCommanderContactNumber) || $scope.managementDTO.vehicleCommanderContactNumber=="")
							{
								 checkVehComIsValid=false;
								$scope.$root.infoDialog("Please enter vehicle commander's contact number");
							}else if(angular.isUndefined($scope.managementDTO.vehicleCommanderUnitCode))
							{
								 checkVehComIsValid=false;
								$scope.$root.infoDialog("Please enter vehicle commander's unit name or unit code");
							}else
							{	
								 checkVehComIsValid=true;
							}
						}else
						{
							 checkVehComIsValid=true;	
						}
					}
				 	if(angular.isUndefined($scope.managementDTO.managementFlag) || $scope.managementDTO.managementFlag=="")
					{
				 		checkFindingIsValid=false;
						$scope.$root.infoDialog("Please choose management contribute factor");
					}else if(!angular.isUndefined($scope.managementDTO.managementFlag)&&$scope.managementDTO.managementFlag==Constants.FLAG_YES)
					{
						if(angular.isUndefined($scope.managementDTO.managementFlagRemarks)){
							$scope.$root.infoDialog("Please enter management contribute factor remarks");
							checkFindingIsValid=false;
						}else{
							checkFindingIsValid=true;
						}
					}else{
						checkFindingIsValid=true;
					}
				 if(checkAuthorizedIsValid && checkBriefingIsValid && checkVehComIsValid && checkFindingIsValid)
				 {
					if(!angular.isUndefined($scope.newDTO.accidentNo))
					{
						var  saveManagementPromise=AccidentService.saveAccidentManagement($scope.managementDTO);
						$q.all([saveManagementPromise]).then(function(data)
						{
							$scope.newDTO.accidentReportStatus="Updated";
							$scope.$root.infoDialog(data[0]);
						});
					}else
					{
						$scope.$root.errorDialog(createNewAccidentpromptMsg);
					}				
				}
			}else
			{
				$scope.$root.errorDialog(createNewAccidentpromptMsg);
			}	
		};
	// Management Tab End line ==============================================================================
	// Attachment tab start line================================================================
		$scope.checkAllAccidentStatements = function() 
		{
			_.each($scope.accidentStatements, function(accidentStatement) {
				$scope.checkboxes.accidentStatementsRecords[accidentStatement.accidentFileId] = $scope.checkboxes.allAccidentStatements;		
			});
		};
		$scope.showUploadStatementModal = function() {
		
			$scope.showModalAndDialog(Constants.STATEMENT);
		};
		$scope.deleteStatementFile = function() 
		{
			$scope.deleteAttachmentFiles(Constants.STATEMENT);
		}
		$scope.deleteAttachmentFiles = function(fileType) 
		{
			// for eachCategory get the Id of the file then store in the data variable
			// The id of the file is get from when on the UI , the check box are checked then press the deleted button
	 		if(!angular.isUndefined($scope.newDTO.accidentNo)){
				var data=[];
				switch(fileType){
					case Constants.STATEMENT:
						_.each($scope.accidentStatements, function(accidentStatement) 
							{
								if($scope.checkboxes.accidentStatementsRecords[accidentStatement.accidentFileId])
									data.push(accidentStatement.accidentFileId);	
						});		
						break;
					case Constants.ACCIDENTPHOTOGRAPHS:
						_.each($scope.accidentPhotographs, function(accidentPhotograph) 
							{
								if($scope.checkboxes.accidentPhotographRecords[accidentPhotograph.accidentFileId])
									data.push(accidentPhotograph.accidentFileId);
							
						});
						break;
					case Constants.SEMANTICS:
						_.each($scope.accidentSemanticss, function(accidentSemantics) 
							{
							
							if($scope.checkboxes.accidentSemanticsRecords[accidentSemantics.accidentFileId])
								data.push(accidentSemantics.accidentFileId);
							
							
						});
						break;
					case Constants.TRANSPONDERLOGFILE:
						_.each($scope.accidentTransponderLogs, function(accidentTransponderLog) {
							
							if($scope.checkboxes.accidentTransponderLogRecords[accidentTransponderLog.accidentFileId])
								data.push(accidentTransponderLog.accidentFileId);
						});
						break;
				}
				
				$scope.newAttachmentListDTO.accidentFileIds=data; 
				$scope.newAttachmentListDTO.fileType=fileType;
				if($scope.newAttachmentListDTO.accidentFileIds.length==0){
					$scope.$root.infoDialog('Please select at least one record.');
					}else{
						var deleteAccidentFilePromise=AccidentService.deleteAccidentFile($scope.newAttachmentListDTO) ;
						$q.all([deleteAccidentFilePromise]).then(function(data)
						{
							$scope.$root.infoDialog(data[0]);
							switch(fileType)
							{
								case Constants.STATEMENT:
									$scope.loadUploadedStatementFile();
									$scope.checkboxes.allAccidentStatements=false;
									break;
								case Constants.ACCIDENTPHOTOGRAPHS:
									$scope.loadUploadedAccidentPhotographFile();
									$scope.checkboxes.allAccidentPhotograph=false;
									break;
								case Constants.SEMANTICS:
									$scope.loadUploadedAccidentSemanticsFile();
									$scope.checkboxes.allSemantics=false;
									break;
								case Constants.TRANSPONDERLOGFILE:
									$scope.loadUploadedAccidentTransponderLogFile();
									$scope.checkboxes.allTransponderLogData=false;
									break;			
							}
						});
					}
			}else
			{
				$scope.$root.errorDialog(createNewAccidentpromptMsg);
			}		
		};
		$scope.showuUploadAccidentPhotographsModal = function() {
		
			$scope.showModalAndDialog(Constants.ACCIDENTPHOTOGRAPHS);
		};
	
		$scope.checkAllAccidentPhotoGraphFile=function(){
			_.each($scope.accidentPhotographs, function(accidentPhotograph) 
			{
				$scope.checkboxes.accidentPhotographRecords[accidentPhotograph.accidentFileId] = $scope.checkboxes.allAccidentPhotograph;
			});
		}
		$scope.deleteAccidentPhotographFile = function() 
		{
				$scope.deleteAttachmentFiles(Constants.ACCIDENTPHOTOGRAPHS);		
		};
		$scope.showUploadSemanticsModal = function() {
			$scope.showModalAndDialog(Constants.SEMANTICS);
		};
		$scope.checkAllAccidentSemantics=function(){
			_.each($scope.accidentSemanticss, function(accidentSemantics) 
			{
				$scope.checkboxes.accidentSemanticsRecords[accidentSemantics.accidentFileId] = $scope.checkboxes.allSemantics;
			});
		};
		$scope.deleteSemanticsFile = function() 
		{
			$scope.deleteAttachmentFiles(Constants.SEMANTICS);
		};
	
		$scope.allTransponderLogData=function(){
			_.each($scope.accidentTransponderLogs, function(accidentTransponderLog) {
				$scope.checkboxes.accidentTransponderLogRecords[accidentTransponderLog.accidentFileId] = $scope.checkboxes.allTransponderLogData;
			});
		};
		$scope.deleteTransponderLogData = function() 
		{
			$scope.deleteAttachmentFiles(Constants.TRANSPONDERLOGFILE);
		};
		$scope.uploadTransponderLog = function() {
			$scope.showModalAndDialog(Constants.TRANSPONDERLOGFILE);
		};
		$scope.loadUploadedAccidentTransponderLogFile = function() {
			$scope.loadAttachement(Constants.TRANSPONDERLOGFILE);
		};
		$scope.loadUploadedAccidentSemanticsFile = function() {
			$scope.loadAttachement(Constants.SEMANTICS);
		};
		$scope.loadUploadedAccidentPhotographFile = function() {
	
			$scope.loadAttachement(Constants.ACCIDENTPHOTOGRAPHS);
		};
		$scope.loadUploadedStatementFile = function() {
			$scope.loadAttachement(Constants.STATEMENT);
		};
		$scope.loadAttachement = function(fileType) 
			{
			$scope.newAccidentFileDTO.fileType=fileType;
			var getAccidentStatementFilePromise= AccidentService.getAccidentStatementFile($scope.newAccidentFileDTO);
			$q.all([getAccidentStatementFilePromise	]).then(function(data) {
				switch(fileType)
				{
					case Constants.STATEMENT:
						$scope.accidentStatements=data[0];
						break;
					case Constants.ACCIDENTPHOTOGRAPHS:
						$scope.accidentPhotographs=data[0];
						break;
					case Constants.SEMANTICS:
						$scope.accidentSemanticss=data[0];
						break;
					case Constants.TRANSPONDERLOGFILE:
						$scope.accidentTransponderLogs=data[0];
						break;
				}
			});
		};
		$scope.showModalAndDialog=function(filetype){
			
			$scope.newAttachmentDTO.fileDescription = "";
			if(!angular.isUndefined($scope.newDTO.id))
			{		
				$scope.newAttachmentDTO.fileType=filetype;
				$scope.fileType=filetype.replace("_"," ").replace("_"," ");
			}
			if(!angular.isUndefined($scope.newAttachmentDTO.accidentId))
			{
				$('#addFileModal').modal();
			}else
			{
				$scope.$root.errorDialog(createNewAccidentpromptMsg);		
			}
	
		};
	
		$scope.uploadFile = function(file, errFiles)
		{
			$scope.newAttachmentDTO.accidentId = $scope.newDTO.id;
		
			if (file)
			{
				if((file.size/1000)>Constants.UPLOAD_MAX_FILE_SIZE){
					$scope.$root.infoDialog(file.name+" File Size Exceeded.");	
				}else{
				
					file.upload = Upload.upload(
					{
						url : Constants.BASE_URL + "/accident/saveOrUpdateAccidentFile",
						method : 'POST',
						headers: { authorization: $scope.$root.session.token },
						enctype: 'multipart/form-data',
						processData: false,
					   contentType: false,
					   data :
					   {	file : file,headers: { authorization: $scope.$root.session.token }, 
						   accidentId : $scope.newDTO.id, accidentNumber:$scope.newDTO.accidentNo,
						   fileDescription : $scope.newAttachmentDTO.fileDescription,
						   fileType:$scope.newAttachmentDTO.fileType
					   
						}
					});
					file.upload.then(function(response) 
					{
						$timeout(function() 
						{
							$scope.newAttachmentDTO.fileDescription = "";
							if (response.data === 'error') 
							{
								$scope.$root.infoDialog($scope.newAttachmentDTO.fileType+" File  fail to upload!");
							} else 
							{
								$scope.$root.infoDialog($scope.newAttachmentDTO.fileType.replace("_"," ").replace("_"," ")+" "+response.data );					
								switch($scope.newAttachmentDTO.fileType)
								{
								case Constants.STATEMENT:
									$scope.loadUploadedStatementFile();
									break;
								case Constants.ACCIDENTPHOTOGRAPHS:
									$scope.loadUploadedAccidentPhotographFile();
									break;
								case Constants.SEMANTICS:
									$scope.loadUploadedAccidentSemanticsFile();
									break;
								case Constants.TRANSPONDERLOGFILE:
									$scope.loadUploadedAccidentTransponderLogFile();
									break;
								}										
							}
						});
					});	
				
				}
			}
		};

// Attachment Tab end line==============================================================
// Annex Tab start line================================================================		
		$scope.checkAllFIR=function(){
			_.each($scope.FIRs, function(FIR) 
			{
				$scope.checkboxes.FIRs[FIR.accidentFileId]=$scope.checkboxes.allFIR;	
			});
		};
		$scope.uploadFIR = function() 
		{
			$scope.showAnnexUploadFile(Constants.FIR);
		};
		$scope.deleteFirFile = function() {
			$scope.deleteAnnexFile(Constants.FIR);
		};
		$scope.deleteAnnexFile = function(fileType) 
		{
				var data=[];
				switch(fileType){
					case Constants.FIR:
						_.each($scope.FIRs, function(FIR)
							{
							if($scope.checkboxes.FIRs[FIR.accidentFileId])
								data.push(FIR.accidentFileId);
							
						});
						break;
					case Constants.BOI:
						_.each($scope.BOIs, function(boi) {
							if($scope.checkboxes.BOIs[boi.accidentFileId])
								data.push(boi.accidentFileId);
						});
						break;
					case Constants.POLICEREPORT :
						_.each($scope.policeReports, function(policeReport) {
							
							if($scope.checkboxes.policeReports[policeReport.accidentFileId])
								data.push(policeReport.accidentFileId);	
						});
						break;
					default:
							data=[];
							break;
				}
				$scope.newAnnexDTO.accidentFileIds=data; 
				$scope.newAnnexDTO.fileType=fileType;
				if(!angular.isUndefined($scope.newDTO.accidentNo))
				{
					if($scope.newAnnexDTO.accidentFileIds.length==0)
					{
						$scope.$root.infoDialog('Please select at least one record.');
					}else
					{
						var deleteAccidentFilePromise=AccidentService.deleteAccidentFile($scope.newAnnexDTO) ;
						$q.all([deleteAccidentFilePromise]).then(function(data) 
						{
							$scope.$root.infoDialog(data[0]);
							switch(fileType)
							{
								case Constants.FIR:
									$scope.loadUploadedAccidentFirFile();
									$scope.checkboxes.allFIR=false;
									break;
								case Constants.BOI:
									$scope.loadUploadedAccidentBOIFile();
									$scope.checkboxes.allBOI=false;
									break;
								case Constants.POLICEREPORT :
									$scope.loadUploadedAccidentPoliceReportFile();
									$scope.checkboxes.allPoliceReport=false;
									break;
								}
						   });
					}
				}else{
					$scope.$root.errorDialog(createNewAccidentpromptMsg);
				}
			};
			
		$scope.checkAllBOI=function(){
			_.each($scope.BOIs, function(boi) {
					$scope.checkboxes.BOIs[boi.accidentFileId]=$scope.checkboxes.allBOI;			
			});
		};
		$scope.uploadBOI = function() {
				$scope.showAnnexUploadFile(Constants.BOI);
			};
			
		$scope.deleteBoiFile = function() 
		{
			$scope.deleteAnnexFile(Constants.BOI);		
		};
		
		$scope.deletePoliceReport= function() 
		{
			$scope.deleteAnnexFile(Constants.POLICEREPORT);	
		};
		$scope.checkAllpoliceReport=function()
		{
			_.each($scope.policeReports, function(policeReport) 
			{
				$scope.checkboxes.policeReports[policeReport.accidentFileId]=$scope.checkboxes.allPoliceReport;
			});
				
		};
		$scope.uploadPoliceReport = function() {
			$scope.showAnnexUploadFile(Constants.POLICEREPORT);
		};
// Annex Tab Common Methods
		$scope.showAnnexUploadFile=function(filetype){
			
				if(!angular.isUndefined($scope.newAnnexDTO.accidentId))
				{	
					$scope.newAnnexDTO.fileDescription="";
					$scope.newAnnexDTO.fileType=filetype;
					$scope.AnnexFileType=filetype.replace("_"," ").replace("_"," ");
					$('#addAnnexFileModal').modal();
				}else
				{
					$scope.$root.errorDialog(createNewAccidentpromptMsg);	
				}
			};
		$scope.uploadAnnexFile = function(file, errFiles) {
			if (file) {
				if((file.size/1000)>Constants.UPLOAD_MAX_FILE_SIZE){
					$scope.$root.infoDialog(file.name+" File Size Exceeded.");	
				}else{
					file.upload = Upload.upload(
							{
								url : Constants.BASE_URL + "/accident/saveOrUpdateAccidentFile",
								method : 'POST',
								headers: { authorization: $scope.$root.session.token },
								enctype: 'multipart/form-data',
								processData: false,
								contentType: false,
								data : {file : file, accidentId : $scope.newDTO.id,accidentNumber:$scope.newDTO.accidentNo, fileDescription : $scope.newAnnexDTO.fileDescription, fileType:$scope.newAnnexDTO.fileType }
										});
					file.upload.then(function(response)
					{
						$timeout(function() {
							$scope.newAnnexDTO.fileDescription = "";
							if (response.data === 'error')
							{
								$scope.$root.infoDialog($scope.newAnnexDTO.fileType+" File  fail to upload!");
							} else {
								$scope.$root.infoDialog($scope.newAnnexDTO.fileType.replace("_"," ").replace("_"," ")+" "+response.data);
								switch($scope.newAnnexDTO.fileType)
								{
									case Constants.FIR:
										$scope.loadUploadedAccidentFirFile();
										break;
									case Constants.BOI:
										$scope.loadUploadedAccidentBOIFile();
										break;
									case Constants.POLICEREPORT:
										$scope.loadUploadedAccidentPoliceReportFile();
										break;
									}
								}
							});
						});
					}
				}
			};				
		$scope.showAnnexModalAndDialog=function(filetype)
		{
			$scope.newAnnexDTO.fileDescription = "";
			if(!angular.isUndefined($scope.newDTO.id))
			{	
				$scope.newAnnexDTO.fileType=filetype;
				$scope.fileType=filetype.replace("_"," ").replace("_"," ");
			}
			if(!angular.isUndefined($scope.newAnnexDTO.accidentId))
			{
				$('#addAnnexFileModal').modal();
			}else
			{
				$scope.$root.infoDialog(createNewAccidentpromptMsg);
			}
		};
		$scope.loadAnnexFile = function(fileType) {
			$scope.newAnnexDTO.accidentId=$scope.newDTO.id;
			$scope.newAnnexDTO.fileType=fileType;
			var getFIRPromise= AccidentService.getAccidentStatementFile($scope.newAnnexDTO);
					$q.all([getFIRPromise]).then(function(data) {
						switch(fileType)
						{
							case Constants.FIR:
								$scope.FIRs=data[0];
								break;
							case Constants.BOI:
								$scope.BOIs=data[0];
								break;
							case Constants.POLICEREPORT:
								$scope.policeReports=data[0];
								break;
						}		
					});
		};					
		$scope.loadUploadedAccidentFirFile = function()
		{
			$scope.loadAnnexFile(Constants.FIR);
			};	
		$scope.loadUploadedAccidentBOIFile = function()
		{
			$scope.loadAnnexFile(Constants.BOI);
			};	
		$scope.loadUploadedAccidentPoliceReportFile = function()
		{
				$scope.loadAnnexFile(Constants.POLICEREPORT);
		};	
		// Causes Tab Start Line
		$scope.saveAccidentCauses=function()
		{
			if(!angular.isUndefined($scope.newDTO.accidentNo))
			{
				if(angular.isUndefined($scope.causesDTO.vehicleCommanderNeglience)||$scope.causesDTO.vehicleCommanderNeglience=="")
					$scope.$root.infoDialog("Please Choose Vehicle Commander Negligent");
				else if (angular.isUndefined($scope.causesDTO.safDriverNeglience)||$scope.causesDTO.safDriverNeglience=="")
			
					$scope.$root.infoDialog("Please Choose SAF Transport Operator Negligent");
				else if (angular.isUndefined($scope.causesDTO.groundControllerNeglience)||$scope.causesDTO.groundControllerNeglience=="")
				
					$scope.$root.infoDialog("Please Choose Ground Commander Negligent");	
				else if(angular.isUndefined($scope.causesDTO.nonSafTransportOperatorsNeglience)||$scope.causesDTO.nonSafTransportOperatorsNeglience=="")
					$scope.$root.infoDialog("Please Choose Non-SAF Transport Operator Negligent");		
				else 
				{
					var  saveManagementPromise=AccidentService.saveAccidentCauses($scope.causesDTO);
					$q.all([saveManagementPromise]).then(function(data)
					{
						$scope.$root.infoDialog(data[0]);
					});		
				}
			}else
			{
				$scope.$root.infoDialog(createNewAccidentpromptMsg);		
			}
		};
		// Causes Tab End Line
		// Conclusion Tab start line===============================================
		$scope.saveAccidentConculsion=function()
		{
			if(!angular.isUndefined($scope.newDTO.accidentNo))
			{
				var  saveAccidentConclusionPromise=AccidentService.saveAccidentConclusion($scope.conclusionDTO);
				$q.all([saveAccidentConclusionPromise]).then(function(data) 
				{
					$scope.newDTO.accidentReportStatus="Updated";
					$scope.$root.infoDialog(data[0]);
				});
			}else
			{
				$scope.$root.infoDialog(createNewAccidentpromptMsg);
			}
		}
		// Conclusion Tab End line===============================================
		$scope.reset = function() {
			$scope.newDTO.unit = "";
			$scope.driver = "";
		};
});	


app.controller('AccidentSearchController', function($q, $scope,$filter,AccidentService, CommonService, Constants) {
	if(!$scope.$root.checkAccessRights('showSearchAccidents')){return;}
	var getCivillianVehicleTypePromise=AccidentService.getCivillianVehicleTypes();
	var getCategoryPromise = AccidentService.getAccidentCategories();
	var getAccidentLocationTypesPromise = AccidentService.getAccidentLocationTypes();
	var getAccidentCollisionTypesPromise = AccidentService.getAccidentCollisionTypes();
	var getAccidentManoeuvreType = AccidentService.getAccidentManoeuvreTypes();
	var getAccidentCollisionObject = AccidentService.getAccidentCollisionObject();
	var hubsPromise = CommonService.getHubs();
	var nodesPromise = CommonService.getNodes();
	var getAccidentMachineTypesPromise=AccidentService.getAccidentMachineTypes();
	var getAccidentInjuryDegreesPromise=AccidentService.getAccidentInjuryDegrees();
	var subUnitsPromise = CommonService.getSubunits();
	var getActivityTypesPromises=CommonService.getActivityTypes();
	var taskStatusesPromise = CommonService.getStatuses("TASK");
	var indentStatusesPromise = CommonService.getStatuses("INDENT");
	var permitClassesPromise = CommonService.getPermitClasses();
	var vehicleTypesPromise = CommonService.getVehicleTypes();
	var getAccidentWeathersPromise=AccidentService.getAccidentWeathers();
	var getAccidentVisbilitiesPromise=AccidentService.getAccidentVisibilities();
	var getAccidentRoadSurfacesPromise=AccidentService.getAccidentRoadSurfaces();
	var getAccidentRoadFeaturesPromise=AccidentService.getAccidentRoadFeatures();
	var getAccidentRoadTypesPromise=AccidentService.getAccidentRoadTypes();
	var getAccidentSpeedLimitsPromise=AccidentService.getAccidentSpeedLimits();
	var getAccidentTrafficVolumesPromise = AccidentService.getAccidentTrafficVolumes();
	var getAccidentPointErrorPromise=AccidentService.getAccidentPointErrors();
	var getAccidentSystemErrorsPromise=AccidentService.getAccidentSystemErrors();
	var getAccidentManoeuvreTypesPromise=AccidentService.getAccidentManoeuvreTypes();
	$scope.tab = 'report';
	$scope.advSearchCollapsed = true;
	$scope.searchDTO = { startIndex:0, pageSize:Constants.PAGE_SIZE };
	$scope.checkboxes = { all: false, records: {} };
	$scope.$root.limitAccess($scope.searchDTO);
	
	$q.all([ getCategoryPromise, getAccidentLocationTypesPromise,getAccidentCollisionTypesPromise,getAccidentManoeuvreType,	
	         getAccidentCollisionObject, hubsPromise,nodesPromise,getAccidentMachineTypesPromise,getCivillianVehicleTypePromise,getAccidentInjuryDegreesPromise,subUnitsPromise,
	         getActivityTypesPromises,taskStatusesPromise,indentStatusesPromise,permitClassesPromise,vehicleTypesPromise,getAccidentWeathersPromise,getAccidentVisbilitiesPromise
	         ,getAccidentRoadSurfacesPromise,getAccidentRoadFeaturesPromise,getAccidentRoadTypesPromise
	         ,getAccidentSpeedLimitsPromise,getAccidentTrafficVolumesPromise,getAccidentPointErrorPromise,getAccidentSystemErrorsPromise,getAccidentManoeuvreTypesPromise]).then(function(data)
	   {
				$scope.accCategories = data[0];
				$scope.accLocTypes = data[1];
				$scope.accCollisionDirs = data[2]
				$scope.accManoevres = data[3];
				$scope.accCollisionObjs = data[4];
				$scope.hubs = data[5];
				$scope.nodes = data[6];
				$scope.accMachineTypes=data[7];		
				$scope.accCvVehTypes=data[8];
				$scope.accInjuries=data[9];
				$scope.subUnits = data[10];
				$scope.activities=data[11];
				$scope.taskStatuss=data[12];
				$scope.indentStatuss=data[13];
				$scope.drivingCategories=data[14];
				$scope.vehicleTypes=data[15];
				$scope.accWeathers=data[16];
				$scope.accVisibilities=data[17];
				$scope.accRoadSurfaces=data[18];
				$scope.accRoadFeatures=data[19];
				$scope.accRoadTypes=data[20];
				$scope.accSpeedLimits=data[21];
				$scope.accTrafficVolumes=data[22];
				$scope.accPointErrors=data[23];
				$scope.accSystemErrors=data[24];
				$scope.accManoevres=data[25];			
		});
	$scope.$watch('searchDTO.taskId', function (newValue, oldValue, scope) {
			if(!angular.isUndefined(newValue)&&isNaN(newValue) && !angular.isNumber(newValue))
				$scope.$root.infoDialog("Please Enter in vaild Task ID");	
	}, true);
	$scope.reset = function()
	{
		CommonService.resetPagination($scope, 0, Constants.PAGE_SIZE);
		$scope.searchDTO={};
		$scope.searchDTO = {startIndex:0, pageSize:Constants.PAGE_SIZE, order: "", orderProperty:"" };
		$scope.$root.limitAccess($scope.searchDTO);
	};
	$scope.checkAll=function()
	{	
		_.each($scope.records, function(record) 
		{ 
			$scope.checkboxes.records[record.id] = $scope.checkboxes.all;
		});
	};
	$scope.paginate = function(tableState) {
		if(CommonService.initPagination($scope, tableState)) {
			CommonService.setPaginationSearch($scope, tableState);
			var resultPromise = AccidentService.searchAccident($scope.searchDTO);
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
		CommonService.search($scope, "accidentNo");
	};
	
	$scope.machineTypeOptionReset=function(){
			$scope.searchDTO.militaryVehiclePlateNo=null;
			$scope.vehicle=null;
			$scope.searchDTO.pmDate=null;
			$scope.searchDTO.aviDate=null;
			$scope.searchDTO.bocConducted=null;
			$scope.searchDTO.civillianVehiclePlate=null;
			$scope.searchDTO.civillianMachineType=null;
	}
	
	$scope.download = function() {
		var resultPromise = AccidentService.exportAccidents($scope.searchDTO);
		$q.all([ resultPromise ]).then(function(data) {
			$scope.$root.exportFile(data[0], "text/plain", "accident.xlsx");
		});
	};
});


app.controller('AccidentUpdateController', function($q,$location,$timeout,$scope,$stateParams, AccidentService,DriverService , VehicleService,CommonService, Constants,Upload) {
	//Initial Load Start Line=====================================
	if(!$scope.$root.checkAccessRights('showSearchAccidents')){return;}
	var personnelCounter=1;
	var toCounter=1;
	var machineCounter=1;
	$scope.newToInvolvedDTO={};
	$scope.accidents=[];
	$scope.newDTO={id:0,isNewAccident:false};
	$scope.missionDTO={accidentId:0};
	$scope.manDTO={accidentId:0};
	$scope.machineDTO={accidentId:0};
	$scope.mediumDTO={accidentId:0};
	$scope.managementDTO={accidentId:0};
	$scope.causesDTO={accidentId:0};
	$scope.conclusionDTO={accidentId:0};
	$scope.newMachineDTO={civillianVehicleType:{id:0,name:''},machineType:{id:0,name:''}};
	$scope.newAttachmentDTO={accidentId:0};
	$scope.newAttachmentListDTO={accidentId:0,accidentFileIds:[]};
	$scope.newAccidentFileDTO={accidentId:0,fileType:"",fileDescription:""};
	$scope.newAnnexDTO={accidentId:0,fileDescription:"",fileType:""};
	$scope.checkboxes = {toRecords:{},allTO:false,personnelRecords:{},allPersonnel:false,machineRecords:{}, allMachine:false,allAccidentStatements: false, accidentStatementsRecords: {},allAccidentPhotograph:false,accidentPhotographRecords:{},allSemantics:false,accidentSemanticsRecords:{} ,allTransponderLogData:false,accidentTransponderLogRecords:{},allFIR:false,FIRs:{},allBOI:false,BOIs:{},allPoliceReport:false,policeReports:{}};
	$scope.dto={machineVehicles:[],personnelInvolved:[],transportOperatorInvolved:[]};
	$scope.personnelDTO={id:0,accidentId:0,nricNo:"",name:"",address:"",contactNo:"",injuryId:0,injury:null,remarks:""};
	$scope.machineDTO={id:machineCounter,accidentId:0,machineType:null,machineTypeId:0,militaryVehiclePlateNo:"",civillianVehiclePlateNo:"",bocConducted:"",pmDate:"",aviDate:"",civillianVehicleTypeId:0,machineTypeDesc:"",vehicleDamages:"",propertyDamages:""};
	$scope.getSearchUnitParameter={management:"management",report:"report"};
	$scope.getNricNameParameter={mtRacBy:"mtRacBy",safetyBriefBy:"safetyBriefBy",vehCom:"vehicleCommanderNricName"};
  	$scope.getVehicleInputType={militaryVehicle:"addMilitaryVehicle",existRecords:"showExistRecords"};
	var getCivillianVehicleTypePromise=AccidentService.getCivillianVehicleTypes();
	var getCategoryPromise = AccidentService.getAccidentCategories();
	var getAccidentLocationTypesPromise = AccidentService.getAccidentLocationTypes();
	var getAccidentCollisionTypesPromise = AccidentService.getAccidentCollisionTypes();
	var getAccidentManoeuvreType = AccidentService.getAccidentManoeuvreTypes();
	var getAccidentCollisionObject = AccidentService.getAccidentCollisionObject();
	var hubsPromise = CommonService.getHubs();
	var nodesPromise = CommonService.getNodes();
	var getAccidentMachineTypesPromise=AccidentService.getAccidentMachineTypes();
	var getAccidentInjuryDegreesPromise=AccidentService.getAccidentInjuryDegrees();
	var subUnitsPromise = CommonService.getSubunits();
	var getAccidentWeathersPromise=AccidentService.getAccidentWeathers();
	var getAccidentVisbilitiesPromise=AccidentService.getAccidentVisibilities();
	var getAccidentRoadSurfacesPromise=AccidentService.getAccidentRoadSurfaces();
	var getAccidentRoadFeaturesPromise=AccidentService.getAccidentRoadFeatures();
	var getAccidentRoadTypesPromise=AccidentService.getAccidentRoadTypes();
	var getAccidentSpeedLimitsPromise=AccidentService.getAccidentSpeedLimits();
	var getAccidentTrafficVolumesPromise =AccidentService.getAccidentTrafficVolumes();
	var getAccidentPointErrorPromise=AccidentService.getAccidentPointErrors();
	var getAccidentSystemErrorsPromise=AccidentService.getAccidentSystemErrors();
	
	$q.all([ getCategoryPromise, getAccidentLocationTypesPromise,getAccidentCollisionTypesPromise,getAccidentManoeuvreType,	
	         getAccidentCollisionObject, hubsPromise,nodesPromise,getAccidentMachineTypesPromise,getCivillianVehicleTypePromise,
	         getAccidentInjuryDegreesPromise,subUnitsPromise,getAccidentWeathersPromise ,getAccidentVisbilitiesPromise,getAccidentRoadSurfacesPromise,
	         getAccidentRoadFeaturesPromise,getAccidentRoadTypesPromise,getAccidentSpeedLimitsPromise
	         ,getAccidentTrafficVolumesPromise,getAccidentPointErrorPromise
	         ,getAccidentSystemErrorsPromise]).then(function(data)
	   {
				$scope.accCategories = data[0];
				$scope.accLocTypes = data[1];
				$scope.accCollisionDirs = data[2]
				$scope.accManoevres = data[3];
				$scope.accCollisionObjs = data[4];
				$scope.hubs = data[5];
				$scope.nodes = data[6];
				$scope.accMachineTypes=data[7];		
				$scope.accCvVehTypes=data[8];
				$scope.accInjuries=data[9];
				$scope.subUnits = data[10];
				 $scope.accWeathers=data[11];
	        	 $scope.accVisibilities=data[12];
	        	 $scope.accRoadSurfaces=data[13];
	        	 $scope.accRoadFeatures=data[14];
	        	 $scope.accRoadTypes=data[15];
	        	 $scope.accSpeedLimits=data[16];
	        	 $scope.accTrafficVolumes=data[17];
	        	 $scope.accPointErrors=data[18];
	        	 $scope.accSystemErrors=data[19];
		});

	$scope.getNRICName=function(nric,lodingnum){
		var searchNameNRICpromise=AccidentService.searchNricName(nric);
		$q.all([searchNameNRICpromise]).then(function(data){
			switch(lodingnum){
			case $scope.getNricNameParameter.mtRacBy:
				$scope.nricName=data[0].name + ' (' + data[0].code + ')';
				break;
			case $scope.getNricNameParameter.safetyBriefBy:
				$scope.safetyBriefnricName=data[0].name + ' (' + data[0].code + ')';
				break;	
			case $scope.getNricNameParameter.vehCom:
				$scope.vehicleCommanderNricName=data[0].name + ' (' + data[0].code + ')';
				break;	
			default:
				break;		
			}		
		});	
	};
	
	var getReportPromise= AccidentService.getReport($stateParams.id);
	$q.all([getReportPromise]).then(function(data)
	{
			$scope.dto.personnelInvolved=[];
			$scope.reportDTO=data[0].accidentReport;
			$scope.s=data[0].missionDTO;
			$scope.missionDTO=data[0].missionDTO;
			if(data[0].missionDTO.taskId!=0){
				$scope.getTask(data[0].missionDTO.taskId);
			}
			if($scope.reportDTO.unitCode!=null)
			{
				$scope.getSearchUnit($scope.reportDTO.unitCode,$scope.getSearchUnitParameter.report);
			}
			$scope.manDTO=data[0].manDTO;
			angular.forEach(data[0].manDTO.transportOperatorInvolved, function(record, key)
			{
				var toDTO=AccidentService.getToInvolvedDTO($scope.dto.transportOperatorInvolved,toCounter);
				toDTO={id:toCounter,accidentId:0,nricNo:"",nricNoName:"",driverId:10,ehrHub:"",ehrNode:"",serviceType:"",vocation:0,driverPermitsCAT:0,permitNo:0,cl3Mileage:0,cl4Mileage:0,mileage:0,injury:null,InjuryId:0,restHour:0,psychoFlag:"",accPsyProblemDesc:""};
				$scope.toDTO={id:toCounter,accidentId:record.accidentId,nricNo:record.nricNo,nricNoName:record.driverName+ " (" + record.nricNo + ")",driverId:record.driverId,ehrHub:record.ehrHub,ehrNode:record.ehrNode,serviceType:record.serviceType,vocation:record.vocation,driverPermitsCAT:record.driverPermitsCAT,permitNo:record.permitNo,cl3Mileage:record.cl3Mileage,cl4Mileage:record.cl4Mileage,mileage:record.mileage,injury:record.injury,InjuryId:record.injuryId,restHour:record.restHour,psychoFlag:record.psychoFlag};
				AccidentService.mapToInvolvedProperties($scope.toDTO,toDTO);
				toCounter++;
				$scope.dto.transportOperatorInvolved.push(toDTO);		 
		});
			
		angular.forEach(data[0].manDTO.personnelInvolved, function(record, key)
		{
			var personnelDTO=AccidentService.getPersonnelInvolvedDTO($scope.dto.personnelInvolved,personnelCounter);
				personnelDTO={id:personnelCounter,accidentId:"",nricNo:"",name:"",address:"",contactNo:"",injuryId:0,injury:null,remarks:""};
			$scope.personnelDTO={id:personnelCounter,accidentId:record.accidentId,nricNo:record.nricNo,name:record.name,address:record.address,contactNo:record.contactNo,injuryId:record.injuryId,injury:record.injury,remarks:record.remarks};
			AccidentService.mapPersonnelInvolvedProperties($scope.personnelDTO,personnelDTO);
			personnelCounter++;
			$scope.dto.personnelInvolved.push(personnelDTO); 
		});
			
		
		$scope.machineDTO=data[0].machineDTO;
		angular.forEach(data[0].machineDTO.machineVehicles, function(record, key) 
		{
			var machineDTO=AccidentService.getMachinesDTO($scope.dto.machineVehicles,machineCounter);
				machineDTO={id:machineCounter,accidentId:"",machineType:null,machineTypeId:0,militaryVehiclePlateNo:"",civillianVehiclePlateNo:"",bocConducted:"",pmDate:"",aviDate:"",civillianVehicleTypeId:0,machineTypeDesc:"",vehicleDamages:"",propertyDamages:"",vehicleType:"",civillianVehicleType:null};
			$scope.machineRowDto={id:machineCounter,accidentId:record.accidentId,machineType:record.machineType,machineTypeId:record.machineTypeId,militaryVehiclePlateNo:record.militaryVehiclePlateNo,civillianVehiclePlateNo:record.civillianVehiclePlateNo,bocConducted:record.bocConducted,pmDate:record.pmDate,aviDate:record.aviDate,civillianVehicleTypeId:record.civillianVehicleTypeId,machineTypeDesc:record.vehicleTypeName,vehicleDamages:record.vehicleDamages,propertyDamages:record.propertyDamages,vehicleType:record.vehicleTypeName,civillianVehicleType:record.civillianVehicleType};
			AccidentService.mapAccidentMachineProperties($scope.machineRowDto,machineDTO);
			machineCounter++;
			$scope.dto.machineVehicles.push(machineDTO);		 
		});
		$scope.mediumDTO=data[0].mediumDTO;	
		$scope.managementDTO=data[0].managementDTO;
		var checkManagementType=0;
			
		if(data[0].managementDTO.authorizedFlag==Constants.FLAG_YES)
		{
			$scope.getNRICName($scope.managementDTO.mtRacBy,$scope.getNricNameParameter.mtRacBy);		
		}
		if(data[0].managementDTO.safetyBriefFlag==Constants.FLAG_YES)
		{
			$scope.getNRICName($scope.managementDTO.safetyBriefBy,$scope.getNricNameParameter.safetyBriefBy);		
		}
		if(data[0].managementDTO.vehicleCommanderFlag==Constants.FLAG_YES)
		{		
			$scope.getNRICName($scope.managementDTO.vehicleCommanderNameNRIC,$scope.getNricNameParameter.vehCom);

			$scope.getSearchUnit($scope.managementDTO.vehicleCommanderUnitCode,$scope.getSearchUnitParameter.management);	
		}
			$scope.accidentStatements=data[0].attachmentsDTO.statetments;
			$scope.accidentPhotographs=data[0].attachmentsDTO.photoGraphs;
			$scope.accidentSemanticss=data[0].attachmentsDTO.semantics;
			$scope.accidentTransponderLogs=data[0].attachmentsDTO.transponderLog;	
			
			$scope.causesDTO=data[0].casusDTO;
			$scope.conclusionDTO=data[0].conclusionDTO;
			$scope.FIRs=data[0].attachmentsDTO.fir;		
			$scope.BOIs=data[0].attachmentsDTO.bois;	
			$scope.policeReports=data[0].attachmentsDTO.bois;
			
			$scope.newDTO.id=$scope.reportDTO.id;
			$scope.missionDTO.accidentId=$scope.reportDTO.id;
			$scope.manDTO.accidentId=$scope.reportDTO.id;
			$scope.machineDTO.accidentId=$scope.reportDTO.id;
			$scope.mediumDTO.accidentId=$scope.reportDTO.id;
			$scope.managementDTO.accidentId=$scope.reportDTO.id;
			$scope.newAccidentFileDTO.accidentId= $scope.reportDTO.id;
			$scope.newAttachmentDTO.accidentId = $scope.reportDTO.id;
			$scope.causesDTO.accidentId=$scope.reportDTO.id;
			$scope.conclusionDTO.accidentId=$scope.reportDTO.id;
			$scope.newAnnexDTO.accidentId=$scope.reportDTO.id;
	});
	$scope.manDTO={accidentId:0,personnelInvolved:[],transportOperatorInvolved:[],toDelete:[],personnelDelete:[]};
	//Initial Load End Line=====================================

	//common method Start line ===============================
	$scope.getSearchUnit=function(unit,tab)
	{
		var searchUnitpromise=AccidentService.searchUnit(unit);
		$q.all([searchUnitpromise]).then(function(data){
			switch(tab){
				case $scope.getSearchUnitParameter.management:
				$scope.vehicleCommandderUnit=data[0].name + " (" + data[0].code + ")";
					break;
				case $scope.getSearchUnitParameter.report:
					$scope.unit=data[0].name + " (" + data[0].code + ")";
					break;
				default:
					break;				
			}		
		});	
	};
	

	  $scope.taskViewMore=function(){
		  if($scope.task!=null)
			$('#viewTask').modal();
	  };
	  $scope.taskGoToEditTask=function(){
	
		  if($scope.task!=null)
		  {
				$('#viewTask').modal('hide');
				$location.path("/task/8055");
		  }
	  };
	  $scope.getTask=function(taskId)
	  {
		  if(!angular.isUndefined(taskId))
		  {
			 var getAccidentMissionIndentPromise=AccidentService.getAccidentMissionIndent(taskId);
				$q.all([getAccidentMissionIndentPromise]).then(function(data) 
				{
					if(!angular.isUndefined(data[0]))
						$scope.task=data[0];
					else
						$scope.task=null;			
				});  
		  }
	  };	
		$scope.getVehicle=function(militaryVehiclePlateNo){
			var getVehiclePromise=VehicleService.getVehicle(militaryVehiclePlateNo);
			$q.all([getVehiclePromise]).then(function(data) 
			  {	
				if(data[0]!=null)
				{
					$scope.vehicles=data[0];
					$scope.newMachineDTO.vehicleType=data[0].vehicleType;
					$scope.newMachineDTO.latestPmStartDate=data[0].latestPmStartDate;
					$scope.newMachineDTO.aviDueDate=data[0].aviDueDate;

				}
			});
		};
	  
		//common method End line ===============================
	// Report tab Start Line==========================================================
	$scope.saveAccident=function()
	{	
		if(angular.isUndefined($scope.reportDTO.locationInfo)||$scope.reportDTO.locationInfo=="")
		{
			$scope.$root.infoDialog("Please enter AccidentLocation");	
		}else if(angular.isUndefined($scope.reportDTO.accidentDate)||$scope.reportDTO.accidentDate=="")
		{	
			$scope.$root.infoDialog("Please enter Accident Date");
		}else if(angular.isUndefined($scope.reportDTO.categoryId)||$scope.reportDTO.categoryId=="")
		{
			$scope.$root.infoDialog("Please Choose Accident Category");
		}else if(angular.isUndefined($scope.reportDTO.locationTypeId)||$scope.reportDTO.locationTypeId==""){
			$scope.$root.infoDialog("Please Choose Location Type");
		}else
		{
			$scope.newDTO.isNewAccident=false;
			var getNextAccidentIdPromise=AccidentService.getNextAccidentId($scope.newDTO);
			$q.all([getNextAccidentIdPromise]).then(function(data)
			{
				$scope.reportDTO.accidentReportStatus=data[0].accidentReportStatus;
				$scope.newDTO=$scope.reportDTO;
				var saveAccidentPromise=AccidentService.saveAccident($scope.newDTO);
				 $q.all([saveAccidentPromise]).then(function(data) 
				{
					$scope.reportDTO.accidentReportStatus="Updated";
					 $scope.$root.infoDialog(data[0]);	 
				 });
			 });
			
		}
	};
	
	// Report Tab End Line==========================================================
	//Mission Tab Start Line=================================================== 
	  $scope.$watch("missionDTO.taskId", function (newValue, oldValue)
	  {
				 if(!angular.isUndefined(newValue))
					  $scope.getTask(newValue);
				  else 
					 $scope.indent=null;	    
	  });	  
	$scope.saveMission=function()
	{
		if(!angular.isNumber($scope.missionDTO.taskId)||$scope.missionDTO.taskId=="")
			$scope.$root.infoDialog("Please enter vaild task ID");
		else if(angular.isUndefined($scope.missionDTO.taskId))
			$scope.$root.infoDialog("Please enter task ID");
		else if((angular.isUndefined($scope.missionDTO.remarks)||$scope.missionDTO.remarks=="")&&$scope.missionDTO.missionFlag==Constants.FLAG_NO)
			$scope.$root.infoDialog("Please enter remarks");	
		else if(angular.isUndefined($scope.missionDTO.missionFlag)|| $scope.missionDTO.missionFlag=="")
			$scope.$root.infoDialog("Please choose mission straightforward");			
		else
		{ 
			if(!angular.isUndefined($scope.reportDTO.accidentNo))
			{
	
				var saveAccidentMissionPromise=AccidentService.saveAccidentMission($scope.missionDTO);
				$q.all([saveAccidentMissionPromise]).then(function(data) 
				{
					$scope.reportDTO.accidentReportStatus="Updated";
					$scope.$root.infoDialog(data[0]);
				});
			}else
			{
			$scope.$root.errorDialog($scope.submitNewAccidentCasePromptMsg);
			}	
		}		
	}	
	//Mission Tab End Line=================================================== 
	//Man Tab Start Line=================================================== 
	$scope.checkAllPersonnel=function()
	{
		_.each($scope.dto.personnelInvolved, function(record) 
		{ 
			$scope.checkboxes.personnelRecords[record.id] = $scope.checkboxes.allPersonnel;
		});
	};
		$scope.checkAllTO=function()
		{
			_.each($scope.dto.transportOperatorInvolved, function(record)
			{ 
				$scope.checkboxes.toRecords[record.id] = $scope.checkboxes.allTO;
			});	
		};
	$scope.showAddEditToModal=function(tOId)
	{
		var toDTO=AccidentService.getToInvolvedDTO($scope.dto.transportOperatorInvolved,tOId!=null?tOId:0);
		if(tOId==null)
		{
			$scope.newToInvolvedDTO={id:0,toId:null,isAdd:false,injuryId:0,isDisabled:false};	
			$scope.newToInvolvedDTO.restHour=0;
			toDTO={id:0,toId:null,accidentId:0,nricNoName:''};
			AccidentService.mapToInvolvedProperties(toDTO,$scope.newToInvolvedDTO);		
			$scope.newToInvolvedDTO={ };
			$scope.newToInvolvedDTO.isAdd=true;
			$scope.newToInvolvedDTO.isDisabled=false;
			$scope.driver="";
			$scope.familiarisations={};
			$scope.proficiencies={};
			$scope.taskDetails={};
			$scope.accidents=[];
		}else
		{
			$scope.driver=toDTO.nricNoName;
			$scope.newToInvolvedDTO={id:0};
			$scope.getDriver(toDTO.nricNo);
			AccidentService.mapToInvolvedProperties(toDTO,$scope.newToInvolvedDTO);
			$scope.newToInvolvedDTO.isAdd=false;
			$scope.newToInvolvedDTO.isDisabled=true;
		}
		$('#addTOModal').modal();	
	};
	$scope.$watch("newToInvolvedDTO.restHour", function (newValue, oldValue)
	{
		if(!$scope.vaildateField(newValue))
		 {
			if(newValue<0)
			{			 
				$scope.$root.infoDialog("Please enter vaild  transport operator rested hour");	 
			}
		}    
	});	
	$scope.$watch('newToInvolvedDTO.nricNo', function (newValue, oldValue, scope)
	{
		if(!angular.isUndefined(newValue))
			$scope.getDriver(newValue);
				
	}, true);
				
	$scope.getDriver=function(nricNo)
	{
		var getDriverPromise=DriverService.getDriver(nricNo);
		var getAccidentDriverPromise= AccidentService.getAccidentDriver(nricNo);
		var getManPastTwoDaysTaskDetailsPromise=AccidentService.getManPastTwoDaysTaskDetails(nricNo);
		$q.all([getDriverPromise,getManPastTwoDaysTaskDetailsPromise,getAccidentDriverPromise]).then(function(data) 
		{		
			$scope.newToInvolvedDTO.ehrHub=data[0].ehrHub;
			$scope.newToInvolvedDTO.ehrNode=data[0].ehrNode;
			$scope.newToInvolvedDTO.serviceType=data[0].serviceType;
			$scope.newToInvolvedDTO.vocation=data[0].vocation;
			$scope.newToInvolvedDTO.permitNo=data[0].permitNo;
			$scope.newToInvolvedDTO.driverPermitsCAT=data[0].driverPermitsCAT;
			$scope.newToInvolvedDTO.cl3Mileage=data[0].cl3Mileage;
			$scope.newToInvolvedDTO.cl4Mileage=data[0].cl4Mileage;
			$scope.newToInvolvedDTO.mileage=data[0].mileage;
			$scope.newToInvolvedDTO.permitNo=data[0].driverPermits[0].permitNo;
			$scope.familiarisations=data[0].driverVehicleFams;
			$scope.proficiencies=data[0].driverProficiencies;
			_.each(data[0].driverPermits, function(driverPermit)
			{ 
				if(driverPermit.permitClasses==data[0].driverPermits[0].permitClasses)
				{
					$scope.newToInvolvedDTO.driverPermitsCAT=driverPermit.permitClasses;
				}else
				{
					$scope.newToInvolvedDTO.driverPermitsCAT+=","+driverPermit.permitClasses;
				}
		});
		$scope.taskDetails=data[1];
		
		var accidentData=[];
		_.each(data[2], function(record)
		{ 
			var vehicleType="";
			_.each(	record.machineDTO.machineVehicles, function(machine)
			{
				
				if(record.machineDTO.machineVehicles.length>0){
					if(record.machineDTO.machineVehicles[0].vehicleTypeName==machine.vehicleTypeName)
						vehicleType=machine.vehicleTypeName;
					else
						vehicleType+=", "+machine.vehicleTypeName;	
				}
			}); 
			accidentData.push({	accidentNo:record.accidentReport.accidentNo,accidentDate:record.accidentReport.accidentDate,vehicleType:vehicleType,safDriverNeglience: angular.isUndefined(record.casusDTO.safDriverNeglience)?"NIL":record.casusDTO.safDriverNeglience=="Y"?FLAG_YES:FLAG_NO});
		});
			$scope.accidents=accidentData;	
		});
	};
	$scope.vaildateField=function(field)
	{
		return angular.isUndefined(field)||field==null||field==""?true:false;
	}
	$scope.saveUpdateToInvolved=function(toInvolved)
	{
		var toDTO=AccidentService.getToInvolvedDTO($scope.dto.transportOperatorInvolved,$scope.newToInvolvedDTO.id);
		var checkDuplicateNric=false;
		_.each($scope.dto.transportOperatorInvolved, function(record) 
		{ 
			if(record.nricNo==toInvolved.nricNo)
				checkDuplicateNric=true;
		});
		if(checkDuplicateNric&& !$scope.newToInvolvedDTO.isDisabled)
			$scope.$root.infoDialog("Duplicate  Nric or name entered. Please enter other Nric No or name");
		else if ($scope.vaildateField($scope.newToInvolvedDTO.nricNo))
			$scope.$root.infoDialog("Please enter Nric No or name");
		else if($scope.newToInvolvedDTO.injury==null)	
			$scope.$root.infoDialog("Please select injury");		
		else if($scope.vaildateField($scope.newToInvolvedDTO.restHour))
			$scope.$root.infoDialog("Please enter  transport operator rested hour");
		else if($scope.newToInvolvedDTO.restHour<0)
			$scope.$root.infoDialog("Please enter vaild  transport operator rested hour");	
		else if($scope.newToInvolvedDTO.isAdd)
		{
			$scope.newToInvolvedDTO.nricNoName=$scope.driver;
			$scope.newToInvolvedDTO=toInvolved;
			$scope.newToInvolvedDTO.injuryId=toInvolved.injury.id;
			$scope.newToInvolvedDTO.id=toCounter;
			toDTO={id:toCounter,accidentId:$scope.newDTO.id,InjuryId:$scope.newToInvolvedDTO.injuryId.id};
			AccidentService.mapToInvolvedProperties($scope.newToInvolvedDTO,toDTO);
			$scope.dto.transportOperatorInvolved.push(toDTO);
			$scope.newToInvolvedDTO={ };
			$scope.driver="";
			$scope.familiarisations={ };
			$scope.proficiencies={ };
			$scope.taskDetails={ };
			$scope.accidents=[];
			toCounter++;
		}
		else
		{
			$scope.newToInvolvedDTO.id=toInvolved.id;
			$scope.newToInvolvedDTO.nricNoName=$scope.driver;
			toDTO.id=toInvolved.id;
			toDTO.InjuryId=toInvolved.injury.id;
			AccidentService.mapToInvolvedProperties($scope.newToInvolvedDTO,toDTO);		
		}
	};	
				
	$scope.removeTO= function()
	{			
		var toDeleteData=[];
		var i = $scope.dto.transportOperatorInvolved.length;
		while (i--)
		{
			if ($scope.checkboxes.toRecords[ $scope.dto.transportOperatorInvolved[i].id]) 
			{
				toDeleteData.push($scope.dto.transportOperatorInvolved[i].nricNo);
				$scope.dto.transportOperatorInvolved.splice(i, 1);
			}
		}
		$scope.manDTO.toDelete=toDeleteData;
		if($scope.dto.transportOperatorInvolved.length == 0)
		{
 			$scope.checkboxes = {toRecords:{},allTO:false};
 			$scope.$root.infoDialog("Please select at least one record.");
		}
				  
	};
	$scope.showAddEditPersonnelModal=function(personnelId)
	{
		var personnelDTO=AccidentService.getPersonnelInvolvedDTO($scope.dto.personnelInvolved,personnelId!=null?personnelId:0);
		$scope.newPersonnelDTO={isAdd:false,isDisabled:false};
		if(personnelId==null)
		{
			personnelDTO={id:0,accidentId:0,injuryId:0};
			AccidentService.mapPersonnelInvolvedProperties(personnelDTO,$scope.newPersonnelDTO);
			$scope.newPersonnelDTO={ };
			$scope.newPersonnelDTO.isAdd=true;
			$scope.newPersonnelDTO.isDisabled=false;
		}else
		{
			$scope.newPersonnelDTO.accidentId=$scope.newDTO.id;
			$scope.newPersonnelDTO.injuryId=personnelDTO.injury.id;
			AccidentService.mapPersonnelInvolvedProperties(personnelDTO,$scope.newPersonnelDTO);
			$scope.newPersonnelDTO.isAdd=false;
			$scope.newPersonnelDTO.isDisabled=true;
		}
		$('#addPerModal').modal();
		return false;
	};
	$scope.saveUpdatePersonnelInvolved=function(personnelInvolved)
	{
		var checkDuplicateNric=false;
		_.each($scope.dto.personnelInvolved, function(record) 
		{ 
		if(record.nricNo==personnelInvolved.nricNo)
				checkDuplicateNric=true;
		});
		var personnelDTO=AccidentService.getPersonnelInvolvedDTO($scope.dto.personnelInvolved,$scope.newPersonnelDTO.id);
		if(checkDuplicateNric&&	!$scope.newPersonnelDTO.isDisabled)
			$scope.$root.infoDialog("There is duplicate Nric entered, please enter a another Nric");
		else if($scope.vaildateField($scope.newPersonnelDTO.nricNo))
			$scope.$root.infoDialog("Please enter in Nric");
		else if($scope.vaildateField($scope.newPersonnelDTO.name))
			$scope.$root.infoDialog("Please enter in name");		
		else if($scope.vaildateField($scope.newPersonnelDTO.address))
			$scope.$root.infoDialog("Please enter in address");
		else if($scope.vaildateField($scope.newPersonnelDTO.contactNo))
			$scope.$root.infoDialog("Please enter in contact number");
		else if(angular.isUndefined($scope.newPersonnelDTO.injury))
			$scope.$root.infoDialog("Please select  injury");
		else 
		{			
			if($scope.newPersonnelDTO.isAdd)
			{
				$scope.newPersonnelDTO=personnelInvolved;
				$scope.newPersonnelDTO.accidentId=$scope.newDTO.id;
				$scope.newPersonnelDTO.id=personnelCounter;
				$scope.newPersonnelDTO.injuryId=personnelInvolved.injury.id;
				personnelDTO={id:personnelCounter,accidentId:$scope.newDTO.id,injuryId:$scope.newPersonnelDTO.injury.id};
				AccidentService.mapPersonnelInvolvedProperties($scope.newPersonnelDTO,personnelDTO);
				$scope.dto.personnelInvolved.push(personnelDTO);
				$scope.newPersonnelDTO={ };
				personnelCounter++;
			}else
			{
				AccidentService.mapPersonnelInvolvedProperties($scope.newPersonnelDTO,personnelDTO);
			}
			$('#addPerModal').modal('hide');
		}
	};
		 $scope.removePersonnel= function() 
		 {
		 	var personnelDeleteData=[];
			var i = $scope.dto.personnelInvolved.length;
			while (i--) 
			{
				if ($scope.checkboxes.personnelRecords[ $scope.dto.personnelInvolved[i].id]) 
				{
					personnelDeleteData.push($scope.dto.personnelInvolved[i].nricNo);
				   	$scope.dto.personnelInvolved.splice(i, 1);
				   }
			}
			$scope.manDTO.personnelDelete=personnelDeleteData;
			if($scope.dto.personnelInvolved.length == 0)
			{
				$scope.checkboxes = {personnelRecords:{},allPersonnel:false};
				$scope.$root.infoDialog("Please select at least one record.");
	 		}    
		};
		$scope.show="";
		$scope.saveAccidentMan=function()
		{
			if(angular.isUndefined($scope.manDTO.manFlag)||$scope.manDTO.manFlag=="")
				$scope.$root.infoDialog("Please choose if transport operator qualified and fitted");			
			else if($scope.manDTO.manFlag==Constants.FLAG_NO && $scope.manDTO.remarks=="")
				$scope.$root.infoDialog("Please enter remarks");				
			else
			{
				$scope.manDTO.transportOperatorInvolved=$scope.dto.transportOperatorInvolved;
				$scope.manDTO.personnelInvolved=$scope.dto.personnelInvolved;
				var saveAccidentManPromise=AccidentService.saveAccidentMan($scope.manDTO);
				$q.all([ saveAccidentManPromise ]).then(function(data) 
				{
					$scope.reportDTO.accidentReportStatus="Updated";
					$scope.$root.infoDialog(data[0]);		
				});	
				
			}		
		};			
		
		//Man Tab End Line=================================================== 	
		//Machine Tab Start Line=================================================== 	
		
		$scope.checkMachineVehicleAll = function()
		{
			_.each($scope.dto.machineVehicles, function(record) 
			{ 
				$scope.checkboxes.machineRecords[record.id] = $scope.checkboxes.allMachine;
			});
		};
		$scope.vehicle="";
		$scope.showAddVehicleModal=function(machineId,machinetypeid,civillianVehicleType,militaryVehicleNumber,vehicleType)
		{
			$scope.vehicle=null;
		
				var machineDTO=AccidentService.getMachinesDTO($scope.dto.machineVehicles ,machineId!=null?machineId:0);
				if(machineId==null)
				{
					$scope.vehicles={ };
					$scope.newMachineDTO={isAdd:true,machineType:{id:0,name:''},machineTypeId:0,isDisabled:false,civillianVehicleTypeId:0,civillianVehicleType:civillianVehicleType,machineType:{id:0,name:''}};
					$scope.newMachineDTO.machineType.id=0;
					machineDTO={machineType:{id:0,name:''},machineTypeId:0,isDisabled:false,civillianVehicleTypeId:0,civillianVehicleType:civillianVehicleType,machineType:{id:0,name:''}};
					AccidentService.mapAccidentMachineProperties($scope.newMachineDTO,machineDTO);
					$scope.newMachineDTO={ };
					$scope.newMachineDTO.isDisabled=false;
					$scope.newMachineDTO.isAdd=true;
				}else
				{
					switch(machinetypeid.id){
						case Constants.MilitaryMachineType:
							$scope.vehicle=militaryVehicleNumber+" ("+vehicleType+")";
							break;
						case Constants.CivillianMachineType:
							$scope.newMachineDTO={civillianVehicleTypeId:civillianVehicleType.id,civillianVehicleType:civillianVehicleType,machineType:machinetypeid};
							break;
						default: 
							$scope.newMachineDTO={};
							$scope.vehicle={};
							break;						
					}
					AccidentService.mapAccidentMachineProperties(machineDTO,$scope.newMachineDTO);
					$scope.newMachineDTO.isDisabled=true;
					$scope.newMachineDTO.isAdd=false;
				}
				$('#addVehModal').modal();
		
			return false;
		};
		$scope.saveAndUpdateMachine=function(machineDTo)
		{
			var checkMiliaryOptionIsVaild=false;
			var checkCivillianOptionIsVaild=false;
			if($scope.newMachineDTO.machineType.id==Constants.MilitaryMachineType)
			{
				if ($scope.newMachineDTO.militaryVehiclePlateNo=="")
				{
					checkMiliaryOptionIsVaild=false;
					$scope.$root.infoDialog("Please Enter military vehicle number");
				}else if($scope.newMachineDTO.militaryVehiclePlateNo==null)
				{
					checkMiliaryOptionIsVaild=false;
					$scope.$root.infoDialog("Please Enter military vehicle Number");
				}else if ($scope.newMachineDTO.bocConducted==null||$scope.newMachineDTO.bocConducted=="")
				{
					checkMiliaryOptionIsVaild=false;
					$scope.$root.infoDialog("Please choose BOC conducted option");
				}else
				{
					checkMiliaryOptionIsVaild=true;
				}
			}
			
			if ($scope.newMachineDTO.machineType.id==Constants.CivillianMachineType)
			{
				if($scope.newMachineDTO.civillianVehiclePlateNo==null||$scope.newMachineDTO.civillianVehiclePlateNo=="")
				{
					checkCivillianOptionIsVaild=false;
					$scope.$root.infoDialog("Please Enter civillian vehicle number");		
				}else if ($scope.newMachineDTO.civillianVehicleType==null)
				{
					checkCivillianOptionIsVaild=false;
					$scope.$root.infoDialog("Please choose vehicle type");	
				}else
				{
					checkCivillianOptionIsVaild=true;
				}
			}
			var checkDulipcateVehicle=false;
			
			var vehicleNumber="";
			switch (machineDTo.machineType.id){
				case Constants.MilitaryMachineType:
					vehicleNumber=machineDTo.militaryVehiclePlateNo;
					break;
				case Constants.CivillianMachineType:
					vehicleNumber=machineDTo.civillianVehiclePlateNo;
					break;
				default: 
					vehicleNumber="";
					break;
			}
			var checkDulipcateVehicle=false;
			_.each($scope.dto.machineVehicles, function(record) {
				if(record.militaryVehiclePlateNo==vehicleNumber)
					checkDulipcateVehicle=true;
				else if(record.civillianVehiclePlateNo==vehicleNumber)
					checkDulipcateVehicle=true;
				else 
					checkDulipcateVehicle=false;
			});
			
			
			if(checkDulipcateVehicle && $scope.newMachineDTO.isAdd)
				$scope.$root.infoDialog("Duplicate Vehicle Entered, Please enter correct Number");
			else if(checkMiliaryOptionIsVaild || checkCivillianOptionIsVaild)
			{	
				var machineDTO=AccidentService.getMachinesDTO($scope.dto.machineVehicles,$scope.newMachineDTO.id);
				if($scope.newMachineDTO.isAdd)
				{
					$scope.newMachineDTO.id=$scope.dto.machineVehicles.length+1;
					$scope.newMachineDTO.machineTypeId=$scope.newMachineDTO.machineType.id;
					machineDTO={id:0,machineTypeId:0};
					AccidentService.mapAccidentMachineProperties($scope.newMachineDTO,machineDTO);
					$scope.dto.machineVehicles.push(machineDTO);
					machineCounter++;
					$scope.newMachineDTO={};
					$scope.newMachineDTO={machineType:{id:Constants.MilitaryMachineType}};
					$scope.vehicle="";
					$scope.vehicles={ };
					
				}else
				{
			
					AccidentService.mapAccidentMachineProperties($scope.newMachineDTO,machineDTO);
					$scope.newMachineDTO={};		
					$scope.vehicles={ };	
				}
			}
		};
		
		$scope.$watch('newMachineDTO.militaryVehiclePlateNo', function (newValue, oldValue, scope) {
				if(!angular.isUndefined(newValue)&& newValue!=null)		
					$scope.getVehicle(newValue);		
		}, true);
	
	  $scope.removeMachine= function()
	   {
		  var deleteMachineVehiclesData=[];
		  var i = $scope.dto.machineVehicles.length;
	    	while (i--)
	    	{
	    		if ($scope.checkboxes.machineRecords[$scope.dto.machineVehicles[i].id]) 
	    		{
	    			deleteMachineVehiclesData.push($scope.dto.machineVehicles[i]);
	    			$scope.dto.machineVehicles.splice(i, 1);
	    		}
	    	}
			$scope.machineDTO.deleteMachineVehicles=deleteMachineVehiclesData;
	    	if($scope.dto.machineVehicles.length == 0)
	    	{
	    		$scope.checkboxes = {machineRecords:{},allMachine:false};
	    	}
		};
		
		$scope.saveMachine=function()
		{
			if(angular.isUndefined($scope.machineDTO.machineFlag)||$scope.machineDTO.machineFlag=="")
			{
				$scope.$root.infoDialog("Please choose if vehicle is serviceable and roadworthy");
				}else 	if ($scope.machineDTO.machineFlag==Constants.FLAG_NO && angular.isUndefined($scope.machineDTO.remarks))	
				{
					$scope.$root.infoDialog("Please enter remarks");	
				}else
				{
					$scope.machineDTO.accidentId=$scope.reportDTO.id;
					$scope.machineDTO.machineVehicles=$scope.dto.machineVehicles;
					var saveAccidentMachinePromose=AccidentService.saveAccidentMachine($scope.machineDTO);
					 $q.all([saveAccidentMachinePromose]).then(function(data) 
					{
							$scope.reportDTO.accidentReportStatus="Updated";
						 $scope.$root.infoDialog(JSON.stringify(data[0]));	 
						$scope.machineDTO.deleteMachineVehicles=[];
						
					 });
			
				
			}	
		};
		//Machine Tab End Line=================================================== 
		
		//Medium Tab Start Line=================================================== 	
		$scope.saveMedium=function()
		{		
			if(angular.isUndefined($scope.mediumDTO.mediumFlag))
			{
				$scope.$root.infoDialog("Please choose contributing factor");	
			}else if (!angular.isUndefined($scope.mediumDTO.mediumFlag)&&$scope.mediumDTO.mediumFlag==Constants.FLAG_YES&&angular.isUndefined($scope.mediumDTO.medFlagRemarks))
			{
				$scope.$root.infoDialog("Please enter contributing factor remarks");	
			}else{
			
		
				var accidentServiceSavePromise=AccidentService.saveAccidentMedium($scope.mediumDTO);
					$q.all([accidentServiceSavePromise]).then(function(data) 
					{
						$scope.reportDTO.accidentReportStatus="Updated";
						$scope.$root.infoDialog(data[0]);		
					});
				}	
		};
		$scope.saveManagement=function()
		{
			var checkAuthorizedIsValid=false;
			var checkBriefingIsValid=false;
			var checkVehComIsValid=false;
			var checkFindingIsValid=false;
				
			if(angular.isUndefined($scope.managementDTO.authorizedFlag)||$scope.managementDTO.authorizedFlag=="")
			{	
			 checkAuthorizedIsValid=false;
			 $scope.$root.infoDialog("Please choose if detail is authorized");				
			}else
			{
				 if($scope.managementDTO.authorizedFlag==Constants.FLAG_YES)
					{
						if(angular.isUndefined($scope.managementDTO.mtRacBy)||$scope.managementDTO.mtRacBy=="")
						{
							 checkAuthorizedIsValid=false;
							$scope.$root.infoDialog("Please enter MT RAC signed by");
						}else
						{
						 checkAuthorizedIsValid=true;
						}
						}else
						{
							 checkAuthorizedIsValid=true;
						}			
			}
			if(angular.isUndefined($scope.managementDTO.safetyBriefFlag)||$scope.managementDTO.safetyBriefFlag=="")
		 	{
			 checkBriefingIsValid=false;
				$scope.$root.infoDialog("Please choose if there is road safety briefing");
			}else
			{
			if($scope.managementDTO.safetyBriefFlag==Constants.FLAG_YES )
			{
				if(angular.isUndefined($scope.managementDTO.safetyBriefBy)||$scope.managementDTO.safetyBriefBy=="")
				{		
					checkBriefingIsValid=false;
					$scope.$root.infoDialog("Please enter briefing done by");
				}else if(angular.isUndefined($scope.managementDTO.safetyBriefDate)||$scope.managementDTO.safetyBriefDate==null)
				{
					 checkBriefingIsValid=false;
					$scope.$root.infoDialog("Please choose briefing done date");			
				}else
				{		 
					checkBriefingIsValid=true;
				}
			}else
			{
				checkBriefingIsValid=true;	
			}			
		}
			if(angular.isUndefined($scope.managementDTO.vehicleCommanderFlag)||$scope.managementDTO.vehicleCommanderFlag=="")
			{
			 checkVehComIsValid=false;
					$scope.$root.infoDialog("Please choose if there is vehicle commander");
			}else
			{
				if($scope.managementDTO.vehicleCommanderFlag==Constants.FLAG_YES )
				{
					if(angular.isUndefined($scope.managementDTO.vehicleCommanderNameNRIC)||$scope.managementDTO.vehicleCommanderNameNRIC=="")
					{
						 checkVehComIsValid=false;
						 $scope.$root.infoDialog("Please enter vehicle commander name or Nric");
					} else if(angular.isUndefined($scope.managementDTO.vehicleCommanderContactNumber)||$scope.managementDTO.vehicleCommanderContactNumber=="")
						{
							 checkVehComIsValid=false;
							$scope.$root.infoDialog("Please enter vehicle commander's contact number");
						}else if(angular.isUndefined($scope.managementDTO.vehicleCommanderUnitCode)||$scope.managementDTO.vehicleCommanderUnitCode=="")
						{
							 checkVehComIsValid=false;
							$scope.$root.infoDialog("Please enter vehicle commander's unit name or unit code");
						}else
						{	
							checkVehComIsValid=true;
						}
						}else{
							 checkVehComIsValid=true;	
						}
					}
				 	if(angular.isUndefined($scope.managementDTO.managementFlag)||$scope.managementDTO.managementFlag=="")
					{
				 		checkFindingIsValid=false;
						$scope.$root.infoDialog("Please choose management contribute factor");
					
						
					}else if(!angular.isUndefined($scope.managementDTO.managementFlag)&&$scope.managementDTO.managementFlag==Constants.FLAG_YES)
					{
			
						if(angular.isUndefined($scope.managementDTO.managementFlagRemarks)||$scope.managementDTO.managementFlagRemarks==""){
							$scope.$root.infoDialog("Please enter management contribute factor remarks");
							checkFindingIsValid=false;
						}else{
							checkFindingIsValid=true;
						}
					}else
					{
						checkFindingIsValid=true;
					}
				 if(checkAuthorizedIsValid && checkBriefingIsValid && checkVehComIsValid && checkFindingIsValid)
				 {
					if(!angular.isUndefined($scope.reportDTO.accidentNo))
					{
			
						var  saveManagementPromise=AccidentService.saveAccidentManagement($scope.managementDTO);
						$q.all([saveManagementPromise]).then(function(data)
						{
							$scope.reportDTO.accidentReportStatus="Updated";
							$scope.$root.infoDialog(data[0]);
						});		
				}
			}
		};	
		//Medium Tab End Line=================================================== 
		
		//Attachment Tab Start Line=================================================== 

		$scope.checkAllAccidentStatements = function() 
		{
			_.each($scope.accidentStatements, function(accidentStatement)
			{
				$scope.checkboxes.accidentStatementsRecords[accidentStatement.accidentFileId] = $scope.checkboxes.allAccidentStatements;		
			});
		};
		$scope.checkAllAccidentSemantics=function()
		{
		_.each($scope.accidentSemanticss, function(accidentSemantics) 
		{
			$scope.checkboxes.accidentSemanticsRecords[accidentSemantics.accidentFileId] = $scope.checkboxes.allSemantics;	
		});
		};	
		$scope.allTransponderLogData=function()
		{
			_.each($scope.accidentTransponderLogs, function(accidentTransponderLog)
			{
				$scope.checkboxes.accidentTransponderLogRecords[accidentTransponderLog.accidentFileId] = $scope.checkboxes.allTransponderLogData;
			});
		};
		
		$scope.showUploadStatementModal = function() {
			
			$scope.showModalAndDialog(Constants.STATEMENT);
		};
		
		$scope.showuUploadAccidentPhotographsModal = function() {
			
			$scope.showModalAndDialog(Constants.ACCIDENTPHOTOGRAPHS);
		};
		$scope.showUploadSemanticsModal = function() {
			
			$scope.showModalAndDialog(Constants.SEMANTICS);
		};
		$scope.uploadTransponderLog = function() {
			$scope.showModalAndDialog(Constants.TRANSPONDERLOGFILE);
		};
		$scope.deleteStatementFile = function() 
		{
			$scope.deleteAttachmentFiles(Constants.STATEMENT);
		}

		$scope.deleteAccidentPhotographFile = function() 
		{
			$scope.deleteAttachmentFiles(Constants.ACCIDENTPHOTOGRAPHS);
			
		};
		
		$scope.deleteSemanticsFile = function() 
		{
			$scope.deleteAttachmentFiles(Constants.SEMANTICS);
		};
		$scope.deleteTransponderLogData = function() 
		{
			$scope.deleteAttachmentFiles(Constants.TRANSPONDERLOGFILE);
		};
		$scope.deleteAttachmentFiles = function(fileType) 
		{
			// for eachCategory get the Id of the file then store in the data variable
			// The id of the file is get from when on the UI , the check box are checked then press the deleted button
	 	
				var data=[];
				switch(fileType)
				{
					case Constants.STATEMENT:
						_.each($scope.accidentStatements, function(accidentStatement) 
							{
								if($scope.checkboxes.accidentStatementsRecords[accidentStatement.accidentFileId])
									data.push(accidentStatement.accidentFileId);	
				});		
						break;
					case Constants.ACCIDENTPHOTOGRAPHS:
						_.each($scope.accidentPhotographs, function(accidentPhotograph) 
						{
							if($scope.checkboxes.accidentPhotographRecords[accidentPhotograph.accidentFileId])
								data.push(accidentPhotograph.accidentFileId);	
						});
						break;
					case Constants.SEMANTICS:
						_.each($scope.accidentSemanticss, function(accidentSemantics) 
							{	
							if($scope.checkboxes.accidentSemanticsRecords[accidentSemantics.accidentFileId])
								data.push(accidentSemantics.accidentFileId);
							});
						break;
					case Constants.TRANSPONDERLOGFILE:
						_.each($scope.accidentTransponderLogs, function(accidentTransponderLog) {
							
							if($scope.checkboxes.accidentTransponderLogRecords[accidentTransponderLog.accidentFileId])
								data.push(accidentTransponderLog.accidentFileId);
						});
						break;
					default:
						break;	
				}
				
				$scope.newAttachmentListDTO.accidentFileIds=data; 
				$scope.newAttachmentListDTO.fileType=fileType;
				if($scope.newAttachmentListDTO.accidentFileIds.length==0){
					$scope.$root.infoDialog('Please select at least one record.');
					}else{
						var deleteAccidentFilePromise=AccidentService.deleteAccidentFile($scope.newAttachmentListDTO) ;
						$q.all([deleteAccidentFilePromise]).then(function(data)
						{
							$scope.$root.infoDialog(data[0]);
							switch(fileType)
							{
								case Constants.STATEMENT:
									$scope.loadUploadedStatementFile();
									$scope.checkboxes.allAccidentStatements=false;
									break;
									
								case Constants.ACCIDENTPHOTOGRAPHS:
									$scope.loadUploadedAccidentPhotographFile();
									$scope.checkboxes.allAccidentPhotograph=false;
									break;
									
								case Constants.SEMANTICS:
									$scope.loadUploadedAccidentSemanticsFile();
									$scope.checkboxes.allSemantics=false;
									break;
								case Constants.TRANSPONDERLOGFILE:
									$scope.loadUploadedAccidentTransponderLogFile();
									$scope.checkboxes.allTransponderLogData=false;
									break;
									
								default:
									break;	
								
							}
						});
					}
		};
		
		$scope.showModalAndDialog=function(filetype){
			$scope.newAttachmentDTO.fileDescription = "";
				$scope.newAttachmentDTO.fileType=filetype;
				$scope.fileType=filetype.replace("_"," ").replace("_"," ");
				$('#addFileModal').modal();
		};
		$scope.uploadFile = function(file, errFiles)
		{
			if (file)
			{
				if((file.size/1000)>Constants.UPLOAD_MAX_FILE_SIZE){
					$scope.$root.infoDialog(file.name+" File Size Exceeded.");	
				}else{
					file.upload = Upload.upload(
					{
						url : Constants.BASE_URL + "/accident/saveOrUpdateAccidentFile",
						method : 'POST',
						headers: { authorization: $scope.$root.session.token },
						enctype: 'multipart/form-data',
						processData: false,
					   contentType: false,
					   data :
					   {	file : file,headers: { authorization: $scope.$root.session.token }, 
						   accidentId : $scope.reportDTO.id, accidentNumber:$scope.reportDTO.accidentNo,
						   fileDescription : $scope.newAttachmentDTO.fileDescription,
						   fileType:$scope.newAttachmentDTO.fileType 
						}
					});
					file.upload.then(function(response) 
					{
						$timeout(function() 
						{
							$scope.newAttachmentDTO.fileDescription = "";
							if (response.data === 'error') 
							{
								$scope.$root.infoDialog($scope.newAttachmentDTO.fileType+" File  fail to upload!");
							} else 
							{
								$scope.$root.infoDialog($scope.newAttachmentDTO.fileType.replace("_"," ").replace("_"," ")+" "+response.data);					
								switch($scope.newAttachmentDTO.fileType)
								{
								case Constants.STATEMENT:
									$scope.loadUploadedStatementFile();
									break;
									
								case Constants.ACCIDENTPHOTOGRAPHS:
									$scope.loadUploadedAccidentPhotographFile();
									break;
									
								case Constants.SEMANTICS:
									$scope.loadUploadedAccidentSemanticsFile();
									break;
									
								case Constants.TRANSPONDERLOGFILE:
									$scope.loadUploadedAccidentTransponderLogFile();
									break;
									
								default:
									break;	
								}										
							}
						});
					});		
				}
			}
		};
		
		
///=== 
		$scope.loadUploadedAccidentTransponderLogFile = function() {
			$scope.loadAttachement(Constants.TRANSPONDERLOGFILE);
		};
		
		$scope.loadUploadedAccidentSemanticsFile = function() {
			$scope.loadAttachement(Constants.SEMANTICS);
		};
		$scope.loadUploadedAccidentPhotographFile = function() {

			$scope.loadAttachement(Constants.ACCIDENTPHOTOGRAPHS);
		};
		
		$scope.loadUploadedStatementFile = function() {
			$scope.loadAttachement(Constants.STATEMENT);
		};
		$scope.loadAttachement = function(fileType) {
			$scope.newAccidentFileDTO.fileType=fileType;
			var getAccidentStatementFilePromise= AccidentService.getAccidentStatementFile($scope.newAccidentFileDTO);
			$q.all([getAccidentStatementFilePromise	]).then(function(data) {
				switch(fileType)
				{
					case Constants.STATEMENT:
						$scope.accidentStatements=data[0];
						break;
						
					case Constants.ACCIDENTPHOTOGRAPHS:
						$scope.accidentPhotographs=data[0];
						break;
						
					case Constants.SEMANTICS:
						$scope.accidentSemanticss=data[0];
						break;
						
					case Constants.TRANSPONDERLOGFILE:
						$scope.accidentTransponderLogs=data[0];
						break;
				}
			});

		};		
		//Attachment Tab End Line================================================
		//Conclusion Tab Start Line================================================
		$scope.saveAccidentCauses=function()
		{
			if(angular.isUndefined($scope.causesDTO.vehicleCommanderNeglience)||$scope.causesDTO.vehicleCommanderNeglience=="")
			{
				$scope.$root.infoDialog("Please Choose Vehicle Commander Negligent");	
			}else if (angular.isUndefined($scope.causesDTO.safDriverNeglience)||$scope.causesDTO.safDriverNeglience=="")
			{
				$scope.$root.infoDialog("Please Choose SAF Transport Operator Negligent");
			}else if (angular.isUndefined($scope.causesDTO.groundControllerNeglience)||$scope.causesDTO.groundControllerNeglience=="")
			{
				$scope.$root.infoDialog("Please Choose Ground Commander Negligent");	
			}else if(angular.isUndefined($scope.causesDTO.nonSafTransportOperatorsNeglience)||$scope.causesDTO.nonSafTransportOperatorsNeglience=="")
			{
				$scope.$root.infoDialog("Please Choose Non-SAF Transport Operator Negligent");		
			}else 
			{

				var  saveManagementPromise=AccidentService.saveAccidentCauses($scope.causesDTO);
				$q.all([saveManagementPromise]).then(function(data) 
				{
					$scope.$root.infoDialog(data[0]);
				});		
			}
		};
		
		$scope.saveAccidentConculsion=function()
		{

			var  saveAccidentConclusionPromise=AccidentService.saveAccidentConclusion($scope.conclusionDTO);
				$q.all([saveAccidentConclusionPromise]).then(function(data) 
				{
					$scope.$root.infoDialog(data[0]);
				});	
		}
		
		//Conclusion Tab End Line================================================
		
		//Annex Tab Start Line================================================
		$scope.checkAllFIR=function()
		{
			_.each($scope.FIRs, function(FIR) 
			{
				$scope.checkboxes.FIRs[FIR.accidentFileId]=$scope.checkboxes.allFIR;	
			});
		};
		$scope.checkAllBOI=function()
		{
			_.each($scope.BOIs, function(boi) 
			{
			$scope.checkboxes.BOIs[boi.accidentFileId]=$scope.checkboxes.allBOI;			
			});
		};
		$scope.checkAllpoliceReport=function()
		{
			_.each($scope.policeReports, function(policeReport) 
			{
				$scope.checkboxes.policeReports[policeReport.accidentFileId]=$scope.checkboxes.allPoliceReport;
			});
		};
		
		$scope.uploadFIR = function() 
		{
			$scope.showAnnexUploadFile(Constants.FIR);
		};
		$scope.uploadBOI = function() {
			$scope.showAnnexUploadFile(Constants.BOI);
		};
		$scope.uploadPoliceReport = function() {
			
			$scope.showAnnexUploadFile(Constants.POLICEREPORT);
		};
		$scope.deleteFirFile = function() {
			$scope.deleteAnnexFile(Constants.FIR);
		};
		$scope.deleteBoiFile = function() 
		{
			$scope.deleteAnnexFile(Constants.BOI);		
		};
		$scope.deletePoliceReport= function() 
		{
			$scope.deleteAnnexFile(Constants.POLICEREPORT);	
		};
		$scope.deleteAnnexFile = function(fileType) 
		{
			var data=[];
			switch(fileType)
			{
			case Constants.FIR:
				_.each($scope.FIRs, function(FIR)
				{
					if($scope.checkboxes.FIRs[FIR.accidentFileId])
						data.push(FIR.accidentFileId);
							
				});
				break;
			case Constants.BOI:
				_.each($scope.BOIs, function(boi) 
				{
					if($scope.checkboxes.BOIs[boi.accidentFileId])
							data.push(boi.accidentFileId);
				});
				break;
			case Constants.POLICEREPORT :
				_.each($scope.policeReports, function(policeReport) 
				{		
					if($scope.checkboxes.policeReports[policeReport.accidentFileId])
						data.push(policeReport.accidentFileId);	
				});
				break;
			default:
				data=[];
				break;
				}
				$scope.newAnnexDTO.accidentFileIds=data; 
				$scope.newAnnexDTO.fileType=fileType;
					if($scope.newAnnexDTO.accidentFileIds.length==0)
					{
						$scope.$root.infoDialog('Please select at least one record.');
					}else
					{
						var deleteAccidentFilePromise=AccidentService.deleteAccidentFile($scope.newAnnexDTO) ;
							$q.all([deleteAccidentFilePromise]).then(function(data) 
							{
								$scope.$root.infoDialog(data[0]);
								switch(fileType)
								{
									case Constants.FIR:
										$scope.loadUploadedAccidentFirFile();
										$scope.checkboxes.allFIR=false;
										break;
									case Constants.BOI:
										$scope.loadUploadedAccidentBOIFile();
										$scope.checkboxes.allBOI=false;
										break;
									case Constants.POLICEREPORT :
										$scope.loadUploadedAccidentPoliceReportFile();
										$scope.checkboxes.allPoliceReport=false;
										break;
								}
						   });
					}	
			};
		
	$scope.uploadAnnexFile = function(file, errFiles) {

			if (file) {
				if((file.size/1000)>Constants.UPLOAD_MAX_FILE_SIZE)
				{
					$scope.$root.infoDialog(file.name+" File Size Exceeded.");	
				}else{
					
					file.upload = Upload.upload(
							{
								url : Constants.BASE_URL + "/accident/saveOrUpdateAccidentFile",
								method : 'POST',
								headers: { authorization: $scope.$root.session.token },
								enctype: 'multipart/form-data',
								processData: false,
								contentType: false,
								data : {file : file, accidentId : $scope.reportDTO.id,accidentNumber:$scope.reportDTO.accidentNo, fileDescription : 	$scope.newAnnexDTO.fileDescription, fileType:$scope.newAnnexDTO.fileType }
										});
					file.upload.then(function(response)
					{
						$timeout(function() {
							$scope.newAnnexDTO.fileDescription = "";
							if (response.data === 'error')
							{
								$scope.$root.infoDialog($scope.newAnnexDTO.fileType+" File  fail to upload!");
							} else {
								$scope.$root.infoDialog($scope.newAnnexDTO.fileType.replace("_"," ").replace("_"," ")+" "+response.data);
								switch($scope.newAnnexDTO.fileType)
								{
									case Constants.FIR:
										$scope.loadUploadedAccidentFirFile();
										break;
									case Constants.BOI:
										$scope.loadUploadedAccidentBOIFile();
										break;
									case Constants.POLICEREPORT:
										$scope.loadUploadedAccidentPoliceReportFile();
										break;
									}
								}
							});
						});
				
					}
				}
			};
		
		$scope.showAnnexUploadFile=function(filetype){	
			$scope.newAnnexDTO.fileType=filetype;
			$scope.newAnnexDTO.fileDescription="";
			$scope.AnnexFileType=filetype.replace("_"," ").replace("_"," ");
			$('#addAnnexFileModal').modal();
		};
		
		$scope.loadAnnexFile = function(fileType) 
		{	
		
			$scope.newAnnexDTO.fileType=fileType;
			var getFIRPromise= AccidentService.getAccidentStatementFile($scope.newAnnexDTO);
					$q.all([getFIRPromise]).then(function(data) 
					{
						switch(fileType)
						{
							case Constants.FIR:
								$scope.FIRs=data[0];
								break;
							case Constants.BOI:
								$scope.BOIs=data[0];
								break;
							case Constants.POLICEREPORT:
								$scope.policeReports=data[0];
								break;
							}	
					});
		};			
		$scope.loadUploadedAccidentFirFile = function()
		{
			$scope.loadAnnexFile(Constants.FIR);
			};	
		$scope.loadUploadedAccidentBOIFile = function()
		{
			$scope.loadAnnexFile(Constants.BOI);
			};	
		$scope.loadUploadedAccidentPoliceReportFile = function()
		{
				$scope.loadAnnexFile(Constants.POLICEREPORT);
		};				
	//Annex Tab E Line================================================
});


app.controller('AccidentMasterDataController', function($q, $scope,$filter,AccidentService, CommonService, Constants) {
	if(!$scope.$root.checkAccessRights('manageAccidentMasterData')){return;}
	var  locationTypesCounter=1;
	var  collisionTypesCounter=1;
	var  manoeuvreTypeCounter=1;
	var  roadTypeCounter=1;
	var  roadSurfacesCounter=1;
	var  roadFeaturesCounter=1;
	var  pointErrorCounter=1;
	var  systemErrorCounter=1;
	var  speedLimitCounter=1;
	var  categoryCounter=1;
	var  injuryDegreeCounter=1;
	var weathersCounter=1;
	var trafficsCounter=1;
	var visibilityCounter=1;
	var collisionObjectCounter=1;
	var civilianVehicleObjectCounter=1;
	$scope.dto={locationTypes:[],collisionTypes:[],manoeuvreTypes:[],roadTypes:[],roadSurfaces:[],roadFeatures:[],pointErrors:[],systemErrors:[],speedLimits:[],categorys:[],injuryDegrees:[],weathers:[],traffics:[],visibilities:[],collisionObjects:[]};
	$scope.searchDTO={reportLocationType:0,reportCollisionTypeId:0,reportCollisionTypeId:0,reportManoevureId:0,roadTypesId:0,roadSurface:0,roadFeaturesId:0,pointErrorsId:[],systemErrorsId:[],roadSpeedLimitId:0,accidentCategory:0,manPersonnelInjury:0,manInjury:0,machineWeather:0,trafficVolumeId:0,visibilityId:0,civillianMachineType:0};
	var DeleteErrorMessage="Record has been used by existing data";
	var DeleteMessage="Record is Deleted";
	var getAccidentLocationTypesPromise=AccidentService.getAccidentLocationTypes();
	var getAccidentCollisionTypesPromise=AccidentService.getAccidentCollisionTypes(); 
	var getAccidentManoeuvreTypesPromise=AccidentService.getAccidentManoeuvreTypes();
	var getAccidentRoadTypesPromise= AccidentService.getAccidentRoadTypes();
	var getAccidentRoadSurfacesPromise= AccidentService.getAccidentRoadSurfaces();
	var getAccidentRoadFeaturesPromise= AccidentService.getAccidentRoadFeatures();
	var getAccidentPointErrorsPromise=AccidentService.getAccidentPointErrors();
	var getAccidentSystemErrorsPromise=AccidentService.getAccidentSystemErrors();
	var getAccidentSpeedLimitsPromise= AccidentService.getAccidentSpeedLimits();
	var getAccidentCategoriesPromise=AccidentService.getAccidentCategories();
	var getAccidentInjuryDegreesPromise=AccidentService.getAccidentInjuryDegrees();	
	var getAccidentWeathersPromise= AccidentService.getAccidentWeathers();
	var getAccidentTrafficVolumesPromise= AccidentService.getAccidentTrafficVolumes();
	var getAccidentVisibilitiesPromise= AccidentService.getAccidentVisibilities();
	var getCollisionObjectPromise= AccidentService.getAccidentCollisionObject();
	var getCivilianVehiclePromise=AccidentService.getCivilianVehicleType();
	// for each of the master list, use _.each to store the each returned data array object in each respective $scope.dto sub variable
	$q.all([getAccidentLocationTypesPromise,getAccidentCollisionTypesPromise,getAccidentManoeuvreTypesPromise,getAccidentRoadTypesPromise,getAccidentRoadSurfacesPromise,getAccidentRoadFeaturesPromise,getAccidentPointErrorsPromise,getAccidentSystemErrorsPromise,getAccidentSpeedLimitsPromise,getAccidentCategoriesPromise,getAccidentInjuryDegreesPromise,getAccidentWeathersPromise,getAccidentTrafficVolumesPromise,getAccidentVisibilitiesPromise,getCollisionObjectPromise,getCivilianVehiclePromise]).then(function(data)
	{
			_.each(data[0], function(record) 
			{ 
				$scope.locationType={id:record.id,name:record.name,counterId:locationTypesCounter};
				var locationTypesDTO=AccidentService.getLocationTypesDTO($scope.dto.locationTypes,$scope.locationType.counterId);
					locationTypesDTO={id:0,name:"",counterId:locationTypesCounter};
				locationTypesCounter++;
				AccidentService.maplocationTypesProperties($scope.locationType,locationTypesDTO);
				$scope.dto.locationTypes.push(locationTypesDTO);	
			});
			_.each(data[1], function(record) 
			{ 
				$scope.collisionType={id:record.id,name:record.name,counterId:collisionTypesCounter};
				var collisionTypeDTO=AccidentService.getCollisionTypesDTO($scope.dto.collisionTypes,$scope.collisionType.counterId);
					collisionTypeDTO={id:0,name:"",counterId:collisionTypesCounter};
				collisionTypesCounter++;
				AccidentService.mapCollisionProperties($scope.collisionType,collisionTypeDTO);
				$scope.dto.collisionTypes.push(collisionTypeDTO);	
			});
			_.each(data[2], function(record) 
			{ 
				$scope.manoeuvreType={id:record.id,name:record.name,counterId:manoeuvreTypeCounter};
				var manoeuvreTypeDTO=AccidentService.getManoeuvreTypesDTO($scope.dto.manoeuvreTypes,$scope.manoeuvreType.counterId);
					manoeuvreTypeDTO={id:0,name:"",counterId:manoeuvreTypeCounter};
				manoeuvreTypeCounter++;
				AccidentService.mapManoeuvreTypeProperties($scope.manoeuvreType,manoeuvreTypeDTO);
				$scope.dto.manoeuvreTypes.push(manoeuvreTypeDTO);	
				});
			_.each(data[3], function(record) 
			{ 
				$scope.roadType={id:record.id,name:record.name,counterId:roadTypeCounter};
				var roadTypeDTO=AccidentService.getRoadTypesDTO($scope.dto.roadTypes,$scope.roadType.counterId);
					roadTypeDTO={id:0,name:"",counterId:roadTypeCounter};
				roadTypeCounter++;
				AccidentService.mapRoadTypesProperties($scope.roadType,roadTypeDTO);
				$scope.dto.roadTypes.push(roadTypeDTO);	
				});
			_.each(data[4], function(record) 
			{ 
				$scope.roadSurfaces={id:record.id,name:record.name,counterId:roadSurfacesCounter};
				var roadSurfacesDTO=AccidentService.getRoadSurfacesDTO($scope.dto.roadSurfaces,$scope.roadSurfaces.counterId);
					roadSurfacesDTO={id:0,name:"",counterId:roadSurfacesCounter};
				roadSurfacesCounter++;
				AccidentService.mapRoadSurfacesProperties($scope.roadSurfaces,roadSurfacesDTO);
				$scope.dto.roadSurfaces.push(roadSurfacesDTO);	
			});
			_.each(data[5], function(record) 
			{ 
				$scope.roadFeatures={id:record.id,name:record.name,counterId:roadFeaturesCounter};
				var roadFeaturesDTO=AccidentService.getRoadFeaturesDTO($scope.dto.roadFeatures,$scope.roadFeatures.counterId);
					roadSurfacesDTO={id:0,name:"",counterId:roadFeaturesCounter};
				roadFeaturesCounter++;
				AccidentService.mapRoadSurfacesProperties($scope.roadFeatures,roadSurfacesDTO);
				$scope.dto.roadFeatures.push(roadSurfacesDTO);
			});
			_.each(data[6], function(record) 
			{ 
				$scope.pointError={id:record.id,name:record.name,counterId:pointErrorCounter};
				var pointErrorDTO=AccidentService.getPointErrorDTO($scope.dto.pointErrors,$scope.pointError.counterId);
					pointErrorDTO={id:0,name:"",counterId:pointErrorCounter};
				pointErrorCounter++;
				AccidentService.mapPointErrorProperties($scope.pointError,pointErrorDTO);
				$scope.dto.pointErrors.push(pointErrorDTO);	
			});
			_.each(data[7], function(record) 
			{ 
				$scope.systemError={id:record.id,name:record.name,counterId:systemErrorCounter};
				var systemErrorDTO=AccidentService.getSystemErrorDTO($scope.dto.systemErrors,$scope.pointError.counterId);
					systemErrorDTO={id:0,name:"",counterId:systemErrorCounter};
				systemErrorCounter++;
				AccidentService.mapSystemErrorProperties($scope.systemError,systemErrorDTO);
				$scope.dto.systemErrors.push(systemErrorDTO);	
			});
			_.each(data[8], function(record) 
			{ 
				$scope.speedLimit={id:record.id,name:record.name,counterId:speedLimitCounter};
				var speedLimitDTO=AccidentService.getSpeedLimitDTO($scope.dto.speedLimits,$scope.speedLimit.counterId);
					speedLimitDTO={id:0,name:"",counterId:speedLimitCounter};
				speedLimitCounter++;
				AccidentService.mapRoadSurfacesProperties($scope.speedLimit,speedLimitDTO);
				$scope.dto.speedLimits.push(speedLimitDTO);	
			});
			_.each(data[9], function(record) 
			{ 	
				$scope.category={id:record.id,name:record.name,counterId:categoryCounter};
				var categoryDTO=AccidentService.getCategoryDTO($scope.dto.categorys,$scope.category.counterId);
					categoryDTO={id:0,name:"",counterId:categoryCounter};
				categoryCounter++;
				AccidentService.mapCategoryProperties($scope.category,categoryDTO);
				$scope.dto.categorys.push(categoryDTO);	
			});
			_.each(data[10], function(record) 
			{ 	
				$scope.injuryDegrees={id:record.id,name:record.name,counterId:injuryDegreeCounter};
				var injuryDegreesDTO=AccidentService.getInjuryDegreeDTO($scope.dto.injuryDegrees,$scope.injuryDegrees.counterId);
					injuryDegreesDTO={id:0,name:"",counterId:injuryDegreeCounter};
				injuryDegreeCounter++;
				AccidentService.mapInjuryDegreeProperties($scope.injuryDegrees,injuryDegreesDTO);
				$scope.dto.injuryDegrees.push(injuryDegreesDTO);		
			});	
			_.each(data[11], function(record) 
			{ 	
					$scope.weathers={id:record.id,name:record.name,counterId:weathersCounter};
					var weathersDTO=AccidentService.getWeathersDTO($scope.dto.weathers,$scope.weathers.counterId);
						weathersDTO={id:record.id,name:record.name,counterId:weathersCounter};
					weathersCounter++;
					AccidentService.mapWeathersProperties($scope.weathers,weathersDTO);
					$scope.dto.weathers.push(weathersDTO);			
			});		
			_.each(data[12], function(record) 
			{ 	
					$scope.traffics={id:record.id,name:record.name,counterId:trafficsCounter};
					var trafficsDTO=AccidentService.getTrafficsDTO($scope.dto.traffics,$scope.traffics.counterId);
						trafficsDTO={id:0,name:"",counterId:trafficsCounter};
					trafficsCounter++;
					AccidentService.mapTrafficsProperties($scope.traffics,trafficsDTO);
					$scope.dto.traffics.push(trafficsDTO);					
			});	
			_.each(data[13], function(record){
				
				$scope.visibility={id:record.id,name:record.name,counterId:visibilityCounter};
				var visibilityDTO=AccidentService.getVisibilityDTO($scope.dto.visibilities,visibilityCounter);
					visibilityDTO={id:0,name:"",counterId:visibilityCounter};
				visibilityCounter++;
				AccidentService.mapVisibilityProperties($scope.visibility,visibilityDTO);
				$scope.dto.visibilities.push(visibilityDTO);	
										
			});	
			_.each(data[14], function(record) 
			{ 	
				$scope.collisionObject={id:record.id,name:record.name,counterId:collisionObjectCounter};
				var objectDTO=AccidentService.getCollisionObjectDTO($scope.dto.collisionObjects,collisionObjectCounter);
				objectDTO={id:0,name:"",counterId:collisionObjectCounter};
				collisionObjectCounter++;
				AccidentService.mapCollisionObjectProperties($scope.collisionObject,objectDTO);
				$scope.dto.collisionObjects.push(objectDTO);								
			});		
			
			_.each(data[15], function(record) 
			{ 	
					$scope.civilianVehicleDTO={id:record.id,name:record.name,counterId:civilianVehicleObjectCounter};
					var civilianVehicleDTO=AccidentService.getCivilianVehicleDTO($scope.dto.civilianVehicles,civilianVehicleObjectCounter);
					civilianVehicleDTO={id:0,name:"",counterId:civilianVehicleObjectCounter};
					civilianVehicleObjectCounter++;
					AccidentService.mapCivilianVehicleProperties($scope.civilianVehicleDTO,civilianVehicleDTO);
					$scope.dto.civilianVehicles.push(civilianVehicleDTO);								
			});			
	 });

	$scope.showLoctionType=function(locationId)
	{
		var locationTypesDTO=AccidentService.getLocationTypesDTO($scope.dto.locationTypes,locationId!=null?locationId:0);
		if(locationId==null)
		{					
			var counters=$scope.dto.locationTypes.length;
			$scope.locationTypeDTO={isEdit:false,id:0,name:"",counterId:counters+1};
		}else
		{
			$scope.locationTypeDTO={isEdit:true,id:locationTypesDTO.id,name:locationTypesDTO.name,counterId:locationTypesDTO.counterId};
		}
	
		$('#addEditlocationTypeModal').modal();
	}

	$scope.saveUpdatelocationType=function(counterId)
	{
		if ($scope.locationTypeDTO.name==""||angular.isUndefined($scope.locationTypeDTO.name)){
			$scope.$root.infoDialog("Please Enter location type");
		}else{
			var locationTypeDTO=AccidentService.getLocationTypesDTO($scope.dto.locationTypes,$scope.locationTypeDTO.isEdit==true?counterId:0);
			var saveUpdatePromise=AccidentService.saveUpdateAccidentLocationType($scope.locationTypeDTO);
			$q.all([saveUpdatePromise]).then(function(data)
			{
				if(!$scope.locationTypeDTO.isEdit)
				{
					var tmp=$scope.locationTypeDTO;
					locationTypeDTO={id:0,name:"",counterId:0};
					$scope.locationTypeDTO={id:data[0],name:tmp.name,counterId:tmp.counterId};
					AccidentService.maplocationTypesProperties($scope.locationTypeDTO,locationTypeDTO);
					$scope.dto.locationTypes.push(locationTypeDTO);	
				}else{
					AccidentService.maplocationTypesProperties($scope.locationTypeDTO,locationTypeDTO);
					$scope.$root.infoDialog("Location Type update successfully");
				}
			});	
		}
	}

	$scope.deleteLocation=function(locationCounterId){
		var locationTypesDTO=AccidentService.getLocationTypesDTO($scope.dto.locationTypes,locationCounterId!=null?locationCounterId:0);
		$scope.searchDTO={reportLocationType:locationTypesDTO.id};
		var deleteLocationTypePromise=AccidentService.deleteLocationType($scope.searchDTO);
		$q.all([deleteLocationTypePromise]).then(function(data)
		{				
			if(data[0]==true)
			{
				$scope.returnLocationMessage=DeleteErrorMessage;
			}
			else
			{
				$scope.dto.locationTypes.splice	((locationTypesDTO.counterId-1),1);
				$scope.returnLocationMessage=DeleteMessage;	
			}
			$('#deleteLocationModal').modal();
		});
	}
	
	$scope.showCollisionType=function(collisionTypeId)
	{
		var collisionTypeDTO=AccidentService.getCollisionTypesDTO($scope.dto.collisionTypes,collisionTypeId!=null?collisionTypeId:0);
		if(collisionTypeId==null)
		{
			var counter=$scope.dto.collisionTypes.length;
			$scope.collisionTypeDTO={isEdit:false,id:0,name:null,counterId:counter+1};
		}else
		{		
			$scope.collisionTypeDTO={isEdit:true,id:collisionTypeDTO.id,name:collisionTypeDTO.name,counterId:collisionTypeId};
	
		}
		$('#addEditcollisionTypeModal').modal();
	}
	
	$scope.saveUpdateCollisionType=function(collisionTypeId)
	{
		if ($scope.collisionTypeDTO.name==""|| angular.isUndefined($scope.collisionTypeDTO.name)){
			$scope.$root.infoDialog("Please Enter Between Moving Vehicle");
		}else{
			var collisionTypeDTO=AccidentService.getCollisionTypesDTO($scope.dto.collisionTypes,collisionTypeId!=null?collisionTypeId:0);
	
			var saveUpdateCollisionTypePromise=AccidentService.saveUpdateCollisionType($scope.collisionTypeDTO);	
			$q.all([saveUpdateCollisionTypePromise]).then(function(data)
			{
				if(!$scope.collisionTypeDTO.isEdit){
					var tmp=$scope.collisionTypeDTO;
					collisionTypeDTO={id:$scope.collisionTypeDTO.id,name:$scope.collisionTypeDTO.name,counterId:$scope.collisionTypeDTO.counterId}
					$scope.collisionTypeDTO={id:data[0],name:tmp.name,counterId:tmp.counterId};
					AccidentService.mapCollisionProperties($scope.collisionTypeDTO,collisionTypeDTO);
					$scope.dto.collisionTypes.push(collisionTypeDTO);
	
				}else{	
					AccidentService.mapCollisionProperties($scope.collisionTypeDTO,collisionTypeDTO);		
					$scope.$root.infoDialog("Between Moving Vehicle update successfully");
				}
			});
		}
	}
	
	$scope.deleteCollisionType=function(collisionTypeId){
			var collisionTypeDTO=AccidentService.getCollisionTypesDTO($scope.dto.collisionTypes,collisionTypeId!=null?collisionTypeId:0);
			$scope.searchDTO={reportCollisionTypeId:collisionTypeDTO.id};
			var deleteCollisionTypePromise=AccidentService.deleteCollisionType($scope.searchDTO);
			$q.all([deleteCollisionTypePromise]).then(function(data)
			{		
				if(data[0]==true)
				{
					$scope.collisionTypeMessage=DeleteErrorMessage;
				}
				else
				{
					$scope.collisionTypeMessage=DeleteMessage;
					$scope.dto.collisionTypes.splice((collisionTypeDTO.counterId-1),1);
				}
				$('#deleteCollisionTypeModal').modal();				
			});
	}
	$scope.showCollisionObject=function(collisionObjectId){
		var collisionObjectDTO=AccidentService.getCollisionObjectDTO($scope.dto.collisionObjects,collisionObjectId!=null?collisionObjectId:0);
		if(collisionObjectId==null)
		{
			var counter=$scope.dto.collisionObjects.length;
			$scope.collisionObjectDTO={isEdit:false,id:0,name:null,counterId:counter+1};
		}else
		{		
			$scope.collisionObjectDTO={isEdit:true,id:collisionObjectDTO.id,name:collisionObjectDTO.name,counterId:collisionObjectId};
		}
		$('#addEditCollisionObjectModal').modal();
	}
	$scope.saveUpdateCollisionObject=function(collisionObjectId)
	{
		if ($scope.collisionObjectDTO.name=="" || angular.isUndefined($scope.collisionObjectDTO.name)){
			$scope.$root.infoDialog("Please Enter Moving Vehicles Against");
		}else{
			var collisionObjectDTO=AccidentService.getCollisionObjectDTO($scope.dto.collisionObjects,$scope.collisionObjectDTO.isEdit==true?collisionObjectId:0);
			
			var saveUpdateCollisionObjectPromise=AccidentService.saveUpdateCollisionObject($scope.collisionObjectDTO);	
			$q.all([saveUpdateCollisionObjectPromise]).then(function(data)
			{
				if(!$scope.collisionObjectDTO.isEdit)
				{
					var tmp=$scope.collisionObjectDTO;
					collisionObjectDTO={isEdit:false,id:0,name:$scope.collisionObjectDTO.name,counterId:$scope.collisionObjectDTO.counterId};
					$scope.collisionObjectDTO={id:data[0],name:tmp.name,counterId:tmp.counterId};
					AccidentService.mapCollisionObjectProperties($scope.collisionObjectDTO,collisionObjectDTO);
					$scope.dto.collisionObjects.push(collisionObjectDTO);

				}else
				{	
					AccidentService.mapCollisionObjectProperties($scope.collisionObjectDTO,collisionObjectDTO);		
					$scope.$root.infoDialog("Moving Vehicles Against updated succesfully" );
				}
			});
		}
	};
	$scope.deleteCollisionObject=function(collisionObjectId)
	{
		var collisionObjectDTO=AccidentService.getCollisionObjectDTO($scope.dto.collisionObjects,collisionObjectId!=null?collisionObjectId:0);
		$scope.searchDTO={reportCollisionTypeId:collisionObjectDTO.id};
		var deleteCollisionObjectPromise=AccidentService.deleteCollisionObject($scope.searchDTO);
		$q.all([deleteCollisionObjectPromise]).then(function(data)
		{		
			if(data[0]==true){
				$scope.collisionObjectMessage=DeleteErrorMessage;
			}
			else{
				$scope.collisionObjectMessage=DeleteMessage;
				$scope.dto.collisionObjects.splice((collisionObjectDTO.counterId-1),1);
			}
			$('#deleteCollisionObjectModal').modal();			
		});
	
	}
	$scope.showManeoureType=function(maneoureTypeId)
	{
		var maneoureTypeDTO=AccidentService.getManoeuvreTypesDTO($scope.dto.manoeuvreTypes,maneoureTypeId!=null?maneoureTypeId:0);
		if(maneoureTypeId==null)
		{	
		var counters=$scope.dto.manoeuvreTypes.length;
		
			$scope.maneoureTypeDTO={isEdit:false,id:0,name:null,counterId:counters+1};
		}else
		{		
			$scope.maneoureTypeDTO={isEdit:true,id:maneoureTypeDTO.id,name:maneoureTypeDTO.name,counterId:maneoureTypeId};
		}
		$('#addEditManevoureTypeModal').modal();
	}
	
	$scope.saveUpdateManevoureType=function(maneoureTypeId)
	{
		if ($scope.maneoureTypeDTO.name==""||angular.isUndefined($scope.maneoureTypeDTO.name)){
			$scope.$root.infoDialog("Please Enter Vehicle Manoeuvre Before Accident");
		}else{
			var manevoureTypeDTO=AccidentService.getManoeuvreTypesDTO($scope.dto.manoeuvreTypes,$scope.maneoureTypeDTO.isEdit==true?maneoureTypeId:0);
			
			var saveUpdateAccidentManoeuvreTypePromise=AccidentService.saveUpdateAccidentManoeuvreType($scope.maneoureTypeDTO);	
			$q.all([saveUpdateAccidentManoeuvreTypePromise]).then(function(data)
			{
				if(!$scope.maneoureTypeDTO.isEdit)
				{
					var tmp=$scope.maneoureTypeDTO;
					manevoureTypeDTO={isEdit:false,id:0,name:$scope.maneoureTypeDTO.name,counterId:$scope.maneoureTypeDTO.counterId};
					$scope.maneoureTypeDTO={id:data[0],name:tmp.name,counterId:tmp.counterId};
					AccidentService.mapManoeuvreTypeProperties($scope.maneoureTypeDTO,manevoureTypeDTO);
					$scope.dto.manoeuvreTypes.push(manevoureTypeDTO);

				}else
				{	
					AccidentService.mapManoeuvreTypeProperties($scope.maneoureTypeDTO,manevoureTypeDTO);		
					$scope.$root.infoDialog("Vehicle Manoeuvre Before Accident	update successfully");
				}
			});	
		}
	};
	
	$scope.deleteManevoureType=function(maneoureTypeId){
		var manevoureTypeDTO=AccidentService.getManoeuvreTypesDTO($scope.dto.manoeuvreTypes,maneoureTypeId!=null?maneoureTypeId:0);
		
		$scope.searchDTO={reportManoevureId:manevoureTypeDTO.id};
		var deleteManevoureTypePromise=AccidentService.deleteManoeuvreObject($scope.searchDTO);
		$q.all([deleteManevoureTypePromise]).then(function(data)
		{		
			if(data[0]==true){
				$scope.manevoureTypeModalMessage=DeleteErrorMessage;
			}
			else{
				$scope.manevoureTypeModalMessage=DeleteMessage;
				$scope.dto.manoeuvreTypes.splice((manevoureTypeDTO.counterId-1),1);

			}
			$('#deleteManevoureTypeModal').modal();				
		});
	
	}
	
	$scope.showRoadType=function(roadTypeId)
	{
		var roadTypeDTO=AccidentService.getRoadTypesDTO($scope.dto.roadTypes,roadTypeId!=null?roadTypeId:0);
		if(roadTypeId==null)
		{
			var counters=$scope.dto.roadTypes.length;
			$scope.roadTypeDTO={isEdit:false,id:0,name:null,counterId:counters+1};
		}else
		{		
			$scope.roadTypeDTO={isEdit:true,id:roadTypeDTO.id,name:roadTypeDTO.name,counterId:roadTypeDTO.counterId};
		}
		$('#addEditRoadTypeModal').modal();
	}
	
	$scope.saveUpdateRoadType=function(roadTypeId)
	{
		if ($scope.roadTypeDTO.name==""||angular.isUndefined($scope.roadTypeDTO.name)){
			$scope.$root.infoDialog("Please Enter Road Type");
		}else{
			var roadTypeDTO=AccidentService.getRoadTypesDTO($scope.dto.roadTypes,$scope.roadTypeDTO.isEdit==true?roadTypeId:0);
			
			var saveUpdateAccidentRoadTypePromise=AccidentService.saveUpdateAccidentRoadType($scope.roadTypeDTO);	
			$q.all([saveUpdateAccidentRoadTypePromise]).then(function(data)
			{
				if(!$scope.roadTypeDTO.isEdit)
				{
					var tmp=$scope.roadTypeDTO;
					roadTypeDTO={isEdit:false,id:0,name:$scope.roadTypeDTO.name,counterId:$scope.roadTypeDTO.counterId};
					$scope.roadTypeDTO={id:data[0],name:tmp.name,counterId:tmp.counterId};
					AccidentService.mapRoadTypesProperties($scope.roadTypeDTO,roadTypeDTO);
					$scope.dto.roadTypes.push(roadTypeDTO);
				}else{	
					AccidentService.mapRoadTypesProperties($scope.roadTypeDTO,roadTypeDTO);		
					$scope.$root.infoDialog("Road Type update successfully");
				}
			});	
		}
	}
	
	$scope.deleteRoadType=function(roadTypeId){
		var roadTypeDTO=AccidentService.getRoadTypesDTO($scope.dto.roadTypes,roadTypeId!=null?roadTypeId:0);
		$scope.searchDTO={roadTypesId:roadTypeDTO.id};
		var deleteRoadTypePromise=AccidentService.deleteRoadType($scope.searchDTO);
		$q.all([deleteRoadTypePromise]).then(function(data)
		{		
		
			if(data[0]==true){
				$scope.roadTypeModalMessage=DeleteErrorMessage;
			}
			else{
				$scope.roadTypeModalMessage=DeleteMessage;
				$scope.dto.roadTypes.splice((roadTypeDTO.counterId-1),1);
			}
			$('#deleteRoadTypeModal').modal();				
		});
	
	}

	
	$scope.showRoadSurface=function(roadSurfaceId)
	{
		var roadSurfaceDTO=AccidentService.getRoadSurfacesDTO($scope.dto.roadSurfaces,roadSurfaceId!=null?roadSurfaceId:0);
		if(roadSurfaceId==null)
		{
			var counters=$scope.dto.roadSurfaces.length;
			$scope.roadSurfaceDTO={isEdit:false,id:0,name:"",counterId:counters+1};
		}else
		{		
		
			$scope.roadSurfaceDTO={isEdit:true,id:roadSurfaceDTO.id,name:roadSurfaceDTO.name,counterId:roadSurfaceId};
		}
		$('#addEditRoadSurfaceModal').modal();
		
	}
	
	$scope.saveUpdateRoadSurface=function(roadSurfaceId)
	{
		if ($scope.roadSurfaceDTO.name==""||angular.isUndefined($scope.roadSurfaceDTO.name)){
		$scope.$root.infoDialog("Please Enter Road Surface");
		}else{
			var roadSurfaceDTO=AccidentService.getRoadSurfacesDTO($scope.dto.roadSurfaces,$scope.roadSurfaceDTO.isEdit==true?roadSurfaceId:0);
			var saveUpdateAccidentRoadSurfacePromise=AccidentService.saveUpdateAccidentRoadSurface($scope.roadSurfaceDTO);	
			$q.all([saveUpdateAccidentRoadSurfacePromise]).then(function(data)
			{
				if(!$scope.roadSurfaceDTO.isEdit){
					var tmp =$scope.roadSurfaceDTO;
					roadSurfaceDTO={isEdit:false,id:0,name:$scope.roadSurfaceDTO.name,counterId:$scope.roadSurfaceDTO.counterId};
					$scope.roadSurfaceDTO={id:data[0],name:tmp.name,counterId:tmp.counterId};
					AccidentService.mapRoadSurfacesProperties($scope.roadSurfaceDTO,roadSurfaceDTO);
					$scope.dto.roadSurfaces.push($scope.roadSurfaceDTO);

				}else{	
					AccidentService.mapRoadSurfacesProperties($scope.roadSurfaceDTO,roadSurfaceDTO);		
					$scope.$root.infoDialog("Road Surface update successfully");
				}
			});
			
		}

	}	
	
	
	$scope.deleteRoadSurface=function(roadSurfaceId){
		var roadSurfaceDTO=AccidentService.getRoadSurfacesDTO($scope.dto.roadSurfaces,roadSurfaceId!=null?roadSurfaceId:0);
		
		$scope.searchDTO={roadSurface:roadSurfaceDTO.id};
		var deleteRoadSurfacePromise=AccidentService.deleteRoadSurface($scope.searchDTO);
		$q.all([deleteRoadSurfacePromise]).then(function(data)
		{		
		
			if(data[0]==true){
				$scope.roadSurfaceModalMessage=DeleteErrorMessage;
			}
			else{
				$scope.roadSurfaceModalMessage=DeleteMessage;
				$scope.dto.roadSurfaces.splice((roadSurfaceDTO.counterId-1),1);

			}
			$('#deleteRoadSurfaceModal').modal();				
		});
	
	}

	$scope.showRoadFeature=function(roadFeatureId)
	{
		var roadFeatureDTO=AccidentService.getRoadFeaturesDTO($scope.dto.roadFeatures,roadFeatureId!=null?roadFeatureId:0);
		if(roadFeatureId==null)
		{
		var counters=$scope.dto.roadFeatures.length;
			$scope.roadFeatureDTO={isEdit:false,id:0,name:null,counterId:counters+1};
		}else
		{		
			$scope.roadFeatureDTO={isEdit:true,id:roadFeatureDTO.id,name:roadFeatureDTO.name,counterId:roadFeatureId};
		}
		$('#addEditRoadFeatureModal').modal();
	}
	
	$scope.saveUpdateRoadFeature=function(roadFeatureId)
	{
		if ($scope.roadFeatureDTO.name==""||angular.isUndefined($scope.roadFeatureDTO.name)){
			$scope.$root.infoDialog("Please Enter Road Feature");
		}else{
			var roadFeatureDTO=AccidentService.getRoadFeaturesDTO($scope.dto.roadFeatures,$scope.roadFeatureDTO.isEdit==true?roadFeatureId:0);
			
			var saveUpdateAccidentRoadFeaturePromise=AccidentService.saveUpdateAccidentRoadFeature($scope.roadFeatureDTO);	
			$q.all([saveUpdateAccidentRoadFeaturePromise]).then(function(data)
			{
				if(!$scope.roadFeatureDTO.isEdit)
				{
					var tmp=$scope.roadFeatureDTO;
					roadFeatureDTO={isEdit:false,id:0,name:$scope.roadFeatureDTO.name,counterId:$scope.roadFeatureDTO.counterId};
					$scope.roadFeatureDTO={id:data[0],name:tmp.name,counterId:tmp.counterId};
					AccidentService.mapRoadFeaturesProperties($scope.roadFeatureDTO,roadFeatureDTO);
					$scope.dto.roadFeatures.push(roadFeatureDTO);

				}else
				{	
					AccidentService.mapRoadFeaturesProperties($scope.roadFeatureDTO,roadFeatureDTO);		
					$scope.$root.infoDialog("Road Feature update successfully");
				}
			});	
		}

	}	
	
	$scope.deleteRoadFeature=function(roadFeatureId){
		var roadFeatureDTO=AccidentService.getRoadFeaturesDTO($scope.dto.roadFeatures,roadFeatureId!= null?roadFeatureId:0);
		
		$scope.searchDTO={roadFeaturesId:roadFeatureDTO.id};
		var deleteRoadFeaturePromise=AccidentService.deleteRoadFeature($scope.searchDTO);
		$q.all([deleteRoadFeaturePromise]).then(function(data)
		{		
			if(data[0]==true){
				$scope.roadFeatureModalMessage=DeleteErrorMessage;
			}
			else{
				$scope.roadFeatureModalMessage=DeleteMessage;
				$scope.dto.roadFeatures.splice((roadFeatureDTO.counterId-1),1);
			}
			$('#deleteRoadFeatureModal').modal();				
		});
	
	}
	$scope.showPointError=function(pointErrorId)
	{
		var pointErrorDTO=AccidentService.getPointErrorDTO($scope.dto.pointErrors,pointErrorId!=null?pointErrorId:0);
		if(pointErrorId==null)
		{
			var counters=$scope.dto.pointErrors.length;
			$scope.pointErrorDTO={isEdit:false,id:0,name:null,counterId:counters+1};
		}else
		{		
			$scope.pointErrorDTO={isEdit:true,id:pointErrorDTO.id,name:pointErrorDTO.name,counterId:pointErrorId};
		}
		$('#addEditPointErrorModal').modal();
	}
	
	$scope.saveUpdatePointError=function(pointErrorId)
	{
		if ($scope.pointErrorDTO.name==""||angular.isUndefined($scope.pointErrorDTO.name)){
			$scope.$root.infoDialog("Please Enter Point Error");
		}else{
			var pointErrorDTO=AccidentService.getPointErrorDTO($scope.dto.pointErrors,$scope.pointErrorDTO.isEdit==true?pointErrorId:0);
			
			var saveUpdateAccidentPointErrorPromise=AccidentService.saveUpdateAccidentPointError($scope.pointErrorDTO);	
			$q.all([saveUpdateAccidentPointErrorPromise]).then(function(data)
			{
				if(!$scope.pointErrorDTO.isEdit)
				{
					var tmp=$scope.pointErrorDTO;
					pointErrorDTO={isEdit:false,id:0,name:$scope.pointErrorDTO.name,counterId:$scope.pointErrorDTO.counterId};
					$scope.pointErrorDTO={id:data[0],name:tmp.name,counterId:tmp.counterId};
					AccidentService.mapPointErrorProperties($scope.pointErrorDTO,pointErrorDTO);
					$scope.dto.pointErrors.push(pointErrorDTO);
				}else{	
					AccidentService.mapPointErrorProperties($scope.pointErrorDTO,pointErrorDTO);		
					$scope.$root.infoDialog("Point Error update successfully");
				}
			});
		}
	};
	
	$scope.deletePointError=function(pointErrorId){
		var pointErrorDTO=AccidentService.getPointErrorDTO($scope.dto.pointErrors,pointErrorId!=null?pointErrorId:0);
		var data=[];
		data.push(pointErrorDTO.id);
		$scope.searchDTO={pointErrorsId:data};
		var deletePointErrorPromise=AccidentService.deletePointError($scope.searchDTO);
		$q.all([deletePointErrorPromise]).then(function(data)
		{		
		
			if(data[0]==true){
				$scope.pointErrorModalMessage=DeleteErrorMessage;
			}
			else{
				$scope.pointErrorModalMessage=DeleteMessage;
				$scope.dto.pointErrors.splice((pointErrorDTO.counterId-1),1);

			}
			$('#deletePointErrorModal').modal();				
		});
	
}
	$scope.showSystemError=function(systemErrorId)
	{
		var systemErrorDTO=AccidentService.getSystemErrorDTO($scope.dto.systemErrors,systemErrorId!=null?systemErrorId:0);
		if(systemErrorId==null)
		{
			
		var counters=$scope.dto.systemErrors.length;
			$scope.systemErrorDTO={isEdit:false,id:0,name:null,counterId:counters+1};
		}else
		{		
			$scope.systemErrorDTO={isEdit:true,id:systemErrorDTO.id,name:systemErrorDTO.name,counterId:systemErrorId};
	
		}
		$('#addEditSystemErrorModal').modal();
		
	}
	
	$scope.saveUpdateSystemError=function(systemErrorId)
	{
		if ($scope.systemErrorDTO.name==""||angular.isUndefined($scope.systemErrorDTO.name)){
					$scope.$root.infoDialog("Please Enter System Error");
			}else{
				var systemErrorDTO=AccidentService.getSystemErrorDTO($scope.dto.systemErrors,$scope.systemErrorDTO.isEdit==true?systemErrorId:0);
				
				var saveUpdateAccidentSystemErrorPromise=AccidentService.saveUpdateAccidentSystemError($scope.systemErrorDTO);	
				$q.all([saveUpdateAccidentSystemErrorPromise]).then(function(data)
				{
					if(!$scope.systemErrorDTO.isEdit){
						var tmp=$scope.systemErrorDTO;
						systemErrorDTO={isEdit:false,id:0,name:$scope.systemErrorDTO.name,counterId:$scope.systemErrorDTO.counterId};
						$scope.systemErrorDTO={id:data[0],name:tmp.name,counterId:tmp.counterId};
						AccidentService.mapSystemErrorProperties($scope.systemErrorDTO,systemErrorDTO);
						$scope.dto.systemErrors.push(systemErrorDTO);
					}else{	
						AccidentService.mapSystemErrorProperties($scope.systemErrorDTO,systemErrorDTO);		
						$scope.$root.infoDialog("System Error update successfully");
					}
				});								
			}		
	};
	$scope.deleteSystemError=function(systemErrorId)
	{
		var systemErrorDTO=AccidentService.getSystemErrorDTO($scope.dto.systemErrors,systemErrorId!=null?systemErrorId:0);
		var data=[];
		data.push(systemErrorDTO.id);
		$scope.searchDTO={systemErrorsId:data};
		var deleteSystemErrorPromise=AccidentService.deleteSystemError($scope.searchDTO);
		$q.all([deleteSystemErrorPromise]).then(function(data)
		{			
			if(data[0]==true){
				$scope.systemErrorModalMessage=DeleteErrorMessage;
			}
			else{
				$scope.systemErrorModalMessage=DeleteMessage;
				$scope.dto.systemErrors.splice((systemErrorDTO.counterId-1),1);
			}
			$('#deleteSystemErrorModal').modal();				
		});
	}
	
	$scope.showSpeedLimit=function(systemLimitId)
	{
		var systemLimitDTO=AccidentService.getSystemErrorDTO($scope.dto.speedLimits,systemLimitId!=null?systemLimitId:0);
		if(systemLimitId==null)
		{
			var counters=$scope.dto.speedLimits.length;
			$scope.systemLimitDTO={id:0,name:null,isEdit:false,counterId:counters+1};
		}else
		{		
			$scope.systemLimitDTO={isEdit:true,id:systemLimitDTO.id,name:systemLimitDTO.name,counterId:systemLimitId};
		}
		$('#addEditSystemLimitModal').modal();
	}
	
	$scope.saveUpdateSystemLimit=function(systemLimitId)
	{
		if ($scope.systemLimitDTO.name==""||angular.isUndefined($scope.systemLimitDTO.name)){
					$scope.$root.infoDialog("Please Enter System Limit");
		}else{
			var systemLimitDTO=AccidentService.getSpeedLimitDTO($scope.dto.speedLimits,$scope.systemLimitDTO.isEdit==true?systemLimitId:0);
			var saveUpdateAccidentSystemLimitPromise=AccidentService.saveUpdateAccidentSpeedLimit($scope.systemLimitDTO);	
			$q.all([saveUpdateAccidentSystemLimitPromise]).then(function(data)
			{
				if(!$scope.systemLimitDTO.isEdit){
					var tmp=$scope.systemLimitDTO;
					systemLimitDTO={isEdit:false,id:0,name:$scope.systemLimitDTO.name,counterId:$scope.systemLimitDTO.counterId};
					$scope.systemLimitDTO={id:data[0],name:tmp.name,counterId:tmp.counterId};
					AccidentService.mapSystemErrorProperties($scope.systemLimitDTO,systemLimitDTO);
					$scope.dto.speedLimits.push(systemLimitDTO);
				}else{	
					AccidentService.mapSystemErrorProperties($scope.systemLimitDTO,systemLimitDTO);		
					$scope.$root.infoDialog("System Limit update successfully");
				}	
			});
		}
	};
	
	$scope.deleteSpeedLimit=function(systemLimitId)
	{
		var systemLimitDTO=AccidentService.getSystemErrorDTO($scope.dto.speedLimits,systemLimitId!=null?systemLimitId:0);
		$scope.searchDTO={roadSpeedLimitId:systemLimitDTO.id};
		var deleteSpeedLimitPromise=AccidentService.deleteSpeedLimit($scope.searchDTO);
		$q.all([deleteSpeedLimitPromise]).then(function(data)
		{		
		
			if(data[0]==true){
				$scope.speedLimitModalMessage=DeleteErrorMessage;
			}
			else{
				$scope.speedLimitModalMessage=DeleteMessage;
				$scope.dto.speedLimits.splice((systemLimitDTO.counterId-1),1);

			}
			$('#deleteSpeedLimitModal').modal();				
		});
	}

	$scope.showCategory=function(categoryId)
	{
		var categoryDTO=AccidentService.getCategoryDTO($scope.dto.categorys,categoryId!=null?categoryId:0);
		if(categoryId==null)
		{
			var counters=$scope.dto.categorys.length;
			$scope.categoryDTO={id:0,name:null,isEdit:false,counterId:counters+1};
		}else
		{		
			$scope.categoryDTO={isEdit:true,id:categoryDTO.id,name:categoryDTO.name,counterId:categoryId};
		}
		$('#addEditCategoryModal').modal();
	}
	$scope.saveUpdateCategory=function(categoryId)
	{
		if ($scope.categoryDTO.name==""||angular.isUndefined($scope.categoryDTO.name)){
					$scope.$root.infoDialog("Please Enter Category");
		}else{
			var categoryDTO=AccidentService.getCategoryDTO($scope.dto.categorys,$scope.categoryDTO.isEdit==true?categoryId:0);
			var saveUpdateAccidentCategoryPromise=AccidentService.saveUpdateAccidentCategory($scope.categoryDTO);	
			$q.all([saveUpdateAccidentCategoryPromise]).then(function(data)
			{
				if(!$scope.categoryDTO.isEdit){
					var tmp=$scope.categoryDTO;
					categoryDTO={isEdit:false,id:0,name:$scope.categoryDTO.name,counterId:$scope.categoryDTO.counterId};
					$scope.categoryDTO={id:data[0],name:tmp.name,counterId:tmp.counterId};
					AccidentService.mapCategoryProperties($scope.categoryDTO,categoryDTO);
					$scope.dto.categorys.push(categoryDTO);
				}else{	
					AccidentService.mapCategoryProperties($scope.categoryDTO,categoryDTO);		
					$scope.$root.infoDialog("Category update successfully");
				}
			});		
		}
	}	
	$scope.deleteCategory=function(categoryId)
	{
		var categoryDTO=AccidentService.getCategoryDTO($scope.dto.categorys,categoryId!=null?categoryId:0);
		$scope.searchDTO={accidentCategory:categoryDTO.id};
		var deleteAccidentCategoryPromise=AccidentService.deleteAccidentCategory($scope.searchDTO);
		$q.all([deleteAccidentCategoryPromise]).then(function(data)
		{		
			if(data[0]==true){
				$scope.categoryModalMessage=DeleteErrorMessage;
			}
			else{
				$scope.categoryModalMessage=DeleteMessage;
				$scope.dto.categorys.splice((categoryDTO.counterId-1),1);

			}
			$('#deleteCategoryModal').modal();				
		});
	
	}	
	$scope.showInjuryDegree=function(injuryDegreeId)
	{
		var injuryDegreeDTO=AccidentService.getCategoryDTO($scope.dto.injuryDegrees,injuryDegreeId!=null?injuryDegreeId:0);
		if(injuryDegreeId==null)
		{
			var counters=$scope.dto.injuryDegrees.length;
			$scope.injuryDegreeDTO={id:0,name:null,isEdit:false,counterId:counters+1};
		}else
		{		
			$scope.injuryDegreeDTO={isEdit:true,id:injuryDegreeDTO.id,name:injuryDegreeDTO.name,counterId:injuryDegreeId};
		}
		$('#addEditInjureModal').modal();
	}
	
	$scope.saveUpdateInjureDegree=function(injuryDegreeId)
	{

		if ($scope.injuryDegreeDTO.name==""|| angular.isUndefined($scope.injuryDegreeDTO.name)){
					$scope.$root.infoDialog("Please Enter Injure Degree");
		}else{
			var injuryDegreeDTO=AccidentService.getInjuryDegreeDTO($scope.dto.injuryDegrees,$scope.injuryDegreeDTO.isEdit==true?injuryDegreeId:0);
			
			var saveUpdateAccidentInjurePromise=AccidentService.saveUpdateInjuryDegree($scope.injuryDegreeDTO);	
			$q.all([saveUpdateAccidentInjurePromise]).then(function(data)
			{
				if(!$scope.injuryDegreeDTO.isEdit){
					var tmp=$scope.injuryDegreeDTO;
					injuryDegreeDTO={isEdit:false,id:0,name:$scope.injuryDegreeDTO.name,counterId:$scope.injuryDegreeDTO.counterId};
					$scope.injuryDegreeDTO={id:data[0],name:tmp.name,counterId:tmp.counterId};
					AccidentService.mapInjuryDegreeProperties($scope.injuryDegreeDTO,injuryDegreeDTO);
					$scope.dto.injuryDegrees.push(injuryDegreeDTO);
				}else{	
					AccidentService.mapInjuryDegreeProperties($scope.injuryDegreeDTO,injuryDegreeDTO);		
					$scope.$root.infoDialog("Injure Degree update successfully");
				}
			});		
		}
	}	

	$scope.showInjuryDegree=function(injuryDegreeId)
	{
		var injuryDegreeDTO=AccidentService.getCategoryDTO($scope.dto.injuryDegrees,injuryDegreeId!=null?injuryDegreeId:0);
		if(injuryDegreeId==null)
		{
			var counters=$scope.dto.injuryDegrees.length;
			$scope.injuryDegreeDTO={id:0,name:null,isEdit:false,counterId:counters+1};
		}else
		{		
			$scope.injuryDegreeDTO={isEdit:true,id:injuryDegreeDTO.id,name:injuryDegreeDTO.name,counterId:injuryDegreeId};
		}
		$('#addEditInjureModal').modal();
		
	}
	$scope.deleteInjury=function(injuryDegreeId)
	{
		var injuryDegreeDTO=AccidentService.getCategoryDTO($scope.dto.injuryDegrees,injuryDegreeId!=null?injuryDegreeId:0);
		$scope.searchDTO={manPersonnelInjury:injuryDegreeDTO.id,manInjury:injuryDegreeDTO.id};
		var deleteInjuryPromise=AccidentService.deleteInjuryDegree($scope.searchDTO);
		$q.all([deleteInjuryPromise]).then(function(data)
		{		
			if(data[0]==true){
				$scope.injuryModalMessage=DeleteErrorMessage;
			}
			else{
				$scope.injuryModalMessage=DeleteMessage;
				$scope.dto.injuryDegrees.splice((injuryDegreeDTO.counterId-1),1);
			}
			$('#deleteInjuryModal').modal();				
		});
	
	}
	$scope.saveUpdateInjureDegree=function(injuryDegreeId)
	{

		if ($scope.injuryDegreeDTO.name==""|| angular.isUndefined($scope.injuryDegreeDTO.name)){
					$scope.$root.infoDialog("Please Enter location type");
		}else{
			var injuryDegreeDTO=AccidentService.getInjuryDegreeDTO($scope.dto.injuryDegrees,$scope.injuryDegreeDTO.isEdit==true?injuryDegreeId:0);
			var saveUpdateAccidentInjurePromise=AccidentService.saveUpdateInjuryDegree($scope.injuryDegreeDTO);	
			$q.all([saveUpdateAccidentInjurePromise]).then(function(data)
			{
				if(!$scope.injuryDegreeDTO.isEdit){
					var tmp=$scope.injuryDegreeDTO;
					injuryDegreeDTO={isEdit:false,id:0,name:$scope.injuryDegreeDTO.name,counterId:$scope.injuryDegreeDTO.counterId};
					$scope.injuryDegreeDTO={id:data[0],name:tmp.name,counterId:tmp.counterId};
					AccidentService.mapInjuryDegreeProperties($scope.injuryDegreeDTO,injuryDegreeDTO);
					$scope.dto.injuryDegrees.push(injuryDegreeDTO);
				}else{	
					AccidentService.mapInjuryDegreeProperties($scope.injuryDegreeDTO,injuryDegreeDTO);		
					$scope.$root.infoDialog("Injure Degree update successfully");
				}
			});
		}
	};
	
	$scope.showWeather=function(weatherId)
	{
		var weatherDTO=AccidentService.getWeathersDTO($scope.dto.weathers,weatherId!=null?weatherId:0);
		if(weatherId==null)
		{
			var counters=$scope.dto.weathers.length;
			$scope.weatherDTO={isEdit:false,id:0,name:null,counterId:counters+1};
		}else
		{		
			$scope.weatherDTO={isEdit:true,id:weatherDTO.id,name:weatherDTO.name,counterId:weatherId};
		}
		$('#addEditWeatherModal').modal();	
	}
	$scope.saveUpdateWeather=function(weatherId)
	{
		if ($scope.weatherDTO.name==""||angular.isUndefined($scope.weatherDTO.name)){
					$scope.$root.infoDialog("Please Enter Weather")
			}else{
				var weatherDTO=AccidentService.getWeathersDTO($scope.dto.weathers,$scope.weatherDTO.isEdit==true?weatherId:0);
				var saveUpdateWeatherPromise=AccidentService.saveUpdateWeather($scope.weatherDTO);	
				$q.all([saveUpdateWeatherPromise]).then(function(data)
				{
					if(!$scope.weatherDTO.isEdit){
						var tmp=$scope.weatherDTO;
						weatherDTO={isEdit:false,id:0,name:$scope.weatherDTO.name,counterId:$scope.weatherDTO.counterId};
						$scope.weatherDTO={id:data[0],name:tmp.name,counterId:tmp.counterId};
						AccidentService.mapWeathersProperties($scope.weatherDTO,weatherDTO);
						$scope.dto.weathers.push(weatherDTO);
					}else{	
						AccidentService.mapWeathersProperties($scope.weatherDTO,weatherDTO);		
						$scope.$root.infoDialog("Weather update successfully");
					}
				});
			}
	}	
	
	$scope.deleteWeather=function(weatherId)
	{
		var weatherDTO=AccidentService.getWeathersDTO($scope.dto.weathers,weatherId!=null?weatherId:0);
		$scope.searchDTO={machineWeather:weatherDTO.id};
		var deleteWeatherPromise=AccidentService.deleteWeather($scope.searchDTO);
		$q.all([deleteWeatherPromise]).then(function(data)
		{		
			if(data[0]==true){
				$scope.weatherModalMessage=DeleteErrorMessage;
			}
			else{
				$scope.weatherModalMessage=DeleteMessage;
				$scope.dto.weathers.splice((weatherDTO.counterId-1),1);
			}
			$('#deleteWeatherModal').modal();				
		});
	}
	
	$scope.showTrafficVolume=function(trafficId)
	{
		var trafficVolumeDTO=AccidentService.getTrafficsDTO($scope.dto.traffics,trafficId!=null?trafficId:0);
		if(trafficId==null)
		{
			var counters=$scope.dto.traffics.length;
			$scope.trafficVolumeDTO={isEdit:false,id:0,name:null,counterId:counters+1};
		}else
		{		
			$scope.trafficVolumeDTO={isEdit:true,id:trafficVolumeDTO.id,name:trafficVolumeDTO.name,counterId:trafficVolumeDTO.counterId};
		}
		$('#addEditTrafficModal').modal();	
	}
	$scope.saveUpdateTraffic=function(trafficId)
	{
		if ($scope.trafficVolumeDTO.name==""|| angular.isUndefined($scope.trafficVolumeDTO.name)){
					$scope.$root.infoDialog("Please Enter location type")
			}else{
				var trafficVolumeDTO=AccidentService.getTrafficsDTO($scope.dto.traffics,$scope.trafficVolumeDTO.isEdit==true?trafficId:0);
				var saveUpdateTrafficPromise=AccidentService.saveUpdateTrafficVolume($scope.trafficVolumeDTO);	
				$q.all([saveUpdateTrafficPromise]).then(function(data)
				{
					if(!$scope.trafficVolumeDTO.isEdit){
						var tmp=$scope.trafficVolumeDTO;
						trafficVolumeDTO={isEdit:false,id:0,name:$scope.trafficVolumeDTO.name,counterId:$scope.trafficVolumeDTO.counterId};
						$scope.trafficVolumeDTO={id:data[0],name:tmp.name,counterId:tmp.counterId};
						AccidentService.mapTrafficsProperties($scope.trafficVolumeDTO,trafficVolumeDTO);
						$scope.dto.traffics.push(trafficVolumeDTO);
					}else{	
						AccidentService.mapTrafficsProperties($scope.trafficVolumeDTO,trafficVolumeDTO);		
						$scope.$root.infoDialog("Traffic Volume update successfully");
					}
				});
			}
	}	
	$scope.deleteTraffic=function(trafficId)
	{
		var trafficVolumeDTO=AccidentService.getTrafficsDTO($scope.dto.traffics,trafficId!=null?trafficId:0);
		$scope.searchDTO={trafficVolumeId:trafficVolumeDTO.id};
		var deleteTrafficVolumePromise=AccidentService.deleteTrafficVolume($scope.searchDTO);
		$q.all([deleteTrafficVolumePromise]).then(function(data)
		{		
			if(data[0]==true){
				$scope.trafficModalMessage=DeleteErrorMessage;
			}
			else{
				$scope.trafficModalMessage=DeleteMessage;
				$scope.dto.traffics.splice((trafficVolumeDTO.counterId-1),1);
			}
			$('#deleteTrafficModal').modal();				
		});
	
	}
	$scope.showVisiblity=function(visiblityId)
	{
		var visiblityDTO=AccidentService.getVisibilityDTO($scope.dto.visibilities,visiblityId!=null?visiblityId:0);
		if(visiblityId==null)
		{
			var counters=$scope.dto.visibilities.length;
			$scope.visiblityDTO={isEdit:false,id:0,name:null,counterId:counters+1};
		}else
		{		
			$scope.visiblityDTO={isEdit:true,id:visiblityDTO.id,name:visiblityDTO.name,counterId:visiblityId};
		}
		$('#addEditVisiblityModal').modal();	
	};
	
	$scope.saveUpdateVisiblityDTO=function(visiblityId)
	{

		if ($scope.visiblityDTO.name==""||angular.isUndefined($scope.visiblityDTO.name)){
					$scope.$root.infoDialog("Please Enter Traffic Volume")
		}else{
			var visiblityDTO=AccidentService.getVisibilityDTO($scope.dto.visibilities,$scope.visiblityDTO.isEdit==true?visiblityId:0);
			var saveUpdateVisbilityPromise=AccidentService.saveUpdateVisibility($scope.visiblityDTO);	
			$q.all([saveUpdateVisbilityPromise]).then(function(data)
			{
				if(!$scope.visiblityDTO.isEdit){
					var tmp=$scope.visiblityDTO;
					visiblityDTO={isEdit:false,id:0,name:$scope.visiblityDTO.name,counterId:$scope.visiblityDTO.counterId};
					$scope.visiblityDTO={id:data[0],name:tmp.name,counterId:tmp.counterId};
					AccidentService.mapVisibilityProperties($scope.visiblityDTO,visiblityDTO);
					$scope.dto.visibilities.push(visiblityDTO);
				}else{	
					AccidentService.mapVisibilityProperties($scope.visiblityDTO,visiblityDTO);		
					$scope.$root.infoDialog("Traffic Volume update successfully");
				}
			});
		}

	}	
	$scope.deleteVisiblity=function(visiblityId){
		var visiblityDTO=AccidentService.getVisibilityDTO($scope.dto.visibilities,visiblityId!=null?visiblityId:0);
		$scope.searchDTO={visibilityId:visiblityDTO.id};
		var deleteVisibilityPromise=AccidentService.deleteVisibility($scope.searchDTO);
		$q.all([deleteVisibilityPromise]).then(function(data)
		{		
			if(data[0]==true){
				$scope.visibilityModalMessage=DeleteErrorMessage;
			}
			else{
				$scope.visibilityModalMessage=DeleteMessage;
				$scope.dto.visibilities.splice((visiblityDTO.counterId-1),1);
			}
			$('#deleteVisibilityModal').modal();				
		});
	
	};
	
	$scope.showCivilianVehicle=function(civilianId)
	{
		var civilianDTO=AccidentService.getCivilianVehicleDTO($scope.dto.civilianVehicles,civilianId!=null?civilianId:0);
		if(civilianId==null)
		{
			var counters=$scope.dto.civilianVehicles.length;
			$scope.civilianDTO={isEdit:false,id:0,name:null,counterId:counters+1};
		}else
		{		
			$scope.civilianDTO={isEdit:true,id:civilianDTO.id,name:civilianDTO.name,counterId:civilianId};
		}
		$('#addEditCivilianVehicleModal').modal();
	};
	
	$scope.saveUpdateCivilianVehicleDTO=function(civilianId)
	{
		if ($scope.civilianDTO.name==""||angular.isUndefined($scope.civilianDTO.name)){
					$scope.$root.infoDialog("Please Enter Civilian Vehicle Type")
		}else{
			var civilianDTO=AccidentService.getCivilianVehicleDTO($scope.dto.civilianVehicles,$scope.civilianDTO.isEdit==true?civilianId:0);
			var saveUpdateCivilianVehiclePromise=AccidentService.saveUpdateCivilianVehicleType($scope.civilianDTO);	
			$q.all([saveUpdateCivilianVehiclePromise]).then(function(data)
			{
				if(!$scope.civilianDTO.isEdit){
					var tmp=$scope.civilianDTO;
					civilianDTO={isEdit:false,id:0,name:$scope.civilianDTO.name,counterId:$scope.civilianDTO.counterId};
					$scope.civilianDTO={id:data[0],name:tmp.name,counterId:tmp.counterId};
					AccidentService.mapCivilianVehicleProperties($scope.civilianDTO,civilianDTO);
					$scope.dto.civilianVehicles.push(civilianDTO);
				}else{	
					AccidentService.mapCivilianVehicleProperties($scope.civilianDTO,civilianDTO);		
					$scope.$root.infoDialog("Civilian Vehicle Type update successfully");
				}
			});	
		}
	}	

	$scope.deleteCivilianVehicle=function(civilianId)
	{
		var civilianDTO=AccidentService.getCivilianVehicleDTO($scope.dto.civilianVehicles,civilianId!=null?civilianId:0);
		$scope.searchDTO={civillianMachineType:civilianDTO.id};
		var deleteCivilianVehiclePromise=AccidentService.deleteCivilianVehicle($scope.searchDTO);
		$q.all([deleteCivilianVehiclePromise]).then(function(data)
		{		
			if(data[0]==true){
				$scope.civilianVehicleModalMessage=DeleteErrorMessage;
			}
			else{
				$scope.civilianVehicleModalMessage=DeleteMessage;
				$scope.dto.civilianVehicles.splice((civilianDTO.counterId-1),1);
			}
			$('#deleteCivilianModal').modal();				
		});
	
	}
	
	
});
