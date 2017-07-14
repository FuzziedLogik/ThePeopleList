'use strict';

angular.
    module('peopleApp').
    config(['$locationProvider', '$routeProvider',
        function config($locationProvider, $routeProvider){
            $locationProvider.hashPrefix('!');

            $routeProvider.
                when('/people', {
                    template: '<people-list></people-list>'
                }).
                when('/people/add', {
                    template: '<people-new></people-new>'
                }). 
                otherwise('/people');
        }
]);