export function handleNotifications(notificationDetails, notifCount, key) {
  console.log(notificationDetails);
  let lastTotal = 0;
  let index = notifCount.findIndex((item) => item.id === key);
  console.log(index);
  if (index !== -1) {
    lastTotal = notifCount[index].total;
    if (notificationDetails.totalMessagesCount - lastTotal > 0) {
      notifCount[index].notif =
        notificationDetails.totalMessagesCount - lastTotal;
    }
    notifCount[index].lastKnownTotal = notificationDetails.totalMessagesCount;
  } else {
    // notifCount.push(
    return {
      id: key,
      total: notificationDetails.totalMessagesCount,
      lastKnownTotal: notificationDetails.totalMessagesCount,
      notif: 0,
    };
  }
}
