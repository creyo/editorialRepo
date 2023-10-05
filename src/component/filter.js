export function filterArticles(articles, selectedPublicationId, selectedPostTypeId, selectedStatusId) {
  return articles.filter((article) => {
    const publicationId = article.publication?.publication_id;
    const postTypeId = article.post_type?.post_type_id;
    const statusId = article.articlestatus?.status_id;

    // Check if either publication_id or post_type_id matches the selected values
    const matchesPublication = selectedPublicationId === null || publicationId === selectedPublicationId;
    const matchesPostType = selectedPostTypeId === null || postTypeId === selectedPostTypeId;
    const matchesStatus = selectedStatusId === null || statusId == selectedStatusId;

    // Calculate the commonData using logical AND
    const commonData = matchesPublication && matchesPostType && matchesStatus;

    return commonData;
  });
}