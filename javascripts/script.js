$(document).ready(function(){
  app.run("#/");

  // ---------- Events Handler ---------- //
  onClick("login");
  onClick("table");
  onClick("plot");
  onClick("doc");

});

var onClick = function(page){
  $("#nav-"+page).click(function(){
    window.location.replace("https://www-ens.iro.umontreal.ca/~jalbertk/fyWdSJ8v/PRJ3/App/index.html#/"+page);
  });
}

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

// Le code de la fonction drawPlot provient des notes de cours de IFT3225-H22 (D3.pdf)
// en lien avec le tutoriel scatter.html.
var drawPlot = function() {

  var width = 800;
  var height = 600;

  var margin = {
    top: 20,
    right: 30,
    bottom: 30,
    left: 40
  };

  var data = getBrasseries();
  data.splice(50);

  // TODO.. review le d3.extent pour qu'on puisse voir plus épurément les données
  var x = d3.scaleLinear()
              .domain(d3.extent(data, d => d.longitude )).nice()
              .range([margin.left, width - margin.right]);

  var y = d3.scaleLinear()
              .domain(d3.extent(data, d => d.latitude )).nice()
              .range([height - margin.bottom, margin.top]);

  var xAxis = g => g
                .attr("transform", `translate(0,${height - margin.bottom})`)
                .call(d3.axisBottom(x))
                .call(g => g.select(".domain").remove())
                .call(g => g.append("text")
                            .attr("x", width - margin.right)
                            .attr("y", -4)
                            .attr("fill", "#000")
                            .attr("font-weight", "bold")
                            .attr("text-anchor", "end")
                            .text('Longitude'));

  var yAxis = g => g
                .attr("transform", `translate(${margin.left},0)`)
                .call(d3.axisLeft(y))
                .call(g => g.select(".domain").remove())
                .call(g => g.select(".tick:last-of-type text").clone()
                            .attr("x", 4)
                            .attr("text-anchor", "start")
                            .attr("font-weight", "bold")
                            .text('Latitude'));

  var grid = g => g
                .attr("stroke", "currentColor")
                .attr("stroke-opacity", 0.1)
                .call(g => g.append("g")
                            .selectAll("line")
                            .data(x.ticks())
                            .join("line")
                            .attr("x1", d => 0.5 + x(d))
                            .attr("x2", d => 0.5 + x(d))
                            .attr("y1", margin.top )
                            .attr("y2", height - margin.bottom ))
                            .call(g => g.append("g")
                                        .selectAll("line")
                                        .data(y.ticks())
                                        .join("line")
                                        .attr("y1", d => 0.5 + y(d))
                                        .attr("y2", d => 0.5 + y(d))
                                        .attr("x1", margin.left )
                                        .attr("x2", width - margin.right));

   var svg = d3.select("#plot")
                .append("svg")
                .attr("width", width )
                .attr("height", height);

   svg.append("g").call(xAxis);
   svg.append("g").call(yAxis);
   svg.append("g").call(grid);

   svg.append("g")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("fill", "none")
        .selectAll("circle")
        .data(data)
        .join("circle")
        .attr("cx", d => x(d.longitude))
        .attr("cy", d => y(d.latitude))
        .attr("r", 3);

   svg.append("g")
        .attr("font-family", "sans-serif")
        .attr("font-size", 5)
        .attr("fill", "steelblue")
        .selectAll("text")
        .data(data)
        .join("text")
        .attr("dy", "0.35em")
        .attr("x", d => x(d.longitude) + 7)
        .attr("y", d => y(d.latitude))
        .text(d => d.name)
        .on("mouseover", function(){
            d3.select(this)
              .style("font-weight", "bold")
              .style("fill", "black")
              .style("font-size", "10");
          })
        .on("mouseout", function(){
            d3.select(this)
              .style("font-weight", "normal")
              .style("fill", "steelblue")
              .style("font-size", "5");
          });
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
    $("#main").append('<table id="first" class="display">\
      <thead>\
        <tr>\
          <th>Nom de la brasserie</th>\
          <th>Nom légal</th>\
          <th>Autre nom</th>\
          <th>Adresse</th>\
          <th>Ville</th>\
          <th>Code Postal</th>\
          <th>Province</th>\
          <th>Pays</th>\
          <th>Longitude</th>\
          <th>Latitude</th>\
          <th>Numéro de Téléphone</th>\
          <th>Courriel</th>\
          <th>Année de Fondation</th>\
          <th>Région Administrative</th>\
          <th>Membre AMBQ</th>\
          <th>Numéro de Permis</th>\
          <th>Brasse sous le Permis</th>\
          <th>Type de Permis</th>\
          <th>Site Internet</th>\
          <th>Facebook</th>\
          <th>Instagram</th>\
          <th>RateBeer</th>\
          <th>AuMenu</th>\
          <th>Untappd</th>\
          <th>Pinterest</th>\
          <th>Snapchat</th>\
          <th>Twitter</th>\
          <th>Youtube</th>\
          <th>Wikidata</th>\
          <th>Autre</th>\
          <th>Notes</th>\
        </tr>\
      </thead>\
    </table>');

    $.ajax({
      type: 'GET',
      url: "https://www-ens.iro.umontreal.ca/~jalbertk/fyWdSJ8v/PRJ3/App/all",
      async: false,
      dataType: "json",
      success: function(data) {
        $("#first").DataTable({
            "aaData": data,
            "columns": [
              {"data": 'name'},
              {"data": 'legalName'},
              {"data": 'otherName'},
              {"data": 'address'},
              {"data": 'city'},
              {"data": 'postalCode'},
              {"data": 'province'},
              {"data": 'country'},
              {"data": 'longitude'},
              {"data": 'latitude'},
              {"data": 'phone'},
              {"data": 'email'},
              {"data": 'yearFondation'},
              {"data": 'adminRegion'},
              {"data": 'isAMBQMember'},
              {"data": 'numPermit'},
              {"data": 'brasseUnderPermit'},
              {"data": 'typePermit'},
              {"data": 'webSite'},
              {"data": 'facebook'},
              {"data": 'instagram'},
              {"data": 'ratebeer'},
              {"data": 'auMenu'},
              {"data": 'untappd'},
              {"data": 'pinterest'},
              {"data": 'snapchat'},
              {"data": 'twitter'},
              {"data": 'youtube'},
              {"data": 'wikidata'},
              {"data": 'autre'},
              {"data": 'notes'}
            ]
          });
      },
      error: function(XMLHttpRequest, status, err) {
        console.log("An Error Has Occur.");
        console.log(err);
      }
    });
  });

  this.get('#/add', function(context) {
    context.app.swap('');
    if(sessionStorage.getItem('priviledge') == 'WRITE'){
      context.render('templates/add.template').appendTo(context.$element());
    }else{
      context.render('templates/forbidden.template').appendTo(context.$element());
    }
  });

  this.post('#/add', function(context) {
    $.ajax({
      url: "https://www-ens.iro.umontreal.ca/~jalbertk/fyWdSJ8v/PRJ3/App/add/"+JSON.stringify(this.params),
      type : "POST",
      dataType : 'json',
      success : function(response) {
        alert(response["message"]);
      },
      error: function(xhr, resp, text) {
        alert("Brasserie "+this.params["name"]+" has not been added.");
        console.log(xhr, resp, text);
      }
    });
 });

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
        alert("Brasserie "+this.params["name"]+" could not have been deleted.");
        alert(response["message"]);
        console.log(xhr, resp, text);
      }
    });
  });

  this.get("#/plot", function(context){
    context.app.swap('');

    if (sessionStorage.getItem('priviledge')) {
      $("#main").append('<div id="plot" class="row justify-content-center">');
      drawPlot();
    }else{
      context.render('templates/forbidden.template').appendTo(context.$element());
    }

  });

  this.get("#/doc", function(context){
    context.app.swap('');
  });

});