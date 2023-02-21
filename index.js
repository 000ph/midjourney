const { MidjourneyClient } = require("./src");

const client = new MidjourneyClient();

(async () => {
  const res = await client.imagine({
    prompt: "Cristiano Ronaldo",
    num_outputs: 4,
  });
  console.log(res);
})();
