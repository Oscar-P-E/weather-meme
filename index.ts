const input = document.querySelector(".input");
const dynamic = document.querySelector(".dynamic");

const getWeatherData = async (city: string) => {
  const apiKey = "2f4228dd423c4eb4ab621036230907";
  const response = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
  );
  const data = await response.json();
  return data;
};

const getGiphyData = async (search: string, weirdness: number) => {
  const apiKey = "k5mLKfYOKatUdgmbQ1u0JEGb79U5KFQu";
  const response = await fetch(
    `https://api.giphy.com/v1/gifs/translate?api_key=${apiKey}&s=${search}&weirdness=${weirdness}`
  );
  const data = await response.json();
  console.log(search, weirdness);
  return data;
};

const drawWeatherStuff = (data) => {
  if (!dynamic) return;

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
  if (!dynamic) return;

  const { images, title } = data.data;
  const { url } = images.original;

  dynamic.innerHTML += `
    <div class="text-xl mt-4">
      <img src="${url}" alt="${title}">
      <div class="text-sm mt-1 flex justify-center">Powered By GIPHY</div>
    </div>
  `;
};

const handleInput = async (event: Event) => {
  const userInput = (event.target as HTMLInputElement).value;

  try {
    const weatherData = await getWeatherData(userInput);

    drawWeatherStuff(weatherData);

    const weatherDescription = weatherData.current.condition.text;
    const cityName = weatherData.location.name;

    const giphyData = await getGiphyData(
      `${cityName} ${weatherDescription} meme`,
      Math.floor(Math.random() * 11)
    );

    drawGiphyStuff(giphyData);

    if (!dynamic) return;
  } catch (error) {
    console.error("Error:", error);
  }
};

input?.addEventListener("keyup", (event: KeyboardEvent) => {
  if (event.key === "Enter") {
    event.preventDefault();
    handleInput(event);
  }
});
