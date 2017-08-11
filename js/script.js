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
    defaultSearch = "Linux";
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
    var mainimage;
    results.query.pages.sort(function(a,b){
        var first = parseInt(a.index,10);
        var second = parseInt(b.index,10);
        return first-second;
    });
    $.each(results.query.pages,function(index,obj){
        mainimage="https://upload.wikimedia.org/wikipedia/commons/6/6d/No_image.png";
        var shove = "";
        if (obj.hasOwnProperty('thumbnail')) {
            mainimage=obj.thumbnail.source;
            shove = "shove";
        }
        resultList += '<a href="'+obj.canonicalurl+'" target="_blank"><li><div class="resultHead"><div class="wikiimage ib"><img src="' +mainimage+ '" /></div><div class="name ib">' + obj.title + '</div></div><div class="blurb ' + shove + '">' + obj.extract + '</div></li></a>';

    });
    console.log('title ' + JSON.stringify(results, null, '\t'));
    
    $('#main').html('<ul>'+resultList+'</ul>');
}

function ajaxErr(err) {
    console.log("Error! Apparently " + JSON.stringify(err));
}

$(document).ready(function() {
    var terms = "";
$('#searchbtn').click(function(){
    event.preventDefault();
    console.log("Accepted " + $( "#searchterms" ).val() + " as input.");
    sObj.data.gsrsearch = $( "#searchterms" ).val()||defaultSearch;
    console.log("Searching with object:" + JSON.stringify(sObj));
    wikiSearch(sObj);
});
});
//wikiSearch(sObj);