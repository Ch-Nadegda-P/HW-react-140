export function getTimeLeftString(deadline, t) {
  const now = new Date();
  const end = new Date(deadline);
  let diff = Math.floor((end - now) / 1000);

  if (diff <= 0) {
    return t('time_is_up');
  }

  const hours = Math.floor(diff / 3600);
  diff = diff % 3600;
  const minutes = Math.floor(diff / 60);
  const seconds = diff % 60;

  return `${t('time_left')}: ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pad(n) {
  return n.toString().padStart(2, '0');
}
