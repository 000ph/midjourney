import { PromptOptions } from "./Request";

class Midjourney {
  public version: string;
  public name: string;
  public baseUri: string;
  public defaultOptions: {
    guidance_scale: "7";
    width: 512;
    height: 512;
    num_inference_steps: 50;
    num_outputs: 1;
    seed: null;
  };

  async getAcessToken(): Promise<string>;

  async predict(token: string, options: PromptOptions): Promise<string[]>;
  async imagine(options: PromptOptions): Promise<string[]>;
}

export { Midjourney };
