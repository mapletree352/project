app.controller('DriverAvailController', function($q, $scope, DriverAvailService, CommonService, Constants) {
	if(!$scope.$root.checkAccessRights('showDriverAvailability')){return;}
	var driverStatusesPromise = CommonService.getDriverStatuses();
	var vocationsPromise = CommonService.getVocations();
	var hubsPromise = CommonService.getHubs();
	var nodesPromise = CommonService.getNodes();
	var vehicleTypesPromise = CommonService.getVehicleTypes();
	var dates = [];
	var holidayDates = [];
	var hot;
	var hotSubmenuItems = [];
	$scope.advSearchCollapsed = true;
	$scope.searchDTO = { dateRange: moment().format('DD-MMM-YYYY') + " to " + moment().add(3, 'month').format('DD-MMM-YYYY'), startIndex:0, pageSize:Constants.PAGE_SIZE_AVAIL };
	$scope.dto = { nricNos:[], names:[] };
	$scope.selectedDrivers = []; // stores the selected drivers (node, nricNo, rank/name) for modal use
	$scope.$root.limitAccess($scope.searchDTO);
	$scope.availBreakdownLoading = false;
	
	$q.all([driverStatusesPromise, vocationsPromise, hubsPromise, nodesPromise, vehicleTypesPromise]).then(function(data) {
		$scope.driverStatuses = data[0];
		$scope.vocations = data[1];
		$scope.hubs = data[2];
		$scope.nodes = data[3];
		$scope.vehicleTypes = data[4];
		
		hotSubmenuItems = [];
		_.each($scope.driverStatuses, function(driverStatus) {
			if (driverStatus.type === "Availability") {
				hotSubmenuItems.push({ key: "submenu:" + driverStatus.code, name: driverStatus.code + " - " + driverStatus.name });
			}
		});
	});
	
	$scope.openLegend = function() {
		$('#legendModal').modal();
	};
	
	$scope.search = function(page) {
		if (page) {
			$scope.searchDTO.startIndex = (page - 1) * $scope.searchDTO.pageSize;	
		}
        var searchPromise = DriverAvailService.searchDriverAvail($scope.searchDTO);
        var holidayDatesPromise = CommonService.getHolidayDates($scope.searchDTO.dateRange);
        $q.all([searchPromise, holidayDatesPromise]).then(function(data) {
        	computeDates(data[1]);
        	renderHot(data[0].records, data[0].result);
        	if (data[0].records.length === 0) {
        		$scope.$root.infoDialog("No result found.");
        	} else {
            	// PAGINATION
            	$scope.totalItemCount = data[0].total;
            	$scope.numPages = data[0].noOfPages;
                $scope.currentPage = Math.floor($scope.searchDTO.startIndex / $scope.searchDTO.pageSize) + 1;
                var start = Math.max(1, $scope.currentPage - Math.abs(Math.floor(Constants.PAGING_SIZE_AVAIL / 2)));
                var end = start + Constants.PAGING_SIZE_AVAIL;
                if (end > $scope.numPages) {
                	end = $scope.numPages + 1;
                	start = Math.max(1, end - Constants.PAGING_SIZE_AVAIL);
                }
                $scope.pages = [];
                for (i = start; i < end; i++) {
                	$scope.pages.push(i);
                }
        	}
        });
	};
	
	$scope.download = function() {
		var resultPromise = DriverAvailService.exportDriverAvail($scope.searchDTO);
		$q.all([ resultPromise ]).then(function(data) {
			$scope.$root.exportFile(data[0], "text/plain", "TO_Availability.xlsx");
		});
	};
	
	$scope.reset = function() {
		$scope.searchDTO = { dateRange: moment().format('DD-MMM-YYYY') + " to " + moment().add(3, 'month').format('DD-MMM-YYYY'), startIndex:0, pageSize:Constants.PAGE_SIZE_AVAIL };
    	$scope.$root.limitAccess($scope.searchDTO);
    };
	
	$scope.save = function() {
		var resultPromise = DriverAvailService.save($scope.dto);
		$q.all([ resultPromise ]).then(function(data) {
			$('#markDriverModal').modal('hide');
			var message = data[0].result;
			if (data[0].successFlag === "N") {
				_.each(data[0].records, function(record) {
					message += "<br><a href='#/task/" + record.taskId + "' target='_new'>Task ID: " + record.taskId + " (Detail ID: " + record.id + "), NRIC No.: " + record.driverNric + "</a>";
				});
				$scope.$root.errorDialog(message);
			} else {
				$scope.$root.infoDialog(message);
				$scope.search();
			}
		});
	};
	
	$scope.saveDriverAttachment = function() {
		if (moment($scope.dto.startDate, "DD-MMM-YYYY HH:mm:ss").isBefore(moment(), "day")) {
			$scope.$root.errorDialog("Past dates not allowed. Please select today's or any future date.")
		} else {
			var resultPromise = DriverAvailService.saveDriverAttachment($scope.dto);
			$q.all([ resultPromise ]).then(function(data) {
				$('#driverAttachmentModal').modal('hide');
				var message = data[0].result;
				if (data[0].successFlag === "N") {
					_.each(data[0].records, function(record) {
						message += "<br><a href='#/task/" + record.taskId + "' target='_new'>Task ID: " + record.taskId + " (Detail ID: " + record.id + "), NRIC No.: " + record.driverNric + "</a>";
					});
					$scope.$root.errorDialog(message);
				} else {
					$scope.$root.infoDialog(message);
					$scope.search();
				}
			});
		}
	};
	
	$scope.returnDriverAttachment = function() {
		if (moment($scope.dto.startDate, "DD-MMM-YYYY HH:mm:ss").isAfter(moment(), "day")) {
			$scope.$root.errorDialog("Future dates not allowed. Please select today's or any past date.")
		} else {
			if ($scope.confirmationCheckBox) {
				var resultPromise = DriverAvailService.returnDriverAttachment($scope.dto);
				$q.all([ resultPromise ]).then(function(data) {
					$('#driverAttachmentReturnModal').modal('hide');
					var message = data[0].result;
					if (data[0].successFlag === "N") {
						_.each(data[0].records, function(record) {
							message += "<br><a href='#/task/" + record.taskId + "' target='_new'>Task ID: " + record.taskId + " (Detail ID: " + record.id + "), NRIC No.: " + record.driverNric + "</a>";
						});
						$scope.$root.errorDialog(message);
					} else {
						$scope.$root.infoDialog(message);
						$scope.search();
					}
				});
			} else {
				$scope.$root.errorDialog("Please check the confirmation box before submitting.");
				//$scope.$root.$apply();
			}
		}
	};
	
	$scope.extendDriverAttachment = function() {
		if (moment($scope.dto.endDate, "DD-MMM-YYYY HH:mm:ss").isBefore(moment(), "day")) {
			$scope.$root.errorDialog("Past dates not allowed. Please select today's or any future date.")
		} else {
			var resultPromise = DriverAvailService.extendDriverAttachment($scope.dto);
			$q.all([ resultPromise ]).then(function(data) {
				$('#driverAttachmentExtendModal').modal('hide');
				var message = data[0].result;
				if (data[0].successFlag === "N") {
					_.each(data[0].records, function(record) {
						message += "<br><a href='#/task/" + record.taskId + "' target='_new'>Task ID: " + record.taskId + " (Detail ID: " + record.id + "), NRIC No.: " + record.driverNric + "</a>";
					});
					$scope.$root.errorDialog(message);
				} else {
					$scope.$root.infoDialog(message);
					$scope.search();
				}
			});
		}
	};
	
	$scope.getDriverAvailBreakdowns = function() {
		$scope.pastDateSelectedForBreakdown = moment($scope.breakdownSearchDTO.date, "DD-MMM-YYYY HH:mm:ss").isBefore(moment().format('LL'));
		$scope.availBreakdowns = [];
		if ($scope.breakdownSearchDTO.date && $scope.breakdownSearchDTO.meridiem && $scope.breakdownSearchDTO.vehicleTypeId) {
			var searchPromise = DriverAvailService.getDriverAvailBreakdowns($scope.breakdownSearchDTO);
			$scope.availBreakdownLoading = true;
	        $q.all([searchPromise]).then(function(data) {
	        	$scope.availBreakdowns = data[0];
	        	_.each($scope.availBreakdowns, function(availBreakdown) {
	        		if (availBreakdown.toIndents) {
	        			availBreakdown.indentDesc = "Indents:<br>";
	        			for (var i = 0; i < availBreakdown.toIndents.length; i++) {
	        				availBreakdown.indentDesc += "<a target='_blank' href='#/indent/" + availBreakdown.toIndents[i] + "'>" + availBreakdown.toIndents[i] + "</a><br>";
	        			}
	        		}
	        		if (availBreakdown.pdToIndents) {
	        			if (availBreakdown.indentDesc) {
	        				availBreakdown.indentDesc += "<br>";
	        			} else {
	        				availBreakdown.indentDesc = "";
	        			}
	        			availBreakdown.indentDesc += "Indents with Parkdown:<br>";
	        			for (var i = 0; i < availBreakdown.pdToIndents.length; i++) {
	        				availBreakdown.indentDesc += "<a target='_blank' href='#/indent/" + availBreakdown.pdToIndents[i] + "'>" + availBreakdown.pdToIndents[i] + "</a><br>";
	        			}
	        		}
	        	});
	        	$scope.availBreakdownLoading = false;
	        });	
		}
	};
	
	// function to compute and create an array of moment dates based on specified date range
	function computeDates(holidayDts) {
		var startEndDates = $scope.searchDTO.dateRange.split(" to ");
		var startDate = moment(startEndDates[0], "DD-MMM-YYYY HH:mm:ss");
		var endDate = moment(startEndDates[1], "DD-MMM-YYYY HH:mm:ss");
		dates = [moment(startDate, "DD-MMM-YYYY HH:mm:ss")];
		while (!startDate.isSame(endDate, "day")) {
			startDate = startDate.add('days', 1);
			dates.push(moment(startDate, "DD-MMM-YYYY HH:mm:ss"));
		}
		_.each(holidayDts, function(holidayDt) {
			holidayDates.push(moment(holidayDt, "DD-MMM-YYYY HH:mm:ss"));
		});
	};
	
	// function to map back the col no. from hot to dates array, set the AM/PM time and return the moment date,
	function getDate(col, initialCols, isStartCol) {
		var date;
		if ((col - initialCols) % 2 === 0) {
			// AM
			date = moment(dates[(col - initialCols) / 2], "DD-MMM-YYYY HH:mm:ss"); // clone a copy to return for display
			date.hours(isStartCol ? 00 : 11);
			date.minutes(isStartCol ? 00 : 59);
			date.seconds(isStartCol ? 00 : 59);
		} else {
			// PM
			date = moment(dates[(col - initialCols - 1) / 2], "DD-MMM-YYYY HH:mm:ss"); // clone a copy to return for display
			date.hours(isStartCol ? 12 : 23);
			date.minutes(isStartCol ? 00 : 59);
			date.seconds(isStartCol ? 00 : 59);
		}
		return date;
	};
	
	// function to process the handsontable selection
	function processSelect(hotRecords, initialCols, allowMultiRow, allowMultiCol) {
		var startRow = hot.getSelected()[0];
		var startCol = hot.getSelected()[1];
		var endRow = hot.getSelected()[2];
		var endCol = hot.getSelected()[3];
		if (!allowMultiRow && startRow !== endRow) {
			return false;
		} else if (!allowMultiCol && startCol !== endCol) {
			return false;
		}

		// get the start row/col and end row/col, if they are reversely selected, swap them
		if (startRow > endRow) {
			var tempStartRow = startRow;
			startRow = endRow;
			endRow = tempStartRow;
		}
		if (startCol > endCol) {
			var tempStartCol = startCol;
			startCol = endCol;
			endCol = tempStartCol;
		}
		
		// set the selection and dto object with the selected list of drivers and dateRange
		for (var i = startRow; i <= endRow; i++) {
			$scope.selectedDrivers.push({ node: hotRecords[i][initialCols - 4], nricNo: hotRecords[i][initialCols - 3], name: hotRecords[i][initialCols - 2] });
			$scope.dto.nricNos.push(hotRecords[i][initialCols - 3]);
			$scope.dto.names.push(hotRecords[i][initialCols - 2]);
		}
		$scope.dto.searchNodeId = $scope.searchDTO.nodeId;
		$scope.dto.searchHubCode = $scope.searchDTO.hubCode;
		var startDate = getDate(startCol, initialCols, true);
		var endDate = getDate(endCol, initialCols, false);
		$scope.dto.startDate = startDate.format('DD-MMM-YYYY');
		$scope.dto.startDateMeridiem = startDate.format('A');
		$scope.dto.endDate = endDate.format('DD-MMM-YYYY');
		$scope.dto.endDateMeridiem = endDate.format('A');
		$scope.$apply();
		return true;
	}
	
	function selectForHyperlink(hotRecords, initialCols) {
		resetSelect();
		if (!processSelect(hotRecords, initialCols, false, false)) {
			$scope.$root.errorDialog("Multi-select is not allowed. Please select only one cell.");
		} else {
			if ($scope.selectedDrivers.length > 0 && $scope.selectedDrivers[0].nricNo) {
				$scope.$root.go("/driver/" + $scope.selectedDrivers[0].nricNo);
			}
		}	
		$scope.$apply();
	};
	
	function selectForMarking(hotRecords, initialCols, driverStatusCode) {
		resetSelect();
		for (var i = 0; i < $scope.driverStatuses.length; i++) {
			if ($scope.driverStatuses[i].code === driverStatusCode) {
				$scope.dto.driverStatusCode = $scope.driverStatuses[i].code;
				$scope.dto.driverStatusName = $scope.driverStatuses[i].name;
				break;
			}
		}
		processSelect(hotRecords, initialCols, true, true);
		$scope.$apply();
		$('#markDriverModal').modal({ backdrop:'static' });
	};
	
	function selectForBreakdown(initialCols) {
		var date = getDate(hot.getSelected()[1], initialCols, true);
		$scope.breakdownSearchDTO = { meridiem: date.format("A"), date: date.format('DD-MMM-YYYY'), vehicleTypeId: Constants.DEFAULT_AVAIL_VEHICLE_TYPE_ID };
		$scope.$root.limitAccess($scope.breakdownSearchDTO);
		$scope.getDriverAvailBreakdowns();
		$scope.$apply();
		$('#breakdownModal').modal();
	};
	
	function selectForAttachment(hotRecords, initialCols) {
		resetSelect();
		processSelect(hotRecords, initialCols, true, true);
		
		if (moment($scope.dto.startDate, "DD-MMM-YYYY HH:mm:ss").isBefore(moment(), "day")) {
			$scope.$root.errorDialog("Past dates not allowed. Please select today's or any future date.")
		} else {
			$('#driverAttachmentModal').modal({ backdrop:'static' });
		}
		$scope.$root.$apply();
	};
	
	function selectForAttachmentReturn(hotRecords, initialCols) {
		resetSelect();
		if (!processSelect(hotRecords, initialCols, true, false)) {
			$scope.$root.errorDialog("Multi-select is not allowed. Please select only one cell.");
		}
		else {
			if (moment($scope.dto.startDate, "DD-MMM-YYYY HH:mm:ss").isAfter(moment(), "day")) {
				$scope.$root.errorDialog("Future dates not allowed. Please select today's or any future date.")
			} else {
				$('#driverAttachmentReturnModal').modal({ backdrop:'static' });
			}
		}
		$scope.$root.$apply();
	};
	
	function selectForAttachmentExtend(hotRecords, initialCols) {
		resetSelect();
		if (!processSelect(hotRecords, initialCols, true, false)) {
			$scope.$root.errorDialog("Multi-select is not allowed. Please select only one cell.");
		}
		else {
			if (moment($scope.dto.startDate, "DD-MMM-YYYY HH:mm:ss").isBefore(moment(), "day")) {
				$scope.$root.errorDialog("Past dates not allowed. Please select today's or any future date.")
			} else {
				$('#driverAttachmentExtendModal').modal({ backdrop:'static' });
			}
		}
		$scope.$root.$apply();
	};
	
	function resetSelect() {
		$scope.selectedDrivers = [];
		$scope.dto = { nricNos:[], names:[] };
	};
	
	// function to render the handsontable
	function renderHot(records, availRates) {
		if (angular.isDefined(hot)) {
			hot.destroy();	
		}
		
		// initializing the first 3 columns (a hidden fourth column is required to resolve layout issue with freezed columns)
		var shortageCols = [];
		var todayCols = [];
		var weekendCols = [];
		var holidayCols = [];
		var userAssignedCells = [];
		var overdueCells = [];
		var hotColWidths = [35, 150, 80, 350, 1]; 
		var hotMergeCells = [];
		var hotComments = [];
		var hotRecords = [];
		var hotRecord1 = ["#", "NODE", "NRIC NO.", "NAME", ""];
		var hotRecord2 = ["", "", "", "", ""];
		var initialRows = 2;
		var initialCols = hotColWidths.length;
		
		// computing the cols (column no.) for coloring and populating the rest of the columns' data for the header rows
		for (var i = 0; i < dates.length; i++) {
			if (dates[i].isSame(moment(), "day")) {
				todayCols[i * 2 + initialCols] = 'Y';
				todayCols[i * 2 + initialCols + 1] = 'Y';
			} else if (dates[i].isoWeekday() > 5) {
				weekendCols[i * 2 + initialCols] = 'Y';
				weekendCols[i * 2 + initialCols + 1] = 'Y';
			}
			for (var j = 0; j < holidayDates.length; j++) {
				if (dates[i].isSame(holidayDates[j], "day")) {
					holidayCols[i * 2 + initialCols] = 'Y';
					holidayCols[i * 2 + initialCols + 1] = 'Y';
					break;
				}
			}
			hotColWidths.push(35);
			hotColWidths.push(35);
			hotMergeCells.push({ row: 0, col: i * 2 + initialCols, rowspan: 1, colspan: 2 })
			hotRecord1.push(dates[i].format("DD-MMM"));
			hotRecord1.push("");
			hotRecord2.push("AM");
			hotRecord2.push("PM");
		}
		hotRecords = [hotRecord1, hotRecord2];
		
		// populating the rest of the rows' data (assuming statusSpans is ordered by startDate)
		for (var rowNo = 0; rowNo < records.length; rowNo++) {
			var record = records[rowNo];
    		var hotRecord = [ $scope.searchDTO.startIndex + rowNo + 1, record.node, record.nricNo, record.name, "" ];
    		var currCol = 0;
    		
    		// traversing each record's status spans
    		_.each(record.statusSpans, function(statusSpan) {
    			var statusStartDate = moment(statusSpan.startDate, "DD-MMM-YYYY HH:mm:ss");
    			var statusEndDate = moment(statusSpan.endDate, "DD-MMM-YYYY HH:mm:ss");
    			
    			// set end date time to 11:59 or 23:59 if the end date time is 12:00 or 00:00 
    			if ((statusEndDate.hours() === 0 || statusEndDate.hours() === 12) && statusEndDate.minutes() === 0) {
    				statusEndDate = statusEndDate.add(-1, 'second')	
    			}
    			
    			// finding the start and end col of the handsontable for the status span by comparing the dates
    			var statusStartCol = -1;
    			var statusEndCol = -1;
    			for (var i = 0; i < dates.length; i++) {
    				if (dates[i].isSame(statusStartDate, "day")) {
    					statusStartCol = i * 2 + (statusStartDate.hours() < 12 ? 0 : 1);  // if it is PM, will start at the PM col
    				}
    				if (dates[i].isSame(statusEndDate, "day")) {
    					statusEndCol = i * 2 + (statusEndDate.hours() < 12 ? 0 : 1);  // if it is PM, will end at the PM col
    					break;
    				}
    			}
    			
    			// for the status spans that span before the specified date range
    			if (statusStartCol === -1) {
    				statusStartCol = 0;
    			}
    			
    			// for the status spans that span beyond the specified date range
    			if (statusEndCol === -1) {
    				statusEndCol = dates.length * 2 - 1;
    			}
    			
    			if (statusStartCol < currCol) {
    				// for the status spans that overlap other earlier status spans (only status with remarks (e.g. Task Detail) will be processed), append remarks
    				var isNewCol = false;
    				for (var colNo = statusStartCol; colNo <= statusEndCol; colNo++) {
    					var row = rowNo + initialRows;
    					var col = colNo + initialCols;
    					if (!isNewCol) {
    						if (!appendComment(statusSpan, row, col)) {
    							isNewCol = true; 
        					}
    					}
    					if (isNewCol) {
    						pushStatus(hotRecord, statusSpan, row, col);
    					}
        			}
        			if (isNewCol) {
   						currCol = statusEndCol + 1;
        			}
    			} else {
    				// for the normal status spans, populate cells with empty strings until the start and with statusCode (& remarks) until the end of the span
        			for (var colNo = currCol; colNo <= statusEndCol; colNo++) {
        				var row = rowNo + initialRows;
    					var col = colNo + initialCols;
        				if (colNo < statusStartCol) {
        					hotRecord.push("");
        				} else {
        					pushStatus(hotRecord, statusSpan, row, col);
        				}
        			}
        			currCol = statusEndCol + 1;
    			}
    		});
    		
    		// populating the remaining record's colums until the end of the specified date range
    		if (currCol !== dates.length * 2 - 1) {
    			for (var i = currCol; i < dates.length * 2; i++) {
        			hotRecord.push("");
        		}
    		}
    		hotRecords.push(hotRecord);
		}
		
		function appendComment(statusSpan, row, col) {
			for (var i = 0; i < hotComments.length; i++) {
				if (hotComments[i].row === row && hotComments[i].col === col) {
					hotComments[i].comment.value += "\n________________________________________\n[" + statusSpan.statusCode + "] " + (statusSpan.remarks ? statusSpan.remarks : '');
					return true;
				}
			}
			return false;
		}
		
		function pushStatus(hotRecord, statusSpan, row, col) {
	    	hotRecord.push(statusSpan.statusCode);
			if (statusSpan.userAssignedFlag === 'Y') {
				userAssignedCells[row + "&" + col] = 'Y';
			}
			if (statusSpan.statusCode.endsWith('!!')) {
				overdueCells[row + "&" + col] = 'Y';
			}
			hotComments.push({ row: row, col: col, comment: { value: "["+statusSpan.statusCode + "] " + (statusSpan.remarks ? statusSpan.remarks : '') }});
	    }
		
		// render the handsontable
		var container = document.getElementById('driver_avail');
	    container.style.cursor = "pointer";
	    hot = new Handsontable(container, {
	        colWidths: hotColWidths,
	        mergeCells: hotMergeCells,
	        data: hotRecords,
	        width: "100%", 
	        fillHandle: false,
	        readOnly: true,
	        contextMenu: true,
	        comments: true,
	        rowHeaders: false,
	        colHeaders: false,
	        fixedColumnsLeft: 4,
	        fixedRowsTop: 2,
	        currentRowClassName: "highlightRow",
//	        COMMENTED OFF DUE TO LAGNESS IN IE11
//	        customBorders: [
//				{ range: { from: { row: initialRows - 1, col: 0 }, to: { row: initialRows - 1, col: hotColWidths.length - 1 } }, bottom: { width: 2, color: "#000000" } },
//				{ range: { from: { row: initialRows - 3, col: initialCols - 1 }, to: { row: hotRecords.length - 1, col: initialCols - 1 } }, right: { width: 2, color: "#000000" } },
//				{ range: { from: { row: initialRows - 2, col: 0 }, to: { row: initialRows - 2, col: initialCols - 2 } }, top: { width: 2, color: "#F0F0F0" }, bottom: { width: 2, color: "#F0F0F0" } }
//	        ],
	        cell: hotComments,
	        cells: function (row, col, prop) {
	            var cellProperties = {};
	            cellProperties.renderer = function(instance, td, row, col, prop, value, cellProperties) {
	                Handsontable.renderers.TextRenderer.apply(this, arguments);
	                
	                // header rows (should style in default.css, but somehow "tbody > tr:nth-child(1)" does not override)
	        		if (row < initialRows) {
	            		td.style.fontWeight = "bold"; 
	                    td.style.background = "#F0F0F0";
	            	}
	        		
	        		// red for availability shortage cells
	        		if (row === 2 && shortageCols[col] === 'Y') {
	                	td.style.color = "#FF0000";
	                }
	        		
	        		// blue for user assigned cells
	        		if (userAssignedCells[row + "&" + col] === 'Y') {
	            		td.style.color = "#0000FF";
	        		}
	        		
	        		// red for statuses that ends with "!!"
	        		if (overdueCells[row + "&" + col] === 'Y') {
	            		td.style.color = "#FF0000";
	        		}
	        		
	        		// for green, yellow and orange for today, weekends and holidays columns
	        		if (todayCols[col] === 'Y') {
	        			td.style.background = "#AAFFAA";
	        		} else if (holidayCols[col] === 'Y') {
	        			td.style.background = "#FF9900";
	        		} else if (weekendCols[col] === 'Y') {
	        			td.style.background = "#FFFF00";
	        		}
	            };
	            return cellProperties;
	        },
	        contextMenu: {            
	            callback: function (key, options) {
	            	if (key === 'driver') {
	            		selectForHyperlink(hotRecords, initialCols);
	        		} else if (key === 'unmark') {
	        			selectForMarking(hotRecords, initialCols, '');
	        		} else if (key === 'b2') {
	            		selectForMarking(hotRecords, initialCols, 'b2');
	                } else if (key.startsWith('submenu:')) {
	            		selectForMarking(hotRecords, initialCols, key.substring(8));
	                } else if (key === 'attach') {
	                	selectForAttachment(hotRecords, initialCols);
	                } else if (key === 'attachReturn') {
	            		selectForAttachmentReturn(hotRecords, initialCols);	            		
	                } else if (key === 'attachExtend') {
	                	selectForAttachmentExtend(hotRecords, initialCols);
					} else if (key === 'breakdown') {
						selectForBreakdown(initialCols);
					}
	            },
	            items: {
	            	 "driver": {name: 'Go to TO Profile', disabled: function() { return isMenuDisallowed(hot); } },
	            	 "sep1": {name: "---------", disabled: function() { return isMenuDisallowed(hot); } },
	            	 "unmark": {name: 'Unmark TO Status', disabled: function() { return isMenuDisallowed(hot) || !angular.isDefined($scope.$root.session.rights['showUpdateDriverAvailability']); }},
	            	 "b2": {name: 'Mark TO as Buffer (b2)', disabled: function() { return isMenuDisallowed(hot) || !angular.isDefined($scope.$root.session.rights['showUpdateDriverAvailability']); }},
	                 "unavailable": {
	                 	disabled: function() { return isMenuDisallowed(hot) || !angular.isDefined($scope.$root.session.rights['showUpdateDriverAvailability']); },
	                 	key: "submenu",
	                 	name: 'Mark TO as Unavailable', 
	                 	submenu: { items: hotSubmenuItems }
	                 },
	                "sep2": {name: "---------", disabled: function() { return isMenuDisallowed(hot); }},
	                "attach": {name: 'Attach-Out TO', disabled: function() { return isMenuDisallowed(hot) || !angular.isDefined($scope.$root.session.rights['showSubmitDriverAttachment']); }},
	                "attachReturn": {name: 'Return Attached-Out TO', disabled: function() { return isMenuDisallowed(hot) || !angular.isDefined($scope.$root.session.rights['showSubmitDriverAttachment']); }},
	                "attachExtend": {name: 'Extend Attached-Out TO', disabled: function() { return isMenuDisallowed(hot) || !angular.isDefined($scope.$root.session.rights['showSubmitDriverAttachment']); }},
	                "breakdown": {name: 'View Availability Breakdown', disabled: function() { return isInitialColsSelected(hot) || !isHeadersSelected(hot); }},
	                "disallowed": {name: 'Right-click is not allowed here.', disabled: function() { return !isInitialColsSelected(hot); }},
	                "noaccess": {name: 'Right-click is not allowed here.', disabled: function() { return isMenuDisallowed(hot) || (angular.isDefined($scope.$root.session.rights['showUpdateDriverAvailability']) || angular.isDefined($scope.$root.session.rights['showSubmitDriverAttachment'])); }},
	            }
	         }
	    });
	    
	    function isMenuDisallowed(hot) {
			 return isHeadersSelected(hot) || isInitialColsSelected(hot);
		};
		
		function isHeadersSelected(hot) {
	    	return hot.getSelected()[0] < initialRows;
	    };
	    
	    function isInitialColsSelected(hot) {
	    	return hot.getSelected()[1] < (initialCols - 1);
	    };
	};
});
