// articleFilter.js

export function filterArticles(articles, selectedPublication, selectedCategory) {
    return articles.filter((articleItem) => {
      return (
        (selectedPublication === '' ||
          articleItem.publication.name === selectedPublication) &&
        (selectedCategory === '' ||
          articleItem.categories.name === selectedCategory)
      );
    });
  }
  