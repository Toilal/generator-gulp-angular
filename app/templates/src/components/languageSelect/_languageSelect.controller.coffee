angular.module("<%= appName %>")
  .controller "LanguageSelectCtrl", ($scope
<% if (props.translateComponents === 'translate') { %>, $translate
<% } else { %>, gettextCatalog
<% } %>) ->
    $scope.availableLanguages = [
      {
        name: "English"
        id: "en"
      }
      {
        name: "Français"
        id: "fr"
      }
    ]

    $scope.selectedId =
<% if (props.translateComponents === 'translate') {%> $translate.use()
<% } else { %> gettextCatalog.currentLanguage
<% } %>

    $scope.selectedId =
<% if (props.translateComponents === 'translate') { %> $translate.preferredLanguage()
<% } else { %> 'en'
<% } %> unless $scope.selectedId

    $scope.$watch "selectedId", (selectedId) ->
<% if (props.translateComponents === 'translate') { %> $translate.use selectedId
<% } else { %> gettextCatalog.setCurrentLanguage selectedId
<% } %>
