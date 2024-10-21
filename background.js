$(document).ready(function() {
    // Dropdown hover handling
    const handleDropdownHover = function() {
        if (window.innerWidth > 768) {
            $(this).find('.dropdown-menu').first().stop(true, true).slideDown();
        }
    };

    const handleDropdownHoverOut = function() {
        if (window.innerWidth > 768) {
            $(this).find('.dropdown-menu').first().stop(true, true).slideUp();
        }
    };

    $('.nav-item.dropdown').hover(handleDropdownHover, handleDropdownHoverOut);
    $('.dropdown-submenu').hover(handleDropdownHover, handleDropdownHoverOut);

    // Prevent dropdown from closing on click inside
    $('.dropdown-menu').click(function(e) {
        e.stopPropagation();
    });

    // Fade effect on page load and link click
    const elementsToFade = document.querySelectorAll('.fade');

    // Apply fade-in on page load
    setTimeout(function() {
        elementsToFade.forEach(el => el.classList.add('visible'));
    }, 10);

    // Handle fade-out on link click
    $("a").click(function(event) {
        if (this.target === "_blank") {
            return;
        }

        event.preventDefault();
        var linkLocation = this.href;
        elementsToFade.forEach(el => el.classList.remove('visible'));
        elementsToFade.forEach(el => el.classList.add('fade-out'));

        setTimeout(function() {
            window.location = linkLocation;
        }, 1000); // Adjust the delay to match the fade-out duration
    });
});
