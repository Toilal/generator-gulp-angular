'use strict';
/*jshint esnext: true */

import MainCtrl from './main/main.controller';
import NavbarCtrl from '../components/navbar/navbar.controller';
<% if (translated) { %>
import LanguageSelectCtrl from '../components/languageSelect/languageSelect.controller';
<% } %>

angular.module('<%= appName %>', [<%= modulesDependencies %>])
  .controller('MainCtrl', MainCtrl)
  .controller('NavbarCtrl', NavbarCtrl)
<% if (translated) {%>
  .controller('LanguageSelectCtrl', LanguageSelectCtrl)
<% } %>
  <%= routerJs %>;
