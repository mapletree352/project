app.controller('CreditAllocationHqController', function($q, $scope, CreditService, CommonService) {
	if(!$scope.$root.checkAccessRights('showCreditAllocationHq')){return;}
	$scope.currentYear = moment().year();
	$scope.newAllocationTotal = 0;
	$scope.newDTO = { workYear: String($scope.currentYear) };
	$scope.todayDate =  moment().format("DD-MMM-YYYY"); 
	
	$scope.getAllocationsHq = function() {
		var allocationStatusPromise = CreditService.getAllocationsHq($scope.newDTO.workYear);
		$q.all([ allocationStatusPromise ]).then(function(data) {
			$scope.totalAmt = data[0].allocatedAmt;
			$scope.remainingAmt = data[0].remainingAmt;
			$scope.allocations = data[0].allocations;
			$scope.newDTO = data[0].newAllocation;	
			$scope.newDTO.workYear = String($scope.newDTO.workYear);
			$scope.newAllocationTotal = 0;
			//$scope.newUsableCredits = 0;
		});
	};
	$scope.getAllocationsHq();
	
	$scope.getPastCredits = function(allocation, formationCode) {
		for (var i = 0; i < allocation.distributions.length; i++) {
			if (allocation.distributions[i].formationCode === formationCode) {
				return allocation.distributions[i].credits;
			}
		}
		return 0;
	};
	
	$scope.getLatestTotalProvision = function(distributions) {
		$scope.latestProvisionTotal = 0;
		_.each(distributions, function(distribution) {
			$scope.latestProvisionTotal += distribution.allocatedTotal;
		});
		return $scope.latestProvisionTotal;
	};
	
	$scope.getLatestTotalUsableCredits = function(distributions) {
		$scope.totalUsableCredits = 0;
		_.each(distributions, function(distribution) {
			$scope.totalUsableCredits += distribution.usableCredits;
		});
		return $scope.totalUsableCredits;
	};
		
	$scope.computeTotalCredits = function(distribution) {
		// compute the formation's allocated credits so far for the work year
		if (angular.isUndefined(distribution.originalTotal)) {
			distribution.originalTotal = distribution.allocatedTotal;	
		}
		if(isNaN(parseFloat(distribution.credits))){
			distribution.allocatedTotal = distribution.originalTotal;
		} else{
			distribution.allocatedTotal = distribution.originalTotal + parseFloat(distribution.credits);
		}		

//		if (angular.isUndefined(distribution.originalUsable)) {
//			distribution.originalUsable = distribution.usableCredits;	
//		}
//		if(isNaN(parseFloat(distribution.usableCredits))){
//			distribution.usableCredits = distribution.originalUsable;
//		} else{
//			distribution.usableCredits = distribution.originalUsable + parseFloat(distribution.credits);
//		}
		
		// compute the new allocation's total credits
		$scope.newAllocationTotal = 0;
		//$scope.newUsableCredits = 0;
		_.each($scope.newDTO.distributions, function(distribution) {
			if(isNaN(parseFloat(distribution.credits))){	
			} else{
				$scope.newAllocationTotal += parseFloat(distribution.credits);
				//$scope.newUsableCredits += parseFloat(distribution.cedits);
			}
		});
	};
	
	$scope.checkRemainingCredits = function() {
		if ($scope.newAllocationTotal > $scope.remainingAmt) {
			$scope.$root.errorDialog("This work year does not have sufficient credits for the allocation.")
		} else if($scope.newAllocationTotal>0 && $scope.totalAmt!= $scope.remainingAmt){
			$scope.$root.confirmDialog("There are balance credits in this transfer. These credits will be taken from or returned to your Remaining Credits pool. Do you wish to proceed?",$scope.showRemarkDialogHq,null)
		}else {
			for (var i = 0; i < $scope.newDTO.distributions.length; i++) {
				if ($scope.newDTO.distributions[i].allocatedTotal < 0) {
					$scope.$root.errorDialog("There is insufficient credits to carry out the transfer.")		
					return;
				}
			}
			if($scope.newAllocationTotal!=0 && $scope.newDTO.allocationLevel!=0){
				$scope.$root.confirmDialog("There are balance credits in this transfer. These credits will be taken from or returned to your Remaining Credits pool. Do you wish to proceed?",$scope.showRemarkDialogHq,null);	
			} else{
				$('#allocateCreditsModal').modal({ backdrop:'static' });
			}
		}
	};
	
	$scope.showRemarkDialogHq = function(){
		$('#allocateCreditsModal').modal({ backdrop:'static' });
	}
	$scope.saveAllocationsHq = function() {
		var resultMessagePromise = CreditService.saveAllocationsHq($scope.newDTO);
		$q.all([ resultMessagePromise ]).then(function(data) {
			$scope.$root.infoDialog(data[0]);
			$scope.newAllocationTotal = 0;
			$scope.getAllocationsHq();
		});
	};
	
	$scope.saveOrUpdateHqCreditStatus = function() {
		$scope.hqCreditStatusDTO.workYear = $scope.newDTO.workYear;
		var resultMessagePromise = CreditService.saveOrUpdateHqCreditStatus($scope.hqCreditStatusDTO);
		$q.all([ resultMessagePromise ]).then(function(data) {
			$scope.$root.infoDialog(data[0]);
			$scope.newAllocationTotal = 0;
			$scope.getAllocationsHq();
		});
	};
	
});

app.controller('CreditAllocationDivFmnController', function($q, $scope, CreditService, CommonService) {
	if(!$scope.$root.checkAccessRights('showCreditAllocationDivFmn')){return;}
	var formationPromise = CommonService.getFormations();
	$scope.currentYear = moment().year();
	$scope.newAllocationTotal = 0;
	$scope.newDTO = { workYear: String($scope.currentYear) };
	$scope.todayDate =  moment().format("DD-MMM-YYYY"); 
	$scope.$root.limitAccess($scope.newDTO);
	
	$q.all([ formationPromise ]).then(function(data) {
		$scope.formations = data[0];
	});
	
	$scope.getAllocationsDivFmn = function() {
		if ($scope.newDTO.formationCode) {
			var allocationsPromise = CreditService.getAllocationsDivFmn($scope.newDTO.workYear, $scope.newDTO.formationCode);
			$q.all([ allocationsPromise ]).then(function(data) {
				$scope.allocatedAmt = data[0].allocatedAmt;
				$scope.remainingAmt = data[0].remainingAmt;
				$scope.allocations = data[0].allocations;
				$scope.newDTO = data[0].newAllocation;	
				$scope.newDTO.workYear = String($scope.newDTO.workYear);
				$scope.$root.limitAccess($scope.newDTO);
				$scope.newAllocationTotal = 0;
				$scope.newUsableCredits = 0;
			});	
		}
	};
	$scope.getAllocationsDivFmn();
	
	$scope.getPastCredits = function(allocation, unitCode) {
		for (var i = 0; i < allocation.distributions.length; i++) {
			if (allocation.distributions[i].unitCode === unitCode) {
				return allocation.distributions[i].credits;
			}
		}
		return 0;
	};
	
	$scope.getLatestTotalProvision = function(distributions) {
		$scope.latestProvisionTotal = 0;
		_.each(distributions, function(distribution) {
			$scope.latestProvisionTotal += distribution.allocatedTotal;
		});
		return $scope.latestProvisionTotal;
	};
	
	$scope.getLatestTotalUsableCredits = function(distributions) {
		$scope.totalUsableCredits = 0;
		_.each(distributions, function(distribution) {
			$scope.totalUsableCredits += distribution.usableCredits;
		});
		return $scope.totalUsableCredits;
	};
	
	$scope.computeTotalCredits = function(distribution) {
		// compute the unit's allocated credits so far for the work year
		if (angular.isUndefined(distribution.originalTotal)) {
			distribution.originalTotal = distribution.allocatedTotal;	
		}
		if(isNaN(parseFloat(distribution.credits))){
			distribution.allocatedTotal = distribution.originalTotal;
		} else{
			distribution.allocatedTotal = distribution.originalTotal + parseFloat(distribution.credits);
		}
		
		if (angular.isUndefined(distribution.originalUsable)) {
			distribution.originalUsable = distribution.usableCredits;	
		}
		if(isNaN(parseFloat(distribution.usableCredits))){
			distribution.usableCredits = distribution.originalUsable;
		} else{
			distribution.usableCredits = distribution.originalUsable + parseFloat(distribution.credits);
		}
		// compute the new allocation's total credits
		$scope.newAllocationTotal = 0;
		$scope.newUsableCredits = 0;
		_.each($scope.newDTO.distributions, function(distribution) {
			if(isNaN(parseFloat(distribution.credits))){	
			} else{
				$scope.newAllocationTotal += parseFloat(distribution.credits);
				$scope.newUsableCredits += parseFloat(distribution.cedits);
			}
		});
	};
	
	$scope.checkRemainingCredits = function() {
		if ($scope.newAllocationTotal > $scope.remainingAmt) {
			$scope.$root.errorDialog("Your division / formation do not have sufficient credits for the allocation.")
		} 
		else {
			for (var i = 0; i < $scope.newDTO.distributions.length; i++) {
				if ($scope.newDTO.distributions[i].allocatedTotal < 0) {
					$scope.$root.errorDialog("There is insufficient credits to carry out the transfer.")		
					return;
				}
			}
			if($scope.newAllocationTotal!=0 && $scope.newDTO.allocationLevel!=0){
				$scope.$root.confirmDialog("There are balance credits in this transfer. These credits will be taken from or returned to your Remaining Credits pool. Do you wish to proceed?",$scope.showRemarkDialog,null);	
			} else{
				$('#allocateCreditsModal').modal({ backdrop:'static' });	
			}
		}
	};
	
	$scope.showRemarkDialog = function(){
		$('#allocateCreditsModal').modal({ backdrop:'static' });
	}
	$scope.saveAllocationsDivFmn = function() {
		var resultMessagePromise = CreditService.saveAllocationsDivFmn($scope.newDTO);
		$q.all([ resultMessagePromise ]).then(function(data) {
			$scope.$root.infoDialog(data[0]);
			$scope.newAllocationTotal = 0;
			$scope.getAllocationsDivFmn();
		});
	};
});

app.controller('CreditStatusSearchController', function($q, $scope, CreditService, CommonService, Constants) {
	if(!$scope.$root.checkAccessRights('showCreditStatus')){return;}
	var formationsPromise = CommonService.getFormations();
	var hubsPromise = CommonService.getHubs();
	var nodesPromise = CommonService.getNodes();
	$scope.currentYear = moment().year();
	$scope.advSearchCollapsed = true;
	$scope.searchDTO = { workYear:String($scope.currentYear), startIndex:0, pageSize:Constants.PAGE_SIZE };
	$scope.$root.limitAccess($scope.searchDTO);
	
	$q.all([ formationsPromise, hubsPromise, nodesPromise ]).then(function(data) {
		$scope.formations = data[0];
		$scope.hubs = data[1];
    	$scope.nodes = data[2];
	});

	$scope.paginate = function(tableState) {
		if (CommonService.initPagination($scope, tableState)) {
			CommonService.setPaginationSearch($scope, tableState);
			var resultPromise = CreditService.searchCreditStatuses($scope.searchDTO);
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
		CommonService.search($scope, "unit.name");
	};
	
	$scope.download = function() {
		var resultPromise = CreditService.exportCreditStatuses($scope.searchDTO);
		$q.all([ resultPromise ]).then(function(data) {
			$scope.$root.exportFile(data[0], "text/plain", "credit_statuses.xlsx");
		});
	};

	$scope.reset = function() {
		CommonService.resetPagination($scope, 0, Constants.PAGE_SIZE);
		$scope.searchDTO = { startIndex:0, pageSize:Constants.PAGE_SIZE };
		$scope.$root.limitAccess($scope.searchDTO);
		$scope.unit = "";
	};
});

app.controller('CreditTxnSearchController', function($q, $scope, $stateParams, CreditService, CommonService, Constants) {
	if(!$scope.$root.checkAccessRights('showCreditStatus')){return;}
	var creditTxnTypesPromise = CommonService.getCreditTxnTypes();
	$scope.unit = $stateParams.unit;
	$scope.searchDTO = { unitCode: $stateParams.unitCode, workYear: $stateParams.workYear, startIndex:0, pageSize:Constants.PAGE_SIZE };
	
	$q.all([ creditTxnTypesPromise ]).then(function(data) {
		$scope.creditTxnTypes = data[0];
	});
	
	$scope.paginate = function(tableState) {
		if (CommonService.initPagination($scope, tableState)) {
			CommonService.setPaginationSearch($scope, tableState);
			var resultPromise = CreditService.searchCreditTxns($scope.searchDTO);
			$q.all([ resultPromise ]).then(function(data) {
				CommonService.setPaginationResult($scope, tableState, data);
				if (data[0].records.length === 0) {
					$scope.$root.infoDialog("No result found.");
				}
			});
		} else {
			$scope.search();
		}
	};

	$scope.search = function() {
		CommonService.resetPagination($scope, 0, Constants.PAGE_SIZE);
		CommonService.search($scope, "txnTime");
	};
	
	$scope.download = function() {
		var resultPromise = CreditService.exportCreditTxns($scope.searchDTO);
		$q.all([ resultPromise ]).then(function(data) {
			$scope.$root.exportFile(data[0], "application/vnd.ms-excel", "credit_transactions.xlsx");
		});
	};
});

app.controller('CreditReturnController', function($q, $scope, CreditService, CommonService, Constants) {
	if(!$scope.$root.checkAccessRights('showCreditReturnApproval')){return;}
	$scope.currentYear = moment().year();
	$scope.returnDTO = { workYear: String($scope.currentYear) };
	
	$scope.getUnitPenaltyCredits = function(unitCode) {
		if (unitCode) {
			$scope.returnDTO.unitCode = unitCode;
			var penaltyCreditsPromise = CreditService.getUnitPenaltyCredits($scope.returnDTO.workYear, unitCode);
			$q.all([ penaltyCreditsPromise ]).then(function(data) {
				$scope.penaltyCredits = data[0];
			});	
		}
	};
	
	$scope.returnCredits = function() {
		if ($scope.returnDTO.credits > $scope.penaltyCredits || $scope.returnDTO.credits <= 0) {
			$scope.$root.errorDialog("Credits to be returned cannot be 0 or more than the Total Penalty Credits.");
		} else {
			var penaltyCreditsPromise = CreditService.returnCredits($scope.returnDTO);
			$q.all([ penaltyCreditsPromise ]).then(function(data) {
				$scope.$root.infoDialog(data[0]);
				$scope.getUnitPenaltyCredits($scope.returnDTO.unitCode);
			});	
		}
	};
	
	$scope.reset = function() {
		$scope.returnDTO = { workYear: String($scope.currentYear) };
		$scope.penaltyCredits = undefined;
		$scope.unit = "";
	};
	
});