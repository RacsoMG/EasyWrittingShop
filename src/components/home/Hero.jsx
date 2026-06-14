import { motion } from "framer-motion";
import { ArrowRight, BookOpen, GraduationCap, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import Lazy3DBackdrop from "@/components/home/Lazy3DBackdrop";
import ConstellationPoster from "@/components/home/ConstellationPoster";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center bg-black overflow-hidden">
      {/* Animated 3D backdrop with static fallback (non-blocking to LCP) */}
      <Lazy3DBackdrop
        poster={<ConstellationPoster showGrid />}
        scene={{ count: 220, coreOpacity: 0.18, pointOpacity: 0.7 }}
      />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-8"
            >
              <Award className="w-4 h-4 text-white" />
              <span className="text-white/80 text-sm font-medium">Excellence in Academic Research</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
              Easy
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400">
                WorkShop
              </span>
            </h1>

            <p className="text-xl text-gray-400 leading-relaxed mb-10 max-w-lg">
              Your trusted partner for academic excellence. We provide comprehensive research solutions 
              for college, undergraduate, and postgraduate levels across multiple disciplines.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to={createPageUrl("Services")}>
                <Button size="lg" className="bg-white text-black hover:bg-gray-200 group px-8 h-14 text-base">
                  Explore Services
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to={createPageUrl("Contact")}>
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 h-14 px-8 text-base">
                  Contact Us
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:block"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-gray-600/20 to-gray-800/20 rounded-3xl blur-2xl" />
              <div className="relative grid grid-cols-2 gap-4">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
                >
                  <BookOpen className="w-10 h-10 text-white mb-4" />
                  <h3 className="text-white font-semibold text-lg mb-2">Research Papers</h3>
                  <p className="text-gray-400 text-sm">Analytical & investigative works</p>
                </motion.div>

                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mt-8"
                >
                  <GraduationCap className="w-10 h-10 text-white mb-4" />
                  <h3 className="text-white font-semibold text-lg mb-2">Thesis Support</h3>
                  <p className="text-gray-400 text-sm">Masters & doctoral guidance</p>
                </motion.div>

                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 col-span-2"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm mb-1">Projects Completed</p>
                      <p className="text-4xl font-bold text-white">500+</p>
                    </div>
                    <div className="h-16 w-px bg-white/10" />
                    <div>
                      <p className="text-gray-400 text-sm mb-1">Success Rate</p>
                      <p className="text-4xl font-bold text-white">98%</p>
                    </div>
                    <div className="h-16 w-px bg-white/10" />
                    <div>
                      <p className="text-gray-400 text-sm mb-1">Fields Covered</p>
                      <p className="text-4xl font-bold text-white">15+</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2"
        >
          <div className="w-1 h-2 bg-white rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}