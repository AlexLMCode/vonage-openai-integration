import { Vonage as Vonage } from "@vonage/server-sdk"; 
import dotenv from "dotenv";

dotenv.config()

export const vonage = new Vonage({
    apiKey: process.env.VONAGE_API_KEY,
    apiSecret: process.env.VONAGE_API_SECRET,
    applicationId: process.env.VONAGE_APPLICATION_ID,
    privateKey: process.env.VONAGE_APPLICATION_PRIVATE_KEY_PATH
})


vonage.voice.createOutboundCall({
    to: [{
        type: 'phone',
        number: "528113133161"
    }],
    from: {
        type: 'phone',
        number: "525596023122"
    },
    answer_url: ['https://315d-189-172-76-96.ngrok-free.app/webhooks/answer/welcome'],
    // eventUrl: ['https://315d-189-172-76-96.ngrok-free.app/webhooks/answer/events']

})
    .then(resp => console.log(resp))
    .catch(err => console.error(err));