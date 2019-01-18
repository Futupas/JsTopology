var Config = {
    Line: {
        strokeWidth: 2,
        defaultColor: '#000'
    },
    Switch: {
        sideLength: 40,
        strokeWidth: 2
    },
    VoltageSource: {
        sideLength: 30,
    },
    Voltages: {
        'error': '#f00',
        0: '#000',
        1: '#0f0',
        2: '#00f',
        3: '#f49e42'
    }
}

var Links = [
    [1, 3],
    [3, 4],
    [4, 9],
    [9, 5],
    // [5, 6],
    [6, 10],
    [10, 7],
    [7, 8],
    [8, 2],
    [11, 5],
    [11, 6],
    [11, 12],
    [11, 20],
    [12, 13],
    [13, 18],
    [18, 14],
    [14, 15],
    [15, 19],
    [19, 16],
    [16, 17],
    [17, 25],
    [20, 21],
    [21, 24],
    [24, 22],
    [22, 23],
    [23, 25],
    [25, 31],
    [28, 14],
    [28, 15],
    [26, 29],
    [29, 27],
    [27, 30],
    [30, 28]
]

var Circuit = [
    {
        id: 1,
        type: 'VoltageSource',
        C: {
            x: 50,
            y: 50
        },
        Voltage: 1
    }, {
        id: 2,
        type: 'VoltageSource',
        C: {
            x: 550,
            y: 50
        },
        Voltage: 2
    }, {
        id: 3,
        type: 'line',
        C: {
            x1: 50,
            y1: 50,
            x2: 50,
            y2: 100
        }
    }, {
        id: 4,
        type: 'line',
        C: {
            x1: 50,
            y1: 100,
            x2: 155,
            y2: 100
        }
    }, {
        id: 5,
        type: 'line',
        C: {
            x1: 195,
            y1: 100,
            x2: 300,
            y2: 100
        }
    }, {
        id: 6,
        type: 'line',
        C: {
            x1: 300,
            y1: 100,
            x2: 405,
            y2: 100
        }
    }, {
        id: 7,
        type: 'line',
        C: {
            x1: 445,
            y1: 100,
            x2: 550,
            y2: 100
        }
    }, {
        id: 8,
        type: 'line',
        C: {
            x1: 550,
            y1: 100,
            x2: 550,
            y2: 50
        }
    }, {
        id: 9,
        type: 'Switch',
        C: {
            x: 175,
            y: 100
        },
        Position: 0
    }, {
        id: 10,
        type: 'Switch',
        C: {
            x: 425,
            y: 100
        },
        Position: 0
    }, {
        id: 11,
        type: 'line',
        C: {
            x1: 300,
            y1: 100,
            x2: 300,
            y2: 200
        }
    }, {
        id: 12,
        type: 'line',
        C: {
            x1: 300,
            y1: 200,
            x2: 200,
            y2: 200
        }
    }, {
        id: 13,
        type: 'line',
        C: {
            x1: 200,
            y1: 200,
            x2: 200,
            y2: 250
        }
    }, {
        id: 14,
        type: 'line',
        C: {
            x1: 200,
            y1: 290,
            x2: 200,
            y2: 340
        }
    }, {
        id: 15,
        type: 'line',
        C: {
            x1: 200,
            y1: 340,
            x2: 200,
            y2: 390
        }
    }, {
        id: 16,
        type: 'line',
        C: {
            x1: 200,
            y1: 430,
            x2: 200,
            y2: 480
        }
    }, {
        id: 17,
        type: 'line',
        C: {
            x1: 200,
            y1: 480,
            x2: 300,
            y2: 480
        }
    }, {
        id: 18,
        type: 'Switch',
        C: {
            x: 200,
            y: 270
        },
        Position: 0
    }, {
        id: 19,
        type: 'Switch',
        C: {
            x: 200,
            y: 410
        },
        Position: 0
    }, {
        id: 20,
        type: 'line',
        C: {
            x1: 300,
            y1: 200,
            x2: 400,
            y2: 200
        }
    }, {
        id: 21,
        type: 'line',
        C: {
            x1: 400,
            y1: 200,
            x2: 400,
            y2: 320
        }
    }, {
        id: 22,
        type: 'line',
        C: {
            x1: 400,
            y1: 360,
            x2: 400,
            y2: 480
        }
    }, {
        id: 23,
        type: 'line',
        C: {
            x1: 400,
            y1: 480,
            x2: 300,
            y2: 480
        }
    }, {
        id: 24,
        type: 'Switch',
        C: {
            x: 400,
            y: 340
        },
        Position: 0
    }, {
        id: 25,
        type: 'line',
        C: {
            x1: 300,
            y1: 480,
            x2: 300,
            y2: 580
        }
    }, {
        id: 26,
        type: 'VoltageSource',
        C: {
            x: 60,
            y: 320
        },
        Voltage: 3
    }, {
        id: 27,
        type: 'line',
        C: {
            x1: 60,
            y1: 340,
            x2: 110,
            y2: 340
        }
    }, {
        id: 28,
        type: 'line',
        C: {
            x1: 150,
            y1: 340,
            x2: 200,
            y2: 340
        }
    }, {
        id: 29,
        type: 'line',
        C: {
            x1: 60,
            y1: 320,
            x2: 60,
            y2: 340
        }
    }, {
        id: 30,
        type: 'Switch',
        C: {
            x: 130,
            y: 340
        },
        Position: 0
    }, {
        id: 31,
        type: 'EndPoint',
        C: {
            x: 300,
            y: 580
        }
    }
];