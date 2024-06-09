export interface PageSection {
  content: string;
  attachment: string;
  order: number;
}
export class PageModel {
  id: string;
  slug: string;
  title: string;
  contentSummery: string;
  sections: PageSection[];
  status: boolean;
  createdAt: any;
  updatedAt: any;

  constructor(
    id: string,
    slug: string,
    title: string,
    contentSummery: string,
    sections: PageSection[],
    status: boolean,
    createdAt: any,
    updatedAt: any
  ) {
    this.id = id;
    this.slug = slug;
    this.title = title;
    this.contentSummery = contentSummery;
    this.sections = sections;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
