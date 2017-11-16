/**
 * Created by KevTS on 15/11/17.
 */


(function () {
    "use strict";

    function NewsCtrl(NewsSrv, $rootScope){
        var vm = this;
        $rootScope.title = "News";
        $rootScope.active = "news";
        vm.getNews = getNews;

        function getNews(){
            return NewsSrv.getNews().then(function (response) {
                vm.newsData = response;
                vm.newsData.forEach(function (item) {
                    item.text = item.text.length > 150? item.text.substr(0,150) + '...': item.text;
                });
                return vm.newsData;
            });
        }




    }

    angular.module("Rokk3rlabsApp").controller("NewsCtrl", NewsCtrl);


})();