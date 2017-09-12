/*jslint devel:true */
/*global $, jQuery*/

/*
    Mister Wiki, the Wikipedia search page

/*
*/
var endPoint = "https://en.wikipedia.org/w/api.php?",
    actionProp = "query",
    srsearchProp = "",
    listProp = "search",
    defaultSearch = "Linux",
    tmpl = $.templates("#listTemplate");
    
    /*
    sObj = new (function () {
        "use strict";
        this.url = endPoint;
        this.dataType= 'json';
        this.success = processResults;
        this.error = ajaxErr;
        this.data = {
            action: actionProp,
            list: listProp,
            srsearch: srsearchProp,
            srprop: 'wordcount|snippet',
            format: 'json',
            origin: '*',
            formatversion: 2,
    }
    })();
    */
sObj = new (function () {
        "use strict";
        this.url = endPoint;
        this.dataType= 'json';
        this.success = processResults;
        this.error = ajaxErr;
        this.data = {
            action: actionProp,
            prop: 'extracts|info|pageimages',
            inprop: 'url',
            pithumbsize: 100,
            generator: 'search',
            gsrsearch: srsearchProp,
            exintro: 'true',
            exsentences: 2,
            format: 'json',
            origin: '*',
            formatversion: 2,
    }
    })();

function wikiSearch(sObj) {
    "use strict";
    console.log("Start wikiSearch");
    $.ajax(sObj);
}

function processResults(results) {
    "use strict";
    var resultList = "";
    var mainimage="";
    results.query.pages.sort(function(a,b){
        var first = parseInt(a.index,10);
        var second = parseInt(b.index,10);
        return first-second;
    });



    $.each(results.query.pages,function(index,obj){
        if (!obj.hasOwnProperty('thumbnail')) {
            console.log("No image. Setting default.\n");
            console.log(JSON.stringify(obj, null, '\t'));
            obj["thumbnail"] = {};
            console.log(JSON.stringify(obj, null, '\t'));
            obj.thumbnail["source"]="data/Noimage.svg";
            obj.thumbnail["width"]=50;
        }
        resultList += tmpl.render(obj);

    });
   console.log('-------RESULTS-------\n ' + JSON.stringify(results, null, '\t'));
    
    $('#main').html('<ul>'+resultList+'</ul>');
}

function ajaxErr(err) {
    console.log("Error! Apparently " + JSON.stringify(err));
}

$(document).ready(function() {
    var terms = "";
$('#searchbtn').click(function(evt){
    evt.preventDefault();
    console.log("Accepted " + $( "#searchterms" ).val() + " as input.");
    sObj.data.gsrsearch = $( "#searchterms" ).val()||defaultSearch;
    console.log("Searching with object:" + JSON.stringify(sObj));
    wikiSearch(sObj);
});
$('#randomButton').click(function(evt){
    
});
});
//wikiSearch(sObj);