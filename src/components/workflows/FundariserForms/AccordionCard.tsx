import { Card, CardHeader, CardTitle, CardContent } from '@components/ui/card';
import { ChevronDown, ChevronUp } from 'lucide-react';
import React from 'react';

export function AccordionCard({
  open,
  onClick,
  title,
  children,
}: {
  open: boolean;
  onClick: () => void;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="mb-4 p-1">
      <CardHeader
        className="flex flex-row items-center justify-between cursor-pointer select-none px-4 py-3"
        onClick={onClick}
      >
        <CardTitle className="text-base font-semibold">{title}</CardTitle>
        {open ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
      </CardHeader>
      {open && <CardContent className="pt-0 p-1">{children}</CardContent>}
    </Card>
  );
} 