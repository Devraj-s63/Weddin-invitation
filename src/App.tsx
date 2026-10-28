import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Scene1CurtainEntrance } from './scenes/Scene1CurtainEntrance';
import { Scene2InvitationCard } from './scenes/Scene2InvitationCard';
import { Scene3Hero } from './scenes/Scene3Hero';
import { Scene4Events } from './scenes/Scene4Events';
import { Scene5FamilyBlessings } from './scenes/Scene5FamilyBlessings';
import { Scene6Venue } from './scenes/Scene6Venue';
import { Scene7RSVP } from './scenes/Scene7RSVP';
import { Scene8Farewell } from './scenes/Scene8Farewell';
import { MusicController } from './components/common/MusicController';
import { QuickNav } from './components/common/QuickNav';
import { RealCardShowcaseModal } from './components/common/RealCardShowcaseModal';

type WeddingStage = 'curtain' | 'card' | 'experience';

export function App() {
  const [stage, setStage] = useState<WeddingStage>('curtain');
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);

  const handleCurtainComplete = () => {
    setStage('card');
  };

  const handleEnterFestivities = () => {
    setStage('experience');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReplay = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setStage('curtain');
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="relative min-h-screen bg-charcoal text-ivory selection:bg-antique-gold selection:text-royal-maroon-dark">
      {/* Floating Global Music Controller */}
      <MusicController />

      {/* Real Card Showcase Modal (Photo & Video) */}
      <RealCardShowcaseModal
        isOpen={isCardModalOpen}
        onClose={() => setIsCardModalOpen(false)}
      />

      <AnimatePresence mode="wait">
        {/* SCENE 1: THE ROYAL CURTAIN ENTRANCE */}
        {stage === 'curtain' && (
          <motion.div
            key="curtain-stage"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-50"
          >
            <Scene1CurtainEntrance onOpenComplete={handleCurtainComplete} />
          </motion.div>
        )}

        {/* SCENE 2: THE ROYAL INVITATION CARD REVEAL */}
        {stage === 'card' && (
          <motion.div
            key="card-stage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full"
          >
            <Scene2InvitationCard onEnterFestivities={handleEnterFestivities} />
          </motion.div>
        )}

        {/* SCENES 3 TO 8: THE CINEMATIC ROYAL WEDDING HOMEPAGE */}
        {stage === 'experience' && (
          <motion.div
            key="experience-stage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full flex flex-col"
          >
            {/* Scene 3: Royal Hero & Live Countdown */}
            <Scene3Hero
              onNavigateSection={scrollToSection}
              onOpenCardModal={() => setIsCardModalOpen(true)}
            />

            {/* Scene 4: Interactive Wedding Events Timeline (8 Ceremonies) */}
            <Scene4Events />

            {/* Scene 5: Royal Family Heritage & Blessings */}
            <Scene5FamilyBlessings />

            {/* Scene 6: Venue & Native Directions */}
            <Scene6Venue />

            {/* Scene 7: Interactive WhatsApp RSVP */}
            <Scene7RSVP />

            {/* Scene 8: Royal Farewell & Colophon */}
            <Scene8Farewell
              onReplayInvitation={handleReplay}
              onNavigateSection={scrollToSection}
              onOpenCardModal={() => setIsCardModalOpen(true)}
            />

            {/* Thumb-friendly mobile navigation bar */}
            <QuickNav onNavigate={scrollToSection} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
