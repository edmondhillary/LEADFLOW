import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getSectorImages } from '@/lib/images';
import { getLeadOverrides } from '@/lib/lead-template-data';
import { connectDB, Lead, WebsiteContent } from '@/lib/mongodb';
import { getTemplateName } from '@/config/sectors';
import { hasTemplate, loadTemplateLayout } from '@/lib/template-registry';

export const revalidate = 3600;

type Props = { params: Promise<{ slug: string }>; children: React.ReactNode };

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  await connectDB();
  const lead = await Lead.findOne({ slug });
  if (!lead) return { title: 'No encontrado' };

  const content = await WebsiteContent.findById(lead.contentRef);
  const imgs = getSectorImages(lead.sector);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://leadflow.vercel.app';
  const dynamicOg = `${baseUrl}/api/og/${slug}`;

  return {
    title: content?.seo?.metaTitle || `${lead.businessName} | ${lead.sector} en ${lead.city}`,
    description: content?.seo?.metaDesc || `${lead.businessName} - Servicios de ${lead.sector} en ${lead.city}.`,
    openGraph: {
      title: content?.seo?.metaTitle || lead.businessName,
      description: content?.seo?.metaDesc,
      type: 'website',
      images: [{ url: dynamicOg, width: 1200, height: 630 }, { url: imgs.og, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: content?.seo?.metaTitle || lead.businessName,
      description: content?.seo?.metaDesc,
      images: [dynamicOg],
    },
  };
}

export default async function BusinessLayout({ params, children }: Props) {
  const { slug } = await params;
  await connectDB();

  const lead = await Lead.findOne({ slug });
  if (!lead || lead.status === 'expired') notFound();

  const overrides = await getLeadOverrides(slug);
  const copyCity = overrides?.city || lead.city;
  const templateFallbackImage = getSectorImages(lead.sector).hero;
  const templateName = lead.templateUsed && hasTemplate(lead.templateUsed)
    ? lead.templateUsed
    : getTemplateName(lead.sector);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: lead.businessName,
    telephone: lead.phone,
    address: {
      '@type': 'PostalAddress',
      addressLocality: lead.city,
      addressCountry: lead.country,
    },
    url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://leadflow.vercel.app'}/${slug}`,
  };

  const ownerWa = '34617680026';
  const TemplateLayoutComponent = overrides ? await loadTemplateLayout(templateName) : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <script
        dangerouslySetInnerHTML={{
          __html: `(function(){
            var city=${JSON.stringify(copyCity || '')};
            var fallbackImg=${JSON.stringify(templateFallbackImage || '')};
            if(!city&& !fallbackImg) return;

            function replaceCityTokens(input){
              if(!input || !city) return input;
              return String(input)
                .replace(/\\bMADRID\\b/g, city.toUpperCase())
                .replace(/\\bMadrid\\b/g, city)
                .replace(/\\bBuenos Aires\\b/g, city)
                .replace(/\\bRecoleta\\b/g, city);
            }

            function patchTextNodes(){
              if(!city) return;
              var walker=document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null);
              var node;
              while((node=walker.nextNode())){
                var parent=node.parentElement;
                if(!parent) continue;
                var tag=(parent.tagName||'').toLowerCase();
                if(tag==='script'||tag==='style'||tag==='noscript') continue;
                var original=node.nodeValue||'';
                var next=replaceCityTokens(original);
                if(next!==original) node.nodeValue=next;
              }
            }

            function patchAttributes(){
              var attrs=['alt','title','aria-label','placeholder'];
              var els=document.querySelectorAll('*');
              for(var i=0;i<els.length;i++){
                var el=els[i];
                for(var j=0;j<attrs.length;j++){
                  var a=attrs[j];
                  var val=el.getAttribute(a);
                  if(!val) continue;
                  var next=replaceCityTokens(val);
                  if(next!==val) el.setAttribute(a,next);
                }
              }
            }

            function installImageFallback(){
              if(!fallbackImg) return;
              document.addEventListener('error', function(e){
                var t=e.target;
                if(!t || t.tagName!=='IMG') return;
                if(t.dataset && t.dataset.fallbackApplied==='1') return;
                if(t.dataset) t.dataset.fallbackApplied='1';
                if(t.getAttribute('src')!==fallbackImg) t.setAttribute('src', fallbackImg);
              }, true);
            }

            patchTextNodes();
            patchAttributes();
            installImageFallback();

            var __cityPatchTimer;
            var observer=new MutationObserver(function(){
              clearTimeout(__cityPatchTimer);
              __cityPatchTimer=setTimeout(function(){
                patchTextNodes();
                patchAttributes();
              }, 40);
            });
            observer.observe(document.body, { childList:true, subtree:true, characterData:true });
          })();`,
        }}
      />

      <div
        id="urgency-banner"
        style={{
          backgroundColor: '#c2410c',
          color: '#fff7ed',
          textAlign: 'center',
          padding: '10px 16px',
          fontSize: '14px',
          fontWeight: 500,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '8px',
          position: 'relative',
          zIndex: 200,
        }}
      >
        <span>
          ¿Quieres esta web para <strong style={{ fontWeight: 700 }}>{lead.businessName}</strong>?
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <span style={{ textDecoration: 'line-through', opacity: 0.7, fontSize: '13px' }}>2.500€</span>
          <span style={{ fontWeight: 700, fontSize: '15px' }}>desde 25€/mes</span>
          <span style={{ opacity: 0.8, fontSize: '12px' }}>
            · Oferta válida <span id="countdown" style={{ fontFamily: 'monospace', fontWeight: 700 }}>48:00:00</span>
          </span>
        </span>
        {ownerWa && (
          <a
            href={`https://wa.me/${ownerWa}?text=${encodeURIComponent(`Hola, he visto la web que han creado para ${lead.businessName} y me interesa. ¿Podemos hablar?`)}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              backgroundColor: '#fff',
              color: '#9a3412',
              fontWeight: 700,
              fontSize: '13px',
              padding: '5px 14px',
              borderRadius: '20px',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              whiteSpace: 'nowrap',
            }}
          >
            Me interesa
          </a>
        )}
      </div>

      {TemplateLayoutComponent ? (
        <TemplateLayoutComponent overrides={overrides!}>{children}</TemplateLayoutComponent>
      ) : (
        <main id="main-content">{children}</main>
      )}

      <img src={`/api/track/${lead._id}`} alt="" width={1} height={1} style={{ position: 'absolute', opacity: 0 }} />

      <script
        dangerouslySetInnerHTML={{
          __html: `(function(){const e=new Date("${lead.createdAt.toISOString()}"),x=new Date(e.getTime()+48*3600000),el=document.getElementById('countdown');if(!el)return;function u(){const d=x-Date.now();if(d<=0){el.textContent='¡Expirado!';return;}const h=Math.floor(d/3600000),m=Math.floor(d%3600000/60000),s=Math.floor(d%60000/1000);el.textContent=String(h).padStart(2,'0')+':'+String(m).padStart(2,'0')+':'+String(s).padStart(2,'0');}u();setInterval(u,1000);})();`,
        }}
      />
    </>
  );
}
