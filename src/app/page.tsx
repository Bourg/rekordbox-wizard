'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import ModeToggle from '@/components/dark-mode-toggle';
import {
  ColorToLabelMapping,
  defaultColorToLabel,
} from '@/components/transform/ColorToLabelMapping';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormItem, FormLabel } from '@/components/ui/form';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';
import colorToLabel from '@/lib/transform/color-to-label';
import { triggerXmlDownload } from '@/lib/download';

export default function Home() {
  const { toast } = useToast();
  const form = useForm();

  const handleSubmit = form.handleSubmit(
    (values) => {
      colorToLabel({
        databaseFile: values.databaseFiles[0],
        mapping: defaultColorToLabel,
        overwriteExistingLabels: Boolean(values.overwriteExistingLabels),
      })
        .then((content) => {
          triggerXmlDownload({
            content,
            filename: 'rekordbox-database.xml',
          });
        })
        .catch((error) => {
          toast({
            variant: 'destructive',
            title: 'Uh oh!',
            description: error.message ?? 'Something went wrong',
          });
        });
    },
    () => {
      toast({
        variant: 'destructive',
        title: 'Please address highlighted errors',
      });
    },
  );

  return (
    <>
      <Toaster />
      <nav className="border-b">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-2">
          <h1 className="text-4xl font-extrabold">Rekordbox Wizard</h1>
          <ModeToggle />
        </div>
      </nav>
      <main className="mx-auto max-w-3xl px-4 py-8">
        <Form {...form}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Database File</CardTitle>
                <CardDescription>
                  Pick your Rekordbox database XML file
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FormItem>
                  <FormLabel>Database File</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept=".xml"
                      required
                      className="w-fit"
                      {...form.register('databaseFiles')}
                    />
                  </FormControl>
                </FormItem>
              </CardContent>
            </Card>
            <ColorToLabelMapping />
            <Button type="submit">Go!</Button>
          </form>
        </Form>
      </main>
    </>
  );
}
