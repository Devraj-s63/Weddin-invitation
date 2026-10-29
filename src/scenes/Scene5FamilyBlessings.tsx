import React, { useState } from 'react';
import { Heart, Crown, Shield } from 'lucide-react';
import { RoyalDivider } from '../components/common/OrnateMotif';
import { RoyalBorder } from '../components/common/RoyalBorder';
import { useLanguage } from '../context/LanguageContext';

export const Scene5FamilyBlessings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'nanihal' | 'javai' | 'vishesh'>('nanihal');
  const { data, language } = useLanguage();

  return (
    <section id="family-section" className="relative w-full py-16 px-4 bg-gradient-to-b from-[#211B19] via-[#2D0D14] to-[#211B19]">
      <div className="max-w-3xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-10">
          <p className="font-royal text-xs sm:text-sm text-antique-gold tracking-widest uppercase font-semibold">
            {language === 'hi' ? 'राजपूती कुल परम्परा एवं शुभाशीर्वाद' : 'Rajputana Heritage & Blessings'}
          </p>
          <h2 className="font-royal text-2xl sm:text-3xl text-antique-gold-lighter font-bold tracking-wide mt-1">
            {language === 'hi' ? 'परिवार एवं आत्मीय सम्बन्धी' : 'Family & Revered Lineage'}
          </h2>
          <p className="font-hindi text-xs sm:text-sm text-sandstone/80 mt-1 max-w-md mx-auto">
            {language === 'hi'
              ? '"आप सपरिवार पधारकर वर-वधू को शुभाशीर्वाद प्रदान करें।"'
              : '"You are cordially invited with your family to grace the auspicious royal wedding and bless the couple."'}
          </p>
          <RoyalDivider className="my-4" />
        </div>

        {/* TWO SIDES: GROOM'S SIDE & BRIDE'S SIDE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* VAR PAKSH (GROOM'S HERITAGE) */}
          <RoyalBorder variant="parchment" padding="p-6">
            <div className="text-center flex flex-col items-center">
              <div className="w-12 h-12 rounded-full border border-royal-maroon/30 bg-royal-maroon/10 flex items-center justify-center text-royal-maroon mb-2">
                <Crown className="w-6 h-6" />
              </div>
              <span className="font-royal text-xs tracking-widest text-royal-maroon uppercase font-bold">
                {language === 'hi' ? 'वर पक्ष' : "Groom's Side"}
              </span>
              <h3 className="font-royal text-lg sm:text-xl font-bold text-royal-maroon-dark mt-1">
                {data.couple.groom.name}
              </h3>
              <p className="font-hindi text-xs text-sandstone-dark font-medium mt-0.5">
                {language === 'hi' ? 'पिता:' : 'Father:'} {data.couple.groom.father}
              </p>
              <div className="h-[1px] w-20 bg-royal-maroon/20 my-3" />
              <div className="text-xs font-hindi text-charcoal/80 space-y-1">
                <p>
                  {language === 'hi' ? 'परिवार:' : 'Family:'}{' '}
                  <span className="font-semibold">{data.couple.groom.grandparents}</span>
                </p>
                <p className="text-sandstone-dark font-medium">{data.couple.groom.Thi.}</p>
                <p className="text-[11px] text-charcoal/60">({data.couple.groom.presentAddress})</p>
              </div>
            </div>
          </RoyalBorder>

          {/* VADHU PAKSH (BRIDE'S HERITAGE) */}
          <RoyalBorder variant="parchment" padding="p-6">
            <div className="text-center flex flex-col items-center">
              <div className="w-12 h-12 rounded-full border border-royal-maroon/30 bg-royal-maroon/10 flex items-center justify-center text-royal-maroon mb-2">
                <Shield className="w-6 h-6" />
              </div>
              <span className="font-royal text-xs tracking-widest text-royal-maroon uppercase font-bold">
                {language === 'hi' ? 'वधू पक्ष' : "Bride's Side"}
              </span>
              <h3 className="font-royal text-lg sm:text-xl font-bold text-royal-maroon-dark mt-1">
                {data.couple.bride.name}
              </h3>
              <p className="font-hindi text-xs text-sandstone-dark font-medium mt-0.5">
                {language === 'hi' ? 'पिता:' : 'Father:'} {data.couple.bride.father}
              </p>
              <div className="h-[1px] w-20 bg-royal-maroon/20 my-3" />
              <div className="text-xs font-hindi text-charcoal/80 space-y-1">
                <p>{data.couple.bride.grandparents}</p>
                <p className="text-sandstone-dark font-medium">{data.couple.bride.Thi.}</p>
              </div>
            </div>
          </RoyalBorder>
        </div>

        {/* CHIEF INVITERS */}
        <div className="mb-8">
          <RoyalBorder variant="maroon" padding="p-6">
            <div className="text-center">
              <span className="inline-block px-4 py-1 rounded-full bg-antique-gold/20 border border-antique-gold/40 text-antique-gold font-royal text-xs tracking-widest uppercase font-semibold mb-3">
                {data.family.preshakTitle}
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-center my-3 max-w-lg mx-auto">
                {data.family.preshak.map((name: string, i: number) => (
                  <div key={i} className="p-2 rounded-lg bg-charcoal-dark/50 border border-antique-gold/20 text-sm font-hindi text-ivory">
                    {name}
                  </div>
                ))}
              </div>

              <div className="h-[1px] w-32 bg-antique-gold/30 mx-auto my-3" />

              {/* Swagatakankshi */}
              <div className="text-xs font-hindi text-sandstone mt-2">
                <span className="text-antique-gold font-semibold">{data.family.swagatakankshiTitle}: </span>
                <span className="text-ivory font-medium text-sm">{data.family.swagatakankshi}</span>
              </div>

              {/* Contact numbers */}
              <div className="flex flex-wrap items-center justify-center gap-3 mt-3 text-xs text-sandstone/90 font-hindi">
                <span>{language === 'hi' ? 'सम्पर्क सूत्र:' : 'Contact:'}</span>
                {data.meta.contactPhones.map((phone: string, i: number) => (
                  <a
                    key={i}
                    href={`tel:+91${phone}`}
                    className="text-antique-gold-light hover:underline font-semibold"
                  >
                    +91 {phone}
                  </a>
                ))}
              </div>
            </div>
          </RoyalBorder>
        </div>

        {/* DARSHANABHILASHI */}
        <div className="mb-8 p-5 sm:p-6 rounded-2xl border border-antique-gold/30 bg-charcoal/80 text-center">
          <span className="font-royal text-xs text-antique-gold uppercase tracking-widest font-semibold">
            {data.family.darshanabhilashiTitle}
          </span>
          <div className="flex flex-wrap items-center justify-center gap-2 mt-3 text-xs font-hindi text-ivory/90 leading-relaxed">
            {data.family.darshanabhilashi.map((item: string, i: number) => (
              <span key={i} className="px-2.5 py-1 rounded-md bg-royal-maroon-deep/60 border border-antique-gold/20">
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* MEETHI MANUHAR */}
        <div className="mb-8 p-5 sm:p-6 rounded-2xl border border-antique-gold/40 bg-gradient-to-r from-royal-maroon-deep via-royal-maroon/70 to-royal-maroon-deep shadow-lg">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-2 text-antique-gold">
              <Heart className="w-4 h-4 text-antique-gold fill-antique-gold" />
              <span className="font-royal text-xs sm:text-sm tracking-widest uppercase font-semibold">
                {language === 'hi' ? 'मीठी मनुहार' : 'Sweet Invitations'}
              </span>
              <Heart className="w-4 h-4 text-antique-gold fill-antique-gold" />
            </div>

            {/* Dadosa note */}
            <div className="bg-charcoal/60 p-4 rounded-xl border border-antique-gold/20">
              <p className="font-hindi text-sm text-antique-gold-lighter font-medium italic">
                "{data.family.meethiManuhar.dadosa.quote}"
              </p>
              <p className="font-hindi text-xs text-ivory/90 mt-2 font-medium">
                {data.family.meethiManuhar.dadosa.names.join(' • ')}
              </p>
            </div>

            {/* Chhote Bhai note */}
            <div className="bg-charcoal/60 p-4 rounded-xl border border-antique-gold/20">
              <p className="font-hindi text-sm text-antique-gold-lighter font-medium italic">
                "{data.family.meethiManuhar.choteBhai.quote}"
              </p>
              <p className="font-hindi text-xs text-ivory/90 mt-2 font-medium">
                {data.family.meethiManuhar.choteBhai.names.join(' • ')}
              </p>
            </div>
          </div>
        </div>

        {/* RELATIONS & EXTENDED PEDIGREE TABS */}
        <div className="p-5 sm:p-6 rounded-2xl border border-antique-gold/30 bg-charcoal-dark/90">
          <div className="text-center mb-4">
            <span className="font-royal text-xs text-antique-gold uppercase tracking-widest font-semibold">
              {language === 'hi' ? 'आत्मीय सम्बन्धी एवं विशिष्ट आग्रह' : 'Revered Relations & Special Solicitations'}
            </span>
          </div>

          {/* Tabs */}
          <div className="flex rounded-xl p-1 bg-royal-maroon-deep/80 border border-antique-gold/30 max-w-sm mx-auto mb-4">
            {[
              { id: 'nanihal', label: data.family.nanihalTitle },
              { id: 'javai', label: language === 'hi' ? 'जवाई व साडू पक्ष' : 'In-Laws & Sadu Ji' },
              { id: 'vishesh', label: data.family.visheshAagrahTitle },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex-1 py-1.5 text-xs font-hindi font-medium rounded-lg transition-all ${activeTab === tab.id
                    ? 'bg-antique-gold text-charcoal-dark font-semibold shadow-sm'
                    : 'text-sandstone hover:text-ivory'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="min-h-[140px] flex items-center justify-center text-center">
            {activeTab === 'nanihal' && (
              <div className="space-y-3 w-full">
                {data.family.nanihal.map((item, i: number) => (
                  <div key={i} className="p-3 rounded-lg bg-charcoal/70 border border-antique-gold/20">
                    <p className="font-hindi text-xs sm:text-sm text-ivory font-medium">
                      {item.line}
                    </p>
                    <p className="font-hindi text-xs text-antique-gold mt-0.5">
                      {item.Thi.}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'javai' && (
              <div className="space-y-2 w-full text-left">
                {/* Sadu ji */}
                <div className="p-3 rounded-lg bg-charcoal/70 border border-antique-gold/20 mb-3">
                  <span className="text-[11px] font-hindi text-antique-gold font-semibold uppercase">
                    {data.family.saduJiTitle}:
                  </span>
                  <p className="font-hindi text-xs sm:text-sm text-ivory mt-0.5">
                    {data.family.saduJi[0].line}
                  </p>
                  <p className="font-hindi text-xs text-sandstone">
                    {data.family.saduJi[0].subline}
                  </p>
                </div>

                {/* Javai Paksh */}
                <div className="p-3 rounded-lg bg-charcoal/70 border border-antique-gold/20">
                  <span className="text-[11px] font-hindi text-antique-gold font-semibold uppercase">
                    {data.family.javaiPakshTitle}:
                  </span>
                  <ul className="mt-1 space-y-1 text-xs font-hindi text-ivory/90 list-disc list-inside">
                    {data.family.javaiPaksh.map((member: string, i: number) => (
                      <li key={i}>{member}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'vishesh' && (
              <div className="p-3 rounded-lg bg-charcoal/70 border border-antique-gold/20 w-full text-left">
                <span className="text-[11px] font-hindi text-antique-gold font-semibold uppercase">
                  {data.family.visheshAagrahTitle}:
                </span>
                <ul className="mt-1 space-y-1.5 text-xs font-hindi text-ivory/90 list-disc list-inside">
                  {data.family.visheshAagrah.map((member: string, i: number) => (
                    <li key={i}>{member}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
