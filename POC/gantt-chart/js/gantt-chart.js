// 9fbef606107a605d69c0edbcd8029e5d_design_systems
$(document).ready(function () {
	var selector = {
		"CATEGORY_LIST": ".category-list",
		"CATEGORY_ITEM_TEMPLATE": "#category-item-template",
		"TIMELINE_MARKER_TEMPLATE": "#timeline-marker-template",
		"GANTT_CHART_BAR": ".request-duration-bar-container .bar",
		"TIMLINE_VIEW_SWITCH": ".ups-ds-gantt-chart_timeline_switch .switch",
		"CHART_TIMELINE": ".ups-ds-gantt-chart_timeline .timeline"
	}

	var categoryLeftPanelWidth = 200;
	var categoryListWidth = $(selector.CATEGORY_LIST).width();
	var ganttChartWidth = categoryListWidth - categoryLeftPanelWidth;

	var CHART_TIMELINE_VIEW = {
		"MONTHLY": "monthly",
		"QUARTERLY": "quarterly",
		"HALFYEARLY": "halfyearly"
	}
	
	var timelineDateFormat = {
		"monthly" : {
			"main-marker": "DD/MM",
			"additional-marker": "MMM YYYY" 
		},
		"quarterly" : {
			"main-marker": "DD/MM",
			"additional-marker": "MMM YYYY" 
		},
		"halfyearly" : {
			"main-marker": "MMM",
			"additional-marker": "Y" 
		}
	}
	
	var currentViewType = CHART_TIMELINE_VIEW.MONTHLY;

	var ganttChartData = {}, widthPerDate, currentDate, chartStartDate, chartEndDate, numberOfDividerLinesInChart;

	function generateChartData() {
		requests.map(function (request) {
			if (!ganttChartData[request.category] && request.category != "") {
				ganttChartData[request.category] = []
			}
			if (request.category != "") {
				ganttChartData[request.category].push(request);
			}
		});
	}

	function generateChartTimeline(numberOfLines){
		$(selector.CHART_TIMELINE).empty();
		var widthPerLine = (ganttChartWidth/numberOfLines).toFixed(3);
		numberOfDividerLinesInChart = numberOfLines - 1;
		for(var i=1; i <= numberOfDividerLinesInChart ; i++){
			var $dividerSpan = $("<span class='divider'>"+(i+1)+"</span>");
			var dividerPosition = ((i * widthPerLine)/ganttChartWidth).toFixed(3) * 100;
			$dividerSpan.css({
				left : dividerPosition + '%',
			});
			$(selector.CHART_TIMELINE).append($dividerSpan);
		}
	}
	/*function getHalfYearMarkingDates(){
		var markingDates = [];
		var numberOfMarkers = 7;
		for(i=0; i<numberOfMarkers; i++){
			markingDates.push(moment(chartStartDate).add(i, "months"));
		}
		console.log(markingDates);
		return markingDates;
	}*/
	
	function generateChartTimelineForHalfYear(){
		var numberOfMarkers = 7;
		$(selector.CHART_TIMELINE).empty();
		
		var widthPerLine = (ganttChartWidth/(numberOfMarkers-1)).toFixed(3);
		for(var i=0; i < numberOfMarkers ; i++){
			var markerStyles = [];
			var markerDate = moment(chartStartDate).add(i, "months");
			var dividerPosition = (((i * widthPerLine)/ganttChartWidth).toFixed(3) * 100);
			if(i == 0){
				markerStyles.push("first-marker additional-marker");
			} else if( i == numberOfMarkers - 1){
				markerStyles.push("last-marker additional-marker");
			}
			if(markerDate.format("MMM") == moment().format("MMM")){
				markerStyles.push("current-date");
			}
			addTimelineMarker($(selector.CHART_TIMELINE), markerDate, dividerPosition, markerStyles.join(" "));
		}
	}
	
	function getQuarterMarkingDates(){
		var numberOfMarkers = 7;
		var markingDates = [];
		for(i=0; i<numberOfMarkers; i++){
			var markerDate = i%2==0 ? moment(chartStartDate).add(i/2 , "months") : moment(chartStartDate).add({"days" : 14, "months": Math.floor(i/2)}) ;
			markingDates.push(markerDate.format("MM/DD/YYYY"));
		}
		return markingDates;
	}
	
	function generateChartTimelineForQuarter(){
		$(selector.CHART_TIMELINE).empty();
		var markingDates = getQuarterMarkingDates();
		var numberOfLines = chartEndDate.diff(chartStartDate, "days") + 1;
		console.log(markingDates);
		var widthPerLine = (ganttChartWidth/numberOfLines).toFixed(3);
		for(var i=0; i <= numberOfLines ; i++){
			var addMarker = false;
			var markerDate = moment(chartStartDate).add(i, "days");
			var dividerPosition = ((i * widthPerLine)/ganttChartWidth).toFixed(3) * 100;
			var markerStyles = [];
			if(markingDates.includes(markerDate.format("MM/DD/YYYY"))){
				if(i == 0){
					markerStyles.push("first-marker additional-marker");
				} else if( i == numberOfLines){
					markerStyles.push("last-marker additional-marker");
				}
				addMarker = true;
			}
			if(markerDate.format("MM/DD/YYYY") == moment().format("MM/DD/YYYY")){
				markerStyles.push("current-date");
				addMarker = true;
			}
			if(addMarker){
				addTimelineMarker($(selector.CHART_TIMELINE), markerDate, dividerPosition, markerStyles.join(" "));
			}
		}
	}

	function getMonthMarkingDates(numberOfMarkers){
		var numberOfDays = (chartEndDate.diff(chartStartDate, "days") + 1);
		var datesPerLine = numberOfDays/(numberOfMarkers - 1);
		var markingDates = [];
		for(i=0; i<numberOfMarkers; i++){
			var dateToAdd = i == 0 ? 0 : i*datesPerLine;
			markingDates.push(moment(chartStartDate).add(i*datesPerLine, "days").format("MM/DD/YYYY"));
		}
		return markingDates;
	}
	
	function generateChartTimelineForMonth(numberOfLines){
		$(selector.CHART_TIMELINE).empty();
		var markingDates = getMonthMarkingDates(5);
		console.log(markingDates);
		var widthPerLine = (ganttChartWidth/numberOfLines).toFixed(3);
		for(var i=0; i <= numberOfLines ; i++){
			var addMarker = false;
			var markerDate = moment(chartStartDate).add(i, "days");
			var dividerPosition = ((i * widthPerLine)/ganttChartWidth).toFixed(3) * 100;
			//console.log(dividerPosition);
			var markerStyles = [];
			if(markingDates.includes(markerDate.format("MM/DD/YYYY"))){
				if(i == 0){
					markerStyles.push("first-marker additional-marker");
				} else if( i == numberOfLines){
					markerStyles.push("last-marker additional-marker");
				}
				addMarker = true;
			}
			if(markerDate.format("MM/DD/YYYY") == moment().format("MM/DD/YYYY")){
				markerStyles.push("current-date");
				addMarker = true;
			}
			if(addMarker){
				addTimelineMarker($(selector.CHART_TIMELINE), markerDate, dividerPosition, markerStyles.join(" "));
			}
		}
	}


	
	function addTimelineMarker($targetEl, markerDate, position, styleClass){	
		var $timelineMarkerTemplate = $($(selector.TIMELINE_MARKER_TEMPLATE).html());
		var $timelineDateEl = $timelineMarkerTemplate.find(".date");
		if(styleClass){
			$timelineMarkerTemplate.addClass(styleClass);
		}
		if(styleClass && styleClass.includes("additional-marker")){
			$timelineDateEl.append("<span class='additional'>" + markerDate.format(timelineDateFormat[currentViewType]["additional-marker"])+"</span>");
			$timelineDateEl.append("<span class='main'>"+markerDate.format(timelineDateFormat[currentViewType]["main-marker"])+"</span>");
		}else{
			$timelineDateEl.text(markerDate.format(timelineDateFormat[currentViewType]["main-marker"]));
		}
		$timelineMarkerTemplate.css({
			left : position + '%',
		});
		$targetEl.append($timelineMarkerTemplate);
	}

	function generateGanttChart() {
		var $categoryList = $(selector.CATEGORY_LIST);
		$categoryList.empty();
		var numberOfDaysInView = chartEndDate.diff(chartStartDate, "days") + 1;
		widthPerDate = (ganttChartWidth / numberOfDaysInView).toFixed(3);
		for (var requestEntry of Object.entries(ganttChartData)) {
			var requestCountCurrentMonth = 0;
			//get category value
			var category = requestEntry[0];
			//get requests array for category 
			var categoryRequests = requestEntry[1];

			var $categoryItemTemplate = $($(selector.CATEGORY_ITEM_TEMPLATE).html());
			var $categoryRequestList = $categoryItemTemplate.find(".request-list");

			$.each(categoryRequests, function (index, request) {
				var $requestItemTemplate = $($('#request-item-template').html());
				var $requestItemBar = $requestItemTemplate.find(selector.GANTT_CHART_BAR);
				var $requestItemHeader = $requestItemTemplate.find(".request-id");
				var requestStartDate = moment(request.startDate, "MM/DD/YYYY");
				var requestEndDate = moment(request.endDate, "MM/DD/YYYY");
				var barWidth, barPosition;

				var isRequestStartDateInChart = requestStartDate.isBetween(chartStartDate, chartEndDate, undefined, []);
				var isRequestEndDateInChart = requestEndDate.isBetween(chartStartDate, chartEndDate, undefined, []);
				var isRequestRangesInChart = chartStartDate.isBetween(requestStartDate, requestEndDate, undefined, []);
				if (!(isRequestStartDateInChart || isRequestEndDateInChart || isRequestRangesInChart)) {
					return;
				}
				$requestItemHeader.text(request.requestID);
				if (isRequestStartDateInChart) {
					var startDatePosition = currentViewType == CHART_TIMELINE_VIEW.HALFYEARLY ?
											requestStartDate.diff(chartStartDate, "days") + 1 :
											requestStartDate.diff(chartStartDate, "days");
					barWidth = (requestEndDate.diff(requestStartDate, "days") + 1) * widthPerDate;
					//console.log(request.requestID + "-->");
					//console.log(requestStartDate == chartStartDate);
					barPosition = startDatePosition * widthPerDate;
				} else {
					barWidth = (requestEndDate.diff(chartStartDate, "days") + 1) * widthPerDate;
					barPosition = 0;
				}
				//console.log(request.requestID + "-->"+barPosition);
				//if bar going ahead of chart area
				if (barWidth + barPosition > ganttChartWidth) {
					barWidth = ganttChartWidth - barPosition;
				} else {
					$requestItemBar.addClass("rounded");
				}
				$requestItemBar.addClass(request.status.toLowerCase());
				$requestItemBar.css({
					width: (((barWidth / ganttChartWidth).toFixed(3)) * 100) + '%',
					left: (((barPosition / ganttChartWidth).toFixed(3)) * 100) + '%'
				});
				$categoryRequestList.append($requestItemTemplate.get(0));
				requestCountCurrentMonth++;
			});
			//create category header
			$categoryItemTemplate.attr("data-category-header", category + "(" + requestCountCurrentMonth + ")");

			//if there is requests in current month, only then show the particular category
			if (requestCountCurrentMonth > 0) {
				$categoryList.append($categoryItemTemplate.get(0));
			}

		};
		//set divider line height
		$(selector.CHART_TIMELINE).find(".divider").css({
			height: $(".ups-ds-gantt-chart_left-trail").height()
		});	
	}

	function loadGanttChart() {
		switch (currentViewType) {
			case CHART_TIMELINE_VIEW.MONTHLY:
				chartStartDate = moment(currentDate).startOf('month');
				chartEndDate = moment(currentDate).endOf('month');
				//generateMonthlyTimeline();
				//generateChartTimeline(currentDate.daysInMonth());
				generateChartTimelineForMonth(currentDate.daysInMonth());
				break;
			case CHART_TIMELINE_VIEW.QUARTERLY:
				chartStartDate = moment(currentDate).startOf('quarter');
				chartEndDate = moment(currentDate).endOf('quarter');
				//generateChartTimeline(7);
				generateChartTimelineForQuarter();
				break;
			case CHART_TIMELINE_VIEW.HALFYEARLY:
				var quarter = moment(currentDate).quarter();
				if (quarter == 1 || quarter == 2) {
					chartStartDate = moment(currentDate).startOf('year');
					chartEndDate = moment(chartStartDate).add(6, 'months').subtract(1, 'days');
				} else {
					chartEndDate = moment(currentDate).endOf('year');
					chartStartDate = moment(chartEndDate).subtract(6, 'months').add(1, 'days');
				}
				generateChartTimelineForHalfYear(7);
				//generateChartTimeline(7);
				break;
		}
		//console.log(chartStartDate.format("MM/DD/YYYY"))
			//	console.log(chartEndDate.format("MM/DD/YYYY"))
				
		generateGanttChart();
	}

	function _initializeChart() {
		generateChartData();
		currentDate = moment();
		loadGanttChart();
	}

	function _bindEvents() {
		$(".next-time").on("click", function () {
			switch (currentViewType) {
				case CHART_TIMELINE_VIEW.MONTHLY:
					chartStartDate = moment(chartStartDate).add(15, 'days');
					chartEndDate = moment(chartEndDate).add(15, 'days');
					//generateMonthlyTimeline();
					//generateChartTimeline((chartEndDate.diff(chartStartDate, "days") + 1));
					generateChartTimelineForMonth((chartEndDate.diff(chartStartDate, "days") + 1));
					break;
				case CHART_TIMELINE_VIEW.QUARTERLY:
					chartStartDate = moment(chartStartDate).add(1, 'months');
					chartEndDate = moment(chartEndDate).add(1, 'months');
					generateChartTimelineForQuarter();
					break;
				case CHART_TIMELINE_VIEW.HALFYEARLY:
					chartStartDate = moment(chartStartDate).add(1, 'months');
					chartEndDate = moment(chartEndDate).add(1, 'months');
					generateChartTimelineForHalfYear();
					break;
			}
			generateGanttChart();
		});
		$(".prev-time").on("click", function () {
			switch (currentViewType) {
				case CHART_TIMELINE_VIEW.MONTHLY:
					chartStartDate = moment(chartStartDate).subtract(15, 'days');
					chartEndDate = moment(chartEndDate).subtract(15, 'days');
					//generateMonthlyTimeline();
					//generateChartTimeline((chartEndDate.diff(chartStartDate, "days") + 1));
					generateChartTimelineForMonth((chartEndDate.diff(chartStartDate, "days") + 1));
					break;
				case CHART_TIMELINE_VIEW.QUARTERLY:
					chartStartDate = moment(chartStartDate).subtract(1, 'months');
					chartEndDate = moment(chartEndDate).subtract(1, 'months');
					generateChartTimelineForQuarter();
					break;
				case CHART_TIMELINE_VIEW.HALFYEARLY:
					chartStartDate = moment(chartStartDate).subtract(1, 'months');
					chartEndDate = moment(chartEndDate).subtract(1, 'months');
					generateChartTimelineForHalfYear();
					break;
			}
			generateGanttChart();
		});

		$(selector.TIMLINE_VIEW_SWITCH).on("click", function () {
			$(selector.TIMLINE_VIEW_SWITCH).removeClass('selected');
			$(this).addClass('selected');
			currentViewType = $(this).attr("data-view");
			currentDate = moment();
			loadGanttChart();
		});

		window.addEventListener("resize", function () {
			//console.log($(".category-list").width() - 210);
		}, false);
	}

	_initializeChart();
	_bindEvents();
});