/*!
 * app/app.js
 * 
 * Main Angular file for the application.
 * Author: Abner Castro
 * Date: April 7th, 2017
 */

(function() {
	'use strict';

	angular.module('quotes.core', []);

	angular.module('quotes.core')
		.constant('QUOTES_API_URL', '/api/quotes')
		.factory('QuotesProvider', function($http, $q, $log, QUOTES_API_URL) {
			var service = {
				getQuotes: getQuotes
			};

			function makeRequest(urlPath) {
				return $http({
					'url': urlPath,
					'method': 'GET',
					'headers': {
						'Content-Type': 'application/json'
					},
					'cache': true
				}).then(function(response) {
					$log.debug('RESPONSE', response.data);
					return response.data;
				}).catch(quotesProviderError);
			}

			function getQuotes() {
				return makeRequest(QUOTES_API_URL)
					.then(function(data) {
						$log.debug('DATA', data);
						return data;
					});
			}

			return service;

			// Error Handlers
			function quotesProviderError(error) {
				return error;
			}
		})
		.controller('QuotesCtrl', ['$log', 'QuotesProvider', function($log, QuotesProvider) {
			var vm = this;
			vm.quotes = [];

			vm.getQuotes = function() {
				QuotesProvider.getQuotes()
					.then(function(result) {
						vm.quotes = (result !== 'null') ? result : {};
					}, function(reason) {
						// TODO Do something with the error
					})
			}
			
			function activate() {
				// load quotes from API
				$log.info('Starting ctrl.');
				vm.getQuotes();
			}

			activate();
		}]);

})();