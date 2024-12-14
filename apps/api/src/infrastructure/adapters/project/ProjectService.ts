import { Inject, Injectable } from "@nestjs/common";
import {
  CreateProjectData,
  IImageService,
  IProjectRepository,
  IProjectService,
  ProjectModel,
} from "../../../core";
import { ProjectEntity } from "../../entities";
import { RepositoryIdentifiers } from "../../repositories";
import { AppServiceIdentifiers } from "../AppServiceIdentifiers";
import { ProjectMapper } from "../../mappers";

@Injectable()
export class ProjectService implements IProjectService {
  constructor(
    @Inject(RepositoryIdentifiers.projectRepository)
    private readonly projectRepository: IProjectRepository<ProjectEntity>,
    @Inject(AppServiceIdentifiers.imageService)
    private readonly imageService: IImageService,
  ) {}

  async getProjectById(id: string): Promise<ProjectModel> {
    const projectEntity = await this.projectRepository.findById(id);
    const images = await this.imageService.getImagesByProjectId(id);
    return ProjectMapper.toModel(projectEntity, images);
  }

  async createProject(project: CreateProjectData): Promise<ProjectModel> {
    const projectEntity = ProjectMapper.toEntity(project);
    const images = await this.imageService.createImages(project.images);
    const createdProject = await this.projectRepository.insertWithImages(
      projectEntity,
      images.map((image) => image.id),
    );
    return ProjectMapper.toModel(createdProject, images);
  }

  async getProjects(): Promise<ProjectModel[]> {
    const projectEntities = await this.projectRepository.findAll();
    return Promise.all(
      projectEntities.map(async (project) => {
        const images = await this.imageService.getImagesByProjectId(project.id);
        return ProjectMapper.toModel(project, images);
      }),
    );
  }
}
