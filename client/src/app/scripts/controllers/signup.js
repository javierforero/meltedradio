'use strict';

/**
 * @ngdoc function
 * @name meltedRadioApp.controller:SignupCtrl
 * @description
 * # SignupCtrl
 * Controller of the meltedRadioApp
 */
angular.module('meltedRadio')
  .controller('SignupCtrl', function () {

    // submit function
    this.signUp = function(user) {
      alert(user.username);
    };
  });
