'use strict';

class DealersCtrl {
    constructor($scope, $location, $filter, uiGmapGoogleMapApi, dealers, provinces) {
        $scope.clearProvince = function ($event) {
            $event.stopPropagation();
            
            $scope.selectedProvince.selected = null;
            if ($scope.selectedCity.selected) $scope.selectedCity.selected = null;            
            $scope.filterProvince();
        };
        $scope.clearCity = function ($event) {
            $event.stopPropagation();
            
            $scope.selectedCity.selected = null;            
            $scope.filterProvince();
        };
        $scope.provinces = provinces;

        $scope.currentPage = 1;
        $scope.numPerPage = 10;
        $scope.maxSize = 5;
        $scope.orderBy = {
            field: 'value',
            desc: true,
        };
        $scope.selectedProvince = {};
        $scope.selectedCity = {};


        $scope.getDealers = function () {
            var filteredDealers = dealers.filter(function (c) {
                if ($scope.selectedProvince.selected && c.province !== $scope.selectedProvince.selected.name) return false;
                if ($scope.selectedCity.selected && c.cityName !== $scope.selectedCity.selected.name) return false;

                return true;
            });

            return $filter('orderBy')(filteredDealers, $scope.orderBy.field, $scope.orderBy.desc);
        };

        if ($location.search().page && $location.search().page > 0) {
            $scope.currentPage = $location.search().page;
        }
        if ($location.search().orderBy) {
            $scope.orderBy.field = $location.search().orderBy;
        }
        if ($location.search().orderByDesc) {
            $scope.orderBy.desc = $location.search().orderByDesc;
        }

        $scope.orderByField = function (field) {
            $location.search('orderBy', field);
            $location.search('orderByDesc', !$scope.orderBy.desc);
            $scope.orderBy.field = field;
            $scope.orderBy.desc = !$scope.orderBy.desc;
        };
        $scope.$watch('currentPage + numPerPage', function () {
            var begin = (($scope.currentPage - 1) * $scope.numPerPage);
            $location.search('page', $scope.currentPage);

            var end = begin + $scope.numPerPage;
            $scope.filteredDealers = function () {
                return $scope.getDealers().slice(begin, end);
            };
        });

        $scope.map = {
            center: {
                latitude: 54.42350,
                longitude: -108.07394
            },
            zoom: 4,
            bounds: {},
            options: {
                styles: [{
                    "featureType": "administrative",
                    "elementType": "labels.text.fill",
                    "stylers": [{
                        "color": "#444444"
                    }]
                }, {
                        "featureType": "landscape",
                        "elementType": "all",
                        "stylers": [{
                            "color": "#f2f2f2"
                        }]
                    }, {
                        "featureType": "poi",
                        "elementType": "all",
                        "stylers": [{
                            "visibility": "off"
                        }]
                    }, {
                        "featureType": "road",
                        "elementType": "all",
                        "stylers": [{
                            "saturation": -100
                        }, {
                                "lightness": 45
                            }]
                    }, {
                        "featureType": "road.highway",
                        "elementType": "all",
                        "stylers": [{
                            "visibility": "simplified"
                        }]
                    }, {
                        "featureType": "road.arterial",
                        "elementType": "labels.icon",
                        "stylers": [{
                            "visibility": "off"
                        }]
                    }, {
                        "featureType": "transit",
                        "elementType": "all",
                        "stylers": [{
                            "visibility": "off"
                        }]
                    }, {
                        "featureType": "water",
                        "elementType": "all",
                        "stylers": [{
                            "color": "#46bcec"
                        }, {
                                "visibility": "on"
                            }]
                    }]
            }
        };

        function createBoundsForMarkers(markers) {
            var bounds = new google.maps.LatLngBounds();
            markers.forEach(function (m) {
                var mark = new google.maps.Marker({
                    position: new google.maps.LatLng(m.latitude, m.longitude)
                });
                bounds.extend(mark.getPosition());
            });
            return bounds;
        }

        function getBoundsZoomLevel(bounds, mapDim) {
            var WORLD_DIM = {
                height: 256,
                width: 256
            };
            var ZOOM_MAX = 21;

            function latRad(lat) {
                var sin = Math.sin(lat * Math.PI / 180);
                var radX2 = Math.log((1 + sin) / (1 - sin)) / 2;
                return Math.max(Math.min(radX2, Math.PI), -Math.PI) / 2;
            }

            function zoom(mapPx, worldPx, fraction) {
                return Math.floor(Math.log(mapPx / worldPx / fraction) / Math.LN2);
            }

            var ne = bounds.getNorthEast();
            var sw = bounds.getSouthWest();

            var latFraction = (latRad(ne.lat()) - latRad(sw.lat())) / Math.PI;

            var lngDiff = ne.lng() - sw.lng();
            var lngFraction = ((lngDiff < 0) ? (lngDiff + 360) : lngDiff) / 360;

            var latZoom = zoom(mapDim.height, WORLD_DIM.height, latFraction);
            var lngZoom = zoom(mapDim.width, WORLD_DIM.width, lngFraction);

            return Math.min(latZoom, lngZoom, ZOOM_MAX);
        }

        var createRandomMarker = function (i, bounds, dealer, markers, idKey) {
            if (idKey == null) {
                idKey = "id";
            }

            var ret = {
                icon: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
                latitude: dealer.latitude,
                longitude: dealer.longitude,
                title: dealer.name,
                url: '#/dealer/' + dealer.id,
                showWindow: true,
                show: false,
                province: dealer.province,
                cityName: dealer.cityName
            };
            if (dealer.selected) {
                ret.icon = "http://maps.google.com/mapfiles/ms/icons/green-dot.png";
            }
            ret.onClick = function () {
                console.log("Clicked!");
                markers.forEach(function (marker) {
                    if (marker.show)
                        marker.show = false;
                });
                ret.show = !ret.show;
            };
            ret[idKey] = i;
            return ret;
        };

        $scope.randomMarkers = [];
        var markers = [];
        uiGmapGoogleMapApi.then(function (maps) {
            // Only need to regenerate once
            //if (!ov.southwest && nv.southwest) {
            
            dealers.forEach(function (dealer, index) {
                if (dealer.latitude > 0 &&
                    (dealer.name != 'DOW HONDA' && dealer.name != 'Nathan Auto Sales'))//hardcode
                    markers.push(createRandomMarker(index, $scope.map.bounds, dealer, markers));
            });

            var target = angular.element('.angular-google-map');
            $scope.map.height = target.height();
            $scope.map.width = target.width();
            var bounds = (markers.length > 0) ? createBoundsForMarkers(markers) : null;
            if (bounds) {
                var coord = bounds.getCenter();
                $scope.map.zoom = getBoundsZoomLevel(bounds, $scope.map);
                $scope.map.center.latitude = coord.lat();
                $scope.map.center.longitude = coord.lng();
            }
            var cluster = {
                gridSize: 60,
                ignoreHidden: true,
                minimumClusterSize: 4
            };
            $scope.map.clusterOptions = cluster;
            $scope.map.clusterOptionsText = angular.toJson($scope.map.clusterOptions);
            $scope.randomMarkers = markers;
            //}
        });
        $scope.searchDealer = function (dealerName) {
            $scope.randomMarkers.forEach(function (marker) {
                if (marker.title == dealerName) {
                    marker.onClick();
                    $scope.map.zoom = 21;
                    $scope.map.center.latitude = marker.latitude;
                    $scope.map.center.longitude = marker.longitude;
                }
            });
        };
        $scope.filterProvince = function (params) {
            $scope.randomMarkers = markers.filter(function (c) {
                if ($scope.selectedProvince.selected && c.province !== $scope.selectedProvince.selected.name)
                    return false;
                console.log(c.cityName);
                $scope.selectedCity = {};

                return true;
            });
            var bounds = ($scope.randomMarkers.length > 0) ? createBoundsForMarkers($scope.randomMarkers) : null;
            if (bounds) {
                var coord = bounds.getCenter();
                $scope.map.zoom = getBoundsZoomLevel(bounds, $scope.map);
                $scope.map.center.latitude = coord.lat();
                $scope.map.center.longitude = coord.lng();
            }
        };
        $scope.filterCity = function (params) {
            $scope.randomMarkers = markers.filter(function (c) {
                if ($scope.selectedCity.selected && c.cityName !== $scope.selectedCity.selected.name)
                    return false;
                return true;
            });
            var bounds = ($scope.randomMarkers.length > 0) ? createBoundsForMarkers($scope.randomMarkers) : null;
            if (bounds) {
                var coord = bounds.getCenter();
                $scope.map.zoom = getBoundsZoomLevel(bounds, $scope.map);
                $scope.map.center.latitude = coord.lat();
                $scope.map.center.longitude = coord.lng();
            }
        };


        $scope.$watch(function () {
            return $scope.map.bounds;
        }, function (nv, ov) { }, true);
    }
}

DealersCtrl.$inject = ['$scope', '$location', '$filter', 'uiGmapGoogleMapApi', 'dealers', 'provinces'];

export default DealersCtrl;