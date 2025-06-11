"use client";

import { useEffect, useState } from 'react';
import { BookOpen, Search, Users, FileCheck, Mail, ChevronRight, Award, Globe, Clock, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const images = [
  'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/301926/pexels-photo-301926.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/2041540/pexels-photo-2041540.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=1200'
];

export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isSubmissionFormOpen, setIsSubmissionFormOpen] = useState(false);
  const [selectedJournal, setSelectedJournal] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const featuredArticles = [
    {
      title: "Impact of Feed Gap Variation on the Radiation Pattern of Half Wave Dipole Antenna",
      authors: "Omini, Ofem Uket; Anyasi, Francis I; Ojomu, Sunday A",
      category: "Engineering",
      views: "2.3k",
      downloads: "847"
    },
    {
      title: "Investigation of Algorithmic and Non-Algorithmic Software Cost Estimation Models",
      authors: "Duke, Stephen Orok",
      category: "Computer Science",
      views: "1.8k",
      downloads: "623"
    },
    {
      title: "Development of Operating System for Mobile Applications",
      authors: "D. O. Egete; B. I. Ele; D. U. Ashishie",
      category: "Technology",
      views: "3.1k",
      downloads: "1.2k"
    }
  ];

  const specialIssues = [
    { title: "Emerging Trends in Artificial Intelligence", deadline: "June 15, 2024", status: "Open" },
    { title: "Advancements in Renewable Energy Technologies", deadline: "July 20, 2024", status: "Open" },
    { title: "Smart Cities and Urban Sustainability", deadline: "August 10, 2024", status: "Open" },
    { title: "Next‑Generation Healthcare Technologies", deadline: "September 5, 2024", status: "Open" },
    { title: "Ethical and Social Implications of Emerging Technologies", deadline: "October 15, 2024", status: "Open" }
  ];

  const journalStats = [
    { num: "1,247", label: "Published Papers", icon: BookOpen },
    { num: "847", label: "Active Researchers", icon: Users },
    { num: "67", label: "Subject Areas", icon: Search },
    { num: "97%", label: "Satisfaction Rate", icon: Award }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Auto-scrolling Image Carousel Header */}
      <div className="relative h-[70vh] overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10" />
        {images.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={img}
              alt={`Academic research ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
        
        {/* Hero Content */}
        <div className="relative z-20 h-full flex items-center justify-center text-center px-4">
          <div className="max-w-4xl mx-auto space-y-6">
            <Badge variant="secondary" className="bg-white/20 backdrop-blur-sm text-white border-white/30">
              🏛️ University of Cross River State
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight">
              UNICROSS JOSET
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              Advancing Knowledge Through Academic Excellence — a modern platform for publishing groundbreaking research.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold"
                onClick={() => setIsSubmissionFormOpen(true)}
              >
                Submit Your Research
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-3 text-lg"
                onClick={() => document.getElementById('browse-section')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Browse Journals
              </Button>
            </div>
          </div>
        </div>

        {/* Image Navigation Dots */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentImageIndex ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      <main className="relative -mt-16 z-30">
        {/* Stats Cards */}
        <section className="container mx-auto px-4 mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {journalStats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <Card key={idx} className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <Icon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900 mb-1">{stat.num}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Featured Articles */}
        <section id="browse-section" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Latest Featured Articles</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Discover cutting-edge research from our global community of scholars
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {featuredArticles.map((article, idx) => (
                <Card key={idx} className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-0 shadow-md">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="outline" className="text-blue-600 border-blue-200">
                        {article.category}
                      </Badge>
                      <BookOpen className="h-5 w-5 text-gray-400" />
                    </div>
                    <CardTitle className="text-lg group-hover:text-blue-600 transition-colors line-clamp-3">
                      {article.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4 italic">{article.authors}</p>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>👁️ {article.views} views</span>
                      <span>⬇️ {article.downloads} downloads</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why Choose Our Platform</h2>
              <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                Experience the future of academic publishing with our cutting-edge platform
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                { 
                  Icon: Search, 
                  title: "Advanced Discovery", 
                  text: "AI-powered search and filtering to find relevant research in your field instantly",
                  features: ["Smart filters", "Citation tracking", "Related papers"]
                },
                { 
                  Icon: FileCheck, 
                  title: "Rigorous Review", 
                  text: "Quality assurance through our comprehensive double-blind peer review process",
                  features: ["Expert reviewers", "Fast turnaround", "Detailed feedback"]
                },
                { 
                  Icon: Globe, 
                  title: "Global Reach", 
                  text: "Connect with researchers and academics worldwide in our thriving community",
                  features: ["International indexing", "Open access", "DOI assignment"]
                }
              ].map(({ Icon, title, text, features }, idx) => (
                <Card key={idx} className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-all duration-300">
                  <CardContent className="p-8 text-center">
                    <div className="h-16 w-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-6">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-4">{title}</h3>
                    <p className="text-blue-100 mb-4">{text}</p>
                    <ul className="text-sm text-blue-200 space-y-1">
                      {features.map((feature, i) => (
                        <li key={i} className="flex items-center justify-center">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Call for Papers & Special Issues */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {/* Call for Papers */}
              <Card className="shadow-lg border-0">
                <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-t-lg">
                  <CardTitle className="text-2xl flex items-center">
                    📢 Call for Papers
                    <Badge className="ml-auto bg-white/20">Active</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="text-sm text-green-600 font-medium">Submission Deadline</div>
                      <div className="text-lg font-bold text-green-800">June 1, 2024</div>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="text-sm text-blue-600 font-medium">Review Period</div>
                      <div className="text-lg font-bold text-blue-800">2-3 days</div>
                    </div>
                  </div>
                  
                  <h4 className="font-semibold mb-3 text-gray-900">Publication Benefits:</h4>
                  <ul className="space-y-2 text-gray-600">
                    {[
                      "Effortless publishing process",
                      "Full-color soft copy with cover pages",
                      "Open‑access for high visibility",
                      "Indexing in Google Scholar & more",
                      "Professional e-certificate"
                    ].map((benefit, i) => (
                      <li key={i} className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Special Issues */}
              <Card className="shadow-lg border-0">
                <CardHeader className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-t-lg">
                  <CardTitle className="text-2xl">🔬 Special Issues</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-4">
                    {specialIssues.map((issue, i) => (
                      <div key={i} className="border-l-4 border-purple-200 pl-4 py-2 hover:bg-purple-50 transition-colors">
                        <div className="font-medium text-gray-900 mb-1">{issue.title}</div>
                        <div className="flex justify-between items-center">
                          <div className="text-sm text-gray-600 flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {issue.deadline}
                          </div>
                          <Badge variant="outline" className="text-green-600 border-green-200">
                            {issue.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* About & Editor's Note */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">About U-JOSET</h2>
              <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
            </div>
            
            <div className="prose prose-lg max-w-none text-gray-600 mb-12">
              <p className="text-center leading-relaxed">
                U‑JOSET is a bi‑annual, peer‑reviewed interdisciplinary journal published by CRUTECH, Calabar (March & September).
                Our mission is to promote high‑quality scientific, engineering, and technology research globally. Each manuscript
                is evaluated by at least two experts before publication, ensuring rigorous quality control.
              </p>
            </div>
            
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-0">
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <div className="h-16 w-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    PA
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2 text-gray-900">From the Editor‑in‑Chief</h3>
                    <blockquote className="italic text-gray-700 mb-4">
                      "Our mission is clear: to push boundaries, inspire curiosity, and ignite passion. Within U‑JOSET, you'll find a
                      rich tapestry of scholarly works, from fundamental inquiries to cutting‑edge technology…"
                    </blockquote>
                    <div className="text-sm font-medium text-blue-600">
                      — Assoc. Prof. Peter Neji Amba, Editor-in-Chief
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Indexing & Features */}
        <section className="py-20 bg-gray-900 text-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Global Recognition</h2>
              <p className="text-xl text-gray-300">Indexed and recognized by leading academic databases worldwide</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Indexing */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    🏷️ Indexed In
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    {["Google Scholar", "CrossRef", "CiteFactor", "e‑Library.ru", "ScienceGate", "Scite_Index", "Digital Depository", "Academia.edu"].map((idx, i) => (
                      <Badge key={i} variant="outline" className="border-gray-600 text-gray-300 justify-center">
                        {idx}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Features */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    🌟 Key Features
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-300">
                    {[
                      "Double‑blind peer review",
                      "50,000+ publications",
                      "No paperwork required",
                      "100% authentic content",
                      "Plagiarism‑free guarantee",
                      "Quick publication"
                    ].map((f, i) => (
                      <li key={i} className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Contact */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    📬 Get Support
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4">
                    Submit your article online or contact us for assistance.
                  </p>
                  <div className="flex items-center text-blue-400 mb-4">
                    <Mail className="h-4 w-4 mr-2" />
                    <a href="mailto:infoujoset@unicross.edu.ng" className="hover:underline">
                      infoujoset@unicross.edu.ng
                    </a>
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full border-gray-600 text-white hover:bg-gray-700"
                    onClick={() => setIsSubmissionFormOpen(true)}
                  >
                    Submit Article
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Share Your Research?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join our community of researchers and make your work accessible to a global audience.
            </p>
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold"
              onClick={() => setIsSubmissionFormOpen(true)}
            >
              Get Started Today
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>

      </main>

      {/* Simple Submission Modal */}
      {isSubmissionFormOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Submit Your Research</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                Thank you for your interest in submitting to U-JOSET. Please email your manuscript to:
              </p>
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <Mail className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                <a 
                  href="mailto:infoujoset@unicross.edu.ng" 
                  className="text-blue-600 font-medium hover:underline"
                >
                  infoujoset@unicross.edu.ng
                </a>
              </div>
              <Button 
                onClick={() => setIsSubmissionFormOpen(false)}
                className="w-full"
              >
                Close
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}