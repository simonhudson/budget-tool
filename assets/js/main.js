/*---------------------------------------------------------------------------------------------------------------------------------------
Has HS
*/
var hasJs = function() {
  const $html = document.querySelector('html');
  $html.classList.add('has-js');
};
window.onload = hasJs();

/*---------------------------------------------------------------------------------------------------------------------------------------
Tabs
*/
function tabs() {

	var tabContent 					= document.querySelectorAll('.js-tab-content');
	var tabLinks 						= document.querySelectorAll('.js-tab-link');

	var linkActiveClass 		= 'active';
	var contentActiveClass 	= 'current';

	for (var i=0; i < tabLinks.length; i++) {

		tabLinks[i].addEventListener('click', function(e) {

      var clickedTab = this;
			var tabId = clickedTab.getAttribute('data-tab');

			for (var x=0; x < tabContent.length; x++) {
				if (tabContent[x].getAttribute('id') !== tabId)
					tabContent[x].classList.remove(contentActiveClass);
				else
					tabContent[x].classList.add(contentActiveClass);
			}

			for (var z=0; z < tabLinks.length; z++) {
        tabLinks[z].classList.remove(linkActiveClass);
      }

      clickedTab.classList.add(linkActiveClass);

			e.preventDefault();

		});
	}

}
window.onload = tabs();
