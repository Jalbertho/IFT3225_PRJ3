var app = $.sammy('#main', function() {
    this.use('Template');
    this.use('Session');

    this.around(function(callback) {
      var context = this;
      $.ajax({
        type: 'GET',
        url: "https://www-ens.iro.umontreal.ca/~jalbertk/fyWdSJ8v/PRJ3/IFT3225_PRJ3/all",
        async: false,
        dataType: "jsonp",
        success: function(data){
          console.log(data);
          context = data;
        },
        error: function(XMLHttpRequest, status, err){
          console.log("An Error Has Occur.");
          console.log(err);
          console.log(XMLHttpRequest);
        }
      });
      // this.load('data/items.json')
      //     .then(function(items) {
      //       context.items = items;
      //     })
      //     .then(callback);
    });

    this.get('#/', function(context) {
      /*context.app.swap('');
      $.each(this.items, function(i, item) {
        context.render('templates/item.template', {id: i, item: item})
               .appendTo(context.$element());
      });*/
    });

    /*this.get('#/item/:id', function(context) {
      this.item = this.items[this.params['id']];
      if (!this.item) { return this.notFound(); }
      this.partial('templates/item_detail.template');
    });*/

    // ajout felipe
    /*this.get('#/cart', function(context) {
      context.app.swap('');

      // probablement moyen d'utiliser renderEach ... 
      context.$element().append("<table>");

      $.each(this.session('cart') || {}, function(id, quantity) {
        var item = context.items[id];

         context.render('templates/cart.template',
          {id: id, title: item.title,
          artist: item.artist, image : item.image,
          quantity: quantity}).
        appendTo(context.$element());
      });
  
     context.$element().append("</table>");
    }); // get*/
      
    /*this.post('#/cart', function(context) {
      var item_id = this.params['item_id'];
      // fetch the current cart
      var cart  = this.session('cart', function() {
        return {};
      });
      if (!cart[item_id]) {
        // this item is not yet in our cart
        // initialize its quantity with 0
        cart[item_id] = 0;
      }
      cart[item_id] += parseInt(this.params['quantity'], 10);
      // store the cart
      this.session('cart', cart);
      this.trigger('update-cart');
    });*/

    /*this.bind('update-cart', function() {
      var sum = 0;
      $.each(this.session('cart') || {}, function(id, quantity) {
        sum += quantity;
      });
      $('.cart-info')
          .find('.cart-items').text(sum).end()
          .animate({paddingTop: '30px'})
          .animate({paddingTop: '10px'});
    });*/

    // TODO.. https://www-ens.iro.umontreal.ca/~jalbertk/fyWdSJ8v/PRJ3/IFT3225_PRJ3/index.html#/table
    this.get('#/table', function() {
      alert("blip");

      // $('#table').DataTable();
      // var result = null;

      // $.ajax({
      //   type: 'GET',
      //   url: "https://www-ens.iro.umontreal.ca/~jalbertk/fyWdSJ8v/PRJ3/IFT3225_PRJ3/all",
      //   async: false,
      //   dataType: "jsonp",
      //   success: function(data){
      //     console.log(data);
      //     result = data;
      //   },
      //   error: function(XMLHttpRequest, status, err){
      //     console.log("An Error Has Occur.");
      //     console.log(err);
      //     console.log(XMLHttpRequest);
      //   }
      // });

      // TODO.. debugging
      // $.each(result, function(index, elem){
      //   console.log(elem);
      // });

      // TODO.. create table with data 

    });

    this.bind('run', function() {
      // initialize the cart display
      this.trigger('update-cart');
    });

  });

$(document).ready(function(){
  app.run('#/');
});