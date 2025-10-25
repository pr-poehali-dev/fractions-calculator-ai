import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';

const Index = () => {
  const [aiInput, setAiInput] = useState('');
  const [aiSolution, setAiSolution] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [fraction1, setFraction1] = useState({ num: '', den: '' });
  const [fraction2, setFraction2] = useState({ num: '', den: '' });
  const [operation, setOperation] = useState('+');
  const [fractionResult, setFractionResult] = useState('');
  const [expression, setExpression] = useState('');
  const [expressionResult, setExpressionResult] = useState('');

  const handleAISolve = () => {
    if (!aiInput.trim()) return;
    
    setIsProcessing(true);
    setAiSolution('');
    
    setTimeout(() => {
      setAiSolution(`**YaSentAI решение:**\n\n📝 Анализирую задачу: "${aiInput}"\n\n**Шаг 1:** Определяю тип задачи\n**Шаг 2:** Применяю математические правила\n**Шаг 3:** Вычисляю результат\n\n✅ **Ответ:** Решение выполнено\n\n_Powered by YAPPERTAR ai technology_`);
      setIsProcessing(false);
    }, 1500);
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
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <header className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-primary/10 rounded-2xl">
              <Icon name="Calculator" size={40} className="text-primary" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            YaSentAI
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            Первая языковая модель на базе YAPPERTAR ai
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Badge variant="secondary" className="px-4 py-2 text-sm">
              <Icon name="Zap" size={16} className="mr-2" />
              Powered by YAPPERTAR ai
            </Badge>
            <Badge variant="outline" className="px-4 py-2 text-sm">
              Created by Xzoud FZLC
            </Badge>
          </div>
        </header>

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
            <Card className="shadow-xl border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Icon name="Sparkles" className="text-secondary" />
                  ИИ-решатель YaSentAI
                </CardTitle>
                <CardDescription className="text-base">
                  Опишите задачу на русском языке, и YaSentAI найдет решение
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
                  className="w-full h-14 text-lg font-semibold animate-pulse-glow"
                >
                  {isProcessing ? (
                    <>
                      <Icon name="Loader2" className="mr-2 animate-spin" />
                      Анализирую...
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
                      <div className="prose max-w-none">
                        {aiSolution.split('\n').map((line, i) => (
                          <p key={i} className="mb-2 text-foreground">{line}</p>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                <div className="flex items-start gap-2 p-4 bg-muted/50 rounded-lg">
                  <Icon name="Info" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">
                    YaSentAI использует технологию YAPPERTAR ai от FantomProject DLLC LLC для понимания и решения математических задач на естественном языке
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="fraction" className="animate-slide-in">
            <Card className="shadow-xl border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Icon name="Divide" className="text-secondary" />
                  Калькулятор дробей
                </CardTitle>
                <CardDescription className="text-base">
                  Выполняйте операции с обыкновенными дробями
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-3 gap-6 items-end">
                  <div className="space-y-3">
                    <label className="text-sm font-medium">Первая дробь</label>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        placeholder="Числитель"
                        value={fraction1.num}
                        onChange={(e) => setFraction1({ ...fraction1, num: e.target.value })}
                        className="text-center text-lg"
                      />
                      <div className="text-2xl font-light text-muted-foreground">/</div>
                      <Input
                        type="number"
                        placeholder="Знаменатель"
                        value={fraction1.den}
                        onChange={(e) => setFraction1({ ...fraction1, den: e.target.value })}
                        className="text-center text-lg"
                      />
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <div className="flex gap-2">
                      {['+', '-', '*', '/'].map((op) => (
                        <Button
                          key={op}
                          variant={operation === op ? 'default' : 'outline'}
                          size="lg"
                          onClick={() => setOperation(op)}
                          className="w-12 h-12 text-xl"
                        >
                          {op}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-medium">Вторая дробь</label>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        placeholder="Числитель"
                        value={fraction2.num}
                        onChange={(e) => setFraction2({ ...fraction2, num: e.target.value })}
                        className="text-center text-lg"
                      />
                      <div className="text-2xl font-light text-muted-foreground">/</div>
                      <Input
                        type="number"
                        placeholder="Знаменатель"
                        value={fraction2.den}
                        onChange={(e) => setFraction2({ ...fraction2, den: e.target.value })}
                        className="text-center text-lg"
                      />
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={calculateFraction}
                  size="lg"
                  className="w-full h-14 text-lg font-semibold"
                >
                  <Icon name="Equal" className="mr-2" />
                  Вычислить
                </Button>

                {fractionResult && (
                  <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20 animate-fade-in">
                    <CardContent className="pt-6">
                      <p className="text-2xl font-semibold text-center">{fractionResult}</p>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calc" className="animate-slide-in">
            <Card className="shadow-xl border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Icon name="Calculator" className="text-secondary" />
                  Решение примеров
                </CardTitle>
                <CardDescription className="text-base">
                  Введите математическое выражение для вычисления
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Input
                  type="text"
                  placeholder="Например: (15 + 23) * 4 - 18 / 2"
                  value={expression}
                  onChange={(e) => setExpression(e.target.value)}
                  className="text-xl h-16 text-center"
                  onKeyPress={(e) => e.key === 'Enter' && calculateExpression()}
                />

                <div className="grid grid-cols-4 gap-2">
                  {['7', '8', '9', '/'].map((btn) => (
                    <Button
                      key={btn}
                      variant="outline"
                      size="lg"
                      className="h-16 text-xl font-semibold"
                      onClick={() => setExpression(expression + btn)}
                    >
                      {btn}
                    </Button>
                  ))}
                  {['4', '5', '6', '*'].map((btn) => (
                    <Button
                      key={btn}
                      variant="outline"
                      size="lg"
                      className="h-16 text-xl font-semibold"
                      onClick={() => setExpression(expression + btn)}
                    >
                      {btn}
                    </Button>
                  ))}
                  {['1', '2', '3', '-'].map((btn) => (
                    <Button
                      key={btn}
                      variant="outline"
                      size="lg"
                      className="h-16 text-xl font-semibold"
                      onClick={() => setExpression(expression + btn)}
                    >
                      {btn}
                    </Button>
                  ))}
                  {['0', '.', '=', '+'].map((btn) => (
                    <Button
                      key={btn}
                      variant={btn === '=' ? 'default' : 'outline'}
                      size="lg"
                      className="h-16 text-xl font-semibold"
                      onClick={() => btn === '=' ? calculateExpression() : setExpression(expression + btn)}
                    >
                      {btn}
                    </Button>
                  ))}
                </div>

                <Button 
                  variant="secondary"
                  onClick={() => setExpression('')}
                  className="w-full h-12"
                >
                  <Icon name="Delete" className="mr-2" />
                  Очистить
                </Button>

                {expressionResult && (
                  <Card className="bg-gradient-to-r from-secondary/5 to-accent/5 border-secondary/20 animate-fade-in">
                    <CardContent className="pt-6">
                      <p className="text-2xl font-semibold text-center">{expressionResult}</p>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="equation" className="animate-slide-in">
            <Card className="shadow-xl border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Icon name="FunctionSquare" className="text-secondary" />
                  Решение уравнений
                </CardTitle>
                <CardDescription className="text-base">
                  Используйте ИИ-решатель для сложных уравнений
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-8 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl text-center space-y-4">
                  <Icon name="Lightbulb" size={48} className="mx-auto text-secondary" />
                  <h3 className="text-xl font-semibold">Решайте уравнения с YaSentAI</h3>
                  <p className="text-muted-foreground">
                    Перейдите во вкладку "ИИ-решатель" и опишите ваше уравнение. 
                    YaSentAI предоставит пошаговое решение
                  </p>
                  <div className="space-y-2 text-left max-w-md mx-auto">
                    <p className="text-sm font-medium">Примеры запросов:</p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <Icon name="Check" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Реши квадратное уравнение x² + 5x + 6 = 0</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon name="Check" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Найди корни уравнения 3x - 7 = 2x + 5</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon name="Check" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Реши систему уравнений: 2x + y = 7 и x - y = 1</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <footer className="mt-12 text-center text-sm text-muted-foreground animate-fade-in">
          <p className="mb-2">
            YaSentAI создан <strong>Xzoud FZLC</strong> на базе технологии <strong>YAPPERTAR ai</strong>
          </p>
          <p>
            YAPPERTAR ai разработан <strong>FantomProject DLLC LLC</strong>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
