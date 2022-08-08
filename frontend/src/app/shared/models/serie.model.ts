import { Photo } from "./photo.model";

export class Serie {
    id: number;
    main_photo_file: string;
    Photos: Array<Photo>;
    title: string;
    description: string;
  }