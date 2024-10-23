const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('', (input) => {
  const wavelength = parseInt(input);

  if (wavelength >= 620 && wavelength <= 780) {
    console.log('Red');
  } else if (wavelength >= 590 && wavelength < 620) {
    console.log('Orange');
  } else if (wavelength >= 570 && wavelength < 590) {
    console.log('Yellow');
  } else if (wavelength >= 495 && wavelength < 570) {
    console.log('Green');
  } else if (wavelength >= 450 && wavelength < 495) {
    console.log('Blue');
  } else if (wavelength >= 425 && wavelength < 450) {
    console.log('Indigo');
  } else if (wavelength >= 380 && wavelength < 425) {
    console.log('Violet');
  }

  rl.close();
});
