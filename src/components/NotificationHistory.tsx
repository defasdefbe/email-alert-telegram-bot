import { useState } from "react";
import { History, Search, Filter, Download, CheckCircle, XCircle, Clock, Mail } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const NotificationHistory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const notifications = [
    {
      id: 1,
      timestamp: "2024-01-07 14:32:15",
      from: "orders@example.com",
      subject: "New Order #12345 Confirmation",
      status: "sent",
      attempts: 1,
      telegramMessageId: "msg_123456",
      processingTime: "0.3s",
    },
    {
      id: 2,
      timestamp: "2024-01-07 14:28:42",
      from: "security@example.com",
      subject: "Password Reset Request",
      status: "sent",
      attempts: 1,
      telegramMessageId: "msg_123455",
      processingTime: "0.2s",
    },
    {
      id: 3,
      timestamp: "2024-01-07 14:15:33",
      from: "reports@example.com",
      subject: "Monthly Sales Report - December 2023",
      status: "failed",
      attempts: 3,
      telegramMessageId: null,
      processingTime: "2.1s",
      error: "Telegram API rate limit exceeded",
    },
    {
      id: 4,
      timestamp: "2024-01-07 13:45:18",
      from: "support@example.com",
      subject: "Customer Support Ticket #789",
      status: "sent",
      attempts: 1,
      telegramMessageId: "msg_123454",
      processingTime: "0.4s",
    },
    {
      id: 5,
      timestamp: "2024-01-07 13:22:07",
      from: "marketing@example.com",
      subject: "Weekly Newsletter - January 2024",
      status: "sent",
      attempts: 1,
      telegramMessageId: "msg_123453",
      processingTime: "0.3s",
    },
    {
      id: 6,
      timestamp: "2024-01-07 12:58:33",
      from: "billing@example.com",
      subject: "Invoice #INV-2024-001",
      status: "pending",
      attempts: 0,
      telegramMessageId: null,
      processingTime: null,
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "sent":
        return <CheckCircle className="h-4 w-4 text-success" />;
      case "failed":
        return <XCircle className="h-4 w-4 text-destructive" />;
      case "pending":
        return <Clock className="h-4 w-4 text-warning" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      sent: "default",
      failed: "destructive",
      pending: "secondary",
    } as const;

    return (
      <Badge variant={variants[status as keyof typeof variants] || "secondary"}>
        {status}
      </Badge>
    );
  };

  const filteredNotifications = notifications.filter((notification) => {
    const matchesSearch = 
      notification.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.subject.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || notification.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: notifications.length,
    sent: notifications.filter(n => n.status === "sent").length,
    failed: notifications.filter(n => n.status === "failed").length,
    pending: notifications.filter(n => n.status === "pending").length,
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-foreground">Notification History</h2>
        <p className="text-muted-foreground">Complete history of email notifications</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total</p>
                <p className="text-2xl font-bold text-foreground">{stats.total}</p>
              </div>
              <Mail className="h-5 w-5 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Sent</p>
                <p className="text-2xl font-bold text-success">{stats.sent}</p>
              </div>
              <CheckCircle className="h-5 w-5 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Failed</p>
                <p className="text-2xl font-bold text-destructive">{stats.failed}</p>
              </div>
              <XCircle className="h-5 w-5 text-destructive" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold text-warning">{stats.pending}</p>
              </div>
              <Clock className="h-5 w-5 text-warning" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5 text-primary" />
            Notification Log
          </CardTitle>
          <CardDescription>Search and filter through notification history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by email or subject..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="sent">Sent Only</SelectItem>
                <SelectItem value="failed">Failed Only</SelectItem>
                <SelectItem value="pending">Pending Only</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>

          {/* Notification List */}
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {filteredNotifications.map((notification) => (
              <div key={notification.id} className="p-4 bg-background/50 rounded-lg border border-border/50">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(notification.status)}
                    <span className="font-medium text-foreground">{notification.subject}</span>
                  </div>
                  {getStatusBadge(notification.status)}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                  <div>
                    <p><span className="font-medium">From:</span> {notification.from}</p>
                    <p><span className="font-medium">Time:</span> {notification.timestamp}</p>
                  </div>
                  <div>
                    <p><span className="font-medium">Attempts:</span> {notification.attempts}</p>
                    {notification.processingTime && (
                      <p><span className="font-medium">Processing:</span> {notification.processingTime}</p>
                    )}
                  </div>
                  <div>
                    {notification.telegramMessageId && (
                      <p><span className="font-medium">Message ID:</span> {notification.telegramMessageId}</p>
                    )}
                    {notification.error && (
                      <p className="text-destructive"><span className="font-medium">Error:</span> {notification.error}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredNotifications.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No notifications found matching your criteria</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};