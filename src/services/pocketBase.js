import PocketBase from "pocketbase";

export const pocketBase = new PocketBase(import.meta.env.VITE_POCKET_BASE_URL);