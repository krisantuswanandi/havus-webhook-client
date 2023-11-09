import {
  defineConfig,
  presetUno,
  presetIcons,
  presetWebFonts,
  transformerDirectives,
} from "unocss";

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons(),
    presetWebFonts({
      provider: "google",
      fonts: {
        sans: {
          name: "Archivo",
          weights: [200, 400, 600, 700],
        },
        mono: "Fira Code",
      },
    }),
  ],
  transformers: [transformerDirectives()],
});
