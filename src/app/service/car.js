angular
    .module("carModule", []);
angular
    .module("carModule")
    .service("carService", function () {
        return {
            getCarById: function (id) {
                return {
                    information: {
                        make: "Mercedes-Benz",
                        model: "C-Class",
                        engine: "I-4 cyl",
                        drivetrain: "RWD"
                    },
                    chartSeries: {
                        name: 'Dealer',
                        data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
                    },
                    similarCars: [
                        {
                            id: 1,
                            name: "Car 1",
                            imgUrl: "../app/img/car1.png",
                            maker: "Audi",
                            model: "TT",
                            isEmpty:false,
                            drivetrain: "RWD",
                            price: 21000,
                            chartSeries: {
                                carId: 1,
                                name: 'Car 1',
                                data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
                            }
                        }, {
                            id: 2,
                            name: "Car 2",
                            imgUrl: "../app/img/car2.png",
                            maker: "Audi",
                            model: "TT",
                            isEmpty:false,
                            drivetrain: "RWD",
                            price: 21000,
                            chartSeries: {
                                carId: 2,
                                name: 'Car 2',
                                data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
                            }
                        }, {
                            id: 3,
                            name: "Car 3",
                            imgUrl: "../app/img/car3.png",
                            maker: "Audi",
                            model: "TT",
                            isEmpty:false,
                            drivetrain: "RWD",
                            price: 21000,
                            chartSeries: {
                                carId: 3,
                                name: 'Car 3',
                                data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
                            }
                        }
                    ]
                };
            }
        };
    })