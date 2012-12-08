var matchs = [{
    date: '14/10/12',
    name: 'ASPTT B vs DUNOIS',
    videos: ['OYyEteacd18', 'bzZ_h3gjiP4', 'sE3A0hwRCH0', 'bq65RwFocm4', '21PVUh9pOOI', 'alWo_8kI2ok']
}, {
    date: '21/10/12',
    name: 'ASPTT B vs AS RUSSE',
    videos: ['MutRRVQDkP0', 'hx9tSVP3-hs', 'KHIGHUlnaEI']
}, {
    date: '28/10/12',
    name: 'ASPTT B vs FEMINA',
    videos: ['UL6A3Oykx1M', 'SHh2IgcGYsk', 'Zpttfiuc-i4', 'kQ-BJATJ57Q', 'Q7H9cqOjQxE', 'yyWxn8m09Yc', 'kINkpir2slU']
}, {
    date: '02/11/12',
    name: 'ASPTT B vs AGEVP',
    videos: ['01uRG7G1-fw', 'Jx0YwQsK2q4', '_WBqvBPEjLo', '3B5hB1sDXpA', 'VeDYzyzwFbg']
}, {
    date: '04/11/12',
    name: 'ASPTT B vs STADE FR',
    videos: ['X0AVknWwf68', 'iLIaF-oqwr0', 'gDrzRXQmGDI', '5Ppg-5VWSoQ', 'TX4Z1Jlf7w8', '2y-wrXTdaeY']
}, {
    date: '02/12/12',
    name: 'ASPTT B vs SCUF A',
    videos: ['-1cMdkTL-U4', 'enByfuec47c', '0hgSX-2Joec', '9ec_KbWMgqI', 'XVtq2X2GScg', '1GeUOye3JyY', 'jOQH2JGyVfM', 'xZQbmBB-vG4']
}];

function MainCtrl($scope, $http) {

    $scope.createPlayer = function() {
        var tag = document.createElement('script'),
            firstScriptTag = document.getElementsByTagName('script')[0];
        
        tag.src = "//www.youtube.com/iframe_api";
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        onYouTubeIframeAPIReady = function() {
            $scope.player = new YT.Player('player', {
                height: '447',
                width: '735'
            });
        };
    };

    $scope.loadVideo = function(index) {
        var video = $scope.videos[index],
            url = 'http://gdata.youtube.com/feeds/api/videos/'+video+'?v=2&alt=json-in-script&callback=JSON_CALLBACK';

        $scope.videos[index] = {
            loading: true
        };

        setTimeout(function() {
            $http.jsonp(url)
                .success(function(data) {
                    $scope.videos[index] = data.entry;
                    $scope.loadVideos();
                });
        }, 250);
    };

    $scope.loadVideos = function() {
        var unloadedVideosRemain = false;

        for (var i = 0, l = $scope.videos.length; i < l; i++) {
            if (typeof $scope.videos[i] === 'string') {
                unloadedVideosRemain = true;
                $scope.loadVideo(i);
                break;
            }
        }
        if ($scope.videos.length && !unloadedVideosRemain) {
            var video = $scope.videos[0],
                id = video.media$group.yt$videoid.$t;

            $scope.video = video;
            $scope.player.cueVideoById(id);
        }
    };

    $scope.onVideoClick = function(video) {
        var id = video.media$group.yt$videoid.$t;

        $scope.video = video;
        $scope.player.loadVideoById(id);
    };

    $scope.getVideoCls = function(video) {
        var v1 = video,
            v2 = $scope.video;

        if (v1 && v2 && v1.media$group && v2.media$group && v1.media$group.yt$videoid.$t === v2.media$group.yt$videoid.$t) {
            return 'active';
        }

        return '';
    };

    $scope.onMatchClick = function(match) {
        $scope.match = match;
        $scope.videos = match.videos;
        $scope.loadVideos();
    };

    $scope.getMatchCls = function(match) {
        var m1 = match,
            m2 = $scope.match;

        if (m1 && m2 && m1.name === m2.name) {
            return 'active';
        }

        return '';
    };

    $scope.createPlayer();
    $scope.matchs = matchs;
    $scope.onMatchClick($scope.matchs[0]);
}
