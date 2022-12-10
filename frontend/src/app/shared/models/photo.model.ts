import { Translation } from "./translation";

export class Photo {
  id: number;
  title: string;
  description: string;
  fileName: string;
  PhotoTranslations: Array<Translation>;
}