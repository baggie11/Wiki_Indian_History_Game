import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Scroll, 
  History, 
  Trophy, 
  Heart, 
  ChevronRight, 
  RotateCcw,
  Info,
  Compass,
  Zap,
  AlertCircle,
  GripVertical,
  Lightbulb,
  BookOpen
} from 'lucide-react';
import { 
  DndContext, 
  useDraggable, 
  useDroppable, 
  DragOverlay,
  DragEndEvent,
  defaultDropAnimationSideEffects
} from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { GoogleGenAI } from "@google/genai";
import { events, Event } from './data/events';

// Initialize Gemini
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

function DraggableCard({ event, isHintLoading, getAIHint, hint }: { 
  event: Event; 
  isHintLoading: boolean; 
  getAIHint: () => void;
  hint: string | null;
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: 'current-card',
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 100 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="touch-none">
      <motion.div 
        layoutId="current-card-motion"
        className="manuscript-card bg-white text-maroon p-4 border-gold gold-glow cursor-grab active:cursor-grabbing w-[320px]"
      >
        <div className="corner-tl manuscript-card-corner"></div>
        <div className="corner-tr manuscript-card-corner"></div>
        <div className="corner-bl manuscript-card-corner"></div>
        <div className="corner-br manuscript-card-corner"></div>

        <div className="flex items-center gap-2 mb-2 opacity-40">
          <GripVertical className="w-3 h-3" />
          <span className="text-[8px] uppercase tracking-widest font-bold">Drag to Timeline</span>
        </div>

        <div className="text-lg font-royal mb-2 leading-tight truncate">{event.title}</div>
        <p className="text-xs font-serif italic opacity-80 leading-snug mb-3 line-clamp-2">
          {event.description}
        </p>
        
        <div className="pt-2 border-t border-gold/20 flex justify-between items-center">
          <span className={`yuga-badge !text-[8px] !px-2 !py-0.5 yuga-${event.yuga || 'kali'}`}>
            {event.yuga || event.category}
          </span>
          <button 
            onPointerDown={(e) => e.stopPropagation()}
            onClick={getAIHint}
            disabled={isHintLoading}
            className="p-1 hover:bg-gold/10 rounded-full transition-colors"
            title="Seek Sage Advice"
          >
            <Lightbulb className={`w-4 h-4 ${isHintLoading ? 'animate-pulse text-gold' : 'text-gold'}`} />
          </button>
        </div>

        {hint && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-2 p-2 bg-indigo/10 border border-indigo/20 rounded-sm italic text-[10px] text-indigo"
          >
            <div className="flex gap-2">
              <BookOpen className="w-3 h-3 shrink-0 mt-0.5" />
              <p>"{hint}"</p>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

function DroppableZone({ index, onDrop }: { index: number; onDrop: () => void }) {
  const { isOver, setNodeRef } = useDroppable({
    id: `drop-zone-${index}`,
    data: { index }
  });

  return (
    <div 
      ref={setNodeRef}
      className={`w-12 h-[300px] mx-2 border-2 border-dashed rounded-sm flex items-center justify-center transition-all duration-300 shrink-0 ${
        isOver ? 'drop-zone-active border-gold' : 'border-gold/10 hover:border-gold/30'
      }`}
    >
      <div className={`flex flex-col items-center gap-2 transition-colors font-royal text-[8px] tracking-widest ${
        isOver ? 'text-gold' : 'text-gold/20'
      }`}>
        <ChevronRight className={`w-4 h-4 rotate-180 ${isOver ? 'animate-bounce' : ''}`} />
        <span className="vertical-text uppercase">Place</span>
        <ChevronRight className={`w-4 h-4 ${isOver ? 'animate-bounce' : ''}`} />
      </div>
    </div>
  );
}

function GameBackground({ opacity = 0.1 }: { opacity?: number }) {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Primary Mandala */}
      <div className={`mandala-bg opacity-${Math.round(opacity * 100)} scale-150`} />
      
      {/* Secondary Decorative Mandalas in corners */}
      <div className="absolute -top-20 -left-20 w-[400px] h-[400px] mandala-bg opacity-[0.02] rotate-45" />
      <div className="absolute -bottom-20 -right-20 w-[400px] h-[400px] mandala-bg opacity-[0.02] -rotate-45" />
      
      {/* Atmospheric Glows for Light Theme */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gold/10 blur-[150px] rounded-full" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-saffron/10 blur-[150px] rounded-full" />
      
      {/* Decorative Corner Borders */}
      <div className="fixed top-8 left-8 w-24 h-24 border-t-2 border-l-2 border-maroon/20" />
      <div className="fixed top-8 right-8 w-24 h-24 border-t-2 border-r-2 border-maroon/20" />
      <div className="fixed bottom-8 left-8 w-24 h-24 border-b-2 border-l-2 border-maroon/20" />
      <div className="fixed bottom-8 right-8 w-24 h-24 border-b-2 border-r-2 border-maroon/20" />
      
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03]" 
           style={{ backgroundImage: 'radial-gradient(circle, #800000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
    </div>
  );
}

export default function App() {
  const [timeline, setTimeline] = useState<Event[]>([]);
  const [deck, setDeck] = useState<Event[]>([]);
  const [currentCard, setCurrentCard] = useState<Event | null>(null);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [streak, setStreak] = useState(0);
  const [gameState, setGameState] = useState<'start' | 'playing' | 'gameover' | 'explanation'>('start');
  const [lastPlacement, setLastPlacement] = useState<{ event: Event; correct: boolean } | null>(null);
  const [hint, setHint] = useState<string | null>(null);
  const [isHintLoading, setIsHintLoading] = useState(false);

  const startGame = () => {
    const shuffled = [...events].sort(() => Math.random() - 0.5);
    const initial = shuffled.pop()!;
    setTimeline([initial]);
    setDeck(shuffled);
    setCurrentCard(shuffled.pop() || null);
    setScore(0);
    setLives(3);
    setStreak(0);
    setGameState('playing');
    setLastPlacement(null);
    setHint(null);
  };

  const handlePlacement = useCallback((index: number) => {
    if (!currentCard) return;

    const newTimeline = [...timeline];
    newTimeline.splice(index, 0, currentCard);

    const isCorrect = newTimeline.every((ev, i) => i === 0 || ev.year >= newTimeline[i - 1].year);

    if (isCorrect) {
      setTimeline(newTimeline);
      setScore(s => s + (100 * (streak + 1)));
      setStreak(s => s + 1);
      setLastPlacement({ event: currentCard, correct: true });
      
      const nextCard = deck.pop();
      if (nextCard) {
        setDeck([...deck]);
        setCurrentCard(nextCard);
      } else {
        setGameState('gameover');
      }
      setHint(null);
    } else {
      // Reorganize: Add the card to the timeline in the correct sorted position
      const correctedTimeline = [...timeline, currentCard].sort((a, b) => a.year - b.year);
      setTimeline(correctedTimeline);
      
      setLives(l => l - 1);
      setStreak(0);
      setLastPlacement({ event: currentCard, correct: false });
      
      if (lives <= 1) {
        setGameState('gameover');
      } else {
        setGameState('explanation');
      }
    }
  }, [currentCard, timeline, streak, deck, lives]);

  const nextTurn = () => {
    setGameState('playing');
    setLastPlacement(null);
    const nextCard = deck.pop();
    if (nextCard) {
      setDeck([...deck]);
      setCurrentCard(nextCard);
    } else {
      setGameState('gameover');
    }
  };

  const onDragEnd = (event: DragEndEvent) => {
    const { over } = event;
    if (over && over.id.toString().startsWith('drop-zone-')) {
      const index = over.data.current?.index;
      if (typeof index === 'number') {
        handlePlacement(index);
      }
    }
  };

  const getAIHint = async () => {
    if (!currentCard || isHintLoading) return;
    setIsHintLoading(true);
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `I am playing a timeline game about Indian history and mythology. 
        The current card is: "${currentCard.title}: ${currentCard.description}".
        The timeline currently has these events in order: ${timeline.map(e => e.title).join(', ')}.
        Give me a subtle hint about where this card belongs without giving away the exact date or position. 
        Use a traditional, wise tone like an ancient sage. Keep it short (1-2 sentences).`
      });
      setHint(response.text);
    } catch (error) {
      console.error("Hint error:", error);
      setHint("The stars are clouded, but look to the eras of the kings and the gods.");
    } finally {
      setIsHintLoading(false);
    }
  };

  if (gameState === 'start') {
    return (
      <div className="min-h-screen relative flex flex-col items-center justify-center p-4 md:p-8 text-center overflow-hidden">
        <GameBackground opacity={0.1} />
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-6xl w-full relative z-10 flex flex-col items-center"
        >
          {/* Editorial Header */}
          <div className="mb-4">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="inline-block px-4 py-1 border border-maroon/30 rounded-full mb-6"
            >
              <span className="text-[10px] uppercase tracking-[0.4em] text-maroon font-bold">The Eternal Chronicle of Bharat</span>
            </motion.div>
          </div>

          <div className="relative mb-12">
            <motion.h1 
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-[15vw] md:text-[12vw] leading-[0.8] text-maroon font-black drop-shadow-[0_10px_30px_rgba(128,0,0,0.1)] select-none"
            >
              ITIHASA
            </motion.h1>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="absolute -bottom-4 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-maroon to-transparent"
            />
          </div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-xl md:text-2xl font-manuscript italic text-maroon/80 mb-16 max-w-2xl leading-relaxed"
          >
            "Time is not a line, but a circle. Navigate the currents of history and myth to restore the cosmic balance."
          </motion.p>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full mb-20">
            {[
              { name: "Satya Yuga", color: "text-maroon", desc: "Era of Truth" },
              { name: "Treta Yuga", color: "text-saffron", desc: "Era of Virtue" },
              { name: "Dvapara Yuga", color: "text-blue-700", desc: "Era of Doubt" },
              { name: "Kali Yuga", color: "text-red-700", desc: "Era of Darkness" }
            ].map((yuga, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + i * 0.1 }}
                className="group p-6 border border-maroon/10 bg-maroon/5 backdrop-blur-sm rounded-sm hover:bg-maroon/10 transition-all duration-500 cursor-default"
              >
                <div className={`text-xs uppercase tracking-[0.2em] font-bold mb-2 ${yuga.color}`}>{yuga.name}</div>
                <div className="text-[10px] text-maroon/40 uppercase tracking-widest">{yuga.desc}</div>
                <div className="mt-4 h-1 w-0 group-hover:w-full bg-maroon/30 transition-all duration-500" />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8 }}
            className="flex flex-col items-center gap-6"
          >
            <button 
              onClick={startGame}
              className="royal-button group min-w-[320px]"
            >
              <span className="relative z-10 flex items-center justify-center gap-6">
                Begin Journey
                <ChevronRight className="w-8 h-8 group-hover:translate-x-2 transition-transform" />
              </span>
            </button>
            
            <div className="flex items-center gap-8 text-maroon/30 text-[10px] uppercase tracking-[0.3em] font-bold">
              <span className="flex items-center gap-2"><Scroll className="w-3 h-3" /> 50+ Events</span>
              <span className="flex items-center gap-2"><Zap className="w-3 h-3" /> AI Sage Hints</span>
              <span className="flex items-center gap-2"><Trophy className="w-3 h-3" /> Global Rankings</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Decorative Corner Elements */}
        <div className="fixed top-8 left-8 w-24 h-24 border-t-2 border-l-2 border-gold/20 pointer-events-none" />
        <div className="fixed top-8 right-8 w-24 h-24 border-t-2 border-r-2 border-gold/20 pointer-events-none" />
        <div className="fixed bottom-8 left-8 w-24 h-24 border-b-2 border-l-2 border-gold/20 pointer-events-none" />
        <div className="fixed bottom-8 right-8 w-24 h-24 border-b-2 border-r-2 border-gold/20 pointer-events-none" />
      </div>
    );
  }

  return (
    <DndContext onDragEnd={onDragEnd}>
      <div className="min-h-screen relative flex flex-col overflow-hidden">
        <GameBackground opacity={0.05} />
        
        {/* Top Bar - Current Card & Stats */}
        <div className="h-64 border-b border-maroon/10 bg-white/40 backdrop-blur-xl relative z-20 flex items-center px-8 gap-12">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <Scroll className="text-maroon w-6 h-6" />
              <h2 className="text-xl text-maroon font-black tracking-widest">ITIHASA</h2>
            </div>
            
            <div className="flex gap-4">
              <div className="stats-card !p-3 min-w-[140px]">
                <div className="text-[8px] text-maroon/60 uppercase tracking-widest mb-1">Score</div>
                <div className="text-2xl text-maroon font-royal">{score}</div>
              </div>
              
              <div className="stats-card !p-3 min-w-[140px]">
                <div className="text-[8px] text-maroon/60 uppercase tracking-widest mb-1">Life Force</div>
                <div className="flex gap-1">
                  {[...Array(3)].map((_, i) => (
                    <Heart 
                      key={i} 
                      className={`w-3 h-3 ${i < lives ? 'text-red-600 fill-red-600' : 'text-maroon/10'}`} 
                    />
                  ))}
                </div>
              </div>
            </div>

            <button 
              onClick={() => setGameState('start')}
              className="flex items-center gap-2 text-maroon/30 hover:text-maroon transition-all text-[8px] uppercase tracking-[0.2em] font-bold group"
            >
              <RotateCcw className="w-3 h-3 group-hover:rotate-[-180deg] transition-transform duration-500" />
              Abandon Quest
            </button>
          </div>

          <div className="flex-1 flex justify-center items-center">
            {currentCard && (
              <div className="relative">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-maroon/40 uppercase tracking-[0.4em] font-bold whitespace-nowrap">
                  Place this event in time
                </div>
                <DraggableCard 
                  event={currentCard} 
                  isHintLoading={isHintLoading} 
                  getAIHint={getAIHint} 
                  hint={hint} 
                />
              </div>
            )}
          </div>

          {streak > 1 && (
            <motion.div 
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="stats-card border-saffron/50 bg-saffron/10 flex items-center gap-4"
            >
              <Zap className="w-8 h-8 fill-saffron text-saffron" />
              <div>
                <div className="text-[8px] text-saffron uppercase tracking-widest">Streak</div>
                <div className="text-3xl text-maroon font-royal">{streak}</div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Main Timeline Area - Horizontal */}
        <div className="flex-1 horizontal-scroll-path relative">
          <div className="flex items-center h-full relative z-10 py-12 min-w-max px-32">
            <div className="horizontal-scroll-line" />
            <AnimatePresence mode="popLayout">
              {/* First Drop Zone */}
              {gameState === 'playing' && (
                <div key="drop-0">
                  <DroppableZone index={0} onDrop={() => handlePlacement(0)} />
                </div>
              )}

              {timeline.map((event, idx) => (
                <div key={event.id} className="flex items-center">
                  <motion.div 
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="manuscript-card gold-glow w-[350px] shrink-0"
                  >
                    <div className="manuscript-card-corner corner-tl" />
                    <div className="manuscript-card-corner corner-tr" />
                    <div className="manuscript-card-corner corner-bl" />
                    <div className="manuscript-card-corner corner-br" />
                    
                    <div className="flex justify-between items-start mb-4">
                      <span className={`yuga-badge yuga-${event.yuga || 'kali'}`}>
                        {event.yuga || event.category}
                      </span>
                      <span className="text-gold font-royal text-xl">{event.displayYear}</span>
                    </div>
                    <h3 className="text-2xl text-maroon mb-2 font-black truncate">{event.title}</h3>
                    <p className="text-maroon/70 font-serif text-sm leading-relaxed line-clamp-3">{event.description}</p>
                    
                    <div className="mt-4 pt-4 border-t border-gold/10">
                      <div className="flex gap-2 text-[10px] text-maroon/70 bg-gold/5 p-3 rounded-sm italic font-serif">
                        <Info className="w-3 h-3 shrink-0 text-gold" />
                        <p className="line-clamp-2">{event.explanation}</p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Drop Zone between events */}
                  {gameState === 'playing' && (
                    <div key={`drop-${idx + 1}`}>
                      <DroppableZone index={idx + 1} onDrop={() => handlePlacement(idx + 1)} />
                    </div>
                  )}
                </div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Modals */}
        <AnimatePresence>
          {gameState === 'explanation' && lastPlacement && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl"
            >
              <motion.div 
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                className="max-w-2xl w-full manuscript-card !p-12 text-center shadow-[0_0_100px_rgba(128,0,0,0.1)]"
              >
                <div className="manuscript-card-corner corner-tl" />
                <div className="manuscript-card-corner corner-tr" />
                <div className="manuscript-card-corner corner-bl" />
                <div className="manuscript-card-corner corner-br" />

                <div className={`mb-8 inline-block p-4 rounded-full ${lastPlacement.correct ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {lastPlacement.correct ? <Trophy className="w-12 h-12" /> : <AlertCircle className="w-12 h-12" />}
                </div>

                <h2 className="text-5xl mb-4 text-maroon font-black">
                  {lastPlacement.correct ? "Correct Placement!" : "The Flow of Time"}
                </h2>
                
                {!lastPlacement.correct && (
                  <p className="text-xl text-red-600 font-serif italic mb-8">
                    Your life force weakens, but the chronicle continues...
                  </p>
                )}

                <div className="bg-gold/5 p-8 rounded-sm border border-gold/20 mb-8 text-left">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-2xl font-royal text-maroon">{lastPlacement.event.title}</h3>
                    <span className="text-gold font-royal text-xl">{lastPlacement.event.displayYear}</span>
                  </div>
                  <p className="text-maroon/80 font-serif leading-relaxed italic">
                    "{lastPlacement.event.explanation}"
                  </p>
                </div>

                <button 
                  onClick={nextTurn}
                  className="royal-button !py-4 !px-12 !text-xl"
                >
                  Continue the Journey
                </button>
              </motion.div>
            </motion.div>
          )}

          {gameState === 'gameover' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl"
            >
              <motion.div 
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                className="max-w-2xl w-full manuscript-card !p-16 text-center shadow-[0_0_100px_rgba(128,0,0,0.1)]"
              >
                <div className="manuscript-card-corner corner-tl" />
                <div className="manuscript-card-corner corner-tr" />
                <div className="manuscript-card-corner corner-bl" />
                <div className="manuscript-card-corner corner-br" />

                <h2 className="text-6xl mb-8 text-maroon font-black">Chronicle Ended</h2>
                
                <div className="flex justify-center gap-12 mb-12">
                  <div className="text-center">
                    <p className="text-gold/60 text-xs uppercase tracking-widest font-bold mb-2">Final Score</p>
                    <p className="text-6xl font-royal text-maroon">{score}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gold/60 text-xs uppercase tracking-widest font-bold mb-2">Events Placed</p>
                    <p className="text-6xl font-royal text-maroon">{timeline.length - 1}</p>
                  </div>
                </div>

                <p className="text-xl font-serif italic text-maroon/70 mb-12">
                  "Time is a river, and you have navigated its currents well. But every story must find its end."
                </p>

                <button 
                  onClick={() => setGameState('start')}
                  className="royal-button"
                >
                  Begin Anew
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <DragOverlay dropAnimation={{
          sideEffects: defaultDropAnimationSideEffects({
            styles: {
              active: {
                opacity: '0.5',
              },
            },
          }),
        }}>
          {currentCard && (
            <div className="manuscript-card bg-white text-maroon p-4 border-gold gold-glow opacity-80 scale-105 shadow-2xl w-[320px]">
              <div className="text-lg font-royal mb-2 truncate">{currentCard.title}</div>
              <p className="text-xs font-serif italic opacity-80 line-clamp-2">{currentCard.description}</p>
            </div>
          )}
        </DragOverlay>
      </div>
    </DndContext>
  );
}
