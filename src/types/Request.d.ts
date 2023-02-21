type Enumerate<
  N extends number,
  Acc extends number[] = []
> = Acc["length"] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc["length"]]>;

type IntRange<F extends number, T extends number> = Exclude<
  Enumerate<T>,
  Enumerate<F>
>;

export interface PromptOptions {
  /**
   * Input prompt
   */
  prompt: string;

  /**
   * Width of output image. Maximum size is 1024x768 or 768x1024 because of memory limits
   */
  width?: number;

  /**
   * Height of output image. Maximum size is 1024x768 or 768x1024 because of memory limits
   */
  height?: number;

  /**
   * Number of images to output. Range 1 -> 4
   */
  num_outputs?: IntRange<1, 4>;

  /**
   * Number of denoising steps. Range: 1 to 500
   */
  num_inference_steps?: IntRange<1, 500>;

  /**
   * Scale for classifier-free guidance. Range: 1 to 20
   */
  guidance_scale: IntRange<1, 20>;
  /**
   *
   * Random seed. Leave blank to randomize the seed
   */
  seed?: string;
}
