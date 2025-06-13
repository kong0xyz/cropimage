import { ReactNode } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "./ui/accordion";
import { ChevronDown } from "lucide-react";

export interface NoteItem {
  title: string;
  content: string;
}

export interface PageNotesProps {
  mode?: 'accordion' | 'popover' | 'notes';
  heading?: string;
  description?: string;
  notes?: ReactNode[];
}

const headingRender = (heading: string, description: string) => {
  return (
    <div className="text-center">
      <h2 className="mt-4 text-4xl font-semibold">{heading}</h2>
      <p className="mt-6 font-medium text-muted-foreground">
        {description}
      </p>
    </div>
  )
}

const notesRender = (notes: ReactNode[]) => {
  return (
    <div className="mb-8 flex flex-col gap-4">
      {notes.map((note, index) => (
        <div key={index}>{note}</div>
      ))}
    </div>
  )
}

export const PageNotes = ({
  mode = "notes",
  heading = "Notes",
  description = "Find out all the essential details about our platform and how it can serve your needs.",
  notes = [],
}: PageNotesProps) => {
  return (
    <section className="py-16">
      <div className="container">
        {mode === 'accordion' && (
          <div className="mx-auto mt-14 max-w-screen-sm">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="flex items-center justify-between">
                  {heading}
                  <ChevronDown className="size-4" />
                </AccordionTrigger>
                <AccordionContent>
                  {notesRender(notes)}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        )
        }
        {mode === 'popover' && (
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">About this page</Button>
            </PopoverTrigger>
            <PopoverContent>
              {headingRender(heading, description)}
              <div className="mx-auto mt-14 max-w-screen-sm">
                {notesRender(notes)}
              </div>
            </PopoverContent>
          </Popover>

        )}
        {mode === 'notes' && (
          <>
            {headingRender(heading, description)}
            <div className="mx-auto mt-14 max-w-screen-sm">
              {notesRender(notes)}
            </div>
          </>
        )}
      </div>
    </section>
  );
};