(function () {
    'use strict';

    angular.
        module('core.people').
        service('PeopleService', PeopleService);
    PeopleService.$inject = ['$http'];

    function PeopleService($http) {
        var peopleUrl = 'http://localhost:4000/people/';

        this.list = function () {
            return $http({
                method: 'get',
                url: peopleUrl
            });
        }

        this.save = function (person) {
            if (person.id) {
                return $http({
                    method: 'put',
                    url: peopleUrl + person.id,
                    data: person
                })
            }
            else {
                return $http({
                    method: 'post',
                    url: peopleUrl,
                    data: person
                })
            }
        }

        this.delete = function (person) {
            return $http.delete(peopleUrl + person.id);
        }

        this.add = function (person) {
            return $http.post(peopleUrl, person)
        }
    }
})();