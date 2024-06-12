import { PageSection } from "../../../interfaces/page-section";

export class GalleryModel {
  id: string;
  slug: string;
  title: string;
  contentSummery: string;
  featuredImage: string;
  sections: PageSection[];
  status: boolean;
  createdAt: any;
  updatedAt: any;

  constructor(
    id: string,
    slug: string,
    title: string,
    contentSummery: string,
    featuredImage: string,
    sections: PageSection[],
    status: boolean,
    createdAt: any,
    updatedAt: any
  ) {
    this.id = id;
    this.slug = slug;
    this.title = title;
    this.contentSummery = contentSummery;
    this.featuredImage = featuredImage;
    this.sections = sections;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
