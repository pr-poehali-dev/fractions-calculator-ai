import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';

const PageHeader = () => {
  return (
    <header className="text-center mb-12 animate-fade-in">
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="p-3 bg-primary/10 rounded-2xl animate-pulse-glow">
          <Icon name="Brain" size={40} className="text-primary" />
        </div>
      </div>
      <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
        YaSentAI
      </h1>
      <p className="text-xl text-muted-foreground mb-6">
        Мощный математический ИИ-ассистент на базе YAPPERTAR ai
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
  );
};

export default PageHeader;
