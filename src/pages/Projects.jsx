import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { getProjects } from "@/lib/local-data";
import { Skeleton } from "@/components/ui/skeleton";
import { Filter } from "lucide-react";

const defaultProjects = [
  { title: "Economic Impact Analysis", field: "economics", level: "postgraduate", year: 2024, image_url: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80", description: "Comprehensive study on market dynamics and economic policy effects in emerging markets." },
  { title: "Clinical Psychology Research", field: "psychology", level: "postgraduate", year: 2024, image_url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&q=80", description: "In-depth analysis of cognitive behavioral therapy outcomes in adolescent patients." },
  { title: "Medical Data Analytics", field: "medicine", level: "undergraduate", year: 2024, image_url: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80", description: "Statistical analysis of patient health records and treatment outcomes." },
  { title: "Business Strategy Analysis", field: "business", level: "postgraduate", year: 2023, image_url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80", description: "Strategic analysis of market entry strategies for multinational corporations." },
  { title: "Legal Framework Study", field: "law", level: "undergraduate", year: 2023, image_url: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80", description: "Comparative analysis of intellectual property laws across jurisdictions." },
  { title: "Engineering Feasibility Study", field: "engineering", level: "postgraduate", year: 2024, image_url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80", description: "Technical feasibility assessment for renewable energy infrastructure projects." },
  { title: "Educational Psychology Research", field: "education", level: "college", year: 2023, image_url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80", description: "Study on learning methodologies and student engagement strategies." },
  { title: "Behavioral Economics Study", field: "economics", level: "undergraduate", year: 2024, image_url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80", description: "Analysis of consumer decision-making patterns in digital marketplaces." }
];

const fieldColors = {
  economics: "bg-emerald-100 text-emerald-800 border-emerald-200",
  medicine: "bg-red-100 text-red-800 border-red-200",
  psychology: "bg-purple-100 text-purple-800 border-purple-200",
  engineering: "bg-blue-100 text-blue-800 border-blue-200",
  business: "bg-amber-100 text-amber-800 border-amber-200",
  law: "bg-slate-100 text-slate-800 border-slate-200",
  education: "bg-cyan-100 text-cyan-800 border-cyan-200",
  other: "bg-gray-100 text-gray-800 border-gray-200"
};

const filters = {
  field: ["all", "economics", "medicine", "psychology", "engineering", "business", "law", "education"],
  level: ["all", "college", "undergraduate", "postgraduate"]
};

export default function Projects() {
  const [activeField, setActiveField] = useState("all");
  const [activeLevel, setActiveLevel] = useState("all");

  const { data: projects, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: () => getProjects(),
  });

  const displayProjects = projects?.length > 0 ? projects : defaultProjects;
  
  const filteredProjects = displayProjects.filter(project => {
    const fieldMatch = activeField === "all" || project.field === activeField;
    const levelMatch = activeLevel === "all" || project.level === activeLevel;
    return fieldMatch && levelMatch;
  });

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="bg-black py-24 lg:py-32">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="text-sm font-semibold text-gray-500 tracking-widest uppercase">
              Our Portfolio
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mt-4 mb-6">
              Completed Projects
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed">
              Explore our portfolio of successfully completed research projects 
              across various academic fields and levels.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 border-b border-gray-100 sticky top-0 bg-white/95 backdrop-blur-sm z-20">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
            <div className="flex items-center gap-3">
              <Filter className="w-5 h-5 text-gray-500" />
              <span className="text-gray-500 font-medium">Filter by:</span>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <div className="flex flex-wrap gap-2">
                {filters.field.map(field => (
                  <Button
                    key={field}
                    variant={activeField === field ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveField(field)}
                    className={activeField === field ? "bg-black text-white" : ""}
                  >
                    {field === "all" ? "All Fields" : field.charAt(0).toUpperCase() + field.slice(1)}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-4 md:ml-auto md:justify-end">
            {filters.level.map(level => (
              <Button
                key={level}
                variant={activeLevel === level ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveLevel(level)}
                className={activeLevel === level ? "bg-gray-800 text-white" : "text-gray-600"}
              >
                {level === "all" ? "All Levels" : level.charAt(0).toUpperCase() + level.slice(1)}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6 lg:px-12">
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-96 rounded-2xl" />
              ))}
            </div>
          ) : (
            <>
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeField}-${activeLevel}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {filteredProjects.map((project, index) => (
                    <motion.div
                      key={project.title}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="group"
                    >
                      <div className="relative h-full bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100">
                        <div className="relative h-56 overflow-hidden">
                          <img
                            src={project.image_url}
                            alt={project.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                          
                          <div className="absolute top-4 right-4">
                            <Badge variant="secondary" className="bg-white/90 text-black font-semibold">
                              {project.year}
                            </Badge>
                          </div>
                          
                          <div className="absolute bottom-4 left-4 flex gap-2">
                            <Badge className={`${fieldColors[project.field] || fieldColors.other} border`}>
                              {project.field}
                            </Badge>
                            <Badge variant="secondary" className="bg-white/90 text-black">
                              {project.level}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="p-6">
                          <h3 className="text-xl font-bold text-black mb-3 group-hover:text-gray-700 transition-colors">
                            {project.title}
                          </h3>
                          <p className="text-gray-600 leading-relaxed text-sm">
                            {project.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
              
              {filteredProjects.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-gray-500 text-lg">No projects found matching your filters.</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </main>
  );
}