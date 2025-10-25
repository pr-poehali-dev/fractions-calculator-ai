import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Badge } from '@/components/ui/badge';

const GraphVisualizerTab = () => {
  const [equation, setEquation] = useState('x^2');
  const [graphData, setGraphData] = useState<any[]>([]);
  const [error, setError] = useState('');

  const PRESET_FUNCTIONS = [
    { label: 'x²', value: 'x^2', color: '#0EA5E9' },
    { label: 'sin(x)', value: 'sin(x)', color: '#8B5CF6' },
    { label: '2x + 3', value: '2*x+3', color: '#F97316' },
    { label: 'x³ - 2x', value: 'x^3-2*x', color: '#D946EF' },
  ];

  const evaluateExpression = (expr: string, x: number): number => {
    try {
      const normalized = expr
        .replace(/\^/g, '**')
        .replace(/sin\(([^)]+)\)/g, 'Math.sin($1)')
        .replace(/cos\(([^)]+)\)/g, 'Math.cos($1)')
        .replace(/tan\(([^)]+)\)/g, 'Math.tan($1)')
        .replace(/sqrt\(([^)]+)\)/g, 'Math.sqrt($1)')
        .replace(/abs\(([^)]+)\)/g, 'Math.abs($1)')
        .replace(/log\(([^)]+)\)/g, 'Math.log($1)')
        .replace(/exp\(([^)]+)\)/g, 'Math.exp($1)');
      
      const result = eval(normalized);
      return isFinite(result) ? result : NaN;
    } catch {
      return NaN;
    }
  };

  const generateGraph = () => {
    setError('');
    
    if (!equation.trim()) {
      setError('Введите функцию');
      return;
    }

    try {
      const data = [];
      const range = 10;
      const step = 0.2;

      for (let x = -range; x <= range; x += step) {
        const y = evaluateExpression(equation, x);
        if (!isNaN(y) && Math.abs(y) < 100) {
          data.push({
            x: parseFloat(x.toFixed(2)),
            y: parseFloat(y.toFixed(2))
          });
        }
      }

      if (data.length === 0) {
        setError('Не удалось построить график. Проверьте формулу');
        return;
      }

      setGraphData(data);
    } catch (err) {
      setError('Ошибка в формуле. Используйте: x, +, -, *, /, ^, sin(), cos(), sqrt()');
    }
  };

  return (
    <Card className="shadow-xl border-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-2xl">
          <Icon name="LineChart" className="text-secondary" />
          Визуализация функций
        </CardTitle>
        <CardDescription className="text-base">
          Постройте график любой математической функции
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <label className="text-sm font-medium">Введите функцию (используйте x как переменную)</label>
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Например: x^2, sin(x), 2*x+3"
              value={equation}
              onChange={(e) => setEquation(e.target.value)}
              className="text-lg"
              onKeyPress={(e) => e.key === 'Enter' && generateGraph()}
            />
            <Button onClick={generateGraph} size="lg" className="px-6">
              <Icon name="Play" className="mr-2" size={18} />
              Построить
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-muted-foreground self-center">Примеры:</span>
          {PRESET_FUNCTIONS.map((func) => (
            <Badge
              key={func.value}
              variant="outline"
              className="cursor-pointer hover:bg-accent transition-colors px-3 py-1"
              onClick={() => setEquation(func.value)}
              style={{ borderColor: func.color }}
            >
              y = {func.label}
            </Badge>
          ))}
        </div>

        {error && (
          <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
            <Icon name="AlertCircle" className="text-destructive" size={20} />
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        {graphData.length > 0 && (
          <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20 animate-fade-in p-4">
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={graphData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="x" 
                  label={{ value: 'x', position: 'insideBottomRight', offset: -5 }}
                  stroke="hsl(var(--foreground))"
                />
                <YAxis 
                  label={{ value: 'y', angle: -90, position: 'insideLeft' }}
                  stroke="hsl(var(--foreground))"
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="y" 
                  stroke="#0EA5E9" 
                  strokeWidth={2}
                  dot={false}
                  name={`y = ${equation}`}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        )}

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="p-3 bg-muted/50 rounded-lg">
            <p className="font-medium mb-1">Операторы</p>
            <p className="text-muted-foreground">+, -, *, /, ^ (степень)</p>
          </div>
          <div className="p-3 bg-muted/50 rounded-lg">
            <p className="font-medium mb-1">Функции</p>
            <p className="text-muted-foreground">sin, cos, tan, sqrt, abs</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GraphVisualizerTab;
