$(document).ready(function(){
  app.run("#/");

  
  // ----------- Event Functions ----------- //
  $(document).on('click', '#login', function(){
    $.ajax({
      type: 'GET',
      url: "https://www-ens.iro.umontreal.ca/~jalbertk/fyWdSJ8v/PRJ3/IFT3225_PRJ3/login/"+$("#name").val()+"/"+$("#pwd").val(),
      async: false,
      dataType: "json",
      success: function(data){
        console.log(data);

        // Set up session's data.
        sessionStorage.setItem('username', $("#name").val());
        sessionStorage.setItem('priviledge', data.length == 1 ? data[0]['PRIVILEDGE'] : 'NONE');
      },
      error: function(XMLHttpRequest, status, err){
        console.log("An Error Has Occur.");
        console.log(err);
        console.log(XMLHttpRequest);
      }
    });

    // TODO.. put login info into session.
  });
});

var getBrasseries = function(){
  var result = null;
  $.ajax({
    type: 'GET',
    url: "https://www-ens.iro.umontreal.ca/~jalbertk/fyWdSJ8v/PRJ3/IFT3225_PRJ3/all",
    async: false,
    dataType: "json",
    success: function(data){
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

/*var add = function() {
  $("#add").click(function(){
    console.log("click!");
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
  });
}*/

var app = $.sammy('#main', function() {
  this.use('Template');

  // TODO.. LOGIN
  /*this.bind('login', data, function(){
    console.log(data);

    $("#login").click(function(){
      console.log("click!");
      console.log($("#name").val());
      console.log($("#pwd").val());
    });

    this.trigger('login', {name: $("#name").val(), pwd: "password" });

  });*/

  // ----------- Routing ----------- //
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
    // this.partial('templates/login.template');

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

  // TODO.. this is a POST.
  /*this.post('#/add', function(context) {
    context.app.swap('');
    context.render('templates/add.template').appendTo(context.$element());
  });*/

  // TODO.. add un DEL.

  /*this.bind('run', function() {
    // initialize the cart display
    this.trigger('update-cart');
  });*/

});