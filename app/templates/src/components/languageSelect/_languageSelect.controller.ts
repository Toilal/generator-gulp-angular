module <%= appName %> {
  'use strict';

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
    /* tslint:disable:typedef */
    constructor ($scope: ILanguageSelectScope
<% if (props.translateComponents === 'translate') { %>, $translate
<% } else { %>, gettextCatalog
<% } %>) {
    /* tslint:enable:typedef */
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

      $scope.$watch('selectedId', function(selectedId: string) {
<% if (props.translateComponents === 'translate') {%>
        $translate.use(selectedId);
<% } else {%>
        gettextCatalog.setCurrentLanguage(selectedId);
<% } %>
      });
    }
  }

}
