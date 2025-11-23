import React from 'react';
import './Library.css';
import theHappinessAdvantageImg from '../../assets/books/thehappinessadvantage.jpg';
import theCoddlingOfTheAmericanMindImg from '../../assets/books/thecoddlingoftheamericanmind.jpg';
import loveDoesImg from '../../assets/books/lovedoes.jpg';
import outliersImg from '../../assets/books/outliers.jpg';
import atomicHabitsImg from '../../assets/books/atomichabits.jpg';
import crucialConversationsImg from '../../assets/books/crucialconversations.jpg';
import redNoticeImg from '../../assets/books/rednotice.jpg';
import theFiveDysfunctionsOfATeamImg from '../../assets/books/thefivedysfunctionsofateam.jpg';
import theAnatomyOfPeaceImg from '../../assets/books/theanatomyofpeace.jpg';
import driveImg from '../../assets/books/drive.jpg';
import gritImg from '../../assets/books/grit.jpg';
import the7HabitsOfHighlyEffectivePeopleImg from '../../assets/books/the7habitsofhighlyeffectivepeople.jpg';
import thinkingFastAndSlowImg from '../../assets/books/thinkingfastandslow.jpg';
import twelveRulesForLifeImg from '../../assets/books/12rulesforlife.jpg';
import theTalentCodeImg from '../../assets/books/thetalentcode.jpg';
import bigPotentialImg from '../../assets/books/bigpotential.jpg';
import theConfidenceGapImg from '../../assets/books/theconfidencegap.jpg';
import blinkImg from '../../assets/books/blink.jpg';
import neverSplitTheDifferenceImg from '../../assets/books/neversplitthedifference.jpg';
import cantHurtMeImg from '../../assets/books/canthurtme.jpg';
import theTipplingPointImg from '../../assets/books/thetippingpoint.jpg';
import howToTalkToAnyoneImg from '../../assets/books/howtotalktoanyone.jpg';
import beforeHappinessImg from '../../assets/books/beforehappiness.jpg';
import thePhoenixProjectImg from '../../assets/books/thephoenixproject.jpg';

export const Library: React.FC = () => {
  // Book recommendations
  const books = [
    {
      title: 'The Happiness Advantage',
      cover: theHappinessAdvantageImg,
      link: 'https://www.amazon.com/Happiness-Advantage-Positive-Brain-Success/dp/0307591557',
      favorite: true,
    },
    {
      title: 'Love Does',
      cover: loveDoesImg,
      link: "https://www.amazon.com/Love-Does-Discover-Secretly-Incredible/dp/1400203759",
      favorite: true,
    },
    {
      title: 'Crucial Conversations (Third Edition)',
      cover: crucialConversationsImg,
      link: "https://www.amazon.com/Crucial-Conversations-Tools-Talking-Stakes/dp/1260474186",
      favorite: true,
    },
    {
      title: 'Big Potential',
      cover: bigPotentialImg,
      link: "https://www.amazon.com/Big-Potential-Transforming-Achievement-Well-Being/dp/1524761532",
      favorite: true,
    },
    {
      title: 'The Coddling of the American Mind',
      cover: theCoddlingOfTheAmericanMindImg,
      link: 'https://www.amazon.com/Coddling-American-Mind-Intentions-Generation/dp/0735224897',
    },
    {
      title: 'Outliers',
      cover: outliersImg,
      link: "https://www.amazon.com/Outliers-Malcolm-Gladwell-audiobook/dp/B001LNK9C4"
    },
    {
      title: 'Atomic Habits',
      cover: atomicHabitsImg,
      link: 'https://www.amazon.com/Atomic-Habits-Proven-Build-Break/dp/0735211299',
    },
    {
      title: 'Red Notice',
      cover: redNoticeImg,
      link: "https://www.amazon.com/Red-Notice-Finance-Murder-Justice/dp/1476755744",
    },
    {
      title: 'The Five Dysfunctions of a Team',
      cover: theFiveDysfunctionsOfATeamImg,
      link: "https://www.amazon.com/Five-Dysfunctions-Team-Leadership-Fable/dp/0787960756",
    },
    {
      title: 'The Anatomy of Peace',
      cover: theAnatomyOfPeaceImg,
      link: "https://www.amazon.com/Anatomy-Peace-Resolving-Heart-Conflict/dp/1626564310",
    },
    {
      title: 'Drive',
      cover: driveImg,
      link: "https://www.amazon.com/Drive-Surprising-Truth-About-Motivates/dp/1594484805",
    },
    {
      title: 'Grit',
      cover: gritImg,
      link: "https://www.amazon.com/Grit-Passion-Perseverance-Angela-Duckworth/dp/1501111108",
    },
    {
      title: 'The 7 Habits of Highly Effective People (Sean Covey Edition)',
      cover: the7HabitsOfHighlyEffectivePeopleImg,
      link: "https://www.amazon.com/Habits-Highly-Effective-People-Powerful/dp/1982137134",
    },
    {
      title: 'Thinking, Fast and Slow',
      cover: thinkingFastAndSlowImg,
      link: "https://www.amazon.com/Thinking-Fast-Slow-Daniel-Kahneman/dp/0374533555",
    },
    {
      title: '12 Rules for Life',
      cover: twelveRulesForLifeImg,
      link: "https://www.amazon.com/12-Rules-Life-Antidote-Chaos/dp/0141988517",
    },
    {
      title: 'The Talent Code',
      cover: theTalentCodeImg,
      link: "https://www.amazon.com/Talent-Code-Greatness-Born-Grown/dp/055380684X",
    },
    {
      title: 'The Confidence Gap',
      cover: theConfidenceGapImg,
      link: "https://www.amazon.com/Confidence-Gap-Guide-Overcoming-Self-Doubt/dp/1590309235",
    },
    {
      title: 'Blink',
      cover: blinkImg,
      link: "https://www.amazon.com/Blink-Power-Thinking-Without/dp/0316010669",
    },
    {
      title: 'Never Split the Difference',
      cover: neverSplitTheDifferenceImg,
      link: "https://www.amazon.com/Never-Split-Difference-Negotiating-Depended/dp/0062407805https://www.amazon.com/Never-Split-Difference-Negotiating-Depended/dp/0062407805",
    },
    {
      title: "Can't Hurt Me",
      cover: cantHurtMeImg,
      link: "https://www.amazon.com/Cant-Hurt-Me-Master-Your/dp/1544512279",
    },
    {
      title: 'The Tippling Point',
      cover: theTipplingPointImg,
      link: "https://www.amazon.com/Tipping-Point-Little-Things-Difference/dp/0316346624https://www.amazon.com/Tipping-Point-Little-Things-Difference/dp/0316346624",
    },
    {
      title: 'How to Talk to Anyone',
      cover: howToTalkToAnyoneImg,
      link: "https://www.amazon.com/How-Talk-Anyone-Success-Relationships/dp/007141858X",
    },
    {
      title: 'Before Happiness',
      cover: beforeHappinessImg,
      link: "https://www.amazon.com/Before-Happiness-Achieving-Spreading-Sustaining/dp/0770436730",
    },
    {
      title: 'The Phoenix Project',
      cover: thePhoenixProjectImg,
      link: "https://www.amazon.com/Phoenix-Project-DevOps-Helping-Business/dp/0988262592",
    }
  ];

  return (
    <div className="library">
      {/* Header */}
      <section className="library__hero">
        <div className="container">
          <header className="library__header">
            <h1 className="library__title">My Library</h1>
            <p className="library__description">
              A collection of books that have impacted me, and content that I have created.
            </p>
          </header>
        </div>
      </section>

      {/* Book Recommendations Section */}
      <section className="library__section library__section--books">
        <div className="container">
          <h2 className="library__section-title">Bookshelf</h2>
          <p className="library__section-description">
            Books that have had a significant impact on my life and career. I highly recommend all of these
          </p>
          
          <div className="library__books-grid">
            {books.map((book) => (
              <a
                key={book.link}
                href={book.link}
                target="_blank"
                rel="noopener noreferrer"
                className="library__book-card"
              >
                <div className="library__book-cover-image">
                  <img src={book.cover} alt={`${book.title} cover`} />
                  {book.favorite && (
                    <div className="library__book-favorite">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 24 24" 
                        fill="currentColor"
                        className="library__book-favorite-icon"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    </div>
                  )}
                </div>
                <div className="library__book-info">
                  <h3 className="library__book-title">{book.title}</h3>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

