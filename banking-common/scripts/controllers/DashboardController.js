app.controller('DashboardController', function($q, $scope, $http, $sce, DashboardService, CommonService) {

	$scope.driverResource=function(){
		$scope.resChart.labels=[];
			$scope.resChart.data=[];
		var datas=[];
		var getTOResourceOverViewData=DashboardService.getTOResourceOverViewData($scope.searchDTO);
		$q.all([ getTOResourceOverViewData]).then(function(data) {
			$scope.resChart.series = ['Deployable', 'Buffer', 'Unavailable', 'Available','Balance'];
	
			_.each(data[0][0].data, function(record)
			{ 
				datas.push(record);
			});	
			$scope.resChart.labels=data[0][0].label;
			$scope.resChart.data=datas;
		
		});
	};
	$scope.vehicleResource=function(){
		$scope.resChart.labels=[];
		$scope.resChart.data=[];
		var datas=[];
		var getVehResourceOverViewDataPromise=DashboardService.getVehResourceOverViewData($scope.searchDTO);
		$q.all([ getVehResourceOverViewDataPromise]).then(function(data) {
			$scope.resChart.series = ['Holding', 'Buffer', 'Unavailable', 'Available','Balance'];
			_.each(data[0][0].data, function(record)
			{ 
				datas.push(record);
			});	
			$scope.resChart.labels=data[0][0].label;
			$scope.resChart.data=datas;
		});
	};
	
	if (!$scope.$root.session.token) {
		$scope.$root.login();
	} else {
		  var today = moment().format('DD-MMM-YYYY');
		$scope.searchDTO={date:today,optionType:"TO",hubCode:"",nodeId:null,searchMode:"hubNode",vehicleTypeId:0,meridiem:'AM'};
		$scope.currentYear = moment().year();
		var vehicleTypesPromise = CommonService.getVehicleTypes();
		var getHubPromise = CommonService.getHubs();
		var getNodePromise = CommonService.getNodes();
			$q.all([ getHubPromise,vehicleTypesPromise,getNodePromise]).then(function(data) {
				$scope.hubs=data[0];
				$scope.vehicleTypes=data[1];
				$scope.searchDTO.vehicleTypeId=$scope.vehicleTypes[0].id;
				$scope.nodes=data[2];
		
			});	
		$scope.optionsValue=["TO","VEH"];
		$scope.searchCreditDTO={workYear:String($scope.currentYear),unitCode:""};
		$scope.resChart={type:"StackedBar",data:[],series:null,labels:[],colours:{} 	};
		$scope.searchDTO.vehicleTypeId = 1;
		$scope.resChart.series = ['Deployable', 'Buffer', 'Unavailable', 'Available','Balance'];
		$scope.resChart.colours = ['#CCCCCC','#666666','#FF8A8A','#0080FF','#0000FF'];
		$scope.resPie={labels:["Latest Provision", "Committed", "Penatly", "Balance"],data:[0,0,0,0],pieChartoptions:{}};
			$scope.options = {
				      scales: {
				        xAxes: [{
				          stacked: true,
				        }],
				        yAxes: [{
				          stacked: false
				        }]
				      }
				    };
		$scope.getCreditStatus=function(){
				var inputData=[];
				$scope.searchCreditDTO.unitCode=$scope.$root.session.userRole.unitCode;
				var getCreditStatusPromise= DashboardService.getCreditStatus($scope.searchCreditDTO);
				$q.all([getCreditStatusPromise]).then(function(data) {
					if(data[0][0].data[0]!=0 && data[0][0].data[1]!=0 && data[0][0].data[2]!=0 && data[0][0].data[3]!=0){
						_.each(data[0][0].data, function(record) {
							inputData.push(record);
						});
						$scope.resPie.data=inputData;
					}else{	
						$scope.$root.infoDialog("There is no credits for the selected work year");
					}
					
				});
			};
		
		$scope.resourceViewReset=function(){
				$scope.searchDTO.date=today;
				if($scope.searchDTO.hubCode!="")
					$scope.searchDTO.hubCode="";
				if($scope.searchDTO.nodeId!=null||$scope.searchDTO.nodeId!="")
					$scope.searchDTO.nodeId=null;
				$scope.searchDTO.searchMode="hubNode";
				if($scope.searchDTO.optionType=="VEH"){
				
					$scope.vehicleResource();
				}
				if($scope.searchDTO.optionType=="TO"){
			
					$scope.driverResource();
				}
			};
		$scope.resourceView=function(){	
			if($scope.searchDTO.nodeId!=null)
				$scope.searchDTO.searchMode="hubNode";
			
			if($scope.searchDTO.optionType=="TO")
				$scope.driverResource();
			
			if($scope.searchDTO.optionType=="VEH")
				$scope.vehicleResource();
			};
		$scope.resourceHubView=function(){
			$scope.searchDTO.nodeId=null;
			$scope.searchDTO.searchMode="hubNode";
			if($scope.searchDTO.optionType=="TO")
				$scope.driverResource();
			
			if($scope.searchDTO.optionType=="VEH")
				$scope.vehicleResource();		
		}	
		var notificationsPromise = DashboardService.getNotifications();
		var pendingActionsPromise = DashboardService.getPendingActions();
		$scope.checkboxes = { all: false, items: {} };
		$scope.selectedNotification = { notifications: {} };

		$q.all([notificationsPromise, pendingActionsPromise]).then(function(data) {
			$scope.notifications = data[0];
			$scope.pendingActions = data[1];
			$scope.selectedNotification.notificationsId = $scope.notifications.id;		
		});

		$scope.checkAll = function() {
			_.each($scope.notifications, function(notification) {
				$scope.checkboxes.items[notification.id] = $scope.checkboxes.all;
			});
		};

		// render the html to display in notification and pending action
		$scope.renderHtml = function(htmlCode) {
			return $sce.trustAsHtml(htmlCode);
		};
		
		var reload = function(tablestate){
			$scope.checkboxes = { all: false, items: {} };
			var notificationsPromise = DashboardService.getNotifications();
			$q.all([notificationsPromise]).then(function(data) {
				$scope.notifications = data[0];
			});
		};
		// When dismiss button is click
		$scope.dismissClick = function() {
			$scope.selectedNotificationArray = [];
			_.each($scope.notifications, function(notification) {
				if (!!$scope.checkboxes.items[notification.id]) {
					$scope.selectedNotificationArray.push(notification.id);
				}
			})

			var dismissPromise = DashboardService.dismissNotifications($scope.selectedNotificationArray);
			$q.all([ dismissPromise ]).then(function(message) {
				$scope.$root.infoDialog(message[0]);
				var notificationsPromise = DashboardService.getNotifications();
				$q.all([ notificationsPromise ]).then(function(data) {
					$scope.notifications = data[0];
				});
				reload();
			});
		};
	
		if($scope.$root.session.userRole.cat=="Unit")
			$scope.getCreditStatus();
		else{
			var datas=[];
			var getResourceOverViewDataInitLoadPromise=DashboardService.getResourceOverViewDataInitLoad($scope.searchDTO);
			$q.all([ getResourceOverViewDataInitLoadPromise]).then(function(data) {
				$scope.resChart.series = ['Deployable', 'Buffer', 'Unavailable', 'Available','Balance'];
						_.each(data[0][0].data, function(record)
						{ 
							datas.push(record);
						});	
				
						$scope.resChart.labels=data[0][0].label;
						$scope.resChart.data=datas;	
			});
		}
		
	}
});