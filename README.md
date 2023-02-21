# Midjourney Wrapper

A simple library that wraps the Midjourney API

## Install

```sh
$ npm install https://github.com/moloto0v/midjourney
```

## Usage example

```js
const { MidjourneyClient } = require("midjourney");
const client = new MidjourneyClient();

const imagine = async () => {
  const image = await client.imagine({
    prompt:
      "mdjrny-v4 style a highly detailed matte painting of a man on a hill watching a rocket launch in the distance by studio ghibli, makoto shinkai, by artgerm, by wlop, by greg rutkowski, volumetric lighting, octane render, 4 k resolution, trending on artstation, masterpiece",
  });

  console.log(image);
};
```

A complete list of supported params can be found [here](https://replicate.com/prompthero/openjourney/api#inputs)
