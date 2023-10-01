interface ColorToLabelInput {
  databaseFile: File;
}

export default async function colorToLabel({
  databaseFile,
}: ColorToLabelInput) {
  const databaseText = await readFileAsText(databaseFile);
  console.log(databaseText);
}

// TODO extract
function readFileAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.onload = (e) => {
      const result = e.target?.result;
      if (typeof result !== 'string') {
        reject(new Error('File read to non-string type'));
      } else {
        resolve(result);
      }
    };

    fileReader.onerror = () => {
      reject(fileReader.error);
    };

    fileReader.readAsText(file);
  });
}
