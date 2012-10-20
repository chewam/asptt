var player;

_V_("player").ready(function() {
    player = this;
});

$(function() {

    var modal = $('#modal'),
        modalLabel = $('#modalLabel');

    modal.on('hidden', function () {
        player.pause();
        player.bigPlayButton.show();
    });

    $('.link a').click(function() {
        var link = $(this);

        modalLabel.html(link.attr('data-name'));

        player.src([
            {type: 'video/mp4', src: link.attr('data-path')},
            {type: 'video/webm', src: link.attr('data-pathWebm')}
        ]);

        modal.modal('show');

    });

});
