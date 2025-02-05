import generateStupidName from 'sillyname';
import { randomSuperhero } from 'superheroes';
import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from 'fs';

inquirer
  .prompt([
    {
      message: 'What is your name?\n',
      name: 'rambiut'
    }
  ])
  .then((answers) => {
    const randomVillainName = generateStupidName();
    const randomHeroName = randomSuperhero();

    const qr_png_userName = qr.image(answers.rambiut, { type: 'png' });
    const qr_png_heroName = qr.image(randomHeroName, { type: 'png' });
    const qr_png_sillyName = qr.image(randomVillainName, { type: 'png' });

    console.log(`\nHello ${answers.rambiut}`);
    qr_png_userName.pipe(fs.createWriteStream('name.png'));
    console.log(`Your villain name will be ${randomVillainName}`);
    qr_png_sillyName.pipe(fs.createWriteStream('sillyname.png'));
    console.log(`And your superhero name will be ${randomHeroName}`);
    qr_png_heroName.pipe(fs.createWriteStream('superheroname.png'));

    const fileContent = `Name: ${answers.rambiut}\nVillain Name: ${randomVillainName}\nSuperHero Name: ${randomHeroName}\n`;
    const data = new Uint8Array(Buffer.from(fileContent));

    fs.writeFile('myhero.txt', data, (err) => {
      if (err) throw err;
      console.log('\nQR codes are generated\nText file updated with new data.');
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log("Prompt couldn't be rendered in the current environment.");
    } else {
      console.error('Something went wrong:', error);
    }
  });
