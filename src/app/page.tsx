import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import ModeToggle from '@/components/dark-mode-toggle';

export default function Home() {
  return (
    <>
      <nav className="border-b">
        <div className="mx-auto flex max-w-xl items-center justify-between px-4 py-2">
          <h1 className="text-4xl font-extrabold">Rekordbox Wizard</h1>
          <ModeToggle />
        </div>
      </nav>
      <main className="mx-auto max-w-xl space-y-8 p-4">
        <Card>
          <CardHeader>
            <CardTitle>Database File</CardTitle>
            <CardDescription>
              Pick your Rekordbox database XML file
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Input type="file" accept=".xml" />
          </CardContent>
        </Card>
      </main>
    </>
  );
}
