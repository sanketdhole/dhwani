const extractAudio = require('ffmpeg-extract-audio');

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

module.exports = {
  convertVideoToAudio: convertVideoToAudio,
};
