/// <reference path="../../typings/tsd.d.ts" />

/// <reference path="main/main.controller.ts" />
/// <reference path="../components/navbar/navbar.controller.ts" />

'use strict';

module <%= appName %> {
  angular.module('<%= appName %>', [<%= modulesDependencies %>])
    .controller('MainCtrl', MainCtrl)
    .controller('NavbarCtrl', NavbarCtrl)
    <%= routerJs %>;
}
