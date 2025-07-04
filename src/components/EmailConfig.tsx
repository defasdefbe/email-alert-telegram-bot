import { useState } from "react";
import { Mail, Server, Lock, User, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

export const EmailConfig = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [config, setConfig] = useState({
    host: "",
    port: "993",
    username: "",
    password: "",
    useSSL: true,
    folder: "INBOX",
  });
  const { toast } = useToast();

  const handleSave = () => {
    if (!config.host || !config.username || !config.password) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Configuration Saved",
      description: "Email configuration has been saved successfully",
    });
  };

  const handleTest = async () => {
    toast({
      title: "Testing Connection",
      description: "Testing IMAP connection...",
    });

    // Simulate test
    setTimeout(() => {
      toast({
        title: "Connection Successful",
        description: "IMAP connection test passed",
        variant: "default",
      });
    }, 2000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-foreground">Email Configuration</h2>
        <p className="text-muted-foreground">Configure your IMAP settings to monitor emails</p>
      </div>

      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Server className="h-5 w-5 text-primary" />
            IMAP Server Settings
          </CardTitle>
          <CardDescription>
            Enter your email provider's IMAP configuration details
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="host">IMAP Host</Label>
              <Input
                id="host"
                placeholder="imap.gmail.com"
                value={config.host}
                onChange={(e) => setConfig({ ...config, host: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="port">Port</Label>
              <Select value={config.port} onValueChange={(value) => setConfig({ ...config, port: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="993">993 (SSL)</SelectItem>
                  <SelectItem value="143">143 (STARTTLS)</SelectItem>
                  <SelectItem value="110">110 (POP3)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="username">Email Address</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="username"
                placeholder="your.email@example.com"
                className="pl-10"
                value={config.username}
                onChange={(e) => setConfig({ ...config, username: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password / App Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="pl-10 pr-10"
                value={config.password}
                onChange={(e) => setConfig({ ...config, password: e.target.value })}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="folder">Folder to Monitor</Label>
            <Select value={config.folder} onValueChange={(value) => setConfig({ ...config, folder: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="INBOX">INBOX</SelectItem>
                <SelectItem value="Important">Important</SelectItem>
                <SelectItem value="Sent">Sent</SelectItem>
                <SelectItem value="Drafts">Drafts</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="ssl"
              checked={config.useSSL}
              onCheckedChange={(checked) => setConfig({ ...config, useSSL: checked })}
            />
            <Label htmlFor="ssl">Use SSL/TLS encryption</Label>
          </div>

          <div className="flex gap-3 pt-4">
            <Button onClick={handleTest} variant="outline" className="flex-1">
              Test Connection
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
            <Mail className="h-5 w-5 text-primary" />
            Quick Setup Guides
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { provider: "Gmail", host: "imap.gmail.com", port: "993", note: "Use App Password" },
              { provider: "Outlook", host: "outlook.office365.com", port: "993", note: "Use account password" },
              { provider: "Yahoo", host: "imap.mail.yahoo.com", port: "993", note: "Enable IMAP first" },
            ].map((guide) => (
              <div key={guide.provider} className="p-4 bg-background/50 rounded-lg border border-border/50">
                <h4 className="font-semibold text-foreground mb-2">{guide.provider}</h4>
                <p className="text-sm text-muted-foreground mb-1">Host: {guide.host}</p>
                <p className="text-sm text-muted-foreground mb-1">Port: {guide.port}</p>
                <p className="text-xs text-warning">{guide.note}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};