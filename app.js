var app = angular.module('shree', ['ngScrollbars','ui.bootstrap']);

app.config(function (ScrollBarsProvider) {
	ScrollBarsProvider.defaults = {
		scrollButtons: {
			scrollAmount: 'auto',
			enable: true 
		},
		axis: 'y',
		autoHideScrollbar: true,
		theme: 'dark',
		advanced:{
			updateOnContentResize: true
		}
	};
});

app.controller('shreeCtrl', function($scope, $http, $uibModal) {

	$scope.onSaleButtonCaption = "On Sale";
	$scope.activePage = "home";

	$scope.changePage = function(page) {
		$scope.activePage = page;
	}

	$scope.type = { selected : false, label :"Show me", filterBy: ''};

	var dropboxUrl = "https://dl.dropboxusercontent.com/s/pz7xdx4amysvrur/";
	$scope.logo_path = "https://dl.dropboxusercontent.com/s/0sjmnapm479345y/shreesilverhouse-logo1.png";

	$scope.products = [];
	$http.get(dropboxUrl + 'shreesilverhouse.json')
	.success(function(data){
		$scope.products = data.products;
		$scope.types = data.types;
	//console.log("Sucess :" , data);
})
	.error(function(data){
		console.log("Fail" , data);
	});

	$scope.openProductDetails = function(product) {
		$scope.product = product;
		var modalInstance = $uibModal.open({
			animation: true,
			template: '<div class="productPopup"><product></product></div>',
			controller: 'productModalInstanceCtrl',
			resolve: {
				product: function () {
					console.log($scope.product);
					return $scope.product;
				}
			}
		});

		modalInstance.result.then(function () {
		}, function () {
			$log.info('Modal dismissed at: ' + new Date());
		});
	};

	$scope.onSale = function() {
		if($scope.type.onSale) {
			$scope.type.onSale = '';
			$scope.onSaleButtonCaption = "On Sale";
		}
		else {
			$scope.type.onSale = true;
			$scope.onSaleButtonCaption = "Show All";
		}
	}

	$scope.selectType = function(type) {
		$scope.type.selected = true;
		if(type == "All") {
			$scope.type.label = "Show me";
			$scope.type.filterBy = '';
		} else {
			$scope.type.label = type;
			$scope.type.filterBy = type;
		}
	};
});

app.directive('product', function() {
	return {
		templateUrl: 'product.html'
	};
});
app.directive('navBar', function() {
	return {
		templateUrl: 'navBar.html'
	};
});

app.controller('productModalInstanceCtrl', function ($scope, $uibModalInstance, product) {
	$scope.product = product;
});