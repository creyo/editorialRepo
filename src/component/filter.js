// filter.js

export function filterArticles(articles, selectedPublicationId, selectedPostTypeId) {
  return articles.filter((article) => {
    const publicationId = article.publication?.publication_id;
    const postTypeId = article.post_type?.post_type_id;

    // Check if either publication_id or post_type_id matches the selected values
    const matchesPublication = selectedPublicationId === null || publicationId === selectedPublicationId;
    const matchesPostType = selectedPostTypeId === null || postTypeId === selectedPostTypeId;

    // Calculate the commanData using logical AND
    const commanData = matchesPublication && matchesPostType;

    return commanData;
  });
}
