window.onload = function() {
    var sim1Version = getUrlParameter('sim1');
    var sim2Version = getUrlParameter('sim2');
    var gameId = parseInput(getUrlParameter('game'));


    var select1 = document.getElementById('version1');
    var select2 = document.getElementById('version2');

    var urlText = document.getElementById('url');

    urlText.value = gameId;

    loadSim(1, gameId, sim1Version);
    loadSim(2, gameId, sim2Version);

    const Http = new XMLHttpRequest();
    const url='https://api.github.com/repos/Microsoft/pxt-arcade/tags';
    Http.open("GET", url);
    Http.send();
    Http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var obj = JSON.parse(Http.responseText);
            obj.unshift(JSON.parse('{ "name": "beta"}'));
            obj.unshift(JSON.parse('{ "name": "Empty"}'));
            for (var i = 0; i < obj.length; i++) {
                var version = obj[i]['name'];
                var option = document.createElement('option');
                option.value = version;
                option.innerText = version;
                if (version === sim1Version) {
                    option.selected = 'selected'
                }
                select1.appendChild(option);
                option = document.createElement('option');
                option.value = version;
                option.innerText = version;
                if (version === sim2Version) {
                    option.selected = 'selected'
                }
                select2.appendChild(option);
            }
        }
    }

    select1.onchange = function() {
        sim1Version = select1.value;
        loadSim(1, gameId, sim1Version);
    }

    select2.onchange = function() {
        sim2Version = select2.value;
        loadSim(2, gameId, sim2Version);
    }

    document.getElementById('loadButton').onclick = function() {
        gameId = parseInput(urlText.value);
        loadSim(1, gameId, sim1Version);
        loadSim(2, gameId, sim2Version);
    }

    document.getElementById('reload1').onclick = function() {
        loadSim(1, gameId, sim1Version);
    }

    document.getElementById('reload2').onclick = function() {
        loadSim(2, gameId, sim2Version);
    }

    document.getElementById('delete1').onclick = function() {
        loadSim(1, '', '');
    }

    document.getElementById('delete2').onclick = function() {
        loadSim(2, '', '');
    }
}

function parseInput(str) {
    return str.substring(str.lastIndexOf('_'));
}

function loadSim(index, game, version) {
    var sim = document.getElementById('sim' + index);
    if (version === '' || game === '' || version === 'Empty') {
        sim.innerHTML = '';
    } else {
        sim.innerHTML = '<div style="position:relative;height:0;padding-bottom:117.6%;overflow:hidden;"><iframe style="position:absolute;top:0;left:0;width:100%;height:100%;" src="https://arcade.makecode.com/' + version + '---run?id=' + game + '" allowfullscreen="allowfullscreen" sandbox="allow-popups allow-forms allow-scripts allow-same-origin" frameborder="0"></iframe></div>'
    }
}

function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};