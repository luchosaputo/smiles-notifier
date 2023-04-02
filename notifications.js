const axios = require('axios');

const keys = ['LPL72V', '5iLtkE'];
const onlyMe = keys.slice(1);
const BASE_URL = 'https://api.simplepush.io/send';


const sendNotification = (price, link, date) => {
  keys.forEach(key => {
    const body = {
      key,
      title: "Hay oferta en smiles!",
      msg: `Hay una nueva oferta para MADRID en smiles por $${price} el dia ${date}. Link: ${link}`,
    }
    console.log('Enviando notificacion a key: ', key)
    return axios.post(BASE_URL, body);
  });
}

module.exports = { sendNotification }