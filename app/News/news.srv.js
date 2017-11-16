/**
 * Created by KevTS on 15/11/17.
 */



(function () {

    "use strict";

    function NewsSrv($http) {

        var service = {
            getNews: getNews
        };

        return service;


        function getNews() {
            return $http.get("data/news-data.json").then(function (response) {
                return response.data;
            });
        }

    };


    angular.module("Rokk3rlabsApp").factory("NewsSrv", NewsSrv);


})();