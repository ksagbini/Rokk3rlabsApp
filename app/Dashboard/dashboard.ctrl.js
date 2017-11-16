/**
 * Created by KevTS on 15/11/17.
 */


(function () {
    "use strict";

    function DashboardCtrl(DashboardSrv, $filter, $interval, $rootScope) {

        $rootScope.title = "Analytics";
        $rootScope.active = "analytics";

        var vm = this;
        vm.getData = getData;
        vm.chartData = [];


        var chartSpeedZones = chartSpeedZones;
        var chartCountZone = chartCountZone;
        var chartSpeedAverage = chartSpeedAverage;
        var createRandomData = createRandomData;

        $interval(createRandomData, 60000);

        function getData() {
            return DashboardSrv.getData().then(function (response) {
                vm.chartData = response;
                chartSpeedZones();
                chartCountZone();
                chartSpeedAverage();
                return vm.chartData;
            })
        }

        function createRandomData() {

            var time = new Date();
            console.log(time);
            for (var i = 0; i < vm.chartData.length; i++) {
                vm.chartData[i].data.push({
                    count: Math.floor(Math.random() * (100) + 1),
                    speed: Number((Math.random() * ((100 - 0.02)) + 1).toFixed(1)),
                    time: time.getTime()
                });
            }

            chartSpeedZones();
            chartCountZone();
            chartSpeedAverage();
        }

        function chartSpeedZones() {

            var categories = [];
            var series = [];

            for (var i = 0; i < vm.chartData.length; i++) {
                var zone = vm.chartData[i];

                var serieTemp = {name: zone.zoneId, data: []};


                for (var j = 0; j < zone.data.length; j++) {
                    var date = new Date();
                    date.setTime(zone.data[j].time);
                    var time = $filter("date")(date, "HH:mm:ss");
                    if (categories.indexOf(time) < 0) {
                        categories.push(time);
                    }
                    serieTemp.data.push(zone.data[j].speed);
                }

                series.push(serieTemp);
            }

            Highcharts.chart('speedZones', {
                title: {
                    text: 'Speed Zones'
                },
                yAxis: {
                    title: {text: "Speed Zones"}
                },
                xAxis: {
                    categories: categories
                },
                series: series
            });

        }

        function chartCountZone() {


            var countZones = [];


            for (var i = 0; i < vm.chartData.length; i++) {
                var zone = vm.chartData[i];
                var summary = 0;
                for (var j = 0; j < zone.data.length; j++) {
                    summary += zone.data[j].count;
                }
                countZones.push([zone.zoneId, summary]);
            }

            Highcharts.chart('countZones', {
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Count Zones'
                },
                xAxis: {
                    type: 'category',
                    labels: {
                        rotation: -90
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Count'
                    }
                },
                series: [{
                    name: 'Zones',
                    data: countZones
                }]
            });

        }

        function chartSpeedAverage() {

            var speedAvg = [];
            for (var i = 0; i < vm.chartData.length; i++) {
                var zone = vm.chartData[i];

                var speed = 0;
                for (var j = 0; j < zone.data.length; j++) {
                    speed += zone.data[j].speed;
                }
                var avg = speed / zone.data.length;
                speedAvg.push([zone.zoneId, avg]);
            }


            Highcharts.chart('speedAvg', {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                title: {
                    text: 'Speed Average'
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b>: {point.percentage:.1f} ',
                            style: {
                                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                            }
                        }
                    }
                },
                series: [{
                    name: 'Zones',
                    colorByPoint: true,
                    data: speedAvg
                }]
            });

        }


    }


    angular.module("Rokk3rlabsApp").controller("DashboardCtrl", DashboardCtrl);


})();