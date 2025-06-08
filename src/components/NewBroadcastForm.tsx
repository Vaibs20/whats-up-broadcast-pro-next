
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X, Users, FileText, Clock, Send } from "lucide-react";

interface NewBroadcastFormProps {
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export function NewBroadcastForm({ onClose, onSubmit }: NewBroadcastFormProps) {
  const [campaignName, setCampaignName] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const [scheduleType, setScheduleType] = useState("now");
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");
  const [variables, setVariables] = useState<Record<string, string>>({});

  const mockTemplates = [
    { id: "1", name: "Welcome Message", variables: ["name", "company"] },
    { id: "2", name: "Newsletter Template", variables: ["name", "month"] },
    { id: "3", name: "Cart Reminder", variables: ["name", "product"] },
  ];

  const mockGroups = [
    { id: "1", name: "VIP Customers", count: 450 },
    { id: "2", name: "Newsletter Subscribers", count: 1200 },
    { id: "3", name: "Recent Customers", count: 890 },
  ];

  const selectedTemplateData = mockTemplates.find(t => t.id === selectedTemplate);

  const handleGroupToggle = (groupId: string) => {
    setSelectedGroups(prev => 
      prev.includes(groupId) 
        ? prev.filter(id => id !== groupId)
        : [...prev, groupId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      campaignName,
      selectedTemplate,
      selectedGroups,
      scheduleType,
      scheduleDate,
      scheduleTime,
      variables,
    };
    onSubmit(data);
  };

  const totalRecipients = selectedGroups.reduce((total, groupId) => {
    const group = mockGroups.find(g => g.id === groupId);
    return total + (group?.count || 0);
  }, 0);

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Send className="w-5 h-5" />
          Create New Broadcast
        </CardTitle>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="campaignName">Campaign Name</Label>
            <Input
              id="campaignName"
              value={campaignName}
              onChange={(e) => setCampaignName(e.target.value)}
              placeholder="Enter campaign name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Select Template</Label>
            <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a template" />
              </SelectTrigger>
              <SelectContent>
                {mockTemplates.map((template) => (
                  <SelectItem key={template.id} value={template.id}>
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      {template.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedTemplateData && selectedTemplateData.variables.length > 0 && (
            <div className="space-y-3">
              <Label>Template Variables</Label>
              {selectedTemplateData.variables.map((variable) => (
                <div key={variable} className="space-y-1">
                  <Label htmlFor={variable} className="text-sm font-normal">
                    {variable}
                  </Label>
                  <Input
                    id={variable}
                    value={variables[variable] || ""}
                    onChange={(e) => setVariables(prev => ({ ...prev, [variable]: e.target.value }))}
                    placeholder={`Enter value for {{${variable}}}`}
                  />
                </div>
              ))}
            </div>
          )}

          <div className="space-y-3">
            <Label>Select Contact Groups</Label>
            <div className="grid grid-cols-1 gap-2">
              {mockGroups.map((group) => (
                <div
                  key={group.id}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    selectedGroups.includes(group.id)
                      ? "bg-green-50 border-green-200"
                      : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                  }`}
                  onClick={() => handleGroupToggle(group.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span className="font-medium">{group.name}</span>
                    </div>
                    <Badge variant="secondary">{group.count} contacts</Badge>
                  </div>
                </div>
              ))}
            </div>
            {selectedGroups.length > 0 && (
              <div className="text-sm text-gray-600">
                Total recipients: <span className="font-semibold">{totalRecipients.toLocaleString()}</span>
              </div>
            )}
          </div>

          <div className="space-y-3">
            <Label>Schedule</Label>
            <Select value={scheduleType} onValueChange={setScheduleType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="now">Send Now</SelectItem>
                <SelectItem value="schedule">Schedule for Later</SelectItem>
              </SelectContent>
            </Select>

            {scheduleType === "schedule" && (
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label htmlFor="scheduleDate">Date</Label>
                  <Input
                    id="scheduleDate"
                    type="date"
                    value={scheduleDate}
                    onChange={(e) => setScheduleDate(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="scheduleTime">Time</Label>
                  <Input
                    id="scheduleTime"
                    type="time"
                    value={scheduleTime}
                    onChange={(e) => setScheduleTime(e.target.value)}
                    required
                  />
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="flex-1 bg-green-600 hover:bg-green-700"
              disabled={!campaignName || !selectedTemplate || selectedGroups.length === 0}
            >
              {scheduleType === "now" ? "Send Now" : "Schedule Broadcast"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
