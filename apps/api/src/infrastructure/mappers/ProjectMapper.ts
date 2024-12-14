import { ProjectEntity } from "../entities";
import { CreateProjectData, ImageModel, ProjectModel } from "../../core";

export class ProjectMapper {
  private constructor() {}

  static toModel(entity: ProjectEntity, images: ImageModel[]): ProjectModel {
    return {
      id: entity.id,
      name: entity.name,
      description: entity.description ?? "",
      userId: entity.user_id,
      images: images,
      createdAt: entity.created_at,
      updatedAt: entity.updated_at,
    };
  }

  static toEntity(model: CreateProjectData): Partial<ProjectEntity> {
    return {
      id: model.project.id,
      name: model.project.name,
      description: model.project.description,
      user_id: model.user_id,
    };
  }
}
