    window.addEventListener('scroll', function() {
    var navbar = document.getElementById('navbar');
    var workpage = document.getElementById('workpage');
    var screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

    if (screenWidth > 980) {     

        if (window.scrollY > 500 || document.documentElement.scrollTop > 500) {
            workpage.style.opacity = '1'; 
        } else {
            workpage.style.opacity = '0';
        } } });
