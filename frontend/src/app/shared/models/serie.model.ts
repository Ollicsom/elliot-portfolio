import { Photo } from "./photo.model";
import { Translation } from "./translation";

export class Serie {
    id: number;
    main_photo_file: string;
    Photos: Array<Photo>;
    title: string;
    description: string;
    SerieTranslations: Array<Translation>;
  }