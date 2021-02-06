app.controller('PersonnelSearchController', function($q, $scope, PersonnelService, CommonService, Constants) {
	if(!$scope.$root.checkAccessRights('showSearchSafPersonnel')){return;}
	$scope.searchDTO = { startIndex:0, pageSize:Constants.PAGE_SIZE };
			
	$scope.paginate = function(tableState) {
		if (CommonService.initPagination($scope, tableState)) {
			CommonService.setPaginationSearch($scope, tableState);
			var resultPromise = PersonnelService.searchPersonnels($scope.searchDTO);
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
		var resultPromise = PersonnelService.exportPersonnels($scope.searchDTO);
		$q.all([ resultPromise ]).then(function(data) {
			$scope.$root.exportFile(data[0], "text/plain", "personnel.xlsx");
		});
	};
});

app.controller('PersonnelController', function($q, $scope, $stateParams, PersonnelService, CommonService, Constants) {
	if(!$scope.$root.checkAccessRights('showSearchSafPersonnel')){return;}
	$scope.photoUrl = Constants.DEFAULT_PERSONNEL_PHOTO_URL;
	var personnelPromise = PersonnelService.getPersonnel($stateParams.nricNo);
	
	$q.all([ personnelPromise ]).then(function(data) {
		$scope.dto = data[0];
		
		var photoUrlPromise = CommonService.getPersonnelPhotoUrl($stateParams.nricNo);
		$q.all([ photoUrlPromise ]).then(function(urlData) {
			$scope.photoUrl = urlData[0] ? urlData[0] : Constants.DEFAULT_PERSONNEL_PHOTO_URL;	
		});
	});
});
