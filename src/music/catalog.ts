export type MusicCategory = 'lofi'


export type SoundChoice =
  | "rain"
  | "ocean"
  | "campfire"
  | "silence"
  | "brown"
  | "pink"
  | "lofi"
  | "white"

export const SOUND_SOURCES: Record<SoundChoice, string[]> = {
  rain: ["/misc sound/rain.mp3"],
  ocean: ["/misc sound/waves.mp3"],
  campfire: ["/misc sound/fireplace.mp3"],

  brown: ["/noise/Brown.mp3"],
  pink: ["/noise/Pink.mp3"],
  white: ["/noise/White.mp3"],

  lofi: [
    '/timeblind/lofi/lofi1.mp3',
    '/timeblind/lofi/lofi2.mp3',
    '/timeblind/lofi/lofi3.mp3',
  ],

  silence: [],
}

