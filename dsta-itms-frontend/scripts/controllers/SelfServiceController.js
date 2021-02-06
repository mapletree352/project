app.controller('SelfServiceLoginController', function($q, $scope, SelfServiceService, CommonService, Constants) {
	if (!$scope.$root.session.token) {
		$scope.$root.login();
	} else if ($scope.$root.session.userRole.cat === Constants.USER_ROLE_CAT_UNIT) {
		$scope.$root.go('/register');
	} else {
		$scope.login = function() {
			if ($scope.sessionDTO) {
				var loginPromise = SelfServiceService.login($scope.sessionDTO);
				$q.all([ loginPromise ]).then(function(data) {
					$scope.$root.go("/self_service_dashboard/" + data[0]);
				});	
			} else {
				$scope.$root.errorDialog("Driver () cannot be found. Please try again.");
			}
		};
	}
});

app.controller('SelfServiceDashboardController', function($q, $scope, $stateParams, $filter, $interval, SelfServiceService, CommonService, Constants) {
	if (!$scope.$root.session.token) {
		$scope.$root.login();
	} else if ($scope.$root.session.userRole.cat === Constants.USER_ROLE_CAT_UNIT) {
		$scope.$root.go('/register');
	} else {
		var promise;
		$scope.date = moment().format('DD-MMM-YYYY HH:mm:ss');
		$scope.task;
		$scope.taskNotSelected;
		$scope.taskSelect;
		$scope.taskCalendars;
		$scope.taskCalendarsSelect;
		$scope.isSwitchTask = {show:"false"};
		$scope.mtBookOut = {show:"false"};
		$scope.searchDTO = { startIndex:0, pageSize:Constants.PAGE_SIZE, dateRange: moment().format('DD-MMM-YYYY') + " to " + moment().add(5, 'days').format('DD-MMM-YYYY')};
		
		var getPendingConfirmations = SelfServiceService.getPendingConfirmations($stateParams.nricNo);
		var taskDetailsPromise = SelfServiceService.getDriverTask($stateParams.nricNo);
		var activitiesPromise = CommonService.getActivities('MT_MAINT');
		var driverDetailsPromise = SelfServiceService.getDriverDetail($stateParams.nricNo);
		$q.all([ taskDetailsPromise, getPendingConfirmations, activitiesPromise, driverDetailsPromise]).then(function(data) {
			$scope.selfServices = data[0];
			$scope.pendingConfirmations = data[1];
			$scope.activities = data[2];
			$scope.driver = data[3];
			if($scope.selfServices.length == 1){
				$scope.task = $scope.selfServices[0];
			}else{
				_.each($scope.selfServices, function(selfService){
					if(selfService.activeTask == true){
						$scope.task = selfService;
					}else{
						$scope.taskNotSelected = selfService;
					}
					if(selfService.isSwitchTask){
						$scope.isSwitchTask.show=true;
					}
				});
				if($scope.task==null){
					$scope.task = $scope.selfServices[0];
				}
			};
			if($scope.pendingConfirmations.length != 0){
				$scope.start();
			}
			checkDisplayMt();
		});

		//timer for pending confirmation	
		$scope.stop = function() {
			$interval.cancel(promise);
		};
		
		$scope.start = function() {
			$scope.stop();
			promise = $interval(reloadDetailForTimer, 60000);
		};
		
	   $scope.$on('$destroy', function() {
		      $scope.stop();
	   });
	   
	   function reloadDetailForTimer() {
		   reload(true,$scope.tableState);
	   	  if($scope.pendingConfirmations.length == 0){
	   		$scope.stop();
	   	  }
		}

		$scope.getCurrentDate = function(){
			$scope.date = moment().format('DD-MMM-YYYY HH:mm:ss');
		};
		
		var reload = function(boolTimer,tableState){
			$scope.isSwitchTask.show=false;
			var blnSet = false;
			var taskDetailsPromise = SelfServiceService.getDriverTask($stateParams.nricNo);
			var getPendingConfirmations = SelfServiceService.getPendingConfirmations($stateParams.nricNo);
			$q.all([ taskDetailsPromise,getPendingConfirmations]).then(function(data) {
				$scope.selfServices = data[0];
				$scope.pendingConfirmations = data[1];
				$scope.mtBookOut.show=false;
				if($scope.selfServices.length == 1){
					$scope.task = $scope.selfServices[0];
				}else if($scope.selfServices.length==0){
					$scope.task = {};
				}else{
					_.each($scope.selfServices, function(selfService){
						if(selfService.activeTask == true){
							$scope.task = selfService;
							blnSet=true;
						}else{
							$scope.taskNotSelected = selfService;
						}
						if(selfService.isSwitchTask){
							$scope.isSwitchTask.show=true;
						}
						
					});
	
					if(blnSet==false){
						$scope.task = $scope.selfServices[0];
					}
				}
				reloadTable($scope.tableState);
				
				if(boolTimer==false){
					if($scope.pendingConfirmations.length != 0){
						$scope.start();
					}
				}
				checkDisplayMt();
				
			});
		};
		
		$scope.confirmAction = function(type,tableState){
			$scope.date = moment().format('DD-MMM-YYYY HH:mm:ss');
			var content = "";
			if(type == "bookIn"){
				content = "The Task will be Booked In at <strong>"+ $scope.date +"</strong>. Do you wish to continue?";
				$scope.$root.confirmDialog(content,$scope.bookInTask,tableState);
			}else if(type == "bookOut"){
				content = "The Task will be Booked Out at <strong>"+ $scope.date +"</strong>. Do you wish to continue?";
				$scope.$root.confirmDialog(content, $scope.bookOutTask,tableState);
			}else{
				content = "Are you sure you wish to switch Task at <strong>"+ $scope.date +"</strong>?";
				$scope.$root.confirmDialog(content, $scope.switchTask, tableState);
			}
		}

		$scope.bookOutTask = function(tableState){
			var selectedTaskDetail = [];
			var taskDetailsConfirmBookInOutDTO = new Object();
			
			if($scope.selfServices.length != 0 ){
				
				_.each($scope.selfServices, function(selfService){
					if(selfService.activeTask != true){
						selectedTaskDetail.push(selfService.id);
					}
				});
				
				taskDetailsConfirmBookInOutDTO.taskDetailIds = selectedTaskDetail;
				taskDetailsConfirmBookInOutDTO.confirmDateTime = $scope.date;
				var bookOutTaskPromise = SelfServiceService.bookOutTask(taskDetailsConfirmBookInOutDTO);
				$q.all([bookOutTaskPromise]).then(function(data){
					$scope.$root.infoDialog(data[0]);
					reload(false,tableState);
				});
				
			}
			
		};
		
		$scope.bookInTask = function(tableState){
			
			var selectedTaskDetail = [];
			var taskDetailsConfirmBookInOutDTO = new Object();
			if($scope.selfServices.length != 0){
				_.each($scope.selfServices, function(selfService){
					if(selfService.activeTask == true){
						selectedTaskDetail.push(selfService.id);
					}
				});
				taskDetailsConfirmBookInOutDTO.taskDetailIds = selectedTaskDetail;
				taskDetailsConfirmBookInOutDTO.confirmDateTime = $scope.date;
				var bookInTaskPromise = SelfServiceService.bookinTask(taskDetailsConfirmBookInOutDTO);
				$q.all([bookInTaskPromise]).then(function(data){
					$scope.$root.infoDialog(data[0]);
					reload(false,tableState);
				});
				
			};
			
		};
		
		$scope.mtMaintBookOut = function(tableState) {
			var selectedTaskDetail = [];
			if($scope.selfServices.length != 0){
				_.each($scope.selfServices, function(selfService){
					if(selfService.activeTask == true){
						selectedTaskDetail.push(selfService.id);
					}
				});
			};
			$scope.mtMaintBookOutDTO.driverNricNo = $stateParams.nricNo;
			$scope.mtMaintBookOutDTO.taskDetailIds = selectedTaskDetail;
			var bookOutPromise = SelfServiceService.mtMaintBookOut($scope.mtMaintBookOutDTO);
			$q.all([ bookOutPromise ]).then(function(data) {
				if (data[0] === Constants.TL_NOT_FOUND) {
					$scope.$root.infoDialog(Constants.TL_NOT_FOUND);
				} else {
					$scope.$root.infoDialog(data[0]);
					$('#mtMaintBookOutModal').modal('hide');
					$scope.mtMaintBookOutDTO = { onSiteConfirmationFlag:'Y' };
					$scope.vehicle = undefined;
					reload(false,tableState);
				}
			});
		};
		
		$scope.switchTask = function(tableState){
			var taskDetailsConfirmBookInOutDTO = new Object();
			var selectedTaskDetail = [];

			if($scope.selfServices.length !=0){
				_.each($scope.selfServices, function(selfService){
					selectedTaskDetail.push(selfService.id);
				});
				taskDetailsConfirmBookInOutDTO.taskDetailIds = selectedTaskDetail;
				taskDetailsConfirmBookInOutDTO.confirmDateTime = $scope.date;
				var switchTaskPromise = SelfServiceService.switchTask(taskDetailsConfirmBookInOutDTO);
				$q.all([switchTaskPromise]).then(function(data){
					$scope.$root.infoDialog(data[0])
					reload(false,tableState);
					
				});
			}
		};
		
		$scope.logout = function() {
			$scope.$root.go('/self_service');
		}
		
		//to check whether needed to display the mt book out button. there is a time lapse of half hour(take from parameter next time).
		
		var checkDisplayMt = function(){

			if($scope.selfServices.length == 0){
				$scope.mtBookOut.show=true;
			}else if($scope.selfServices.length == 1){
				if($scope.task.activeTask == true){
					if(angular.equals(($filter('uppercase')($scope.task.indentActivityType)),($filter('uppercase')("Operations")))){
						$scope.mtBookOut.show=true;
					}else{
						//activetask is not a standby.
						$scope.mtBookOut.show=true;	
					}
				}else{
					$scope.mtBookOut.show=true;		
				}
			}else{
				//selfService length is 2 (normally is one standby one is normal task)
				_.each($scope.selfServices, function(selfService){
					if(!(angular.equals(($filter('uppercase')(selfService.indentActivityType)),($filter('uppercase')("Operations"))))){
						if(selfService.activeTask == false){
							$scope.mtBookOut.show=true;		
						}
					}
				});
				
			}
			
		};
		
		$(document).ready(function () {
		    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
		        $('.calendar').fullCalendar('render');
		    });
		});
		
		// calendar
		
		$('.calendar').fullCalendar({
			height: 600,
			header: {
				left: 'prev,next, today ',
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
						$scope.taskCalendarsSelect = data[0];
						
						if(angular.equals($scope.taskCalendarsSelect.indentReportingVenue,$scope.taskCalendarsSelect.indentDestinationVenue)){
							destination = $scope.taskCalendarsSelect.indentReportingVenue;
						}else{
							destination = $scope.taskCalendarsSelect.indentReportingVenue + " -> " + $scope.taskCalendarsSelect.indentDestinationVenue;
						}
						
						$('#modalTitle').html($scope.taskCalendarsSelect.indentActivity + " @ " + destination);
						
					});
					
					
					$('#fullCalModal').modal();
					
				}else{
					return false;
				}
			},
			events: function(start,end,timezone,callback) {
		
				var taskCalendarDTOs = new Object();
				var events = [];
				taskCalendarDTOs.startDate = start.format('DD-MMM-YYYY HH:mm:ss');
				taskCalendarDTOs.endDate = end.format('DD-MMM-YYYY HH:mm:ss');	
				taskCalendarDTOs.nricNo = $stateParams.nricNo;
				var destination = "";
				var colors = "";

				var getTaskCalendarsPromise = SelfServiceService.getTaskCalendars(JSON.stringify(taskCalendarDTOs));
				$q.all([getTaskCalendarsPromise]).then(function(data){
					$scope.taskCalendars = data[0];
					
					_.each($scope.taskCalendars, function(taskCalendar){
						
						if ((taskCalendar.statusCode).indexOf("!") !== -1) {
							colors = "red";
						} else if (taskCalendar.userAssignedFlag === 'Y') {
							colors = "mediumblue";
						} else {
							colors = "black";
						}
						
						if(taskCalendar.taskDetailId !== null){
							taskDetailId = taskCalendar.taskDetailId;
						}else{
							taskDetailId = 0;
						}
						
						events.push({
							id: taskDetailId,
							title: taskCalendar.statusCode,
							start: moment(taskCalendar.startDate,'DD-MMM-YYYY HH:mm:ss'),
							end:  moment(taskCalendar.endDate,'DD-MMM-YYYY HH:mm:ss'),
							color: colors
						});
						
					});
					callback(events);
				});
				
			}

		});

		//search for detailsheet only 5 days.
		$scope.search = function(tableState) {
			reloadTable(tableState);
		};
		
		var reloadTable = function(tableState){
			CommonService.initPagination($scope, tableState);
			CommonService.resetPagination($scope, 0, Constants.PAGE_SIZE);
			CommonService.setPaginationSearch($scope, tableState);
			$scope.searchDTO.nricNo = $stateParams.nricNo;
			$scope.searchDTO.order = "asc";
			$scope.searchDTO.orderProperty = "id"; 
			var resultPromise = SelfServiceService.searchTaskDetails($scope.searchDTO);
			$q.all([ resultPromise ]).then(function(data) {
				CommonService.setPaginationResult($scope, tableState, data);
			});
		};
		
		$scope.exportDetailSheet = function(){
			$scope.searchDTO.nricNo = $stateParams.nricNo;
			var resultPromise = SelfServiceService.exportDetailSheet($scope.searchDTO);
			$q.all([ resultPromise ]).then(function(data) {
				$scope.$root.exportFile(data[0], "text/plain", "detailSheet.xlsx");
			});
		};
		
		$scope.mtMaintBookOutDefault = function(){
			$scope.mtMaintApproval = true;
			$scope.mtMaintBookOutDTO.onSiteConfirmationFlag = 'Y';	
		};
	}
});