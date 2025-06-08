
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Plus, 
  CheckCircle, 
  Clock, 
  XCircle,
  MoreHorizontal
} from "lucide-react";

export default function Templates() {
  const templates = [
    { 
      id: 1, 
      name: "Welcome Message", 
      status: "approved", 
      body: "Hello {{name}}, welcome to our service!", 
      category: "MARKETING",
      language: "EN"
    },
    { 
      id: 2, 
      name: "Order Confirmation", 
      status: "pending", 
      body: "Your order #{{order_id}} has been confirmed and will be delivered by {{delivery_date}}.", 
      category: "TRANSACTIONAL",
      language: "EN"
    },
    { 
      id: 3, 
      name: "Payment Reminder", 
      status: "rejected", 
      body: "Your payment of ${{amount}} is due on {{due_date}}.", 
      category: "UTILITY",
      language: "EN"
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'rejected':
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Message Templates</h1>
            <p className="text-gray-600">Create and manage your WhatsApp message templates</p>
          </div>
          <Button className="bg-green-600 hover:bg-green-700">
            <Plus className="w-4 h-4 mr-2" />
            Create Template
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              All Templates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {templates.map((template) => (
                <div key={template.id} className="flex items-start justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-medium">{template.name}</h4>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(template.status)}
                        <Badge className={getStatusColor(template.status)}>
                          {template.status}
                        </Badge>
                      </div>
                      <Badge variant="outline">{template.category}</Badge>
                      <Badge variant="outline">{template.language}</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{template.body}</p>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
