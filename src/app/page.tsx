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
import { ColorToLabelMapping } from '@/components/transform/ColorToLabelMapping';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';

export default function Home() {
  const { toast } = useToast();
  const form = useForm();

  const handleSubmit = form.handleSubmit(
    (form) => {
      toast({
        title: 'Working on it!',
        description:
          "A download of your updated database file will start as soon as it's ready.",
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
                <FormField
                  name="databaseFile"
                  rules={{ required: 'Pick a database file' }}
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Database File</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept=".xml"
                          className="w-fit"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                ></FormField>
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
