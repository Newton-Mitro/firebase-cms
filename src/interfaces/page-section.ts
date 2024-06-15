import { Attachment } from "./attachment";

export interface PageSection {
  sectionTitle: string;
  sectionContent: string;
  attachment: Attachment | null;
  order: number;
}
