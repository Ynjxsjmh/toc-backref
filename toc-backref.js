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
        var tocUl = $('<ul class="toc-body"></ul>');
        var tocIdPrefix = "toc";
        var content = $(contentSelector), tocId, hId, hText, tocLi, tocRef, tocBackRef;
        var hList = content.find(hTagsArr.join(','));

        hList.each(function (index) {
            tocId = tocIdPrefix + index;
            tocBackRef = $("<a class='toc-backref p-1' href='#{0}' rel='nofollow' target='_self'></a>".format(tocId));
            $(this).append(tocBackRef);

            hText = $(this).text();
            hId = "#"+$(this).prop('id');
            tocRef = $('<a class="reference internal" id="{0}" href="{1}">{2}</a>'.format(tocId, hId, hText));
            tocLi = $('<li></li>').append(tocRef);
            tocUl.append(tocLi);
        });

        $(contentSelector).before(tocUl);

        return true;
    };

    $.extend({ generateToc });

})($);
