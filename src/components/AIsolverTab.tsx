import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { ScrollArea } from '@/components/ui/scroll-area';

interface AISolverTabProps {
  aiInput: string;
  setAiInput: (value: string) => void;
  aiSolution: string;
  isProcessing: boolean;
  handleAISolve: () => void;
}

const AISolverTab = ({ aiInput, setAiInput, aiSolution, isProcessing, handleAISolve }: AISolverTabProps) => {
  return (
    <Card className="shadow-xl border-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-2xl">
          <Icon name="Sparkles" className="text-secondary" />
          ИИ-решатель YaSentAI
        </CardTitle>
        <CardDescription className="text-base">
          Опишите задачу на русском языке — получите пошаговое решение
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Textarea
          placeholder="Например: Реши уравнение 2x + 5 = 13 или Найди площадь круга радиусом 7 см"
          value={aiInput}
          onChange={(e) => setAiInput(e.target.value)}
          className="min-h-[120px] text-base resize-none"
        />
        <Button 
          onClick={handleAISolve} 
          size="lg"
          disabled={isProcessing || !aiInput.trim()}
          className="w-full h-14 text-lg font-semibold"
        >
          {isProcessing ? (
            <>
              <Icon name="Loader2" className="mr-2 animate-spin" />
              YaSentAI думает...
            </>
          ) : (
            <>
              <Icon name="Wand2" className="mr-2" />
              Решить с помощью YaSentAI
            </>
          )}
        </Button>

        {aiSolution && (
          <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20 animate-fade-in">
            <CardContent className="pt-6">
              <ScrollArea className="max-h-[500px]">
                <div className="prose max-w-none whitespace-pre-wrap">
                  {aiSolution}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        )}

        <div className="flex items-start gap-2 p-4 bg-muted/50 rounded-lg">
          <Icon name="Info" size={20} className="text-primary mt-0.5 flex-shrink-0" />
          <p className="text-sm text-muted-foreground">
            YaSentAI использует технологию YAPPERTAR ai от FantomProject DLLC LLC для понимания и решения математических задач
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AISolverTab;
