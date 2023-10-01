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
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';
import colorToLabel from '@/lib/transform/color-to-label';
import { triggerXmlDownload } from '@/lib/download';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';

export default function Home() {
  const { toast } = useToast();
  const form = useForm();

  const handleSubmit = form.handleSubmit(
    (values) => {
      colorToLabel({
        databaseFile: values.databaseFiles[0],
        startDate: values.startDate,
        mapping: defaultColorToLabel,
        overwriteExistingLabels: Boolean(values.overwriteExistingLabels),
      })
        .then(({ database, changelog }) => {
          console.log('CHANGELOG', changelog);
          triggerXmlDownload({
            content: database,
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
          <form onSubmit={handleSubmit} className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Database</CardTitle>
                <CardDescription>
                  Load and scope the database you want to work with
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
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
                <FormField
                  name="startDate"
                  rules={{ required: 'Select a start date' }}
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Start date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button variant="outline" className="w-fit">
                              <CalendarIcon className="mr-3 h-4 w-4 opacity-50" />
                              {field.value
                                ? format(field.value, 'PPP')
                                : 'Pick a date'}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            initialFocus
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date > new Date()}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                      <FormDescription>
                        Only tracks added on or after this date will be affected
                      </FormDescription>
                    </FormItem>
                  )}
                />
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
