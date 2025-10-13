import localFont from 'next/font/local'
export const Lora = localFont({
  src: [
    {
      path: './Lora/Lora-VariableFont_wght.ttf',
    },
    {
      path: './Lora/Lora-Italic-VariableFont_wght.ttf',
      style: 'italic'
    },
  ],
  variable: '--lora-font',
})

export const Merriweather = localFont({
  src: [
  {
    path: './Merriweather_Sans/MerriweatherSans-VariableFont_wght.ttf',
  },
  {
    path: './Merriweather_Sans/MerriweatherSans-Italic-VariableFont_wght.ttf',
    style: 'italic'
  },
  ],
  variable: '--merriweather-font',
})