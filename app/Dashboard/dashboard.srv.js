/**
 * Created by KevTS on 15/11/17.
 */


(function () {
    "use strict";

    function DashboardSrv($http){

        var service = {
            getData: getData
        };

        return service;

        function getData(){
            return $http.get("data/activity-data.json").then(function (response) {
                return response.data;
            });
        }
    }

    angular.module("Rokk3rlabsApp").factory("DashboardSrv",DashboardSrv);


})();