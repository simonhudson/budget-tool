/*---------------------------------------------------------------------------------------------------------------------------------------
Dashboard
*/
function DashboardView() {

	var koElement = document.querySelector('.ko-dashboard');

	function init() {
		if (koElement)
			koBind();
	}

	function koBind() {
		ko.applyBindings(new ViewModel(), koElement[0]);
	}

	var __Model = {

		createModel: function(data) {
			return new __Model.Model(data);
		},

		Model: function(data) {
			var self = this;
			for (var key in data) {
				self[key] = data[key]
			}
		}

	}

	function ViewModel() {
		var self = this;
			self.error = ko.observable(null);
			self.isLoading = ko.observable(true);
			self.visibleState = ko.observable('pending');
			self.currentavailable = ko.observable();
			self.states = ko.observableArray([]);
			
		function getData() {
			self.isLoading(true);
			s_Ajax('get','data/budget-current.json', onData);
		}

		function onData(data) {
			data = JSON.parse(data);
			dataModel = __Model.createModel(data);
			for (var key in dataModel) {
				if (typeof dataModel[key] == 'object') {
					self[key] = ko.observableArray([]);
					self[key](dataModel[key]);
				} else {
					self[key] = ko.observable();
					self[key](dataModel[key]);
				}
			}
			self.totalavailable(self.totalavailable().toFixed(2));
			self.currentavailable(self.currentavailable().toFixed(2));
			createStates(data);
			self.isLoading(false);
		}

		self.switchVisible = function(state) {
			return (function() {
				self.visibleState(state);
			});
		}

		self.setState = function(newState) {
			return (function() {
				console.log(newState);
			});
		}

		function createStates(data) {
			for (var i=0; i < data.items.length; i++) {
				var item = data.items[i];
				if (self.states.indexOf(item.state) < 0) {
					self.states.push(item.state);
				}
			}
		}

		getData();

	}

	init();

}

(function() {
	DashboardView();
})();