import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const EquationsTab = () => {
  return (
    <Card className="shadow-xl border-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-2xl">
          <Icon name="FunctionSquare" className="text-secondary" />
          Решение уравнений
        </CardTitle>
        <CardDescription className="text-base">
          Используйте ИИ-решатель для любых уравнений
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
  );
};

export default EquationsTab;
