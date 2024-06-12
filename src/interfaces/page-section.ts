import { Attachment } from "./attachment";

export interface PageSection {
  sectionTitle: string;
  content: string;
  attachment: Attachment | null;
  order: number;
}
