App.Collections.RandomGif = Backbone.Collection.extend({
    model: App.Models.Gif,
    url: "http://api.giphy.com/v1/gifs/trending?&api_key=d03c2f2de6e44daf9696172a4a0b546d&limit=36",
    parse: function(ret) {
        var res = ret.data;
        return res;
    }
})

App.Collections.Serch = Backbone.Collection.extend({
    model: App.Models.Gif,
    url: function() {
        return "http://api.giphy.com/v1/gifs/search?q=" + this.query + "&api_key=d03c2f2de6e44daf9696172a4a0b546d&limit=36";
    },
    parse: function(ret) {
        var res = ret.data;
        return res;
    },

    fetch: function(options) {
        this.query = options.query ? options.query : '';

        return Backbone.Collection.prototype.fetch.call(this, options);
    },
})