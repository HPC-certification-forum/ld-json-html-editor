var ldJSON = {
  appendSection : function(data){
    return "<h2>Test</h2>";
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
