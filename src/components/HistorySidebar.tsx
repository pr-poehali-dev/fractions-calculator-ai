import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { ScrollArea } from '@/components/ui/scroll-area';

interface HistoryItem {
  id: string;
  problem: string;
  solution: string;
  timestamp: Date;
}

interface HistorySidebarProps {
  history: HistoryItem[];
  loadFromHistory: (item: HistoryItem) => void;
}

const HistorySidebar = ({ history, loadFromHistory }: HistorySidebarProps) => {
  return (
    <Card className="shadow-xl border-2 animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <Icon name="Clock" className="text-primary" size={20} />
          История решений
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px]">
          {history.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Icon name="History" size={32} className="mx-auto mb-2 opacity-50" />
              <p className="text-sm">История пуста</p>
            </div>
          ) : (
            <div className="space-y-3">
              {history.map((item) => (
                <Card
                  key={item.id}
                  className="cursor-pointer hover:bg-accent/50 transition-colors"
                  onClick={() => loadFromHistory(item)}
                >
                  <CardContent className="p-4">
                    <p className="text-sm font-medium line-clamp-2 mb-1">
                      {item.problem}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {item.timestamp.toLocaleTimeString('ru-RU', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default HistorySidebar;
