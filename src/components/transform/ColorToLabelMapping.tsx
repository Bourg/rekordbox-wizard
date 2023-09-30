import {
  Card,
  CardContent,
  CardDescription,
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
  { colorName: 'Lime green', defaultLabel: 'Verse', rgb: [40, 226, 20] },
  { colorName: 'Blue', defaultLabel: 'Chorus', rgb: [48, 90, 255] },
  { colorName: 'Cyan', defaultLabel: 'Drop', rgb: [0, 224, 255] },
  { colorName: 'Yellow', defaultLabel: 'Build', rgb: [195, 175, 4] },
  { colorName: 'Purple', defaultLabel: 'Bridge', rgb: [180, 50, 255] },
  { colorName: 'Orange', defaultLabel: 'Outro', rgb: [224, 100, 27] },
  { colorName: 'Moss', defaultLabel: 'Loop', rgb: [16, 177, 118] },
  // TODO add the 8 colors Z does not use
  // TODO separate the labels from this
  // { colorName: 'TODO 3', rgb: [170, 114, 255] },
  // { colorName: 'TODO 4', rgb: [100, 115, 255] },
  // { colorName: 'TODO 6', rgb: [80, 180, 255] },
  // { colorName: 'TODO 8', rgb: [31, 163, 146] },
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
        {colors.map(({ colorName, defaultLabel, rgb }) => (
          <div
            key={colorName}
            className="flex h-16 items-center justify-center"
            style={{ backgroundColor: toCssRgb(rgb) }}
          >
            {colorName} -&gt; {defaultLabel}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function toCssRgb([red, green, blue]: RGB) {
  return `rgb(${red} ${green} ${blue})`;
}
