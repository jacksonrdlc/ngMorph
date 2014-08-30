angular.module('morph.transitions')
.factory('Modal', [ function () {
  return function (elements, settings) {
    var enter = {
      wrapper: function (element, settings) {
        var ContentBoundingRect = settings.ContentBoundingRect;

        element.css({
          'z-index': 1900,
          'opacity': 1,
          'visibility': 'visible',
          'pointer-events': 'auto',
          'top': '50%',
          'left': '50%',
          'width': ContentBoundingRect.width + 'px',
          'height': ContentBoundingRect.height + 'px', 
          'margin': '-' + ( ContentBoundingRect.height / 2 ) + 'px 0 0 -' + ( ContentBoundingRect.width / 2 ) + 'px',
          '-webkit-transition': 'width 0.4s 0.1s, height 0.4s 0.1s, top 0.4s 0.1s, left 0.4s 0.1s, margin 0.4s 0.1s',
          'transition': 'width 0.4s 0.1s, height 0.4s 0.1s, top 0.4s 0.1s, left 0.4s 0.1s, margin 0.4s 0.1s'
        });
        
      },
      content: function (element, settings) {
        element.css({
          'transition': 'opacity 0.3s 0.4s ease',
          'visibility': 'visible',
          'opacity': '1'
        });
      },
      morphable: function (element, settings) {
        element.css({
          'z-index': 2000,
          'opacity': 0,
          '-webkit-transition': 'opacity 0.1s',
          'transition': 'opacity 0.1s',
        });
      },
    };

    var exit = {
      wrapper: function (element, settings) {
        var MorphableBoundingRect = settings.MorphableBoundingRect;
        
        element.css({
          'position': 'fixed',
          'z-index': '900',
          'opacity': '0',
          'margin': 0,
          'top': MorphableBoundingRect.top + 'px',
          'left': MorphableBoundingRect.left + 'px',
          'width': MorphableBoundingRect.width + 'px', 
          'height': MorphableBoundingRect.height + 'px',
          'pointer-events': 'none',
          '-webkit-transition': 'opacity 0.3s 0.5s, width 0.35s 0.1s, height 0.35s 0.1s, top 0.35s 0.1s, left 0.35s 0.1s, margin 0.35s 0.1s',
          'transition': 'opacity 0.3s 0.5s, width 0.35s 0.1s, height 0.35s 0.1s, top 0.35s 0.1s, left 0.35s 0.1s, margin 0.35s 0.1s'
        });
      },
      content: function (element, settings) {
        element.css({
          'transition': 'opacity 0.3s 0.4s ease',
          'height': '0',
          'opacity': '0'
        });

        setTimeout( function () {
          element.css({'visibility': 'hidden'});
        }, 100);

      },
      morphable: function (element, settings) {
        element.css({
          'z-index': 900,
          'opacity': 1,
          '-webkit-transition': 'opacity 0.1s 0.4s',
          'transition': 'opacity 0.1s 0.4s',
        });
      },
    };

    return {

      toggle: function (isMorphed) {
        if ( !isMorphed ) {
          elements.wrapper.css({
            transition: 'none', // remove any transitions to prevent the relocation from being delayed.
            top: settings.MorphableBoundingRect.top + 'px',
            left: settings.MorphableBoundingRect.left + 'px'
          });

          // wrap in timeout to allow relocation to finish. transition styles are added too soon without this.
          setTimeout( function () {
            angular.forEach(elements, function (element, elementName) {
              enter[elementName](element, settings);
            });
          }, 25 );
        } else {
          angular.forEach(elements, function (element, elementName) {
            exit[elementName](element, settings);
          });
        }

        return !isMorphed;
      }
    };
  };
}]);
