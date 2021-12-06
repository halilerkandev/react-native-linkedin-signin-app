import { extendTheme } from "native-base";

export const CustomTheme = extendTheme({
  colors: {
    linkedin: "#0077B5",
  },
  components: {
    Button: {
      variants: {
        brand: {
          p: "10",
          bg: "amber.500",
        },
      },
    },
  },
  config: {
    useSystemColorMode: true,
  },
});

type CustomThemeType = typeof CustomTheme;

declare module "native-base" {
  interface ICustomTheme extends CustomThemeType {}
}
