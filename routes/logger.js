
var winston =require('winston');

winston.setLevels(winston.config.syslog.levels);
var logger = new (winston.Logger)({
    transports:[
        //Console transport 추가
        new (winston.transports.Console)({
            colorize :true
        }),
        // File transport 추가
        new (winston.transports.File)({
            // filename property 지정
            filename: 'somefile.log'
        })
    ]
});

module.exports=logger;
