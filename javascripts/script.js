$(document).ready(function(){
  app.run();
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

  return result;
}

var login = function() {
  $("#login").click(function(){
    console.log("click!");
    console.log($("#name").val());
    console.log($("#pwd").val());
  });
}

var app = $.sammy('#main', function() {
  this.use('Template');
  this.use('Session');

  // TODO.. LOGIN
  this.bind('login', function(e, data){
    console.log(e);
    console.log(data);

  });

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
    context.app.swap('');
    /*$.each(this.items, function(i, item) {
      context.render('templates/item.template', {id: i, item: item})
             .appendTo(context.$element());
    });*/
  });

  this.get('#/login', function(context) {
    context.app.swap('');
    context.render('templates/login.template').appendTo(context.$element());

    this.trigger('login', {name: $("#name").val(), pwd: "password" });

    // $("#login").click(function(){
    //   console.log("ouuh!");
    //   console.log($("#name").val());
    //   console.log($("#pwd").val());
    // });

    /*$.each(this.items, function(i, item) {
      context.render('templates/item.template', {id: i, item: item})
             .appendTo(context.$element());
    });*/
  });

  this.get('#/', function(context) {
    context.app.swap('');
    context.render('templates/add.template').appendTo(context.$element());

    /*$.each(this.items, function(i, item) {
      context.render('templates/item.template', {id: i, item: item})
             .appendTo(context.$element());
    });*/
  });

  // TODO.. https://www-ens.iro.umontreal.ca/~jalbertk/fyWdSJ8v/PRJ3/IFT3225_PRJ3/index.html#/table
  this.get('#/table', function(context) {
    context.app.swap('');
    
    var result = getBrasseries();

    $("#main").append('<table id="first">');
    context.render('templates/headerTable.template').appendTo("table");
    $.each(result, function(index, elem){
      context.render('templates/itemTable.template', 
      {
        name: elem["name"],
        legalName: elem["legalName"],
        otherName: elem["otherName"],
        address: elem["address"],
        city: elem["city"],
        postalCode: elem["postalCode"],
        province: elem["province"],
        country: elem["country"],
        longitude: elem["longitude"],
        latitude: elem["latitude"],
        phone: elem["phone"],
        email: elem["email"],
        yearFondation: elem["yearFondation"],
        adminRegion: elem["adminRegion"],
        isAMBQMember: elem["isAMBQMember"],
        numPermit: elem["numPermit"],
        brasseUnderPermit: elem["brasseUnderPermit"],
        typePermit: elem["typePermit"],
        webSite: elem["webSite"],
        facebook: elem["facebook"],
        instagram: elem["instagram"],
        ratebeer: elem["ratebeer"],
        auMenu: elem["auMenu"],
        untappd: elem["untappd"],
        pinterest: elem["pinterest"],
        snapchat: elem["snapchat"], 
        twitter: elem["twitter"],
        youtube: elem["youtube"],
        wikidata: elem["wikidata"],
        autre: elem["autre"],
        notes: elem["notes"]
      }).appendTo("table");
    });
    context.$element().append("</table>");

    $('#first').DataTable(); // TODO.. review this.
  });

  /*this.bind('run', function() {
    // initialize the cart display
    this.trigger('update-cart');
  });*/

});