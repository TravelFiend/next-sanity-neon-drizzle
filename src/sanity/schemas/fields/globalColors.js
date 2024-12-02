import { defineField } from 'sanity';

export const ThemeColors = defineField({
  name: 'themeColors',
  title: 'Theme Colors',
  type: 'object',
  fields: [
    defineField({
      name: 'themePrimaryColor',
      title: 'Theme Primary Color',
      type: 'color'
    }),
    defineField({
      name: 'themeSecondColor',
      title: 'Theme Second Color',
      type: 'color'
    }),
    defineField({
      name: 'themeThirdColor',
      title: 'Theme Third Color',
      type: 'color'
    }),
    defineField({
      name: 'themeFourthColor',
      title: 'Theme Fourth Color',
      type: 'color'
    }),
    defineField({
      name: 'themeFifthColor',
      title: 'Theme Fifth Color',
      type: 'color'
    })
  ]
});

export const FontColors = defineField({
  name: 'fontColors',
  title: 'Font Colors',
  type: 'object',
  fields: [
    defineField({
      name: 'primaryFontColorLight',
      title: 'Primary Light Font Color',
      type: 'color'
    }),
    defineField({
      name: 'secondaryFontColorLight',
      title: 'Secondary Light Font Color',
      type: 'color'
    }),
    defineField({
      name: 'primaryFontColorDark',
      title: 'Primary Dark Font Color',
      type: 'color'
    }),
    defineField({
      name: 'secondaryFontColorDark',
      title: 'Primary Dark Font Color',
      type: 'color'
    })
  ]
});
