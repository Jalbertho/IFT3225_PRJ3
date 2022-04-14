$(document).ready(function(){
  app.run("#/");
});

var getBrasseries = function() {
  var result = null;
  $.ajax({
    type: 'GET',
    url: "https://www-ens.iro.umontreal.ca/~jalbertk/fyWdSJ8v/PRJ3/App/all",
    async: false,
    dataType: "json",
    success: function(data) {
      result = data;
    },
    error: function(XMLHttpRequest, status, err) {
      console.log("An Error Has Occur.");
      console.log(err);
    }
  });

  return result;
}

var app = $.sammy('#main', function() {
  this.use('Template');

  // ----------- Routing ----------- //
  // Access the site with this URL : https://www-ens.iro.umontreal.ca/~jalbertk/fyWdSJ8v/PRJ3/App/index.html#/

  this.get('#/', function(context) {
    context.app.swap('');
  });

  this.get('#/login', function(context) {
    context.app.swap('');
    context.render('templates/login.template').appendTo(context.$element());
  });

  this.post('#/login', function(){
    console.log("LOGIN::POST");
    
    var result = null;

    $.ajax({
      type: 'GET',
      url: "https://www-ens.iro.umontreal.ca/~jalbertk/fyWdSJ8v/PRJ3/App/login/"+this.params['username']+"/"+this.params['pwd'],
      async: false,
      dataType: "json",
      success: function(data) {
        result = data;
      },
      error: function(XMLHttpRequest, status, err) {
        console.log("An Error Has Occur.");
        console.log(err);
      }
    });

    // Set up session's data.
    if(result.length == 1) {
      sessionStorage.setItem('username', this.params['username']);
      // le privilège READ est pour un simple utilisateur et WRITE pour l'admin.
      sessionStorage.setItem('priviledge', result[0]['PRIVILEDGE']);

      // Popup.
      alert("Bienvenue " + this.params['username'] + "!");

    } else {
      sessionStorage.clear(); // Deletes all sessionStorage.

      // Popup.
      alert("Mauvaises informations d'identification, veuillez vous reconnecter");
    }

  });

  this.get('#/table', function(context) {
    context.app.swap('');
    
    var result = getBrasseries();

    $("#main").append('<table id="first">');
    context.render('templates/headerTable.template').appendTo("table");
    $.each(result, function(index, elem) {
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
    // context.$element().append("</table>"); // TODO.. review this.

    // TODO.. review DataTable.
    $('#first').DataTable();
  });

  // TODO..
  this.get('#/add', function(context) {
    context.app.swap('');
    if(sessionStorage.getItem('priviledge') == 'WRITE'){
      console.log("Hurray!");
    }else{
      context.render('templates/forbidden.template').appendTo(context.$element());
    }
  });

  /*this.post('#/add', function(context) {
    var result = null;
    $.ajax({
      url: "https://www-ens.iro.umontreal.ca/~jalbertk/fyWdSJ8v/PRJ3/App/add"
      type : "POST",
      dataType : 'json',
      success : function(data) {
      result = data;
      },
      error: function(xhr, resp, text) {
      console.log(xhr, resp, text);
      }
    }); // ajax
    
    return result;// result
 });*/

  // TODO.. add un DEL.
  this.get('#/delete',function(context) {
    context.app.swap('');

    if (sessionStorage.getItem('priviledge') == 'WRITE') {
      context.render('templates/delete.template').appendTo(context.$element());

    }else{
      context.render('templates/forbidden.template').appendTo(context.$element());
    }

  });

  this.post('#/delete', function(context) {
    $.ajax({
      url: "https://www-ens.iro.umontreal.ca/~jalbertk/fyWdSJ8v/PRJ3/App/delete/"+this.params['name'],
      type : "POST",
      dataType : 'json',
      success : function(response) {
        alert(response["message"]);
      },
      error: function(xhr, resp, text) {
        console.log(xhr, resp, text);
      }
    });
 });

  // TODO.. add un Plot.
  this.get("#/plot", function(context){
    context.app.swap('');

    if (sessionStorage.getItem('priviledge')) {
      alert("Yaaas queen");

    }else{
      alert("loser");
    }

  });

  // TODO.. add un Doc.
});