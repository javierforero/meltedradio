'use strict';

/**
 * @ngdoc function
 * @name meltedRadioApp.controller:RegistrationsCtrl
 * @description
 * # RegistrationsCtrl
 * Controller of the meltedRadioApp
 */
angular.module('meltedRadio')
  .controller('RegistrationsCtrl', function () {

    // submit function
    this.signUp = function(user) {
      console.log(user.username, user.email, user.password);
    };
  });
