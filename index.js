var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const input = document.querySelector(".input");
const dynamic = document.querySelector(".dynamic");
const getWeatherData = (city) => __awaiter(this, void 0, void 0, function* () {
    const apiKey = "2f4228dd423c4eb4ab621036230907";
    const response = yield fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`);
    const data = yield response.json();
    return data;
});
const getGiphyData = (search, weirdness) => __awaiter(this, void 0, void 0, function* () {
    const apiKey = "k5mLKfYOKatUdgmbQ1u0JEGb79U5KFQu";
    const response = yield fetch(`https://api.giphy.com/v1/gifs/translate?api_key=${apiKey}&s=${search}&weirdness=${weirdness}`);
    const data = yield response.json();
    console.log(search, weirdness);
    return data;
});
const drawWeatherStuff = (data) => {
    if (!dynamic)
        return;
    const { location, current } = data;
    const { name } = location;
    const { temp_c, condition } = current;
    dynamic.innerHTML = `
    <span class="text-xl"><span class="font-bold">${name}</span> is currently...</span>
    <div class="flex gap-y-1 items-center"><span class="text-xl"><img src="${condition.icon}" alt="${condition.text}"></span>
    <span class="text-xl">${temp_c}ºC</span></div>
    <span class="text-l italic">" ${condition.text} "</span>
  `;
};
const drawGiphyStuff = (data) => {
    if (!dynamic)
        return;
    const { images, title } = data.data;
    const { url } = images.original;
    dynamic.innerHTML += `
    <div class="text-xl mt-4">
      <img src="${url}" alt="${title}">
      <div class="text-sm mt-1 flex justify-center">Powered By GIPHY</div>
    </div>
  `;
};
const handleInput = (event) => __awaiter(this, void 0, void 0, function* () {
    const userInput = event.target.value;
    try {
        const weatherData = yield getWeatherData(userInput);
        drawWeatherStuff(weatherData);
        const weatherDescription = weatherData.current.condition.text;
        const cityName = weatherData.location.name;
        const giphyData = yield getGiphyData(`${cityName} ${weatherDescription} meme`, Math.floor(Math.random() * 11));
        drawGiphyStuff(giphyData);
        if (!dynamic)
            return;
    }
    catch (error) {
        console.error("Error:", error);
    }
});
input === null || input === void 0 ? void 0 : input.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        handleInput(event);
    }
});
