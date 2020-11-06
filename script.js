const button = document.getElementById("button");
const audioElement = document.getElementById("audio");

//* Disable/Enable the button
function toggleButton() {
  button.disabled = !button.disabled;
}
//* Passing Jokes to VoiceRSS API
function tellMe(joke) {
  VoiceRSS.speech({
    key: "805b374d958944c6b0c0aa6908078e04",
    src: `${joke}`,
    hl: "en-us",
    v: "John",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}

//* Get Jokes from jokes API

async function getJokes() {
  let joke = "";
  try {
    const response = await fetch(
      "https://sv443.net/jokeapi/v2/joke/Programming,Miscellaneous?blacklistFlags=nsfw,racist,sexist"
    );
    const data = await response.json();

    if (data.setup) {
      joke = `${data.setup}... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    //* text to speech
    tellMe(joke);
    //* Disable the button
    toggleButton();
  } catch (err) {
    console.log("come on!!", err);
  }
}
//* Event listeners
button.addEventListener("click", getJokes);
audioElement.addEventListener("ended", toggleButton);
