'use strict';

angular.module('peopleList').
    component('peopleList', {
        templateUrl: 'people-list/people-list.template.html',
        controller: ['PeopleService', '$filter',
            function PeopleListController(PeopleService, $filter) {
                var ctrl = this;
                PeopleService.list().then(peopleListSuccess).catch(peopleListFailure);
                ctrl.orderProp = 'name';
                ctrl.editingPerson;
                ctrl.people;
                ctrl.errorMessage;
                ctrl.filteredPeople = [];

                //$http callback on success
                function peopleListSuccess(result) {
                    ctrl.people = result.data;
                    ctrl.filteredPeople = ctrl.people;
                }

                //$http callback on failure
                function peopleListFailure(result) {
                    ctrl.errorMessage = result.status + "\n" + result.statusText;
                }

                // Show the edit form
                ctrl.editPerson = function (person, $event) {
                    $event.preventDefault();
                    ctrl.editingPerson = person;
                    ctrl.originalPerson = angular.extend({}, person);
                }

                // Update Person record
                ctrl.savePerson = function (person) {

                    PeopleService.save(person);
                    _closeEditForm();

                }

                // Delete Person record
                ctrl.deletePerson = function (person) {
                    PeopleService.delete(person).then(function() {
                        ctrl.people.splice(ctrl.people.indexOf(person),1);
                    })
                    _closeEditForm();
                }

                // Revert changes function
                ctrl.revertPerson = function (person) {
                    ctrl.people[ctrl.people.indexOf(person)] = ctrl.originalPerson;
                    _closeEditForm();               
                }

                function _closeEditForm() {
                    ctrl.editingPerson = null;
                    ctrl.originalPerson = null
                }

                ctrl.applySearchFilter = function(){
                   ctrl.filteredPeople = $filter('filter')(ctrl.people, ctrl.query);
                   ctrl.filteredPeople = $filter('orderBy')(ctrl.filteredPeople, ctrl.orderProp);
                }


            }
        ]
    });