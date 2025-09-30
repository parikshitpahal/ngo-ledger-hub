import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft, 
  CheckCircle, 
  XCircle, 
  MapPin, 
  Calendar, 
  TreePine, 
  BarChart3,
  FileText,
  Building2,
  Shield
} from 'lucide-react';
import ProjectMap from '@/components/ProjectMap';
import { useToast } from '@/hooks/use-toast';

// Mock data - replace with actual data fetching
const mockProjects = {
  "1": {
    id: "1",
    title: "Forest Restoration Project Alpha",
    project_type: "Reforestation",
    area_hectares: 125,
    location_name: "Amazon Basin, Brazil",
    status: "pending",
    estimated_co2_tons: 450,
    created_at: "2024-01-15T10:00:00Z",
    organization: "Green Earth Initiative",
    latitude: -3.4653,
    longitude: -62.2159,
    description: "This comprehensive reforestation project aims to restore 125 hectares of degraded forest land in the Amazon Basin. The project will plant native tree species and implement sustainable forest management practices to sequester approximately 450 tons of CO₂ equivalent over the next 10 years.",
    methodology: "VCS Methodology for Improved Forest Management (IFM)",
    project_duration: "10 years",
    species_planted: "Native Amazonian species including Brazil nut, mahogany, and rubber trees",
    monitoring_frequency: "Quarterly satellite monitoring with annual ground verification",
    verification_documents: ["Project Design Document", "Baseline Study", "Monitoring Plan"],
    uploader_name: "Dr. Maria Silva",
    uploader_email: "maria.silva@greenearthinitiative.org",
    upload_date: "2024-01-15",
    image_url: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800"
  },
  "2": {
    id: "2",
    title: "Mangrove Conservation Delta",
    project_type: "Conservation",
    area_hectares: 85,
    location_name: "Sundarbans, Bangladesh",
    status: "under_review",
    estimated_co2_tons: 320,
    created_at: "2024-03-10T08:00:00Z",
    organization: "Coastal Protection Alliance",
    latitude: 21.9497,
    longitude: 89.1833,
    description: "A critical mangrove conservation project protecting 85 hectares of coastal mangrove forests. This project prevents deforestation and degradation while supporting local communities through sustainable fishing practices and eco-tourism.",
    methodology: "AR-ACM0003: Afforestation and reforestation of lands in coastal wetlands",
    project_duration: "15 years",
    species_planted: "Mangrove species including Sundari, Gewa, and Keora",
    monitoring_frequency: "Bi-annual monitoring with drone and satellite imagery",
    verification_documents: ["Conservation Management Plan", "Biodiversity Assessment", "Community Agreement"],
    uploader_name: "Ahmed Hassan",
    uploader_email: "a.hassan@coastalprotection.org",
    upload_date: "2024-03-10",
    image_url: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800"
  },
  "3": {
    id: "3",
    title: "Urban Green Spaces Project",
    project_type: "Afforestation",
    area_hectares: 45,
    location_name: "Mumbai, India",
    status: "pending",
    estimated_co2_tons: 180,
    created_at: "2024-03-25T12:00:00Z",
    organization: "Urban Forest Foundation",
    latitude: 19.0760,
    longitude: 72.8777,
    description: "An innovative urban afforestation initiative creating 45 hectares of new green spaces across Mumbai. The project focuses on native species that thrive in urban environments while providing air quality improvement and urban cooling benefits.",
    methodology: "AR-ACM0001: Afforestation and Reforestation of degraded lands",
    project_duration: "8 years",
    species_planted: "Urban-adapted native species including Peepal, Neem, and Gulmohar",
    monitoring_frequency: "Monthly monitoring with IoT sensors and quarterly assessments",
    verification_documents: ["Urban Planning Permit", "Species Selection Report", "Air Quality Study"],
    uploader_name: "Priya Sharma",
    uploader_email: "p.sharma@urbanforest.in",
    upload_date: "2024-03-25",
    image_url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800"
  }
};

export default function ProjectReview() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const project = id ? mockProjects[id as keyof typeof mockProjects] : null;

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Project Not Found</CardTitle>
            <CardDescription>The requested project could not be found.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate('/')}>Return to Dashboard</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleApprove = () => {
    toast({
      title: "Project Approved",
      description: `${project.title} has been approved and will be tokenized.`,
    });
    setTimeout(() => navigate('/'), 1500);
  };

  const handleReject = () => {
    toast({
      title: "Project Rejected",
      description: `${project.title} has been rejected.`,
      variant: "destructive",
    });
    setTimeout(() => navigate('/'), 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <Button variant="ghost" asChild className="mb-4">
              <Link to="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">{project.title}</h1>
                <p className="text-muted-foreground">Review project details and make approval decision</p>
              </div>
              <Badge variant="outline" className="border-amber-200 text-amber-700">
                Awaiting Review
              </Badge>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            {/* Project Image */}
            <Card className="overflow-hidden">
              <div className="aspect-video relative">
                <img
                  src={project.image_url}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </Card>

            {/* Interactive Map */}
            <Card className="overflow-hidden">
              <div className="h-full min-h-[400px]">
                <ProjectMap
                  latitude={project.latitude}
                  longitude={project.longitude}
                  locationName={project.location_name}
                />
              </div>
            </Card>
          </div>

          {/* Project Details */}
          <Card className="mb-6">
            <Tabs defaultValue="overview" className="w-full">
              <CardHeader>
                <TabsList className="w-full justify-start">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="technical">Technical Details</TabsTrigger>
                  <TabsTrigger value="verification">Verification</TabsTrigger>
                  <TabsTrigger value="uploader">Uploader Info</TabsTrigger>
                </TabsList>
              </CardHeader>

              <CardContent>
                <TabsContent value="overview" className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Project Description</h3>
                    <p className="text-muted-foreground leading-relaxed">{project.description}</p>
                  </div>

                  <Separator />

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <TreePine className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Project Type</p>
                          <p className="text-muted-foreground">{project.project_type}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <BarChart3 className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Area Coverage</p>
                          <p className="text-muted-foreground">{project.area_hectares} hectares</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Calendar className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Project Duration</p>
                          <p className="text-muted-foreground">{project.project_duration}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Location</p>
                          <p className="text-muted-foreground">{project.location_name}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Building2 className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Organization</p>
                          <p className="text-muted-foreground">{project.organization}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <BarChart3 className="h-5 w-5 text-secondary mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Estimated CO₂ Sequestration</p>
                          <p className="text-secondary font-semibold">{project.estimated_co2_tons} tCO₂e</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="technical" className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Methodology</h3>
                    <p className="text-muted-foreground">{project.methodology}</p>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Species Information</h3>
                    <p className="text-muted-foreground">{project.species_planted}</p>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Monitoring Plan</h3>
                    <p className="text-muted-foreground">{project.monitoring_frequency}</p>
                  </div>
                </TabsContent>

                <TabsContent value="verification" className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Verification Documents</h3>
                    <div className="space-y-2">
                      {project.verification_documents.map((doc, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          <FileText className="h-5 w-5 text-primary" />
                          <span className="text-sm font-medium">{doc}</span>
                          <Button variant="ghost" size="sm" className="ml-auto">
                            View
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                      <Calendar className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Submission Date</p>
                        <p className="text-muted-foreground">
                          {new Date(project.created_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Shield className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Verification Status</p>
                        <p className="text-amber-600 font-medium">Pending Review</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="uploader" className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">Name</p>
                      <p className="text-foreground font-medium">{project.uploader_name}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">Email</p>
                      <p className="text-foreground">{project.uploader_email}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">Organization</p>
                      <p className="text-foreground">{project.organization}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">Upload Date</p>
                      <p className="text-foreground">
                        {new Date(project.upload_date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </CardContent>
            </Tabs>
          </Card>

          {/* Action Buttons */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Review the project details carefully before making your decision
                </p>
                <div className="flex gap-3">
                  <Button
                    variant="destructive"
                    size="lg"
                    onClick={handleReject}
                    className="min-w-[140px]"
                  >
                    <XCircle className="h-5 w-5 mr-2" />
                    Reject
                  </Button>
                  <Button
                    size="lg"
                    onClick={handleApprove}
                    className="min-w-[140px] bg-secondary hover:bg-secondary/90"
                  >
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Approve
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
