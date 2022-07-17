const deg2rad = deg => {
  return deg * (Math.PI / 180);
};

const getDistance = (lat1, lng1, lat2, lng2) => {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLng = deg2rad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
  // test => 서울부터 부산까지 322.4091958604872 (km)
};

const getTime = distance => {
  // 단위 m
  const d = Math.round(distance);
  if (d >= 2880) return 1440;
  return d / 2;
};

const formatDate = receiveDate => {
  const date = new Date(receiveDate);
  return `${date.getFullYear()}년 ${
    date.getMonth() + 1
  }월 ${date.getDate()}일 ${date.getHours()}시 ${date.getMinutes()}분`;
};

const getBirth = date => {
  const birth = new window.Date(date);
  return `${birth.getMonth() + 1}월 ${birth.getDate()}일`;
};

const getAge = date => {
  const now = new window.Date().getFullYear();
  const birth = new window.Date(date).getFullYear();
  return now - birth;
};

export { getDistance, getTime, formatDate, getBirth, getAge };