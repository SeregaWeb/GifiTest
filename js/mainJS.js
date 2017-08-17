(function() {
    window.App = {
        Models: {},
        Views: {},
        Collections: {},
        Router: {}
    }

    window.vent = _.extend({}, Backbone.Events);

    App.template = function(id) {
        return _.template($("#" + id).html());
    };



}());

$(document).ready(function() {
    new App.Router();
    App.RandomList = new App.Collections.RandomGif();
    App.RandomList.fetch().then(function() {
        new App.Views.App({
            collection: App.RandomList
        });
    })
    App.SerchList = new App.Collections.Serch();
    new App.Views.Serch({
        collection: App.SerchList
    });
});