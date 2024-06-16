import { SectionView } from "../../../interfaces/section-view";

export class ServiceModel {
  id: string;
  slug: string;
  title: string;
  content: string;
  contentSummery: string;
  featuredImage: string;
  sections: SectionView[];
  status: boolean;
  createdAt: any;
  updatedAt: any;

  constructor(
    id: string,
    slug: string,
    title: string,
    content: string,
    contentSummery: string,
    featuredImage: string,
    sections: SectionView[],
    status: boolean,
    createdAt: any,
    updatedAt: any
  ) {
    this.id = id;
    this.slug = slug;
    this.title = title;
    this.content = content;
    this.contentSummery = contentSummery;
    this.featuredImage = featuredImage;
    this.sections = sections;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
