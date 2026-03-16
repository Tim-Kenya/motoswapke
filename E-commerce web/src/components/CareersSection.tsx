import React from "react";
import { Briefcase, MapPin, Heart, Clock, CarFront, ArrowRight } from "lucide-react";

const openJobs = [
  {
    id: 1,
    title: "Senior Frontend Engineer",
    department: "Engineering",
    location: "Nairobi (Hybrid)",
    type: "Full-time"
  },
  {
    id: 2,
    title: "Community Operations Lead",
    department: "Operations",
    location: "Remote (Kenya)",
    type: "Full-time"
  },
  {
    id: 3,
    title: "Content Marketing Specialist",
    department: "Marketing",
    location: "Nairobi",
    type: "Contract"
  }
];

const CareersSection: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-orange-50 to-white" id="careers">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 rounded-full px-4 py-1.5 mb-4 mx-auto">
            <Briefcase className="w-4 h-4" />
            <span className="text-sm font-medium">Careers</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Build the Future of <span className="text-orange-600">Mobility in Kenya</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We're looking for passionate riders, builders, and thinkers to help us transform how Kenya buys and sells vehicles.
          </p>
        </div>

        {/* Job Listings Preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {openJobs.map((job) => (
            <div key={job.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-orange-200 transition group">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-orange-100 text-orange-700 text-xs font-bold px-3 py-1 rounded-full">
                  {job.department}
                </span>
                <span className="bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1 rounded-full">
                  {job.type}
                </span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition">{job.title}</h3>
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <MapPin className="w-4 h-4 mr-1" />
                {job.location}
              </div>
              <button className="w-full bg-gray-100 hover:bg-orange-600 text-gray-700 hover:text-white py-2 rounded-lg font-medium transition text-sm">
                View Role
              </button>
            </div>
          ))}
        </div>

        {/* Culture Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {[
            { icon: Heart, title: "Health Coverage", desc: "Medical insurance for you & family" },
            { icon: Clock, title: "Flexible Work", desc: "Remote-friendly & flexible hours" },
            { icon: CarFront, title: "Vehicle Allowance", desc: "Annual stipend for maintenance" }
          ].map((benefit, i) => (
            <div key={i} className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-100">
              <div className="bg-orange-100 p-3 rounded-lg flex-shrink-0">
                <benefit.icon className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900">{benefit.title}</h4>
                <p className="text-sm text-gray-600">{benefit.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a href="#careers" className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-xl font-semibold transition shadow-md hover:shadow-lg">
            View All Open Roles <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default CareersSection;