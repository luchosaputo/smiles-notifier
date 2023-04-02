const cron = require('node-cron');
const { sendNotification } = require('./notifications');
const { getFligthsForDate } = require('./smiles.api');

const START_DATE = new Date('2023-10-30');
const END_DATE = new Date('2023-11-15');

const TARGET_PRICE = 250_000;

const datesToCheck = [];
for (let date = new Date(START_DATE); date <= END_DATE; date.setDate(date.getDate() + 1)) {
  datesToCheck.push(new Date(date));
}

async function start() {
  try {
    const requests = datesToCheck.map((date) => getFligthsForDate(date));
    const result = await Promise.all(requests);
    result.forEach((flights, index) => {
      const date = datesToCheck[index].toISOString().slice(0, 10);
      const milesPrices = flights.map(flight => {
        // este es solo el costo de millas faltan los impuestos, se pueden obtener llamando a https://flightavailability-prd.smiles.com.br/getflightinfo?flightUID=flight.uid
        // por ahora lo dejo asi si despues queremos mas precision lo hacemo
        const { miles } = flight.fareList.find(fare => fare.type === 'SMILES_CLUB');
        return miles;
      });
      const sorted = milesPrices.sort((a, b) => a - b);
      const bestPrice = sorted[0];
      console.log({ date, bestPrice });
      if (bestPrice <= TARGET_PRICE) {
        sendNotification(bestPrice, null, date)
      }
    });
  } catch (error) {
    console.error(error);
  }
}

cron.schedule('0 0 * * *', function() {
  console.log('Checking smiles flights...');
  start();
});