import { RGB } from '@/lib/transform/color-to-label';

export async function readRekordboxDatabase(file: File): Promise<XMLDocument> {
  const databaseContents = await readFileAsText(file);

  return parseRekordboxDatabase(databaseContents);
}

export async function readFileAsText(file: File): Promise<string> {
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

export function parseRekordboxDatabase(databaseContents: string): XMLDocument {
  const domParser = new DOMParser();
  const databaseDocument = domParser.parseFromString(
    databaseContents,
    'application/xml',
  );

  const parserErrorElement = databaseDocument.querySelector('parsererror');
  if (parserErrorElement != null) {
    throw new Error('Rekordbox database is corrupted');
  }

  const productElement = databaseDocument.querySelector('PRODUCT');
  if (!productElement || productElement.getAttribute('Name') !== 'rekordbox') {
    throw new Error('Document does not seem to be a rekordbox database');
  }

  return databaseDocument;
}

export function getAllTracks(database: XMLDocument) {
  return database.querySelectorAll('COLLECTION TRACK');
}

export function getAllCuesInTrack(track: Element) {
  return track.querySelectorAll('POSITION_MARK');
}

export function isHotCue(cue: Element) {
  const numString = cue.getAttribute('Num');
  if (numString == null) {
    return false;
  }

  const numInteger = Number.parseInt(numString, 10);
  return numInteger >= 0;
}

export function getCueColor(cue: Element): RGB | null {
  const red = parseRgb(cue.getAttribute('Red'));
  const green = parseRgb(cue.getAttribute('Green'));
  const blue = parseRgb(cue.getAttribute('Blue'));

  // Case 1: All 3 components of the color are present -> this is a color
  if (red != null && green != null && blue != null) {
    return [red, green, blue];
  }

  // Case 2: Some but not all components of the color are present -> corrupt db
  if (red == null || green == null || blue == null) {
    throw new Error('Incomplete color found in database');
  }

  // Case 3: No components of the color are present -> Not colored
  return null;
}

export function getCueName(cue: Element) {
  return cue.getAttribute('Name');
}

export function setCueName(cue: Element, name: string) {
  cue.setAttribute('Name', name);
}

function parseRgb(s: string | null) {
  if (s == null || s === '') {
    return null;
  }

  const rgbNumber = Number.parseInt(s, 10);
  if (Number.isNaN(rgbNumber) || rgbNumber < 0 || rgbNumber > 255) {
    throw new Error(`Impossible color found in database '${s}'`);
  }

  return rgbNumber;
}
