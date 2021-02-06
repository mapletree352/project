app.service("AccidentService", function ($q,Restangular,Constants) {
	
	this.arrayContains=function(inputArr){
		for (var i=0; i<arr.length;i++){
			if(inputArr[i]==true){
				return true;
			}
		}
		return false;
	};
	
	
	this.exportAccidents = function(searchDTO) {
        return Restangular.one("accident/exportAccident").withHttpConfig({ responseType:'arraybuffer' }).get(searchDTO);
	};
	this.getNextAccidentId = function(newDTO) {
		return Restangular.all("accident/getNextAccidentId").post(newDTO);
	};
	this.getAccidentMissionTask = function(taskId) {
		return Restangular.one("accident/getAccidentMissionTask/"+taskId).get();
	};
	this.getAccidentMissionIndent = function(taskId) {
		return Restangular.one("accident/getAccidentMissionIndent/"+taskId).get();
	};
	this.saveAccident = function(newDTO) {
		return Restangular.all("accident/saveOrUpdateAccident").post(newDTO);
	};
	this.saveAccidentMission = function(missionDTO) {
		return Restangular.all("accident/saveOrUpdateAccidentMission").post(missionDTO);
	};
	this.saveAccidentMedium = function(mediumDTO) {
		return Restangular.all("accident/saveOrUpdateAccidentMedium").post(mediumDTO);
	};
	this.saveAccidentManagement = function(managementDTO) {
		return Restangular.all("accident/saveOrUpdateAccidentManagement").post(managementDTO);
	};
	this.saveAccidentCauses = function(causesDTO) {
		return Restangular.all("accident/saveOrUpdateAccidentCauses").post(causesDTO);
	};
	this.saveAccidentConclusion = function(conclusionDTO) {
		return Restangular.all("accident/saveOrUpdateAccidentConclusion").post(conclusionDTO);
	};
	this.getAccidentStatementFile = function(newAccidentFileDTO) {
		return Restangular.one("accident/getAccidentFile").get(newAccidentFileDTO);
	};
	this.deleteAccidentFile = function(newAttachmentListDTO) {
		return Restangular.all("accident/deleteAccidentFile").post(newAttachmentListDTO);
	};	
	
	this.searchNricName = function(nricOrName) {
	
		return Restangular.one("accident/getNricName/" + nricOrName).get();
	}
	
	this.searchUnit = function(codeOrName) {
		
		return Restangular.one("accident/searchUnit/" + codeOrName).get();
	}

	this.getReport=function(id){
		return Restangular.one("accident/getReport/"+id).get();
	}
	this.saveUpdateAccidentLocationType=function(locationTypeDTO){
		
		return Restangular.all("accident/saveOrUpdateAccidentLocationType").post(locationTypeDTO);
	};

	this.saveUpdateCollisionType=function(collisionTypeDTO){
		
		return Restangular.all("accident/saveOrUpdateCollisionType").post(collisionTypeDTO);
	};
	this.saveUpdateAccidentManoeuvreType=function(manevoureTypeDTO){
		
		return Restangular.all("accident/saveOrUpdateAccidentManoeuvreType").post(manevoureTypeDTO);
	};
	
	this.saveUpdateAccidentRoadType=function(roadTypeDTO){
		
		return Restangular.all("accident/saveOrUpdateAccidentRoadType").post(roadTypeDTO);
	};
	this.saveUpdateAccidentRoadSurface=function(roadSurfaceDTO){
		
		return Restangular.all("accident/saveOrUpdateAccidentRoadSurface").post(roadSurfaceDTO);
	};
	this.saveUpdateAccidentRoadFeature=function(roadFeatureDTO){
		
		return Restangular.all("accident/saveOrUpdateAccidentRoadFeature").post(roadFeatureDTO);
	};
	
	this.saveUpdateAccidentPointError=function(pointErrorDTO){
		
		return Restangular.all("accident/saveOrUpdateAccidentPointError").post(pointErrorDTO);
	};
	
	this.saveUpdateAccidentSystemError=function(systemErrorDTO){
		
		return Restangular.all("accident/saveOrUpdateAccidentSystemError").post(systemErrorDTO);
	};
	this.saveUpdateAccidentRoadFeature=function(pointErrorDTO){
		
		return Restangular.all("accident/saveOrUpdateAccidentRoadFeature").post(pointErrorDTO);
	};
	
	this.saveUpdateAccidentSpeedLimit=function(systemLimitDTO){
		
		return Restangular.all("accident/saveOrUpdateAccidentSpeedLimit").post(systemLimitDTO);
	};
	this.saveUpdateAccidentCategory=function(categoryDTO){
		
		return Restangular.all("accident/saveOrUpdateAccidentCategory").post(categoryDTO);
	};
	this.saveUpdateInjuryDegree=function(injuryDegreeDTO){
		
		return Restangular.all("accident/saveOrUpdateInjuryDegree").post(injuryDegreeDTO);
	};
	this.saveUpdateWeather=function(injuryDegreeDTO){
		
		return Restangular.all("accident/saveOrUpdateWeather").post(injuryDegreeDTO);
	};
	
	this.saveUpdateWeather=function(injuryDegreeDTO){
		
		return Restangular.all("accident/saveOrUpdateWeather").post(injuryDegreeDTO);
	};
	
	this.saveUpdateTrafficVolume=function(trafficVolumeDTO){
		
		return Restangular.all("accident/saveOrUpdateTrafficVolume").post(trafficVolumeDTO);
	};
	this.saveUpdateVisibility=function(visiblityDTO){
		
		return Restangular.all("accident/saveOrUpdateVisibility").post(visiblityDTO);
	};
	this.saveUpdateCivilianVehicleType=function(visiblityDTO){
		
		return Restangular.all("accident/saveOrUpdateCivilianVehicleType").post(visiblityDTO);
	};
	this.getLocationTypesDTO = function(getLocationTypesDTO, counter) {
		for (var i = 0; i <  getLocationTypesDTO.length; i++) {
			if ( getLocationTypesDTO[i].counterId == counter) {
				return  getLocationTypesDTO[i];
			}
		}
		return null;
	};

	this.maplocationTypesProperties=function(srcObj, destObj) {
		destObj.id=srcObj.id;
		destObj.name=srcObj.name;
		destObj.counterId=srcObj.counterId;
	}
	
	this.getCollisionTypesDTO = function(newcollisionTypesDTO, counter) {
		for (var i = 0; i <  newcollisionTypesDTO.length; i++) {
			if ( newcollisionTypesDTO[i].counterId == counter) {
				return  newcollisionTypesDTO[i];
			}
		}
		return null;
	};

	this.mapCollisionProperties=function(srcObj, destObj) {
		destObj.id=srcObj.id;
		destObj.name=srcObj.name;
		destObj.counterId=srcObj.counterId;
	}
	
	this.getCollisionObjectDTO = function(newCollisionObjectDTO, counter) {
		for (var i = 0; i <  newCollisionObjectDTO.length; i++) {
			if ( newCollisionObjectDTO[i].counterId == counter) {
				return  newCollisionObjectDTO[i];
			}
		}
		return null;
	};

	this.mapCollisionObjectProperties=function(srcObj, destObj) {
		destObj.id=srcObj.id;
		destObj.name=srcObj.name;
		destObj.counterId=srcObj.counterId;
	}
	
	
	
	this.getManoeuvreTypesDTO = function(newManoeuvreTypesDTO, counter) {
		for (var i = 0; i <  newManoeuvreTypesDTO.length; i++) {
			if ( newManoeuvreTypesDTO[i].counterId == counter) {
				return  newManoeuvreTypesDTO[i];
			}
		}
		return null;
	};

	this.mapManoeuvreTypeProperties=function(srcObj, destObj) {
		destObj.id=srcObj.id;
		destObj.name=srcObj.name;
		destObj.counterId=srcObj.counterId;
	}
	
	this.getRoadTypesDTO = function(getroadTypesDTO, counter) {
		for (var i = 0; i <  getroadTypesDTO.length; i++) {
			if ( getroadTypesDTO[i].counterId == counter) {
				return  getroadTypesDTO[i];
			}
		}
		return null;
	};

	this.mapRoadTypesProperties=function(srcObj, destObj) {

		destObj.id=srcObj.id;
		destObj.name=srcObj.name;
		destObj.counterId=srcObj.counterId;
	}
	
	
	this.getRoadSurfacesDTO = function(getRoadSurfacesDTO, counter) {
		for (var i = 0; i <  getRoadSurfacesDTO.length; i++) {
			if ( getRoadSurfacesDTO[i].counterId == counter) {
				return  getRoadSurfacesDTO[i];
			}
		}
		return null;
	};

	this.mapRoadSurfacesProperties=function(srcObj, destObj) {
		destObj.id=srcObj.id;
		destObj.name=srcObj.name;
		destObj.counterId=srcObj.counterId;
	}
	
	this.getRoadFeaturesDTO = function(getroadFeaturesDTO, counter) {
		for (var i = 0; i <  getroadFeaturesDTO.length; i++) {
			if ( getroadFeaturesDTO[i].counterId == counter) {
				return  getroadFeaturesDTO[i];
			}
		}
		return null;
	};

	this.mapRoadFeaturesProperties=function(srcObj, destObj) {
		destObj.id=srcObj.id;
		destObj.name=srcObj.name;
		destObj.counterId=srcObj.counterId;
	}
	
	this.getPointErrorDTO = function(getPointErrorDTO, counter) {
		for (var i = 0; i <  getPointErrorDTO.length; i++) {
			if ( getPointErrorDTO[i].counterId == counter) {
				return  getPointErrorDTO[i];
			}
		}
		return null;
	};

	this.mapPointErrorProperties=function(srcObj, destObj) {
		destObj.id=srcObj.id;
		destObj.name=srcObj.name;
		destObj.counterId=srcObj.counterId;
	}
	this.getSystemErrorDTO = function(getroadFeaturesDTO, counter) {
		for (var i = 0; i <  getroadFeaturesDTO.length; i++) {
			if ( getroadFeaturesDTO[i].counterId == counter) {
				return  getroadFeaturesDTO[i];
			}
		}
		return null;
	};

	this.mapSystemErrorProperties=function(srcObj, destObj) {
		destObj.id=srcObj.id;
		destObj.name=srcObj.name;
		destObj.counterId=srcObj.counterId;
	}
	
	this.getSpeedLimitDTO = function(getspeedLimitsDTO, counter) {
		for (var i = 0; i <  getspeedLimitsDTO.length; i++) {
			if ( getspeedLimitsDTO[i].counterId == counter) {
				return  getspeedLimitsDTO[i];
			}
		}
		return null;
	};

	this.mapSpeedLimitProperties=function(srcObj, destObj) {
		destObj.id=srcObj.id;
		destObj.name=srcObj.name;
		destObj.counterId=srcObj.counterId;
	}
	
	this.getInjuryDegreeDTO = function(getInjuryDegreeDTO, counter) {
		for (var i = 0; i <  getInjuryDegreeDTO.length; i++) {
			if ( getInjuryDegreeDTO[i].counterId == counter) {
				return  getInjuryDegreeDTO[i];
			}
		}
		return null;
	};
	this.mapInjuryDegreeProperties=function(srcObj, destObj) {
		destObj.id=srcObj.id;
		destObj.name=srcObj.name;
		destObj.counterId=srcObj.counterId;
	}
	

	this.mapCategoryProperties=function(srcObj, destObj) {
		destObj.id=srcObj.id;
		destObj.name=srcObj.name;
		destObj.counterId=srcObj.counterId;
	}
	
	this.getCategoryDTO = function(getCategoryDTO, counter) {
		for (var i = 0; i <  getCategoryDTO.length; i++) {
			if ( getCategoryDTO[i].counterId == counter) {
				return  getCategoryDTO[i];
			}
		}
		return null;
	};

	this.mapWeathersProperties=function(srcObj, destObj) {
		destObj.id=srcObj.id;
		destObj.name=srcObj.name;
		destObj.counterId=srcObj.counterId;
	}
	
	this.getWeathersDTO = function(getweathersDTO, counter) {
		for (var i = 0; i <  getweathersDTO.length; i++) {
			if ( getweathersDTO[i].counterId == counter) {
				return  getweathersDTO[i];
			}
		}
		return null;
	};
	
	this.mapTrafficsProperties=function(srcObj, destObj) {
		destObj.id=srcObj.id;
		destObj.name=srcObj.name;
		destObj.counterId=srcObj.counterId;
	}
	
	this.getTrafficsDTO = function(getTrafficsDTO, counter) {
		for (var i = 0; i <  getTrafficsDTO.length; i++) {
			if ( getTrafficsDTO[i].counterId == counter) {
				return  getTrafficsDTO[i];
			}
		}
		return null;
	};

	
	this.mapVisibilityProperties=function(srcObj, destObj) {
		destObj.id=srcObj.id;
		destObj.name=srcObj.name;
		destObj.counterId=srcObj.counterId;
	}
	
	this.getVisibilityDTO = function(getVisibilityDTO, counter) {
		for (var i = 0; i <  getVisibilityDTO.length; i++) {
			if ( getVisibilityDTO[i].counterId == counter) {
				return  getVisibilityDTO[i];
			}
		}
		return null;
	};
	this.mapCivilianVehicleProperties=function(srcObj, destObj) {
		destObj.id=srcObj.id;
		destObj.name=srcObj.name;
		destObj.counterId=srcObj.counterId;
	}
	
	this.getCivilianVehicleDTO = function(getCivilianVehicleDTO, counter) {
		for (var i = 0; i <  getCivilianVehicleDTO.length; i++) {
			if ( getCivilianVehicleDTO[i].counterId == counter) {
				return  getCivilianVehicleDTO[i];
			}
		}
		return null;
	};
	
	
	this.getAccidentCategories=function(){
		return Restangular.all("accident/getAccidentCategories").getList();
	}
	this.getAccidentCollisionTypes=function(){
		return Restangular.all("accident/getAccidentCollisionTypes").getList();
	}
	this.getAccidentInjuryDegrees=function(){
		return Restangular.all("accident/getAccidentInjuryDegrees").getList();
	}
	this.getAccidentLocationTypes=function(){
		return Restangular.all("accident/getAccidentLocationTypes").getList();
	}
	this.getAccidentMachineTypes=function(){
		return Restangular.all("accident/getAccidentMachineTypes").getList();
	}
	this.getAccidentManoeuvreTypes=function(){
		return Restangular.all("accident/getAccidentManoeuvreTypes").getList();
	}
	this.getAccidentPointErrors=function(){
		return Restangular.all("accident/getAccidentPointErrors").getList();
	}	
	this.getAccidentSystemErrors=function(){
		return Restangular.all("accident/getAccidentSystemErrors").getList();
	}
	this.getAccidentRoadFeatures=function(){
		return Restangular.all("accident/getAccidentRoadFeatures").getList();
	}
	this.getAccidentRoadSurfaces=function(){
		return Restangular.all("accident/getAccidentRoadSurfaces").getList();
	}
	this.getAccidentRoadTypes=function(){
		return Restangular.all("accident/getAccidentRoadTypes").getList();
	}
	this.getAccidentSpeedLimits=function(){
		return Restangular.all("accident/getAccidentSpeedLimits").getList();
	}
	this.getAccidentTrafficVolumes=function(){
		return Restangular.all("accident/getAccidentTrafficVolumes").getList();
	}

	this.getAccidentVisibilities=function(){
		return Restangular.all("accident/getAccidentVisibilities").getList();
	}
	this.getAccidentWeathers=function(){
		return Restangular.all("accident/getAccidentWeathers").getList();
	}
	this.getCivillianVehicleTypes=function(){
		return Restangular.all("accident/getCivillianVehicleTypes").getList();
	}
	this.getAccidentCollisionObject=function(){
		return Restangular.all("accident/getAccidentCollisionObject").getList();
	}
	this.getCivilianVehicleType=function(){
		return Restangular.all("accident/getCivilianVehicleType").getList();
	}
	this.saveUpdateCollisionObject=function(collisionObjectDTO){
		return Restangular.all("accident/saveOrUpdateCollisionObject").post(collisionObjectDTO);
	};
	this.deleteLocationType = function(searchDTO) {
		return Restangular.all("accident/deleteLocationType").post(searchDTO);

	};
	this.deleteCollisionType= function(searchDTO) {
		return Restangular.all("accident/deleteCollisionType").post(searchDTO);

	};
	this.deleteCollisionObject= function(searchDTO) {
		return Restangular.all("accident/deleteCollisionObject").post(searchDTO);

	};
	this.deleteRoadType= function(searchDTO) {
		return Restangular.all("accident/deleteRoadType").post(searchDTO);
	};
	this.deletePointError= function(searchDTO) {
		return Restangular.all("accident/deletePointError").post(searchDTO);
	};
	this.deleteWeather= function(searchDTO) {
		return Restangular.all("accident/deleteWeather").post(searchDTO);
	};
	this.deleteTrafficVolume= function(searchDTO) {
		return Restangular.all("accident/deleteTrafficVolume").post(searchDTO);
	};
	
	this.deleteVisibility= function(searchDTO) {
		return Restangular.all("accident/deleteVisibility").post(searchDTO);
	};
	
	this.deleteInjuryDegree= function(searchDTO) {
		return Restangular.all("accident/deleteInjuryDegree").post(searchDTO);
	};
	this.deleteSystemError= function(searchDTO) {
		return Restangular.all("accident/deleteSystemError").post(searchDTO);
	};
	this.deleteRoadFeature= function(searchDTO) {
		return Restangular.all("accident/deleteRoadFeature").post(searchDTO);
	};
	this.deleteRoadSurface= function(searchDTO) {
		return Restangular.all("accident/deleteRoadSurface").post(searchDTO);
	};
	this.deleteManoeuvreObject= function(searchDTO) {
		return Restangular.all("accident/deleteManoeuvreObject").post(searchDTO);
	};
	this.deleteCollisionType = function(searchDTO) {
	return Restangular.all("accident/deleteCollisionType").post(searchDTO);

	};
	this.deleteAccidentCategory = function(searchDTO) {
	return Restangular.all("accident/deleteAccidentCategory").post(searchDTO);
	};
	this.deleteSpeedLimit = function(searchDTO) {
		return Restangular.all("accident/deleteSpeedLimit").post(searchDTO);
	};
	this.deleteCivilianVehicle= function(searchDTO) {
		return Restangular.all("accident/deleteCivilianVehicle").post(searchDTO);
	};
	
	this.searchAccident = function(searchDTO) {
		return Restangular.one("accident/searchAccident").get(searchDTO);
	};
	this.saveAccidentMachine=function(machineDTO){
		return Restangular.all("accident/saveOrUpdateAccidentMachine").post(machineDTO);
	}
	this.saveAccidentMan=function(manDTO){
		return Restangular.all("accident/saveOrUpdateAccidentMan").post(manDTO);
	}
	this.getAccidentDriver = function(nricNo) {
		return Restangular.one("accident/getAccidentDriver/"+nricNo).get();	
	};
	this.getManPastTwoDaysTaskDetails = function(nricNo) {
		return Restangular.all("accident/getManPastTwoDaysTaskDetails/"+nricNo).getList();	
	};
	this.getToInvolvedDTO = function(newToInvovledDTO, counter) {
		for (var i = 0; i <  newToInvovledDTO.length; i++) {
			if ( newToInvovledDTO[i].id == counter) {
				return  newToInvovledDTO[i];
			}
		}
		return null;
	};
	this.mapToInvolvedProperties=function(srcObj, destObj) {
		destObj.id=srcObj.id;
		destObj.nricNoName=srcObj.nricNoName;	
		destObj.nricNo=srcObj.nricNo
		destObj.restHour=srcObj.restHour!==null||srcObj.restHour!=""?angular.isUndefined(srcObj.restHour)?0:srcObj.restHour:0;
		destObj.injury=srcObj.injury;
		destObj.toId=srcObj.toId;
		destObj.injuryId=srcObj.injuryId;
		destObj.psychoFlag=srcObj.psychoFlag;
		var accPsyProblemDesc="";
		switch(destObj.psychoFlag){
		case Constants.FLAG_YES:
			accPsyProblemDesc="Yes";
			break;
		case Constants.FLAG_NO:
			accPsyProblemDesc="No";
			break;
		default:
			accPsyProblemDesc="N/A";
			break;
		}
		destObj.accPsyProblemDesc=accPsyProblemDesc;
		destObj.ehrHub=srcObj.ehrHub;
		destObj.ehrNode=srcObj.ehrNode;
		destObj.serviceType=srcObj.serviceType;
		destObj.vocation=srcObj.vocation;
		destObj.permitNo=srcObj.permitNo;
		destObj.driverPermitsCAT=srcObj.driverPermitsCAT;
		destObj.cl3Mileage=srcObj.cl3Mileage;
		destObj.cl4Mileage=srcObj.cl4Mileage;
		destObj.mileage=srcObj.mileage;
	};
	this.getPersonnelInvolvedDTO = function(newPersonnelDTO, counter) {
		for (var i = 0; i < newPersonnelDTO.length; i++) {
			if (newPersonnelDTO[i].id == counter) {
				return newPersonnelDTO[i];
			}
		}
		return null;
	};
	this.mapPersonnelInvolvedProperties=function(srcObj, destObj) {
		destObj.id=srcObj.id;
		destObj.accidentId=srcObj.accidentId;
		destObj.nricNo=srcObj.nricNo;
		destObj.name=srcObj.name;
		destObj.address=srcObj.address;
		destObj.contactNo=srcObj.contactNo;
		destObj.injury=srcObj.injury;
		destObj.injuryId=srcObj.injuryId;
		destObj.remarks=srcObj.remarks;
	};
	this.getMachinesDTO = function(newMachinesDTO, counter) {
		for (var i = 0; i < newMachinesDTO.length; i++) {
			if (newMachinesDTO[i].id == counter) {
				return newMachinesDTO[i];
			}
		}
		return null;
	};
	this.mapAccidentMachineProperties = function(srcObj, destObj) {
			destObj.id=srcObj.id ;
			destObj.accidentId=srcObj.accidentId;
			var machineType="";
			var bocConductedReturnValue="";
			destObj.machineType=srcObj.machineType;
			destObj.machineTypeId=srcObj.machineTypeId;
			switch(srcObj.machineType.id){
			case Constants.MilitaryMachineType:
				machineType="Machine";
				destObj.militaryVehiclePlateNo=srcObj.militaryVehiclePlateNo;
				destObj.vehicleType=srcObj.vehicleType;
				destObj.civillianVehiclePlateNo="";
				destObj.latestPmStartDate=srcObj.latestPmStartDate!=null?srcObj.latestPmStartDate:'N/A';
				destObj.aviDueDate=srcObj.aviDueDate!=null?srcObj.aviDueDate:'N/A';
				destObj.civillianVehicleType=null;
				bocConductedReturnValue=srcObj.bocConducted;
				break;
			case Constants.CivillianMachineType :
				machineType="Civillian";
				destObj.militaryVehiclePlateNo=null;	
				destObj.vehicleType="";
				destObj.civillianVehiclePlateNo=srcObj.civillianVehiclePlateNo;
				destObj.civillianVehicleTypeId=srcObj.civillianVehicleType.id;
				destObj.civillianVehicleType=srcObj.civillianVehicleType;
				destObj.latestPmStartDate='N/A';
				destObj.aviDueDate='N/A';
				bocConductedReturnValue="";
				break;
			default: 
				machineType="N/A";
				break;
			}
			destObj.machineTypeDesc=machineType;
			destObj.bocConducted=bocConductedReturnValue;
			destObj.vehicleDamages=srcObj.vehicleDamages;
			destObj.propertyDamages=srcObj.propertyDamages;
			var bocConductedDesc="";
			switch(bocConductedReturnValue){
				case Constants.FLAG_YES:
					bocConductedDesc="Yes";
					break;
				case Constants.FLAG_NO:
					bocConductedDesc="No";
					break;
				default:
					bocConductedDesc="N/A";
					break;	
			}
			destObj.bocConductedDesc=bocConductedDesc;
		}
	this.getAccidentManTransportOperator = function(newAccidentManTOdto, counter) {
		for (var i = 0; i < newAccidentManTOdto.length; i++) {
			if (newAccidentManTOdto[i].id == counter) {
				return newAccidentManTOdto[i];
			}
		}
		return null;
	};
	
	
	
	
});