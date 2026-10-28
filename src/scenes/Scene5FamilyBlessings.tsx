import React, { useState } from 'react';
import { Heart, Crown, Shield } from 'lucide-react';
import { RoyalDivider } from '../components/common/OrnateMotif';
import { RoyalBorder } from '../components/common/RoyalBorder';
import { WEDDING_DATA } from '../data/weddingData';

export const Scene5FamilyBlessings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'nanihal' | 'javai' | 'vishesh'>('nanihal');

  return (
    <section id="family-section" className="relative w-full py-16 px-4 bg-gradient-to-b from-[#211B19] via-[#2D0D14] to-[#211B19]">
      <div className="max-w-3xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-10">
          <p className="font-royal text-xs sm:text-sm text-antique-gold tracking-widest uppercase font-semibold">
            राजपूती कुल परम्परा एवं शुभाशीर्वाद
          </p>
          <h2 className="font-royal text-2xl sm:text-3xl text-antique-gold-lighter font-bold tracking-wide mt-1">
            परिवार एवं आत्मीय सम्बन्धी
          </h2>
          <p className="font-hindi text-xs sm:text-sm text-sandstone/80 mt-1 max-w-md mx-auto">
            "आप सपरिवार पधारकर वर-वधू को शुभाशीर्वाद प्रदान करें।"
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
                वर पक्ष
              </span>
              <h3 className="font-royal text-lg sm:text-xl font-bold text-royal-maroon-dark mt-1">
                {WEDDING_DATA.couple.groom.name}
              </h3>
              <p className="font-hindi text-xs text-sandstone-dark font-medium mt-0.5">
                पिता: {WEDDING_DATA.couple.groom.father}
              </p>
              <div className="h-[1px] w-20 bg-royal-maroon/20 my-3" />
              <div className="text-xs font-hindi text-charcoal/80 space-y-1">
                <p>परिवार: <span className="font-semibold">{WEDDING_DATA.couple.groom.grandparents}</span></p>
                <p className="text-sandstone-dark font-medium">{WEDDING_DATA.couple.groom.thikana}</p>
                <p className="text-[11px] text-charcoal/60">({WEDDING_DATA.couple.groom.presentAddress})</p>
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
                वधू पक्ष
              </span>
              <h3 className="font-royal text-lg sm:text-xl font-bold text-royal-maroon-dark mt-1">
                {WEDDING_DATA.couple.bride.name}
              </h3>
              <p className="font-hindi text-xs text-sandstone-dark font-medium mt-0.5">
                पिता: {WEDDING_DATA.couple.bride.father}
              </p>
              <div className="h-[1px] w-20 bg-royal-maroon/20 my-3" />
              <div className="text-xs font-hindi text-charcoal/80 space-y-1">
                <p>{WEDDING_DATA.couple.bride.grandparents} की सुपौत्री</p>
                <p className="text-sandstone-dark font-medium">{WEDDING_DATA.couple.bride.thikana}</p>
              </div>
            </div>
          </RoyalBorder>
        </div>

        {/* CHIEF INVITERS (मुख्य आमंत्रक / उत्तराकांक्षी) */}
        <div className="mb-8">
          <RoyalBorder variant="maroon" padding="p-6">
            <div className="text-center">
              <span className="inline-block px-4 py-1 rounded-full bg-antique-gold/20 border border-antique-gold/40 text-antique-gold font-royal text-xs tracking-widest uppercase font-semibold mb-3">
                मुख्य आमंत्रक एवं उत्तराकांक्षी
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-center my-3 max-w-lg mx-auto">
                {WEDDING_DATA.family.preshak.map((name: string, i: number) => (
                  <div key={i} className="p-2 rounded-lg bg-charcoal-dark/50 border border-antique-gold/20 text-sm font-hindi text-ivory">
                    {name}
                  </div>
                ))}
              </div>

              <div className="h-[1px] w-32 bg-antique-gold/30 mx-auto my-3" />

              {/* Swagatakankshi */}
              <div className="text-xs font-hindi text-sandstone mt-2">
                <span className="text-antique-gold font-semibold">स्वागताकांक्षी: </span>
                <span className="text-ivory font-medium text-sm">{WEDDING_DATA.family.swagatakankshi}</span>
              </div>

              {/* Contact numbers */}
              <div className="flex flex-wrap items-center justify-center gap-3 mt-3 text-xs text-sandstone/90 font-hindi">
                <span>सम्पर्क सूत्र:</span>
                {WEDDING_DATA.meta.contactPhones.map((phone: string, i: number) => (
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
            दर्शनाभिलाषी
          </span>
          <div className="flex flex-wrap items-center justify-center gap-2 mt-3 text-xs font-hindi text-ivory/90 leading-relaxed">
            {WEDDING_DATA.family.darshanabhilashi.map((item: string, i: number) => (
              <span key={i} className="px-2.5 py-1 rounded-md bg-royal-maroon-deep/60 border border-antique-gold/20">
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* MEETHI MANUHAR (SWEET INVITATIONS FROM CHILDREN & SISTERS) */}
        <div className="mb-8 p-5 sm:p-6 rounded-2xl border border-antique-gold/40 bg-gradient-to-r from-royal-maroon-deep via-royal-maroon/70 to-royal-maroon-deep shadow-lg">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-2 text-antique-gold">
              <Heart className="w-4 h-4 text-antique-gold fill-antique-gold" />
              <span className="font-royal text-xs sm:text-sm tracking-widest uppercase font-semibold">
                मीठी मनुहार
              </span>
              <Heart className="w-4 h-4 text-antique-gold fill-antique-gold" />
            </div>

            {/* Dadosa note */}
            <div className="bg-charcoal/60 p-4 rounded-xl border border-antique-gold/20">
              <p className="font-hindi text-sm text-antique-gold-lighter font-medium italic">
                "{WEDDING_DATA.family.meethiManuhar.dadosa.quote}"
              </p>
              <p className="font-hindi text-xs text-ivory/90 mt-2 font-medium">
                {WEDDING_DATA.family.meethiManuhar.dadosa.names.join(' • ')}
              </p>
            </div>

            {/* Chhote Bhai note */}
            <div className="bg-charcoal/60 p-4 rounded-xl border border-antique-gold/20">
              <p className="font-hindi text-sm text-antique-gold-lighter font-medium italic">
                "{WEDDING_DATA.family.meethiManuhar.choteBhai.quote}"
              </p>
              <p className="font-hindi text-xs text-ivory/90 mt-2 font-medium">
                {WEDDING_DATA.family.meethiManuhar.choteBhai.names.join(' • ')}
              </p>
            </div>
          </div>
        </div>

        {/* RELATIONS & EXTENDED PEDIGREE TABS (ननिहाल, जावाई, विशेष आग्रह) */}
        <div className="p-5 sm:p-6 rounded-2xl border border-antique-gold/30 bg-charcoal-dark/90">
          <div className="text-center mb-4">
            <span className="font-royal text-xs text-antique-gold uppercase tracking-widest font-semibold">
              आत्मीय सम्बन्धी एवं विशिष्ट आग्रह
            </span>
          </div>

          {/* Tabs */}
          <div className="flex rounded-xl p-1 bg-royal-maroon-deep/80 border border-antique-gold/30 max-w-sm mx-auto mb-4">
            {[
              { id: 'nanihal', label: 'ननिहाल पक्ष' },
              { id: 'javai', label: 'जवाई व साडू पक्ष' },
              { id: 'vishesh', label: 'विशेष आग्रह' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex-1 py-1.5 text-xs font-hindi font-medium rounded-lg transition-all ${
                  activeTab === tab.id
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
                {WEDDING_DATA.family.nanihal.map((item, i: number) => (
                  <div key={i} className="p-3 rounded-lg bg-charcoal/70 border border-antique-gold/20">
                    <p className="font-hindi text-xs sm:text-sm text-ivory font-medium">
                      {item.line}
                    </p>
                    <p className="font-hindi text-xs text-antique-gold mt-0.5">
                      {item.thikana}
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
                    साडू जी पक्ष:
                  </span>
                  <p className="font-hindi text-xs sm:text-sm text-ivory mt-0.5">
                    {WEDDING_DATA.family.saduJi[0].line}
                  </p>
                  <p className="font-hindi text-xs text-sandstone">
                    {WEDDING_DATA.family.saduJi[0].subline}
                  </p>
                </div>

                {/* Javai Paksh */}
                <div className="p-3 rounded-lg bg-charcoal/70 border border-antique-gold/20">
                  <span className="text-[11px] font-hindi text-antique-gold font-semibold uppercase">
                    जवाई पक्ष:
                  </span>
                  <ul className="mt-1 space-y-1 text-xs font-hindi text-ivory/90 list-disc list-inside">
                    {WEDDING_DATA.family.javaiPaksh.map((member: string, i: number) => (
                      <li key={i}>{member}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'vishesh' && (
              <div className="p-3 rounded-lg bg-charcoal/70 border border-antique-gold/20 w-full text-left">
                <span className="text-[11px] font-hindi text-antique-gold font-semibold uppercase">
                  विशेष आग्रह:
                </span>
                <ul className="mt-1 space-y-1.5 text-xs font-hindi text-ivory/90 list-disc list-inside">
                  {WEDDING_DATA.family.visheshAagrah.map((member: string, i: number) => (
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
