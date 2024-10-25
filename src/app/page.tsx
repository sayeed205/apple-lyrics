import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Documentation from "@/components/documentation";
import Demo from "@/components/demo";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <div className="container mx-auto max-w-3xl p-4 relative min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Music API</h1>
      <Tabs defaultValue="docs" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="docs">Documentation</TabsTrigger>
          <TabsTrigger value="demo">API Demo</TabsTrigger>
        </TabsList>
        <div className="border rounded-lg p-6 min-h-[400px]">
          <TabsContent
            value="docs"
            className="mt-0 [&>*]:animate-in [&>*]:fade-in-50"
          >
            <Documentation />
          </TabsContent>
          <TabsContent
            value="demo"
            className="mt-0 [&>*]:animate-in [&>*]:fade-in-50"
          >
            <Demo />
          </TabsContent>
        </div>
      </Tabs>

      <ThemeToggle />
    </div>
  );
}
