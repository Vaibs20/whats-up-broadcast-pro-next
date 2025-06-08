
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Send, 
  Plus, 
  Users, 
  Clock,
  CheckCircle,
  AlertCircle
} from "lucide-react";

export default function Broadcasts() {
  const campaigns = [
    { 
      id: 1, 
      name: "New Product Launch", 
      status: "sending", 
      template: "Welcome Message",
      recipients: 1920,
      sent: 1250,
      delivered: 1180,
      read: 890,
      scheduledAt: "2024-01-15 10:00 AM"
    },
    { 
      id: 2, 
      name: "Weekly Newsletter", 
      status: "scheduled", 
      template: "Newsletter Template",
      recipients: 3400,
      sent: 0,
      delivered: 0,
      read: 0,
      scheduledAt: "2024-01-20 09:00 AM"
    },
    { 
      id: 3, 
      name: "Cart Abandonment", 
      status: "completed", 
      template: "Cart Reminder",
      recipients: 890,
      sent: 890,
      delivered: 845,
      read: 623,
      scheduledAt: "2024-01-10 02:00 PM"
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'sending':
        return <Send className="w-4 h-4 text-blue-600" />;
      case 'scheduled':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Broadcast Campaigns</h1>
            <p className="text-gray-600">Create and manage your WhatsApp broadcast campaigns</p>
          </div>
          <Button className="bg-green-600 hover:bg-green-700">
            <Plus className="w-4 h-4 mr-2" />
            New Broadcast
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Send className="w-5 h-5" />
              All Campaigns
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {campaigns.map((campaign) => (
                <div key={campaign.id} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(campaign.status)}
                      <h4 className="font-medium">{campaign.name}</h4>
                      <Badge variant={
                        campaign.status === 'completed' ? 'default' :
                        campaign.status === 'sending' ? 'secondary' :
                        'outline'
                      }>
                        {campaign.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500">
                      Scheduled: {campaign.scheduledAt}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-4 mb-4">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <Users className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-500">Recipients</span>
                      </div>
                      <p className="font-semibold">{campaign.recipients.toLocaleString()}</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <Send className="w-4 h-4 text-blue-500" />
                        <span className="text-sm text-gray-500">Sent</span>
                      </div>
                      <p className="font-semibold text-blue-600">{campaign.sent.toLocaleString()}</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-gray-500">Delivered</span>
                      </div>
                      <p className="font-semibold text-green-600">{campaign.delivered.toLocaleString()}</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <AlertCircle className="w-4 h-4 text-purple-500" />
                        <span className="text-sm text-gray-500">Read</span>
                      </div>
                      <p className="font-semibold text-purple-600">{campaign.read.toLocaleString()}</p>
                    </div>
                  </div>
                  
                  {campaign.status === 'sending' && (
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full" 
                        style={{ width: `${(campaign.sent / campaign.recipients) * 100}%` }}
                      ></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
