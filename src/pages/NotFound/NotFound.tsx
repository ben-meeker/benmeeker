import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/Button';
import './NotFound.css';

interface Invader {
  id: number;
  x: number;
  y: number;
  char: '0' | '1';
  speed: number;
  angle: number;
  targetX?: number;
  targetY?: number;
}

interface Explosion {
  id: number;
  x: number;
  y: number;
}

// "GAME OVER" pixel art pattern - fuller letters
const GAME_OVER_PATTERN = [
  // G (row 0-4)
  { char: '0', row: 0, col: 0 }, { char: '1', row: 0, col: 1 }, { char: '0', row: 0, col: 2 }, { char: '1', row: 0, col: 3 },
  { char: '1', row: 1, col: 0 },
  { char: '0', row: 2, col: 0 }, { char: '1', row: 2, col: 2 }, { char: '0', row: 2, col: 3 },
  { char: '1', row: 3, col: 0 }, { char: '0', row: 3, col: 3 },
  { char: '0', row: 4, col: 0 }, { char: '1', row: 4, col: 1 }, { char: '0', row: 4, col: 2 }, { char: '1', row: 4, col: 3 },
  // A (row 0-4)
  { char: '0', row: 0, col: 5 }, { char: '1', row: 0, col: 6 }, { char: '0', row: 0, col: 7 },
  { char: '1', row: 1, col: 5 }, { char: '0', row: 1, col: 7 },
  { char: '0', row: 2, col: 5 }, { char: '1', row: 2, col: 6 }, { char: '0', row: 2, col: 7 },
  { char: '1', row: 3, col: 5 }, { char: '0', row: 3, col: 7 },
  { char: '0', row: 4, col: 5 }, { char: '1', row: 4, col: 7 },
  // M (row 0-4)
  { char: '1', row: 0, col: 9 }, { char: '0', row: 0, col: 13 },
  { char: '0', row: 1, col: 9 }, { char: '1', row: 1, col: 10 }, { char: '0', row: 1, col: 12 }, { char: '1', row: 1, col: 13 },
  { char: '1', row: 2, col: 9 }, { char: '0', row: 2, col: 11 }, { char: '1', row: 2, col: 13 },
  { char: '0', row: 3, col: 9 }, { char: '1', row: 3, col: 13 },
  { char: '1', row: 4, col: 9 }, { char: '0', row: 4, col: 13 },
  // E (row 0-4)
  { char: '0', row: 0, col: 15 }, { char: '1', row: 0, col: 16 }, { char: '0', row: 0, col: 17 }, { char: '1', row: 0, col: 18 },
  { char: '1', row: 1, col: 15 },
  { char: '0', row: 2, col: 15 }, { char: '1', row: 2, col: 16 }, { char: '0', row: 2, col: 17 },
  { char: '1', row: 3, col: 15 },
  { char: '0', row: 4, col: 15 }, { char: '1', row: 4, col: 16 }, { char: '0', row: 4, col: 17 }, { char: '1', row: 4, col: 18 },
  // O (row 6-10)
  { char: '1', row: 6, col: 1 }, { char: '0', row: 6, col: 2 }, { char: '1', row: 6, col: 3 },
  { char: '0', row: 7, col: 0 }, { char: '1', row: 7, col: 4 },
  { char: '1', row: 8, col: 0 }, { char: '0', row: 8, col: 4 },
  { char: '0', row: 9, col: 0 }, { char: '1', row: 9, col: 4 },
  { char: '1', row: 10, col: 1 }, { char: '0', row: 10, col: 2 }, { char: '1', row: 10, col: 3 },
  // V (row 6-10)
  { char: '0', row: 6, col: 6 }, { char: '1', row: 6, col: 10 },
  { char: '1', row: 7, col: 6 }, { char: '0', row: 7, col: 10 },
  { char: '0', row: 8, col: 7 }, { char: '1', row: 8, col: 9 },
  { char: '1', row: 9, col: 7 }, { char: '0', row: 9, col: 9 },
  { char: '0', row: 10, col: 8 },
  // E (row 6-10)
  { char: '1', row: 6, col: 12 }, { char: '0', row: 6, col: 13 }, { char: '1', row: 6, col: 14 }, { char: '0', row: 6, col: 15 },
  { char: '0', row: 7, col: 12 },
  { char: '1', row: 8, col: 12 }, { char: '0', row: 8, col: 13 }, { char: '1', row: 8, col: 14 },
  { char: '0', row: 9, col: 12 },
  { char: '1', row: 10, col: 12 }, { char: '0', row: 10, col: 13 }, { char: '1', row: 10, col: 14 }, { char: '0', row: 10, col: 15 },
  // R (row 6-10)
  { char: '0', row: 6, col: 17 }, { char: '1', row: 6, col: 18 }, { char: '0', row: 6, col: 19 },
  { char: '1', row: 7, col: 17 }, { char: '0', row: 7, col: 20 },
  { char: '0', row: 8, col: 17 }, { char: '1', row: 8, col: 18 }, { char: '0', row: 8, col: 19 },
  { char: '1', row: 9, col: 17 }, { char: '0', row: 9, col: 19 },
  { char: '0', row: 10, col: 17 }, { char: '1', row: 10, col: 20 },
];

export const NotFound: React.FC = () => {
  const [invaders, setInvaders] = useState<Invader[]>([]);
  const [explosions, setExplosions] = useState<Explosion[]>([]);
  const [score, setScore] = useState(0);
  const [damage, setDamage] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const codeRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(0);
  const spawnRate = useRef(1200);

  // Get 404 position
  const getTargetPosition = useCallback(() => {
    if (!codeRef.current) return { x: window.innerWidth / 2, y: window.innerHeight / 3 };
    const rect = codeRef.current.getBoundingClientRect();
    return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
  }, []);

  // Trigger game over when damage hits 100
  const triggerGameOver = useCallback(() => {
    setGameOver(true);
    
    // Calculate positions for GAME OVER text - tighter grid on mobile
    const isMobile = window.innerWidth < 768;
    const cellSize = isMobile ? 14 : 20;
    const startX = window.innerWidth / 2 - (10 * cellSize);
    const startY = isMobile 
      ? window.innerHeight * 0.25  // Higher on mobile
      : window.innerHeight * 0.35;
    
    // Create new invaders for GAME OVER formation
    const gameOverInvaders: Invader[] = GAME_OVER_PATTERN.map((pos) => ({
      id: nextId.current++,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      char: pos.char as '0' | '1',
      speed: 2,
      angle: 0,
      targetX: startX + pos.col * cellSize,
      targetY: startY + pos.row * cellSize,
    }));
    
    setInvaders(gameOverInvaders);
  }, []);

  // Move invaders - normal mode or game over mode
  useEffect(() => {
    const moveInterval = setInterval(() => {
      if (gameOver) {
        // Move toward formation positions
        setInvaders(prev => prev.map(inv => {
          if (inv.targetX === undefined || inv.targetY === undefined) return inv;
          
          const dx = inv.targetX - inv.x;
          const dy = inv.targetY - inv.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 2) {
            return { ...inv, x: inv.targetX, y: inv.targetY };
          }
          
          return {
            ...inv,
            x: inv.x + (dx / dist) * 3,
            y: inv.y + (dy / dist) * 3,
          };
        }));
      } else {
        // Normal attack mode
        const target = getTargetPosition();
        
        setInvaders(prev => {
          const updated = prev.map(inv => ({
            ...inv,
            x: inv.x + Math.cos(inv.angle) * inv.speed,
            y: inv.y + Math.sin(inv.angle) * inv.speed,
          }));

          const surviving: Invader[] = [];
          updated.forEach(inv => {
            const dist = Math.sqrt((inv.x - target.x) ** 2 + (inv.y - target.y) ** 2);
            if (dist < 60) {
              setDamage(d => {
                const newDamage = Math.min(d + 5, 100);
                if (newDamage >= 100 && d < 100) {
                  // Trigger game over on next tick
                  setTimeout(triggerGameOver, 0);
                }
                return newDamage;
              });
            } else if (dist < 1500) {
              surviving.push(inv);
            }
          });

          return surviving;
        });
      }
    }, 16);

    return () => clearInterval(moveInterval);
  }, [getTargetPosition, gameOver, triggerGameOver]);

  // Spawn invaders (only when not game over)
  useEffect(() => {
    if (gameOver) return;

    const spawnInvader = () => {
      const target = getTargetPosition();
      const side = Math.floor(Math.random() * 4);
      let x: number, y: number;

      switch (side) {
        case 0:
          x = Math.random() * window.innerWidth;
          y = -30;
          break;
        case 1:
          x = window.innerWidth + 30;
          y = Math.random() * window.innerHeight;
          break;
        case 2:
          x = Math.random() * window.innerWidth;
          y = window.innerHeight + 30;
          break;
        default:
          x = -30;
          y = Math.random() * window.innerHeight;
      }

      const angle = Math.atan2(target.y - y, target.x - x);

      const newInvader: Invader = {
        id: nextId.current++,
        x,
        y,
        char: Math.random() > 0.5 ? '1' : '0',
        speed: 1.2 + Math.random() * 1.3,
        angle,
      };

      setInvaders(prev => [...prev, newInvader]);
    };

    const interval = setInterval(spawnInvader, spawnRate.current);
    const speedUp = setInterval(() => {
      spawnRate.current = Math.max(150, spawnRate.current - 200);
    }, 1500);

    return () => {
      clearInterval(interval);
      clearInterval(speedUp);
    };
  }, [getTargetPosition, gameOver]);

  // Click handler
  const handleInvaderClick = (id: number, x: number, y: number) => {
    if (gameOver) return; // Can't click during game over
    
    setExplosions(prev => [...prev, { id, x, y }]);
    setInvaders(prev => prev.filter(inv => inv.id !== id));
    setScore(s => s + 10);

    setTimeout(() => {
      setExplosions(prev => prev.filter(exp => exp.id !== id));
    }, 300);
  };

  // Reset game
  const handleReset = () => {
    setGameOver(false);
    setDamage(0);
    setScore(0);
    setInvaders([]);
    spawnRate.current = 1200;
  };

  return (
    <div className="not-found">
      {/* Invaders */}
      {invaders.map(inv => (
        <button
          key={inv.id}
          className={`not-found__invader ${gameOver ? 'not-found__invader--formation' : ''}`}
          style={{ left: inv.x, top: inv.y }}
          onClick={() => handleInvaderClick(inv.id, inv.x, inv.y)}
          aria-label="Click to destroy invader"
          disabled={gameOver}
        >
          {inv.char}
        </button>
      ))}

      {/* Explosions */}
      {explosions.map(exp => (
        <div
          key={exp.id}
          className="not-found__explosion"
          style={{ left: exp.x, top: exp.y }}
        />
      ))}

      {/* Score during gameplay */}
      {score > 0 && !gameOver && (
        <div className="not-found__score">
          Score: {score} | Damage: {damage}%
        </div>
      )}

      {/* Game Over panel */}
      {gameOver && (
        <div className="not-found__game-over-panel">
          <div className="not-found__final-score">Final Score: {score}</div>
          <Button variant="primary" size="md" onClick={handleReset}>
            Play Again
          </Button>
        </div>
      )}

      <div className={`not-found__content ${gameOver ? 'not-found__content--hidden' : ''}`}>
        <div 
          ref={codeRef}
          className="not-found__code" 
          style={{ 
            opacity: 1 - (damage / 100) * 0.7,
            filter: `blur(${damage / 25}px)`,
          }}
        >
          404
        </div>
        <h1 className="not-found__title">Page Not Found</h1>
        <p className="not-found__message">
          Don't ask ME how you got here
        </p>

        <div className="not-found__suggestions">
          <p>Try one of these instead:</p>
          <div className="not-found__links">
            <Link to="/">
              <Button variant="primary" size="lg">
                Go Home
              </Button>
            </Link>
            <Link to="/projects">
              <Button variant="outline" size="lg">
                View Projects
              </Button>
            </Link>
          </div>
        </div>
        <p className="not-found__footer">
          Beware the bits...
        </p>
      </div>
    </div>
  );
};
