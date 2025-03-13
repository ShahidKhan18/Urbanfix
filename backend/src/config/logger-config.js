const {createLogger,format,transport, transports} =require("winston")
const {combine,timestamp,label,printf}=format;


const myFormat = printf(({ level, message, timestamp,error }) => {
  return `${timestamp}  ${level}: ${message} ${JSON.stringify(error)}`;
});



const logger = createLogger({
  format: combine(
    label({ label: 'right meow!' }),
    timestamp( {
        format:"YYYY-MM-DD HH-mm-ss"
    }),
    myFormat
  ),
  transports:[
    new transports.Console(),
    new transports.File({filename:'combined.log'})
  ]
});

module.exports=logger