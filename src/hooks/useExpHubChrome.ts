import { useSyncExternalStore } from "react";
import {
  getExpHubChromeState,
  subscribeExpHubChrome,
} from "@/lib/exp-hub-chrome-store";

export function useExpHubChrome() {
  return useSyncExternalStore(subscribeExpHubChrome, getExpHubChromeState, getExpHubChromeState);
}
