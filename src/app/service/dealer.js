angular
    .module("dealerModule", []);
angular
    .module("dealerModule")
    .service("dealerService", function () {
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
            dealer.year = 2015;
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
            getDealers: function () {
                return dealers;
            },
            getProvinces: function () {
                return provinces;
            },
            getDealerById: function () {
                return dealers[0];
            }
        }
    });