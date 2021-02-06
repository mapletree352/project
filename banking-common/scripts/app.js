app = angular.module('itms', ['ui.router', 'restangular', 'ngMockE2E', 'ui.bootstrap', 'smart-table', 'ngTable', 'chart.js', 'ngHandsontable', 'ngAnimate', 'ngFileUpload', 'ngSanitize', 'dndLists']);

app.config(function($stateProvider, $urlRouterProvider, $uibTooltipProvider, $animateProvider, RestangularProvider, $provide, Constants) {
	$urlRouterProvider.when('/', '/dashboard').otherwise('/dashboard');

	$uibTooltipProvider.options({
		placement: 'right'
	});

	$animateProvider.classNameFilter(/^(?:(?!no-animation).)*$/);
	
	$('[data-submenu]').submenupicker();
	
	angular.forEach(routes, function (key) {
		$stateProvider.state(key);
	});
	
	RestangularProvider.setBaseUrl(Constants.BASE_URL);
	RestangularProvider.setDefaultHeaders({ authorization: '0' });
	
	$provide.decorator("$sanitize", function($delegate, $log){
	     return function(text, target){
	    	 var result = $delegate(text, target);
	         return result;
	     };
	 });
});

app.run(function ($http, $sce, $rootScope, $q, $window, $location, $sanitize, CommonService, IndentService, Constants, Restangular) {
	
	// polyfill for startsWith js function as IE does not support it
	if (!String.prototype.startsWith) {
	    String.prototype.startsWith = function(searchString, position){
	      position = position || 0;
	      if (searchString) {
	    	  return this.substr(position, searchString.length) === searchString;  
	      } else {
	    	  return false;
	      }
	  };
	}
	
	// polyfill for endsWith js function as IE does not support it
	if (!String.prototype.endsWith) {
	  String.prototype.endsWith = function(searchString, position) {
	      var subjectString = this.toString();
	      if (typeof position !== 'number' || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length) {
	        position = subjectString.length;
	      }
	      position -= searchString.length;
	      var lastIndex = subjectString.lastIndexOf(searchString, position);
	      return lastIndex !== -1 && lastIndex === position;
	  };
	}
	
	// polyfill for includes function as IE does not support it
	if (!String.prototype.includes) {
	    String.prototype.includes = function() {
	        'use strict';
	        return String.prototype.indexOf.apply(this, arguments) !== -1;
	    };
	}
	
	$rootScope.loading = false;
	Restangular.addRequestInterceptor(function (element) {
        $rootScope.loading = true;
        return element;
    });
	
	Restangular.addResponseInterceptor(function (data) {
		$rootScope.loading = false;
		return data;
    });
	
	// allow underscore.js to be used in all .html as well
	$rootScope._ = _; 
	
	// allow commonly used navigational functions in all modules
	$rootScope.go = function(path) {
		$location.path(path);
	};
	
	$rootScope.back = function() {
		$window.history.back();
	};
	
	$rootScope.refresh = function() {
		$window.location.reload();
	};
	
	$rootScope.reloadPage = function(url) {
		$rootScope.go('/loading');
		setTimeout(function() {
			$rootScope.go(url);
	    }, 0);
	}
	
	$rootScope.pagingSize = Constants.PAGING_SIZE;
	
	// allow commonly used typeahead search of Person, Vehicle, and Unit in all modules (typeahead in ITMS is used as a check and typo-prevention... 
	// it should not include biz validation, like what node can see what data, or if person is a driver or has a user account etc
	// as typeahead is enforced to select from list, these 3 tables should be ever-increasing to allow searching of old data as well, (i.e. STO vehicle, resigned ppl, stand-down NS unit)
	// please strongly advise customer to not include validation in typeahead due to performance and validation-consistency... biz validation should still come from the search/save/update result)
	$rootScope.searchRegisterNricNames = function(nricOrName,userDetail){
		if(userDetail == null && userDetail == undefined){
			return $rootScope.errorDialog("Please enter user details before proceed to handover and approver particulars.");
		}else if($rootScope.filterSpecialChar(nricOrName)){
			return $rootScope.errorDialog("Please use either alphabets or numbers to search.");
		} else {
			return CommonService.searchNricNames(nricOrName,userDetail.unitCode);
		}
	};
	
	$rootScope.searchNricNames = function(nricOrName) {
		if($rootScope.filterSpecialChar(nricOrName)){
			return $rootScope.errorDialog("Please use either alphabets or numbers to search.");
		} else {
			return CommonService.searchNricNames(nricOrName,null);
		}
	};
	
	$rootScope.searchUnits = function(codeOrName) {
		if($rootScope.filterSpecialChar(codeOrName)){
			return $rootScope.errorDialog("Please use either alphabets or numbers to search.");
		} else {
			if ($rootScope.session.userRole.cat === 'Hub' && $rootScope.session.userRole.hubCode) {
				return CommonService.searchUnitsByHub(codeOrName, $rootScope.session.userRole.hubCode);
			} else if($rootScope.session.userRole.cat === 'Node' && $rootScope.session.userRole.hubCode) {
				return CommonService.searchUnitsByNode(codeOrName, $rootScope.session.userRole.nodeId);
			} else {
				return CommonService.searchUnits(codeOrName);
			}
		}
	};

	$rootScope.searchSubunits = function(codeOrName) {
		if($rootScope.filterSpecialChar(codeOrName)){
			return $rootScope.errorDialog("Please use either alphabets or numbers to search.");
		} else {
			return CommonService.searchSubunits(codeOrName);
		}
	};
	
	$rootScope.searchVehicleNoTypes = function(vehicleNoOrType) {
		if($rootScope.filterSpecialChar(vehicleNoOrType)){
			return $rootScope.errorDialog("Please use either alphabets or numbers to search.");
		} else {
			return CommonService.searchVehicleNoTypes(vehicleNoOrType);
		}
	};
	
	// allow commonly used filters in all modules
	$rootScope.filterNodes = function(hubCode) {
		return CommonService.filterNodes(hubCode);
	};
	
	$rootScope.filterSubunits = function(unitCode) {
		return CommonService.filterSubunits(unitCode);
	};
	
	$rootScope.filterSpecialChar = function(input){
		if(input.includes("<") || input.includes(">") || input.includes("'") || input.includes("\'") || input.includes("\"") || input.includes("(") || input.includes(")") || input.includes(";") || input.includes("%")){
			return true;
		}	
	};

	// allow standard pop-up dialogs to be used in all modules 
	$rootScope.confirmDialog = function(message, action, param) {	
		$rootScope.confirmDialogMessage = $sce.trustAsHtml(message);
		$rootScope.confirmDialogAction = action;
		$rootScope.confirmDialogParam = param;
		$('#confirmDialog').modal({ backdrop:'static' });
	};
	
	$rootScope.infoDialog = function(message) {	
		$rootScope.infoDialogMessage = $sce.trustAsHtml(message);
		$('#infoDialog').modal({ backdrop:'static' });
	};
	
	$rootScope.errorDialog = function(message) {	
		$rootScope.errorDialogMessage = $sce.trustAsHtml(message);
		$('#errorDialog').modal({ backdrop:'static' });
	};
	
	$rootScope.internalErrorDialog = function(message) {
		$rootScope.internalErrorDialogMessage = $sce.trustAsHtml(message);
		$('#internalErrorDialog').modal();
	};
	
	$(document).on('show.bs.modal', '.modal', function () {
	    var zIndex = 1040 + (10 * $('.modal:visible').length);
	    $(this).css('z-index', zIndex);
	    setTimeout(function() {
	        $('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack');
	    }, 0);
	});
	
	$rootScope.parseDateRange = function(string) {
		if (string) {
			var dateRange = string.split(" to ");
			if (dateRange && dateRange.length === 2) {
				dateRange[0] = moment(dateRange[0], "DD-MMM-YYYY HH:mm:ss a");
				dateRange[1] = moment(dateRange[1], "DD-MMM-YYYY HH:mm:ss a");
				return dateRange;
			}
		}
	};
	
	$rootScope.extract = function(string) {
		if (string) {
			var start = string.lastIndexOf("(");
			var end = string.lastIndexOf(")");
			if (start !== -1 && end !== -1) {
				return string.substring(start + 1, end);	
			} else {
				return string;
			}
		}
		return string;
	};
	
	$rootScope.exportFile = function(data, dataType, fileName) {
		
		var blob = new Blob([data], {type: dataType});
		if(navigator.appVersion.toString().indexOf('.NET')>0){
			window.navigator.msSaveBlob(blob,fileName);
		}else{
			var url = window.URL || window.webkitURL;
	        var fileURL = url.createObjectURL(blob);
			var downloadLink = angular.element('<a></a>');
	        downloadLink.attr('href', fileURL);
	        downloadLink.attr('download', fileName);
			downloadLink[0].click();
			url.revokeObjectURL(fileURL);
		}
		
	};
		
	// UAT only
	$rootScope.showUatLogin = function() {
		$('#uatLoginDialog').modal();
	};
	
	$rootScope.changeLogin = function(isSelfService, isChangeRole) {
		Restangular.setDefaultHeaders({ authorization: '0' });
		if (isChangeRole) {
			var userRoleId = $rootScope.session.userRole.id;
			$rootScope.session = { loginId: $rootScope.loginId, password:$rootScope.password, userRole: { id: userRoleId } };
		} else {
			$rootScope.session = { loginId: $rootScope.loginId, password:$rootScope.password, userRole: {} };
		}
		$rootScope.login(isSelfService);
	};
	
	$rootScope.checkAccessRights = function(rightsCode) {
		if (!$rootScope.session.rights || !$rootScope.session.rights[rightsCode]) {
			if ($rootScope.session.token) {
				$rootScope.errorDialog("Your logged in role does not has the rights to access the page. If you have other roles in your account, you may log them in at the top-right corner and try again.");
				$rootScope.reloadPage('/dashboard');
			} else {
				$rootScope.login();	
			}
			return false;
		}
		return true;
	};
	
	$rootScope.getTemplates = function() {
		var templatesPromise = CommonService.getTemplates();
		$q.all([ templatesPromise ]).then(function(data) {
	    	$rootScope.templates = data[0];
		});
	};
	
	$rootScope.showTemplatesDialog = function() {
		$('#templatesDialog').modal();
		$rootScope.getTemplates();
	};
	
	$rootScope.indentByTemplate = function(templateId) {
		$('#templatesDialog').modal('hide');
		var templatePromise = CommonService.getTemplate(templateId);
		$q.all([ templatePromise ]).then(function(data) {
			$rootScope.template = data[0];
			IndentService.mapIndent().addIndent($rootScope.template);
			$rootScope.reloadPage('/indent_new');
		});
	};
	
	// convenient method to limit data access in searchDTO based on the selected user role category
	$rootScope.limitAccess = function(searchDTO) {
		if ($rootScope.session.userRole.cat === Constants.USER_ROLE_CAT_UNIT) {
			if ($rootScope.session.userRole.formationCode) {
				searchDTO.formationCode = $rootScope.session.userRole.formationCode;	
			} else {
				searchDTO.unitCode = $rootScope.session.userRole.unitCode;	
			}
		} else if ($rootScope.session.userRole.cat === Constants.USER_ROLE_CAT_NODE) {
			searchDTO.nodeId = $rootScope.session.userRole.nodeId;		
		} else if ($rootScope.session.userRole.cat === Constants.USER_ROLE_CAT_HUB) {
			searchDTO.hubCode = $rootScope.session.userRole.hubCode;	
		}
	};
	
	$rootScope.isUat = Constants.IS_UAT;
	$rootScope.loginId = 'S1234567A'; // simulate by specifying ISAC-Card ID
	$rootScope.password = ''; // simulate by specifying ISAC-Card S/N (blank if it is not used)
	$rootScope.session = { loginId:$rootScope.loginId, password:$rootScope.password, userRole:{} };
	
	$rootScope.login = function() {
		var url = $location.path();
		if ($rootScope.isUat) {
			$http.get(Constants.BASE_URL_FRONTEND + url, { headers:  { "SM_USER": $rootScope.loginId } }).then(function(response) {
				doLogin(response, url);
			});
		} else {
			$http.get(Constants.BASE_URL_FRONTEND + url).then(function(response) {
				doLogin(response, url);
			});	
		}		
	};
	
	// re-access page again to read SiteMinder header to do login as there is no way to read headers on initial page access
	var doLogin = function(response, url) {
		$rootScope.loginId = response.headers(Constants.SM_USER);
		$rootScope.session.loginId = $rootScope.loginId;
		// proceed to do login
		$http.post(Constants.BASE_URL + "/user/login", $rootScope.session).then(function(loginResponse) {
			var session = loginResponse.data;
			if (session.errorCode) {
				if (session.errorCode === Constants.USER_NOT_FOUND) {
					$location.path("/register");
				} else if (session.errorCode === Constants.USER_NOT_ACTIVE) {
					$location.path("/reactivate");
				} else if(session.errorCode === Constants.USER_VALIDITY_DATE_EXPIRED) {
					$rootScope.errorDialog(Constants.USER_VALIDITY_DATE_EXPIRED);
				}
			} else {
				Restangular.setDefaultHeaders({ authorization: session.token });
				$rootScope.session = session;
				$rootScope.session.password = $rootScope.password;
				$rootScope.reloadPage(url);
			}
		});
	}
	
	// intercept 401 UNAUTHORIZED error and attempt to login, 400 BAD_REQUEST to display errorDialog, 500 for internal server errors, -1 for no response, and all other errors
	Restangular.setErrorInterceptor(function(response, deferred, responseHandler) {
		$rootScope.loading = false;
	    if (response.status === Constants.UNAUTHORIZED) {
	    	$rootScope.login(response.config.url);
	        return false;
	    } else if (response.status === Constants.BAD_REQUEST) {
	    	$rootScope.errorDialog($sanitize(response.data.message));
	    } else if (response.status === Constants.INTERNAL_SERVER_ERROR) {
	    	$rootScope.internalErrorDialog($sanitize(response.data.message));
	    } else if (response.status === Constants.SERVER_NOT_RESPONDING) {
	    	$rootScope.errorDialog("The server is not responding, please try again in a while. If the error persisted, kindly contact the ITMS technical support team with a full screenshot. Thank you.<br><br><small>Error Code: " + response.status + "</small>");
	    } else {
	    	$rootScope.errorDialog("A system error has occured, please try again in a while. If the error persisted, kindly contact the ITMS technical support team with a full screenshot. Thank you.<br><br><small>Error Code: " + response.status + "</small>");
	    }
	    return true;
	});
	
	// for testing of email
	$rootScope.testEmailClicked = false;
	$rootScope.testEmailNricNo = '';
	$rootScope.testEmail = function() {
    	var resultPromise = CommonService.testEmail($rootScope.testEmailNricNo);
    	$rootScope.testEmailClicked = true;
    	$q.all([ resultPromise ]).then(function(data) {
            $rootScope.infoDialog(data[0]);
            $rootScope.testEmailClicked = false;
    	});
    }
	
});