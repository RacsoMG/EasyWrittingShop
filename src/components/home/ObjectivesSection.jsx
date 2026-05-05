import { motion } from "framer-motion";
import { Target, Eye, Heart, Lightbulb } from "lucide-react";

const objectives = [
  {
    icon: Target,
    title: "Our Mission",
    description: "To empower students and researchers by providing exceptional academic support services that help them achieve their educational goals with integrity and excellence."
  },
  {
    icon: Eye,
    title: "Our Vision",
    description: "To become the leading academic research solutions provider globally, recognized for quality, reliability, and transformative impact on educational outcomes."
  },
  {
    icon: Heart,
    title: "Our Values",
    description: "Integrity, excellence, innovation, and client-centricity guide everything we do. We believe in ethical practices and delivering value that exceeds expectations."
  },
  {
    icon: Lightbulb,
    title: "Our Approach",
    description: "We combine academic expertise with modern research methodologies to deliver customized solutions that meet the unique needs of each client and project."
  }
];

export default function ObjectivesSection() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-gray-500 tracking-widest uppercase">
            Who We Are
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-black mt-4 mb-6">
            Company Objectives
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Driven by purpose, guided by excellence. Our objectives shape every interaction 
            and deliverable we provide.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {objectives.map((objective, index) => (
            <motion.div
              key={objective.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="relative h-full bg-gray-50 hover:bg-black transition-all duration-500 rounded-2xl p-8 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-gray-200 to-transparent group-hover:from-gray-800 rounded-bl-full opacity-50 transition-colors duration-500" />
                
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-black group-hover:bg-white rounded-xl flex items-center justify-center mb-6 transition-colors duration-500">
                    <objective.icon className="w-7 h-7 text-white group-hover:text-black transition-colors duration-500" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-black group-hover:text-white mb-4 transition-colors duration-500">
                    {objective.title}
                  </h3>
                  
                  <p className="text-gray-600 group-hover:text-gray-300 leading-relaxed transition-colors duration-500">
                    {objective.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}