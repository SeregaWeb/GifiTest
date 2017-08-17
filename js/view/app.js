App.Views.App = Backbone.View.extend({
    initialize: function() {
        new App.Views.Gifs({ collection: App.RandomList, el: $("#app") });
    }
})

App.Views.Gifs = Backbone.View.extend({
    initialize: function() {
        this.render();
    },
    render: function() {
        this.$el.empty();

        this.collection.each(this.AddOne, this);

        $(".image_c").fadeIn(1000);
        return this;
    },

    AddOne: function(contact) {
        var singleContact = new App.Views.Gif({ model: contact });
        this.$el.append(singleContact.$el);
    }

})


App.Views.Gif = Backbone.View.extend({
    tagName: "div",
    className: "col-md-4",
    template: App.template("gif-id"),
    initialize: function() {
        this.render();
    },
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
})

App.Views.Serch = Backbone.View.extend({
    el: "#input_s",
    initialize: function() {},
    events: {
        "click": "clik",
        "input": "chenge"
    },
    chenge: function() {
        if ($("#input_s").val() == "") {
            $(".image_c").fadeOut(1000);
            var gifs = new App.Views.Gifs({ collection: App.RandomList, el: $("#app") });

            $(".image_c").fadeIn(1000);

        } else {
            this.search();
        }
    },
    search: _.debounce(function() {

        App.SerchList.fetch({ query: $("#input_s").val() }).then(function() {
            if (App.SerchList.length > 0) {
                $(".image_c").fadeOut(1000);
                new App.Views.Gifs({ collection: App.SerchList, el: $("#app") });

            } else {
                $(".image_c").fadeOut(1000);
                $("#app").empty().append("<div class='col-md-12 not_found_conteiner'><span class='not_found_span'>Not Found</span><img src='img/notFound.gif' class='not_found_img' alt=''></div>");
                $(".image_c").fadeIn(1000);
            }
        })
    }, 300)
})