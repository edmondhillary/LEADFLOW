'use client';

import Link from 'next/link';
import Image from 'next/image';
import { blogPosts } from '../data';

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#f7f9fb]">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12">
          {/* Left Column (2/3) */}
          <div className="md:w-2/3">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-[#d2e4ff] text-[#00497e] px-4 py-2 rounded-full mb-8 font-medium text-sm">
              <span className="w-2 h-2 bg-[#00497e] rounded-full"></span>
              Guía Maestra 2026
            </div>

            {/* Title */}
            <h1 className="font-manrope font-extrabold text-6xl md:text-7xl text-[#002045] tracking-tight mb-8 leading-tight">
              Conocimiento hidráulico al alcance de tu mano
            </h1>
          </div>

          {/* Right Column (1/3) */}
          <div className="md:w-1/3 border-l-2 border-[#572900] pl-6">
            <p className="text-lg text-gray-700 italic leading-relaxed">
              Descubre nuestras guías técnicas, consejos de mantenimiento y soluciones prácticas para mantener tu infraestructura hidráulica en perfecto estado. Artículos redactados por especialistas con más de 15 años de experiencia.
            </p>
          </div>
        </div>
      </section>

      {/* Bento Grid Section */}
      <section className="px-6 md:px-12 pb-20">
        <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6">
          {/* Post 0 - Featured (8 cols) */}
          {blogPosts[0] && (
            <div className="col-span-12 md:col-span-8 group cursor-pointer">
              <div className="relative h-[400px] overflow-hidden rounded-lg">
                {blogPosts[0].image && (
                  <Image
                    src={blogPosts[0].image}
                    alt={blogPosts[0].title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                )}
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#002045]/60 to-transparent"></div>

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-8">
                  <span className="text-[#d2e4ff] text-sm font-semibold mb-4 inline-block">
                    {blogPosts[0].category}
                  </span>
                  <h2 className="text-white text-3xl font-bold mb-6">
                    {blogPosts[0].title}
                  </h2>
                  <button className="bg-white text-[#002045] px-6 py-3 rounded font-semibold hover:bg-gray-100 transition-colors w-fit">
                    Leer más
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Post 1 (4 cols) */}
          {blogPosts[1] && (
            <div className="col-span-12 md:col-span-4 group cursor-pointer">
              <div className="bg-[#f2f4f6] rounded-lg overflow-hidden">
                {blogPosts[1].image && (
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={blogPosts[1].image}
                      alt={blogPosts[1].title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}

                <div className="p-6">
                  <span className="text-[#e88532] text-xs font-semibold uppercase tracking-wider mb-3 block">
                    {blogPosts[1].category}
                  </span>
                  <h2 className="text-[#002045] text-xl font-bold mb-3">
                    {blogPosts[1].title}
                  </h2>
                  <Link
                    href={`/template-fontaneria/blog/${blogPosts[1].slug}`}
                    className="text-[#0061a5] font-semibold hover:underline text-sm"
                  >
                    Leer más →
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Post 2 (4 cols) - Dark dramatic */}
          {blogPosts[2] && (
            <div className="col-span-12 md:col-span-4 group cursor-pointer">
              <div className="bg-[#572900] rounded-lg p-6 h-full flex flex-col justify-between">
                <div>
                  <span className="inline-block mb-4">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
                    </svg>
                  </span>
                </div>

                <div className="mt-4">
                  <h2 className="text-white text-xl font-bold mb-3">
                    {blogPosts[2].title}
                  </h2>
                  <p className="text-white/80 text-sm mb-6">
                    {blogPosts[2].excerpt}
                  </p>
                </div>

                <button className="bg-white text-[#572900] px-6 py-2 rounded font-semibold hover:bg-gray-100 transition-colors w-fit">
                  Leer más
                </button>
              </div>
            </div>
          )}

          {/* Post 3 (8 cols) - Horizontal layout */}
          {blogPosts[3] && (
            <div className="col-span-12 md:col-span-8 group cursor-pointer">
              <div className="flex rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
                {/* Image Left */}
                {blogPosts[3].image && (
                  <div className="relative w-1/2 h-64">
                    <Image
                      src={blogPosts[3].image}
                      alt={blogPosts[3].title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}

                {/* Content Right */}
                <div className="w-1/2 p-8 flex flex-col justify-between">
                  <div>
                    <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-3">
                      {blogPosts[3].category}
                    </span>
                    <h2 className="text-[#002045] text-2xl font-bold mb-4">
                      {blogPosts[3].title}
                    </h2>
                    <p className="text-gray-600 text-sm mb-6">
                      {blogPosts[3].excerpt}
                    </p>
                  </div>

                  <Link
                    href={`/template-fontaneria/blog/${blogPosts[3].slug}`}
                    className="text-[#0061a5] font-semibold text-sm inline-block border-b-2 border-[#0061a5] hover:border-b-0 transition-all"
                  >
                    Leer más →
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Post 4 (12 cols) - Full width with blur and rotate */}
          {blogPosts[4] && (
            <div className="col-span-12 group cursor-pointer">
              <div className="bg-[#1a365d] rounded-lg p-8 md:p-12 relative overflow-hidden">
                {/* Decorative blur circle */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl -mr-48 -mt-48"></div>

                <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                  {/* Left side - Content */}
                  <div>
                    <div className="inline-flex items-center gap-2 bg-[#d2e4ff] text-[#00497e] px-4 py-2 rounded-full mb-8 font-medium text-sm">
                      <span className="w-2 h-2 bg-[#00497e] rounded-full"></span>
                      {blogPosts[4].category}
                    </div>

                    <h2 className="text-white text-4xl font-bold mb-6 leading-tight">
                      {blogPosts[4].title}
                    </h2>

                    <p className="text-[#86a0cd] mb-8 leading-relaxed">
                      {blogPosts[4].excerpt}
                    </p>

                    <button className="bg-[#371800] text-white px-8 py-3 rounded font-semibold hover:bg-[#4a2400] transition-colors">
                      Leer más
                    </button>
                  </div>

                  {/* Right side - Image with rotate effect */}
                  {blogPosts[4].image && (
                    <div className="relative h-80">
                      <div className="relative w-full h-full group-hover:rotate-0 rotate-3 transition-transform duration-300">
                        <Image
                          src={blogPosts[4].image}
                          alt={blogPosts[4].title}
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
