import express from "express";
import bodyParser from "body-parser";
// import fs from 'fs';
// import { v4 as uuidv4 } from 'uuid';

// import path from "path";
// import { fileURLToPath } from 'url';
// import OpenAI from "openai";

// // Define __dirname in ES module
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
// app.use(bodyParser.json());
// const openai = new OpenAI();
// const URL_HOST = "https://315d-189-172-76-96.ngrok-free.app";

// app.post('/webhooks/answer/chatgpt', async (req, res) => {
//   console.log("SPEECH DE PERSONA: ", req.body.speech.results[0].text);

//   const completion = await openai.chat.completions.create({
//     messages: [{ role: "system", content: req.body.speech.results[0].text }],
//     model: "gpt-4o",
//     max_tokens: 100,
//     stop: ["."]
//   });

//   console.log("RESPONSE DE OPEN AI: ", completion.choices[0].message.content);

//   const completition = await returnNccoCompletition(completion.choices[0].message.content)
//   return res.json(completition);
// });

// app.get('/webhooks/answer/welcome', async (req, res) => {
//   const newNcco = await returnNccoCompletition();
//   return res.json(newNcco);
// });

app.post('/webhooks/valid_info', async (req, res) => {
  if (!req.body) {
    return res.status(401).json({ error: "Bad parameters" })
  }
  const { full_name, secret_phrase } = req.body;
  console.log("data", req.body);

  return res.json({ is_valid: 1 });
});

// // Serve audio files from a directory
// app.use('/audio', express.static(path.join(__dirname)));

// async function convertTextToSpeech(text = "Que tal, estas hablando con Chatgpt desde una llamada telefonica, ¿En que te puedo ayudar?") {
//   const audioName = `audio_${uuidv4()}.mp3`;
//   const speechFile = path.resolve(audioName);
//   const mp3 = await openai.audio.speech.create({
//     model: "tts-1",
//     voice: "alloy",
//     input: text,

//   });

//   const buffer = Buffer.from(await mp3.arrayBuffer());
//   await fs.promises.writeFile(speechFile, buffer);

//   const speechFileLocation = URL_HOST + `/audio/${audioName}`;
//   return speechFileLocation;
// }

// async function returnNccoCompletition(text) {
//   const filePath = await convertTextToSpeech(text);
//   const newNcco = [
//     {
//       "action": "stream",
//       "streamUrl": [filePath]
//     },
//     {
//       "eventUrl": [
//         `${URL_HOST}/webhooks/answer/chatgpt`
//       ],
//       "eventMethod": "POST",
//       "action": "input",
//       "type": ["speech"],
//       "speech": {
//         "language": "es-MX",
//         "context": [
//           "quisiera", "hablar", "hola", "buena tarde",
//         ],
//         // "saveAudio": true,
//         "sensitivity": "75"
//       }
//     }
//   ]

//   console.log("NCCO QUE RETORNAMOS: ", newNcco);

//   return newNcco;
// }

app.listen(3001, () => {
  console.log('Server listening on port 3001');
});



// app.post('/webhooks/record', async (req, res) => {
//   const recordingUrl = req.body.recording_url;

//   // Descargar y transcribir el audio
//   const response = await axios.get(recordingUrl, { responseType: 'arraybuffer' });
//   const audioData = Buffer.from(response.data, 'binary');

//   // Convertir audio a texto (puedes usar un servicio como IBM Watson o Google Speech-to-Text)
//   const transcript = await transcribeAudio(audioData);

//   // Generar respuesta con OpenAI
//   const openaiResponse = await axios.post(openaiUrl + "/chat/completions", {
//     prompt: transcript,
//     max_tokens: 150
//   }, {
//     headers: {
//       'Authorization': `Bearer ${openaiApiKey}`
//     }
//   });

//   const replyText = openaiResponse.data.choices[0].text.trim();

//   // Convertir texto a voz
//   const ttsResponse = await axios.post('https://api.openai.com/v1/audio', {
//     text: replyText,
//     voice: 'en-US_AllisonVoice',
//     format: 'mp3'
//   }, {
//     headers: {
//       'Authorization': `Bearer ${openaiApiKey}`
//     }
//   });

//   const audioFileName = `audio_${uuidv4()}.mp3`;
//   fs.writeFileSync(audioFileName, ttsResponse.data.data);

//   // Reproducir audio en la llamada
//   const nccoResponse = [{
//     action: 'stream',
//     streamUrl: [`${req.protocol}://${req.get('host')}/audio/${audioFileName}`]
//   }];

//   res.json(nccoResponse);
// });