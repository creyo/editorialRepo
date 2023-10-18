export function filterArticles(articles, selectedPublicationId, selectedPostTypeId, selectedStatusId) {
  return articles.filter((article) => {
    const publicationId = article.publication?.publication_id;
    const postTypeId = article.post_type?.post_type_id;
    const statusId = article.articlestatus?.status_id;

    // Check if either publication_id or post_type_id matches the selected values
    const matchesPublication = selectedPublicationId === null || publicationId === selectedPublicationId;
    const matchesPostType = selectedPostTypeId === null || postTypeId === selectedPostTypeId;
    const matchesStatus = selectedStatusId === null || statusId === selectedStatusId;

    // Calculate the commonData using logical AND
    const commonData = matchesPublication && matchesPostType && matchesStatus;
    console.log(commonData)

    return commonData;
  });
}

export function filterDataByUserId(data, user_id,email) {
  // Use the `filter` method to find items where the `user_id` exists in the "auth" array
  const filteredData = data.filter((item) => {
    return Array.isArray(item.auth) && item.auth.some((authItem) => authItem.user_id === user_id && authItem.email === email);
  });

  
  return filteredData

}

export function formatDate(originalDate) {
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };

  let dateObject = new Date(originalDate);

  if (isNaN(dateObject)) {
    // Handle the case of an invalid date by returning the original date string
    return originalDate;
  }

  return dateObject.toLocaleDateString('en-IN', options);
}






export function countArticlesByStatus(articles) {
  // Initialize counters for each status type
  let allCount = 0;
  let publishedCount = 0;
  let reviewCount = 0;
  let draftCount = 0;

  // Iterate through the articles and count them based on status
  articles.forEach((article) => {
    const statusId = article.articlestatus?.status_id;

    switch (statusId) {
      case 1: // Published
        publishedCount++;
        break;
      case 2: // Review
        reviewCount++;
        break;
      case 3: // Draft
        draftCount++;
        break;
      default:
        break;
    }

    // Count all articles, regardless of status
    allCount++;
  });

  // Create an object to store the counts for each status type
  const counts = {
    all: allCount,
    published: publishedCount,
    review: reviewCount,
    draft: draftCount,
  };

  return counts;
}
