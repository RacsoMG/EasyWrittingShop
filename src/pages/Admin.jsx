import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, FileText, Users, Briefcase, Loader2, Upload, ArrowLeft } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  getAllServices,
  getProjects,
  getTeamMembers,
  createService,
  updateService,
  deleteService,
  createProject,
  updateProject,
  deleteProject,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
} from "@/lib/local-data";
import { Link, useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";

const iconOptions = ["FileText", "Search", "PenTool", "BarChart3", "BookOpen", "Users", "GraduationCap", "Briefcase", "Scale", "Brain", "Microscope", "Building2"];

export default function Admin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("services");

  // Check admin access
  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ['admin-user'],
    queryFn: () => Promise.resolve({ role: 'admin', name: 'Admin' }),
  });

  useEffect(() => {
    if (!userLoading && user?.role !== 'admin') {
      navigate(createPageUrl('Home'));
      toast.error("Access denied. Admin privileges required.");
    }
  }, [user, userLoading, navigate]);

  // Services
  const { data: services = [], isLoading: servicesLoading } = useQuery({
    queryKey: ['admin-services'],
    queryFn: () => getAllServices(),
  });

  // Projects
  const { data: projects = [], isLoading: projectsLoading } = useQuery({
    queryKey: ['admin-projects'],
    queryFn: () => getProjects(),
  });

  // Team
  const { data: team = [], isLoading: teamLoading } = useQuery({
    queryKey: ['admin-team'],
    queryFn: () => getTeamMembers(),
  });

  if (userLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    );
  }

  if (user?.role !== 'admin') {
    return null;
  }

  return (
    <main className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link to={createPageUrl("Home")} className="flex items-center gap-2 text-gray-500 hover:text-black mb-4 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Website
            </Link>
            <h1 className="text-3xl font-bold text-black">Admin Panel</h1>
            <p className="text-gray-600 mt-1">Manage your website content</p>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-white border mb-8">
            <TabsTrigger value="services" className="gap-2">
              <Briefcase className="w-4 h-4" />
              Services
            </TabsTrigger>
            <TabsTrigger value="projects" className="gap-2">
              <FileText className="w-4 h-4" />
              Projects
            </TabsTrigger>
            <TabsTrigger value="team" className="gap-2">
              <Users className="w-4 h-4" />
              Team
            </TabsTrigger>
          </TabsList>

          <TabsContent value="services">
            <ServicesManager 
              services={services} 
              isLoading={servicesLoading} 
              queryClient={queryClient} 
            />
          </TabsContent>

          <TabsContent value="projects">
            <ProjectsManager 
              projects={projects} 
              isLoading={projectsLoading} 
              queryClient={queryClient} 
            />
          </TabsContent>

          <TabsContent value="team">
            <TeamManager 
              team={team} 
              isLoading={teamLoading} 
              queryClient={queryClient} 
            />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}

// Services Manager Component
function ServicesManager({ services, isLoading, queryClient }) {
  const [editingService, setEditingService] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const createMutation = useMutation({
    mutationFn: (data) => createService(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-services'] });
      setDialogOpen(false);
      setEditingService(null);
      toast.success("Service created successfully");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => updateService({ id, data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-services'] });
      setDialogOpen(false);
      setEditingService(null);
      toast.success("Service updated successfully");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteService(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-services'] });
      toast.success("Service deleted successfully");
    },
  });

  const handleSubmit = (formData) => {
    if (editingService) {
      updateMutation.mutate({ id: editingService.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Services</CardTitle>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingService(null)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Service
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{editingService ? "Edit Service" : "Add Service"}</DialogTitle>
            </DialogHeader>
            <ServiceForm 
              service={editingService} 
              onSubmit={handleSubmit} 
              isLoading={createMutation.isPending || updateMutation.isPending} 
            />
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
          </div>
        ) : services.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No services yet. Add your first service.</p>
        ) : (
          <div className="space-y-4">
            {services.map((service) => (
              <div key={service.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${service.is_active ? 'bg-black' : 'bg-gray-300'}`}>
                    <FileText className={`w-5 h-5 ${service.is_active ? 'text-white' : 'text-gray-500'}`} />
                  </div>
                  <div>
                    <h3 className="font-medium text-black">{service.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className="text-xs">{service.category}</Badge>
                      {!service.is_active && <Badge variant="outline" className="text-xs">Inactive</Badge>}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => {
                      setEditingService(service);
                      setDialogOpen(true);
                    }}
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => deleteMutation.mutate(service.id)}
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function ServiceForm({ service, onSubmit, isLoading }) {
  const [formData, setFormData] = useState({
    title: service?.title || "",
    description: service?.description || "",
    icon: service?.icon || "FileText",
    category: service?.category || "research",
    order: service?.order || 0,
    is_active: service?.is_active ?? true,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label>Title</Label>
        <Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
      </div>
      <div className="space-y-2">
        <Label>Description</Label>
        <Textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} required />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Icon</Label>
          <Select value={formData.icon} onValueChange={(v) => setFormData({ ...formData, icon: v })}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {iconOptions.map((icon) => (
                <SelectItem key={icon} value={icon}>{icon}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Category</Label>
          <Select value={formData.category} onValueChange={(v) => setFormData({ ...formData, category: v })}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="college">College</SelectItem>
              <SelectItem value="undergraduate">Undergraduate</SelectItem>
              <SelectItem value="postgraduate">Postgraduate</SelectItem>
              <SelectItem value="research">Research</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Switch checked={formData.is_active} onCheckedChange={(v) => setFormData({ ...formData, is_active: v })} />
          <Label>Active</Label>
        </div>
        <div className="flex-1">
          <Label>Order</Label>
          <Input type="number" value={formData.order} onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })} />
        </div>
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
        {service ? "Update Service" : "Create Service"}
      </Button>
    </form>
  );
}

// Projects Manager Component
function ProjectsManager({ projects, isLoading, queryClient }) {
  const [editingProject, setEditingProject] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const createMutation = useMutation({
    mutationFn: (data) => createProject(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-projects'] });
      setDialogOpen(false);
      setEditingProject(null);
      toast.success("Project created successfully");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => updateProject({ id, data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-projects'] });
      setDialogOpen(false);
      setEditingProject(null);
      toast.success("Project updated successfully");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteProject(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-projects'] });
      toast.success("Project deleted successfully");
    },
  });

  const handleSubmit = (formData) => {
    if (editingProject) {
      updateMutation.mutate({ id: editingProject.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Projects</CardTitle>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingProject(null)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Project
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{editingProject ? "Edit Project" : "Add Project"}</DialogTitle>
            </DialogHeader>
            <ProjectForm 
              project={editingProject} 
              onSubmit={handleSubmit} 
              isLoading={createMutation.isPending || updateMutation.isPending} 
            />
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
          </div>
        ) : projects.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No projects yet. Add your first project.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project) => (
              <div key={project.id} className="relative group bg-white rounded-lg border overflow-hidden">
                <div className="aspect-video bg-gray-100">
                  {project.image_url && (
                    <img src={project.image_url} alt={project.title} className="w-full h-full object-cover" />
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-black truncate">{project.title}</h3>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="secondary" className="text-xs">{project.field}</Badge>
                    <Badge variant="outline" className="text-xs">{project.level}</Badge>
                    {project.is_featured && <Badge className="text-xs bg-amber-100 text-amber-800">Featured</Badge>}
                  </div>
                </div>
                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button 
                    size="icon" 
                    variant="secondary"
                    className="h-8 w-8"
                    onClick={() => {
                      setEditingProject(project);
                      setDialogOpen(true);
                    }}
                  >
                    <Pencil className="w-3 h-3" />
                  </Button>
                  <Button 
                    size="icon" 
                    variant="secondary"
                    className="h-8 w-8"
                    onClick={() => deleteMutation.mutate(project.id)}
                  >
                    <Trash2 className="w-3 h-3 text-red-500" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function ProjectForm({ project, onSubmit, isLoading }) {
  const [formData, setFormData] = useState({
    title: project?.title || "",
    description: project?.description || "",
    image_url: project?.image_url || "",
    field: project?.field || "economics",
    level: project?.level || "undergraduate",
    year: project?.year || new Date().getFullYear(),
    is_featured: project?.is_featured || false,
    is_active: project?.is_active ?? true,
  });
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const file_url = URL.createObjectURL(file);
    setFormData({ ...formData, image_url: file_url });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label>Title</Label>
        <Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
      </div>
      <div className="space-y-2">
        <Label>Description</Label>
        <Textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
      </div>
      <div className="space-y-2">
        <Label>Image</Label>
        <div className="flex gap-2">
          <Input value={formData.image_url} onChange={(e) => setFormData({ ...formData, image_url: e.target.value })} placeholder="Image URL" />
          <Button type="button" variant="outline" className="relative" disabled={uploading}>
            {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
            <input type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 opacity-0 cursor-pointer" />
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label>Field</Label>
          <Select value={formData.field} onValueChange={(v) => setFormData({ ...formData, field: v })}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {["economics", "medicine", "psychology", "engineering", "business", "law", "education", "other"].map((f) => (
                <SelectItem key={f} value={f}>{f}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Level</Label>
          <Select value={formData.level} onValueChange={(v) => setFormData({ ...formData, level: v })}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="college">College</SelectItem>
              <SelectItem value="undergraduate">Undergraduate</SelectItem>
              <SelectItem value="postgraduate">Postgraduate</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Year</Label>
          <Input type="number" value={formData.year} onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })} />
        </div>
      </div>
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <Switch checked={formData.is_featured} onCheckedChange={(v) => setFormData({ ...formData, is_featured: v })} />
          <Label>Featured</Label>
        </div>
        <div className="flex items-center gap-2">
          <Switch checked={formData.is_active} onCheckedChange={(v) => setFormData({ ...formData, is_active: v })} />
          <Label>Active</Label>
        </div>
      </div>
      <Button type="submit" className="w-full" disabled={isLoading || uploading}>
        {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
        {project ? "Update Project" : "Create Project"}
      </Button>
    </form>
  );
}

// Team Manager Component
function TeamManager({ team, isLoading, queryClient }) {
  const [editingMember, setEditingMember] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const createMutation = useMutation({
    mutationFn: (data) => createTeamMember(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-team'] });
      setDialogOpen(false);
      setEditingMember(null);
      toast.success("Team member added successfully");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => updateTeamMember({ id, data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-team'] });
      setDialogOpen(false);
      setEditingMember(null);
      toast.success("Team member updated successfully");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteTeamMember(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-team'] });
      toast.success("Team member removed successfully");
    },
  });

  const handleSubmit = (formData) => {
    if (editingMember) {
      updateMutation.mutate({ id: editingMember.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Team Members</CardTitle>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingMember(null)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Member
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{editingMember ? "Edit Team Member" : "Add Team Member"}</DialogTitle>
            </DialogHeader>
            <TeamMemberForm 
              member={editingMember} 
              onSubmit={handleSubmit} 
              isLoading={createMutation.isPending || updateMutation.isPending} 
            />
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
          </div>
        ) : team.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No team members yet. Add your first team member.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {team.map((member) => (
              <div key={member.id} className="relative group bg-white rounded-lg border overflow-hidden">
                <div className="aspect-square bg-gray-100">
                  {member.image_url && (
                    <img src={member.image_url} alt={member.name} className="w-full h-full object-cover" />
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-black truncate">{member.name}</h3>
                  <p className="text-sm text-gray-500 truncate">{member.position}</p>
                  <Badge variant="secondary" className="text-xs mt-2">{member.department}</Badge>
                </div>
                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button 
                    size="icon" 
                    variant="secondary"
                    className="h-8 w-8"
                    onClick={() => {
                      setEditingMember(member);
                      setDialogOpen(true);
                    }}
                  >
                    <Pencil className="w-3 h-3" />
                  </Button>
                  <Button 
                    size="icon" 
                    variant="secondary"
                    className="h-8 w-8"
                    onClick={() => deleteMutation.mutate(member.id)}
                  >
                    <Trash2 className="w-3 h-3 text-red-500" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function TeamMemberForm({ member, onSubmit, isLoading }) {
  const [formData, setFormData] = useState({
    name: member?.name || "",
    position: member?.position || "",
    bio: member?.bio || "",
    image_url: member?.image_url || "",
    email: member?.email || "",
    linkedin: member?.linkedin || "",
    department: member?.department || "research",
    order: member?.order || 0,
    is_active: member?.is_active ?? true,
  });
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const file_url = URL.createObjectURL(file);
    setFormData({ ...formData, image_url: file_url });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Name</Label>
          <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
        </div>
        <div className="space-y-2">
          <Label>Position</Label>
          <Input value={formData.position} onChange={(e) => setFormData({ ...formData, position: e.target.value })} required />
        </div>
      </div>
      <div className="space-y-2">
        <Label>Bio</Label>
        <Textarea value={formData.bio} onChange={(e) => setFormData({ ...formData, bio: e.target.value })} />
      </div>
      <div className="space-y-2">
        <Label>Photo</Label>
        <div className="flex gap-2">
          <Input value={formData.image_url} onChange={(e) => setFormData({ ...formData, image_url: e.target.value })} placeholder="Image URL" />
          <Button type="button" variant="outline" className="relative" disabled={uploading}>
            {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
            <input type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 opacity-0 cursor-pointer" />
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Email</Label>
          <Input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
        </div>
        <div className="space-y-2">
          <Label>LinkedIn URL</Label>
          <Input value={formData.linkedin} onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Department</Label>
          <Select value={formData.department} onValueChange={(v) => setFormData({ ...formData, department: v })}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="leadership">Leadership</SelectItem>
              <SelectItem value="research">Research</SelectItem>
              <SelectItem value="editing">Editing</SelectItem>
              <SelectItem value="support">Support</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Order</Label>
          <Input type="number" value={formData.order} onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })} />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Switch checked={formData.is_active} onCheckedChange={(v) => setFormData({ ...formData, is_active: v })} />
        <Label>Active</Label>
      </div>
      <Button type="submit" className="w-full" disabled={isLoading || uploading}>
        {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
        {member ? "Update Member" : "Add Member"}
      </Button>
    </form>
  );
}