"use client";

import React, { useState } from "react";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Demo() {
  const [inputType, setInputType] = useState("url");
  const [input, setInput] = useState("");
  const [result, setResult] = useState<{
    success?: boolean;
    status?: number;
    message?: string;
    data?: string | null;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setResult(null);

    try {
      const response = await fetch(
        `/api?${inputType}=${encodeURIComponent(input)}`,
      );
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error(error);
      setResult({ message: "An error occurred while fetching data" });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Tabs value={inputType} onValueChange={setInputType} className="w-full">
      <TabsList className="grid w-full grid-cols-2 mb-4">
        <TabsTrigger value="url">URL</TabsTrigger>
        <TabsTrigger value="id">ID</TabsTrigger>
      </TabsList>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="input">
            {inputType === "url" ? "Apple Music URL" : "Music ID"}
          </Label>
          <Input
            id="input"
            type={inputType === "url" ? "url" : "text"}
            placeholder={
              inputType === "url"
                ? "https://music.apple.com/..."
                : "Enter music ID"
            }
            value={input}
            onChange={(e) => setInput(e.target.value)}
            required
          />
        </div>

        <Button type="submit" disabled={isLoading}>
          {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
          {isLoading ? "Processing..." : "Submit"}
        </Button>
      </form>

      {result && (
        <Alert className="mt-4">
          <AlertTitle
            className={cn(
              result.success ? "text-green-500" : "text-destructive",
            )}
          >
            {result.success ? "Success" : "Error"}
          </AlertTitle>
          <AlertDescription>
            <ScrollArea className="h-[calc(100vh-430px)]">
              <code>{`${JSON.stringify(result, null, 2)}`}</code>
            </ScrollArea>
          </AlertDescription>
        </Alert>
      )}
    </Tabs>
  );
}
