'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ColorToLabel, RGB } from '@/lib/transform/color-to-label';

export const defaultColorToLabel: ColorToLabel[] = [
  { label: 'Intro', color: [222, 68, 207] },
  { label: 'Verse', color: [40, 226, 20] },
  { label: 'Chorus', color: [48, 90, 255] },
  { label: 'Drop', color: [0, 224, 255] },
  { label: 'Build', color: [195, 175, 4] },
  { label: 'Bridge', color: [180, 50, 255] },
  { label: 'Outro', color: [224, 100, 27] },
  { label: 'Loop', color: [16, 177, 118] },
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
          {defaultColorToLabel.map(({ label, color }) => (
            <li
              key={label}
              className="flex items-stretch justify-center overflow-clip rounded border"
            >
              <div
                className="w-8 px-2 py-1"
                style={{ backgroundColor: toCssRgb(color) }}
              ></div>
              <div className="px-2 py-1 text-sm">{label}</div>
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
