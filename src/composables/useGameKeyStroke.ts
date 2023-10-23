import { onKeyStroke } from "@vueuse/core";

export const useGameKeyStroke = (keys: string[], onStroke: () => void): void => {
  onKeyStroke(
    keys,
    (event) => {
      event.preventDefault();

      onStroke();
    },
    {
      dedupe: false, // don't allow long press
    },
  );
}