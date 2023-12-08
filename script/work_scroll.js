    window.addEventListener('scroll', function() {
    var content = document.getElementById('content');
    var screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

    if (screenWidth > 980) {      

        if (window.scrollY > 800 || document.documentElement.scrollTop > 800) {
            content.style.opacity = '1'; 
        } else {
            content.style.opacity = '0';
        }
        } 
        });
