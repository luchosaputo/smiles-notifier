const axios = require('axios');

const getFligthsForDate = (date) => {
  return axios.get('https://api-air-flightsearch-prd.smiles.com.br/v1/airlines/search', {
    params: {
      adults: 2,
      cabinType: 'economic',
      children: 0,
      currencyCode: 'ARS',
      departureDate: date,
      destinationAirportCode: 'MAD',
      infants: 0,
      isFlexibleDateChecked: true,
      originAirportCode: 'BUE',
      tripType: 2,
      forceCongener: false,
      r: 'ar'
    },
    headers: {
      accept: 'application/json, text/plain, */*',
      'accept-language': 'es-AR,es;q=0.9,en-US;q=0.8,en;q=0.7,es-419;q=0.6',
      authorization: 'Bearer agKLWYtjR9bPbkGwABTr4x1vCfi5nKXNcpcTKcBq6qcEPED4Zeh9i4',
      channel: 'Web',
      language: 'es-ES',
      region: 'ARGENTINA',
      'sec-ch-ua': '"Google Chrome";v="111", "Not(A:Brand";v="8", "Chromium";v="111"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Windows"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'cross-site',
      'x-api-key': 'aJqPU7xNHl9qN3NVZnPaJ208aPo2Bh2p2ZV844tw',
      Referer: 'https://www.smiles.com.ar/',
      'Referrer-Policy': 'strict-origin-when-cross-origin'
    }
        
  }).then((response) => {
    const { requestedFlightSegmentList: [{ flightList }] } = response.data;
    return flightList.filter(flight => flight.stops <= 1 && flight.duration.hours < 16);
  })
    .catch(error => {
      if (error.response) console.error('Error from API: ', error.response);
      throw new Error('There was an error from smiles API');
    });
}

module.exports = { getFligthsForDate }