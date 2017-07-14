'use strict';

angular.
    module('peopleForm', ['ngResource','ngRoute','core.people']).
    component('peopleForm', {
        templateUrl:    'people-form/people-form.component.html',
        controller: function() {
            var self = this;           
            self.saveClicked = function(){
                self.onSave(self.person);
            }

            self.cancelClicked = function() {
                self.onRevert(self.person);
            }

            self.deleteClicked = function() {
                var deleteConfirm = confirm('Are you sure you want to delete this person?');
                if(deleteConfirm) {
                    self.onDelete(self.person);
                }
                else {
                    return;
                }
            }
        },

        bindings: {
            person:'=',
            onRevert: '&',
            onSave: '&',
            onDelete: '&'
        }
        
    });