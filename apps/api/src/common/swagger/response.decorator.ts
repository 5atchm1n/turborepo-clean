import { applyDecorators, Type } from "@nestjs/common";
import { ApiResponse, getSchemaPath } from "@nestjs/swagger";
import { ResponseFormat } from "../interceptors";

export const ApiResponseType = <TModel extends Type>(
  model: TModel,
  isArray: boolean,
  statusCode?: number,
  description?: string,
): MethodDecorator =>
  applyDecorators(
    ApiResponse({
      description: description ?? "Success",
      status: statusCode ?? 200,
      isArray: isArray,
      schema: {
        allOf: [
          { $ref: getSchemaPath(ResponseFormat) },
          {
            properties: {
              data: {
                $ref: getSchemaPath(model),
              },
              isArray: {
                type: "boolean",
                default: isArray,
              },
            },
          },
        ],
      },
    }),
  );
