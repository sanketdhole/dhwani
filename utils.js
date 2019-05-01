

const extractAudio = require('ffmpeg-extract-audio');

var add = async function() {
  try {
    const fulfilledValue =  extractAudio({
      input: '/home/devdba/Documents/SJ Tech You Tube/microservice/Introduction_To_Microservices.mp4',
      output: 'test.mp3'
    }).then(function(va){

    }).catch(function(err){
      console.log(err);
    });
    console.log(fulfilledValue);
  }
  catch (rejectedValue) {
    // …
  }
}

module.exports = {
  add: add,
};
