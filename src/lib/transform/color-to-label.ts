import {
  getAllCuesInTrack,
  getAllTracks,
  getCueColor,
  getCueName,
  isHotCue,
  readRekordboxDatabase,
  setCueName,
} from '@/lib/rekordbox-database';

export interface ColorToLabelInput {
  databaseFile: File;
  mapping: ColorToLabel[];
  overwriteExistingLabels?: boolean;
}

export interface ColorToLabel {
  color: RGB;
  label: string;
}

export type RGB = [number, number, number];

export default async function colorToLabel(
  input: ColorToLabelInput,
): Promise<XMLDocument> {
  console.log(input);
  const database = await readRekordboxDatabase(input.databaseFile);

  applyToDatabase(database, input);

  return database;
}

function applyToDatabase(database: XMLDocument, input: ColorToLabelInput) {
  const tracks = getAllTracks(database);

  for (let track of tracks) {
    applyToTrack(track, input);
  }
}

function applyToTrack(track: Element, input: ColorToLabelInput) {
  const cues = getAllCuesInTrack(track);

  for (let cue of cues) {
    // Only apply to hot cues
    if (!isHotCue(cue)) {
      continue;
    }

    // Only apply to cues that already have names if setting is checked
    const cueName = getCueName(cue);
    if (!input.overwriteExistingLabels && cueName) {
      continue;
    }

    // Only apply to cues that have colors
    const rgb = getCueColor(cue);
    if (rgb == null) {
      continue;
    }

    const label = findLabelForColor(rgb, input.mapping);
    if (label) {
      setCueName(cue, label);
    }
  }
}

function findLabelForColor(color: RGB, mappings: ColorToLabel[]) {
  return mappings.find((mapping) => colorsAreEqual(color, mapping.color))
    ?.label;
}

function colorsAreEqual([r1, g1, b1]: RGB, [r2, g2, b2]: RGB) {
  return r1 === r2 && g1 === g2 && b1 === b2;
}
