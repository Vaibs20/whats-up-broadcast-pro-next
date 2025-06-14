
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { 
  FileText, 
  Plus, 
  CheckCircle, 
  Clock, 
  XCircle,
  Edit,
  Trash2,
  Search,
  Send
} from "lucide-react";
import { useTemplates, Template } from "@/hooks/useTemplates";
import { TemplateForm } from "@/components/TemplateForm";
import { toast } from "sonner";

export default function Templates() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [formOpen, setFormOpen] = useState(false);

  const queryParams = {
    ...(search && { search }),
    ...(statusFilter && statusFilter !== 'all' && { status: statusFilter }),
    ...(categoryFilter && categoryFilter !== 'all' && { category: categoryFilter }),
  };

  const {
    templates,
    isLoading,
    createTemplate,
    updateTemplate,
    deleteTemplate,
    isCreating,
    isUpdating,
    isDeleting,
  } = useTemplates(queryParams);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'rejected':
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return <FileText className="w-4 h-4 text-gray-600" />;
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
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleFormSubmit = (data: any) => {
    if (selectedTemplate) {
      updateTemplate({ id: selectedTemplate._id, data });
    } else {
      createTemplate(data);
    }
    setFormOpen(false);
    setSelectedTemplate(null);
  };

  const handleEdit = (template: Template) => {
    setSelectedTemplate(template);
    setFormOpen(true);
  };

  const handleDelete = (templateId: string) => {
    deleteTemplate(templateId);
  };

  const handleAddNew = () => {
    setSelectedTemplate(null);
    setFormOpen(true);
  };

  const handleSubmitForApproval = async (template: Template) => {
    try {
      // This would integrate with WhatsApp Business API
      // For now, we'll just update the status to pending
      updateTemplate({ 
        id: template._id, 
        data: { ...template, status: 'pending' as const }
      });
      toast.success('Template submitted for WhatsApp approval');
    } catch (error) {
      toast.error('Failed to submit template for approval');
    }
  };

  const filteredTemplates = templates.filter(template => 
    template.name.toLowerCase().includes(search.toLowerCase()) ||
    template.body.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Message Templates</h1>
            <p className="text-gray-600">Create and manage your WhatsApp message templates</p>
          </div>
          <Button onClick={handleAddNew} className="bg-green-600 hover:bg-green-700">
            <Plus className="w-4 h-4 mr-2" />
            Create Template
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                All Templates ({templates.length})
              </CardTitle>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input 
                    placeholder="Search templates..." 
                    className="pl-10 w-64"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="MARKETING">Marketing</SelectItem>
                    <SelectItem value="TRANSACTIONAL">Transactional</SelectItem>
                    <SelectItem value="UTILITY">Utility</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8">Loading templates...</div>
            ) : filteredTemplates.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                {search ? 'No templates match your search.' : 'No templates found. Create your first template to get started.'}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredTemplates.map((template) => (
                  <div key={template._id} className="flex items-start justify-between p-4 border rounded-lg hover:bg-gray-50">
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
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">{template.body}</p>
                      {template.variables.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-2">
                          {template.variables.map((variable, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {`{{${variable.name}}}`}
                            </Badge>
                          ))}
                        </div>
                      )}
                      <p className="text-xs text-gray-400">
                        Created {new Date(template.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-1 ml-4">
                      {template.status === 'draft' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleSubmitForApproval(template)}
                        >
                          <Send className="w-4 h-4 mr-1" />
                          Submit
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(template)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Template</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete "{template.name}"? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction 
                              onClick={() => handleDelete(template._id)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <TemplateForm
          open={formOpen}
          onOpenChange={setFormOpen}
          template={selectedTemplate}
          onSubmit={handleFormSubmit}
          isLoading={isCreating || isUpdating}
        />
      </div>
    </Layout>
  );
}
