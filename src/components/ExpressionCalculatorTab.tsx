import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

interface ExpressionCalculatorTabProps {
  expression: string;
  setExpression: (value: string) => void;
  expressionResult: string;
  calculateExpression: () => void;
}

const ExpressionCalculatorTab = ({
  expression,
  setExpression,
  expressionResult,
  calculateExpression
}: ExpressionCalculatorTabProps) => {
  return (
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
  );
};

export default ExpressionCalculatorTab;
