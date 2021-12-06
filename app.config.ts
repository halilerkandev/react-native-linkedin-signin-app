import "dotenv/config";

export default {
  expo: {
    name: "linkedinsignin",
    slug: "linkedinsignin",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "dev.halilerkan.linkedinsignin",
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#FFFFFF",
      },
      package: "dev.halilerkan.linkedinsignin",
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    jsEngine: "hermes",
    extra: {
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGING_SENDER_ID,
      appId: process.env.APP_ID,
      measurementId: process.env.MEASUREMENT_ID,
      webAPIKey: process.env.WEB_API_KEY,
      linkedinClientId: process.env.LINKEDIN_CLIENT_ID,
      linkedinClientSecret: process.env.LINKEDIN_CLIENT_SECRET,
    },
  },
};
