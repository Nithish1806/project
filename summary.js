// summary.js

const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

router.get('/', async (req, res) => {
    var keyw = req.query.keyword
    const urlSummary = 'https://api.tiingo.com/iex?tickers='+keyw+'&token=dba09041d3f74d6661a2e620087813c35682f331';
    //const urlStockDetails = 'https://api.tiingo.com/tiingo/daily/AAPL?token=dba09041d3f74d6661a2e620087813c35682f331'
    fetch (urlSummary).then((response) =>  {
        response.json().then ((data) => {
            

            dataobj = {}   
            data = data[0];      
            dataobj ['lastPrice'] = data['last'].toFixed(2);
            dataobj['prevClose'] = data['prevClose'].toFixed(2);
            dataobj['change'] = dataobj['lastPrice'] - dataobj['prevClose'];
            dataobj['change'] = dataobj['change'].toFixed(2);
          //  console.log (dataobj['change'])
            dataobj['changePercent'] = dataobj['change'] / dataobj['prevClose'] * 100;
            dataobj['changePercent'] = dataobj['changePercent'].toFixed(2);
          //  console.log ('change percent is '+ dataobj['changePercent']);
            const currentTime = new Date();
           
            var day = currentTime.getDate();
            if (day < 10)
            day  ='0'+ day;
            var month = currentTime.getMonth();
            month+=1;
            if (month < 10)
            month  ='0'+ month;
            var year = currentTime.getFullYear();
            var hour = currentTime.getHours();
            if (hour < 10)
            hour  ='0'+ hour;


            var min = currentTime.getMinutes();
            if (min < 10)
            min  ='0'+ min;

            var sec = currentTime.getSeconds();  
            if (sec < 10)
            sec  ='0'+ sec;
          
            var dtString = year+'-'+month+'-'+day+' '+hour+":"+min+":"+sec;
           // console.log (dtString);
           // dataobj['currentTimeStamp'] = currentTime.toString();
            dataobj['currentTimeStamp'] = dtString;
     //       console.log ('current time stamp is '+dataobj['currentTimeStamp']);

            //console.log(dataobj['currentTimeStamp']);
            var timestamp = new Date(data['timestamp']);           


             day = timestamp.getDate();
             if (day < 10)
                 day  ='0'+ day;
             month = timestamp.getMonth();
             month+=1;
             if (month < 10)
             month  ='0'+ month;
             year = timestamp.getFullYear();
             hour = timestamp.getHours();
             if (hour < 10)
                hour  ='0'+ hour;

             min = timestamp.getMinutes();
            if (min < 10)
                min = '0' + min;
             sec = timestamp.getSeconds();  
             if (sec < 10)
                sec = '0' +sec;
             dtString = year+'-'+month+'-'+day+' '+hour+":"+min+":"+sec;
             dataobj['timestamp'] = dtString;
 //            console.log ('API time stamp is '+dataobj['timestamp']);
            
            //dataobj['timestamp'] = data['timestamp'];
           // const timestamp  = new Date(data['timestamp']) ;
            
            //const secondsPassed =  (currentTime.getSeconds() - timestamp.getSeconds()) / 1000;
            var secondsPassed = (currentTime.getTime() - timestamp.getTime()) / 1000;
     //       console.log ('seconds passed is '+ secondsPassed);
            var marketClosed = true;
            
            if (secondsPassed <= 60)
                marketClosed = false;

                dataobj['marketStatus'] = marketClosed;

 //               console.log ('marketclosed is '+marketClosed);

                dataobj['highPrice'] = data['high'].toFixed(2);
                dataobj['lowPrice'] = data['low'].toFixed(2);

                if (!data['mid'] && !dataobj['marketStatus'])
                    dataobj['midPrice'] = '-'
                
                if (data['mid'])
                    dataobj['midPrice'] = data['mid'].toFixed(2);


            if (data['volume'])
                dataobj['volume'] = data['volume'].toFixed(2);

                if (data['bidPrice'])
                dataobj['bidPrice'] = data['bidPrice'].toFixed(2);


               if (data['bidSize'])
                dataobj['bidSize'] = data['bidSize'].toFixed(2);

               if (data['askPrice'])
                dataobj['askPrice'] = data['askPrice'].toFixed(2);

                if (data['askSize'])
                dataobj['askSize'] = data['askSize'].toFixed(2);


                if (data['open'])
                dataobj['openPrice'] = data['open'].toFixed(2);




                //dataobj['highPrice'] = data['high'].toFixed(2);
                //dataobj['lowPrice'] = data['low'].toFixed(2);
               // dataobj['midPrice'] = data['mid'].toFixed(2);
            
            if (!dataobj['marketStatus'] && !dataobj['midPrice'])
                dataobj['midPrice'] = '-';
            //dataobj['volume'] = data['volume'].toFixed(2);
            //dataobj['bidPrice'] = data['bidPrice'].toFixed(2);
            //dataobj['bidSize'] = data['bidSize'].toFixed(2);
            //dataobj['askPrice'] = data['askPrice'].toFixed(2);
            //dataobj['askSize'] = data['askSize'].toFixed(2);
            //dataobj['openPrice'] = data['open'].toFixed(2);
            res.send (dataobj);
  
        
        })
    })    
    
});



module.exports = router;
