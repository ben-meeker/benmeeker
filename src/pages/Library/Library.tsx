import React from 'react';
import { Card } from '../../components/Card';
import './Library.css';

export const Library: React.FC = () => {
  // Example library items - can be replaced with dynamic data
  const libraryItems = [
    {
      id: 1,
      title: 'Sample Book Title',
      author: 'Author Name',
      category: 'Technology',
      description: 'A brief description of what this book is about and why it\'s in the library.',
    },
    {
      id: 2,
      title: 'Another Resource',
      author: 'Another Author',
      category: 'Design',
      description: 'Description of another interesting resource or book in the library.',
    },
    {
      id: 3,
      title: 'Learning Resource',
      author: 'Expert Author',
      category: 'Development',
      description: 'A valuable learning resource that has been helpful in the journey.',
    },
  ];

  const categories = ['All', 'Technology', 'Design', 'Development', 'Business'];

  return (
    <div className="library">
      <div className="container">
        <header className="library__header">
          <h1 className="library__title">Library</h1>
          <p className="library__description">
            A curated collection of books, articles, and resources that have shaped my
            thinking and approach to software development.
          </p>
        </header>

        <div className="library__filters">
          {categories.map((category) => (
            <button
              key={category}
              className={`library__filter ${
                category === 'All' ? 'library__filter--active' : ''
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="library__grid">
          {libraryItems.map((item) => (
            <Card key={item.id} variant="elevated" padding="lg">
              <div className="library__item">
                <span className="library__item-category">{item.category}</span>
                <h3 className="library__item-title">{item.title}</h3>
                <p className="library__item-author">by {item.author}</p>
                <p className="library__item-description">{item.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

