/*
XiamiJS v1
A pure javascript library to get music of xiami.com
@homeii http://homeii.info
*/
function getXiami(id,cb){
  jQuery.ajax({
    type: "GET",
    cache: false,
    dataType: 'jsonp',
    jsonp: 'callback',
    async: false,
    url: 'http://www.xiami.com/song/playlist/id/' + id + '/object_name/collect/object_id/' + id + '/cat/json?_ksTS=1',
    success: function(data) {
      var ret = data.data.trackList[0];
      var sstr = ret.location;
      var head = sstr[0];
      var sstr = sstr.substr(1);
      var rows = head;
      var cols = Math.floor(sstr.length/rows+1);
      var out="";
      var full_row = sstr.length%head;
      for(var c = 0; c < cols; c++){
            for(var r = 0; r < rows; r ++){
                if(r<full_row){
                    var char = sstr[r*cols+c];
                }else{
                    var char = sstr[cols*full_row+(r-full_row)*(cols-1)+c];
          }
          if(typeof(char)!="undefined"){out=out+char;}
            }
        }
        var regexp = new RegExp('%5E','g');
        var out = out.replace(regexp,'0');
        var out = unescape(out);
      var out = out.replace('tp%3','');
      ret.url = out;

      console.log(out.substr(0, 7));
      if(out.substr(0, 7) != "http://"){
        console.warn('XiamiJS loadMusic error.Reloading...');
        getXiami(id,cb);
      }else{
        if(out.indexOf('null')==out.length-4){
          console.debug('XiamiJS loadMusic success');
          cb(ret);
        }else{
          console.warn('XiamiJS loadMusic error.Reloading...');
          var b = new RegExp('null(.*)');
          out = out.replace(b,'null');
          console.debug('XiamiJS loadMusic success');
          ret.url = out;
          cb(ret);
        }
      }
    },
    error: function(xhr, textStatus, errorThrown) {
      throw new Error('XiamiJS loadMusic faild');
      cb(false);
    }
  });
}
