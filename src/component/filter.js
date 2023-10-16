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
    console.warn(commonData)

    return commonData;
  });
}

export function filterDataByUserId(data, user_id,email) {
  // Use the `filter` method to find items where the `user_id` exists in the "auth" array
  const filteredData = data.filter((item) => {
    return Array.isArray(item.auth) && item.auth.some((authItem) => authItem.user_id === user_id && authItem.email === email);
  });

  console.log( filteredData)
  return filteredData

}


export function formatDate(originalDate) {
  // Remove the timezone offset (+00:00) using a regular expression
  const dateWithoutTimezone = originalDate.replace(/\+00:00$/, '');
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };

  const formattedDate = new Date(dateWithoutTimezone ).toLocaleDateString('en-IN', options);
  return formattedDate;
}



