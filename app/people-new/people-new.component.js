'use strict';

angular.
    module('peopleNew', ['ngResource', 'ngRoute', 'core.people']).
    component('peopleNew', {
        templateUrl: 'people-new/people-new.component.html',
        controller: ['PeopleService','$location',
            function PeopleNewController(PeopleService, $location) {
                var ctrl = this;
                ctrl.person = {};
                ctrl.saveClicked = function () {
                    PeopleService.save(ctrl.person).then(function(){
                        $location.path("/");
                    }
                    );

                }

                ctrl.cancelClicked = function () {
                    $location.path("/");
                }

            }
        ]
    });