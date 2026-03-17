import React from "react";
import { Tag, ChevronRight, UserIcon, Calendar, Clock } from "lucide-react";
import porsche911 from "../assets/porsche911.jfif";
import tvs from "../assets/tvs.jfif";

const blogPosts = [
  {
    id: 1,
    title: "5 Things to Check Before Buying a Used Vehicle in Kenya",
    excerpt: "Avoid costly mistakes with our expert checklist for inspecting second-hand vehicles.",
    image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=800",
    category: "Buying Tips",
    author: "David Kamau",
    date: "Mar 5, 2026",
    readTime: "6 min read"
  },
  {
    id: 2,
    title: "How to Price Your Vehicle for a Quick Sale in Nairobi",
    excerpt: "Data-driven strategies to attract serious buyers without undervaluing your vehicle.",
    image: porsche911,
    category: "Selling Guide",
    author: "Sarah Wanjiku",
    date: "Feb 28, 2026",
    readTime: "5 min read"
  },
  {
    id: 3,
    title: "Bajaj Boxer vs. TVS Raider: Which Delivery Vehicle Wins in 2026?",
    excerpt: "We compare fuel efficiency, maintenance costs, and resale value for Kenya's top delivery vehicles.",
    image: tvs,
    category: "Industry News",
    author: "James Ochieng",
    date: "Feb 20, 2026",
    readTime: "8 min read"
  }
];

const BlogSection: React.FC = () => {
  return (
    <section className="py-20 bg-white" id="blog">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 rounded-full px-4 py-1.5 mb-4">
              <Tag className="w-4 h-4" />
              <span className="text-sm font-medium">Blog</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Tips, Stories & <span className="text-orange-600">Industry News</span></h2>
            <p className="text-gray-500 mt-2">Expert advice from Kenya's vehicle community</p>
          </div>
          <a href="#blog" className="text-orange-600 font-semibold hover:text-orange-700 flex items-center gap-1 transition group">
            View all articles <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Featured Post */}
          <article className="lg:col-span-2 group cursor-pointer">
            <div className="relative h-64 rounded-2xl overflow-hidden mb-4">
              <img 
                src={blogPosts[0].image} 
                alt={blogPosts[0].title} 
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <span className="absolute bottom-4 left-4 bg-orange-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                {blogPosts[0].category}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition line-clamp-2">
              {blogPosts[0].title}
            </h3>
            <p className="text-gray-600 mb-4 line-clamp-2">{blogPosts[0].excerpt}</p>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <UserIcon className="w-4 h-4" /> {blogPosts[0].author}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" /> {blogPosts[0].date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" /> {blogPosts[0].readTime}
              </span>
            </div>
          </article>

          {/* Sidebar Posts */}
          <div className="space-y-4">
            {blogPosts.slice(1).map((post) => (
              <article key={post.id} className="flex gap-4 group cursor-pointer p-4 bg-gray-50 rounded-xl hover:bg-orange-50 transition">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-medium text-orange-600">{post.category}</span>
                  <h4 className="font-bold text-gray-900 mb-1 group-hover:text-orange-600 transition line-clamp-2 text-sm">
                    {post.title}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;