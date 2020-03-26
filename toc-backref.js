(($) => {
     String.prototype.format = function() {
         var formatted = this;
         for (var i = 0; i < arguments.length; i++) {
             var regexp = new RegExp('\\{'+i+'\\}', 'gi');
             formatted = formatted.replace(regexp, arguments[i]);
         }
         return formatted;
     };

    let generateToc = (contentSelector, hTagsArr ) => {
        var toc = $('<ul class="toc-body"></ul>');
        var content = $(contentSelector), tocId, hId, text, li, tocRef, tocBackRef;
        var tocIdPrefix = "toc";
        var hList = content.find(hTagsArr.join(','));

        hList.each(function (index) {
            tocId = tocIdPrefix + index;
            tocBackRef = $("<a class='toc-backref p-1' href='#{0}' rel='nofollow' target='_self'></a>".format(tocId));
            $(this).append(tocBackRef);

            text = $(this).text();
            hId = "#"+$(this).prop('id');
            tocRef = $('<a class="reference internal" id="{0}" href="{1}">{2}</a>'.format(tocId, hId, text));
            li = $('<li></li>').append(tocRef);
            toc.append(li);
        });

        $(contentSelector).before(toc);

        return true;
    };

    $.extend({ generateToc });

})($);
