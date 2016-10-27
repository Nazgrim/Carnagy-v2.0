angular
    .module("dealerModule", []);
angular
    .module("dealerModule")
    .config(['$httpProvider', function ($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        $httpProvider.defaults.withCredentials = true;
        delete $httpProvider.defaults.headers.common["X-Requested-With"];
        $httpProvider.defaults.headers.common["Accept"] = "application/json";
        $httpProvider.defaults.headers.common["Content-Type"] = "application/json";
    }
    ])
    .service("dealerService", function ($resource) {
        function groupBy(ary, keyFunc) {
            var r = {};
            ary.forEach(function (x) {
                var y = keyFunc(x);
                r[y] = (r[y] || []).concat(x);
            });
            return Object.keys(r).map(function (y) {
                return r[y];
            });
        }
        var dealersByCity = window.dealersByCity;
        var groupByProvince = groupBy(dealersByCity, function (x) {
            return x.province;
        });
        var provinces = groupByProvince.map(function (c) {
            var groupByCity = groupBy(c, function (x) {
                return x.cityName.toLowerCase();
            });
            var province = {
                name: '',
                city: []
            };
            groupByCity.forEach(function (city) {
                province.name = city[0].province;
                //s.charAt(0).toUpperCase() + s.substr(1)
                province.city.push({
                    name: city[0].cityName.charAt(0).toUpperCase() + city[0].cityName.substr(1),
                    dealersCount: city[0].dealers.length
                });
            });
            province.city.sort(function (a, b) {
                if (a.name > b.name) {
                    return 1;
                }
                if (a.name < b.name) {
                    return -1;
                }
                return 0;
            });
            return province;
        });
        provinces.sort(function (a, b) {
            if (a.name > b.name) {
                return 1;
            }
            if (a.name < b.name) {
                return -1;
            }
            return 0;
        });

        var parser = document.createElement('a');
        var max = 1;
        var min = -2;
        var getValueDifference = function (dealer) {
            var result = (Math.random() * (max - min) + min).toFixed(2);
            dealer.valueDifference = result > 0 ? '(+' + result + '%)' : '(' + result + '%)';
            dealer.valueColor = result > 0 ? '#5cb85c' : '#d9534f';
        };
        var getAmountDifference = function (dealer) {
            var result = (Math.random() * (max - min) + min).toFixed(2);
            dealer.amountDifference = result > 0 ? '(+' + result + '%)' : '(' + result + '%)';
            dealer.amountColor = result > 0 ? '#5cb85c' : '#d9534f';
        };

        var dealers = Array.prototype.concat.apply([], dealersByCity.map(dc => dc.dealers));
        dealers.forEach(function (dealer, index) {
            if (dealer.value)
                getValueDifference(dealer);

            if (dealer.cars.length)
                getAmountDifference(dealer);

            dealer.id = index;
            parser.href = dealer.dealerUrl;
            dealer.domain = parser.hostname;
        });
        var selectedDealer = function (dealers, dealerName) {
            dealers.forEach(function (dealer) {
                if (dealer.name == dealerName) {
                    dealer.selected = true;
                }
            });
        };
        selectedDealer(dealers, window.selectedDealerName);
        return {
            getCompetitors: function (dealerId, carId) {
                return [
                    {
                        name: "Ms. Mary Jane",
                        price: "$2300. ",
                        employer: "Agent Avarage Sales",
                        sales: "12 Sales Today",
                        color: "aero",
                        borderColor: "border-aero",
                    }, {
                        name: "Ms. Mary Jane",
                        price: "$2300. ",
                        employer: "Agent Avarage Sales",
                        sales: "12 Sales Today",
                        color: "green",
                        borderColor: "border-green",
                    }, {
                        name: "Ms. Mary Jane",
                        price: "$2300. ",
                        employer: "Agent Avarage Sales",
                        sales: "12 Sales Today",
                        color: "aero",
                        borderColor: "border-aero",
                    }, {
                        name: "Ms. Mary Jane",
                        price: "$2300. ",
                        employer: "Agent Avarage Sales",
                        sales: "12 Sales Today",
                        color: "green",
                        borderColor: "border-green",
                    }, {
                        name: "Ms. Mary Jane",
                        price: "$2300. ",
                        employer: "Agent Avarage Sales",
                        sales: "12 Sales Today",
                        color: "aero",
                        borderColor: "border-aero",
                    }
                ];
            },
            getDealers: function () {
                return dealers;
            },
            getProvinces: function () {
                return provinces;
            },
            getDealerCars: function (dealerId) {
                var Dealer = $resource('http://localhost/WepApi/api/dealer/dealercars/:delearId', { delearId: '@id' });
                return Dealer.query({ delearId: dealerId }, function (dealerCars) {
                    dealerCars.forEach(function (car) {
                        car.imagePath = "http://localhost/WepApi/image/cars/" + car.id + ".jpg";;
                    });
                }).$promise;
            },
            getDealerInfomation: function (dealerId) {
                var Dealer = $resource('http://localhost/WepApi/api/dealer/dealerInformation/:id', { id: '@id' });
                return Dealer.get({ id: dealerId }).$promise;
            },
            getCategories: function () {
                return [
                    {
                        id: 1,
                        parentId: 0,
                        name: "Enclave",
                        market: 51,
                        dealer: 50
                    },
                    {
                        id: 2,
                        parentId: 0,
                        name: "Encore",
                        market: 49,
                        dealer: 50
                    },
                    {
                        id: 3,
                        parentId: 0,
                        name: "LaCrosse",
                        market: 52,
                        dealer: 50
                    },
                    {
                        id: 4,
                        parentId: 0,
                        name: "Regal",
                        market: 52,
                        dealer: 50
                    },
                    {
                        id: 5,
                        parentId: 0,
                        name: "Verano",
                        market: 52,
                        dealer: 50
                    },
                    {
                        id: 6,
                        parentId: 2,
                        name: "AWD",
                        market: 52,
                        dealer: 50
                    },
                    {
                        id: 7,
                        parentId: 2,
                        name: "	FWD",
                        market: 52,
                        dealer: 50
                    }

                ]
            },
            getFilters: function () {
                return [
                    {
                        order: 0,
                        title: "Year",
                        field: "year"
                    },
                    {
                        order: 1,
                        title: "Maker",
                        field: "make"
                    },
                    {
                        order: 2,
                        title: "Model",
                        field: "model"
                    },
                    {
                        order: 3,
                        title: "Body type",
                        field: "bodyType"
                    },
                    {
                        order: 4,
                        title: "Trim",
                        field: "styleTrim"
                    },
                    {
                        order: 5,
                        title: "Drivetrain",
                        field: "drivetrain"
                    }
                ];
            },
        }
    });