var _dateFormat = 'DD-MMM-YYYY',
	_dateTimeFormat = 'DD-MMM-YYYY HH:mm';

/*
 * Generic directives
 */

app.directive('decideButton', function() {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			yes: '@yes',
			hold: '@hold',
			no: '@no',
			toAll: '=',
			ngModel: '=',
			decisionCount: '='
		},
		template: '	<div class="btn-group" data-toggle="button">\
						<div ng-show="yes" class="btn btn-default" dcBtnName="{{toAll ? \'all\' : \'yes\'}}">{{yes}}{{toAll ? \' All\': \'\'}}</div>\
						<div ng-show="hold" class="btn btn-default" dcBtnName="{{toAll ? \'all\' : \'hold\'}}">{{hold}}{{toAll ? \' All\': \'\'}}</div>\
						<div ng-show="no" class="btn btn-default" dcBtnName="{{toAll ? \'all\' : \'no\'}}">{{no}}{{toAll ? \' All\': \'\'}}</div>\
					</div>',
		link: function(scope, element, attrs) {
			scope.ngModel = 'UNDECIDED';
			scope.decisionCount = 0;
			$('.btn', element).click(function() {
				var btn = $(this), ngModel;
				if (!btn.hasClass('active')) {
					if (scope.ngModel === 'UNDECIDED') {
						scope.decisionCount = scope.decisionCount + 1;
					}
					btn.siblings().removeClass('active btn-success btn-danger btn-warning').addClass('btn-default');
					if (btn.text().startsWith(scope.yes)) {
						ngModel = 'YES';
						btn.removeClass('btn-default').addClass('btn-success');
						if (scope.toAll) {
							scope.decisionCount = $('[dcBtnName|="yes"]').length;
							$('[dcBtnName|="yes"]').removeClass('btn-default').addClass('active btn-success');
							$('[dcBtnName|="hold"]').removeClass('active btn-warning').addClass('btn-default');
							$('[dcBtnName|="no"]').removeClass('active btn-danger').addClass('btn-default');
						}
					} else if (btn.text().startsWith(scope.hold)) {
						ngModel = 'HOLD';
						btn.removeClass('btn-default').addClass('btn-warning');
						if (scope.toAll) {
							scope.decisionCount = $('[dcBtnName|="hold"]').length;
							$('[dcBtnName|="yes"]').removeClass('active btn-success').addClass('btn-default');
							$('[dcBtnName|="hold"]').removeClass('btn-default').addClass('active btn-warning');
							$('[dcBtnName|="no"]').removeClass('active btn-danger').addClass('btn-default');
						}
					} else if (btn.text().startsWith(scope.no)) {
						ngModel = 'NO';
						btn.removeClass('btn-default').addClass('btn-danger');
						if (scope.toAll) {
							scope.decisionCount = $('[dcBtnName|="no"]').length;
							$('[dcBtnName|="yes"]').removeClass('active btn-success').addClass('btn-default');
							$('[dcBtnName|="hold"]').removeClass('active btn-warning').addClass('btn-default');
							$('[dcBtnName|="no"]').removeClass('btn-default').addClass('active btn-danger');
						}
					}
				} else {
					scope.decisionCount = scope.decisionCount - 1;
					ngModel = 'UNDECIDED';
					btn.removeClass('btn-success btn-danger btn-warning').addClass('btn-default');
					if (scope.toAll) {
						scope.decisionCount = 0;
						$('[dcBtnName|="yes"]').removeClass('active btn-success').addClass('btn-default');
						$('[dcBtnName|="hold"]').removeClass('active btn-warning').addClass('btn-default');
						$('[dcBtnName|="no"]').removeClass('active btn-danger').addClass('btn-default');	
					}
				}
				if (!scope.toAll) {
					$('[dcBtnName|="all"]').removeClass('active btn-success btn-danger btn-warning').addClass('btn-default');
				}
				scope.$apply(function() {
					scope.ngModel = ngModel;
					scope.decisionCount = scope.decisionCount;
				});
			});
		}
	};
});

app.directive('decideBox', function() {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			ngModel: '=',
			decision: '='	
		},
		template: '<div class="btn btn-xs btn-success glyphicon glyphicon-ok"></div>',
		link: function(scope, element, attrs) {
			scope.ngModel = 'YES';
			$(element).click(function() {
				var btn = $(this);
				if (btn.hasClass('btn-success')) {
					scope.ngModel = 'NO';
					btn.removeClass('btn-success glyphicon-ok').addClass('btn-danger glyphicon-remove');
				} else {
					scope.ngModel = 'YES';
					btn.removeClass('btn-danger glyphicon-remove').addClass('btn-success glyphicon-ok');
				}
			});
		}
	};
});

app.directive("sort", function() {
	return {
		restrict: 'A',
	    require: '^stTable',
	    transclude: true,
	    template: '<span class="sort" ng-class="{order: tableState.order === \'desc\'}" ng-show="tableState.orderProperty === property" /><a href="" style="color:black" ng-click="onClick()" id="{{property}}"><span ng-transclude /></a>',
	    scope: {
	    	property: '@', // creating isolated (aka. child) scope for 1-way binding of attribute value so that template can use
	    	initial: '@', // set initial sort when first click
	    	toggle: '@' // set toggle mode (i.e. 2 state mode)
	    },
	    link: function (scope, element, attrs, ctrl) {
	    	if (!scope.initial) {
	    		scope.initial = 'asc'; // default
	    	}
	    	if (!scope.toggle) {
	    		scope.toggle = 'true'; // default
	    	}
	    	scope.onClick = function() {
	    		scope.tableState = scope.$parent.tableState;
	    		if (scope.initial === 'asc') {
	    			if (angular.isDefined(scope.tableState.orderProperty) && scope.tableState.orderProperty === scope.property) {
		    			if (scope.tableState.order === 'asc') {
		    				scope.tableState.order = 'desc';
		    			} else {
		    				if (scope.toggle === 'true') {
		    					// 2 state (asc / desc)
		    					scope.tableState.order = 'asc';
		    				} else {
		    					// 3 state (asc / desc / unordered)
		    					scope.tableState.order = undefined;
			    				scope.tableState.orderProperty = undefined;
		    				}
		    			}
		    		} else {
		    			scope.tableState.order = 'asc';
		    			scope.tableState.orderProperty = scope.property;
		    		}
    			} else {
    				if (angular.isDefined(scope.tableState.orderProperty) && scope.tableState.orderProperty === scope.property) {
		    			if (scope.tableState.order === 'desc') {
		    				scope.tableState.order = 'asc';
		    			} else {
		    				if (scope.toggle === 'true') {
		    					// 2 state (desc / asc)
		    					scope.tableState.order = 'desc';
		    				} else {
		    					// 3 state (desc / asc / unordered)
		    					scope.tableState.order = undefined;
			    				scope.tableState.orderProperty = undefined;
		    				}
		    			}
		    		} else {
		    			scope.tableState.order = 'desc';
		    			scope.tableState.orderProperty = scope.property;
		    		}
    			}
	    		ctrl.pipe();
	    	};
	    }
    }
});

app.directive("stSort", function() {
	return {
		restrict: 'A',
	    require: '^stTable',
	    transclude: true,
	    template: '<a href="" style="color:black"><span ng-transclude /></a>',
    }
});

app.directive("noSort", function() {
	return {
		restrict: 'A',
	    require: '^stTable',
	    transclude: true,
	    template: '<span style="cursor:not-allowed"><span ng-transclude /></span>',
    }
});

app.directive('yesNo', function() {
	return {
		restrict: 'E',
		replace: true,
		template: '<select class="form-control"><option></option><option value="Y">Yes</option><option value="N">No</option></select>',
		scope: {
			ngModel: '='
	    }
	};
});

app.directive('yesNoOnly', function() {
	return {
		restrict: 'E',
		replace: true,
		template: '<select class="form-control"><option value="Y">Yes</option><option value="N">No</option></select>',
		scope: {
			ngModel: '='
	    }
	};
});

app.directive('typeahead', function() {
	return {
		restrict: 'E',
		replace: true,
		template: '<input class="form-control" autocomplete="off" typeahead-min-length="2" typeahead-wait-ms="500" typeahead-editable="false" />',
		scope: {
			ngModel: '=',
			placeholder: '@',
			typeaheadOnSelect: '@',
			uibTypeahead: '@'
		}
	};
});

app.directive('datebox', function() {
	return {
		restrict: 'A',
		require : 'ngModel',
		scope: {
			minDate: '@',
			maxDate: '=',
			ngModel:'='
		},
		link: function(scope, element, attrs, ngModelCtrl) {
			$(element).datetimepicker(_.extend({
				format: _dateFormat,
				minDate: scope.minDate,
			}, scope.$eval(attrs.datebox)));
			
			ngModelCtrl.$render = function() {
				if (angular.isDefined(scope.ngModel)) {
					var date = moment(scope.ngModel, 'DD-MMM-YYYY');
					$(element).data('DateTimePicker').date(date);
				 	ngModelCtrl.$setViewValue(date.format(_dateFormat));	
				}
			};
						
			$(element).on("dp.change", function(e) {
				if (e.date === null) {
					scope.ngModel = undefined;
				} else {
					ngModelCtrl.$setViewValue(moment(e.date, 'DD-MMM-YYYY').format(_dateFormat)); // TODO: to check for invalid date saved into ngModel	
				}
			});
			
			scope.$watch('maxDate', function(newValue, oldValue) {	
				if (newValue) {
					$(element).data('DateTimePicker').maxDate(moment(newValue, "YYYY-MM-DD"));
				}
            }, true);
			
			// move widget to outer most element so that it will not be clipped by the overflow scrollbars
			$(element).on("dp.show", function(e) {
				var widget = $(this).siblings(".bootstrap-datetimepicker-widget");
				var position = widget.offset();
				widget.detach();
				widget.appendTo("body");
				widget.css(position);
				widget.css({"z-index":9999});
			});
		}
	};
});

app.directive('datetimebox', function() {
	return {
		restrict: 'A',
		scope: {
			stepping: '=',
			minDate: '=',
			maxDate: '=',
			ngModel: '='
		},
		require : 'ngModel',
		link: function(scope, element, attrs, ngModelCtrl) {
			var datetimepicker = $(element).datetimepicker(_.extend({
				format: _dateTimeFormat,
				sideBySide: true,
				stepping: scope.stepping ? scope.stepping : 1,
				useCurrent: false
				//defaultDate: moment()
				//maxDate: moment(scope.maxDate, "YYYY-MM-DD HH:mm"),
				//minDate: moment(scope.maxDate, "YYYY-MM-DD HH:mm").subtract(scope.minDate, 'days')			
			}, scope.$eval(attrs.datepicker)));
			
			ngModelCtrl.$render = function(e) {
				if (angular.isDefined(scope.ngModel)) {
					$(element).data('DateTimePicker').date(scope.ngModel);
					if(e !== undefined){
						ngModelCtrl.$setViewValue(moment(e.date, "DD-MMM-YYYY HH:mm").format(_dateTimeFormat));
					}
				}
			 };
		
			scope.$watch('maxDate', function(newValue, oldValue) {				
				if (newValue) {
					$(element).data('DateTimePicker').maxDate(moment(newValue, "YYYY-MM-DD HH:mm"));
				}
            }, true);
			
			scope.$watch('minDate', function(newValue, oldValue) {				
				if (newValue) {
					$(element).data('DateTimePicker').minDate(moment(newValue, "YYYY-MM-DD HH:mm"));
				}
            }, true);

			$(element).on("dp.change", function(e) {
				if (e.date === null) {
					scope.ngModel = undefined;
				} else {
					ngModelCtrl.$setViewValue(moment(e.date, "DD-MMM-YYYY HH:mm").format(_dateTimeFormat));  // TODO: to check for invalid date saved into ngModel	
				}
			});
			
			if (angular.isDefined(scope.maxDate)) {
				$(element).data('DateTimePicker').maxDate(scope.maxDate);
			}

			// move widget to outer most element so that it will not be clipped by the overflow scrollbars
			$(element).on("dp.show", function(e) {
				var widget = $(this).siblings(".bootstrap-datetimepicker-widget");
				var position = widget.offset();
				widget.detach();
				widget.appendTo("body");
				widget.css(position);
				widget.css({"z-index":9999});
			});
		}
	};
});

app.directive('daterangebox', function() {
	return {
		restrict: 'A',
		scope: {
			limitDays: '='
		},
		link: function(scope, element, attrs) {
			$(element).daterangepicker(_.extend({
				autoUpdateInput: false, // to prevent having a default value that cannot be cleared away
				autoApply: true,
				applyClass: 'btn-primary calendar-btn',
				cancelClass: 'btn-default calendar-btn',
				locale: {
					format: _dateFormat,
					separator: ' to '
				},
			}, scope.$eval(attrs.daterangepicker)));
			
			if (angular.isDefined(scope.limitDays)) {
				$(element).data('daterangepicker').dateLimit = {days:scope.limitDays};
			}

			$(element).on('apply.daterangepicker', function(ev, picker) {
				$(this).val(picker.startDate.format(_dateFormat) + ' to ' + picker.endDate.format(_dateFormat));
				$(this).trigger('change'); // to trigger autoUpdateInput even if it is set to false so that value can be binded to ng-model 
			});
			
			// move widget to outer most element so that it will not be clipped by the overflow scrollbars
			$(element).on("dp.show", function(e) {
				var widget = $(this).siblings(".bootstrap-datetimepicker-widget");
				var position = widget.offset();
				widget.detach();
				widget.appendTo("body");
				widget.css(position);
				widget.css({"z-index":9999});
			});
		}
	};
});

app.directive('datetimerangebox', function() {
	return {
		restrict: 'A',
		scope: {
			limitDays: '=',
			stepping: '=',
			minDate: '=',
			maxDate: '=',
			maxDatetime: '=',
			minDatetime: '=',
			ngModel: '='
		},
		link: function(scope, element, attrs) {	
			
			$(element).daterangepicker(_.extend({
				autoUpdateInput: false, // to prevent having a default value that cannot be cleared away
				autoApply: true, 
				applyClass: 'btn-primary calendar-btn',
				cancelClass: 'btn-default calendar-btn',
				timePicker24Hour: true,
				timePicker: true,
		        timePickerIncrement: scope.stepping ? scope.stepping : 1,
				locale: {
					format: _dateTimeFormat,
					separator: ' to '
				}
			}, scope.$eval(attrs.datepicker)));
			
			if (angular.isDefined(scope.limitDays)) {
				$(element).data('daterangepicker').dateLimit = {days:scope.limitDays};
			}
			
			if (angular.isDefined(scope.maxDate)) {
				$(element).data('daterangepicker').maxDate = moment().add(scope.maxDate, 'days');
			}
			
			if (angular.isDefined(scope.minDate)) {
				$(element).daterangepicker(_.extend({
					autoUpdateInput: false, // to prevent having a default value that cannot be cleared away
					autoApply: true, 
					applyClass: 'btn-primary calendar-btn',
					cancelClass: 'btn-default calendar-btn',
					minDate: new Date(),
					timePicker24Hour: true,
					timePicker: true,
			        timePickerIncrement: scope.stepping ? scope.stepping : 1,
					locale: {
						format: _dateTimeFormat,
						separator: ' to '
					}
				}, scope.$eval(attrs.datepicker)));
			}
			
			if (angular.isDefined(scope.minDate) && angular.isDefined(scope.maxDate)) {
				$(element).daterangepicker(_.extend({
					autoUpdateInput: false, // to prevent having a default value that cannot be cleared away
					autoApply: true, 
					applyClass: 'btn-primary calendar-btn',
					cancelClass: 'btn-default calendar-btn',
					minDate: new Date(),
					maxDate: moment().add(scope.maxDate, 'days'),
					timePicker24Hour: true,
					timePicker: true,
			        timePickerIncrement: scope.stepping ? scope.stepping : 1,
					locale: {
						format: _dateTimeFormat,
						separator: ' to '
					}
				}, scope.$eval(attrs.datepicker)));
			}
			
			scope.$watch('maxDatetime', function(newValue, oldValue) {				
				if (newValue) {
					$(element).data('daterangepicker').maxDate= scope.maxDatetime;
				}
            }, true);
			
			scope.$watch('minDatetime', function(newValue, oldValue) {				
				if (newValue) {
					$(element).data('daterangepicker').minDate= scope.minDatetime;
				}
            }, true);

			scope.$watch('ngModel', function(newValue, oldValue) {				
				if (newValue) {
					if(newValue.includes(" to ")){
						var arr = newValue.split(" to ");
						$(element).data('daterangepicker').startDate= moment(arr[0], "DD-MMM-YYYY HH:mm");
						$(element).data('daterangepicker').endDate= moment(arr[1], "DD-MMM-YYYY HH:mm");
						$(this).val(arr[0] + ' to ' + arr[1]);
					}
				}else{
					scope.$watch('minDatetime', function(newValue, oldValue) {				
						if (newValue) {
							$(element).data('daterangepicker').startDate= scope.minDatetime;
						}
		            }, true);
					
					scope.$watch('maxDatetime', function(newValue, oldValue) {				
						if (newValue) {
							$(element).data('daterangepicker').endDate= scope.maxDatetime;
						}
		            }, true);
				}
            }, true);
			
			$(element).on('apply.daterangepicker', function(ev, picker) {
				$(this).val(picker.startDate.format(_dateTimeFormat) + ' to ' + picker.endDate.format(_dateTimeFormat));
				$(this).trigger('change'); // to trigger autoUpdateInput even if it is set to false so that value can be binded to ng-model 
			});
			
			// move widget to outer most element so that it will not be clipped by the overflow scrollbars
			$(element).on("dp.show", function(e) {
				var widget = $(this).siblings(".bootstrap-datetimepicker-widget");
				var position = widget.offset();
				widget.detach();
				widget.appendTo("body");
				widget.css(position);
				widget.css({"z-index":9999});
			});
		}
	};
});

app.directive('intbox', function() {
	return {
		restrict: 'A',
		scope: {
			ngModel: '=',
			min: '=',
			max: '='
		},
		link: function(scope, element, attrs) {
			$(element).TouchSpin(_.extend({
				verticalbuttons: true,
				verticalupclass: 'glyphicon glyphicon-chevron-up',
				verticaldownclass: 'glyphicon glyphicon-chevron-down',
				min: (angular.isDefined(scope.min) ? scope.min : 0),
				max: (angular.isDefined(scope.max) ? scope.max : 10000),
				boostat: 5,
				maxboostedstep: 10
			}, scope.$eval(attrs.intbox)));
			
			scope.$watch('max', function(newValue, oldValue) {				
				if (newValue !== null) {
					$(element).TouchSpin(_.extend({
						verticalbuttons: true,
						verticalupclass: 'glyphicon glyphicon-chevron-up',
						verticaldownclass: 'glyphicon glyphicon-chevron-down',
						min: (angular.isDefined(scope.min) ? scope.min : 0),
						max: (angular.isDefined(newValue) ? newValue : 10000),
						boostat: 5,
						maxboostedstep: 10
					}, scope.$eval(attrs.intbox)));
				}
            }, true);
		}
	};
});

app.directive('decimalbox', function() {
	return {
		restrict: 'A',
		scope: {
			ngModel: '=',
			min: '=',
			max: '=',
			step: '='
		},
		link: function(scope, element, attrs) {
			scope.ngModel = scope.ngModel ? scope.ngModel.toFixed(2) : '0.00';
			$(element).TouchSpin(_.extend({
				verticalbuttons: true,
				verticalupclass: 'glyphicon glyphicon-chevron-up',
				verticaldownclass: 'glyphicon glyphicon-chevron-down',
				min: (angular.isDefined(scope.min) ? scope.min : 0),
				max: (angular.isDefined(scope.max) ? scope.max : 10000000),
				decimals: 2,
				step: (angular.isDefined(scope.step) ? scope.step : 0.1),
				boostat: 5,
				maxboostedstep: 10
			}, scope.$eval(attrs.decimalbox)));
		}
	};
});

app.directive('smrtBox', function() {
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			$(element).TouchSpin(_.extend({
				verticalbuttons: true,
				//				verticalupclass: 'glyphicon glyphicon-chevron-up',
				//				verticaldownclass: 'glyphicon glyphicon-chevron-down',
				min: 0,
				max: 1000000,
				decimals: 0,
				step: 5000,
				boostat: 5,
				maxboostedstep: 10
			}, scope.$eval(attrs.decimalbox)));
		}
	};
});


app.directive('selectbox', function($timeout) {
	return {
		restrict: 'A',
//		required: "ngModel",
		scope: {
			ngModel: '='
		},
		link: function(scope, element, attrs) {
			var sb = $(element).select2(_.extend({
				placeholder: attrs['placeholder']
			}, scope.$eval(attrs.selectbox)));
			
			// Need to wrap this around timeout as a workaround for JQuery event to work with AngularJS, to avoid nexting $apply
			$timeout(function() {
				sb.change();
			}, 0);
			
//			scope.$watch('ngModel', function(newValue, oldValue) {
//                if (newValue)
//                	$(element).select2(_.extend({
//        				placeholder: attrs['placeholder']
//        			}, scope.$eval(attrs.selectbox)));
//            }, true);
		}
	};
});

app.directive('tagbox', function($timeout) {
	return {
		restrict: 'A',
		scope: {
			ngModel: '='
		},
		link: function(scope, element, attrs) {
			$(element).select2(_.extend({
				//placeholder: 'Select one or more options',
				closeOnSelect: false,
				allowClear: true
			}, scope.$eval(attrs.tagbox)));
			
			// re-initialize select2 when ngModel is populated to resolve default values not updated in input text
			var isInit = false;
			scope.$watch('ngModel', function() {
				if (scope.ngModel && !isInit) {
					isInit = true;
					$(element).select2(_.extend({
						//placeholder: 'Select one or more options',
						closeOnSelect: false,
						allowClear: true
					}, scope.$eval(attrs.tagbox)));
				}
			});
		}
	};
});

/*
 * Specific directives
 */

app.directive('vehicletypeselectbox', function() {
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			$(element).select2(_.extend({
				templateResult: function (state) {
					if (!state.id || state.id === "?") { return state.text; }
					return $(
						'<span><img src="images/vehicles/5-tonner.jpg" class="vehicle-type"/>' + state.text + '</span>'
					);
				}
			}, scope.$eval(attrs.vehicletypeselectbox)));
		}
	};
});

app.directive('fileModel', ['$parse',  function($parse){
	return {
		restrict: 'A',
		link: function (scope, element, attrs) {
			var model = $parse(attrs.fileModel);
			var modelSetter = model.assign;
			
			element.bind('change', function(){
				$scope.$apply(function(){
					modelSetter(scope, element[0].files[0]);
				})
			});
		}
	};
}]);


app.directive('fixedHeader', function($timeout) {
	 return {
         restrict: 'A',
         link: link
     };

     function link($scope, $elem, $attrs, $ctrl) {
         var elem = $elem[0];

         // wait for data to load and then transform the table
         $scope.$watch(tableDataLoaded, function(isTableDataLoaded) {
             if (isTableDataLoaded) {
                 transformTable();
             }
         });

         function tableDataLoaded() {
             // first cell in the tbody exists when data is loaded but doesn't have a width
             // until after the table is transformed
             var firstCell = elem.querySelector('tbody tr:first-child td:first-child');
             return firstCell && !firstCell.style.width;
         }

         function transformTable() {
             // reset display styles so column widths are correct when measured below
             angular.element(elem.querySelectorAll('thead, tbody, tfoot')).css('display', '');

             // wrap in $timeout to give table a chance to finish rendering
             $timeout(function () {
                 // set widths of columns
                 angular.forEach(elem.querySelectorAll('tr:first-child th'), function (thElem, i) {

                     var tdElems = elem.querySelector('tbody tr:first-child td:nth-child(' + (i + 1) + ')');
                     var tfElems = elem.querySelector('tfoot tr:first-child td:nth-child(' + (i + 1) + ')');

                     var columnWidth = tdElems ? tdElems.offsetWidth : thElem.offsetWidth;
                     if (tdElems) {
                         tdElems.style.width = columnWidth + 'px';
                     }
                     if (thElem) {
                         thElem.style.width = columnWidth + 'px';
                     }
                     if (tfElems) {
                         tfElems.style.width = columnWidth + 'px';
                     }
                 });

                 // set css styles on thead and tbody
                 angular.element(elem.querySelectorAll('thead, tfoot')).css('display', 'block');

                 angular.element(elem.querySelectorAll('tbody')).css({
                     'display': 'block',
                     'height': $attrs.tableHeight || 'inherit',
                     'overflow': 'auto'
                 });

                 // reduce width of last column by width of scrollbar
                 var tbody = elem.querySelector('tbody');
                 var scrollBarWidth = tbody.offsetWidth - tbody.clientWidth;
                 if (scrollBarWidth > 0) {
                     // for some reason trimming the width by 2px lines everything up better
                     scrollBarWidth -= 2;
                     var lastColumn = elem.querySelector('tbody tr:first-child td:last-child');
                     lastColumn.style.width = (lastColumn.offsetWidth - scrollBarWidth) + 'px';
                 }
             });
         }
     }
});
