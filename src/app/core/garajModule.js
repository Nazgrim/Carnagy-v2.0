var garajModule = (function () {

    function parentSearch(categories, parentId, currentId) {
        var currentParentId = -1;
        for (var i = 0; i < categories.length; i++) {
            if (categories[i].id == currentId) {
                currentParentId = categories[i].parentId
                break;
            }
        }
        if (currentParentId == parentId) {
            return true;
        }
        else if (currentParentId == 0) {
            return false;
        }
        else {
            return parentSearch(categories, parentId, currentParentId);
        }
    }

    return {
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
        loadDetails: function (dealer) {
            dealer.phone = dealer.phone == null ? '888-307-1817' : dealer.phone;
            var max = 1;
            var min = -2;
            function randomIntFromInterval(min, max) {
                return Math.floor(Math.random() * (max - min + 1) + min);
            };
            dealer.cars.forEach(function (car) {
                var result = (Math.random() * (max - min) + min).toFixed(2);
                switch (randomIntFromInterval(1, 4)) {
                    case 1:
                        car.color = "red-market";
                        break;
                    case 2:
                        car.color = "green-market";
                        break;
                    case 3:
                        car.color = "blue-market";
                        break;
                    case 4:
                        car.color = "yellow-market";
                        break;
                }
                switch (car.model) {
                    case "Enclave":
                        car.category = 1;
                        break;
                    case "Encore":
                        if (car.drivetrain == "AWD") {
                            car.category = 6;
                        } else {
                            car.category = 7;
                        }
                        break;
                    case "LaCrosse":
                        car.category = 3;
                        break;
                    case "Regal":
                        car.category = 4;
                        break;
                    case "Verano":
                        car.category = 5;
                        break;
                }
                car.amountDifference = result > 0 ? '(+' + result + '%)' : '(' + result + '%)';
                car.amountColor = result > 0 ? '#5cb85c' : '#d9534f';
            });
        },
        getDealers: function (cars, categories, parentId) {
            var cars2 = cars.filter(function (car, index) {
                return parentSearch(categories, parentId, car.category);
            });
            return cars2;
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
        createGropus: function (cars, filters) {
            var result = {}
            cars.forEach(function (car, index) {
                car["year"] = 2015;
                var keyArray = [];
                var keyObject = {};
                filters.forEach(function (filter) {
                    keyObject[filter.field] = car[filter.field];
                    keyArray.push(car[filter.field]);
                });
                var ketString = keyArray.join('.');
                if (!result[ketString]) {
                    result[ketString] = { key: keyObject }
                }
                if (!result[ketString]["value"])
                    result[ketString]["value"] = [];
                result[ketString]["value"].push(car);
            });
            return result;
        },

    }
} ());