import { useState, useEffect } from "react";
import { Activity, Server, Wifi, AlertTriangle, CheckCircle, XCircle, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export const StatusMonitor = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const connectionStatus = {
    imap: { status: "connected", lastCheck: "2 seconds ago", uptime: "99.9%" },
    telegram: { status: "connected", lastCheck: "1 second ago", uptime: "100%" },
    server: { status: "running", lastCheck: "Now", uptime: "99.8%" },
  };

  const metrics = [
    { label: "CPU Usage", value: 23, max: 100, color: "success" },
    { label: "Memory Usage", value: 67, max: 100, color: "warning" },
    { label: "Network I/O", value: 15, max: 100, color: "primary" },
    { label: "Disk Usage", value: 45, max: 100, color: "success" },
  ];

  const recentEvents = [
    { id: 1, time: "14:32:15", event: "IMAP connection established", type: "success" },
    { id: 2, time: "14:31:45", event: "New email detected from orders@shop.com", type: "info" },
    { id: 3, time: "14:31:46", event: "Telegram notification sent successfully", type: "success" },
    { id: 4, time: "14:30:12", event: "IMAP heartbeat - connection healthy", type: "info" },
    { id: 5, time: "14:29:58", event: "Server startup completed", type: "success" },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "connected":
      case "running":
        return <CheckCircle className="h-4 w-4 text-success" />;
      case "disconnected":
      case "error":
        return <XCircle className="h-4 w-4 text-destructive" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-warning" />;
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-3 w-3 text-success" />;
      case "error":
        return <XCircle className="h-3 w-3 text-destructive" />;
      default:
        return <Clock className="h-3 w-3 text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-foreground">System Monitor</h2>
        <p className="text-muted-foreground">Real-time monitoring of all system components</p>
        <p className="text-sm text-muted-foreground">
          Last updated: {currentTime.toLocaleTimeString()}
        </p>
      </div>

      {/* Connection Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Server className="h-4 w-4 text-primary" />
              IMAP Connection
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              {getStatusIcon(connectionStatus.imap.status)}
              <Badge variant="default" className="bg-success/20 text-success">
                {connectionStatus.imap.status}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mb-1">
              Last check: {connectionStatus.imap.lastCheck}
            </p>
            <p className="text-xs text-muted-foreground">
              Uptime: {connectionStatus.imap.uptime}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Wifi className="h-4 w-4 text-primary" />
              Telegram Bot
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              {getStatusIcon(connectionStatus.telegram.status)}
              <Badge variant="default" className="bg-success/20 text-success">
                {connectionStatus.telegram.status}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mb-1">
              Last check: {connectionStatus.telegram.lastCheck}
            </p>
            <p className="text-xs text-muted-foreground">
              Uptime: {connectionStatus.telegram.uptime}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Activity className="h-4 w-4 text-primary" />
              Server Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              {getStatusIcon(connectionStatus.server.status)}
              <Badge variant="default" className="bg-success/20 text-success">
                {connectionStatus.server.status}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mb-1">
              Last check: {connectionStatus.server.lastCheck}
            </p>
            <p className="text-xs text-muted-foreground">
              Uptime: {connectionStatus.server.uptime}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* System Metrics */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            System Metrics
          </CardTitle>
          <CardDescription>Real-time system performance indicators</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {metrics.map((metric, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-foreground">{metric.label}</span>
                  <span className="text-muted-foreground">{metric.value}%</span>
                </div>
                <Progress 
                  value={metric.value} 
                  className="h-2"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Events */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Recent Events
            </CardTitle>
            <CardDescription>Latest system events and activities</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            Clear Logs
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {recentEvents.map((event) => (
              <div key={event.id} className="flex items-start gap-3 p-3 bg-background/50 rounded-lg border border-border/50">
                {getEventIcon(event.type)}
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground">{event.event}</p>
                  <p className="text-xs text-muted-foreground">{event.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};