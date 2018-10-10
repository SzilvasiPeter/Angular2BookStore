angular
	.module("ngLibrary",["ngMaterial"])
	.directive("helloWorld", function(){
		return {
			template : "<h1>Hello, dear Reader!</h1>"
		}
	});