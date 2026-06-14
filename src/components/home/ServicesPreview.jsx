import { motion } from "framer-motion";
import { ArrowRight, FileText, Search, PenTool, BarChart3, BookOpen, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { getPreviewServices } from "@/lib/local-data";
import { Skeleton } from "@/components/ui/skeleton";
import Lazy3DBackdrop from "@/components/home/Lazy3DBackdrop";
import ConstellationPoster from "@/components/home/ConstellationPoster";

const iconMap = {
  FileText,
  Search,
  PenTool,
  BarChart3,
  BookOpen,
  Users
};

const defaultServices = [
  { title: "Research Papers", description: "Comprehensive analytical and investigative research papers across all academic fields.", icon: "FileText" },
  { title: "Literature Reviews", description: "In-depth analysis and synthesis of existing research and scholarly articles.", icon: "Search" },
  { title: "Thesis Writing", description: "Complete thesis development support from proposal to final submission.", icon: "PenTool" },
  { title: "Data Analysis", description: "Statistical analysis and interpretation using advanced methodologies.", icon: "BarChart3" },
  { title: "Case Studies", description: "Detailed examination and analysis of real-world scenarios and situations.", icon: "BookOpen" },
  { title: "Academic Editing", description: "Professional editing and proofreading to ensure academic standards.", icon: "Users" }
];

export default function ServicesPreview() {
  const { data: services, isLoading } = useQuery({
    queryKey: ['services-preview'],
    queryFn: () => getPreviewServices(6),
  });

  const displayServices = services?.length > 0 ? services : defaultServices;

  return (
    <section className="py-24 bg-black relative overflow-hidden">
      {/* Subtle shared 3D motif; sparse + low opacity to keep cards legible */}
      <Lazy3DBackdrop
        poster={<ConstellationPoster glowClassName="h-[520px] w-[520px] bg-gradient-to-br from-white/[0.04] to-transparent" />}
        scene={{ count: 90, coreOpacity: 0.08, pointOpacity: 0.35 }}
      />
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-16"
        >
          <div>
            <span className="text-sm font-semibold text-gray-500 tracking-widest uppercase">
              What We Offer
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mt-4">
              Our Services
            </h2>
          </div>
          <Link to={createPageUrl("Services")} className="mt-6 md:mt-0">
            <Button variant="outline" className="border-white/30 text-white hover:bg-white hover:text-black group">
              View All Services
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-64 bg-white/10 rounded-2xl" />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayServices.map((service, index) => {
              const IconComponent = iconMap[service.icon] || FileText;
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="group"
                >
                  <div className="h-full bg-white/5 hover:bg-white border border-white/10 hover:border-gray-200 rounded-2xl p-8 transition-all duration-500">
                    <div className="w-12 h-12 bg-white group-hover:bg-black rounded-xl flex items-center justify-center mb-6 transition-colors duration-500">
                      <IconComponent className="w-6 h-6 text-black group-hover:text-white transition-colors duration-500" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-white group-hover:text-black mb-3 transition-colors duration-500">
                      {service.title}
                    </h3>
                    
                    <p className="text-gray-400 group-hover:text-gray-600 leading-relaxed transition-colors duration-500">
                      {service.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}