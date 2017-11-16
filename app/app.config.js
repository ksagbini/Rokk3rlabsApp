/**
 * Created by KevTS on 15/11/17.
 */


(function () {
    "use strict";

    function config($routeProvider) {
        $routeProvider.when("/", {redirectTo: "/dashboard"})
            .when("/news", {
                templateUrl: "app/News/news.html",
                title: "News",
                controller: "NewsCtrl",
                controllerAs: "news"
            })
            .when("/dashboard", {
                templateUrl: "app/Dashboard/dashboard.html",
                title: "Dashboard",
                controller: "DashboardCtrl",
                controllerAs: "dashboard"
            })
            .otherwise({redirectTo: "/dashboard"});
    }

    angular.module("Rokk3rlabsApp").config(config);


})();