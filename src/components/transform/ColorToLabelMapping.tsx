'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface Color {
  colorName: string;
  defaultLabel: string;
  rgb: RGB;
}

type RGB = [number, number, number];

const colors: Color[] = [
  { colorName: 'Pink', defaultLabel: 'Intro', rgb: [222, 68, 207] },
  { colorName: 'Lime', defaultLabel: 'Verse', rgb: [40, 226, 20] },
  { colorName: 'Blue', defaultLabel: 'Chorus', rgb: [48, 90, 255] },
  { colorName: 'Cyan', defaultLabel: 'Drop', rgb: [0, 224, 255] },
  { colorName: 'Yellow', defaultLabel: 'Build', rgb: [195, 175, 4] },
  { colorName: 'Purple', defaultLabel: 'Bridge', rgb: [180, 50, 255] },
  { colorName: 'Orange', defaultLabel: 'Outro', rgb: [224, 100, 27] },
  { colorName: 'Moss', defaultLabel: 'Loop', rgb: [16, 177, 118] },
];

export interface ColorToLabelMappingProps {}

export function ColorToLabelMapping({}: ColorToLabelMappingProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Color to Label Mapping</CardTitle>
        <CardDescription>
          Apply labels to hot cues based on the color of the hot cue
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="flex flex-wrap gap-4">
          {colors.map(({ colorName, defaultLabel, rgb }) => (
            <li
              key={colorName}
              className="flex items-stretch justify-center overflow-clip rounded border"
            >
              <div
                className="w-8 px-2 py-1"
                style={{ backgroundColor: toCssRgb(rgb) }}
              ></div>
              <div className="px-2 py-1 text-sm">{defaultLabel}</div>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>Customizable mappings coming in a future version</CardFooter>
    </Card>
  );
}

function toCssRgb([red, green, blue]: RGB) {
  return `rgb(${red} ${green} ${blue})`;
}
