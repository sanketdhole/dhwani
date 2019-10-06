const extractAudio = require('ffmpeg-extract-audio');
const SpeechToTextV1 = require('watson-developer-cloud/speech-to-text/v1');
const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1.js');
const fs = require('fs');
const lodash = require('lodash');

var extractedText = '';
var keywords = '';

var convertVideoToAudio = async function(input_file, output_file) {
  try {
    const extractedValue = await extractAudio({
      input: input_file,
      output: output_file,
    }).catch(function(error) {
      console.log('Error while converting video to audio');
      console.log(error);
    });
  } catch (error) {
    console.log('Error while converting video to audio');
    console.log(error);
  }
};

var convertAudioToText = function(url, api_key, input_file, output_file) {
  const speechToText = new SpeechToTextV1({
    iam_apikey: api_key,
    url: url,
    headers: {
      'X-Watson-Learning-Opt-Out': 'true',
    },
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
  recognizeStream.on('data', function(event) {
    onEvent('Data:', event);
  });
  recognizeStream.on('error', function(event) {
    onEvent('Error:', event);
  });
  recognizeStream.on('close', function(event) {
    onEvent('Close:', event);
  });

  // Display events on the console.
  function onEvent(name, event) {
    if (name === 'Data:') {
      lodash.forEach(event['results'], function(results) {
        lodash.forEach(results['alternatives'], function(value) {
          extractedText += value['transcript'];
        });
      });
      console.log(`Text extracted Successfully`);
    } else if (name === 'Close:') {
      console.log(`Writing extracted text into file ${output_file}`);
      fs.writeFile(output_file, extractedText, err => {
        if (err) console.log(err);
        console.log('Successfully written extracted text into File.');
      });
    } else if (name === 'Error:') {
      console.log('Error while extracting text from audio');
    }
    //console.log(name, JSON.stringify(event, null, 2));
  }
};

var textAnalysis = function(url, api_key, input_file, output_file) {
  const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
    version: '2018-11-16',
    iam_apikey: api_key,
    url: url,
  });

  var text = fs.readFileSync(input_file).toString('utf8');

  const analyzeParams = {
    text: text,
    features: {
      keywords: {
        sentiment: false,
        emotion: false,
        limit: 50,
      },
    },
  };

  naturalLanguageUnderstanding
    .analyze(analyzeParams)
    .then(analysisResults => {
      lodash.forEach(analysisResults['keywords'], function(value) {
        keywords += value['text'] + ',';
      });
      console.log('Text Analysis completed');
      fs.writeFile(output_file, keywords, err => {
        if (err) console.log(err);
        console.log('Successfully written analyzed text into File.');
      });
      //console.log(JSON.stringify(analysisResults, null, 2));
    })
    .catch(err => {
      console.log('error in text analysis:', err);
    });
};

module.exports = {
  convertVideoToAudio: convertVideoToAudio,
  convertAudioToText: convertAudioToText,
  textAnalysis: textAnalysis,
};
