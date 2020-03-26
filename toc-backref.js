(($) => {
     String.prototype.format = function() {
         var formatted = this;
         for (var i = 0; i < arguments.length; i++) {
             var regexp = new RegExp('\\{'+i+'\\}', 'gi');
             formatted = formatted.replace(regexp, arguments[i]);
         }
         return formatted;
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

        $(contentSelector).before(tocUl);

        return true;
    };

    $.extend({ generateToc });

})($);
