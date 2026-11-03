import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Scene1CurtainEntrance } from './scenes/Scene1CurtainEntrance';
import { SceneGroomIntro } from './scenes/SceneGroomIntro';
import { SceneBrideIntro } from './scenes/SceneBrideIntro';
import { SceneCoupleReveal } from './scenes/SceneCoupleReveal';
import { SceneRoyalCardOpening } from './scenes/SceneRoyalCardOpening';
import { SceneRoyalBook } from './scenes/SceneRoyalBook';
import { MusicController } from './components/common/MusicController';
import { LanguageToggle } from './components/common/LanguageToggle';
import { LanguageSelectorModal } from './components/common/LanguageSelectorModal';
import { LanguageProvider } from './context/LanguageContext';
import { useVisitorCounter } from './hooks/useVisitorCounter';

export type WeddingStage = 'curtain' | 'groom' | 'bride' | 'couple' | 'card' | 'book';

function WeddingAppContent() {
  const [stage, setStage] = useState<WeddingStage>('curtain');

  // Initialize and register unique real visitor count on first site entry
  useVisitorCounter();

  const handleCurtainComplete = () => {
    setStage('groom');
  };

  const handleGroomNext = () => {
    setStage('bride');
  };

  const handleBrideNext = () => {
    setStage('couple');
  };

  const handleCoupleNext = () => {
    setStage('card');
  };

  const handleCardOpenBook = () => {
    setStage('book');
  };

  const handleSkipToBook = () => {
    setStage('book');
  };

  const handleReplay = () => {
    setStage('curtain');
  };

  return (
    <div className="relative min-h-screen bg-charcoal text-ivory selection:bg-antique-gold selection:text-royal-maroon-dark overflow-hidden">
      {/* First-time Entry Royal Language Selector Dialog */}
      <LanguageSelectorModal />

      {/* Floating Global Language Switcher */}
      <LanguageToggle />

      {/* Floating Global Music Controller */}
      <MusicController />

      <AnimatePresence mode="wait">
        {/* SCENE 1: ROYAL RED CURTAIN OPENING */}
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

        {/* SCENE 2: GROOM INTRODUCTION (ACTUAL CUTOUT) */}
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

        {/* SCENE 3: BRIDE INTRODUCTION (ACTUAL CUTOUT) */}
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

        {/* SCENE 4: COMBINED COUPLE REVEAL */}
        {stage === 'couple' && (
          <motion.div
            key="couple-stage"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.8 }}
            className="w-full min-h-screen"
          >
            <SceneCoupleReveal onOpenCard={handleCoupleNext} />
          </motion.div>
        )}

        {/* SCENE 5: ROYAL INVITATION CARD REVEAL & OPENING */}
        {stage === 'card' && (
          <motion.div
            key="card-stage"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.8 }}
            className="w-full min-h-screen"
          >
            <SceneRoyalCardOpening onOpenBook={handleCardOpenBook} />
          </motion.div>
        )}

        {/* SCENE 6: FULL-SCREEN 3D ROYAL WEDDING BOOK */}
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
