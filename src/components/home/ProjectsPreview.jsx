import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { getProjectPreview } from "@/lib/local-data";
import { Skeleton } from "@/components/ui/skeleton";

const defaultProjects = [
  {
    title: "Economic Impact Analysis",
    field: "economics",
    level: "postgraduate",
    image_url: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
    description: "Comprehensive study on market dynamics and economic policy effects."
  },
  {
    title: "Clinical Psychology Research",
    field: "psychology",
    level: "postgraduate",
    image_url: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=800&q=80",
    description: "In-depth analysis of cognitive behavioral therapy outcomes."
  },
  {
    title: "Medical Data Analytics",
    field: "medicine",
    level: "undergraduate",
    image_url: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80",
    description: "Statistical analysis of patient health records and outcomes."
  }
];

const fieldColors = {
  economics: "bg-emerald-100 text-emerald-800",
  medicine: "bg-red-100 text-red-800",
  psychology: "bg-purple-100 text-purple-800",
  engineering: "bg-blue-100 text-blue-800",
  business: "bg-amber-100 text-amber-800",
  law: "bg-slate-100 text-slate-800",
  education: "bg-cyan-100 text-cyan-800",
  other: "bg-gray-100 text-gray-800"
};

export default function ProjectsPreview() {
  const { data: projects, isLoading } = useQuery({
    queryKey: ['projects-preview'],
    queryFn: () => getProjectPreview(3),
  });

  const displayProjects = projects?.length > 0 ? projects : defaultProjects;

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-16"
        >
          <div>
            <span className="text-sm font-semibold text-gray-500 tracking-widest uppercase">
              Our Work
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-black mt-4">
              Featured Projects
            </h2>
          </div>
          <Link to={createPageUrl("Projects")} className="mt-6 md:mt-0">
            <Button variant="outline" className="border-black text-black hover:bg-black hover:text-white group">
              View All Projects
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-96 rounded-2xl" />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="relative h-full bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-500">
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={project.image_url}
                      alt={project.image_alt || project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 flex gap-2">
                      <Badge className={fieldColors[project.field] || fieldColors.other}>
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
                    <p className="text-gray-600 leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}