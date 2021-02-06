'use strict';

var _dateFormat = 'DD-MMM-YYYY',
	_dateTimeFormat = 'DD-MMM-YYYY HH:mm';

app.directive('vwDaterangepicker', function() {
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			// $(element).'pluginActivationFunction'(scope.$eval(attrs.directiveName));
			//console.log(attrs.daterangebox);
			$(element).daterangepicker(_.extend({
				autoUpdateInput: true,
				autoApply: true,
				applyClass: 'btn-primary calendar-btn',
				cancelClass: 'btn-default calendar-btn',
				locale: {
					format: _dateFormat,
					separator: ' to '
				}
			}, scope.$eval(attrs.daterangepicker)));
console.log("TEST")
;			$(element).on('apply.daterangepicker', function(ev, picker) {
				$(this).val(picker.startDate.format(_dateFormat) + ' to ' + picker.endDate.format(_dateFormat));
			});

			$(element).on('cancel.daterangepicker', function(ev, picker) {
				$(this).val('');
			});
		}
	};
});

app.directive('vwDatepicker', function() {
	return {
		restrict: 'A',
		scope: {
			date: '=ngModel'
		},
		link: function(scope, element, attrs) {
			var date = scope.date ? moment(scope.date, _dateFormat).toDate() : null;
			
			var datetimepicker = $(element).datetimepicker(_.extend({
				format: _dateFormat,
				defaultDate: date,
				useCurrent: false,
				widgetPositioning: {horizontal:'auto',vertical:'bottom'}
			}, scope.$eval(attrs.datepicker)));
			
			// move widget to outer most element so that it will not be clipped by the overflow scrollbars
			$(element).on("dp.show", function(e) {
				var widget = $(this).siblings(".bootstrap-datetimepicker-widget");
				var position = widget.offset(); //$(this).offset();
				// console.log(position);
				widget.detach();
				widget.appendTo("body");
				widget.css(position);
				widget.css({"z-index":9999});
			});
		}
	};
});