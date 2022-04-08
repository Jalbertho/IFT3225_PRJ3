var app = $.sammy('#main', function() {
    this.use('Template');
    this.use('Session');

    this.around(function(callback) {
      var context = this;
      this.ajax({
        type: 'GET',
        url: "https://www-ens.iro.umontreal.ca/~jalbertk/fyWdSJ8v/PRJ3/IFT3225_PRJ3/all",
        async: false,
        dataType: "json",
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
    });

    this.get('#/', function(context) {
      context.app.swap('');
      /*$.each(this.items, function(i, item) {
        context.render('templates/item.template', {id: i, item: item})
               .appendTo(context.$element());
      });*/
    });

    // TODO.. https://www-ens.iro.umontreal.ca/~jalbertk/fyWdSJ8v/PRJ3/IFT3225_PRJ3/index.html#/table
    this.get('#/table', function(context) {
      // TODO.. this is not run ://
      context.app.swap('');
      console.log("hello");
      console.log(context);

      $('#table').DataTable();
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

    /*this.bind('run', function() {
      // initialize the cart display
      this.trigger('update-cart');
    });*/

  });

$(document).ready(function(){
  app.run('#/');
});