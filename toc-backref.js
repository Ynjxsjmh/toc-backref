(($) => {
     String.prototype.format = function() {
         var formatted = this;
         for (var i = 0; i < arguments.length; i++) {
             var regexp = new RegExp('\\{'+i+'\\}', 'gi');
             formatted = formatted.replace(regexp, arguments[i]);
         }
         return formatted;
     };

  let generateBackRef = (tocUlSelector, contentSelector, hTagsArr, modest=true) => {
    var tocUl = $(tocUlSelector), tocId, tocBackRef;
    var tocIdPrefix = "toc";
    var liList = $("li", tocUl), li;
    var content = $(contentSelector);
    var hList = content.find(hTagsArr.join(',')), hId, hText, hTagName;

    hList.each(function (index) {
      tocId = tocIdPrefix + index;
      hId = $(this).prop('id');
      hText = $(this).text();

      for (var i = 0; i < liList.length; ++i) {
        li = liList.eq(i);
        var a = $(li).find('a:first');
        aId = $(a).prop('id');
        aHref = $(a).prop('href');
        aText = $(a).text();

        if (aHref == hId || aText == hText) {
          if (aId == '' || aId == null || aId == 'undefined') {
            aId = tocId;
            $(a).attr("id", aId);
          }

          if (modest) {
            tocBackRef = $("<a class='toc-backref p-1' href='#{0}' rel='nofollow' target='_self'></a>".format(aId));
          } else {
            tocBackRef = $("<a class='toc-backref p-1' href='#{0}' rel='nofollow' target='_self'>{1}</a>".format(aId, hText));
            $(this).text("");
          }

          $(this).append(tocBackRef);

          liList.splice(i, 1);
          break;
        }
      }
    });
  };

    let generateToc = ( contentSelector, hTagsArr, modest=true) => {
        var tocUl = $('<ul class="toc-body"></ul>'), tocId, tocLi, tocRef, tocBackRef;
        var tocIdPrefix = "toc";
        var content = $(contentSelector), hId, hText, hTagName;
        var hList = content.find(hTagsArr.join(','));

        hList.each(function (index) {
            tocId = tocIdPrefix + index;
            tocBackRef = $("<a class='toc-backref p-1' href='#{0}' rel='nofollow' target='_self'></a>".format(tocId));
            hText = $(this).text();

            if (modest) {
                tocBackRef = $("<a class='toc-backref p-1' href='#{0}' rel='nofollow' target='_self'></a>".format(tocId));
            } else {
                tocBackRef = $("<a class='toc-backref p-1' href='#{0}' rel='nofollow' target='_self'>{1}</a>".format(tocId, hText));
                $(this).text("");
            }

            $(this).append(tocBackRef);

            hId = $(this).prop('id');
            if (hId == undefined || hId == '' || hId == null) {
                var headingIdPrefix = "header";
                $(this).attr("id", headingIdPrefix + index);
                hId = $(this).prop('id');
            } else {
                // pass
            }

            tocRef = $('<a class="reference internal" id="{0}" href="#{1}">{2}</a>'.format(tocId, hId, hText));
            hTagName = $(this).prop('tagName').toLowerCase();
            tocLi = $('<li class="{0}_nav"></li>'.format(hTagName)).append(tocRef);
            tocUl.append(tocLi);
        });

        $(contentSelector).prepend(tocUl);

        return true;
    };

    $.extend({ generateToc, generateBackRef });

})($);
