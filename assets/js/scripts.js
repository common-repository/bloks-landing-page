/*
 * Bloks 1.0.0
 * Wordpress blocks builder.
 * http://bloks.co
 *
 * Copyright 2017, Bloks Co., Ltd.
*/

/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 174);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports) {

module.exports = jQuery;

/***/ }),

/***/ 174:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(175);


/***/ }),

/***/ 175:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

var _googleMaps = __webpack_require__(42);

var _googleMaps2 = _interopRequireDefault(_googleMaps);

var _form = __webpack_require__(176);

var _form2 = _interopRequireDefault(_form);

__webpack_require__(177);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Script send mail
 */
(0, _jquery2.default)(document).ready(function () {
    jQuery(".btn-send").on("click", function (event) {
        event.stopPropagation();
        var formMail = new _form2.default();
        formMail.sendMail('form-' + this.id);
        return false;
    });
});

/**
 *  Script create google-map *
 */
(0, _jquery2.default)(document).ready(function () {
    (0, _jquery2.default)(".map-row").each(function (index, element) {
        var markers = (0, _jquery2.default)(element).data('markers');
        var custommap = (0, _jquery2.default)(element).data('custommap');
        var classmap = (0, _jquery2.default)(element).find('.' + (0, _jquery2.default)(element).data('classmap')).attr('id');

        var gMap = new _googleMaps2.default();
        gMap.init(classmap, markers, custommap);
    });
});

/**
 *  Script redirect cover button
 */
(0, _jquery2.default)(document).ready(function () {
    jQuery(".button-text").on("click", function (event) {
        var link = (0, _jquery2.default)(this).find("a").attr('href');
        location.href = link;
    });
});

/***/ }),

/***/ 176:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BloksForm = function () {
    function BloksForm() {
        _classCallCheck(this, BloksForm);
    }

    _createClass(BloksForm, [{
        key: 'sendMail',
        value: function sendMail(formid) {

            // check valid form
            if (!this.isValidFrom(formid)) {
                console.log('form valid');
                return false;
            }

            (0, _jquery2.default)('#' + formid + ' .msg-loading').show();
            var item = (0, _jquery2.default)('#' + formid).serializeArray();

            _jquery2.default.ajax(Bloks.Params.baseUrl + '/wp-admin/admin-ajax.php?_wpnonce=' + Bloks.Params.wpnonce, {
                method: "POST",
                dataType: 'JSON',
                data: item
            }).done(function (data) {
                if (!data.succeed) {
                    (0, _jquery2.default)('#' + formid + ' .msg-loading').hide();
                    (0, _jquery2.default)('#' + formid + ' .msg-sendmail').addClass('text-danger');
                    (0, _jquery2.default)('#' + formid + ' .msg-sendmail').text('Email sent error: ' + data.error);
                } else {
                    (0, _jquery2.default)('#' + formid + ' .msg-loading').hide();
                    (0, _jquery2.default)('#' + formid + ' .msg-sendmail').addClass('text-success');
                    (0, _jquery2.default)('#' + formid + ' .msg-sendmail').text('Email sent successfully!');
                    (0, _jquery2.default)('#' + formid).trigger('reset');
                    setTimeout(function () {
                        (0, _jquery2.default)('#' + formid + ' .msg-sendmail').hide('slow');
                    }, 2000);

                    // submit link after send Email
                    item.forEach(function (obj, index) {
                        if (obj.name == 'linksubmit' && obj.value != "") {
                            var url = obj.value;
                            var pattern = /^((http|https|ftp):\/\/)/;
                            if (!pattern.test(url)) {
                                url = "http://" + url;
                            }
                            _jquery2.default.post(url, item);
                        }
                    });
                }
            });
        }
    }, {
        key: 'isValidFrom',
        value: function isValidFrom(formid) {
            var i = 0;
            var validFields = ['name', 'email', 'phone'];
            var form = (0, _jquery2.default)('#' + formid);
            var selector = (0, _jquery2.default)(form).find('input, select, textarea');
            var self = this;
            (0, _jquery2.default)(selector).each(function (index, obj) {
                var attr = (0, _jquery2.default)(this).attr('data_attr');
                if (validFields.indexOf(attr) >= 0) {
                    if ((0, _jquery2.default)(obj).val() == '') {
                        (0, _jquery2.default)(obj).addClass('form-invalid');
                        i++;
                    } else {
                        (0, _jquery2.default)(obj).removeClass('form-invalid');
                        /*check phone number*/
                        if (attr == 'phone') {
                            if (!_jquery2.default.isNumeric((0, _jquery2.default)(obj).val())) {
                                (0, _jquery2.default)(obj).addClass('form-invalid');
                                i++;
                            }
                        }
                        /*check valid email*/
                        if (attr == 'email') {
                            if (!self.isValidEmail((0, _jquery2.default)(obj).val())) {
                                (0, _jquery2.default)(obj).addClass('form-invalid');
                                i++;
                            }
                        }
                    }
                }
            });

            if (i > 0) {
                return false;
            } else {
                return true;
            }
        }
    }, {
        key: 'isValidEmail',
        value: function isValidEmail(email) {
            var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)+|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
            if (filter.test(email)) {
                return true;
            } else {
                return false;
            }
        }
    }]);

    return BloksForm;
}();

exports.default = BloksForm;

/***/ }),

/***/ 177:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _plyr = __webpack_require__(178);

var _plyr2 = _interopRequireDefault(_plyr);

var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Player = function () {
    function Player(element, options) {
        var _this = this;

        _classCallCheck(this, Player);

        this.$element = (0, _jquery2.default)(element);
        this.options = options;
        this.player = _plyr2.default.setup(element, options)[0];

        var mask = (0, _jquery2.default)('<div class="bloks__mask"></div>');
        mask.css({ background: options.backdrop });

        this.options.source = {
            type: this.$element.data('type'),
            videoId: this.$element.data('type') === 'youtube' || this.$element.data('type') === 'vimeo' ? this.$element.data('video-id') : this.$element.find('source').attr('src')
        };

        this.player.on('ready', function (event) {
            var container = (0, _jquery2.default)(event.detail.plyr.getContainer());
            container.append(mask);
            container.data('bloks.player', _this);
            container.addClass(_this.options.class);

            if (options.volume === undefined) {
                _this.player.setVolume(50);
            } else {
                _this.player.setVolume(options.volume);
            }
        });

        this.player.on('canplay', function () {
            if (options.autoplay === true) {
                // Fix issue DOMException: The play() request was interrupted by a call to pause(). in "video" tag
                _this.player.pause();
                _this.player.play();
            }
        });
    }

    _createClass(Player, [{
        key: 'destroy',
        value: function destroy() {
            this.player.destroy();
        }
    }, {
        key: 'setBackdrop',
        value: function setBackdrop(backdrop) {
            (0, _jquery2.default)(this.player.getContainer()).find('.bloks__mask').css({ background: backdrop });

            (0, _jquery2.default)(this.player.getOriginal()).attr('data-backdrop', backdrop);
        }
    }, {
        key: 'setAutoplay',
        value: function setAutoplay(autoplay) {
            if (autoplay) {
                this.player.play();
            } else {
                this.player.stop();
            }

            (0, _jquery2.default)(this.player.getOriginal()).attr('data-autoplay', autoplay);
        }
    }]);

    return Player;
}();

var DEFAULTS = {
    tooltips: {
        controls: true
    },
    autoplay: false,
    volume: 50,
    backdrop: 'transparent'
};

(function () {
    'use strict';

    function Plugin(option) {
        var apiArgs = Array.prototype.slice.call(arguments, 1);

        return this.each(function () {
            var $this = (0, _jquery2.default)(this);
            var data = $this.data('bloks.player');
            var options = _jquery2.default.extend({}, DEFAULTS, $this.data(), (typeof option === 'undefined' ? 'undefined' : _typeof(option)) === 'object' && option);

            if (!data) $this.data('bloks.player', data = new Player(this, options));
            if (typeof option === 'string') {
                if (_jquery2.default.isFunction(data[option])) {
                    data[option].apply(data, apiArgs);
                }
            }
        });
    }

    var old = _jquery2.default.fn.player;

    _jquery2.default.fn.player = Plugin;
    _jquery2.default.fn.player.Constructor = Player;

    // CAROUSEL NO CONFLICT
    // ====================

    _jquery2.default.fn.player.noConflict = function () {
        _jquery2.default.fn.player = old;
        return this;
    };

    (0, _jquery2.default)(window).on('load', function () {
        (0, _jquery2.default)('[data-player="true"]').each(function () {
            var $player = (0, _jquery2.default)(this);
            Plugin.call($player, $player.data());
        });
    });
})();

/***/ }),

/***/ 178:
/***/ (function(module, exports) {

module.exports = plyr;

/***/ }),

/***/ 42:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var maps = [];
var markers = [];
var arrMarkers = [];
var styles = [{ elementType: 'geometry', stylers: [{ color: '#242f3e' }] }, { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] }, { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] }, {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }]
}, {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }]
}, {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{ color: '#263c3f' }]
}, {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#6b9a76' }]
}, {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#38414e' }]
}, {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#212a37' }]
}, {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#9ca5b3' }]
}, {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ color: '#746855' }]
}, {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#1f2835' }]
}, {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#f3d19c' }]
}, {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{ color: '#2f3948' }]
}, {
    featureType: 'transit.station',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }]
}, {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#17263c' }]
}, {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#515c6d' }]
}, {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#17263c' }]
}];

var GoogleMaps = function () {
    function GoogleMaps() {
        _classCallCheck(this, GoogleMaps);
    }

    _createClass(GoogleMaps, [{
        key: 'init',
        value: function init(container, address, custommap) {
            arrMarkers[container] = new Array();
            var defaults = {
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                scrollwheel: false,
                navigationControl: false,
                mapTypeControl: false,
                scaleControl: false,
                draggable: true,
                styles: custommap
            };

            // create map
            maps[container] = new google.maps.Map((0, _jquery2.default)('#' + container).get(0), defaults);

            // create bounds
            this.getLatLngAddress(container, address);
        }
    }, {
        key: 'getLatLngAddress',
        value: function getLatLngAddress(container, arrAddress) {
            var self = this;
            this.deleteOverlays(container);

            var bounds = new google.maps.LatLngBounds();

            arrAddress.forEach(function (item, i) {
                var geocoder = new google.maps.Geocoder();
                var iconMap = '';
                geocoder.geocode({ 'address': item.title }, function (results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        if (!item.icon) {
                            iconMap = 'http://bloks.co/demo_images/map-default.png';
                        } else {
                            iconMap = item.icon;
                        }

                        var widthImg = 0;
                        var heightImg = 0;
                        var imgUpdate = new Image();
                        imgUpdate.src = iconMap;
                        imgUpdate.onload = function () {
                            if (this.height > this.width) {
                                if (this.width > 50) {
                                    widthImg = this.width * 50 / this.width;
                                    heightImg = this.height * 50 / this.width;
                                } else {
                                    widthImg = this.width;
                                    heightImg = this.height;
                                }

                                var img = { url: iconMap, scaledSize: new google.maps.Size(widthImg, heightImg) };
                                markers[container] = new google.maps.Marker({ map: maps[container], position: results[0].geometry.location, icon: img });
                            } else if (this.width > this.height) {
                                if (this.height > 50) {
                                    widthImg = this.width * 50 / this.height;
                                    heightImg = this.height * 50 / this.height;
                                } else {
                                    widthImg = this.width;
                                    heightImg = this.height;
                                }

                                var _img = { url: iconMap, scaledSize: new google.maps.Size(widthImg, heightImg) };
                                markers[container] = new google.maps.Marker({ map: maps[container], position: results[0].geometry.location, icon: _img });
                            } else {
                                widthImg = 50;
                                heightImg = 50;

                                var _img2 = { url: iconMap, scaledSize: new google.maps.Size(widthImg, heightImg) };
                                markers[container] = new google.maps.Marker({ map: maps[container], position: results[0].geometry.location, icon: _img2 });
                            }

                            markers[container].setMap(maps[container]);

                            // fix: when has one address
                            if (arrAddress.length == 1) {
                                maps[container].setCenter(results[0].geometry.location);
                                maps[container].fitBounds(results[0].geometry.viewport);
                                // maps[container].setZoom(15);
                            } else {
                                bounds.extend(markers[container].position);
                                maps[container].fitBounds(bounds);
                            }

                            // fix: when two address the same
                            if (arrAddress.length >= 2 && maps[container].getZoom() == 22) {
                                maps[container].setZoom(16);
                            }

                            // fix: find full address & country
                            // let formatted_address = results[0].formatted_address;
                            // let address_parts = self.getAddressParts(results[0]);

                            arrMarkers[container].push(markers[container]);
                        };
                    } else {
                        console.log('Geocode was not successful for the following reason: ' + status);
                    }
                });
            });
        }
    }, {
        key: 'getAddressParts',
        value: function getAddressParts(object) {
            var address = {};
            var address_components = object.address_components;
            address_components.forEach(function (element) {
                address[element.types[0]] = element.short_name;
            });
            return address;
        }
    }, {
        key: 'fitBoundsMarkers',
        value: function fitBoundsMarkers(container) {
            // let bounds = this.bounds;
            var bounds = new google.maps.LatLngBounds();
            if (arrMarkers[container]) {
                for (var i in arrMarkers[container]) {
                    arrMarkers[container][i].setMap(maps[container]);
                    bounds.extend(arrMarkers[container][i].position);
                }

                maps[container].fitBounds(bounds);
            }

            if (arrMarkers[container].length == 1) {
                maps[container].setZoom(15);
                maps[container].setCenter(arrMarkers[container][0].position);
            }
        }
    }, {
        key: 'deleteOverlays',
        value: function deleteOverlays(container) {
            if (arrMarkers[container]) {
                for (var i in arrMarkers[container]) {
                    arrMarkers[container][i].setMap(null);
                }
                arrMarkers[container].length = 0;
            }
        }

        // Delete marker

    }, {
        key: 'deleteMarker',
        value: function deleteMarker(container, index) {
            if (arrMarkers[container][index] != undefined) {
                arrMarkers[container][index].setMap(null);
                arrMarkers[container].splice(index, 1);
            }
        }

        // Delete marker

    }, {
        key: 'changeIconMarker',
        value: function changeIconMarker(container, index, icon) {
            if (arrMarkers[container][index] != undefined && icon != '') {
                var widthImg = 0;
                var heightImg = 0;
                var imgUpdate = new Image();
                imgUpdate.src = icon;
                imgUpdate.onload = function () {
                    if (this.height > this.width) {
                        if (this.width > 50) {
                            widthImg = this.width * 50 / this.width;
                            heightImg = this.height * 50 / this.width;
                        } else {
                            widthImg = this.width;
                            heightImg = this.height;
                        }

                        var img = { url: icon, scaledSize: new google.maps.Size(widthImg, heightImg) };
                        arrMarkers[container][index].setIcon(img);
                    } else if (this.width > this.height) {
                        if (this.height > 50) {
                            widthImg = this.width * 50 / this.height;
                            heightImg = this.height * 50 / this.height;
                        } else {
                            widthImg = this.width;
                            heightImg = this.height;
                        }

                        var _img3 = { url: icon, scaledSize: new google.maps.Size(widthImg, heightImg) };
                        arrMarkers[container][index].setIcon(_img3);
                    } else {
                        widthImg = 50;
                        heightImg = 50;

                        var _img4 = { url: icon, scaledSize: new google.maps.Size(widthImg, heightImg) };
                        arrMarkers[container][index].setIcon(_img4);
                    }
                };
            }
        }
    }]);

    return GoogleMaps;
}();

exports.default = GoogleMaps;

/***/ })

/******/ });