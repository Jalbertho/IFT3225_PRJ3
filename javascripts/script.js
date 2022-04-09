$(document).ready(function(){
  app.run('#/');
});

var getBrasseries = function(){
  var result = null;
  $.ajax({
    type: 'GET',
    url: "https://www-ens.iro.umontreal.ca/~jalbertk/fyWdSJ8v/PRJ3/IFT3225_PRJ3/all",
    async: false,
    dataType: "json",
    success: function(data){
      console.log(data);
      result = data;
    },
    error: function(XMLHttpRequest, status, err){
      console.log("An Error Has Occur.");
      console.log(err);
      console.log(XMLHttpRequest);
    }
  });

  console.log("Brasseries");
  console.log(result);

  return result;
}

var app = $.sammy('#main', function() {
  this.use('Template');
  this.use('Session');

  /*this.around(function(callback) {
    var context = this;
    console.log("AROUND");
    $.ajax({
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
  });*/

  this.get('#/', function(context) {
    console.log("#/");
    context.app.swap('');
    /*$.each(this.items, function(i, item) {
      context.render('templates/item.template', {id: i, item: item})
             .appendTo(context.$element());
    });*/
  });

  // TODO.. https://www-ens.iro.umontreal.ca/~jalbertk/fyWdSJ8v/PRJ3/IFT3225_PRJ3/index.html#/table
  this.get('#/table', function(context) {
    console.log("#/TABLE");
    // TODO.. this is not run ://
    var result = getBrasseries();
    context.app.swap('');

    // TODO.. check how to get le data de getBrasseries
    console.log("Testing");
    console.log(result);
    
    context.$element().append("<table>");
    context.render('templates/headerTable.template').appentTo(context.$element());
    /*$.each(, function(index, elem){
      context.render('templates/itemTable.template', 
      {
        name:
        legalName:
        otherName:
        address:
        city:
        postalCode:
        province:
        country:
        longitude:
        latitude:
        phone:
        email:
        yearFondation:
        adminRegion:
        isAMBQMember:
        numPermit:
        brasseUnderPermit:
        typePermit:
        webSite:
        facebook:
        instagram:
        ratebeer:
        auMenu:
        untappd:
        pinterest:
        snapchat:
        twitter:
        youtube:
        wikidata:
        autre:
        notes:
      }).appentTo(context.$element());
    });*/
    context.$element().append("</table>");

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