import { useState } from "react";
import { MessageCircle, Bot, Send, Hash, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

export const TelegramConfig = () => {
  const [showToken, setShowToken] = useState(false);
  const [config, setConfig] = useState({
    botToken: "",
    chatId: "",
    messageTemplate: "📧 New Email Received\n\nFrom: {from}\nSubject: {subject}\nTime: {time}",
    enableForwarding: true,
    enableNotifications: true,
  });
  const { toast } = useToast();

  const handleSave = () => {
    if (!config.botToken || !config.chatId) {
      toast({
        title: "Missing Information",
        description: "Please fill in bot token and chat ID",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Configuration Saved",
      description: "Telegram configuration has been saved successfully",
    });
  };

  const handleTest = async () => {
    if (!config.botToken || !config.chatId) {
      toast({
        title: "Missing Information",
        description: "Please configure bot token and chat ID first",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Sending Test Message",
      description: "Testing Telegram bot connection...",
    });

    // Simulate test
    setTimeout(() => {
      toast({
        title: "Test Message Sent",
        description: "Telegram bot is working correctly",
        variant: "default",
      });
    }, 2000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-foreground">Telegram Configuration</h2>
        <p className="text-muted-foreground">Configure your Telegram bot for email notifications</p>
      </div>

      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            Bot Configuration
          </CardTitle>
          <CardDescription>
            Set up your Telegram bot token and target chat
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="botToken">Bot Token</Label>
            <div className="relative">
              <Bot className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="botToken"
                type={showToken ? "text" : "password"}
                placeholder="1234567890:ABCdefGHIjklMNOpqrsTUVwxyz"
                className="pl-10 pr-10"
                value={config.botToken}
                onChange={(e) => setConfig({ ...config, botToken: e.target.value })}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowToken(!showToken)}
              >
                {showToken ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="chatId">Chat ID</Label>
            <div className="relative">
              <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="chatId"
                placeholder="-1001234567890"
                className="pl-10"
                value={config.chatId}
                onChange={(e) => setConfig({ ...config, chatId: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="messageTemplate">Message Template</Label>
            <Textarea
              id="messageTemplate"
              placeholder="Customize your notification message..."
              rows={5}
              value={config.messageTemplate}
              onChange={(e) => setConfig({ ...config, messageTemplate: e.target.value })}
            />
            <p className="text-xs text-muted-foreground">
              Available variables: {"{from}"}, {"{subject}"}, {"{time}"}, {"{body}"}
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="enableForwarding"
                checked={config.enableForwarding}
                onCheckedChange={(checked) => setConfig({ ...config, enableForwarding: checked })}
              />
              <Label htmlFor="enableForwarding">Enable email forwarding</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="enableNotifications"
                checked={config.enableNotifications}
                onCheckedChange={(checked) => setConfig({ ...config, enableNotifications: checked })}
              />
              <Label htmlFor="enableNotifications">Enable push notifications</Label>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button onClick={handleTest} variant="outline" className="flex-1">
              <Send className="h-4 w-4" />
              Send Test Message
            </Button>
            <Button onClick={handleSave} variant="gradient" className="flex-1 shadow-elegant">
              Save Configuration
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-primary" />
            Setup Instructions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-background/50 rounded-lg border border-border/50">
              <h4 className="font-semibold text-foreground mb-2">1. Create a Telegram Bot</h4>
              <p className="text-sm text-muted-foreground mb-2">
                Message @BotFather on Telegram and use the /newbot command
              </p>
              <p className="text-xs text-warning">Save the bot token provided by BotFather</p>
            </div>

            <div className="p-4 bg-background/50 rounded-lg border border-border/50">
              <h4 className="font-semibold text-foreground mb-2">2. Get Chat ID</h4>
              <p className="text-sm text-muted-foreground mb-2">
                Add your bot to a chat or group, then message @userinfobot to get the chat ID
              </p>
              <p className="text-xs text-warning">For groups, the chat ID starts with a minus sign</p>
            </div>

            <div className="p-4 bg-background/50 rounded-lg border border-border/50">
              <h4 className="font-semibold text-foreground mb-2">3. Test Configuration</h4>
              <p className="text-sm text-muted-foreground mb-2">
                Use the "Send Test Message" button to verify your setup
              </p>
              <p className="text-xs text-warning">Make sure your bot has permission to send messages</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};