import React from 'react';
import { RotateCcw, MapPin, MessageCircle, FileDown } from 'lucide-react';
import { RoyalDivider, JharokhaCrown, GaneshaMotif } from '../components/common/OrnateMotif';
import { ChauhanCrest } from '../components/common/ChauhanCrest';
import { triggerPetalShower } from '../components/common/PetalShower';
import { WEDDING_DATA } from '../data/weddingData';

interface Scene8Props {
  onReplayInvitation: () => void;
  onNavigateSection: (sectionId: string) => void;
  onOpenCardModal?: () => void;
}

export const Scene8Farewell: React.FC<Scene8Props> = ({
  onReplayInvitation,
  onNavigateSection,
  onOpenCardModal
}) => {
  return (
    <footer className="relative w-full py-16 px-4 bg-gradient-to-b from-[#211B19] via-[#1A0509] to-[#0D0204] text-center overflow-hidden">
      {/* Top ornamental arch */}
      <div className="absolute top-0 inset-x-0 opacity-30 pointer-events-none">
        <JharokhaCrown className="w-full text-antique-gold" />
      </div>

      <div className="max-w-xl mx-auto z-10 flex flex-col items-center">
        {/* Lord Ganesha blessing icon */}
        <div className="mb-2">
          <GaneshaMotif size={40} className="text-antique-gold opacity-80" />
        </div>

        {/* Closing Sanskrit Blessing */}
        <p className="font-royal text-xs text-antique-gold tracking-widest uppercase">
          {WEDDING_DATA.shloka.sanskrit}
        </p>

        {/* Authentic Chauhan Family Crest */}
        <div className="my-5">
          <ChauhanCrest size="md" showCaption={true} />
        </div>

        {/* Royal Farewell Note */}
        <div className="my-4 space-y-2">
          <p className="font-hindi text-sm sm:text-base text-sandstone/90 italic max-w-md mx-auto leading-relaxed">
            "आपकी गरिमामयी उपस्थिति एवं शुभाशीर्वाद की अभिलाषा में"
          </p>
          <h3 className="font-royal text-xl sm:text-2xl text-antique-gold-lighter font-bold tracking-wide">
            समस्त चौहान परिवार
          </h3>
          <p className="font-hindi text-xs sm:text-sm text-sandstone-dark font-medium">
            (ठि. फलीचड़ा, मेवाड़ — हाल मु. भीलवाड़ा)
          </p>
        </div>

        {/* Padhari Sa Callout */}
        <div className="my-3">
          <span className="font-royal text-3xl sm:text-4xl text-antique-gold font-bold tracking-wider drop-shadow-md">
            पधारो सा...
          </span>
        </div>

        <RoyalDivider className="my-6" />

        {/* ACTION BUTTONS ROW */}
        <div className="flex flex-wrap items-center justify-center gap-3 w-full max-w-md mb-8">
          {/* Replay Invitation Sequence */}
          <button
            onClick={() => {
              triggerPetalShower();
              onReplayInvitation();
            }}
            className="flex-1 min-w-[140px] flex items-center justify-center space-x-2 py-2.5 px-4 rounded-full border border-antique-gold/50 bg-royal-maroon-deep/80 hover:bg-royal-maroon text-antique-gold-lighter text-xs font-hindi font-medium active:scale-95 transition-all shadow-md"
          >
            <RotateCcw className="w-3.5 h-3.5 text-antique-gold" />
            <span>पुनः निमंत्रण देखें</span>
          </button>

          {/* Download Original Card PDF */}
          <a
            href={WEDDING_DATA.meta.pdfDownloadUrl}
            download="Devraj-Madhu-Royal-Wedding-Invitation.pdf"
            className="flex-1 min-w-[140px] flex items-center justify-center space-x-2 py-2.5 px-4 rounded-full border border-antique-gold/50 bg-royal-maroon-deep/80 hover:bg-royal-maroon text-antique-gold-lighter text-xs font-hindi font-medium active:scale-95 transition-all shadow-md"
          >
            <FileDown className="w-3.5 h-3.5 text-antique-gold" />
            <span>मूल पत्रिका PDF</span>
          </a>

          {/* View Real Printed Card Photo & Video */}
          {onOpenCardModal && (
            <button
              onClick={onOpenCardModal}
              className="flex-1 min-w-[140px] flex items-center justify-center space-x-2 py-2.5 px-4 rounded-full border border-[#E6C98A] bg-royal-maroon hover:bg-royal-maroon-dark text-[#FFF4D0] text-xs font-hindi font-bold active:scale-95 transition-all shadow-md"
            >
              <span>⚜ वास्तविक पत्रिका झलक</span>
            </button>
          )}

          {/* Directions */}
          <button
            onClick={() => onNavigateSection('venue-section')}
            className="flex-1 min-w-[140px] flex items-center justify-center space-x-2 py-2.5 px-4 rounded-full border border-antique-gold/30 bg-charcoal/80 hover:bg-charcoal text-sandstone text-xs font-hindi font-medium active:scale-95 transition-all shadow-md"
          >
            <MapPin className="w-3.5 h-3.5 text-antique-gold" />
            <span>दिशा-निर्देश</span>
          </button>

          {/* WhatsApp RSVP */}
          <button
            onClick={() => onNavigateSection('rsvp-section')}
            className="flex-1 min-w-[140px] flex items-center justify-center space-x-2 py-2.5 px-4 rounded-full border border-antique-gold/30 bg-charcoal/80 hover:bg-charcoal text-sandstone text-xs font-hindi font-medium active:scale-95 transition-all shadow-md"
          >
            <MessageCircle className="w-3.5 h-3.5 text-antique-gold" />
            <span>RSVP संदेश</span>
          </button>
        </div>

        {/* Footer Copyright / Colophon */}
        <div className="pt-4 border-t border-antique-gold/20 text-center text-[11px] text-sandstone/50 font-hindi space-y-1">
          <p>
            शाही विवाह उत्सव — आयुष्मान देवराज सिंह चौहान संग आयुष्मति मधु कंवर
          </p>
          <p className="font-royal text-[10px] text-antique-gold/50 tracking-widest uppercase">
            Mewar • Bhilwara • Rajasthan • 2026
          </p>
        </div>
      </div>
    </footer>
  );
};
