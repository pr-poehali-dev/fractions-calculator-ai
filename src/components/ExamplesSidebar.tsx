import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface ExamplesSidebarProps {
  examples: string[];
  onSelectExample: (example: string) => void;
}

const ExamplesSidebar = ({ examples, onSelectExample }: ExamplesSidebarProps) => {
  return (
    <Card className="shadow-xl border-2 animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <Icon name="BookOpen" className="text-secondary" size={20} />
          Примеры задач
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {examples.map((problem, idx) => (
            <Button
              key={idx}
              variant="outline"
              className="w-full justify-start text-left h-auto py-3 px-4"
              onClick={() => onSelectExample(problem)}
            >
              <Icon name="ArrowRight" size={16} className="mr-2 flex-shrink-0" />
              <span className="text-sm">{problem}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ExamplesSidebar;
