const extractAudio = require('ffmpeg-extract-audio');
const SpeechToTextV1 = require('watson-developer-cloud/speech-to-text/v1');
const fs = require('fs');
const lodash = require('lodash');

var convertVideoToAudio = async function(input_file, output_file) {
  try {
     const extractedValue =  await extractAudio({
      input: input_file,
      output: output_file
    }).catch(function(error){
      console.log('Error while converting video to audio');
      console.log(error);
    });
  }
  catch (error) {
    console.log('Error while converting video to audio');
    console.log(error);
  }
}


var convertAudioToText = function(url, api_key, input_file, output_file) {
  const speechToText = new SpeechToTextV1({
    iam_apikey: api_key,
    url: url,
    headers: {
      'X-Watson-Learning-Opt-Out': 'true'
    }
  });

  var params = {
    objectMode: true,
    content_type: 'audio/mp3',
    model: 'en-US_BroadbandModel',
  };

  // Create the stream.
  var recognizeStream = speechToText.recognizeUsingWebSocket(params);

  // Pipe in the audio.
  fs.createReadStream(input_file).pipe(recognizeStream);


  // Listen for events.
  recognizeStream.on('data', function(event) { onEvent('Data:', event); });
  recognizeStream.on('error', function(event) { onEvent('Error:', event); });
  recognizeStream.on('close', function(event) { onEvent('Close:', event); });

  // Display events on the console.
  function onEvent(name, event) {
    var text = '';
    if(name === 'Data:') {
      lodash.forEach(event['results'], function(results) {
        lodash.forEach(results['alternatives'], function(value) {
          text += value['transcript'];
        });
      });
    }
    console.log(name, JSON.stringify(event, null, 2));
    console.log(`Appended Text: ${text}`);
    fs.writeFile(output_file, text, (err) => {
      if (err) console.log(err);
      console.log("Successfully Written to File.");
    });
  };
}



module.exports = {
  convertVideoToAudio: convertVideoToAudio,
  convertAudioToText: convertAudioToText,
};
