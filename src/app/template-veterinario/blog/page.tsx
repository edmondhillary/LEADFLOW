'use client';

import Link from 'next/link';
import { blogPosts, images } from '../data';

const blogImages: Record<string, string> = {
  blog1: images.blog1,
  blog2: images.blog2,
  blog3: images.blog3,
};

const categories = ['All Topics', 'Puppy Care', 'Senior Pets', 'Health Tips', 'Behavior'];

export default function BlogPage(props: any = {}) {
  const ov = props.overrides as any;
  const baseHref = ov?.baseHref || '/template-veterinario';
  const featured = blogPosts[0];
  const rest = blogPosts.slice(1);

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative mb-24 px-8 pt-16 bg-[#fff8f4]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left */}
          <div className="lg:col-span-7 z-10">
            <span
              className="inline-block px-4 py-1 mb-6 rounded-full bg-[#cffcd5] text-[#3c6245] text-sm font-semibold tracking-wider uppercase"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Clinical Insights
            </span>
            <h1
              className="font-extrabold text-[#38312b] leading-tight tracking-tighter mb-8"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 'clamp(2.5rem, 7vw, 5rem)' }}
            >
              The Science of{' '}
              <br />
              <span className="text-[#166875] italic">Compassionate</span> Care
            </h1>
            <p className="text-xl text-[#665e56] max-w-xl leading-relaxed mb-10">
              Expert medical perspectives and nurturing advice for your companion&apos;s lifelong wellness journey.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-3 bg-[#fcf2eb] p-4 rounded-2xl">
                <span className="material-symbols-outlined text-[#166875]">verified</span>
                <span className="font-medium text-[#38312b]">Vet-Verified Advice</span>
              </div>
              <div className="flex items-center gap-3 bg-[#fcf2eb] p-4 rounded-2xl">
                <span className="material-symbols-outlined text-[#166875]">calendar_month</span>
                <span className="font-medium text-[#38312b]">Weekly Updates</span>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="lg:col-span-5 relative">
            <div className="rounded-2xl overflow-hidden aspect-[4/5] shadow-2xl">
              <img
                src={images.blogHero}
                alt="Golden Retriever in a sunlit veterinary exam room"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating card — hidden on mobile */}
            <div
              className="absolute -bottom-8 -left-8 md:-left-16 bg-white p-8 rounded-2xl shadow-xl max-w-xs hidden md:block border border-[#bbb0a7]/10"
              style={{ boxShadow: '0 40px 60px -15px rgba(56,49,43,0.08)' }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="material-symbols-outlined text-[#41684a]">medical_services</span>
                <span className="text-xs font-bold uppercase tracking-widest text-[#665e56]">Latest Research</span>
              </div>
              <h3
                className="font-bold text-lg mb-2 text-[#38312b]"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Vaccine schedules: A 2024 Guide
              </h3>
              <p className="text-sm text-[#665e56] mb-4 leading-relaxed">
                Ensuring your pet&apos;s immunity stays strong through every life stage.
              </p>
              <Link
                href={`/template-veterinario/blog/${blogPosts[0].slug}`}
                className="text-[#166875] font-bold text-sm flex items-center gap-1 group"
              >
                Leer artículo
                <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CATEGORIES ─── */}
      <section className="bg-[#fcf2eb] rounded-2xl p-8 md:p-12 mb-24 mx-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2
                className="text-3xl font-bold mb-2 text-[#38312b]"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Browse by Specialism
              </h2>
              <p className="text-[#665e56]">Targeted care for every pawspective.</p>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2 w-full md:w-auto">
              {categories.map((cat, i) => (
                <button
                  key={cat}
                  className={`px-5 py-2.5 rounded-full font-medium whitespace-nowrap text-sm transition-colors ${
                    i === 0
                      ? 'bg-[#166875] text-[#edfcff]'
                      : 'bg-white text-[#665e56] hover:bg-[#f1e6dd]'
                  }`}
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Article grid — bento */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Destacado large card */}
            <div className="md:col-span-2 group">
              <div
                className="bg-white rounded-2xl overflow-hidden h-full flex flex-col md:flex-row shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="md:w-1/2 overflow-hidden">
                  <img
                    src={blogImages[featured.image] || images.blog1}
                    alt={featured.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    style={{ minHeight: '240px' }}
                  />
                </div>
                <div className="p-8 md:w-1/2 flex flex-col justify-center">
                  <div
                    className="text-xs font-bold uppercase tracking-widest mb-4"
                    style={{ color: featured.categoryColor }}
                  >
                    {featured.category}
                  </div>
                  <h3
                    className="text-2xl font-bold mb-4 leading-tight text-[#38312b]"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    {featured.title}
                  </h3>
                  <p className="text-[#665e56] mb-6 text-sm leading-relaxed line-clamp-3">{featured.excerpt}</p>
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-sm text-[#827971] flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">schedule</span>
                      {featured.readTime} read
                    </span>
                    <Link
                      href={`/template-veterinario/blog/${featured.slug}`}
                      className="text-[#166875] font-bold flex items-center gap-1 group/btn text-sm"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      Explore
                      <span className="material-symbols-outlined group-hover/btn:translate-x-1 transition-transform text-sm">chevron_right</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Vertical card 1 */}
            <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="h-48 overflow-hidden">
                <img
                  src={blogImages[rest[0].image] || images.blog2}
                  alt={rest[0].title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-6">
                <div
                  className="text-xs font-bold uppercase tracking-widest mb-3"
                  style={{ color: rest[0].categoryColor }}
                >
                  {rest[0].category}
                </div>
                <h3
                  className="text-xl font-bold mb-3 text-[#38312b]"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  {rest[0].title}
                </h3>
                <p className="text-[#665e56] text-sm mb-6 leading-relaxed line-clamp-2">{rest[0].excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#827971] italic">By {rest[0].author}</span>
                  <Link
                    href={`/template-veterinario/blog/${rest[0].slug}`}
                    className="w-10 h-10 rounded-full bg-[#f1e6dd] flex items-center justify-center text-[#166875] group-hover:bg-[#166875] group-hover:text-[#edfcff] transition-colors"
                  >
                    <span className="material-symbols-outlined text-sm">north_east</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Vertical card 2 */}
            <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="h-48 overflow-hidden">
                <img
                  src={blogImages[rest[1].image] || images.blog3}
                  alt={rest[1].title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-6">
                <div
                  className="text-xs font-bold uppercase tracking-widest mb-3"
                  style={{ color: rest[1].categoryColor }}
                >
                  {rest[1].category}
                </div>
                <h3
                  className="text-xl font-bold mb-3 text-[#38312b]"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  {rest[1].title}
                </h3>
                <p className="text-[#665e56] text-sm mb-6 leading-relaxed line-clamp-2">{rest[1].excerpt}</p>
                <Link
                  href={`/template-veterinario/blog/${rest[1].slug}`}
                  className="text-[#166875] font-bold text-sm underline underline-offset-4 decoration-[#166875]/20 hover:decoration-[#166875] transition-all"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  Leer más
                </Link>
              </div>
            </div>

            {/* Destacado CTA card — spans 2 cols */}
            <div className="md:col-span-2 bg-[#166875] text-[#edfcff] rounded-2xl p-10 relative overflow-hidden flex flex-col justify-center">
              <div className="absolute right-0 top-0 w-64 h-64 bg-[#005c68] rounded-full blur-3xl opacity-50 -mr-20 -mt-20 pointer-events-none" />
              <div className="relative z-10 max-w-lg">
                <h3
                  className="text-3xl font-bold mb-4"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  Personalized Health Plans
                </h3>
                <p className="text-[#a4ebf9]/80 text-lg mb-8 leading-relaxed">
                  Our clinical sanctuary offers tailored wellness strategies for every life stage. Book a consultation today to discuss your pet&apos;s specific needs.
                </p>
                <div className="flex gap-4">
                  <Link
                    href={`${baseHref}/contacto`}
                    className="px-8 py-3 rounded-full bg-[#edfcff] text-[#166875] font-bold hover:bg-[#a4ebf9] transition-colors"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    Reservar ahora
                  </Link>
                  <Link
                    href={`${baseHref}/servicios`}
                    className="px-8 py-3 rounded-full border border-[#edfcff]/30 text-[#edfcff] font-bold hover:bg-[#edfcff]/10 transition-colors"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    Ver servicios
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── NEWSLETTER ─── */}
      <section className="max-w-4xl mx-auto text-center mb-24 px-8">
        <span className="material-symbols-outlined text-5xl text-[#166875] mb-6 block">mail</span>
        <h2
          className="text-4xl font-extrabold mb-4 text-[#38312b]"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          Join Our Caring Community
        </h2>
        <p className="text-[#665e56] text-lg mb-10 max-w-2xl mx-auto">
          Get monthly clinical updates, pet safety alerts, and seasonal care tips delivered straight to your inbox.
        </p>
        <form
          className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="email"
            placeholder="Your email address"
            className="flex-grow px-6 py-4 rounded-full bg-[#f6ece4] outline-none text-[#38312b] placeholder-[#bbb0a7] focus:ring-2 focus:ring-[#166875] border-none"
          />
          <button
            type="submit"
            className="px-10 py-4 rounded-full bg-[#166875] text-[#edfcff] font-bold shadow-lg hover:bg-[#005c68] transition-all whitespace-nowrap"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Suscribirme
          </button>
        </form>
        <p className="mt-4 text-xs text-[#827971]">We respect your privacy. No spam, just pure clinical empathy.</p>
      </section>
    </>
  );
}
