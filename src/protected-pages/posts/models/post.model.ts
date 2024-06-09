export class PostModel {
  id: string;
  slug: string;
  title: string;
  content: string;
  contentSummery: string;
  attachments: string[];
  status: boolean;
  createdAt: any;
  updatedAt: any;

  constructor(
    id: string,
    slug: string,
    title: string,
    content: string,
    contentSummery: string,
    attachments: string[],
    status: boolean,
    createdAt: any,
    updatedAt: any
  ) {
    this.id = id;
    this.slug = slug;
    this.title = title;
    this.content = content;
    this.contentSummery = contentSummery;
    this.attachments = attachments;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
