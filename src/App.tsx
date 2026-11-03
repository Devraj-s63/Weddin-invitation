import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Scene1CurtainEntrance } from './scenes/Scene1CurtainEntrance';
import { SceneRoyalCardOpening } from './scenes/SceneRoyalCardOpening';
import { SceneGroomIntro } from './scenes/SceneGroomIntro';
import { SceneBrideIntro } from './scenes/SceneBrideIntro';
import { SceneCoupleReveal } from './scenes/SceneCoupleReveal';
import { SceneRoyalBook } from './scenes/SceneRoyalBook';
import { MusicController } from './components/common/MusicController';
import { LanguageToggle } from './components/common/LanguageToggle';
import { LanguageSelectorModal } from './components/common/LanguageSelectorModal';
import { LanguageProvider } from './context/LanguageContext';
import { useVisitorCounter } from './hooks/useVisitorCounter';
import { RoyalCursorTrail } from './components/common/RoyalCursorTrail';

export type WeddingStage = 'curtain' | 'card' | 'groom' | 'bride' | 'couple' | 'book';

function WeddingAppContent() {
  const [stage, setStage] = useState<WeddingStage>('curtain');

  // Initialize and register unique real visitor count on first site entry
  useVisitorCounter();

  // 1. Royal Red Curtains Open -> Maroon Wedding Cover (First page seen immediately after curtains!)
  const handleCurtainComplete = () => {
    setStage('card');
  };

  // 2. Maroon Wedding Cover Tapped -> Groom Introduction
  const handleCardOpenInvitation = () => {
    setStage('groom');
  };

  // 3. Groom Intro -> Bride Introduction
  const handleGroomNext = () => {
    setStage('bride');
  };

  // 4. Bride Intro -> Couple Reveal
  const handleBrideNext = () => {
    setStage('couple');
  };

  // 5. Couple Reveal -> Main 3D Invitation Book
  const handleCoupleNext = () => {
    setStage('book');
  };

  // Direct skip to book from any intro screen
  const handleSkipToBook = () => {
    setStage('book');
  };

  // Replay resets to curtains
  const handleReplay = () => {
    setStage('curtain');
  };

  return (
    <div className="relative min-h-screen bg-charcoal text-ivory selection:bg-antique-gold selection:text-royal-maroon-dark overflow-hidden">
      {/* Royal Sparkle Cursor Trail on Desktop */}
      <RoyalCursorTrail />

      {/* First-time Entry Royal Language Selector Dialog */}
      <LanguageSelectorModal />

      {/* Floating Global Language Switcher */}
      <LanguageToggle />

      {/* Floating Global Music Controller */}
      <MusicController />

      <AnimatePresence mode="wait">
        {/* STEP 1: ROYAL RED CURTAIN OPENING */}
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

        {/* STEP 2: MAROON WEDDING COVER (FIRST PAGE AFTER CURTAINS OPEN) */}
        {stage === 'card' && (
          <motion.div
            key="card-stage"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.8 }}
            className="w-full min-h-screen"
          >
            <SceneRoyalCardOpening
              onOpenInvitation={handleCardOpenInvitation}
              onSkipToBook={handleSkipToBook}
            />
          </motion.div>
        )}

        {/* STEP 3: GROOM INTRODUCTION (ROYAL PORTRAIT) */}
        {stage === 'groom' && (
          <motion.div
            key="groom-stage"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.8 }}
            className="w-full min-h-screen"
          >
            <SceneGroomIntro onNext={handleGroomNext} onSkip={handleSkipToBook} />
          </motion.div>
        )}

        {/* STEP 4: BRIDE INTRODUCTION (ROYAL PORTRAIT) */}
        {stage === 'bride' && (
          <motion.div
            key="bride-stage"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.8 }}
            className="w-full min-h-screen"
          >
            <SceneBrideIntro onNext={handleBrideNext} onSkip={handleSkipToBook} />
          </motion.div>
        )}

        {/* STEP 5: COMBINED COUPLE REVEAL */}
        {stage === 'couple' && (
          <motion.div
            key="couple-stage"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.8 }}
            className="w-full min-h-screen"
          >
            <SceneCoupleReveal onOpenBook={handleCoupleNext} />
          </motion.div>
        )}

        {/* STEP 6: FULL-SCREEN 3D ROYAL WEDDING BOOK */}
        {stage === 'book' && (
          <motion.div
            key="book-stage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full min-h-screen"
          >
            <SceneRoyalBook onReplay={handleReplay} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function App() {
  return (
    <LanguageProvider>
      <WeddingAppContent />
    </LanguageProvider>
  );
}

export default App;
