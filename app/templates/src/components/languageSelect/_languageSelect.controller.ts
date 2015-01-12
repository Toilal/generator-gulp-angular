'use strict';

module <%= appName %> {

  interface ILanguage {
    name: string;
    id: string;
  }

  interface ILanguageSelectScope extends ng.IScope {
    availableLanguages: ILanguage[];
    selectedId: string;
  }

  export class LanguageSelectCtrl {
    /* @ngInject */
    constructor ($scope: ILanguageSelectScope
<% if (props.translateComponents === 'translate') { %>, $translate
<% } else { %>, gettextCatalog
<% } %>) {
      $scope.availableLanguages = [
        {name: 'English', id: 'en'},
        {name: 'Français', id: 'fr'}
      ];

      $scope.selectedId =
<% if (props.translateComponents === 'translate') {%> $translate.use();
<% } else { %> gettextCatalog.currentLanguage;
<% } %>

      if (!$scope.selectedId) {
<% if (props.translateComponents === 'translate') { %>
        $scope.selectedId = $translate.preferredLanguage();
<% } else {%>
        $scope.selectedId = 'en';
<% } %>
      }

      $scope.$watch('selectedId', function(selectedId) {
<% if (props.translateComponents === 'translate') {%>
        $translate.use(selectedId);
<% } else {%>
        gettextCatalog.setCurrentLanguage(selectedId);
<% } %>
      });
    }
  }

}
