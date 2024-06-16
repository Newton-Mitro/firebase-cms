import { Attachment } from "./attachment";

export interface SectionView {
  sectionTitle: string;
  sectionContent: string;
  sectionAttachment: Attachment | null;
  sectionOrder: number;
}
