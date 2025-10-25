import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { toast } from '@/components/ui/use-toast';
import PageHeader from '@/components/PageHeader';
import PageFooter from '@/components/PageFooter';
import AISolverTab from '@/components/AIsolverTab';
import FractionCalculatorTab from '@/components/FractionCalculatorTab';
import ExpressionCalculatorTab from '@/components/ExpressionCalculatorTab';
import EquationsTab from '@/components/EquationsTab';
import HistorySidebar from '@/components/HistorySidebar';
import ExamplesSidebar from '@/components/ExamplesSidebar';

interface HistoryItem {
  id: string;
  problem: string;
  solution: string;
  timestamp: Date;
}

const EXAMPLE_PROBLEMS = [
  'Реши уравнение 2x + 5 = 13',
  'Найди площадь круга радиусом 7 см',
  'Упрости выражение (3x + 2)(x - 4)',
  'Реши квадратное уравнение x² - 5x + 6 = 0',
  'Найди производную функции f(x) = 3x² + 2x - 1',
  'Вычисли 15% от 240'
];

const Index = () => {
  const [aiInput, setAiInput] = useState('');
  const [aiSolution, setAiSolution] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [fraction1, setFraction1] = useState({ num: '', den: '' });
  const [fraction2, setFraction2] = useState({ num: '', den: '' });
  const [operation, setOperation] = useState('+');
  const [fractionResult, setFractionResult] = useState('');
  const [expression, setExpression] = useState('');
  const [expressionResult, setExpressionResult] = useState('');

  const handleAISolve = async () => {
    if (!aiInput.trim()) return;
    
    setIsProcessing(true);
    setAiSolution('');
    
    try {
      const response = await fetch('https://functions.poehali.dev/e743e20c-5dcb-48da-aaa5-e971f72e1986', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ problem: aiInput })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Ошибка при решении задачи');
      }

      setAiSolution(data.solution);
      
      const newItem: HistoryItem = {
        id: Date.now().toString(),
        problem: aiInput,
        solution: data.solution,
        timestamp: new Date()
      };
      setHistory(prev => [newItem, ...prev.slice(0, 9)]);
      
      toast({
        title: "Решено!",
        description: "YaSentAI успешно решил вашу задачу",
      });
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Неизвестная ошибка';
      setAiSolution(`❌ **Ошибка:** ${errorMessage}\n\n💡 Проверьте:\n- Добавлен ли API ключ OpenAI\n- Корректность формулировки задачи`);
      
      toast({
        title: "Ошибка",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const loadFromHistory = (item: HistoryItem) => {
    setAiInput(item.problem);
    setAiSolution(item.solution);
    toast({
      title: "Загружено из истории",
      description: "Задача восстановлена"
    });
  };

  const handleSelectExample = (problem: string) => {
    setAiInput(problem);
    toast({
      title: "Пример загружен",
      description: "Нажмите 'Решить' для получения ответа"
    });
  };

  const calculateFraction = () => {
    const n1 = parseFloat(fraction1.num);
    const d1 = parseFloat(fraction1.den);
    const n2 = parseFloat(fraction2.num);
    const d2 = parseFloat(fraction2.den);

    if (isNaN(n1) || isNaN(d1) || isNaN(n2) || isNaN(d2) || d1 === 0 || d2 === 0) {
      setFractionResult('❌ Проверьте введенные данные');
      return;
    }

    let resultNum = 0;
    let resultDen = 0;

    switch(operation) {
      case '+':
        resultNum = n1 * d2 + n2 * d1;
        resultDen = d1 * d2;
        break;
      case '-':
        resultNum = n1 * d2 - n2 * d1;
        resultDen = d1 * d2;
        break;
      case '*':
        resultNum = n1 * n2;
        resultDen = d1 * d2;
        break;
      case '/':
        resultNum = n1 * d2;
        resultDen = d1 * n2;
        break;
    }

    const gcd = (a: number, b: number): number => b === 0 ? Math.abs(a) : gcd(b, a % b);
    const divisor = gcd(resultNum, resultDen);
    
    const finalNum = resultNum / divisor;
    const finalDen = resultDen / divisor;

    setFractionResult(`**Результат:** ${finalNum}/${finalDen}${finalDen === 1 ? ` = ${finalNum}` : ''}`);
  };

  const calculateExpression = () => {
    if (!expression.trim()) return;
    
    try {
      const sanitized = expression.replace(/[^0-9+\-*/().\s]/g, '');
      const result = eval(sanitized);
      setExpressionResult(`**Результат:** ${expression} = ${result}`);
    } catch {
      setExpressionResult('❌ Неверное выражение');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-blue-50/30 to-purple-50/30">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <PageHeader />

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Tabs defaultValue="ai" className="animate-scale-in">
              <TabsList className="grid w-full grid-cols-4 mb-8 h-auto p-2 bg-card shadow-lg">
                <TabsTrigger value="ai" className="flex items-center gap-2 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <Icon name="Sparkles" size={18} />
                  <span className="hidden sm:inline">ИИ-решатель</span>
                </TabsTrigger>
                <TabsTrigger value="fraction" className="flex items-center gap-2 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <Icon name="Divide" size={18} />
                  <span className="hidden sm:inline">Дроби</span>
                </TabsTrigger>
                <TabsTrigger value="calc" className="flex items-center gap-2 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <Icon name="Calculator" size={18} />
                  <span className="hidden sm:inline">Примеры</span>
                </TabsTrigger>
                <TabsTrigger value="equation" className="flex items-center gap-2 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <Icon name="FunctionSquare" size={18} />
                  <span className="hidden sm:inline">Уравнения</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="ai" className="animate-slide-in">
                <AISolverTab
                  aiInput={aiInput}
                  setAiInput={setAiInput}
                  aiSolution={aiSolution}
                  isProcessing={isProcessing}
                  handleAISolve={handleAISolve}
                />
              </TabsContent>

              <TabsContent value="fraction" className="animate-slide-in">
                <FractionCalculatorTab
                  fraction1={fraction1}
                  setFraction1={setFraction1}
                  fraction2={fraction2}
                  setFraction2={setFraction2}
                  operation={operation}
                  setOperation={setOperation}
                  fractionResult={fractionResult}
                  calculateFraction={calculateFraction}
                />
              </TabsContent>

              <TabsContent value="calc" className="animate-slide-in">
                <ExpressionCalculatorTab
                  expression={expression}
                  setExpression={setExpression}
                  expressionResult={expressionResult}
                  calculateExpression={calculateExpression}
                />
              </TabsContent>

              <TabsContent value="equation" className="animate-slide-in">
                <EquationsTab />
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            <HistorySidebar history={history} loadFromHistory={loadFromHistory} />
            <ExamplesSidebar examples={EXAMPLE_PROBLEMS} onSelectExample={handleSelectExample} />
          </div>
        </div>

        <PageFooter />
      </div>
    </div>
  );
};

export default Index;
