import { motion } from "framer-motion";
import { FileText, Search, PenTool, BarChart3, BookOpen, Users, GraduationCap, Briefcase, Scale, Brain, Microscope, Building2, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { getServices } from "@/lib/local-data";
import { Skeleton } from "@/components/ui/skeleton";

const iconMap = {
  FileText, Search, PenTool, BarChart3, BookOpen, Users, GraduationCap, Briefcase, Scale, Brain, Microscope, Building2
};

const defaultServices = [
  { title: "Research Papers", description: "Comprehensive analytical and investigative research papers across all academic fields. Our team of experts delivers thoroughly researched content with proper citations and methodology.", icon: "FileText", category: "research" },
  { title: "Literature Reviews", description: "In-depth analysis and synthesis of existing research and scholarly articles. We help you understand the current state of knowledge in your field.", icon: "Search", category: "research" },
  { title: "Thesis Writing", description: "Complete thesis development support from proposal to final submission. We guide you through every chapter with expert feedback.", icon: "PenTool", category: "postgraduate" },
  { title: "Dissertation Support", description: "Comprehensive assistance for doctoral dissertations including research design, data collection, analysis, and writing.", icon: "GraduationCap", category: "postgraduate" },
  { title: "Data Analysis", description: "Statistical analysis and interpretation using SPSS, R, Python, and other advanced tools. We handle both quantitative and qualitative data.", icon: "BarChart3", category: "research" },
  { title: "Case Studies", description: "Detailed examination and analysis of real-world scenarios. Perfect for business, law, medical, and social science students.", icon: "BookOpen", category: "undergraduate" },
  { title: "Academic Editing", description: "Professional editing and proofreading to ensure your work meets the highest academic standards and publication requirements.", icon: "Users", category: "college" },
  { title: "Research Proposals", description: "Help developing compelling research proposals that clearly articulate your research questions, methodology, and expected outcomes.", icon: "Briefcase", category: "postgraduate" }
];

const categories = [
  { key: "all", label: "All Services" },
  { key: "college", label: "College" },
  { key: "undergraduate", label: "Undergraduate" },
  { key: "postgraduate", label: "Postgraduate" },
  { key: "research", label: "Research" }
];

const fields = [
  { name: "Economics", icon: Building2 },
  { name: "Medicine", icon: Microscope },
  { name: "Psychology", icon: Brain },
  { name: "Law", icon: Scale },
  { name: "Business", icon: Briefcase },
  { name: "Engineering", icon: BarChart3 }
];

export default function Services() {
  const { data: services, isLoading } = useQuery({
    queryKey: ['services'],
    queryFn: () => getServices(),
  });

  const displayServices = services?.length > 0 ? services : defaultServices;

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
              Our Services
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mt-4 mb-6">
              Comprehensive Academic
              <span className="block text-gray-400">Research Solutions</span>
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed">
              From college papers to doctoral dissertations, we provide expert support 
              across all academic levels and disciplines.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Fields We Cover */}
      <section className="py-16 border-b border-gray-100">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-gray-500 mb-8"
          >
            Fields We Specialize In
          </motion.p>
          <div className="flex flex-wrap justify-center gap-6">
            {fields.map((field, index) => (
              <motion.div
                key={field.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3 bg-gray-50 px-6 py-3 rounded-full"
              >
                <field.icon className="w-5 h-5 text-gray-600" />
                <span className="font-medium text-gray-800">{field.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              What We Offer
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Each service is tailored to meet specific academic requirements and standards.
            </p>
          </motion.div>

          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <Skeleton key={i} className="h-64 rounded-2xl" />
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {displayServices.map((service, index) => {
                const IconComponent = iconMap[service.icon] || FileText;
                return (
                  <motion.div
                    key={service.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -8 }}
                    className="group"
                  >
                    <div className="h-full bg-gray-50 hover:bg-black border border-gray-100 hover:border-black rounded-2xl p-6 transition-all duration-500">
                      <div className="w-12 h-12 bg-black group-hover:bg-white rounded-xl flex items-center justify-center mb-5 transition-colors duration-500">
                        <IconComponent className="w-6 h-6 text-white group-hover:text-black transition-colors duration-500" />
                      </div>
                      
                      {service.category && (
                        <Badge variant="secondary" className="mb-3 bg-gray-200 group-hover:bg-white/20 group-hover:text-white text-xs transition-colors duration-500">
                          {service.category}
                        </Badge>
                      )}
                      
                      <h3 className="text-lg font-bold text-black group-hover:text-white mb-3 transition-colors duration-500">
                        {service.title}
                      </h3>
                      
                      <p className="text-gray-600 group-hover:text-gray-300 text-sm leading-relaxed transition-colors duration-500">
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

      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              Why Choose EasyWorkShop?
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { title: "Expert Researchers", description: "Our team consists of PhDs and experienced academics from top universities." },
              { title: "Original Work", description: "Every project is custom-written and checked for plagiarism." },
              { title: "Timely Delivery", description: "We respect your deadlines and deliver on time, every time." },
              { title: "24/7 Support", description: "Our support team is always available to answer your questions." },
              { title: "Confidential", description: "Your privacy is our priority. All work is strictly confidential." },
              { title: "Revisions Included", description: "We offer free revisions until you're completely satisfied." }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-4"
              >
                <CheckCircle className="w-6 h-6 text-black flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-black mb-1">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}