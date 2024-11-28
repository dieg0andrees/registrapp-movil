import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl:'http://localhost:8100', //Directorio donde se realiza el testing
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern:'**/*.spec.ts',//Extensión de archivos de test
  },
});
