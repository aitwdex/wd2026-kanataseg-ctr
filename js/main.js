
// weatherApi.js から自作関数を読み込む
import { getWeather, codeToText } from "./weatherApi.js";


const weatherBtn = document.getElementById("weatherBtn");
const citySelect = document.getElementById("citySelect");
const message = document.getElementById("message");


weatherBtn.addEventListener("click", async () => {

  // 選択されている都市のvalueを取得する
  const selectedCity = citySelect.value;

  // データ取得中であることを画面に表示する
  message.textContent = "天気データを取得中です...";

  /*
    try / catch を使ってエラー
  */
  try {

    // getWeather関数を使って天気データを取得する
    const data = await getWeather(selectedCity);

    // 現在の天気情報を取り出す
    const weather = data.current_weather;

    // 天気コードを日本語に変換する
    const weatherText = codeToText(weather.weathercode);

    // 取得したデータを画面に表示する
    message.innerHTML =
      "都市：" + data.cityName + "<br>" +
      "現在の気温：" + weather.temperature + "℃<br>" +
      "風速：" + weather.windspeed + " km/h<br>" +
      "天気：" + weatherText + "<br>" +
      "天気コード：" + weather.weathercode;

  } catch (error) {

    message.textContent =
      "エラーが発生しました。時間をおいてもう一度試してください。";
    console.log(error);
  }
});