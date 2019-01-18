var svg = document.querySelector('svg.circuit');
svg.oncontextmenu = function(e) {
    alert('d');
    return false;
}


function Draw() {
    for (var i = 0; i < Circuit.length; i++) {
        var elem = Circuit[i];
        switch(elem.type.toLowerCase()) {
            case 'line': 
                var line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                line.setAttribute('x1', elem.C.x1);
                line.setAttribute('y1', elem.C.y1);
                line.setAttribute('x2', elem.C.x2);
                line.setAttribute('y2', elem.C.y2);
                line.style.strokeWidth = Config.Line.strokeWidth + 'px';
                line.style.stroke = Config.Line.defaultColor;
                line.style.strokeLinecap = 'round';
                Circuit[i].realElement = line;
                svg.appendChild(line);
            break;
            case 'voltagesource': 
                var polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
                var sidehalf = Config.VoltageSource.sideLength / 2;
                var sideheight = Config.VoltageSource.sideLength / 2 * 1.732;
                polygon.setAttribute('points', 
                    (elem.C.x + ',' + elem.C.y + ' ' + 
                    (elem.C.x-sidehalf) + ',' + (elem.C.y-sideheight) + ' ' +
                    (elem.C.x+sidehalf) + ',' + (elem.C.y-sideheight)));
                polygon.style.strokeWidth = '0px';
                polygon.style.fill = Config.Voltages[elem.Voltage];
                polygon.style.strokepolygoncap = 'round';
                polygon.style.strokepolygonjoin = 'round';
                Circuit[i].realElement = polygon;
                svg.appendChild(polygon);
            break;
            case 'switch': 
                var rect = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
                var sidehalf = Config.Switch.sideLength / 2;
                rect.setAttribute('points', 
                    ((elem.C.x-sidehalf) + ',' + (elem.C.y-sidehalf) + ' ' +
                    (elem.C.x+sidehalf) + ',' + (elem.C.y-sidehalf) + ' ' +
                    (elem.C.x+sidehalf) + ',' + (elem.C.y+sidehalf) + ' ' +
                    (elem.C.x-sidehalf) + ',' + (elem.C.y+sidehalf)));
                rect.style.strokeWidth = Config.Switch.strokeWidth;
                rect.style.fill = elem.Position ? '#000' : 'none';
                rect.style.stroke = Config.Line.defaultColor;
                rect.style.strokerectcap = 'round';
                rect.style.strokerectjoin = 'round';
                Circuit[i].realElement = rect;
                svg.appendChild(rect);
            break;
            case 'endpoint': 
                var polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
                var sidehalf = Config.VoltageSource.sideLength / 2;
                var sideheight = Config.VoltageSource.sideLength / 2 * 1.732;
                polygon.setAttribute('points', 
                    (elem.C.x + ',' + (elem.C.y+sideheight) + ' ' + 
                    (elem.C.x-sidehalf) + ',' + (elem.C.y) + ' ' +
                    (elem.C.x+sidehalf) + ',' + (elem.C.y)));
                polygon.style.strokeWidth = '0px';
                polygon.style.fill = Config.Voltages[elem.Voltage];
                polygon.style.strokepolygoncap = 'round';
                polygon.style.strokepolygonjoin = 'round';
                Circuit[i].realElement = polygon;
                svg.appendChild(polygon);
            break;
        }
    }
}
Draw();

// Main function
function Colorize(elementid, vl, array) {
    var element = Circuit.filter(function (e) { return e.id == elementid; })[0];
    if (element.Voltage === 'error') return;
    array.push(element);
    if (element.type.toLowerCase() == 'switch') {
        if (element.Position == 1) {
            element.Voltage = vl;
        } else {
            return;
        }
    }
    if (element.type.toLowerCase() == 'line') {
        element.Voltage = vl;
    }
    if (element.type.toLowerCase() == 'endpoint') {
        element.Voltage = vl;
        // return;
    }
    PaintElement(element.id);
    var childrenlinks = Links.filter(function(e) { return e[0] == element.id || e[1] == element.id; });
    var childrenids = [];
    for (var i = 0; i < childrenlinks.length; i++) {
        if (childrenlinks[i][0] == elementid) childrenids.push(childrenlinks[i][1]);
        else childrenids.push(childrenlinks[i][0]);
    }
    for (var i = 0; i < childrenids.length; i++) {
        var child = Circuit.filter(function (e) { return e.id == childrenids[i]; })[0];
        if (child.Voltage === vl) {
            // loop
            // return true;
        } else if (child.Voltage === undefined) {
            var ret = Colorize(child.id, vl, array);
            if (ret === false) {
                return false;
            }
        } else {
            // console.log('error');
            // console.log(array);
            array.shift();
            for (var j = 0; j < array.length; j++) {
                array[j].Voltage = 'error';
            }
            console.log('error');
            console.log(array);
            return false;
        }
    }
    return true;
}

function Paint() {
    for (var i = 0; i < Circuit.length; i++) {
        if (Circuit[i].Voltage === undefined) {
            var color = Config.Line.defaultColor;
        } else {
            var color = Config.Voltages[Circuit[i].Voltage];
        }
        switch (Circuit[i].type.toLowerCase()) {
            case 'line': 
                Circuit[i].realElement.style.stroke = color;
            break;
            case 'switch': 
                Circuit[i].realElement.style.stroke = color;
            break;
            case 'endpoint': 
                Circuit[i].realElement.style.fill = color;
            break;
        }
    }
}
function PaintElement(elementid) {
    var elem = Circuit.filter(function(e) { return e.id == elementid; })[0];
    if (elem.Voltage === undefined) {
        var color = Config.Line.defaultColor;
    } else {
        var color = Config.Voltages[elem.Voltage];
    }
    switch (elem.type.toLowerCase()) {
        case 'line': 
            elem.realElement.style.stroke = color;
        break;
        case 'switch': 
            elem.realElement.style.stroke = color;
        break;
        case 'endpoint': 
            elem.realElement.style.fill = color;
        break;
    }
}

function StartColorization() {
    var none_voltagesources = Circuit.filter(function(e) { return e.type.toLowerCase() != 'voltagesource'; });
    for (var i = 0; i < none_voltagesources.length; i++) {
        none_voltagesources[i].Voltage = undefined;
    }

    var voltagesources = Circuit.filter(function(e) { return e.type.toLowerCase() == 'voltagesource'; });
    for (var i = 0; i < voltagesources.length; i++) {
        var ret = Colorize(voltagesources[i].id, voltagesources[i].Voltage, []);
        if (ret === false) break;
    }
}

StartColorization();
// Paint();
//here


function DrawSwitchCheckboxes() {
    var switches = Circuit.filter(function(e) { return e.type.toLowerCase() == 'switch'; });
    for (var i = 0; i < switches.length; i++) {
        var cb = document.createElement('input');
        cb.setAttribute('type', 'checkbox');
        cb.style.width = '20px';
        cb.style.height = '20px';
        cb.style.marginLeft = '25vw';
        cb.style.position = 'fixed';
        cb.style.top = switches[i].C.y - 10 + 'px';
        cb.style.left = switches[i].C.x - 10 + 'px';
        cb.elem = switches[i];
        cb.checked = switches[i].Position ? true : false;
        cb.onclick = function(e) {
            if (this.checked == true) {
                this.elem.realElement.style.fill = '#000';
                this.elem.Position = 1;
            } else {
                this.elem.realElement.style.fill = 'none';
                this.elem.Position = 0;
            }
            StartColorization();
            Paint();
            // console.log(this.checked);
            // console.log(this.tyle);
        }
        document.body.appendChild(cb);
    }
}
DrawSwitchCheckboxes();
