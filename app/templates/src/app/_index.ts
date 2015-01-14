/// <reference path="../../typings/tsd.d.ts" />

/// <reference path="main/main.controller.ts" />
/// <reference path="../components/navbar/navbar.controller.ts" />
<% if (translated) {%>
/// <reference path="../components/languageSelect/languageSelect.controller.ts" />
<% } %>

module <%= appName %> {
  'use strict';

  angular.module('<%= appName %>', [<%= modulesDependencies %>])
    .controller('MainCtrl', MainCtrl)
    .controller('NavbarCtrl', NavbarCtrl)
<% if (translated) {%>
    .controller('LanguageSelectCtrl', LanguageSelectCtrl)
<% } %>
<%= routerJs %>;
}
