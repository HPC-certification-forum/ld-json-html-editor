var ldJSON = {
  appendType : function(type, txt){
    return "<a href='https://schema.org/" + type + "'>" + txt + "</a>";
  } ,

  appendSection : function(data){
    var str = "";
    for(key in data){
      var val = data[key];
      if (val instanceof Object){
        var link = key;
        var type = "@type" in val ? val["@type"] : "";
        if(type != ""){
          link = ldJSON.appendType(type, key + " : " + type);
          if("additionalType" in val){
            link += ", " + ldJSON.appendType(val["additionalType"], val["additionalType"]);
          }
        }
        str += "<div class='ldsection'><div class='ldhead'>" + link + "</div><div class='ldbody'>" + ldJSON.appendSection(val) + "</div></div>";
      }else if(key[0] != "@" && key != "additionalType"){
        str += key + " = ";
        str += val + "<br/>";
      }
    }

    return str;
  },

  showEditor : function(divName, schemaURL){
    var div = jQuery("#" + divName);
    if (! div.length){
      console.log("ERROR, unknown form: " + divName)
      return;
    }

    jQuery.ajax({
        url: schemaURL,
        context: document.body
      }
    ).done(function (data){
      div.append(ldJSON.appendSection(data));
    });
  }
};
