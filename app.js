var app = angular.module('shree', ['ngScrollbars','ui.bootstrap','angularUtils.directives.dirPagination']);

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

	$scope.currentPage = 1;
  	$scope.pageSize = 8;

	$scope.onSaleButtonCaption = "On Sale";
	$scope.activePage = "home";

	$scope.changePage = function(page) {
		$scope.activePage = page;
	}

	$scope.filter = { selected : false, label :"All", filterBy: '', onSale: ''};

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
			//console.log('Modal dismissed at: ' + new Date());
		});
	};

	$scope.onSale = function() {
		$scope.currentPage = 1;

		if($scope.filter.onSale) {
			$scope.filter.onSale = '';
			$scope.onSaleButtonCaption = "On Sale";
		}
		else {
			$scope.filter.onSale = true;
			$scope.onSaleButtonCaption = "Show All";
		}
	}

	$scope.selectType = function(type) {
		$scope.currentPage = 1;
		$scope.filter.selected = true;
		if(type == "All") {
			$scope.filter.label = "All";
			$scope.filter.filterBy = '';
		} else {
			$scope.filter.label = type;
			$scope.filter.filterBy = type;
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

app.directive('sidebar', function() {
	return {
		templateUrl: 'sidebar.html'
	};
});

app.controller('productModalInstanceCtrl', function ($scope, $uibModalInstance, product) {
	$scope.product = product;
});