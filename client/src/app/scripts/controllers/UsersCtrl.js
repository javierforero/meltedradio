(function() {
  function UsersCtrl() {
    this.message = "Hi!";
  }

  angular
    .module('meltedRadio')
    .controller('UsersCtrl', UsersCtrl);
})();
