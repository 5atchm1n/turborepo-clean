import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Req,
  Res,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { ApiExtraModels, ApiResponse, ApiTags } from "@nestjs/swagger";
import {
  CreateNewProjectUseCase,
  CreateProjectData,
  GetAllProjectsUseCase,
  IRequest,
  ProjectUseCaseIdentifiers,
} from "../../../core";
import { Response } from "express";
import {
  ApiResponseType,
  JwtAuthGuard,
  ParseJsonArrayPipe,
} from "../../../common";
import { ApiProject, CreateImageDto, CreateProjectDto } from "./models";
import { AnyFilesInterceptor } from "@nestjs/platform-express";
import { BadRequestException } from "../../../infrastructure";

@ApiTags("project")
@ApiExtraModels(ApiProject)
@ApiResponse({
  status: 401,
  description: "No authorization token was found",
})
@ApiResponse({ status: 500, description: "Internal error" })
@Controller("projects")
export class ProjectController {
  constructor(
    @Inject(ProjectUseCaseIdentifiers.createProjectUseCase)
    private readonly createProjectUseCase: CreateNewProjectUseCase,
    @Inject(ProjectUseCaseIdentifiers.getAllProjectsUseCase)
    private readonly getAllProjectsUseCase: GetAllProjectsUseCase,
  ) {}

  @Post("create")
  @UseGuards(JwtAuthGuard)
  @ApiResponseType(ApiProject, false, 201)
  @UseInterceptors(
    AnyFilesInterceptor({
      limits: {
        files: 5,
        fileSize: 1024 * 1024 * 5,
      },
    }),
  )
  async createNewProject(
    @Req() req: IRequest,
    @Body("images", new ParseJsonArrayPipe()) images: CreateImageDto[],
    @Body()
    projectDto: CreateProjectDto,
    @UploadedFiles() files: Express.Multer.File[],
    @Res() response: Response,
  ): Promise<Response<ApiProject>> {
    const createProjectData = this.createProjectData(
      projectDto,
      req,
      files,
      images,
    );
    const project = await this.createProjectUseCase.execute(createProjectData);
    return response.status(201).send(new ApiProject(project));
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiResponseType(ApiProject, true, 200)
  async getProjects(): Promise<ApiProject[]> {
    const projects = await this.getAllProjectsUseCase.execute();
    return projects.map((project) => new ApiProject(project));
  }

  private createProjectData(
    projectDto: CreateProjectDto,
    req: IRequest,
    files: Express.Multer.File[],
    images: CreateImageDto[],
  ): CreateProjectData {
    if (files.length !== images.length) {
      throw new BadRequestException();
    }

    return {
      project: {
        name: projectDto.name,
        description: projectDto.description,
      },
      images: images.map((image, index) => ({
        name: image.name,
        file: files[index],
        description: image.description,
        metadata: image.metadata,
      })),
      user_id: req.user.id,
    };
  }
}
