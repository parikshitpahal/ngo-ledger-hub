import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Plus, TreePine, Clock, CheckCircle, XCircle, TrendingUp, MapPin, Calendar, BarChart3, History } from "lucide-react";
import { Link } from "react-router-dom";

interface Project {
  id: string;
  title: string;
  project_type: string;
  area_hectares: number;
  location_name: string;
  status: string;
  estimated_co2_tons: number;
  created_at: string;
  verification_date: string | null;
  organization?: string;
}

export default function NGODashboard() {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "1",
      title: "Forest Restoration Project Alpha",
      project_type: "Reforestation",
      area_hectares: 125,
      location_name: "Amazon Basin, Brazil",
      status: "verified",
      estimated_co2_tons: 450,
      created_at: "2024-01-15T10:00:00Z",
      verification_date: "2024-02-20T14:30:00Z",
      organization: "Green Earth Initiative"
    },
    {
      id: "2",
      title: "Mangrove Conservation Delta",
      project_type: "Conservation",
      area_hectares: 85,
      location_name: "Sundarbans, Bangladesh",
      status: "pending",
      estimated_co2_tons: 320,
      created_at: "2024-03-10T08:00:00Z",
      verification_date: null,
      organization: "Green Earth Initiative"
    },
    {
      id: "3",
      title: "Urban Green Spaces Project",
      project_type: "Afforestation",
      area_hectares: 45,
      location_name: "Mumbai, India",
      status: "under_review",
      estimated_co2_tons: 180,
      created_at: "2024-03-25T12:00:00Z",
      verification_date: null,
      organization: "Green Earth Initiative"
    }
  ]);
  const [loading, setLoading] = useState(false);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "verified":
        return <Badge className="bg-secondary/10 text-secondary border-secondary/20">Verified</Badge>;
      case "pending":
        return (
          <Badge variant="outline" className="border-amber-200 text-amber-700">
            Pending Review
          </Badge>
        );
      case "under_review":
        return (
          <Badge variant="outline" className="border-blue-200 text-blue-700">
            Under Review
          </Badge>
        );
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>;
      case "tokenized":
        return <Badge className="bg-primary/10 text-primary border-primary/20">Tokenized</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified":
      case "tokenized":
        return <CheckCircle className="h-4 w-4 text-secondary" />;
      case "pending":
      case "under_review":
        return <Clock className="h-4 w-4 text-amber-500" />;
      case "rejected":
        return <XCircle className="h-4 w-4 text-destructive" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const totalCredits = projects
    .filter((p) => p.status === "verified" || p.status === "tokenized")
    .reduce((sum, p) => sum + p.estimated_co2_tons, 0);
  const pendingCredits = projects
    .filter((p) => p.status === "pending" || p.status === "under_review")
    .reduce((sum, p) => sum + p.estimated_co2_tons, 0);
  const approvedProjects = projects.filter((p) => p.status === "verified" || p.status === "tokenized").length;
  const successRate = projects.length > 0 ? Math.round((approvedProjects / projects.length) * 100) : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">NGO Dashboard</h1>
                <p className="text-muted-foreground">Track your carbon credit projects and manage submissions</p>
              </div>
              <Button asChild variant="outline">
                <Link to="/transaction-history">
                  <History className="h-4 w-4 mr-2" />
                  Transaction History
                </Link>
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-foreground">{projects.length}</span>
                  <TreePine className="h-5 w-5 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Verified Credits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-secondary">{totalCredits}</span>
                  <CheckCircle className="h-5 w-5 text-secondary" />
                </div>
                <p className="text-xs text-muted-foreground mt-1">tCO₂e earned</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Pending Review</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-amber-600">{pendingCredits}</span>
                  <Clock className="h-5 w-5 text-amber-500" />
                </div>
                <p className="text-xs text-muted-foreground mt-1">tCO₂e potential</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Success Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-foreground">{successRate}%</span>
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                <p className="text-xs text-muted-foreground mt-1">approval rate</p>
              </CardContent>
            </Card>
          </div>

          {/* Projects List */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Your Projects</CardTitle>
                  <CardDescription>Track the status of your submitted projects</CardDescription>
                </div>
                <Button asChild>
                  <Link to="/ngo/upload">
                    <Plus className="h-4 w-4 mr-2" />
                    Submit New Project
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {projects.length === 0 ? (
                <div className="text-center py-8">
                  <TreePine className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">No projects yet</h3>
                  <p className="text-muted-foreground mb-4">Start by submitting your first carbon credit project</p>
                  <Button asChild>
                    <Link to="/ngo/upload">
                      <Plus className="h-4 w-4 mr-2" />
                      Submit Your First Project
                    </Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {projects.map((project) => (
                    <Link
                      key={project.id}
                      to={`/project/${project.id}`}
                      className="block border border-border rounded-lg p-4 hover:bg-muted/30 transition-colors cursor-pointer"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-foreground">{project.title}</h3>
                            {getStatusBadge(project.status)}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <TreePine className="h-3 w-3" />
                              {project.project_type.replace("_", " ")}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {project.location_name}
                            </span>
                            <span className="flex items-center gap-1">
                              <BarChart3 className="h-3 w-3" />
                              {project.area_hectares} hectares
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-2 mb-1">
                            {getStatusIcon(project.status)}
                            <span className="font-semibold text-foreground">
                              {project.status === "verified" || project.status === "tokenized"
                                ? project.estimated_co2_tons
                                : project.status === "pending" || project.status === "under_review"
                                  ? `~${project.estimated_co2_tons}`
                                  : "0"}{" "}
                              tCO₂e
                            </span>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              Submitted: {new Date(project.created_at).toLocaleDateString()}
                            </div>
                            {project.verification_date && (
                              <div className="flex items-center gap-1 mt-1">
                                <CheckCircle className="h-3 w-3" />
                                Verified: {new Date(project.verification_date).toLocaleDateString()}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {(project.status === "pending" || project.status === "under_review") && (
                        <div className="mt-3">
                          <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                            <span>Verification Progress</span>
                            <span>{project.status === "under_review" ? "Under Review" : "Awaiting Review"}</span>
                          </div>
                          <Progress value={project.status === "under_review" ? 60 : 30} className="h-1" />
                        </div>
                      )}
                    </Link>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
