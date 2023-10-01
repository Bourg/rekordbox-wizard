import {
  getAllCuesInTrack,
  getAllTracks,
  getCueColor,
  getCueName,
  getTrackDateAdded,
  isHotCue,
  readRekordboxDatabase,
  setCueName,
} from '@/lib/rekordbox-database';

export interface ColorToLabelInput {
  databaseFile: File;
  startDate: Date;
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
  const database = await readRekordboxDatabase(input.databaseFile);

  applyToDatabase(database, input);

  return database;
}

function applyToDatabase(database: XMLDocument, input: ColorToLabelInput) {
  const tracks = getAllTracks(database);

  for (let track of tracks) {
    const dateAdded = getTrackDateAdded(track);
    if (dateAdded >= input.startDate) {
      applyToTrack(track, input);
    }
  }
}

function applyToTrack(track: Element, input: ColorToLabelInput) {
  const cues = getAllCuesInTrack(track);

  // Take two passes over the cues:
  //  - Pass 1: Identify what names should be given and count occurrences
  //  - Pass 2: Apply names

  const countByLabel = new Map<string, number>();
  const labelByIndex = new Map<number, string>();
  for (let i = 0; i < cues.length; i++) {
    const cue = cues.item(i);

    // Only apply to hot cues
    if (!isHotCue(cue)) {
      continue;
    }

    // Only apply to cues that have colors
    const rgb = getCueColor(cue);
    if (rgb == null) {
      continue;
    }

    const label = findLabelForColor(rgb, input.mapping);
    if (label) {
      labelByIndex.set(i, label);

      const previousCountForLabel = countByLabel.get(label) ?? 0;
      countByLabel.set(label, previousCountForLabel + 1);
    }
  }

  const appliedCountByLabel = new Map<string, number>();
  for (let i = 0; i < cues.length; i++) {
    const cue = cues.item(i);

    // Only apply to cues that already have names if setting is checked
    const cueName = getCueName(cue);
    if (!input.overwriteExistingLabels && cueName) {
      continue;
    }

    const label = labelByIndex.get(i);
    if (label != null) {
      const countForLabel = countByLabel.get(label) ?? 1;
      if (countForLabel > 1) {
        // If there are multiple of this kind, serialize the labels
        const appliedCountForLabel = appliedCountByLabel.get(label) ?? 0;
        const nextAppliedCount = appliedCountForLabel + 1;
        setCueName(cue, `${label} ${nextAppliedCount}`);
        appliedCountByLabel.set(label, nextAppliedCount);
      } else {
        // If there's just one of this kind, use the label directly
        setCueName(cue, label);
      }
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
