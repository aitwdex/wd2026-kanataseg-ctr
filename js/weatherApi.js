const cities = {
  nagoya: {
    name: "名古屋",
    latitude: 35.18,
    longitude: 136.90
  },
  tokyo: {
    name: "東京",
    latitude: 35.68,
    longitude: 139.76
  },
  osaka: {
    name: "大阪",
    latitude: 34.69,
    longitude: 135.50
  },
  sapporo: {
    name: "札幌",
    latitude: 43.06,
    longitude: 141.35
  },
  fukuoka: {
    name: "福岡",
    latitude: 33.59,
    longitude: 130.40
  }
};

export async function getWeather(cityKey) {

  // 選ばれた都市の情報を取得する
  const city = cities[cityKey];

  // APIのURLを作成する
  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&current_weather=true`;

  /*
    fetchを使ってAPIにアクセス
  */
  const response = await fetch(url);

  /*
    通信に失敗した場合はエラーを発生させる
    このエラーは main.js の catch で受け取る
  */
  if (!response.ok) {
    throw new Error("APIからデータを取得できませんでした。");
  }

  // APIから返ってきたJSONをJavaScriptで使える形に変換する
  const data = await response.json();

  data.cityName = city.name;

  // 取得したデータをmain.jsに返す
  return data;
}
export function codeToText(code) {

  if (code === 0) {
    return "快晴";
  } else if (code === 1 || code === 2 || code === 3) {
    return "晴れまたはくもり";
  } else if (code === 45 || code === 48) {
    return "霧";
  } else if (code === 51 || code === 53 || code === 55) {
    return "霧雨";
  } else if (code === 61 || code === 63 || code === 65) {
    return "雨";
  } else if (code === 71 || code === 73 || code === 75) {
    return "雪";
  } else if (code === 80 || code === 81 || code === 82) {
    return "にわか雨";
  } else if (code === 95) {
    return "雷雨";
  } else {
    return "不明";
  }
}