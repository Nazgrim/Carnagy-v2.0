'use strict';

class SidebarCtrl {
    constructor($scope) {
        $(function() {
            $('#sidebar-menu li ul').slideUp();
            $('#sidebar-menu li').removeClass('active');

            $('#sidebar-menu li').on('click', function() {
                var link = $('a', this).attr('href');

                if (link) {
                    window.location.href = link;
                } else {
                    if ($(this).is('.active')) {
                        $(this).removeClass('active');
                        $('ul', this).slideUp();
                    } else {
                        $('#sidebar-menu li').removeClass('active');
                        $('#sidebar-menu li ul').slideUp();

                        $(this).addClass('active');
                        $('ul', this).slideDown();
                    }
                }
            });

            $('#menu_toggle').click(function() {
                if ($('body').hasClass('nav-md')) {
                    $('body').removeClass('nav-md').addClass('nav-sm');
                    $('.left_col').removeClass('scroll-view').removeAttr('style');
                    $('.sidebar-footer').hide();

                    if ($('#sidebar-menu li').hasClass('active')) {
                        $('#sidebar-menu li.active').addClass('active-sm').removeClass('active');
                    }
                } else {
                    $('body').removeClass('nav-sm').addClass('nav-md');
                    $('.sidebar-footer').show();

                    if ($('#sidebar-menu li').hasClass('active-sm')) {
                        $('#sidebar-menu li.active-sm').addClass('active').removeClass('active-sm');
                    }
                }
            });
        });
    }
}

SidebarCtrl.$inject = ['$scope'];

export default SidebarCtrl;
