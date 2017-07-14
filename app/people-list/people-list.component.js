'use strict';

angular.module('peopleList').
    component('peopleList', {
        templateUrl: 'people-list/people-list.template.html',
        controller: ['PeopleService',
            function PeopleListController(PeopleService) {
                var self = this;
                PeopleService.list().then(peopleListSuccess).catch(peopleListFailure);
                self.orderProp = 'name';
                self.editingPerson;
                self.people;
                self.errorMessage;

                //$http callback on success
                function peopleListSuccess(result) {
                    self.people = result.data;
                }

                //$http callback on failure
                function peopleListFailure(result) {
                    self.errorMessage = result.status + "\n" + result.statusText;
                }

                // Show the edit form
                self.editPerson = function (person, $event) {
                    $event.preventDefault();
                    self.editingPerson = person;
                    self.originalPerson = angular.extend({}, person);
                }

                // Update Person record
                self.savePerson = function (person) {

                    PeopleService.save(person);
                    _closeEditForm();

                }

                // Delete Person record
                self.deletePerson = function (person) {
                    PeopleService.delete(person).then(function() {
                        self.people.splice(self.people.indexOf(person),1);
                    })
                    _closeEditForm();
                }

                // Revert changes function
                self.revertPerson = function (person) {
                    self.people[self.people.indexOf(person)] = self.originalPerson;
                    _closeEditForm();               
                }

                function _closeEditForm() {
                    self.editingPerson = null;
                    self.originalPerson = null
                }

            }
        ]
    });