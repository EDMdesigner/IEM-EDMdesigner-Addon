function CreateListUtilVM($, ko) {
	return function ListUtilVM(searchApplyFunction, findObservable, selectedFields, configObject) {
		if(typeof searchApplyFunction !== "function") {
			throw("searchApplyFunction is obligated and must be a function");
		}
		if(!ko.isObservable(findObservable)) {
			throw("findObservable is obligated and must be an observable ko object");
		}
		if(!(selectedFields instanceof Array)) {
			throw("selectedFields is obligated must be an array");
		}


		var config = {
			clickingOnRowEnabled: false,
			pageSizes: [10, 25, 50, 100],
			defaultPageSize: 25
		};

		if(configObject) {
			config.clickingOnRowEnabled = configObject.clickingOnRowEnabled;
		}
		if(configObject && (configObject.pageSizes instanceof Array)) {
			config.pageSizes = configObject.pageSizes;
		}
		if(configObject && configObject.defaultPageSize) {
			for(var i in config.pageSizes) {
				if(config.pageSizes[i] === configObject.defaultPageSize) {
					config.defaultPageSize = configObject.defaultPageSize;
				}
			}
		}
		
		var pageSizes = ko.observable(config.pageSizes);
		var pageSizeValue = ko.observable(config.defaultPageSize);
		var pageIndex = ko.observable(0);
		var sortObject = ko.observable();
		var totalCount = ko.observable();
		var pages = ko.observableArray();
		var pageSize = ko.computed({
			read: function() {
				return pageSizeValue();
			},
			write: function(value) {
				pageIndex(0);
				minDisplayedPageIndex(0);
				maxDisplayedPageIndex(2 * pageDisplayRange);
				pageSizeValue(value);
			},
			owner: this
		});
		var pageDisplayRange = 2;
		var minDisplayedPageIndex = ko.observable(0);
		var maxDisplayedPageIndex = ko.observable(2 * pageDisplayRange);

		var headerTitles = [];
		var displayedItems = ko.observableArray();

		function renderList(items, totalCountValue) {
			convertItems(items);
			displayedItems(items);
			totalCount(totalCountValue);
			//pageSizes()[4] = totalCountValue;
			var pageCount = totalCountValue / pageSize();
			pages([]);
			for(var i = 0; i < pageCount; i++) {
				var display = i + 1;
				pages.push({value: i, display: display});
			}

			setDisplayedPages();
		}

		var updateList = ko.computed(function() {
			var selectObject = [];
			for(var j in selectedFields) {
				selectObject.push(selectedFields[j].value);
			}
			var options = {
				pageSize: pageSize(),
				pageIndex: pageIndex(),
				findObject: findObservable(),
				sort: sortObject(),
				select: selectObject
			};

			searchApplyFunction(options, renderList);
			
		});

		function convertItems(items) {
			for(var i in items) {
				items[i].selected = ko.observable(false);
			}
		}

		function init() {
			if(selectedFields) {
				setTitlesFromSelectedFields();
			}
		}

		function setTitlesFromSelectedFields() {
			var selectedSorter = null;
			for(var i in selectedFields) {
				var titleObject = {
					value: selectedFields[i].value,
					display: selectedFields[i].display,
					asc: ko.observable(selectedFields[i].asc || 1),
					sorter: selectedFields[i].sorter || false,
					selected: ko.observable(selectedFields[i].selected),
					sortAsc: sortAsc,
					sortDesc: sortDesc
				};
				headerTitles[i] = titleObject;
				if(selectedFields[i].selected) {
					sorterItem = selectedFields[i];
				}
			}
			var sortValue = {};
			sortValue[sorterItem.value] = sorterItem.asc;

			sortObject(sortValue);
		}

		function sortAsc(){
			applySort(this, "UP");
		}
		function sortDesc() {
			applySort(this);
		}
		function applySort(titleObject, type) {
			if(type === "UP") {
				titleObject.asc(1);
			} else {
				titleObject.asc(-1);
			}
			deselectAllTitle();
			titleObject.selected(true);
			
			var sortValue = {};
			sortValue[titleObject.value] = titleObject.asc();
			sortObject(sortValue);
		}
		function setTitleActive() {
			var titleObject = this;
			if(!titleObject.sorter) {
				return false;
			}
			deselectAllTitle();
			titleObject.selected(true);
			var sortValue = {};
			sortValue[titleObject.value] = titleObject.asc();
			sortObject(sortValue);
		}

		function deselectAllTitle() {
			for(var i in headerTitles) {
				headerTitles[i].selected(false);
			}
		}
		function capitalize(string) {
			return string.charAt(0).toUpperCase() + string.slice(1);
		}

		function goToFirstPage() {
			goToPage(0);
		}
		function goToNextPage() {
			var index = pageIndex();
			if(index === pages().length - 1) {
				return;
			}
			goToPage(index + 1);
		}
		function goToPrevPage() {
			var index = pageIndex();
			if(index === 0) {
				return;
			}
			goToPage(index - 1);
		}
		function goToLastPage() {
			var lastPage = pages().length - 1;
			goToPage(lastPage);
		}
		function goToThisPage() {
			goToPage(this.value);
		}
		function goToPage(index) {
			pageIndex(index);
			setDisplayedPages();
		}

		function setDisplayedPages() {
			var range = 2;
			var index = pageIndex();
			var pageLength = pages().length;

			if(index - pageDisplayRange < 0) {
				minDisplayed = 0;
			} else {
				var deduction = (pageLength - 1 - index <= pageDisplayRange) ? (pageDisplayRange - (pageLength - 1 - index)) : 0;
				minDisplayed = index - pageDisplayRange - deduction;
			}

			if(index + pageDisplayRange > pageLength) {
				maxDisplayed = pageLength;
			} else {
				var addition = (pageDisplayRange - index >= 0) ? pageDisplayRange - index : 0;
				maxDisplayed = index + pageDisplayRange + addition;
			}

			minDisplayedPageIndex(minDisplayed);
			maxDisplayedPageIndex(maxDisplayed);
		}

		function toogleSelection(item, event) {
			if($(event.target).hasClass('action')) {
				return false;
			}
			if(!config.clickingOnRowEnabled && !$(event.target).hasClass('selector-check')) {
				return false;
			}

			var items = displayedItems();
			selector.selecteds([]);
			if(item.selected()) {
				item.selected(false);
			} else {
				item.selected(true);
			}
			selector.selecteds([]);
			for(var i in items) {
				if(items[i].selected()) {
					selector.selecteds.push(items[i]);
				}
			}
		}
		function selectAll() {
			var items = displayedItems();
			for(var i in items) {
				items[i].selected(true);
			}
			selector.selecteds(items);
		}
		function deselectAll() {
			var items = displayedItems();
			for(var i in items) {
				items[i].selected(false);
			}
			selector.selecteds([]);
		}

		var selector = {
			toogle: toogleSelection,
			selectAll: selectAll,
			deselectAll: deselectAll,
			selecteds: ko.observableArray()
		};

		var paginator = {
			goToFirstPage: goToFirstPage,
			goToNextPage: goToNextPage,
			goToPrevPage: goToPrevPage,
			goToLastPage: goToLastPage,
			goToThisPage: goToThisPage
		};

		init();

		return {
			searchApplyFunction: searchApplyFunction,
			displayedItems: displayedItems,
			headerTitles: headerTitles,
			setTitleActive: setTitleActive,

			pageSize: pageSize,
			pageSizes: pageSizes,
			totalCount: totalCount,
			pages: pages,
			pageIndex: pageIndex,

			minDisplayedPageIndex: minDisplayedPageIndex,
			maxDisplayedPageIndex: maxDisplayedPageIndex,

			paginator: paginator,

			selector: selector
		};
	};
}

if (typeof require === "function" && typeof require.specified === "function" && require.specified("jquery")) {
    define(["jquery", "ko", "tinyLoader"], function ($, ko) {
      return CreateListUtilVM($, ko);
    });
} else {
	var ListUtilVM = CreateListUtilVM($, ko);
}