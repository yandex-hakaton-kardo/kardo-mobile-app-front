import fs from 'node:fs';
import path from 'node:path';

const iconsDir = './src/components/icons';
const indexFilePath = path.join(iconsDir, 'index.ts');

const toPascalCase = name => name[0].toUpperCase().concat(name.slice(1));

fs.readdir(iconsDir, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

  const iconFiles = files.filter(file => file.endsWith('.svg'));

  const content = iconFiles
    .map(file => {
      const fileName = file.split('.svg')[0];
      const iconName = toPascalCase(fileName);
      return `export {default as ${iconName}Icon} from './${file}?react';`;
    })
    .join('\n');

  fs.writeFile(indexFilePath, content, err => {
    if (err) {
      console.error('Error writing to file:', err);
      return;
    }
    console.log('Icons imported and exported successfully in index.ts');
  });
});
