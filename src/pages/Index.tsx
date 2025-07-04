import { useState } from "react";
import { Mail, Settings, Activity, Zap, Shield, CheckCircle, AlertCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EmailConfig } from "@/components/EmailConfig";
import { TelegramConfig } from "@/components/TelegramConfig";
import { StatusMonitor } from "@/components/StatusMonitor";
import { NotificationHistory } from "@/components/NotificationHistory";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const stats = [
    { label: "Total Emails Monitored", value: "1,247", icon: Mail, color: "primary" },
    { label: "Notifications Sent", value: "89", icon: Zap, color: "success" },
    { label: "Active Connections", value: "3", icon: Activity, color: "warning" },
    { label: "Uptime", value: "99.9%", icon: Shield, color: "primary" },
  ];

  const recentNotifications = [
    { id: 1, subject: "New order confirmation", from: "orders@example.com", status: "sent", time: "2 minutes ago" },
    { id: 2, subject: "Password reset request", from: "security@example.com", status: "sent", time: "15 minutes ago" },
    { id: 3, subject: "Monthly report", from: "reports@example.com", status: "failed", time: "1 hour ago" },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "sent": return <CheckCircle className="h-4 w-4 text-success" />;
      case "failed": return <XCircle className="h-4 w-4 text-destructive" />;
      default: return <AlertCircle className="h-4 w-4 text-warning" />;
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "email-config":
        return <EmailConfig />;
      case "telegram-config":
        return <TelegramConfig />;
      case "monitor":
        return <StatusMonitor />;
      case "history":
        return <NotificationHistory />;
      default:
        return (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={index} className="bg-card/50 backdrop-blur-sm border-border/50">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {stat.label}
                    </CardTitle>
                    <stat.icon className="h-4 w-4 text-primary" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recent Notifications */}
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="text-foreground">Recent Notifications</CardTitle>
                <CardDescription>Latest email notifications sent to Telegram</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentNotifications.map((notification) => (
                    <div key={notification.id} className="flex items-center justify-between p-4 bg-background/50 rounded-lg border border-border/50">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(notification.status)}
                        <div>
                          <p className="font-medium text-foreground">{notification.subject}</p>
                          <p className="text-sm text-muted-foreground">From: {notification.from}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={notification.status === 'sent' ? 'default' : 'destructive'} className="mb-1">
                          {notification.status}
                        </Badge>
                        <p className="text-xs text-muted-foreground">{notification.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card/50 backdrop-blur-sm border-b border-border/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-primary rounded-lg shadow-glow">
                <Mail className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Email Monitor</h1>
                <p className="text-sm text-muted-foreground">IMAP to Telegram notifications</p>
              </div>
            </div>
            <Button variant="gradient" className="shadow-elegant">
              <Settings className="h-4 w-4" />
              Settings
            </Button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-card/30 backdrop-blur-sm border-b border-border/50">
        <div className="container mx-auto px-6">
          <div className="flex gap-1">
            {[
              { id: "dashboard", label: "Dashboard", icon: Activity },
              { id: "email-config", label: "Email Config", icon: Mail },
              { id: "telegram-config", label: "Telegram Config", icon: Zap },
              { id: "monitor", label: "Monitor", icon: Shield },
              { id: "history", label: "History", icon: Settings },
            ].map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "secondary" : "ghost"}
                className="flex items-center gap-2 rounded-none border-b-2 border-transparent data-[active=true]:border-primary"
                data-active={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </Button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;