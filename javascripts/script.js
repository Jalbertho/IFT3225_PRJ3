$(document).ready(function(){
  app.run("#/");

  
  // ----------- Event Functions ----------- //
  // TODO: onClick pour la nav (nice to have)

  $(document).on('click', '#btn-login', function() {
    // Récupère le privilège du username et l'enregistre dans le sessionStorage sous la forme de
    // [{'username': '<username>', 'priviledge': '<priviledge>'}].
    // Si le mot de passe et/ou le username n'est pas bon, le sessionStorage est supprimé.

    $.ajax({
      type: 'GET',
      url: "https://www-ens.iro.umontreal.ca/~jalbertk/fyWdSJ8v/PRJ3/App/login/"+$("#name").val()+"/"+$("#pwd").val(),
      async: false,
      dataType: "json",
      success: function(data) {
        // Set up session's data.
        if(data.length == 1) {
          sessionStorage.setItem('username', $("#name").val());
          // le privilège READ est pour un simple utilisateur et WRITE pour l'admin.
          sessionStorage.setItem('priviledge', data[0]['PRIVILEDGE']);
        } else {
          sessionStorage.clear(); // Deletes all sessionStorage.
        }

        // TODO.. add a popup ?

      },
      error: function(XMLHttpRequest, status, err) {
        console.log("An Error Has Occur.");
        console.log(err);
      }
    });

    // TODO.. use for debug.
    console.log(sessionStorage.getItem('username'));
    console.log(sessionStorage.getItem('priviledge'));
  });
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

    $.ajax({
      type: 'GET',
      url: "https://www-ens.iro.umontreal.ca/~jalbertk/fyWdSJ8v/PRJ3/App/login/"+this.params['username'])+"/"+this.params['pwd']),
      async: false,
      dataType: "json",
      success: function(data) {
        console.log("hello " + this.params['username']);

        // Set up session's data.
        if(data.length == 1) {
          sessionStorage.setItem('username', this.params['username']);
          // le privilège READ est pour un simple utilisateur et WRITE pour l'admin.
          sessionStorage.setItem('priviledge', data[0]['PRIVILEDGE']);
        } else {
          sessionStorage.clear(); // Deletes all sessionStorage.
        }

        // TODO.. add a popup ?

      },
      error: function(XMLHttpRequest, status, err) {
        console.log("An Error Has Occur.");
        console.log(err);
      }
    });
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
    if (sessionStorage.getItem('priviledge') == 'WRITE') {
      console.log("you're in");
    }else{
      context.render('templates/forbidden.template').appendTo(context.$element());
    }

  });

  this.post('#/delete', function(context) {
    var result = null;
    $.ajax({
      url: "https://www-ens.iro.umontreal.ca/~jalbertk/fyWdSJ8v/PRJ3/App/delete/"+$("#name").val(),
      type : "POST",
      dataType : 'json',
      success : function(data) {
      result = data;
      },
      error: function(xhr, resp, text) {
      console.log(xhr, resp, text);
      }
    }); // ajax
    return result;
 });

  // TODO.. add un Plot.

  // TODO.. add un Doc.
});