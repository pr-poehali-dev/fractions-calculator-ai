import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

interface FractionCalculatorTabProps {
  fraction1: { num: string; den: string };
  setFraction1: (value: { num: string; den: string }) => void;
  fraction2: { num: string; den: string };
  setFraction2: (value: { num: string; den: string }) => void;
  operation: string;
  setOperation: (value: string) => void;
  fractionResult: string;
  calculateFraction: () => void;
}

const FractionCalculatorTab = ({
  fraction1,
  setFraction1,
  fraction2,
  setFraction2,
  operation,
  setOperation,
  fractionResult,
  calculateFraction
}: FractionCalculatorTabProps) => {
  return (
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
  );
};

export default FractionCalculatorTab;
