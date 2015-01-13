'use strict';
/*jshint esnext: true */

class LanguageSelectCtrl {
  constructor ($scope
<% if (props.translateComponents === 'translate') {%>, $translate
<% } else {%>, gettextCatalog
<% } %>) {
    $scope.availableLanguages = [
      {name: 'English', id: 'en'},
      {name: 'Français', id: 'fr'}
    ];

    $scope.selectedId =
<% if (props.translateComponents === 'translate') {%> $translate.use();
<% } else { %>gettextCatalog.currentLanguage;
<% } %>

    if (!$scope.selectedId) {
<% if (props.translateComponents === 'translate') {%>
      $scope.selectedId = $translate.preferredLanguage();
<% } else { %>
      $scope.selectedId = 'en';
<% } %>
    }

    $scope.$watch('selectedId', (selectedId) =>
<% if (props.translateComponents === 'translate') {%> $translate.use(selectedId)
<% } else { %> gettextCatalog.setCurrentLanguage(selectedId)
<% } %>);
  }
}

LanguageSelectCtrl.$inject = ['$scope'
<% if (props.translateComponents === 'translate') {%>, '$translate'
<% } else {%>, 'gettextCatalog'
<% } %>];

export default LanguageSelectCtrl;