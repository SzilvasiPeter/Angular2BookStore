(function(){

	"use strict";

	angular
		.module("ngLibrary")
		.controller("libraryCtrl", function($scope,$http,$mdSidenav,$mdToast,$mdDialog){

			$http.get('data/library.json').then(function(library){
				$scope.books = library.data;
				$scope.genres = getCategories($scope.books);
				console.log(library.data);
			});

			$scope.name = 'Reader';
			$scope.password = '';
			$scope.submit = false;

			var defaultGenre = "Others";

			var author = {
				name: "Szilvási Péter",
				phone: "06306172289",
				email: "szilvasi.peti@citromail.hu"
			}

			$scope.openSidebar = function(){
				$mdSidenav("left").open();
				
			}
			$scope.closeSidebar = function(){
				$mdSidenav("left").close();
				scope.editing = false;
			}

			$scope.saveBook = function(book){
				if(book){
					book.author = author;
					book.genres = "Others";
					$scope.books.push(book);
					showToast("Book saved!");
					$scope.book = {};
					$scope.closeSidebar();
				}
				
			}

			$scope.editBook = function(book){
				$scope.openSidebar();
				$scope.editing = true;
				$scope.book = book;
			}

			$scope.saveEdit = function(){
				$scope.editing = false;
				$scope.book = {};
				$scope.closeSidebar();
				showToast("Edit saved!");
			}

			$scope.deleteBook = function(event, book){
				var confirm = $mdDialog.confirm()
					.title('Are you sure you want to delete '+ book.title + '?')
					.ok('Yes')
					.cancel('No')
					.targetEvent(event);
				$mdDialog.show(confirm).then(function(){
					var index = $scope.books.indexOf(book);
					$scope.books.splice(index, 1);
				}, function(){

				});
			}

			function showToast(toastMessage){
				$mdToast.show(
					$mdToast.simple()
							.content(toastMessage)
							.position("top, right")
							.hideDelay(3000)
					);
			}	

			function getCategories(books){
				var genres = [];

				angular.forEach(books, function(item){
					angular.forEach(item.genres,function(genre){
						genres.push(genre);
					});
				});
				var genre = "Others"; //For new item
				genres.push(genre);

				return _.uniq(genres); // <--- lodash, uniq: csak az egyedi kategoriákat tartja meg!
			}
		});

})();