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
    <Card className={`mb-4 p-1 transition-all duration-200 ${open ? 'border-primary' : 'border-gray-200'}`}>
      <CardHeader
        className="flex flex-row items-center justify-between cursor-pointer select-none px-4 py-3 hover:bg-gray-50 transition-colors"
        onClick={onClick}
      >
        <CardTitle className={`text-base font-semibold ${open ? 'text-primary' : 'text-gray-700'}`}>
          {title}
        </CardTitle>
        {open ? <ChevronUp className="w-5 h-5 text-primary" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
      </CardHeader>
      {open && <CardContent className="pt-0 p-1">{children}</CardContent>}
    </Card>
  );
} 