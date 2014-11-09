(function(angular) {
    'use strict';

    var ResourcesController = [
        '$scope', '$stateParams', '$location', 'Global', 'Resources', 'Tags',
        function ($scope, $stateParams, $location, Global, Resources, Tags) {
            $scope.tagOptions = Tags.query();

            $scope.global = Global;
            $scope.newResource = {};

            $scope.create = function() {
                var resource = new Resources({
                    title: $scope.newResource.title,
                    content: $scope.newResource.content,
                    tags: $scope.newResource.tags,
                    url: $scope.newResource.url,
                    author: $scope.global.user._id
                });

                resource.$save(function(response) {
                    $location.path('resources/' + response._id);
                }, function (response) {
                    $scope.errors = response.data.errors;
                });
            };

            $scope.remove = function(resource) {
                resource.$remove(function () {
                    $location.path('resources');
                }, function (response) {
                    $scope.errors = response.data.errors;
                });
            };

            $scope.update = function() {
                var resource = $scope.resource;

                resource.$update(function() {
                    $location.path('resources/' + resource._id);
                }, function (response) {
                    $scope.errors = response.data.errors;
                });
            };

            $scope.find = function() {
                Resources.query(function(resources) {
                    $scope.resources = resources;
                });
            };

            $scope.findOne = function() {
                $scope.resource = {};

                Resources.get({
                    _id: $stateParams.resourceId
                }, function(resource) {
                    $scope.resource = resource;
                });
            };

            $scope.spam = function(resource) {
                resource.$spam(function () {
                    $location.path('resources');
                }, function (response) {
                    $scope.errors = response.data.errors;
                });
            };
        }
    ];

    angular.module('startupwichita.controllers').controller('ResourcesController', ResourcesController);
})(window.angular);